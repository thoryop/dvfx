/**
 * Generic, service-agnostic plans shown on the Pricing page and Home teaser.
 * Service-specific packages live in the CMS (mock.ts `packages`); these are the
 * headline "from" tiers for quick comparison.
 */
export interface Plan {
  id: string;
  name: string;
  price: number;
  tagline: string;
  features: string[];
  recommended?: boolean;
  badge?: string;
}

export const oneTimePlans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: 2500,
    tagline: "Single short edit to test the waters.",
    features: [
      "1 video up to 1 min",
      "1 revision",
      "HD 1080p export",
      "Basic color correction",
      "2–3 day delivery",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    price: 6000,
    tagline: "The sweet spot for serious creators.",
    features: [
      "1 video up to 3 min",
      "3 revisions",
      "4K export",
      "Cinematic color grade",
      "Sound design & SFX",
      "Priority support",
    ],
    recommended: true,
    badge: "Most popular",
  },
  {
    id: "premium",
    name: "Premium",
    price: 14000,
    tagline: "Full-scale production polish.",
    features: [
      "1 video up to 6 min",
      "5 revisions",
      "4K + vertical cut-down",
      "Advanced grade & VFX",
      "Motion graphics",
      "Source project files",
    ],
  },
];

export const supportPlans: Plan[] = [
  {
    id: "creator",
    name: "Creator",
    price: 18000,
    tagline: "For consistent weekly content.",
    features: [
      "4 long-form edits / month",
      "8 short-form cut-downs",
      "Thumbnails included",
      "48h turnaround",
      "Dedicated editor",
    ],
  },
  {
    id: "brand",
    name: "Brand",
    price: 45000,
    tagline: "For brands publishing daily.",
    features: [
      "10 long-form edits / month",
      "20 short-form / reels",
      "Motion graphics templates",
      "24h priority turnaround",
      "Monthly strategy call",
    ],
    recommended: true,
    badge: "Best value",
  },
];
