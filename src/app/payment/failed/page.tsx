import type { Metadata } from "next";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";

import { buildMetadata } from "@/lib/seo";
import { CTAButton } from "@/components/common/cta-button";

export const metadata: Metadata = buildMetadata({
  title: "Payment failed",
  path: "/payment/failed",
  noIndex: true,
});

export default function PaymentFailedPage() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 py-20 text-center">
      <span className="grid size-20 place-items-center rounded-full bg-destructive/10 text-destructive">
        <HugeiconsIcon icon={Cancel01Icon} size={44} strokeWidth={2} />
      </span>
      <h1 className="mt-6 text-3xl font-extrabold tracking-tight">Payment didn&apos;t go through</h1>
      <p className="mt-3 text-muted-foreground">
        No charge was made. You can try again, or reach out and I&apos;ll send you a
        direct payment link.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <CTAButton href="/services" variant="outline">
          Back to services
        </CTAButton>
        <CTAButton href="/contact" withArrow>
          Contact me
        </CTAButton>
      </div>
    </section>
  );
}
