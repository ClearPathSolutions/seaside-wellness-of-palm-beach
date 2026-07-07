"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { site } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-xl border border-shell bg-cream px-4 py-3 text-ink placeholder:text-ink-400 focus:border-gold-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold-200 transition";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    // Client-side validation mirrors the server: name + at least one contact method.
    if (!payload.name?.trim() || (!payload.email?.trim() && !payload.phone?.trim())) {
      setStatus("error");
      setError("Please provide your name and either a phone number or email so we can reach you.");
      return;
    }

    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Something went wrong.");
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-shell bg-cream p-10 text-center">
        <CheckCircle2 className="size-14 text-ocean-500" />
        <h3 className="mt-4 text-2xl font-medium text-ink">Thank you for reaching out</h3>
        <p className="mt-2 max-w-md text-ink-600">
          Your message has been received. A member of our admissions team will reach out shortly —
          your privacy is always protected. For immediate help, call{" "}
          <a href={site.phoneHref} className="font-semibold text-gold-700">{site.phone}</a>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {/* Honeypot — hidden from users; bots that fill it are rejected server-side. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-ink">Full name *</label>
          <input id="name" name="name" required autoComplete="name" className={inputClass} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-ink">Phone</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" aria-required="true" className={inputClass} placeholder="(000) 000-0000" />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-ink">Email</label>
        <input id="email" name="email" type="email" autoComplete="email" aria-required="true" className={inputClass} placeholder="you@example.com" />
        <p className="mt-1.5 text-xs text-ink-400">Please give us a phone number or email so we can reach you.</p>
      </div>
      <div>
        <label htmlFor="relationship" className="mb-1.5 block text-sm font-semibold text-ink">Who are you seeking help for?</label>
        <select id="relationship" name="relationship" className={inputClass} defaultValue="">
          <option value="" disabled>Please select…</option>
          <option value="myself">Myself</option>
          <option value="loved-one">A loved one</option>
          <option value="professional">I&rsquo;m a referring professional</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-ink">How can we help?</label>
        <textarea id="message" name="message" rows={4} className={inputClass} placeholder="Tell us a little about your situation…" />
      </div>

      <p role="alert" aria-live="assertive" className={status === "error" ? "rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700" : "sr-only"}>
        {status === "error" ? error : ""}
      </p>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold-700 px-6 py-4 font-semibold text-white shadow-[0_8px_24px_rgba(53,48,45,0.28)] transition-colors hover:bg-gold-800 disabled:opacity-70 sm:w-auto"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="size-5 animate-spin" /> Sending…
          </>
        ) : (
          <>
            <Send className="size-4" /> Send Confidential Message
          </>
        )}
      </button>
      <p className="text-xs text-ink-400">
        Your information is kept strictly confidential and is never shared. This form is not for
        emergencies — if you are in crisis, call or text 988.
      </p>
    </form>
  );
}
