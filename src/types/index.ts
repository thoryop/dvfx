/**
 * Domain types. These mirror the Wix CMS collections (see plan §2) so the
 * mock data source and the future Wix data source are interchangeable.
 */

export type Orientation = "16:9" | "9:16" | "1:1" | "4:5";

export type ServiceCategory =
  | "travel"
  | "short-form"
  | "music-video"
  | "ai-visuals"
  | "color-grading"
  | "motion-graphics"
  | "youtube"
  | "social-media"
  | "custom";

export interface Addon {
  title: string;
  price: number;
  description?: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  category: ServiceCategory;
  thumbnail: string;
  heroImage: string;
  featured: boolean;
  basePrice: number;
  deliveryDays: number;
  revisions: number;
  videoOrientation: Orientation;
  gallery: string[];
  demoVideo?: string;
  features: string[];
  addons: Addon[];
  faqIds: string[];
  testimonialIds: string[];
  relatedSlugs: string[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface Package {
  id: string;
  title: string;
  serviceSlug: string;
  tier: "starter" | "professional" | "premium";
  price: number;
  deliveryDays: number;
  revisions: number;
  features: string[];
  recommended: boolean;
  badge?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: ServiceCategory;
  orientation: Orientation;
  coverImage: string;
  video?: string;
  clientName?: string;
  featured: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  review: string;
  rating: number;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  serviceSlug?: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export interface SiteSettings {
  logo: string;
  email: string;
  phone: string;
  whatsapp: string;
  heroVideo?: string;
  socialLinks: SocialLink[];
  footerContent: string;
}

export interface CategoryMeta {
  slug: ServiceCategory;
  label: string;
}
