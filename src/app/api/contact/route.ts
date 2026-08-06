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
    // In development, log and report success so the form is usable offline.
    //
    // In production, FAIL. Previously this returned `true` regardless, so a
    // missing env var meant a prospective patient saw "a member of our
    // admissions team will reach out shortly" while the inquiry only ever
    // reached a server log. For a 24/7 admissions line that is the worst
    // possible failure mode, so an unconfigured transport must surface the
    // "please call us instead" path rather than a false confirmation.
    if (process.env.NODE_ENV === "production") {
      console.error(
        "[contact] RESEND_API_KEY is not set — refusing to fake a successful submission."
      );
      return false;
    }
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

/**
 * Best-effort in-process rate limit on an endpoint that sends an email per
 * request.
 *
 * ⚠️ Not a substitute for a WAF rule. Serverless instances do not share memory,
 * so a distributed flood can land on cold instances and slip past. What it does
 * reliably stop is a single client hammering a warm instance — and sustained
 * abuse is precisely what keeps instances warm, so this covers the common case
 * for free. SW-009 tracks the durable version (Vercel WAF or Upstash).
 */
const WINDOW_MS = 10 * 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function clientKey(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

function overLimit(key: string): boolean {
  const now = Date.now();
  const cutoff = now - WINDOW_MS;
  const recent = (hits.get(key) ?? []).filter((t) => t > cutoff);
  recent.push(now);
  hits.set(key, recent);
  // Bound memory on a long-lived instance: drop keys with nothing in-window.
  if (hits.size > 5000) {
    for (const [k, times] of hits) {
      if (!times.some((t) => t > cutoff)) hits.delete(k);
    }
  }
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(req: Request) {
  // Deliberately a 429 with the phone number, NOT the silent 200 the honeypot
  // uses. The honeypot only ever catches bots, so a fake success is safe there.
  // A rate limit catches humans too — and telling someone in crisis "thank you,
  // we'll be in touch" when nothing was sent is exactly the SW-001 defect. If
  // we are going to refuse the submission, we owe them the phone number.
  if (overLimit(clientKey(req))) {
    return NextResponse.json(
      {
        ok: false,
        error: `Too many messages from this connection. Please call us at ${site.phone} — we answer 24/7.`,
      },
      { status: 429 }
    );
  }

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
