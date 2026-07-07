import { NextResponse } from "next/server";
import { site } from "@/lib/site";

/**
 * Contact form endpoint.
 *
 * Delivery: if RESEND_API_KEY is set (in Vercel → Project → Settings →
 * Environment Variables), submissions are emailed via Resend. Optional:
 * CONTACT_TO_EMAIL (defaults to the site inbox) and CONTACT_FROM_EMAIL
 * (defaults to onboarding@resend.dev for first-run testing — replace with a
 * verified sending domain in production). Without a key it logs the payload so
 * the form still works in development.
 */

type Submission = {
  name: string;
  email: string;
  phone: string;
  message: string;
  relationship: string;
};

async function deliver(submission: Submission): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log("[contact] submission (no email provider configured):", submission);
    return true;
  }

  const to = process.env.CONTACT_TO_EMAIL || site.email;
  const from = process.env.CONTACT_FROM_EMAIL || "Seaside Wellness <onboarding@resend.dev>";
  const lines = [
    `Name: ${submission.name}`,
    `Phone: ${submission.phone || "—"}`,
    `Email: ${submission.email || "—"}`,
    `Seeking help for: ${submission.relationship || "—"}`,
    "",
    submission.message || "(no message provided)",
  ];

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: submission.email || undefined,
        subject: `New inquiry from ${submission.name}`,
        text: lines.join("\n"),
      }),
    });
    if (!res.ok) {
      console.error("[contact] email provider error:", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("[contact] email delivery failed:", err);
    return false;
  }
}

export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real users never fill this. Silently accept so bots get no signal.
  if (String(data.website ?? "").trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = String(data.name ?? "").trim();
  const email = String(data.email ?? "").trim();
  const phone = String(data.phone ?? "").trim();
  const message = String(data.message ?? "").trim();
  const relationship = String(data.relationship ?? "").trim();

  if (!name || (!email && !phone)) {
    return NextResponse.json(
      { ok: false, error: "Please provide your name and a way to reach you." },
      { status: 422 }
    );
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email." }, { status: 422 });
  }

  const ok = await deliver({ name, email, phone, message, relationship });
  if (!ok) {
    return NextResponse.json(
      { ok: false, error: "We couldn't send your message just now. Please call us instead." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
