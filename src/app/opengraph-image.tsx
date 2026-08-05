import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#101512",
          backgroundImage:
            "radial-gradient(circle at 20% 0%, rgba(24,229,84,0.22), transparent 45%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#18E554",
            fontSize: 30,
            fontWeight: 700,
          }}
        >
          ● {siteConfig.name}
        </div>
        <div
          style={{
            marginTop: 28,
            color: "white",
            fontSize: 76,
            fontWeight: 800,
            lineHeight: 1.05,
            maxWidth: 900,
          }}
        >
          Edits that make people stop scrolling.
        </div>
        <div
          style={{
            marginTop: 28,
            color: "rgba(255,255,255,0.7)",
            fontSize: 30,
            maxWidth: 820,
          }}
        >
          Travel films · Short-form · Music videos · Color grading · Motion graphics
        </div>
      </div>
    ),
    { ...size }
  );
}
