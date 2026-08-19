import { NextResponse } from "next/server";

import { getPackageById } from "@/lib/data/source";
import {
  getRazorpay,
  isRazorpayConfigured,
  publicKeyId,
} from "@/lib/razorpay/server";
import { computeAmounts } from "@/config/commerce";
import { createOrderSchema } from "@/lib/validation";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

/**
 * Creates a Razorpay order. The amount is derived server-side from the package
 * price and deposit rules — the client only sends a package id + payment type,
 * never a price — so it can't be tampered with. Customer contact details are
 * captured into the order notes so we can reach out.
 */
export async function POST(request: Request) {
  const rl = rateLimit(`order:${clientIp(request)}`, { limit: 8, windowMs: 60_000 });
  if (!rl.ok) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  if (!isRazorpayConfigured()) {
    return NextResponse.json({ error: "Payments are not configured yet." }, { status: 503 });
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = createOrderSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }
  const { packageId, paymentType, customer } = parsed.data;

  const pkg = await getPackageById(packageId);
  if (!pkg || pkg.price <= 0) {
    return NextResponse.json(
      { error: "Package not found or not purchasable" },
      { status: 404 }
    );
  }

  const amounts = computeAmounts(pkg.price, paymentType);

  try {
    const order = await getRazorpay().orders.create({
      amount: Math.round(amounts.amountPaid * 100), // rupees -> paise
      currency: "INR",
      receipt: `rcpt_${Date.now().toString(36)}`,
      notes: {
        packageId: pkg.id,
        serviceSlug: pkg.serviceSlug,
        tier: pkg.tier,
        title: pkg.title,
        paymentType: amounts.paymentType,
        total: String(amounts.total),
        amountPaid: String(amounts.amountPaid),
        balanceDue: String(amounts.balanceDue),
        customerName: customer.name,
        customerEmail: customer.email,
        customerPhone: customer.phone,
      },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: publicKeyId(),
      packageTitle: pkg.title,
      prefill: { name: customer.name, email: customer.email, contact: customer.phone },
    });
  } catch (err) {
    // Surface Razorpay's actual reason in server logs (e.g. auth failure) while
    // keeping the client response generic.
    const e = err as { statusCode?: number; error?: { code?: string; description?: string } };
    console.error(
      "[razorpay/order] create failed:",
      e?.statusCode,
      e?.error?.code,
      e?.error?.description ?? err
    );
    return NextResponse.json({ error: "Could not create order" }, { status: 502 });
  }
}
