import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { getServiceSlugs } from "@/lib/data/source";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes = [
    "",
    "/services",
    "/portfolio",
    "/pricing",
    "/about",
    "/contact",
    "/terms",
    "/privacy",
    "/refund-policy",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const slugs = await getServiceSlugs();
  const serviceRoutes = slugs.map((slug) => ({
    url: `${base}/services/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
