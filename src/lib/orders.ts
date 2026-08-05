import "server-only";

import { isWixAdminConfigured, wixInsert, wixQuery, wixUpdate } from "@/lib/wix/admin";

const COLLECTION = "Orders";

export interface OrderRecord {
  orderRef: string;
  paymentId?: string;
  status: "paid" | "failed" | "pending";
  packageTitle: string;
  serviceSlug?: string;
  tier?: string;
  paymentType: "full" | "deposit";
  totalAmount: number;
  amountPaid: number;
  balanceDue: number;
  currency: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
}

/** Find the stored order (with its Wix _id) by Razorpay order reference. */
export async function getOrderByRef(
  orderRef: string
): Promise<(OrderRecord & { _id: string }) | null> {
  if (!isWixAdminConfigured()) return null;
  const rows = await wixQuery(COLLECTION, { orderRef }, 1);
  const row = rows[0];
  return row ? (row as unknown as OrderRecord & { _id: string }) : null;
}

/**
 * Idempotently create/update an order keyed by orderRef. Called by both the
 * verify route (instant) and the webhook (source of truth) — whichever lands
 * first creates it; the other updates in place. Never throws into the caller.
 */
export async function upsertOrder(record: OrderRecord): Promise<string | null> {
  if (!isWixAdminConfigured()) {
    console.info("[orders] skipped (Wix admin not configured):", record.orderRef);
    return null;
  }
  try {
    const existing = await getOrderByRef(record.orderRef);
    const data = { title: record.orderRef, ...record };
    if (existing?._id) {
      // Preserve any intake fields already submitted by the customer.
      await wixUpdate(COLLECTION, existing._id, { ...existing, ...data });
      return existing._id;
    }
    const created = await wixInsert(COLLECTION, data);
    return (created._id as string) ?? null;
  } catch (err) {
    console.error("[orders] upsert failed:", err);
    return null;
  }
}

/** Attach the customer's project brief to an existing paid order. */
export async function saveIntake(
  orderRef: string,
  intake: { footageUrl: string; brief: string; deadline?: string }
): Promise<boolean> {
  if (!isWixAdminConfigured()) return false;
  const existing = await getOrderByRef(orderRef);
  if (!existing?._id) return false;
  try {
    await wixUpdate(COLLECTION, existing._id, {
      ...existing,
      footageUrl: intake.footageUrl,
      brief: intake.brief,
      deadline: intake.deadline ?? "",
    });
    return true;
  } catch (err) {
    console.error("[orders] saveIntake failed:", err);
    return false;
  }
}
