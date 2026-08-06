/**
 * Dates for the two legal pages.
 *
 * ⚠️ Both need counsel sign-off before launch — see SW-003 and LEGAL-REVIEW.md.
 *
 * `termsRevised` is simply the date the Terms *content* last changed. The Terms
 * promise this: "We will also indicate at the top of this page the date that
 * revisions were last made." That promise was unkept — there was no date
 * anywhere on the page.
 *
 * `privacyEffective` is legally operative, not cosmetic: 45 CFR
 * §164.520(b)(1)(v)(C) requires a Notice of Privacy Practices to state its
 * effective date. It is deliberately `null` because only the practice can set
 * it — inventing a date on a HIPAA notice would be worse than showing none. The
 * page renders no date while this is null, and this is a launch blocker.
 */

/** ISO date the Terms content last changed. */
export const termsRevised = "2026-08-06";

/** ISO date the Notice of Privacy Practices took effect. MUST be set by the practice. */
export const privacyEffective: string | null = null;

/** Formats an ISO date for display on the legal pages. */
export function formatLegalDate(iso: string): string {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
