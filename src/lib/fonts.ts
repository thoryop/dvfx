import localFont from "next/font/local";

/**
 * Cabinet Grotesk — the brand typeface used across the whole site.
 * Files live in /public/font. We expose it as the `--font-sans` (and heading)
 * CSS variable so Tailwind's `font-sans` picks it up everywhere.
 */
export const cabinetGrotesk = localFont({
  src: [
    { path: "../../public/font/CabinetGrotesk-Thin.otf", weight: "100", style: "normal" },
    { path: "../../public/font/CabinetGrotesk-Extralight.otf", weight: "200", style: "normal" },
    { path: "../../public/font/CabinetGrotesk-Light.otf", weight: "300", style: "normal" },
    { path: "../../public/font/CabinetGrotesk-Regular.otf", weight: "400", style: "normal" },
    { path: "../../public/font/CabinetGrotesk-Medium.otf", weight: "500", style: "normal" },
    { path: "../../public/font/CabinetGrotesk-Bold.otf", weight: "700", style: "normal" },
    { path: "../../public/font/CabinetGrotesk-Extrabold.otf", weight: "800", style: "normal" },
    { path: "../../public/font/CabinetGrotesk-Black.otf", weight: "900", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});
