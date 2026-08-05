/**
 * Commerce rules shared by the checkout UI and the server (order route).
 * Keep these in one place so client and server agree on deposit logic.
 */

/** Packages priced at/above this (INR) may be booked with a 50% deposit. */
export const DEPOSIT_THRESHOLD = 8000;

/** Fraction paid now when choosing the deposit option. */
export const DEPOSIT_FRACTION = 0.5;

export type PaymentType = "full" | "deposit";

export function depositEligible(price: number): boolean {
  return price >= DEPOSIT_THRESHOLD;
}

/**
 * Given a package price and the chosen payment type, return the authoritative
 * amounts (in rupees). `deposit` is only honored for eligible packages.
 */
export function computeAmounts(price: number, paymentType: PaymentType) {
  const useDeposit = paymentType === "deposit" && depositEligible(price);
  const amountPaid = useDeposit ? Math.ceil((price * DEPOSIT_FRACTION) / 100) * 100 : price;
  return {
    paymentType: (useDeposit ? "deposit" : "full") as PaymentType,
    total: price,
    amountPaid,
    balanceDue: price - amountPaid,
  };
}
