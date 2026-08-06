import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // No `host` directive: it is a Yandex-only extension that Google and Bing
  // ignore, and the canonical host is already asserted via `metadataBase` and
  // the per-page canonicals.
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
