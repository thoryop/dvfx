import { NextResponse } from "next/server";

import { getRazorpay, verifyCheckoutSignature } from "@/lib/razorpay/server";
import { upsertOrder, type OrderRecord } from "@/lib/orders";
import { sendEmail, editorEmail } from "@/lib/email/send";
import { customerOrderEmail, editorOrderEmail, type OrderEmailData } from "@/lib/email/templates";

export const runtime = "nodejs";

const numOr = (v: unknown, fallback: number): number => {
  const n = typeof v === "string" ? Number(v) : typeof v === "number" ? v : NaN;
  return Number.isFinite(n) ? n : fallback;
};
const strOr = (v: unknown, fallback = ""): string =>
  typeof v === "string" ? v : fallback;

/**
 * Verifies the Checkout signature, then re-derives the order from Razorpay (the
 * authoritative source of amount + notes — never the client), persists it, and
 * emails the customer + editor. The webhook remains the ultimate source of truth.
 */
export async function POST(request: Request) {
  let body: {
    razorpay_order_id?: unknown;
    razorpay_payment_id?: unknown;
    razorpay_signature?: unknown;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ verified: false, error: "Invalid JSON" }, { status: 400 });
  }

  const orderId = String(body.razorpay_order_id ?? "");
  const paymentId = String(body.razorpay_payment_id ?? "");
  const signature = String(body.razorpay_signature ?? "");

  if (!orderId || !paymentId || !signature) {
    return NextResponse.json({ verified: false, error: "Missing fields" }, { status: 400 });
  }

  const verified = verifyCheckoutSignature({ orderId, paymentId, signature });
  if (!verified) {
    return NextResponse.json({ verified: false }, { status: 400 });
  }

  // Signature is valid. Fulfil idempotently; never fail the response if the
  // side-effects (DB/email) hiccup — the webhook will reconcile.
  try {
    const order = await getRazorpay().orders.fetch(orderId);
    const notes = (order.notes ?? {}) as Record<string, unknown>;

    const emailData: OrderEmailData = {
      orderRef: orderId,
      packageTitle: strOr(notes.title, "Editing package"),
      amountPaid: numOr(notes.amountPaid, Number(order.amount) / 100),
      balanceDue: numOr(notes.balanceDue, 0),
      total: numOr(notes.total, Number(order.amount) / 100),
      paymentType: strOr(notes.paymentType, "full") === "deposit" ? "deposit" : "full",
      customerName: strOr(notes.customerName, "there"),
      customerEmail: strOr(notes.customerEmail),
      customerPhone: strOr(notes.customerPhone) || undefined,
    };

    const record: OrderRecord = {
      orderRef: orderId,
      paymentId,
      status: "paid",
      packageTitle: emailData.packageTitle,
      serviceSlug: strOr(notes.serviceSlug) || undefined,
      tier: strOr(notes.tier) || undefined,
      paymentType: emailData.paymentType,
      totalAmount: emailData.total,
      amountPaid: emailData.amountPaid,
      balanceDue: emailData.balanceDue,
      currency: strOr(order.currency, "INR"),
      customerName: emailData.customerName,
      customerEmail: emailData.customerEmail,
      customerPhone: emailData.customerPhone,
    };

    await upsertOrder(record);

    if (emailData.customerEmail) {
      const c = customerOrderEmail(emailData);
      await sendEmail({ to: emailData.customerEmail, subject: c.subject, html: c.html, replyTo: editorEmail() });
    }
    const editorTo = editorEmail();
    if (editorTo) {
      const e = editorOrderEmail(emailData);
      await sendEmail({ to: editorTo, subject: e.subject, html: e.html, replyTo: emailData.customerEmail || undefined });
    }
  } catch (err) {
    console.error("[razorpay/verify] fulfilment error (webhook will reconcile):", err);
  }

  return NextResponse.json({ verified: true, orderRef: orderId });
}
