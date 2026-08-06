import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { conditions, programs, therapies, areas } from "@/data/catalog";
import { team } from "@/data/team";
import { posts } from "@/data/posts";
import { canonicalPath } from "@/lib/routing";

type Entry = { path: string; lastModified?: string };

const staticPaths = [
  "",
  "/about",
  "/about/our-story",
  "/about/meet-the-team",
  "/about/faq",
  "/about/blog",
  "/treatment",
  "/what-we-treat",
  "/areas-we-serve",
  "/admissions",
  "/admissions/admissions-process",
  "/admissions/insurance-verification",
  "/admissions/help-for-yourself",
  "/admissions/help-for-loved-one",
  "/tour",
  "/contact",
  "/privacy-policy",
  "/terms",
];

/**
 * `lastModified` is emitted only where a real content date exists — currently
 * the blog posts. It previously used `new Date()` for all 70 URLs, so every
 * deploy re-announced every page as freshly modified regardless of whether
 * anything changed, which trains crawlers to discount the signal entirely.
 * Omitting it is more honest than a date we can't substantiate; when detail
 * pages gain an `updated` field, add it here.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;

  const entries: Entry[] = [
    ...staticPaths.map((path) => ({ path })),
    ...conditions.map((c) => ({ path: `/what-we-treat/${c.slug}` })),
    ...[...programs, ...therapies].map((t) => ({ path: `/treatment/${t.slug}` })),
    ...areas.map((a) => ({ path: `/areas-we-serve/${a.slug}` })),
    ...team.map((m) => ({ path: `/about/${m.slug}` })),
    ...posts.map((p) => ({ path: `/${p.slug}`, lastModified: p.date })),
  ];

  return entries.map(({ path, lastModified }) => ({
    // canonicalPath keeps sitemap URLs in the same form as the served URL and
    // the per-page canonical. A sitemap listing the non-canonical form makes
    // every entry a redirect in Search Console.
    url: `${base}${canonicalPath(path)}`,
    ...(lastModified ? { lastModified } : {}),
    changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
    priority: path === "" ? 1 : path.split("/").length <= 2 ? 0.8 : 0.6,
  }));
}
