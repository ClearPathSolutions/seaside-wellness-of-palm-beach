/**
 * Date for the Terms of Service page. (The privacy policy, notice of privacy
 * practices and SMS terms carry their own dates: see lib/legalPages.ts.)
 *
 * ⚠️ Needs counsel sign-off — see SW-003 and LEGAL-REVIEW.md.
 *
 * `termsRevised` is simply the date the Terms *content* last changed. The Terms
 * promise this: "We will also indicate at the top of this page the date that
 * revisions were last made." That promise was unkept — there was no date
 * anywhere on the page.
 */

/** ISO date the Terms content last changed. */
export const termsRevised = "2026-08-06";

/** Formats an ISO date for display on the legal pages. */
export function formatLegalDate(iso: string): string {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
