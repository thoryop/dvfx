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
  /** Cover image. If empty, a frame is auto-derived from the video (YouTube-style). */
  poster?: string;
  src?: string;
  title?: string;
  className?: string;
  priority?: boolean;
  /** Constrain portrait/square media height on desktop so it doesn't dominate. */
  contain?: boolean;
}

/**
 * Aspect-aware video container.
 * - With a `poster`: renders it as a fast, LCP-friendly image and lazy-loads the
 *   <video> only on play.
 * - Without a `poster`: shows a still frame pulled from the video itself (seeks
 *   ~1s in, metadata-only), so portfolio items never need a manual thumbnail.
 * Works for 16:9 / 9:16 / 1:1 / 4:5 via `aspectClass`.
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
  const hasPoster = Boolean(poster);

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
          poster={poster || undefined}
          controls
          autoPlay
          playsInline
        />
      ) : (
        <>
          {hasPoster ? (
            <Image
              src={poster as string}
              alt={title ?? "Video preview"}
              fill
              priority={priority}
              sizes={portrait ? "(max-width: 768px) 80vw, 420px" : "(max-width: 768px) 100vw, 800px"}
              className="object-cover"
            />
          ) : src ? (
            // No cover image: derive a thumbnail frame from the video itself.
            <video
              className="absolute inset-0 size-full object-cover"
              src={src}
              muted
              playsInline
              preload="metadata"
              aria-hidden="true"
              onLoadedMetadata={(e) => {
                const v = e.currentTarget;
                try {
                  v.currentTime = Math.min(1, (v.duration || 2) / 2);
                } catch {
                  /* seeking not supported — first frame stays */
                }
              }}
            />
          ) : null}

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
