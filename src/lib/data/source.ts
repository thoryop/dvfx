import "server-only";

import type {
  Faq,
  Package,
  PortfolioItem,
  Service,
  SiteSettings,
  Testimonial,
} from "@/types";
import * as mock from "./mock";
import * as wix from "@/lib/wix/queries";

/**
 * Data facade. Every page/server component reads content through these
 * functions — never importing mock data or the Wix SDK directly.
 *
 * `USE_MOCK_DATA` (default "true") serves the built-in mock content. Set it to
 * "false" (with NEXT_PUBLIC_WIX_CLIENT_ID configured) to read live Wix CMS data.
 * The function signatures are identical for both sources, so pages never change.
 */
const useMock = process.env.USE_MOCK_DATA !== "false";

export async function getSiteSettings(): Promise<SiteSettings> {
  return useMock ? mock.siteSettings : wix.getSiteSettings();
}

export async function getServices(): Promise<Service[]> {
  return useMock ? mock.services : wix.getServices();
}

export async function getFeaturedServices(): Promise<Service[]> {
  if (!useMock) return wix.getFeaturedServices();
  return mock.services.filter((s) => s.featured);
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  if (!useMock) return wix.getServiceBySlug(slug);
  return mock.services.find((s) => s.slug === slug) ?? null;
}

export async function getServiceSlugs(): Promise<string[]> {
  if (!useMock) return wix.getServiceSlugs();
  return mock.services.map((s) => s.slug);
}

export async function getPackages(): Promise<Package[]> {
  return useMock ? mock.packages : wix.getPackages();
}

export async function getPackagesForService(slug: string): Promise<Package[]> {
  if (!useMock) return wix.getPackagesForService(slug);
  return mock.packages.filter((p) => p.serviceSlug === slug);
}

export async function getPackageById(id: string): Promise<Package | null> {
  if (!useMock) return wix.getPackageById(id);
  return mock.packages.find((p) => p.id === id) ?? null;
}

export async function getPortfolio(): Promise<PortfolioItem[]> {
  return useMock ? mock.portfolioItems : wix.getPortfolio();
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return useMock ? mock.testimonials : wix.getTestimonials();
}

export async function getTestimonialsByIds(ids: string[]): Promise<Testimonial[]> {
  if (!useMock) return wix.getTestimonialsByIds(ids);
  return mock.testimonials.filter((t) => ids.includes(t.id));
}

export async function getFaqs(): Promise<Faq[]> {
  return useMock ? mock.faqs : wix.getFaqs();
}

export async function getFaqsByIds(ids: string[]): Promise<Faq[]> {
  if (!useMock) return wix.getFaqsByIds(ids);
  return mock.faqs.filter((f) => ids.includes(f.id));
}

export async function getGlobalFaqs(): Promise<Faq[]> {
  if (!useMock) return wix.getGlobalFaqs();
  return mock.faqs.filter((f) => !f.serviceSlug);
}

export async function getRelatedServices(slugs: string[]): Promise<Service[]> {
  if (!useMock) return wix.getRelatedServices(slugs);
  const all = mock.services;
  return slugs
    .map((slug) => all.find((s) => s.slug === slug))
    .filter((s): s is Service => Boolean(s));
}

/** Brand names for the "trusted by" marquee — CMS-controlled (empty = hidden). */
export async function getBrands(): Promise<string[]> {
  return useMock ? mock.brands : wix.getBrands();
}

// Process steps are a fixed, non-CMS workflow explainer.
export const processSteps = mock.processSteps;
