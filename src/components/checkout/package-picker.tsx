"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Tick02Icon,
  SecurityCheckIcon,
  CreditCardIcon,
  RefreshIcon,
} from "@hugeicons/core-free-icons";

import type { Package } from "@/types";
import { cn } from "@/lib/utils";
import { formatINR } from "@/lib/format";
import { customerSchema, type CustomerInput } from "@/lib/validation";
import {
  computeAmounts,
  depositEligible,
  type PaymentType,
} from "@/config/commerce";
import { CTAButton } from "@/components/common/cta-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  loadRazorpayCheckout,
  type RazorpayHandlerResponse,
} from "@/lib/razorpay/checkout-client";

interface PackagePickerProps {
  packages: Package[];
  initialId?: string;
  serviceTitle?: string;
}

/**
 * Package selection + customer details + Razorpay checkout. The order amount is
 * validated server-side (price + deposit rules); the client only sends a package
 * id, payment type and the customer's own contact details. Degrades to a
 * friendly message until keys are configured (order route returns 503).
 */
export function PackagePicker({ packages, initialId, serviceTitle }: PackagePickerProps) {
  const router = useRouter();
  const [selectedId, setSelectedId] = React.useState(
    initialId ?? packages.find((p) => p.recommended)?.id ?? packages[0]?.id
  );
  const [paymentType, setPaymentType] = React.useState<PaymentType>("full");
  const [loading, setLoading] = React.useState(false);
  const selected = packages.find((p) => p.id === selectedId);

  const form = useForm<CustomerInput>({
    resolver: zodResolver(customerSchema),
    defaultValues: { name: "", email: "", phone: "" },
  });

  const eligible = selected ? depositEligible(selected.price) : false;
  // Deposit only applies to eligible packages; derive rather than sync state.
  const activeType: PaymentType = eligible ? paymentType : "full";

  const amounts = selected ? computeAmounts(selected.price, activeType) : null;

  async function startCheckout(customer: CustomerInput) {
    if (!selected || loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageId: selected.id, paymentType: activeType, customer }),
      });

      if (res.status === 503) {
        toast.info("Online payments aren't switched on yet — message me to book this now.");
        return;
      }
      if (!res.ok) throw new Error("order failed");
      const order = await res.json();

      await loadRazorpayCheckout();
      if (!window.Razorpay) throw new Error("checkout unavailable");

      const rzp = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: "DVFX",
        description: serviceTitle
          ? `${serviceTitle} — ${order.packageTitle}`
          : order.packageTitle,
        prefill: order.prefill,
        theme: { color: "#18E554" },
        handler: async (response: RazorpayHandlerResponse) => {
          try {
            const verify = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });
            const { verified } = await verify.json();
            router.push(
              verified
                ? `/payment/success?order=${encodeURIComponent(response.razorpay_order_id)}`
                : "/payment/failed"
            );
          } catch {
            router.push("/payment/failed");
          }
        },
        modal: { ondismiss: () => setLoading(false) },
      });
      rzp.on("payment.failed", () => router.push("/payment/failed"));
      rzp.open();
    } catch {
      toast.error("Couldn't start checkout. Please try again or message me.");
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
      <div className="space-y-8">
        {/* Packages */}
        <div className="grid gap-4" role="radiogroup" aria-label="Select a package">
          {packages.map((pkg) => {
            const active = pkg.id === selectedId;
            return (
              <button
                key={pkg.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setSelectedId(pkg.id)}
                className={cn(
                  "flex flex-col gap-3 rounded-2xl border bg-card p-5 text-left transition-colors",
                  active ? "border-brand ring-1 ring-brand" : "border-border hover:border-brand/40"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "grid size-5 place-items-center rounded-full border",
                        active ? "border-brand bg-brand text-brand-foreground" : "border-border"
                      )}
                    >
                      {active ? <HugeiconsIcon icon={Tick02Icon} size={12} strokeWidth={3} /> : null}
                    </span>
                    <span className="font-bold">{pkg.title}</span>
                    {pkg.badge ? (
                      <span className="rounded-full bg-brand/10 px-2 py-0.5 text-xs font-medium text-brand">
                        {pkg.badge}
                      </span>
                    ) : null}
                  </div>
                  <span className="text-lg font-bold">{formatINR(pkg.price)}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {pkg.deliveryDays}-day delivery · {pkg.revisions} revisions
                </p>
              </button>
            );
          })}
        </div>

        {/* Your details */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold">Your details</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            So I can confirm your booking and reach you to start the work.
          </p>
          <Form {...form}>
            <form
              id="checkout-details"
              onSubmit={form.handleSubmit(startCheckout)}
              className="mt-5 grid gap-4 sm:grid-cols-2"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>Full name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" autoComplete="name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@email.com" autoComplete="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone / WhatsApp</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="+91…" autoComplete="tel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </div>

      {/* Summary */}
      <div className="rounded-2xl border border-border bg-card p-6 lg:sticky lg:top-24">
        <h2 className="text-lg font-bold">Order summary</h2>
        {selected && amounts ? (
          <>
            {/* Deposit / full toggle */}
            {eligible ? (
              <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl border border-border p-1">
                {(
                  [
                    { key: "full", label: "Pay in full" },
                    { key: "deposit", label: "50% deposit" },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setPaymentType(opt.key)}
                    className={cn(
                      "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      activeType === opt.key
                        ? "bg-brand text-brand-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            ) : null}

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">{selected.title} package</span>
                <span className="font-medium">{formatINR(amounts.total)}</span>
              </div>
              {amounts.balanceDue > 0 ? (
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Balance due on delivery</span>
                  <span>{formatINR(amounts.balanceDue)}</span>
                </div>
              ) : null}
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-base font-bold">
              <span>Pay now</span>
              <span>{formatINR(amounts.amountPaid)}</span>
            </div>

            <CTAButton
              type="submit"
              form="checkout-details"
              size="lg"
              className="mt-6 w-full"
              disabled={loading}
            >
              {loading ? "Starting checkout…" : `Pay ${formatINR(amounts.amountPaid)} securely`}
            </CTAButton>

            <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
              <li className="flex items-center gap-2">
                <HugeiconsIcon icon={SecurityCheckIcon} size={14} strokeWidth={2} className="text-brand" />
                Secure payment via Razorpay
              </li>
              <li className="flex items-center gap-2">
                <HugeiconsIcon icon={CreditCardIcon} size={14} strokeWidth={2} className="text-brand" />
                UPI, cards &amp; netbanking
              </li>
              <li className="flex items-center gap-2">
                <HugeiconsIcon icon={RefreshIcon} size={14} strokeWidth={2} className="text-brand" />
                Free revisions until you approve
              </li>
            </ul>
          </>
        ) : (
          <p className="mt-4 text-sm text-muted-foreground">No package selected.</p>
        )}
      </div>
    </div>
  );
}
