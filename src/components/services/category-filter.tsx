"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { serviceCategories } from "@/config/site";

/**
 * URL-driven category filter. Writes `?category=` so the (server) services page
 * can filter and the selection stays shareable / back-button friendly.
 */
export function CategoryFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const active = params.get("category") ?? "all";

  const select = (slug: string) => {
    const next = new URLSearchParams(params.toString());
    if (slug === "all") next.delete("category");
    else next.set("category", slug);
    const qs = next.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const chips = [{ slug: "all", label: "All" }, ...serviceCategories];

  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter services">
      {chips.map((c) => {
        const selected = active === c.slug;
        return (
          <button
            key={c.slug}
            role="tab"
            aria-selected={selected}
            onClick={() => select(c.slug)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              selected
                ? "border-brand bg-brand text-brand-foreground"
                : "border-border bg-card text-muted-foreground hover:border-brand/40 hover:text-foreground"
            )}
          >
            {c.label}
          </button>
        );
      })}
    </div>
  );
}
