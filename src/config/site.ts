import type { CategoryMeta } from "@/types";

/**
 * Static site-wide constants: identity, navigation, categories, brand.
 * Content that the client edits (prices, copy, media) lives in the CMS /
 * mock data — not here.
 */
export const siteConfig = {
  name: "DVFX",
  shortName: "DVFX",
  title: "DVFX — Premium Video Editing for Creators & Brands",
  description:
    "Travel films, short-form, music videos, color grading, motion graphics and more. Cinematic editing with fast turnaround, crafted by a professional video editor.",
  tagline: "Edits that make people stop scrolling.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://dvfx.in",
  locale: "en_IN",
  ogImage: "/opengraph-image",
  keywords: [
    "video editing",
    "travel video editor",
    "short form content",
    "music video editing",
    "color grading",
    "motion graphics",
    "YouTube editing",
    "reels editor",
  ],
} as const;

export const mainNav = [
  { title: "Home", href: "/" },
  { title: "Services", href: "/services" },
  { title: "Portfolio", href: "/portfolio" },
  { title: "Pricing", href: "/pricing" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
] as const;

export const serviceCategories: CategoryMeta[] = [
  { slug: "travel", label: "Travel Videos" },
  { slug: "short-form", label: "Short Form" },
  { slug: "music-video", label: "Music Videos" },
  { slug: "ai-visuals", label: "AI Visuals" },
  { slug: "color-grading", label: "Color Grading" },
  { slug: "motion-graphics", label: "Motion Graphics" },
  { slug: "youtube", label: "YouTube" },
  { slug: "social-media", label: "Social Media" },
  { slug: "custom", label: "Custom" },
];

export const categoryLabel = (slug: string): string =>
  serviceCategories.find((c) => c.slug === slug)?.label ?? slug;

/** Aspect-ratio classes keyed by orientation — single source for video boxes. */
export const aspectClass: Record<string, string> = {
  "16:9": "aspect-video",
  "9:16": "aspect-[9/16]",
  "1:1": "aspect-square",
  "4:5": "aspect-[4/5]",
};
