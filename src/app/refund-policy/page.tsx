import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";
import { LegalDocument } from "@/components/legal/legal-document";
import { refundDoc } from "@/config/legal";

export const metadata: Metadata = buildMetadata({
  title: refundDoc.title,
  description: refundDoc.intro,
  path: "/refund-policy",
});

export default function RefundPolicyPage() {
  return <LegalDocument doc={refundDoc} />;
}
