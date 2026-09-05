import "server-only";

import type {
  Addon,
  Faq,
  Orientation,
  Package,
  PortfolioItem,
  Service,
  ServiceCategory,
  SiteSettings,
  Testimonial,
} from "@/types";
import { getWixClient } from "./client";
import { toImageUrl, toVideoUrl, toGalleryUrls } from "./media";

type Item = Record<string, unknown>;

const str = (v: unknown, fallback = ""): string =>
  typeof v === "string" ? v : fallback;
const num = (v: unknown, fallback = 0): number =>
  typeof v === "number" ? v : fallback;
const bool = (v: unknown): boolean => v === true;
const arr = (v: unknown): string[] =>
  Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];

const COLLECTIONS = {
  services: "Services",
  packages: "Packages",
  portfolio: "PortfolioItems",
  testimonials: "Testimonials",
  faqs: "FAQs",
  addons: "Addons",
  siteSettings: "SiteSettings",
  brands: "Brands",
} as const;

/**
 * Run a query and return raw items. Resilient by design: retries once on a
 * transient error, and never throws — a CMS hiccup returns [] so pages degrade
 * gracefully (empty sections / defaults) instead of crashing the render/build.
 * ISR revalidation then heals the content on the next pass.
 */
async function find(
  collectionId: string,
  build?: (
    q: ReturnType<ReturnType<typeof getWixClient>["items"]["query"]>,
  ) => unknown,
): Promise<Item[]> {
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const client = getWixClient();
      let q = client.items.query(collectionId);
      if (build) q = build(q) as typeof q;
      const res = await q.find();
      return (res.items ?? []) as Item[];
    } catch (err) {
      if (attempt === 1) {
        console.error(`[wix] query "${collectionId}" failed:`, err);
        return [];
      }
      await new Promise((r) => setTimeout(r, 300));
    }
  }
  return [];
}

// ── Mappers ──────────────────────────────────────────────────────────────

function mapService(item: Item): Service {
  return {
    id: str(item._id),
    title: str(item.title),
    slug: str(item.slug),
    shortDescription: str(item.shortDescription),
    longDescription: str(item.longDescription),
    category: str(item.category, "custom") as ServiceCategory,
    thumbnail: toImageUrl(item.thumbnail),
    heroImage: toImageUrl(item.heroImage),
    featured: bool(item.featured),
    basePrice: num(item.basePrice),
    deliveryDays: num(item.deliveryDays),
    revisions: num(item.revisions),
    videoOrientation: str(item.videoOrientation, "16:9") as Orientation,
    gallery: toGalleryUrls(item.gallery),
    demoVideo: toVideoUrl(item.demoVideo),
    features: arr(item.features),
    addons: [],
    faqIds: [],
    testimonialIds: [],
    relatedSlugs: [],
    seoTitle: str(item.seoTitle) || undefined,
    seoDescription: str(item.seoDescription) || undefined,
  };
}

function mapPackage(item: Item, serviceSlug: string): Package {
  const tier = str(item.tier, "starter");
  return {
    id: str(item._id),
    title: str(item.title),
    serviceSlug,
    tier: (["starter", "professional", "premium"].includes(tier)
      ? tier
      : "starter") as Package["tier"],
    price: num(item.price),
    deliveryDays: num(item.deliveryDays),
    revisions: num(item.revisions),
    features: arr(item.features),
    recommended: bool(item.recommended),
    badge: str(item.badge) || undefined,
  };
}

function mapPortfolio(item: Item): PortfolioItem {
  return {
    id: str(item._id),
    title: str(item.title),
    category: str(item.category, "custom") as ServiceCategory,
    orientation: str(item.orientation, "16:9") as Orientation,
    coverImage: toImageUrl(item.coverImage),
    video: toVideoUrl(item.video),
    clientName: str(item.clientName) || undefined,
    featured: bool(item.featured),
  };
}

function mapTestimonial(item: Item): Testimonial {
  return {
    id: str(item._id),
    name: str(item.name),
    role: str(item.role),
    avatar: toImageUrl(item.avatar) || undefined,
    review: str(item.review),
    rating: num(item.rating, 5),
  };
}

function mapFaq(item: Item): Faq {
  return {
    id: str(item._id),
    question: str(item.question),
    answer: str(item.answer),
    serviceSlug: str(item.service) || undefined,
  };
}

function mapAddon(item: Item): Addon {
  return {
    title: str(item.title),
    price: num(item.price),
    description: str(item.description) || undefined,
  };
}

// ── Public API (mirrors lib/data/source.ts) ──────────────────────────────

export async function getSiteSettings(): Promise<SiteSettings> {
  const items = await find(COLLECTIONS.siteSettings);
  const s = items[0] ?? {};
  const social = (label: string, icon: string, href: unknown) =>
    str(href) ? [{ label, icon, href: str(href) }] : [];
  return {
    logo: toImageUrl(s.logo) || "/logo.png",
    email: str(s.email, "info@dvfx.in"),
    phone: str(s.phone),
    whatsapp: str(s.whatsapp),
    heroVideo: toVideoUrl(s.heroVideo),
    socialLinks: [
      ...social("Instagram", "instagram", s.instagram),
      ...social("YouTube", "youtube", s.youtube),
      ...social("LinkedIn", "linkedin", s.linkedin),
      ...social("Behance", "behance", s.behance),
    ],
    footerContent: str(s.footerContent, ""),
  };
}

