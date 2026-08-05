"use client";


import * as React from "react";

import { cn } from "@/lib/utils";
import { serviceCategories } from "@/config/site";
import type { Orientation, PortfolioItem } from "@/types";
import { ResponsiveVideo } from "@/components/media/responsive-video";

const orientations: { key: Orientation | "all"; label: string }[] = [
  { key: "all", label: "All ratios" },
  { key: "16:9", label: "Landscape 16:9" },
  { key: "9:16", label: "Portrait 9:16" },
  { key: "1:1", label: "Square 1:1" },
  { key: "4:5", label: "Portrait 4:5" },
];

export function PortfolioGallery({ items }: { items: PortfolioItem[] }) {
  const [category, setCategory] = React.useState<string>("all");
  const [orientation, setOrientation] = React.useState<Orientation | "all">("all");

  const filtered = items.filter(
    (i) =>
      (category === "all" || i.category === category) &&
      (orientation === "all" || i.orientation === orientation)
  );

  const categories = [{ slug: "all", label: "All" }, ...serviceCategories];

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
          {categories.map((c) => (
            <button
              key={c.slug}
              role="tab"
              aria-selected={category === c.slug}
              onClick={() => setCategory(c.slug)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                category === c.slug
                  ? "border-brand bg-brand text-brand-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-brand/40 hover:text-foreground"
              )}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by aspect ratio">
          {orientations.map((o) => (
            <button
              key={o.key}
              role="tab"
              aria-selected={orientation === o.key}
              onClick={() => setOrientation(o.key)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                orientation === o.key
                  ? "border-foreground/60 bg-foreground/10 text-foreground"
                  : "border-border text-muted-foreground hover:text-foreground"
              )}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "project" : "projects"}
      </p>

      {filtered.length === 0 ? (
        <p className="mt-10 rounded-xl border border-dashed border-border py-16 text-center text-muted-foreground">
          No projects match these filters.
        </p>
      ) : (
        <div className="mt-6 gap-5 [column-fill:_balance] sm:columns-2 lg:columns-3">
          {filtered.map((item) => (
            <figure key={item.id} className="mb-5 break-inside-avoid">
              <ResponsiveVideo
                orientation={item.orientation}
                poster={item.coverImage}
                src={item.video}
                title={item.title}
              />
              <figcaption className="mt-2 flex items-center justify-between px-1">
                <span className="text-sm font-medium">{item.title}</span>
                {item.clientName ? (
                  <span className="text-xs text-muted-foreground">{item.clientName}</span>
                ) : null}
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}
