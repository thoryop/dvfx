import { siteConfig } from "@/config/site";

/**
 * Legal/policy content. These are sensible, industry-standard starting points
 * for a freelance video-editing business — the owner should review (ideally with
 * a professional) and adjust business/tax/jurisdiction specifics before launch.
 * Having Terms, Privacy and a Refund/Cancellation policy is also required for
 * Razorpay account activation.
 */
export const LEGAL_UPDATED = "August 2026";

export interface LegalSection {
  heading: string;
  body: string[];
}

export interface LegalDoc {
  slug: string;
  title: string;
  intro: string;
  sections: LegalSection[];
}

const contact = `Questions? Email ${siteConfig.name} at info@dvfx.in.`;

export const termsDoc: LegalDoc = {
  slug: "terms",
  title: "Terms of Service",
  intro:
    "These terms govern the video editing services provided by DVFX. By booking or paying for a service, you agree to them.",
  sections: [
    {
      heading: "Services",
      body: [
        "DVFX provides video editing services as described on the relevant service and package pages. Scope, delivery time and the number of revisions are those listed for the package you purchase, plus anything we agree in writing.",
        "Delivery timelines begin once you have provided all required footage, references and information needed to start.",
      ],
    },
    {
      heading: "Bookings & payment",
      body: [
        "Prices are shown in INR and payments are processed securely by Razorpay. Larger packages may be booked with a 50% deposit, with the balance due before final delivery; the split is shown at checkout.",
        "You are responsible for providing accurate contact and project details so we can complete your order.",
      ],
    },
    {
      heading: "Client responsibilities",
      body: [
        "You confirm you have the rights to all footage, music and assets you provide. You are responsible for any third-party licensing (e.g. music). DVFX is not liable for content you supply.",
      ],
    },
    {
      heading: "Revisions & delivery",
      body: [
        "Each package includes a set number of revision rounds. Additional revisions can be purchased. Final files are delivered digitally once payment is complete.",
      ],
    },
    {
      heading: "Intellectual property",
      body: [
        "On full payment, you receive the rights to the final delivered video for your intended use. DVFX may showcase completed work in its portfolio unless you request otherwise in writing.",
      ],
    },
    {
      heading: "Limitation of liability",
      body: [
        "Services are provided on a best-effort professional basis. To the extent permitted by law, DVFX's liability for any claim is limited to the amount you paid for the affected order.",
      ],
    },
    { heading: "Contact", body: [contact] },
  ],
};

export const privacyDoc: LegalDoc = {
  slug: "privacy",
  title: "Privacy Policy",
  intro:
    "This policy explains what information DVFX collects and how it is used. We collect only what we need to deliver your project.",
  sections: [
    {
      heading: "Information we collect",
      body: [
        "Contact details you provide (name, email, phone) when you enquire or book.",
        "Order and project information, including the footage links and briefs you share.",
        "Payment is handled by Razorpay; we do not store your card or bank details.",
      ],
    },
    {
      heading: "How we use it",
      body: [
        "To communicate with you, deliver your project, process payments, and provide support. We may send transactional emails such as booking confirmations and receipts.",
      ],
    },
    {
      heading: "Sharing",
      body: [
        "We use trusted service providers to run the business — including Razorpay (payments), our website/CMS host, and an email delivery provider. We do not sell your personal information.",
      ],
    },
    {
      heading: "Data retention & your rights",
      body: [
        "We keep order records as needed for business and legal purposes. You may request access to, correction of, or deletion of your personal data by contacting us.",
      ],
    },
    { heading: "Contact", body: [contact] },
  ],
};

export const refundDoc: LegalDoc = {
  slug: "refund-policy",
  title: "Refund & Cancellation Policy",
  intro:
    "We want you to be confident booking. This policy explains cancellations and refunds for video editing services.",
  sections: [
    {
      heading: "Before work begins",
      body: [
        "If you cancel before any editing has started, you are entitled to a full refund of amounts paid, minus any non-recoverable payment-gateway fees where applicable.",
      ],
    },
    {
      heading: "After work has started",
      body: [
        "Because editing is a custom service, once work has begun a deposit (up to 50% of the order) is non-refundable to cover time already invested. Any amount beyond work completed may be refunded at our discretion.",
        "If a first cut has been delivered, the order is considered substantially fulfilled and is generally non-refundable; instead, we will work through your included revisions to get it right.",
      ],
    },
    {
      heading: "Our satisfaction commitment",
      body: [
        "We include revisions with every package and will keep refining within that scope until you're happy. If we cannot deliver the agreed scope at all, we will refund the amount paid for the undelivered work.",
      ],
    },
    {
      heading: "How refunds are processed",
      body: [
        "Approved refunds are returned to your original payment method via Razorpay, typically within 5–7 business days after approval.",
      ],
    },
    {
      heading: "Contact",
      body: [`To request a cancellation or refund, ${contact.toLowerCase()}`],
    },
  ],
};

export const legalDocs: LegalDoc[] = [termsDoc, privacyDoc, refundDoc];
