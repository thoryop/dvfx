import type { Metadata } from "next";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Mail01Icon,
  WhatsappIcon,
  Clock01Icon,
} from "@hugeicons/core-free-icons";

import { getSiteSettings } from "@/lib/data/source";
import { buildMetadata } from "@/lib/seo";
import { whatsappLink } from "@/lib/format";
import { PageHeader } from "@/components/common/page-header";
import { ContactForm } from "@/components/contact/contact-form";
import { CTAButton } from "@/components/common/cta-button";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Start a project or request a custom video editing quote. Reach out via the form, WhatsApp, email or live chat.",
  path: "/contact",
});

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const wa = whatsappLink(settings.whatsapp, "Hi! I'd like to discuss a video edit.");

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's start your project"
        description="Fill in the form and I'll reply within 24 hours — or reach me directly through any channel below."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
            <ContactForm />
          </div>

          <aside className="flex flex-col gap-4">
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-brand/40"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
                <HugeiconsIcon icon={WhatsappIcon} size={22} strokeWidth={2} />
              </span>
              <div>
                <h3 className="font-semibold">WhatsApp</h3>
                <p className="text-sm text-muted-foreground">
                  Fastest way to reach me — chat directly.
                </p>
              </div>
            </a>

            <a
              href={`mailto:${settings.email}`}
              className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-brand/40"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
                <HugeiconsIcon icon={Mail01Icon} size={22} strokeWidth={2} />
              </span>
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-sm text-muted-foreground">{settings.email}</p>
              </div>
            </a>

            <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
                <HugeiconsIcon icon={Clock01Icon} size={22} strokeWidth={2} />
              </span>
              <div>
                <h3 className="font-semibold">Response time</h3>
                <p className="text-sm text-muted-foreground">
                  Within 24 hours, Mon–Sat. Live chat available too.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-brand/30 bg-brand/5 p-5">
              <h3 className="font-semibold">Prefer to talk it through?</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Use the live chat bubble or message me on WhatsApp for a quick reply.
              </p>
              <CTAButton href={wa} variant="brand" size="sm" className="mt-4">
                Chat on WhatsApp
              </CTAButton>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