export async function getServices(): Promise<Service[]> {
  const items = await find(COLLECTIONS.services, (q) => q.ascending("order"));
  return items.map(mapService);
}

export async function getFeaturedServices(): Promise<Service[]> {
  const items = await find(COLLECTIONS.services, (q) =>
    q.eq("featured", true).ascending("order"),
  );
  return items.map(mapService);
}

export async function getServiceSlugs(): Promise<string[]> {
  const items = await find(COLLECTIONS.services);
  return items.map((i) => str(i.slug)).filter(Boolean);
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const items = await find(COLLECTIONS.services, (q) => q.eq("slug", slug));
  const raw = items[0];
  if (!raw) return null;
  const service = mapService(raw);

  const [addons, faqItems, testimonialItems, related] = await Promise.all([
    find(COLLECTIONS.addons, (q) =>
      q.eq("service", service.id).ascending("order"),
    ),
    find(COLLECTIONS.faqs, (q) =>
      q.eq("service", service.id).ascending("order"),
    ),
    find(COLLECTIONS.testimonials, (q) => q.eq("service", service.id)),
    find(COLLECTIONS.services, (q) => q.eq("category", service.category)),
  ]);

  service.addons = addons.map(mapAddon);
  service.faqIds = faqItems.map((i) => str(i._id)).filter(Boolean);
  service.testimonialIds = testimonialItems
    .map((i) => str(i._id))
    .filter(Boolean);
  service.relatedSlugs = related
    .map((i) => str(i.slug))
    .filter((s) => s && s !== slug)
    .slice(0, 3);

  return service;
}

export async function getPackages(): Promise<Package[]> {
  // Resolve each package's service slug via a service id→slug map.
  const [pkgItems, serviceItems] = await Promise.all([
    find(COLLECTIONS.packages, (q) => q.ascending("order")),
    find(COLLECTIONS.services),
  ]);
  const slugById = new Map(serviceItems.map((s) => [str(s._id), str(s.slug)]));
  return pkgItems.map((p) => mapPackage(p, slugById.get(str(p.service)) ?? ""));
}

export async function getPackagesForService(slug: string): Promise<Package[]> {
  const svc = (await find(COLLECTIONS.services, (q) => q.eq("slug", slug)))[0];
  if (!svc) return [];
  const items = await find(COLLECTIONS.packages, (q) =>
    q.eq("service", str(svc._id)).ascending("order"),
  );
  return items.map((p) => mapPackage(p, slug));
}

export async function getPackageById(id: string): Promise<Package | null> {
  return (await getPackages()).find((p) => p.id === id) ?? null;
}

export async function getPortfolio(): Promise<PortfolioItem[]> {
  const items = await find(COLLECTIONS.portfolio, (q) => q.ascending("order"));
  return items.map(mapPortfolio);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const items = await find(COLLECTIONS.testimonials);
  return items.map(mapTestimonial);
}

export async function getTestimonialsByIds(
  ids: string[],
): Promise<Testimonial[]> {
  if (ids.length === 0) return [];
  const items = await find(COLLECTIONS.testimonials, (q) =>
    q.hasSome("_id", ids),
  );
  return items.map(mapTestimonial);
}

export async function getFaqs(): Promise<Faq[]> {
  const items = await find(COLLECTIONS.faqs, (q) => q.ascending("order"));
  return items.map(mapFaq);
}

export async function getFaqsByIds(ids: string[]): Promise<Faq[]> {
  if (ids.length === 0) return [];
  const items = await find(COLLECTIONS.faqs, (q) =>
    q.hasSome("_id", ids).ascending("order"),
  );
  return items.map(mapFaq);
}

export async function getGlobalFaqs(): Promise<Faq[]> {
  // Filter in JS: avoids any reference-field "isEmpty" quirk and the dataset is tiny.
  const items = await find(COLLECTIONS.faqs, (q) => q.ascending("order"));
  return items.map(mapFaq).filter((f) => !f.serviceSlug);
}

/** Brand names for the "trusted by" marquee (empty until the client adds any). */
export async function getBrands(): Promise<string[]> {
  const items = await find(COLLECTIONS.brands, (q) => q.ascending("order"));
  return items.map((i) => str(i.title)).filter(Boolean);
}

export async function getRelatedServices(slugs: string[]): Promise<Service[]> {
  if (slugs.length === 0) return [];
  const items = await find(COLLECTIONS.services, (q) =>
    q.hasSome("slug", slugs),
  );
  // preserve requested order
  const bySlug = new Map(items.map((i) => [str(i.slug), i]));
  return slugs
    .map((s) => bySlug.get(s))
    .filter((i): i is Item => Boolean(i))
    .map(mapService);
}
