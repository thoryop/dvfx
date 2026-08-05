import * as React from "react";

import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds for one full loop. */
  speed?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
}

/**
 * Lightweight CSS-only marquee (no JS animation loop) — duplicates content for a
 * seamless scroll. Pauses for reduced-motion via the global CSS safety net.
 */
export function Marquee({
  children,
  className,
  speed = 30,
  reverse = false,
  pauseOnHover = true,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group relative flex w-full overflow-hidden [--gap:3rem]",
        className
      )}
    >
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden={i === 1}
          className={cn(
            "flex shrink-0 items-center justify-around gap-[var(--gap)] pr-[var(--gap)]",
            "animate-[marquee_var(--duration)_linear_infinite]",
            reverse && "[animation-direction:reverse]",
            pauseOnHover && "group-hover:[animation-play-state:paused]"
          )}
          style={
            { "--duration": `${speed}s` } as React.CSSProperties
          }
        >
          {children}
        </div>
      ))}
    </div>
  );
}
