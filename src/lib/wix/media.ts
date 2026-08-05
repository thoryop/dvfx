import { getImageUrl, getVideoUrl } from "@wix/sdk/media";

/**
 * Normalize a Wix media field into a plain https URL usable by next/image / video.
 * CMS media fields return either an external web URL (passed through) or a Wix
 * media identifier like `wix:image://...` / `wix:video://...` (converted).
 */
export function toImageUrl(value: unknown): string {
  if (!value || typeof value !== "string") return "";
  if (value.startsWith("http")) return value;
  if (value.startsWith("wix:image")) {
    try {
      return getImageUrl(value).url;
    } catch {
      return "";
    }
  }
  return "";
}

export function toVideoUrl(value: unknown): string | undefined {
  if (!value || typeof value !== "string") return undefined;
  if (value.startsWith("http")) return value;
  if (value.startsWith("wix:video")) {
    try {
      return getVideoUrl(value).url;
    } catch {
      return undefined;
    }
  }
  return undefined;
}

/**
 * MEDIA_GALLERY returns an array of items that may be plain URL strings or
 * objects ({ src | url | ... }). Flatten them to a list of https image URLs.
 */
export function toGalleryUrls(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((entry) => {
      if (typeof entry === "string") return toImageUrl(entry);
      if (entry && typeof entry === "object") {
        const obj = entry as Record<string, unknown>;
        const candidate = obj.src ?? obj.url ?? obj.image ?? obj.slug;
        return toImageUrl(candidate);
      }
      return "";
    })
    .filter(Boolean);
}
