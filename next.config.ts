import type { NextConfig } from "next";
import { TRAILING_SLASH, canonicalPath } from "./src/lib/routing";

/** Redirect target for the legacy WordPress blog paths, in the site's URL form. */
const BLOG = canonicalPath("/about/blog");

const nextConfig: NextConfig = {
  // Match the WordPress site being replaced, which is slash-canonical and 301s
  // the slashless form. All 69 currently-indexed URLs use the trailing-slash
  // form, so this preserves every one of them across cutover instead of sending
  // each through a redirect.
  //
  // ⚠️ If the portfolio standardises slashless instead, flip TRAILING_SLASH in
  // src/lib/routing.ts — canonicals and the sitemap both derive from it.
  trailingSlash: TRAILING_SLASH,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1536, 1920],
  },
  poweredByHeader: false,
  async redirects() {
    return [
      // Legacy WordPress paths. Verified against production 2026-08-06:
      //   /category/blog/  → indexed in category-sitemap.xml
      //   /feed/           → returns 200 (RSS)
      //   /author/admin/   → already 404s; rule kept as cheap insurance
      // /tag/* and dated permalinks were checked and do not exist — not added.
      //
      // Destinations go through canonicalPath: `trailingSlash` normalises
      // incoming requests but does NOT rewrite redirect destinations, so a bare
      // "/about/blog" here produced a two-hop chain
      // (/category/blog/ → /about/blog → /about/blog/).
      { source: "/author/:path*", destination: "/", permanent: true },
      { source: "/category/:path*", destination: BLOG, permanent: true },
      // Production serves a real feed here. Until an RSS route exists in this
      // build, point subscribers at the blog index rather than 404.
      { source: "/feed", destination: BLOG, permanent: true },
      { source: "/comments/feed", destination: BLOG, permanent: true },
      // V0073: the slug said "about-us" but the page is "Our Story". Renamed to
      // match its content; this preserves the old URL, which is indexed.
      {
        source: "/about/about-us",
        destination: canonicalPath("/about/our-story"),
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // Deny access to device APIs this site never uses. A CSP is still
          // open (SW-023) because a nonce-based policy would force dynamic
          // rendering and cost the full static generation; the compatible
          // route is a hash-based policy covering the two inline script
          // types (the no-JS marker and the JSON-LD blocks).
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
