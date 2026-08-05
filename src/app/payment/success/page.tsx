import type { Metadata } from "next";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CheckmarkBadge01Icon,
  Mail01Icon,
  WhatsappIcon,
} from "@hugeicons/core-free-icons";

import { getSiteSettings } from "@/lib/data/source";
import { buildMetadata } from "@/lib/seo";
import { whatsappLink } from "@/lib/format";
import { CTAButton } from "@/components/common/cta-button";
import { OrderIntakeForm } from "@/components/checkout/order-intake-form";

export const metadata: Metadata = buildMetadata({
  title: "Payment successful",
  path: "/payment/success",
  noIndex: true,
});

const steps = [
  { n: "1", title: "Confirmation on its way", body: "A receipt and confirmation email are being sent to you." },
  { n: "2", title: "Share your footage", body: "Use the form below to send your files, references and deadline." },
  { n: "3", title: "I start editing", body: "I'll review your brief and reply within 24 hours to kick things off." },
];

export default async function PaymentSuccessPage({
  searchParams,
}: PageProps<"/payment/success">) {
  const { order } = await searchParams;
  const orderRef = typeof order === "string" ? order : "";
  const settings = await getSiteSettings();
  const wa = whatsappLink(
    settings.whatsapp,
    orderRef ? `Hi! I just booked (order ${orderRef}).` : "Hi! I just booked a project."
  );

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center text-center">
        <span className="grid size-20 place-items-center rounded-full bg-brand/10 text-brand">
          <HugeiconsIcon icon={CheckmarkBadge01Icon} size={48} strokeWidth={1.8} />
        </span>
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight">Payment successful 🎉</h1>
        <p className="mt-3 text-muted-foreground">
          Thank you — your booking is confirmed and I&apos;m excited to work on it.
        </p>
        {orderRef ? (
          <p className="mt-2 text-sm text-muted-foreground">
            Order reference: <span className="font-mono text-foreground">{orderRef}</span>
          </p>
        ) : null}
      </div>

      {/* Next steps */}
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {steps.map((s) => (
          <div key={s.n} className="rounded-2xl border border-border bg-card p-5">
            <span className="grid size-8 place-items-center rounded-full bg-brand/10 text-sm font-bold text-brand">
              {s.n}
            </span>
            <h3 className="mt-3 text-sm font-bold">{s.title}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{s.body}</p>
          </div>
        ))}
      </div>

      {/* Intake */}
      <div className="mt-10 rounded-3xl border border-border bg-card p-6 sm:p-8">
        <h2 className="text-xl font-bold tracking-tight">Send your project details</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          The sooner I get these, the sooner I can start. It takes a minute.
        </p>
        <div className="mt-6">
          {orderRef ? (
            <OrderIntakeForm orderRef={orderRef} />
          ) : (
            <p className="text-sm text-muted-foreground">
              Please use the confirmation email or WhatsApp below to send your footage and brief.
            </p>
          )}
        </div>
      </div>

      {/* Direct contact */}
      <div className="mt-8 flex flex-col items-center gap-3 text-center">
        <p className="text-sm text-muted-foreground">Prefer to talk directly?</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <CTAButton href={wa} variant="brand">
            <HugeiconsIcon icon={WhatsappIcon} size={18} strokeWidth={2} />
            Message on WhatsApp
          </CTAButton>
          <CTAButton href={`mailto:${settings.email}`} variant="outline">
            <HugeiconsIcon icon={Mail01Icon} size={18} strokeWidth={2} />
            Email me
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
