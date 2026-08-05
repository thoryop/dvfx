import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

interface BuildMetadataArgs {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}

/** Centralized Metadata builder — handles titles, canonical, OG and Twitter. */
export function buildMetadata({
  title,
  description,
  path = "/",
  image,
  noIndex = false,
}: BuildMetadataArgs = {}): Metadata {
  const url = new URL(path, siteConfig.url).toString();
  const fullTitle = title ? `${title} — ${siteConfig.name}` : siteConfig.title;
  const desc = description ?? siteConfig.description;
  const ogImage = image ?? siteConfig.ogImage;

  return {
    title: fullTitle,
    description: desc,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "website",
      url,
      title: fullTitle,
      description: desc,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [{ url: ogImage, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: [ogImage],
    },
  };
}

/** JSON-LD: Organization / brand identity for the site root. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    logo: new URL("/logo.png", siteConfig.url).toString(),
  };
}

/** JSON-LD: a single Service offering. */
export function serviceJsonLd(args: {
  name: string;
  description: string;
  slug: string;
  price: number;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: args.name,
    description: args.description,
    url: new URL(`/services/${args.slug}`, siteConfig.url).toString(),
    provider: { "@type": "Organization", name: siteConfig.name },
    ...(args.image ? { image: args.image } : {}),
    ...(args.price > 0
      ? {
          offers: {
            "@type": "Offer",
            price: args.price,
            priceCurrency: "INR",
          },
        }
      : {}),
  };
}

/** JSON-LD: breadcrumb trail. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: new URL(item.path, siteConfig.url).toString(),
    })),
  };
}

/** JSON-LD: FAQ page rich result. */
export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
