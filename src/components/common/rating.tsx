import { HugeiconsIcon } from "@hugeicons/react";
import { StarIcon } from "@hugeicons/core-free-icons";

import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  className?: string;
  size?: number;
}

/** Star rating, brand-colored. Rounds to nearest whole star. */
export function Rating({ value, className, size = 16 }: RatingProps) {
  const full = Math.round(value);
  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      aria-label={`${value} out of 5 stars`}
      role="img"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <HugeiconsIcon
          key={i}
          icon={StarIcon}
          size={size}
          strokeWidth={1.5}
          className={cn(
            i < full ? "fill-brand text-brand" : "text-muted-foreground/40"
          )}
        />
      ))}
    </div>
  );
}
