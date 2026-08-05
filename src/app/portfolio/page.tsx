import type { Metadata } from "next";

import { getPortfolio } from "@/lib/data/source";
import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/common/page-header";
import { PortfolioGallery } from "@/components/portfolio/portfolio-gallery";

export const metadata: Metadata = buildMetadata({
  title: "Portfolio",
  description:
    "A showcase of edited travel films, reels, music videos, YouTube videos and more — across every aspect ratio.",
  path: "/portfolio",
});

export const revalidate = 1800;

export default async function PortfolioPage() {
  const items = await getPortfolio();

  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title="Selected work"
        description="Landscape, portrait, square — real edits across formats. Filter by type or aspect ratio."
      />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <PortfolioGallery items={items} />
      </section>
    </>
  );
}
