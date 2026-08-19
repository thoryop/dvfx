import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { Tick02Icon, Clock01Icon, RefreshIcon } from "@hugeicons/core-free-icons";

import {
  getServiceBySlug,
  getServiceSlugs,
  getPackagesForService,
  getFaqsByIds,
  getTestimonialsByIds,
  getRelatedServices,
} from "@/lib/data/source";
import { buildMetadata, serviceJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { categoryLabel } from "@/config/site";
import { formatINR } from "@/lib/format";
import { JsonLd } from "@/components/common/json-ld";
import { SectionHeading } from "@/components/common/section-heading";
import { CTAButton } from "@/components/common/cta-button";
import { ResponsiveVideo } from "@/components/media/responsive-video";
import { SmartImage } from "@/components/media/smart-image";
import { PackageCard } from "@/components/services/package-card";
import { ComparisonTable } from "@/components/services/comparison-table";
import { AddonList } from "@/components/services/addon-list";
import { ServiceGrid } from "@/components/services/service-grid";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { Testimonials } from "@/components/sections/testimonials";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";

// Pre-render all service pages at build; revalidate periodically (ISR).
export const revalidate = 120;

export async function generateStaticParams() {
  const slugs = await getServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return buildMetadata({ title: "Service not found", noIndex: true });
  return buildMetadata({
    title: service.seoTitle ?? service.title,
    description: service.seoDescription ?? service.shortDescription,
    path: `/services/${service.slug}`,
    image: service.heroImage,
  });
}

export default async function ServiceDetailPage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const [packages, faqs, testimonials, related] = await Promise.all([
    getPackagesForService(slug),
    getFaqsByIds(service.faqIds),
    getTestimonialsByIds(service.testimonialIds),
    getRelatedServices(service.relatedSlugs),
  ]);

  const custom = service.basePrice === 0;

  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({
            name: service.title,
            description: service.shortDescription,
            slug: service.slug,
            price: service.basePrice,
            image: service.heroImage,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.title, path: `/services/${service.slug}` },
          ]),
        ]}
      />

      {/* Hero */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
          <Reveal className="flex flex-col gap-5">
            <nav className="text-sm text-muted-foreground">
              <Link href="/services" className="hover:text-foreground">
                Services
              </Link>{" "}
              / <span className="text-foreground">{service.title}</span>
            </nav>
            <Badge className="w-fit border-brand/30 bg-brand/10 text-brand">
              {categoryLabel(service.category)}
            </Badge>
            <h1 className="text-balance text-4xl font-extrabold tracking-tight sm:text-5xl">
              {service.title}
            </h1>
            <p className="text-pretty text-lg text-muted-foreground">
              {service.longDescription}
            </p>
            <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
              {!custom && (
                <>
                  <span className="inline-flex items-center gap-1.5">
                    <HugeiconsIcon icon={Clock01Icon} size={16} strokeWidth={2} />
                    {service.deliveryDays}-day delivery
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <HugeiconsIcon icon={RefreshIcon} size={16} strokeWidth={2} />
                    {service.revisions} revisions
                  </span>
                </>
              )}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <CTAButton
                href={custom ? "/contact" : `/checkout/${service.slug}`}
                size="lg"
                withArrow
              >
                {custom ? "Request a quote" : `Book from ${formatINR(service.basePrice)}`}
              </CTAButton>
            </div>
          </Reveal>

          <Reveal direction="left">
            <ResponsiveVideo
              orientation={service.videoOrientation}
              poster={service.heroImage}
              src={service.demoVideo}
              title={`${service.title} demo`}
              priority
              contain
            />
          </Reveal>
        </div>
      </section>

      {/* Features + Gallery */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">What&apos;s included</h2>
            <ul className="mt-6 grid gap-3">
              {service.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm">
                  <HugeiconsIcon
                    icon={Tick02Icon}
                    size={20}
                    strokeWidth={2.5}
                    className="mt-0.5 shrink-0 text-brand"
                  />
                  <span className="text-foreground/90">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {service.gallery.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Recent work</h2>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {service.gallery.map((src, i) => (
                  <div
                    key={src}
                    className="relative aspect-video overflow-hidden rounded-xl border border-border"
                  >
                    <SmartImage
                      src={src}
                      alt={`${service.title} sample ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Packages */}
      {packages.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Packages"
            title="Choose your package"
            description="Pick the scope that fits your project. Need something bigger? Request a custom quote."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>

          <div className="mt-12">
            <h3 className="mb-6 text-center text-lg font-semibold">Compare packages</h3>
            <ComparisonTable packages={packages} />
          </div>
        </section>
      )}

      {/* Add-ons */}
      {service.addons.length > 0 && (
        <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight">Popular add-ons</h2>
          <p className="mb-6 mt-1 text-sm text-muted-foreground">
            Enhance any package with these extras.
          </p>
          <AddonList addons={service.addons} />
        </section>
      )}

      {testimonials.length > 0 && <Testimonials testimonials={testimonials} />}

      {faqs.length > 0 && <FaqAccordion faqs={faqs} />}

      {/* Related */}
      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="More" title="Related services" />
          <div className="mt-12">
            <ServiceGrid services={related} />
          </div>
        </section>
      )}
    </>
  );
}
