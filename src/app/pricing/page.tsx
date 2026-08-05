import type { Metadata } from "next";

import { getGlobalFaqs } from "@/lib/data/source";
import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/common/page-header";
import { PricingPlans } from "@/components/sections/pricing-plans";
import { SectionHeading } from "@/components/common/section-heading";
import { CTAButton } from "@/components/common/cta-button";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = buildMetadata({
  title: "Pricing",
  description:
    "Simple, transparent video editing pricing — one-time project packages and monthly content plans. Custom quotes available.",
  path: "/pricing",
});

export const revalidate = 1800;

export default async function PricingPage() {
  const faqs = await getGlobalFaqs();

  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Pricing that scales with you"
        description="Pay per project or partner monthly. Every plan includes communication, source-quality exports and a satisfaction guarantee."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <PricingPlans />
      </section>

      {/* Custom quote */}
      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col items-center gap-5 rounded-3xl border border-border bg-card px-6 py-12 text-center">
          <SectionHeading
            title="Need something custom?"
            description="Documentaries, weddings, ad campaigns, multi-cam events — tell me the scope and I'll build a tailored quote."
          />
          <CTAButton href="/contact" size="lg" withArrow>
            Request a custom quote
          </CTAButton>
        </Reveal>
      </section>

      <FaqAccordion faqs={faqs} />
    </>
  );
}
