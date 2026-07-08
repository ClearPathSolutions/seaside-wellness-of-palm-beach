"use client";

import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import ProviderCombobox from "@/components/ProviderCombobox";
import { site } from "@/lib/site";

const inputClass =
  "w-full rounded-xl border border-shell bg-cream px-4 py-3 text-ink placeholder:text-ink-400 focus:border-gold-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold-200 transition";

/**
 * Insurance verification lead form. Submission is captured by the Clarion Labs
 * forms-capture script via the `data-clarion-form="insurance_verification"`
 * attribute on the <form> — no custom API route is needed here.
 *
 * Field rules (per admissions requirements):
 *  - Date of birth is REQUIRED (insurers need it to confirm coverage).
 *  - Member/Policy ID is OPTIONAL.
 *  - Insurance provider is a filtered combobox that still accepts free text.
 */
export default function InsuranceVerificationForm() {
  const [provider, setProvider] = useState("");

  return (
    <form
      data-clarion-form="insurance_verification"
      className="space-y-4"
    >
      {/* Honeypot — hidden from users; bots that fill it can be filtered out. */}
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

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold-700 px-6 py-4 font-semibold text-white shadow-[0_8px_24px_rgba(53,48,45,0.28)] transition-colors hover:bg-gold-800 sm:w-auto"
      >
        <ShieldCheck className="size-4" /> Verify My Insurance
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
