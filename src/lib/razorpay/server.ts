import "server-only";

import crypto from "node:crypto";
import Razorpay from "razorpay";

/**
 * Server-only Razorpay helpers. Secrets (KEY_SECRET, WEBHOOK_SECRET) never leave
 * the server; only the public Key ID is exposed to the browser to open Checkout.
 * Everything is guarded so the app runs fine before keys are configured.
 */

export function isRazorpayConfigured(): boolean {
  return Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);
}

/** The Key ID safe to send to the browser (falls back to the server key id). */
export function publicKeyId(): string {
  return (
    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ??
    process.env.RAZORPAY_KEY_ID ??
    ""
  );
}

let cached: Razorpay | null = null;

export function getRazorpay(): Razorpay {
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;
  if (!key_id || !key_secret) {
    throw new Error("Razorpay is not configured (missing RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET).");
  }
  if (!cached) cached = new Razorpay({ key_id, key_secret });
  return cached;
}

/** Constant-time string comparison that never throws on length mismatch. */
function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

/**
 * Verify the signature returned by Checkout: HMAC-SHA256(order_id|payment_id)
 * with the Key Secret must equal razorpay_signature.
 */
export function verifyCheckoutSignature(args: {
  orderId: string;
  paymentId: string;
  signature: string;
}): boolean {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) return false;
  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${args.orderId}|${args.paymentId}`)
    .digest("hex");
  return safeEqual(expected, args.signature);
}

/**
 * Verify a webhook using the raw request body + X-Razorpay-Signature header,
 * validated against the Webhook Secret (set when creating the webhook).
 */
export function verifyWebhookSignature(rawBody: string, signature: string): boolean {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret || !signature) return false;
  try {
    return Razorpay.validateWebhookSignature(rawBody, signature, secret);
  } catch {
    return false;
  }
}
