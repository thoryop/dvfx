import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";
import { LegalDocument } from "@/components/legal/legal-document";
import { privacyDoc } from "@/config/legal";

export const metadata: Metadata = buildMetadata({
  title: privacyDoc.title,
  description: privacyDoc.intro,
  path: "/privacy",
});

export default function PrivacyPage() {
  return <LegalDocument doc={privacyDoc} />;
}
