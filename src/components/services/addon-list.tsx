import { HugeiconsIcon } from "@hugeicons/react";
import { PlusSignIcon } from "@hugeicons/core-free-icons";

import type { Addon } from "@/types";
import { formatINR } from "@/lib/format";

export function AddonList({ addons }: { addons: Addon[] }) {
  if (addons.length === 0) return null;
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {addons.map((addon) => (
        <li
          key={addon.title}
          className="flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-4"
        >
          <div className="flex items-center gap-3">
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
              <HugeiconsIcon icon={PlusSignIcon} size={16} strokeWidth={2.5} />
            </span>
            <span className="text-sm font-medium">{addon.title}</span>
          </div>
          <span className="text-sm font-semibold text-brand">
            +{formatINR(addon.price)}
          </span>
        </li>
      ))}
    </ul>
  );
}
