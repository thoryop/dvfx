# Wix CMS Integration

The site reads all content from **Wix Headless CMS** collections on the
**DVFX Website** site (`f647c344-9098-4ed0-a1f2-e2a8c0359b7a`). Content is
edited in the Wix dashboard — no code changes or redeploys required.

## How it's wired
- `src/lib/wix/client.ts` — headless read client (`@wix/sdk` + `@wix/data`,
  anonymous visitor tokens via `OAuthStrategy`).
- `src/lib/wix/queries.ts` — typed queries that map Wix items → domain types.
- `src/lib/wix/media.ts` — converts Wix media refs → plain https URLs.
- `src/lib/data/source.ts` — the facade. When `USE_MOCK_DATA=false` it serves
  Wix; otherwise it serves built-in mock data. **Pages never change.**

## Going live (one-time)
1. Wix dashboard → **Settings → Headless** → create an **OAuth app**, copy its
   **Client ID** (it's public, not a secret).
2. In `.env.local`:
   ```
   USE_MOCK_DATA=false
   NEXT_PUBLIC_WIX_CLIENT_ID=<your client id>
   WIX_SITE_ID=f647c344-9098-4ed0-a1f2-e2a8c0359b7a
   ```
3. Restart dev / redeploy. The site now reads from Wix.
   (Leave `USE_MOCK_DATA` unset/`true` to keep using mock content.)

## Collections (created + seeded)
All have read = `ANYONE`, writes = `ADMIN`. An `order` number field controls
sorting where present.

| Collection | Key fields |
|---|---|
| **Services** | title, slug, shortDescription, longDescription, category, thumbnail (Image), heroImage (Image), demoVideo (Video), gallery (Media Gallery), features (Tags), featured (Bool), basePrice, deliveryDays, revisions, videoOrientation (`16:9`/`9:16`/`1:1`/`4:5`), seoTitle, seoDescription, order |
| **Packages** | title, **service** (Reference → Services), tier (`starter`/`professional`/`premium`), price, deliveryDays, revisions, features (Tags), recommended (Bool), badge, order |
| **Add-ons** | title, price, description, **service** (Reference → Services), order |
| **PortfolioItems** | title, category, orientation, coverImage (Image), video (Video), clientName, featured (Bool), order |
| **Testimonials** | name, role, avatar (Image), review, rating (1–5), **service** (Reference → Services, optional), featured (Bool) |
| **FAQs** | question, answer, **service** (Reference → Services, *leave empty for global FAQs* shown on Home/Pricing), order |
| **SiteSettings** | (single item) title, logo (Image), email, phone, whatsapp, heroVideo (Video), instagram/youtube/linkedin/behance (URL), footerContent |

## Editing tips for the client
- **Add a service:** new row in *Services* — set a unique **slug** (e.g.
  `wedding-films`), a `category`, prices and media. Tick **featured** to show it
  on the home page.
- **Add packages / add-ons / service FAQs:** create the row and pick the
  **Service** from the reference dropdown.
- **Global FAQs:** leave the *Service* field empty.
- **Media:** upload to the field directly, or paste an external URL.
- **Categories** use these slugs: `travel`, `short-form`, `music-video`,
  `ai-visuals`, `color-grading`, `motion-graphics`, `youtube`, `social-media`,
  `custom`.

## Notes
- Service detail pages assemble their packages, add-ons, FAQs and testimonials by
  the **Service** reference; related services are computed by matching `category`.
- Pages use ISR (`revalidate = 3600`), so content edits appear within ~an hour
  (or immediately on redeploy / on-demand revalidation added in a later phase).
