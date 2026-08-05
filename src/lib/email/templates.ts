import { siteConfig } from "@/config/site";
import { formatINR } from "@/lib/format";

/** Escape user-supplied text before interpolating into email HTML. */
export function esc(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const shell = (title: string, body: string) => `
<div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;max-width:560px;margin:0 auto;color:#111">
  <div style="padding:20px 0;border-bottom:2px solid #18E554">
    <span style="font-size:20px;font-weight:800">${esc(siteConfig.name)}</span>
  </div>
  <h1 style="font-size:20px;margin:24px 0 8px">${esc(title)}</h1>
  ${body}
  <p style="margin-top:32px;font-size:12px;color:#666">${esc(siteConfig.name)} · ${esc(siteConfig.url)}</p>
</div>`;

const row = (label: string, value: string) =>
  `<tr><td style="padding:6px 12px 6px 0;color:#666;font-size:14px">${esc(label)}</td><td style="padding:6px 0;font-size:14px;font-weight:600">${value}</td></tr>`;

export interface OrderEmailData {
  orderRef: string;
  packageTitle: string;
  serviceTitle?: string;
  amountPaid: number;
  balanceDue: number;
  total: number;
  paymentType: "full" | "deposit";
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
}

/** Sent to the customer after a successful payment. */
export function customerOrderEmail(d: OrderEmailData) {
  const balanceLine =
    d.balanceDue > 0
      ? row("Balance due on delivery", formatINR(d.balanceDue))
      : "";
  const html = shell(
    "Payment received — thank you! 🎉",
    `<p style="font-size:15px;line-height:1.6">Hi ${esc(d.customerName)}, your booking is confirmed. Here are the details:</p>
     <table style="border-collapse:collapse;margin:16px 0">
       ${row("Order reference", esc(d.orderRef))}
       ${row("Service", esc(d.serviceTitle ?? d.packageTitle))}
       ${row("Package", esc(d.packageTitle))}
       ${row("Paid now", formatINR(d.amountPaid))}
       ${balanceLine}
     </table>
     <p style="font-size:15px;line-height:1.6"><strong>Next step:</strong> reply to this email (or use the link on your confirmation page) with your footage link, references and any deadline, and I'll get started. I'll be in touch within 24 hours.</p>`
  );
  return { subject: `Booking confirmed — ${d.packageTitle} (${d.orderRef})`, html };
}

/** Sent to the editor when a new order is paid. */
export function editorOrderEmail(d: OrderEmailData) {
  const html = shell(
    "New paid order 💸",
    `<table style="border-collapse:collapse;margin:16px 0">
       ${row("Order reference", esc(d.orderRef))}
       ${row("Package", esc(d.packageTitle))}
       ${row("Service", esc(d.serviceTitle ?? "—"))}
       ${row("Paid", formatINR(d.amountPaid))}
       ${row("Balance due", formatINR(d.balanceDue))}
       ${row("Type", esc(d.paymentType))}
       ${row("Customer", esc(d.customerName))}
       ${row("Email", esc(d.customerEmail))}
       ${row("Phone", esc(d.customerPhone ?? "—"))}
     </table>`
  );
  return { subject: `New order: ${d.packageTitle} — ${formatINR(d.amountPaid)}`, html };
}

export interface IntakeEmailData {
  orderRef: string;
  footageUrl: string;
  brief: string;
  deadline?: string;
}

/** Sent to the editor when a customer submits their project brief. */
export function editorIntakeEmail(d: IntakeEmailData) {
  const html = shell(
    "Project brief submitted 📋",
    `<table style="border-collapse:collapse;margin:16px 0">
       ${row("Order reference", esc(d.orderRef))}
       ${row("Footage link", `<a href="${esc(d.footageUrl)}">${esc(d.footageUrl)}</a>`)}
       ${row("Deadline", esc(d.deadline ?? "—"))}
     </table>
     <p style="font-size:14px;color:#666">Brief</p>
     <p style="font-size:15px;line-height:1.6;white-space:pre-wrap">${esc(d.brief)}</p>`
  );
  return { subject: `Brief received — ${d.orderRef}`, html };
}

export interface LeadEmailData {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  budget?: string;
  message: string;
}

/** Sent to the editor for a contact/quote request. */
export function editorLeadEmail(d: LeadEmailData) {
  const html = shell(
    "New enquiry ✉️",
    `<table style="border-collapse:collapse;margin:16px 0">
       ${row("Name", esc(d.name))}
       ${row("Email", esc(d.email))}
       ${row("Phone", esc(d.phone ?? "—"))}
       ${row("Service", esc(d.service ?? "—"))}
       ${row("Budget", esc(d.budget ?? "—"))}
     </table>
     <p style="font-size:14px;color:#666">Message</p>
     <p style="font-size:15px;line-height:1.6;white-space:pre-wrap">${esc(d.message)}</p>`
  );
  return { subject: `New enquiry from ${d.name}`, html };
}
