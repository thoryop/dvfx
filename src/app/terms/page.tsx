import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";
import { LegalDocument } from "@/components/legal/legal-document";
import { termsDoc } from "@/config/legal";

export const metadata: Metadata = buildMetadata({
  title: termsDoc.title,
  description: termsDoc.intro,
  path: "/terms",
});

export default function TermsPage() {
  return <LegalDocument doc={termsDoc} />;
}
