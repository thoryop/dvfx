import "server-only";

import { Resend } from "resend";

/**
 * Thin email wrapper around Resend. If RESEND_API_KEY / EMAIL_FROM are not set,
 * it logs and no-ops instead of throwing — so payments/leads never fail just
 * because email isn't configured yet.
 */
export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM);
}

/** Where internal notifications (new order / new lead) are sent. */
export function editorEmail(): string | undefined {
  return process.env.EDITOR_EMAIL || process.env.EMAIL_FROM;
}

let cached: Resend | null = null;
function client(): Resend {
  if (!cached) cached = new Resend(process.env.RESEND_API_KEY);
  return cached;
}

interface SendArgs {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendEmail({ to, subject, html, replyTo }: SendArgs): Promise<boolean> {
  if (!isEmailConfigured()) {
    console.info("[email] skipped (not configured):", subject, "->", to);
    return false;
  }
  try {
    await client().emails.send({
      from: process.env.EMAIL_FROM!,
      to,
      subject,
      html,
      ...(replyTo ? { replyTo } : {}),
    });
    return true;
  } catch (err) {
    // Never throw into the caller (payment/lead flow must still succeed).
    console.error("[email] send failed:", err);
    return false;
  }
}
