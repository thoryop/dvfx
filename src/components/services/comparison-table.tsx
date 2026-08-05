import { HugeiconsIcon } from "@hugeicons/react";
import { Tick02Icon, Cancel01Icon } from "@hugeicons/core-free-icons";

import type { Package } from "@/types";
import { cn } from "@/lib/utils";
import { formatINR } from "@/lib/format";

/**
 * Feature matrix across package tiers. Rows are the union of all features;
 * a tier gets a check if it includes that feature.
 */
export function ComparisonTable({ packages }: { packages: Package[] }) {
  if (packages.length === 0) return null;

  const allFeatures = Array.from(
    new Set(packages.flatMap((p) => p.features))
  );

  return (
    <div className="overflow-x-auto rounded-2xl border border-border">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border bg-card">
            <th className="p-4 text-left font-semibold">Features</th>
            {packages.map((p) => (
              <th key={p.id} className="p-4 text-center">
                <div className="flex flex-col items-center gap-1">
                  <span className="font-bold">{p.title}</span>
                  <span className="text-brand">{formatINR(p.price)}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-border">
            <td className="p-4 text-muted-foreground">Delivery time</td>
            {packages.map((p) => (
              <td key={p.id} className="p-4 text-center">{p.deliveryDays} days</td>
            ))}
          </tr>
          <tr className="border-b border-border">
            <td className="p-4 text-muted-foreground">Revisions</td>
            {packages.map((p) => (
              <td key={p.id} className="p-4 text-center">{p.revisions}</td>
            ))}
          </tr>
          {allFeatures.map((feature, i) => (
            <tr
              key={feature}
              className={cn(i !== allFeatures.length - 1 && "border-b border-border")}
            >
              <td className="p-4 text-foreground/90">{feature}</td>
              {packages.map((p) => (
                <td key={p.id} className="p-4">
                  <div className="flex justify-center">
                    {p.features.includes(feature) ? (
                      <HugeiconsIcon
                        icon={Tick02Icon}
                        size={18}
                        strokeWidth={2.5}
                        className="text-brand"
                      />
                    ) : (
                      <HugeiconsIcon
                        icon={Cancel01Icon}
                        size={16}
                        strokeWidth={2}
                        className="text-muted-foreground/40"
                      />
                    )}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
