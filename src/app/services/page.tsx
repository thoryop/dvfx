import * as React from "react";
import type { Metadata } from "next";

import { getServices } from "@/lib/data/source";
import { buildMetadata } from "@/lib/seo";
import { categoryLabel } from "@/config/site";
import type { ServiceCategory } from "@/types";
import { PageHeader } from "@/components/common/page-header";
import { CategoryFilter } from "@/components/services/category-filter";
import { ServiceGrid } from "@/components/services/service-grid";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "Browse video editing services — travel films, short-form, music videos, color grading, motion graphics, YouTube and more.",
  path: "/services",
});

export default async function ServicesPage({
  searchParams,
}: PageProps<"/services">) {
  const { category } = await searchParams;
  const selected = typeof category === "string" ? category : undefined;

  const all = await getServices();
  const services = selected
    ? all.filter((s) => s.category === (selected as ServiceCategory))
    : all;

  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Editing services for every story"
        description="Pick a service to see packages, demos and pricing — or request a fully custom edit."
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <CategoryFilter />
        <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">
          {services.length} {services.length === 1 ? "service" : "services"}
          {selected ? ` in ${categoryLabel(selected)}` : ""}
        </p>
        <div className="mt-6">
          <React.Suspense
            fallback={
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-80 rounded-2xl" />
                ))}
              </div>
            }
          >
            <ServiceGrid services={services} />
          </React.Suspense>
        </div>
      </section>
    </>
  );
}
