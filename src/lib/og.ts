/**
 * Open Graph image descriptor — the single source of truth.
 *
 * Shared by the generated image route (`app/opengraph-image.tsx`) and by
 * `ogBase` in `lib/seo.ts`. Both need it, because of how Next resolves metadata:
 * the file-based `opengraph-image` convention injects `openGraph.images` into
 * the **root segment only**, and Next replaces `openGraph` wholesale for any
 * page that declares its own. So a page setting `openGraph` (to pin `og:url`,
 * say) drops the inherited image unless it restates it — which is exactly how
 * 57 pages briefly lost their `og:image`.
 *
 * Keeping size and alt here means the route and the metadata cannot disagree.
 *
 * Note: deliberately not `as const` — Next's `OpenGraph` type takes mutable
 * arrays, so a readonly tuple fails to type-check at the `ogBase` call site.
 */
export const OG_IMAGE_SIZE: { width: number; height: number } = {
  width: 1200,
  height: 630,
};

export const OG_IMAGE_ALT =
  "Seaside Wellness — luxury addiction & mental health treatment in West Palm Beach, FL";

export const OG_IMAGE_CONTENT_TYPE = "image/png";

/** Resolves against `metadataBase`; the route is prerendered at build time. */
export function ogImage() {
  return {
    url: "/opengraph-image",
    ...OG_IMAGE_SIZE,
    alt: OG_IMAGE_ALT,
    type: OG_IMAGE_CONTENT_TYPE,
  };
}
