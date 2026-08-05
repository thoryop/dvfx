import { NextResponse } from "next/server";

import { getRazorpay, verifyWebhookSignature } from "@/lib/razorpay/server";
import { upsertOrder, getOrderByRef, type OrderRecord } from "@/lib/orders";

export const runtime = "nodejs";
// Always run fresh; never cache a webhook.
export const dynamic = "force-dynamic";

const numOr = (v: unknown, fallback: number): number => {
  const n = typeof v === "string" ? Number(v) : typeof v === "number" ? v : NaN;
  return Number.isFinite(n) ? n : fallback;
};
const strOr = (v: unknown, fallback = ""): string =>
  typeof v === "string" ? v : fallback;

/**
 * Razorpay webhook — the source of truth for payment fulfilment.
 * The signature is verified against the RAW body (do NOT parse before verifying),
 * per Razorpay's requirement. Configure the same secret in the Dashboard and in
 * RAZORPAY_WEBHOOK_SECRET.
 */
export async function POST(request: Request) {
  const raw = await request.text();
  const signature = request.headers.get("x-razorpay-signature") ?? "";

  if (!verifyWebhookSignature(raw, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  let event: {
    event?: string;
    payload?: { payment?: { entity?: Record<string, unknown> } };
  };
  try {
    event = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  try {
    const payment = event.payload?.payment?.entity ?? {};
    const orderId = strOr(payment.order_id);

    switch (event.event) {
      case "payment.captured":
      case "order.paid": {
        if (orderId) await fulfil(orderId, strOr(payment.id));
        break;
      }
      case "payment.failed": {
        if (orderId) {
          const existing = await getOrderByRef(orderId);
          if (existing?._id) {
            await upsertOrder({ ...(existing as OrderRecord), status: "failed" });
          }
        }
        break;
      }
      default:
        break;
    }
  } catch (err) {
    // Log but still 200 so Razorpay doesn't hammer retries on our own bug.
    console.error("[razorpay/webhook] handler error:", err);
  }

  return NextResponse.json({ received: true });
}

/** Re-derive the order from Razorpay and upsert it as paid (idempotent). */
async function fulfil(orderId: string, paymentId: string) {
  const order = await getRazorpay().orders.fetch(orderId);
  const notes = (order.notes ?? {}) as Record<string, unknown>;
  const record: OrderRecord = {
    orderRef: orderId,
    paymentId: paymentId || undefined,
    status: "paid",
    packageTitle: strOr(notes.title, "Editing package"),
    serviceSlug: strOr(notes.serviceSlug) || undefined,
    tier: strOr(notes.tier) || undefined,
    paymentType: strOr(notes.paymentType, "full") === "deposit" ? "deposit" : "full",
    totalAmount: numOr(notes.total, Number(order.amount) / 100),
    amountPaid: numOr(notes.amountPaid, Number(order.amount) / 100),
    balanceDue: numOr(notes.balanceDue, 0),
    currency: strOr(order.currency, "INR"),
    customerName: strOr(notes.customerName, "Customer"),
    customerEmail: strOr(notes.customerEmail),
    customerPhone: strOr(notes.customerPhone) || undefined,
  };
  await upsertOrder(record);
}
