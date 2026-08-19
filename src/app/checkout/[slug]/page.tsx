import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { SecurityCheckIcon, RefreshIcon, Mail01Icon } from "@hugeicons/core-free-icons";

import {
  getServiceBySlug,
  getServiceSlugs,
  getPackagesForService,
} from "@/lib/data/source";
import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/common/page-header";
import { PackagePicker } from "@/components/checkout/package-picker";

export const revalidate = 120;

export async function generateStaticParams() {
  const slugs = await getServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/checkout/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  return buildMetadata({
    title: service ? `Book ${service.title}` : "Checkout",
    path: `/checkout/${slug}`,
    noIndex: true,
  });
}

export default async function CheckoutPage({
  params,
  searchParams,
}: PageProps<"/checkout/[slug]">) {
  const { slug } = await params;
  const { package: pkgId } = await searchParams;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const packages = await getPackagesForService(slug);
  if (packages.length === 0) notFound();

  return (
    <>
      <PageHeader
        eyebrow="Checkout"
        title={`Book: ${service.title}`}
        description="Choose a package and pay securely. Need a custom scope? Request a quote instead."
      />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <PackagePicker
          packages={packages}
          serviceTitle={service.title}
          initialId={typeof pkgId === "string" ? pkgId : undefined}
        />

        {/* Trust strip */}
        <div className="mt-10 grid gap-4 rounded-2xl border border-border bg-card p-6 sm:grid-cols-3">
          {[
            { icon: SecurityCheckIcon, title: "Secure checkout", body: "Payments processed by Razorpay. We never see your card details." },
            { icon: RefreshIcon, title: "Revisions included", body: "Every package includes revisions — we refine until you approve." },
            { icon: Mail01Icon, title: "Fast, human support", body: "You'll get a confirmation and hear from me within 24 hours." },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand">
                <HugeiconsIcon icon={item.icon} size={18} strokeWidth={2} />
              </span>
              <div>
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          By paying you agree to our{" "}
          <Link href="/terms" className="underline hover:text-foreground">Terms</Link> and{" "}
          <Link href="/refund-policy" className="underline hover:text-foreground">Refund Policy</Link>.
        </p>
      </section>
    </>
  );
}
