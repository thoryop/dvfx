import Image, { type ImageProps } from "next/image";

import { cn } from "@/lib/utils";

/**
 * Thin wrapper over next/image with sensible defaults for our card/grid media.
 * Keeps a fixed aspect via the parent container (use `fill`).
 */
export function SmartImage({ className, alt, ...props }: ImageProps) {
  return (
    <Image
      alt={alt}
      className={cn("object-cover", className)}
      sizes={props.sizes ?? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
      {...props}
    />
  );
}
