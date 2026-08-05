"use client";

import * as React from "react";

/**
 * Tawk.to live chat — loaded lazily so it never blocks LCP/TTI.
 * The script is injected only after the browser is idle OR the user first
 * interacts (scroll / pointer / keydown), whichever comes first. Renders
 * nothing and no-ops when the env IDs are absent (Phase 1 / local dev).
 */
export function TawkWidget() {
  const loaded = React.useRef(false);

  React.useEffect(() => {
    const propertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
    const widgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID;
    if (!propertyId || !widgetId) return;

    const inject = () => {
      if (loaded.current) return;
      loaded.current = true;

      const s = document.createElement("script");
      s.async = true;
      s.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
      s.charset = "UTF-8";
      s.setAttribute("crossorigin", "*");
      document.body.appendChild(s);
      cleanup();
    };

    const events: Array<keyof WindowEventMap> = [
      "scroll",
      "pointerdown",
      "keydown",
      "touchstart",
    ];
    const cleanup = () => {
      events.forEach((e) => window.removeEventListener(e, inject));
    };

    events.forEach((e) =>
      window.addEventListener(e, inject, { once: true, passive: true })
    );

    const hasRic = typeof window.requestIdleCallback === "function";
    const idle: number = hasRic
      ? window.requestIdleCallback(inject, { timeout: 6000 })
      : window.setTimeout(inject, 5000);

    return () => {
      cleanup();
      if (hasRic) window.cancelIdleCallback(idle);
      else clearTimeout(idle);
    };
  }, []);

  return null;
}
