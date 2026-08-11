/**
 * URL convention for the whole site — the single source of truth.
 *
 * Imported by `next.config.ts` (to set `trailingSlash`), by `lib/seo.ts` (so
 * `alternates.canonical` and `og:url` agree with the served URL) and by
 * `app/sitemap.ts`. Keeping one constant matters because Next's `trailingSlash`
 * option rewrites *routing* only — it does **not** rewrite the strings you pass
 * to `alternates.canonical`. Set them independently and you get a canonical
 * that disagrees with the URL it sits on, which is worse than either convention.
 *
 * Currently `true` to match the production WordPress site (slash-canonical, 301s
 * the slashless form) so the 69 indexed URLs survive cutover unredirected.
 */
export const TRAILING_SLASH = true;

/**
 * Normalises an internal path to the site's URL convention.
 *
 * The root path stays `/`, and paths carrying a file extension are left alone
 * (Next exempts static files from `trailingSlash`).
 *
 * A `?query` or `#fragment` is split off before normalising and re-appended
 * afterwards. Without that, passing "/a/b#c" would return "/a/b#c/" — the slash
 * lands inside the fragment and the anchor silently stops resolving.
 */
export function canonicalPath(path: string): string {
  if (path === "" || path === "/") return "/";

  const suffixAt = path.search(/[?#]/);
  const bareInput = suffixAt === -1 ? path : path.slice(0, suffixAt);
  const suffix = suffixAt === -1 ? "" : path.slice(suffixAt);

  if (bareInput === "" || bareInput === "/") return `/${suffix}`;
  if (/\.[a-z0-9]+$/i.test(bareInput)) return `${bareInput}${suffix}`;

  const bare = bareInput.replace(/\/+$/, "");
  return TRAILING_SLASH ? `${bare}/${suffix}` : `${bare}${suffix}`;
}

/**
 * Where every "Verify Insurance" call to action points.
 *
 * It targets the form's anchor, not the top of the page. The form sits in the
 * page's `belowContent` slot, 2,185px down on desktop and 3,285px down on
 * mobile — roughly five screens. Eight CTAs linked to the bare path, so pressing
 * the site's main conversion button landed people at the top of a 7,000px
 * article with no indication the form they asked for was far below.
 *
 * One constant so the anchor cannot drift out of sync with the `id` on the page.
 */
export const VERIFY_INSURANCE_HREF = `${canonicalPath("/admissions/insurance-verification")}#verify`;
