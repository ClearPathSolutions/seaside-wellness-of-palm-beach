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
 */
export function canonicalPath(path: string): string {
  if (path === "" || path === "/") return "/";
  const hasExtension = /\.[a-z0-9]+$/i.test(path);
  if (hasExtension) return path;
  const bare = path.replace(/\/+$/, "");
  return TRAILING_SLASH ? `${bare}/` : bare;
}
