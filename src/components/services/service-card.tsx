import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Clock01Icon,
  RefreshIcon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";

import type { Service } from "@/types";
import { categoryLabel } from "@/config/site";
import { formatINR } from "@/lib/format";
import { SmartImage } from "@/components/media/smart-image";
import { Badge } from "@/components/ui/badge";

/** Service card for grids — thumbnail, meta, starting price and CTA. */
export function ServiceCard({ service }: { service: Service }) {
  const custom = service.basePrice === 0;
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/40"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <SmartImage
          src={service.thumbnail}
          alt={service.title}
          fill
          className="transition-transform duration-500 group-hover:scale-105"
        />
        <Badge className="absolute left-3 top-3 border-0 bg-background/70 text-foreground backdrop-blur">
          {categoryLabel(service.category)}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-lg font-bold tracking-tight">{service.title}</h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {service.shortDescription}
        </p>

        <div className="mt-auto flex items-center gap-4 pt-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <HugeiconsIcon icon={Clock01Icon} size={14} strokeWidth={2} />
            {custom ? "Flexible" : `${service.deliveryDays}d`}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <HugeiconsIcon icon={RefreshIcon} size={14} strokeWidth={2} />
            {custom ? "Custom" : `${service.revisions} revisions`}
          </span>
        </div>

        <div className="flex items-center justify-between border-t border-border pt-4">
          <div className="flex flex-col">
            <span className="text-[0.7rem] uppercase tracking-wide text-muted-foreground">
              {custom ? "Pricing" : "Starting at"}
            </span>
            <span className="text-base font-bold text-foreground">
              {custom ? "Get a quote" : formatINR(service.basePrice)}
            </span>
          </div>
          <span className="inline-flex size-9 items-center justify-center rounded-full bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
            <HugeiconsIcon icon={ArrowRight01Icon} size={18} strokeWidth={2} />
          </span>
        </div>
      </div>
    </Link>
  );
}
