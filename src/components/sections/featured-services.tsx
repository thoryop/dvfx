import type { Service } from "@/types";
import { SectionHeading } from "@/components/common/section-heading";
import { ServiceGrid } from "@/components/services/service-grid";
import { CTAButton } from "@/components/common/cta-button";

export function FeaturedServices({ services }: { services: Service[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Services"
        title="What I can edit for you"
        description="From cinematic travel films to scroll-stopping reels — pick a service or build a custom package."
      />
      <div className="mt-12">
        <ServiceGrid services={services} />
      </div>
      <div className="mt-10 flex justify-center">
        <CTAButton href="/services" variant="outline" withArrow>
          View all services
        </CTAButton>
      </div>
    </section>
  );
}
