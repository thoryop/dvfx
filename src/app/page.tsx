import {
  getBrands,
  getFeaturedServices,
  getGlobalFaqs,
  getSiteSettings,
  getTestimonials,
  processSteps,
} from "@/lib/data/source";
import { Hero } from "@/components/sections/hero";
import { BrandMarquee } from "@/components/sections/brand-marquee";
import { FeaturedServices } from "@/components/sections/featured-services";
import { Process } from "@/components/sections/process";
import { Testimonials } from "@/components/sections/testimonials";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { FinalCta } from "@/components/sections/final-cta";
import { PricingTeaser } from "@/components/sections/pricing-teaser";

// ISR: refresh CMS-backed content periodically (and self-heal transient fetches).
export const revalidate = 120;

export default async function HomePage() {
  const [settings, featured, testimonials, faqs, brands] = await Promise.all([
    getSiteSettings(),
    getFeaturedServices(),
    getTestimonials(),
    getGlobalFaqs(),
    getBrands(),
  ]);

  return (
    <>
      <Hero showreel={settings.heroVideo} poster={featured[0]?.heroImage ?? ""} />
      {brands.length > 0 ? <BrandMarquee brands={brands} /> : null}
      <FeaturedServices services={featured} />
      <PricingTeaser />
      <Process steps={processSteps} />
      {testimonials.length > 0 ? <Testimonials testimonials={testimonials} /> : null}
      <FaqAccordion faqs={faqs} />
      <FinalCta />
    </>
  );
}
