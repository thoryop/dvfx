"use client";

import * as React from "react";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlayCircleIcon } from "@hugeicons/core-free-icons";

import { cn } from "@/lib/utils";
import { aspectClass } from "@/config/site";
import type { Orientation } from "@/types";

interface ResponsiveVideoProps {
  orientation: Orientation;
  poster: string;
  src?: string;
  title?: string;
  className?: string;
  priority?: boolean;
  /** Constrain portrait/square media height on desktop so it doesn't dominate. */
  contain?: boolean;
}

/**
 * Aspect-aware video container. Renders the poster as a fast LCP-friendly image;
 * the actual <video> is only created after the user hits play (lazy, zero cost
 * to initial load). Works for 16:9 / 9:16 / 1:1 / 4:5 via `aspectClass`.
 */
export function ResponsiveVideo({
  orientation,
  poster,
  src,
  title,
  className,
  priority = false,
  contain = false,
}: ResponsiveVideoProps) {
  const [playing, setPlaying] = React.useState(false);
  const portrait = orientation === "9:16" || orientation === "4:5";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-border bg-muted",
        aspectClass[orientation],
        contain && portrait && "mx-auto max-h-[70vh] w-auto",
        className
      )}
    >
      {playing && src ? (
        <video
          className="absolute inset-0 size-full object-cover"
          src={src}
          poster={poster}
          controls
          autoPlay
          playsInline
        />
      ) : (
        <>
          <Image
            src={poster}
            alt={title ?? "Video preview"}
            fill
            priority={priority}
            sizes={portrait ? "(max-width: 768px) 80vw, 420px" : "(max-width: 768px) 100vw, 800px"}
            className="object-cover"
          />
          {src ? (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`Play ${title ?? "video"}`}
              className="group absolute inset-0 grid place-items-center bg-black/20 transition-colors hover:bg-black/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-inset"
            >
              <span className="grid size-16 place-items-center rounded-full bg-brand/90 text-brand-foreground shadow-lg transition-transform group-hover:scale-105">
                <HugeiconsIcon icon={PlayCircleIcon} size={36} strokeWidth={1.8} />
              </span>
            </button>
          ) : null}
        </>
      )}
    </div>
  );
}
