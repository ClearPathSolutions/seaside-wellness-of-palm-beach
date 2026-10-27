import { readFileSync } from "node:fs";
import path from "node:path";
import { site } from "@/lib/site";
import { canonicalPath } from "@/lib/routing";

/**
 * Portfolio-standard legal pages (legal pages dev package, 2026-10-27).
 *
 * The bodies in data/legal-pages/ are unedited copies of the package's
 * approved production files. Their wording must not change here; only the
 * merge fields below differ per site. When the master copy changes, replace the
 * file wholesale.
 */
export type LegalPage = "privacy-policy" | "notice-of-privacy-practices" | "sms-terms";

export const LEGAL_DATE = "October 27, 2026";

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const fields: Record<string, string> = {
  FACILITY_NAME: escapeHtml(site.legalName),
  DOMAIN: new URL(site.url).hostname.replace(/^www\./, ""),
  PHONE: `<a href="${site.phoneHref}">${escapeHtml(site.phone)}</a>`,
  PRIVACY_EMAIL: `<a href="mailto:${site.email}">${escapeHtml(site.email)}</a>`,
  STREET_ADDRESS: escapeHtml(site.address.full),
  LEGAL_ENTITY_LINE: "",
  STATE_NAME: "Florida",
  PP_LAST_UPDATED: LEGAL_DATE,
  SMS_LAST_UPDATED: LEGAL_DATE,
  NPP_EFFECTIVE_DATE: LEGAL_DATE,
};

/** The page body with merge fields filled, read at build time. */
export function legalPageBody(page: LegalPage): string {
  const file = path.join(process.cwd(), "src/data/legal-pages", `${page}.html`);
  const html = readFileSync(file, "utf8")
    // Header comment is dev notes, not page content.
    .replace(/<!--[\s\S]*?-->/g, "")
    // Internal links in the site's URL form.
    .replace(
      /href="\/(privacy-policy|notice-of-privacy-practices|sms-terms)\/"/g,
      (_m, slug: string) => `href="${canonicalPath(`/${slug}`)}"`,
    )
    .replace(/\{\{([A-Z_]+)\}\}/g, (token, name: string) =>
      name in fields ? fields[name] : token,
    )
    .trim();

  if (html.includes("{{")) {
    throw new Error(`Legal page ${page} still contains a placeholder: ${html.match(/\{\{[^}]*\}\}/)?.[0]}`);
  }
  return html;
}
