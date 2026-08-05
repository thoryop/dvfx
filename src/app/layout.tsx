import type { Metadata, Viewport } from "next";

import "./globals.css";
import { cn } from "@/lib/utils";
import { cabinetGrotesk } from "@/lib/fonts";
import { siteConfig } from "@/config/site";
import { buildMetadata, organizationJsonLd } from "@/lib/seo";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { TawkWidget } from "@/components/layout/tawk-widget";
import { JsonLd } from "@/components/common/json-ld";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  ...buildMetadata(),
};

export const viewport: Viewport = {
  themeColor: "#0a0f0c",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("dark h-full", cabinetGrotesk.variable)}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col font-sans antialiased">
        <JsonLd data={organizationJsonLd()} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="top-center" richColors />
        <TawkWidget />
      </body>
    </html>
  );
}
