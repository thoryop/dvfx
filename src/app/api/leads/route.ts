import { NextResponse } from "next/server";

import { leadSchema } from "@/lib/validation";
import { isWixAdminConfigured, wixInsert } from "@/lib/wix/admin";
import { sendEmail, editorEmail } from "@/lib/email/send";
import { editorLeadEmail } from "@/lib/email/templates";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

/**
 * Lead capture (contact form + custom quote requests). Persists to the Wix
 * "Leads" collection and emails the editor. Both are best-effort; a submission
 * never hard-fails on a downstream hiccup.
 */
export async function POST(request: Request) {
  const rl = rateLimit(`leads:${clientIp(request)}`, { limit: 5, windowMs: 60_000 });
  if (!rl.ok) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  // Honeypot filled → silently accept and drop.
  if (parsed.data.company) return NextResponse.json({ ok: true });

  const { name, email, phone, service, budget, message } = parsed.data;

  if (isWixAdminConfigured()) {
    try {
      await wixInsert("Leads", {
        title: name,
        email,
        phone: phone || "",
        service: service || "",
        budget: budget || "",
        message,
        source: "contact-form",
      });
    } catch (err) {
      console.error("[leads] wix insert failed:", err);
    }
  }

  const to = editorEmail();
  if (to) {
    const mail = editorLeadEmail({ name, email, phone: phone || undefined, service, budget, message });
    await sendEmail({ to, subject: mail.subject, html: mail.html, replyTo: email });
  }

  return NextResponse.json({ ok: true });
}
