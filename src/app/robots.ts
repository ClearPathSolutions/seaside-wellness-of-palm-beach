import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { isPreview } from "@/lib/deployment";

/**
 * Only the production deployment invites crawlers.
 *
 * Vercel sets `VERCEL_ENV` to "production" | "preview" | "development". Preview
 * builds are served on a public `*.vercel.app` hostname, and this one was
 * shipping `Allow: /` with `index, follow` and no `X-Robots-Tag` — a fully
 * crawlable staging copy of a live site. The per-page canonicals point at
 * `site.url`, which mostly protects against duplicate-content dilution, but
 * "mostly" is doing real work there: canonicals are a hint, and a staging host
 * that answers 200 for all 71 URLs can still surface in results ahead of the
 * production twin. Tracked as V0018 in ISSUES.md.
 *
 * `VERCEL_ENV` is undefined outside Vercel, so `next start` locally behaves like
 * production and stays crawlable for testing.
 */
export default function robots(): MetadataRoute.Robots {
  if (isPreview) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  // No `host` directive: it is a Yandex-only extension that Google and Bing
  // ignore, and the canonical host is already asserted via `metadataBase` and
  // the per-page canonicals.
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
