import { readFileSync } from "node:fs";
import path from "node:path";
import { site } from "@/lib/site";
import { canonicalPath } from "@/lib/routing";

/**
 * Editorial policy — the portfolio-wide page from the editorial policy dev
 * package (Clear Path, September 2026).
 *
 * The copy is shared by every site and must not be reworded here; only the five
 * merge fields below differ per site. Values mirror this site's row (SITE_ID 9)
 * in the package's facilities.csv — update both together.
 *
 * Until EDITORIAL_EMAIL, LAST_REVIEWED and CONTENT_SIGNOFF are all set, the
 * policy is withheld from production: the route 404s there, nothing links to
 * it, it is left out of the sitemap, and the Organization schema does not point
 * at it. Local and Vercel preview builds still render it (noindex) so it can be
 * reviewed.
 *
 * TO GO LIVE: fill `lastReviewed` and `contentSignoff` below. Nothing else.
 */
export const editorial = {
  /** Brand name as in the site footer ("© … Seaside Wellness of Palm Beach"). */
  facilityName: site.legalName,
  domain: new URL(site.url).hostname,
  /**
   * Corrections inbox. facilities.csv leaves EDITORIAL_EMAIL blank; this is the
   * site's public inbox (the source-of-truth sheet's PUBLIC_EMAIL), as supplied
   * for this rollout.
   */
  editorialEmail: "info@seasidewellnesspb.com",
  /**
   * As supplied for the rollout (facilities.csv form). Note the site shows the
   * same number as site.phone, "(855) 416-5648".
   */
  phone: "855-416-5648",
  phoneTel: "+18554165648",
  /** YYYY-MM-DD. Blank until the content team reviews the policy. */
  lastReviewed: "2026-10-07",
  /** Copy of the CSV's CONTENT_SIGNOFF cell. Blank until signed off. */
  contentSignoff: "",
} as const;

/** Slash-terminated to match the site's trailingSlash convention. */
export const EDITORIAL_POLICY_PATH = canonicalPath("/editorial-policy");
export const EDITORIAL_POLICY_URL = `${site.url}${EDITORIAL_POLICY_PATH}`;
export const CORRECTIONS_ANCHOR = "content-updates-and-corrections";

export const editorialMissing: string[] = [
  !editorial.editorialEmail && "EDITORIAL_EMAIL",
  !/^\d{4}-\d{2}-\d{2}$/.test(editorial.lastReviewed) && "LAST_REVIEWED",
  !editorial.contentSignoff && "CONTENT_SIGNOFF",
].filter((f): f is string => Boolean(f));

/** Every field filled and signed off: the policy may be public and indexed. */
export const editorialPolicyReady = editorialMissing.length === 0;

/** Whether this build serves the page at all (local and previews do, for review). */
export const editorialPolicyServed =
  editorialPolicyReady || process.env.VERCEL_ENV !== "production";

/** "2026-09-30" -> "September 2026". */
function monthYear(iso: string): string {
  const [y, m] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * The policy body, read at build time from data/editorial-policy.html — an
 * unedited copy of the package's templates/editorial-policy.html. When the
 * master copy changes, replace that file wholesale; never hand-edit it.
 */
export function editorialPolicyBody(): string {
  const file = path.join(process.cwd(), "src/data/editorial-policy.html");
  const fields: Record<string, string> = {
    FACILITY_NAME: editorial.facilityName,
    DOMAIN: editorial.domain,
    EDITORIAL_EMAIL: editorial.editorialEmail,
    PHONE: editorial.phone,
    PHONE_TEL: editorial.phoneTel,
    LAST_REVIEWED: editorial.lastReviewed && monthYear(editorial.lastReviewed),
  };

  let html = readFileSync(file, "utf8")
    // Header comment is dev notes, not page content.
    .replace(/<!--[\s\S]*?-->/g, "")
    // PageHero renders the page's single H1 ("Editorial Policy").
    .replace(/<h1>[\s\S]*?<\/h1>/, "")
    // The package allows adjusting this href to the site's About URL.
    .replace(/href="\/about\/"/g, `href="${canonicalPath("/about")}"`);

  if (!editorial.lastReviewed) {
    // Review builds only (a ready policy always has the date): leave out the
    // "last reviewed" line rather than show an unfilled placeholder.
    html = html.replace(/<p>(?:(?!<\/p>)[\s\S])*\{\{LAST_REVIEWED\}\}[\s\S]*?<\/p>/g, "");
  }

  html = html
    .replace(/\{\{([A-Z_]+)\}\}/g, (token, name: string) =>
      fields[name] ? escapeHtml(fields[name]) : token,
    )
    .trim();

  if (editorialPolicyReady && html.includes("{{")) {
    // README: "Any hit blocks launch." Fail the build rather than ship it.
    throw new Error(
      `Editorial policy still contains a placeholder: ${html.match(/\{\{[^}]*\}\}/)?.[0]}`,
    );
  }

  return html;
}
