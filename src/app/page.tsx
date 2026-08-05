import {
  getFeaturedServices,
  getGlobalFaqs,
  getSiteSettings,
  getTestimonials,
  brands,
  processSteps,
  stats,
} from "@/lib/data/source";
import { Hero } from "@/components/sections/hero";
import { BrandMarquee } from "@/components/sections/brand-marquee";
import { FeaturedServices } from "@/components/sections/featured-services";
import { Stats } from "@/components/sections/stats";
import { Process } from "@/components/sections/process";
import { Testimonials } from "@/components/sections/testimonials";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { FinalCta } from "@/components/sections/final-cta";
import { PricingTeaser } from "@/components/sections/pricing-teaser";

// ISR: refresh CMS-backed content periodically (and self-heal transient fetches).
export const revalidate = 1800;

export default async function HomePage() {
  const [settings, featured, testimonials, faqs] = await Promise.all([
    getSiteSettings(),
    getFeaturedServices(),
    getTestimonials(),
    getGlobalFaqs(),
  ]);

  return (
    <>
      <Hero showreel={settings.heroVideo} poster={featured[0]?.heroImage ?? ""} />
      <BrandMarquee brands={brands} />
      <FeaturedServices services={featured} />
      <PricingTeaser />
      <Stats stats={stats} />
      <Process steps={processSteps} />
      <Testimonials testimonials={testimonials} />
      <FaqAccordion faqs={faqs} />
      <FinalCta />
    </>
  );
}
