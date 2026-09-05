import type {
  Faq,
  Package,
  PortfolioItem,
  Service,
  SiteSettings,
  Testimonial,
} from "@/types";

/**
 * Phase-1 content source. Shapes match the Wix CMS collections exactly so the
 * data facade (lib/data/source.ts) can swap to Wix without touching pages.
 * Media uses deterministic picsum seeds + public sample videos.
 */

const img = (seed: string, w = 1280, h = 720) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

const SAMPLE_VIDEO =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBigBuckBunnyTinyTV.mp4";

export const siteSettings: SiteSettings = {
  logo: "/logo.png",
  email: "info@dvfx.in",
  phone: "+91 98765 43210",
  whatsapp: "919876543210",
  heroVideo: SAMPLE_VIDEO,
  socialLinks: [
    { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
    { label: "YouTube", href: "https://youtube.com", icon: "youtube" },
    { label: "Behance", href: "https://behance.net", icon: "behance" },
    { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
  ],
  footerContent:
    "Cinematic edits for creators, artists and brands — delivered fast, crafted with care.",
};

export const services: Service[] = [
  {
    id: "svc-travel",
    title: "Travel Video Editing",
    slug: "travel-video-editing",
    shortDescription:
      "Cinematic travel films with story-driven pacing, color and sound design.",
    longDescription:
      "Turn your raw travel footage into a cinematic story. I handle pacing, beat-synced cuts, color grading and immersive sound design so your journey feels like a short film. Perfect for vloggers, destinations and tourism brands.",
    category: "travel",
    thumbnail: img("travel-thumb", 800, 600),
    heroImage: img("travel-hero", 1600, 900),
    featured: true,
    basePrice: 8000,
    deliveryDays: 5,
    revisions: 3,
    videoOrientation: "16:9",
    gallery: [
      img("travel-g1"),
      img("travel-g2"),
      img("travel-g3"),
      img("travel-g4"),
    ],
    demoVideo: SAMPLE_VIDEO,
    features: [
      "Story-driven edit",
      "Cinematic color grade",
      "Beat-synced cuts",
      "Sound design & mix",
      "Licensed music guidance",
    ],
    addons: [
      { title: "Extra 60s of runtime", price: 2000 },
      { title: "Vertical reel cut-down", price: 1500 },
      { title: "Custom title animation", price: 2500 },
    ],
    faqIds: ["faq-files", "faq-revisions", "faq-music"],
    testimonialIds: ["t-1", "t-4"],
    relatedSlugs: ["short-form-content", "color-grading", "youtube-editing"],
    seoTitle: "Travel Video Editing — Cinematic Travel Films | DVFX",
    seoDescription:
      "Professional cinematic travel video editing with color grading, sound design and story-driven pacing.",
  },
  {
    id: "svc-short",
    title: "Short Form Content",
    slug: "short-form-content",
    shortDescription:
      "Scroll-stopping Reels, Shorts & TikToks with punchy captions and retention edits.",
    longDescription:
      "High-retention vertical edits engineered for the algorithm — hook in the first second, dynamic captions, sound effects, zoom punches and clean pacing. Built to grow your audience and drive saves and shares.",
    category: "short-form",
    thumbnail: img("short-thumb", 600, 800),
    heroImage: img("short-hero", 1600, 900),
    featured: true,
    basePrice: 2500,
    deliveryDays: 2,
    revisions: 2,
    videoOrientation: "9:16",
    gallery: [
      img("short-g1", 600, 800),
      img("short-g2", 600, 800),
      img("short-g3", 600, 800),
    ],
    demoVideo: SAMPLE_VIDEO,
    features: [
      "Hook-first structure",
      "Animated captions",
      "Sound effects & SFX",
      "Trend-aware pacing",
      "Platform-ready exports",
    ],
    addons: [
      { title: "Thumbnail design", price: 800 },
      { title: "3 extra hooks (A/B test)", price: 1200 },
    ],
    faqIds: ["faq-files", "faq-turnaround"],
    testimonialIds: ["t-2", "t-5"],
    relatedSlugs: [
      "social-media-content",
      "youtube-editing",
      "travel-video-editing",
    ],
  },
  {
    id: "svc-music",
    title: "Music Video Editing",
    slug: "music-video-editing",
    shortDescription:
      "Rhythm-locked music videos with creative transitions and mood grading.",
    longDescription:
      "From performance cuts to narrative music videos — tight beat syncing, creative transitions, speed ramps and a grade that matches your track's mood. For independent artists and labels.",
    category: "music-video",
    thumbnail: img("music-thumb", 800, 600),
    heroImage: img("music-hero", 1600, 900),
    featured: true,
    basePrice: 12000,
    deliveryDays: 7,
    revisions: 3,
    videoOrientation: "16:9",
    gallery: [img("music-g1"), img("music-g2"), img("music-g3")],
    demoVideo: SAMPLE_VIDEO,
    features: [
      "Beat-perfect sync",
      "Creative transitions",
      "Speed ramps",
      "Mood color grade",
      "Multi-cam editing",
    ],
    addons: [
      { title: "Lyric text animation", price: 3000 },
      { title: "VFX cleanup pass", price: 4000 },
    ],
    faqIds: ["faq-revisions", "faq-files"],
    testimonialIds: ["t-3"],
    relatedSlugs: ["color-grading", "motion-graphics", "ai-visuals"],
  },
  {
    id: "svc-ai",
    title: "AI Visuals",
    slug: "ai-visuals",
    shortDescription:
      "AI-generated b-roll, transitions and surreal visuals integrated seamlessly.",
    longDescription:
      "Blend AI-generated imagery and motion into your edit — surreal b-roll, style transfers and impossible transitions, composited and color-matched so it feels intentional, not gimmicky.",
    category: "ai-visuals",
    thumbnail: img("ai-thumb", 800, 600),
    heroImage: img("ai-hero", 1600, 900),
    featured: false,
    basePrice: 6000,
    deliveryDays: 5,
    revisions: 2,
    videoOrientation: "16:9",
    gallery: [img("ai-g1"), img("ai-g2"), img("ai-g3")],
    demoVideo: SAMPLE_VIDEO,
    features: [
      "AI b-roll generation",
      "Style transfer",
      "Seamless compositing",
      "Color matching",
    ],
    addons: [{ title: "Extra AI scene", price: 2000 }],
    faqIds: ["faq-files", "faq-revisions"],
    testimonialIds: ["t-1"],
    relatedSlugs: ["motion-graphics", "music-video-editing", "color-grading"],
  },
  {
    id: "svc-color",
    title: "Color Grading",
    slug: "color-grading",
    shortDescription:
      "Professional DaVinci Resolve grading — cinematic looks and consistent tones.",
    longDescription:
      "Pro color grading in DaVinci Resolve: balance, primary and secondary grades, skin-tone protection and a cinematic look tailored to your footage. Delivered with LUTs on request.",
    category: "color-grading",
    thumbnail: img("color-thumb", 800, 600),
    heroImage: img("color-hero", 1600, 900),
    featured: true,
    basePrice: 4000,
    deliveryDays: 3,
    revisions: 2,
    videoOrientation: "16:9",
    gallery: [img("color-g1"), img("color-g2"), img("color-g3")],
    demoVideo: SAMPLE_VIDEO,
    features: [
      "Primary & secondary grade",
      "Shot matching",
      "Skin-tone protection",
      "Custom LUT (on request)",
    ],
    addons: [{ title: "Custom LUT pack", price: 2000 }],
    faqIds: ["faq-files", "faq-turnaround"],
    testimonialIds: ["t-4"],
    relatedSlugs: [
      "travel-video-editing",
      "music-video-editing",
      "youtube-editing",
    ],
  },
  {
    id: "svc-motion",
    title: "Motion Graphics",
    slug: "motion-graphics",
    shortDescription:
      "Logo animations, lower-thirds and explainer motion design in After Effects.",
    longDescription:
      "Custom motion design in After Effects — animated logos, lower-thirds, kinetic typography and explainer sequences that elevate your brand and clarify your message.",
    category: "motion-graphics",
    thumbnail: img("motion-thumb", 800, 600),
    heroImage: img("motion-hero", 1600, 900),
    featured: false,
    basePrice: 5000,
    deliveryDays: 4,
    revisions: 3,
    videoOrientation: "16:9",
    gallery: [img("motion-g1"), img("motion-g2"), img("motion-g3")],
    demoVideo: SAMPLE_VIDEO,
    features: [
      "Logo animation",
      "Kinetic typography",
      "Lower-thirds pack",
      "Explainer sequences",
    ],
    addons: [{ title: "Source project file", price: 2500 }],
    faqIds: ["faq-files", "faq-revisions"],
    testimonialIds: ["t-5"],
    relatedSlugs: ["ai-visuals", "youtube-editing", "social-media-content"],
  },
  {
    id: "svc-youtube",
    title: "YouTube Video Editing",
    slug: "youtube-editing",
    shortDescription:
      "Long-form YouTube edits with retention pacing, b-roll and clean graphics.",
    longDescription:
      "End-to-end YouTube editing: tight retention pacing, b-roll integration, clean graphics, captions and chapter markers. Optional thumbnail design to maximize click-through.",
    category: "youtube",
    thumbnail: img("yt-thumb", 800, 600),
    heroImage: img("yt-hero", 1600, 900),
    featured: true,
    basePrice: 5000,
    deliveryDays: 4,
    revisions: 2,
    videoOrientation: "16:9",
    gallery: [img("yt-g1"), img("yt-g2"), img("yt-g3")],
    demoVideo: SAMPLE_VIDEO,
    features: [
      "Retention pacing",
      "B-roll integration",
      "Captions & chapters",
      "Clean graphics",
    ],
    addons: [
      { title: "Thumbnail design", price: 1000 },
      { title: "Shorts cut-downs (x3)", price: 2500 },
    ],
    faqIds: ["faq-files", "faq-turnaround", "faq-revisions"],
    testimonialIds: ["t-2", "t-3"],
    relatedSlugs: ["short-form-content", "color-grading", "motion-graphics"],
  },
  {
    id: "svc-social",
    title: "Social Media Content",
    slug: "social-media-content",
    shortDescription:
      "Batch social edits across formats — consistent, on-brand and scheduled-ready.",
    longDescription:
      "Monthly batches of on-brand social content across square, vertical and portrait formats. Consistent templates, captions and exports ready to schedule across platforms.",
    category: "social-media",
    thumbnail: img("social-thumb", 800, 800),
    heroImage: img("social-hero", 1600, 900),
    featured: false,
    basePrice: 9000,
    deliveryDays: 6,
    revisions: 2,
    videoOrientation: "1:1",
    gallery: [
      img("social-g1", 800, 800),
      img("social-g2", 800, 800),
      img("social-g3", 800, 800),
    ],
    demoVideo: SAMPLE_VIDEO,
    features: [
      "Multi-format exports",
      "On-brand templates",
      "Batch delivery",
      "Caption copy",
    ],
    addons: [{ title: "Extra 5 posts", price: 3000 }],
    faqIds: ["faq-files", "faq-turnaround"],
    testimonialIds: ["t-5"],
    relatedSlugs: ["short-form-content", "youtube-editing", "motion-graphics"],
  },
  {
    id: "svc-custom",
    title: "Custom Editing Services",
    slug: "custom-editing-services",
    shortDescription:
      "Have something unique? Get a tailored quote for any editing project.",
    longDescription:
      "Documentaries, weddings, ads, event recaps, multi-cam — if it's not on the list, it's a custom project. Tell me your vision and I'll send a tailored scope, timeline and quote.",
    category: "custom",
    thumbnail: img("custom-thumb", 800, 600),
    heroImage: img("custom-hero", 1600, 900),
    featured: false,
    basePrice: 0,
    deliveryDays: 0,
    revisions: 0,
    videoOrientation: "16:9",
    gallery: [img("custom-g1"), img("custom-g2")],
    features: [
      "Tailored scope",
      "Flexible timeline",
      "Any format",
      "Direct collaboration",
    ],
    addons: [],
    faqIds: ["faq-turnaround", "faq-revisions"],
    testimonialIds: ["t-1", "t-3"],
    relatedSlugs: [
      "travel-video-editing",
      "music-video-editing",
      "youtube-editing",
    ],
  },
];

const tiered = (serviceSlug: string, base: number): Package[] => [
  {
    id: `${serviceSlug}-starter`,
    title: "Starter",
    serviceSlug,
    tier: "starter",
    price: base,
    deliveryDays: 5,
    revisions: 1,
    features: [
      "Up to 1 min edit",
      "1 revision",
      "HD 1080p export",
      "Basic color",
    ],
    recommended: false,
  },
  {
    id: `${serviceSlug}-professional`,
    title: "Professional",
    serviceSlug,
    tier: "professional",
    price: Math.round(base * 1.8),
    deliveryDays: 4,
    revisions: 3,
    features: [
      "Up to 3 min edit",
      "3 revisions",
      "4K export",
      "Cinematic grade",
      "Sound design",
    ],
    recommended: true,
    badge: "Most popular",
  },
  {
    id: `${serviceSlug}-premium`,
    title: "Premium",
    serviceSlug,
    tier: "premium",
    price: Math.round(base * 3),
    deliveryDays: 3,
    revisions: 5,
    features: [
      "Up to 6 min edit",
      "5 revisions",
      "4K + vertical cut",
      "Advanced grade & VFX",
      "Priority delivery",
      "Source files",
    ],
    recommended: false,
  },
];

export const packages: Package[] = services
  .filter((s) => s.basePrice > 0)
  .flatMap((s) => tiered(s.slug, s.basePrice));

export const portfolioItems: PortfolioItem[] = [
  {
    id: "p1",
    title: "Himalayan Escape",
    category: "travel",
    orientation: "16:9",
    coverImage: img("p1", 1280, 720),
    video: SAMPLE_VIDEO,
    clientName: "Wander Co.",
    featured: true,
  },
  {
    id: "p2",
    title: "Neon Nights Reel",
    category: "short-form",
    orientation: "9:16",
    coverImage: img("p2", 720, 1280),
    video: SAMPLE_VIDEO,
    clientName: "Glow",
    featured: true,
  },
  {
    id: "p3",
    title: "Echoes — Official MV",
    category: "music-video",
    orientation: "16:9",
    coverImage: img("p3", 1280, 720),
    video: SAMPLE_VIDEO,
    clientName: "Aria",
    featured: true,
  },
  {
    id: "p4",
    title: "Brand Loop",
    category: "social-media",
    orientation: "1:1",
    coverImage: img("p4", 1000, 1000),
    video: SAMPLE_VIDEO,
    clientName: "Nimbus",
    featured: false,
  },
  {
    id: "p5",
    title: "Dream Sequence",
    category: "ai-visuals",
    orientation: "16:9",
    coverImage: img("p5", 1280, 720),
    video: SAMPLE_VIDEO,
    clientName: "Synth",
    featured: true,
  },
  {
    id: "p6",
    title: "Tech Review Cut",
    category: "youtube",
    orientation: "16:9",
    coverImage: img("p6", 1280, 720),
    video: SAMPLE_VIDEO,
    clientName: "GearLab",
    featured: false,
  },
  {
    id: "p7",
    title: "Product Drop",
    category: "short-form",
    orientation: "4:5",
    coverImage: img("p7", 1000, 1250),
    video: SAMPLE_VIDEO,
    clientName: "Kicks",
    featured: false,
  },
  {
    id: "p8",
    title: "Cinematic Grade Reel",
    category: "color-grading",
    orientation: "16:9",
    coverImage: img("p8", 1280, 720),
    video: SAMPLE_VIDEO,
    clientName: "Studio 9",
    featured: true,
  },
  {
    id: "p9",
    title: "Logo Sting Pack",
    category: "motion-graphics",
    orientation: "1:1",
    coverImage: img("p9", 1000, 1000),
    video: SAMPLE_VIDEO,
    clientName: "Forge",
    featured: false,
  },
  {
    id: "p10",
    title: "Coastline Diaries",
    category: "travel",
    orientation: "9:16",
    coverImage: img("p10", 720, 1280),
    video: SAMPLE_VIDEO,
    clientName: "Roam",
    featured: false,
  },
  {
    id: "p11",
    title: "Festival Aftermovie",
    category: "music-video",
    orientation: "16:9",
    coverImage: img("p11", 1280, 720),
    video: SAMPLE_VIDEO,
    clientName: "Pulse",
    featured: false,
  },
  {
    id: "p12",
    title: "Daily Vlog Series",
    category: "youtube",
    orientation: "16:9",
    coverImage: img("p12", 1280, 720),
    video: SAMPLE_VIDEO,
    clientName: "Maya",
    featured: false,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t-1",
    name: "Rahul Mehta",
    role: "Travel Creator",
    avatar: img("av1", 200, 200),
    review:
      "DVFX turned my messy GoPro clips into a film I'm genuinely proud of. The pacing and grade are next level.",
    rating: 5,
  },
  {
    id: "t-2",
    name: "Sneha Kapoor",
    role: "YouTuber, 480K subs",
    avatar: img("av2", 200, 200),
    review:
      "My retention went up noticeably after switching editors. Fast, communicative and the captions are perfect.",
    rating: 5,
  },
  {
    id: "t-3",
    name: "Arjun Nair",
    role: "Independent Artist",
    avatar: img("av3", 200, 200),
    review:
      "Beat-synced edits that actually feel the music. The music video exceeded what I had in my head.",
    rating: 5,
  },
  {
    id: "t-4",
    name: "Priya Sharma",
    role: "Brand Manager, Nimbus",
    avatar: img("av4", 200, 200),
    review:
      "Reliable, on-brand and always on time. Our social engagement has clearly improved.",
    rating: 5,
  },
  {
    id: "t-5",
    name: "Karan Patel",
    role: "Startup Founder",
    avatar: img("av5", 200, 200),
    review:
      "From explainer motion graphics to reels, everything was cohesive and premium. Highly recommend.",
    rating: 5,
  },
];

export const faqs: Faq[] = [
  {
    id: "faq-files",
    question: "How do I send my footage?",
    answer:
      "Share a Google Drive, Dropbox or WeTransfer link with your raw files, references and any music. I'll confirm scope before starting.",
  },
  {
    id: "faq-revisions",
    question: "How do revisions work?",
    answer:
      "Each package includes a set number of revision rounds. Send timestamped notes and I'll turn them around quickly. Extra rounds can be added anytime.",
  },
  {
    id: "faq-turnaround",
    question: "What's the typical turnaround?",
    answer:
      "Most projects deliver in 2–7 days depending on length and complexity. Priority delivery is available on Premium and as an add-on.",
  },
  {
    id: "faq-music",
    question: "Do you provide music?",
    answer:
      "I'll guide you to royalty-free or licensed tracks that fit your edit, or work with music you provide. Licensing remains your responsibility.",
  },
  {
    id: "faq-payment",
    question: "How does payment work?",
    answer:
      "Fixed packages are paid securely online via Razorpay. Custom projects get a tailored quote and an invoice/payment link once scope is agreed.",
  },
];

/** Lightweight stats for the Home stats section. */
export const stats = [
  { label: "Projects delivered", value: 480, suffix: "+" },
  { label: "Happy clients", value: 120, suffix: "+" },
  { label: "Avg. turnaround", value: 3, suffix: " days" },
  { label: "Years editing", value: 6, suffix: "+" },
];

/** Brands marquee. */
export const brands = [
  "Wander Co.",
  "Glow",
  "Aria Music",
  "Nimbus",
  "Synth",
  "GearLab",
  "Kicks",
  "Studio 9",
  "Forge",
  "Pulse",
];

/** Process steps for the Home process section. */
export const processSteps = [
  {
    step: "01",
    title: "Brief & Footage",
    description:
      "You share your raw footage, references and goals. We align on the vision.",
  },
  {
    step: "02",
    title: "First Cut",
    description:
      "I build the structure, pacing and story, then send a watermarked preview.",
  },
  {
    step: "03",
    title: "Polish & Grade",
    description:
      "Color grade, sound design, graphics and your revision notes applied.",
  },
  {
    step: "04",
    title: "Delivery",
    description:
      "Final files in the formats you need — ready to publish everywhere.",
  },
];
