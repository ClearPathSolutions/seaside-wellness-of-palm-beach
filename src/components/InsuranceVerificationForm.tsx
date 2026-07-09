"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
import ProviderCombobox from "@/components/ProviderCombobox";
import { submitToClarion } from "@/lib/clarion";
import { site } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-xl border border-shell bg-cream px-4 py-3 text-ink placeholder:text-ink-400 focus:border-gold-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold-200 transition";

/**
 * Insurance verification lead form.
 *
 * Submission is sent to Clarion Labs (form key "insurance_verification") from
 * our own submit handler — Clarion's script only scans the DOM once, so a
 * React form that mounts later is never auto-wired; relying on that caused a
 * native submit that just reloaded the page. We preventDefault and post
 * explicitly, then show a confirmation.
 *
 * Field rules (per admissions requirements):
 *  - Date of birth is REQUIRED (insurers need it to confirm coverage).
 *  - Member/Policy ID is OPTIONAL.
 *  - Insurance provider is a filtered combobox that still accepts free text.
 */
export default function InsuranceVerificationForm() {
  const [provider, setProvider] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    // Honeypot: a filled hidden field means a bot — silently "succeed".
    if (data.website) {
      setStatus("success");
      return;
    }

    // Required fields (mirrors the `required` attributes for a friendly message).
    if (
      !data.firstName?.trim() ||
      !data.lastName?.trim() ||
      !data.phone?.trim() ||
      !data.email?.trim() ||
      !data.dateOfBirth?.trim() ||
      !data.insuranceProvider?.trim()
    ) {
      setStatus("error");
      setError("Please complete all required fields, including your date of birth and insurance provider.");
      return;
    }

    setStatus("submitting");
    setError("");
    try {
      await submitToClarion("insurance_verification", data);
      setStatus("success");
      form.reset();
      setProvider("");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? "We couldn't submit your details just now. Please try again, or call us directly."
          : "Something went wrong."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-shell bg-white p-10 text-center">
        <CheckCircle2 className="size-14 text-ocean-500" />
        <h3 className="mt-4 text-2xl font-medium text-ink">
          Thank you for submitting your insurance details
        </h3>
        <p className="mt-2 max-w-md text-ink-600">
          We&rsquo;ll begin verifying your insurance coverage right away. An admissions specialist
          will reach out to you shortly to review your benefits and answer any questions — all in
          strict confidence. For immediate assistance, call{" "}
          <a href={site.phoneHref} className="font-semibold text-gold-700">
            {site.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {/* Honeypot — hidden from users; bots that fill it are rejected. */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}
      >
        <label htmlFor="iv-website">Leave this field empty</label>
        <input id="iv-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="iv-firstName" className="mb-1.5 block text-sm font-semibold text-ink">
            First name *
          </label>
          <input
            id="iv-firstName"
            name="firstName"
            required
            autoComplete="given-name"
            className={inputClass}
            placeholder="First name"
          />
        </div>
        <div>
          <label htmlFor="iv-lastName" className="mb-1.5 block text-sm font-semibold text-ink">
            Last name *
          </label>
          <input
            id="iv-lastName"
            name="lastName"
            required
            autoComplete="family-name"
            className={inputClass}
            placeholder="Last name"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="iv-phone" className="mb-1.5 block text-sm font-semibold text-ink">
            Phone *
          </label>
          <input
            id="iv-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className={inputClass}
            placeholder="(000) 000-0000"
          />
        </div>
        <div>
          <label htmlFor="iv-email" className="mb-1.5 block text-sm font-semibold text-ink">
            Email *
          </label>
          <input
            id="iv-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="iv-dob" className="mb-1.5 block text-sm font-semibold text-ink">
          Date of birth *
        </label>
        <input
          id="iv-dob"
          name="dateOfBirth"
          type="date"
          required
          autoComplete="bday"
          className={inputClass}
        />
        <p className="mt-1.5 text-xs text-ink-400">
          Required — insurers use your date of birth to confirm coverage.
        </p>
      </div>

      <div>
        <label htmlFor="iv-provider" className="mb-1.5 block text-sm font-semibold text-ink">
          Insurance provider *
        </label>
        <ProviderCombobox
          id="iv-provider"
          name="insuranceProvider"
          required
          value={provider}
          onChange={setProvider}
          placeholder="Start typing, e.g. Florida Blue, Aetna, Cigna"
          className={inputClass}
        />
        <p className="mt-1.5 text-xs text-ink-400">
          Choose from the list or type your plan if it isn&rsquo;t shown.
        </p>
      </div>

      <div>
        <label htmlFor="iv-memberId" className="mb-1.5 block text-sm font-semibold text-ink">
          Member / Policy ID <span className="font-normal text-ink-400">(optional)</span>
        </label>
        <input
          id="iv-memberId"
          name="memberId"
          className={inputClass}
          placeholder="Found on the front of your insurance card"
        />
      </div>

      <div>
        <label htmlFor="iv-notes" className="mb-1.5 block text-sm font-semibold text-ink">
          Anything we should know? <span className="font-normal text-ink-400">(optional)</span>
        </label>
        <textarea
          id="iv-notes"
          name="notes"
          rows={3}
          className={inputClass}
          placeholder="Who is seeking treatment, timing, questions…"
        />
      </div>

      <p
        role="alert"
        aria-live="assertive"
        className={status === "error" ? "rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700" : "sr-only"}
      >
        {status === "error" ? error : ""}
      </p>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold-700 px-6 py-4 font-semibold text-white shadow-[0_8px_24px_rgba(53,48,45,0.28)] transition-colors hover:bg-gold-800 disabled:opacity-70 sm:w-auto"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="size-5 animate-spin" /> Submitting…
          </>
        ) : (
          <>
            <ShieldCheck className="size-4" /> Verify My Insurance
          </>
        )}
      </button>

      <p className="text-xs text-ink-400">
        Your information is kept strictly confidential and is never shared with third parties. This
        is not an emergency service — if you are in crisis, call or text 988. You can also reach our
        admissions team directly at{" "}
        <a href={site.phoneHref} className="font-semibold text-gold-700">
          {site.phone}
        </a>
        .
      </p>
    </form>
  );
}
