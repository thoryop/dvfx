import { HugeiconsIcon } from "@hugeicons/react";
import { Tick02Icon } from "@hugeicons/core-free-icons";

import type { Package } from "@/types";
import { cn } from "@/lib/utils";
import { formatINR } from "@/lib/format";
import { CTAButton } from "@/components/common/cta-button";
import { Badge } from "@/components/ui/badge";

interface PackageCardProps {
  pkg: Package;
  /** Where the CTA goes; defaults to the checkout flow for this package. */
  href?: string;
}

export function PackageCard({ pkg, href }: PackageCardProps) {
  const target = href ?? `/checkout/${pkg.serviceSlug}?package=${pkg.id}`;
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl border bg-card p-6",
        pkg.recommended
          ? "border-brand/60 shadow-[0_0_0_1px_var(--brand)]"
          : "border-border"
      )}
    >
      {pkg.badge ? (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 border-0 bg-brand text-brand-foreground">
          {pkg.badge}
        </Badge>
      ) : null}

      <h3 className="text-lg font-bold">{pkg.title}</h3>
      <div className="mt-3 flex items-baseline gap-1">
        <span className="text-3xl font-extrabold tracking-tight">
          {formatINR(pkg.price)}
        </span>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        {pkg.deliveryDays}-day delivery · {pkg.revisions} revisions
      </p>

      <ul className="my-6 flex flex-1 flex-col gap-3">
        {pkg.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm">
            <HugeiconsIcon
              icon={Tick02Icon}
              size={18}
              strokeWidth={2.5}
              className="mt-0.5 shrink-0 text-brand"
            />
            <span className="text-foreground/90">{f}</span>
          </li>
        ))}
      </ul>

      <CTAButton
        href={target}
        variant={pkg.recommended ? "brand" : "outline"}
        className="w-full"
      >
        Choose {pkg.title}
      </CTAButton>
    </div>
  );
}
