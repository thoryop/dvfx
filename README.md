# DVFX — Video Editor Portfolio & Service Marketplace

Production-grade website for a professional video editor: portfolio, service
marketplace, booking/checkout, and lead generation. Built with Next.js 16, React
19, TypeScript, Tailwind v4, shadcn/ui and Motion.

## Stack
- **Framework:** Next.js 16 (App Router, Turbopack, RSC) + TypeScript
- **Styling:** Tailwind v4, shadcn/ui (`radix-mira`), Cabinet Grotesk
- **Animation:** Motion (Framer) — reveal, stagger, counters, marquee, parallax
- **Icons:** Hugeicons
- **Planned integrations:** Wix Headless CMS, Razorpay, Tawk.to

## Getting started
```bash
bun install
cp .env.example .env.local   # optional in Phase 1 (mock data works with no keys)
bun run dev
```
Open http://localhost:3000.

Scripts: `bun run dev` · `bun run build` · `bun run start` · `bun run lint` ·
`bunx tsc --noEmit` · `bunx next typegen`.

## Architecture
- `src/app` — routes (home, services, services/[slug], pricing, portfolio,
  about, contact, checkout/[slug], payment/{success,failed}, api/leads) plus
  `sitemap.ts`, `robots.ts`, `manifest.ts`, `opengraph-image.tsx`.
- `src/components` — `layout/`, `sections/`, `services/`, `portfolio/`,
  `checkout/`, `contact/`, `media/`, `motion/`, `common/`, `ui/` (shadcn).
- `src/lib/data/source.ts` — **data facade**. Every page reads content from here.
  Today it serves `lib/data/mock.ts`; flipping `USE_MOCK_DATA=false` will serve
  Wix (Phase 2) without changing any page.
- `src/lib` — `seo.ts`, `fonts.ts`, `format.ts`, `validation.ts`, `utils.ts`.
- `src/types`, `src/config/site.ts` — domain types and static site config.

## Content
All content (services, packages, portfolio, testimonials, FAQs, settings) is
modeled in `src/types` and currently sourced from `src/lib/data/mock.ts`. These
shapes mirror the planned Wix CMS collections so the swap is drop-in.

## Roadmap
1. **UI (done)** — all pages/components, mock data, motion, a11y, SEO.
2. **CMS** — Wix collections + `lib/wix/*`, set `USE_MOCK_DATA=false`, ISR.
3. **Payments** — Razorpay order/verify/webhook, wire `checkout` + payment pages.
4. **Testing** — Lighthouse, a11y, payment E2E (test mode), SEO validation.
5. **Deployment** — Vercel env + webhook registration, domain, go-live.

See the full plan and CMS schema in the project plan document.
