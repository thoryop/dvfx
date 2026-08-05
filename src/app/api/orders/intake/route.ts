import { NextResponse } from "next/server";

import { intakeSchema } from "@/lib/validation";
import { saveIntake } from "@/lib/orders";
import { sendEmail, editorEmail } from "@/lib/email/send";
import { editorIntakeEmail } from "@/lib/email/templates";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

/**
 * Receives the customer's project brief (footage link, brief, deadline) after
 * payment and attaches it to their order + notifies the editor.
 */
export async function POST(request: Request) {
  const rl = rateLimit(`intake:${clientIp(request)}`, { limit: 6, windowMs: 60_000 });
  if (!rl.ok) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = intakeSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  // Honeypot filled → silently accept and drop.
  if (parsed.data.company) return NextResponse.json({ ok: true });

  const { orderRef, footageUrl, brief, deadline } = parsed.data;

  // Best-effort persist; always notify the editor so nothing is lost.
  await saveIntake(orderRef, { footageUrl, brief, deadline: deadline || undefined });

  const to = editorEmail();
  if (to) {
    const mail = editorIntakeEmail({ orderRef, footageUrl, brief, deadline: deadline || undefined });
    await sendEmail({ to, subject: mail.subject, html: mail.html });
  }

  return NextResponse.json({ ok: true });
}
