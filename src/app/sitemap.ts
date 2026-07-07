import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { conditions, programs, therapies, areas } from "@/data/catalog";
import { team } from "@/data/team";
import { posts } from "@/data/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const now = new Date();

  const staticRoutes = [
    "",
    "/about",
    "/about/about-us",
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

  const dynamicRoutes = [
    ...conditions.map((c) => `/what-we-treat/${c.slug}`),
    ...[...programs, ...therapies].map((t) => `/treatment/${t.slug}`),
    ...areas.map((a) => `/areas-we-serve/${a.slug}`),
    ...team.map((m) => `/about/${m.slug}`),
    ...posts.map((p) => `/${p.slug}`),
  ];

  return [...staticRoutes, ...dynamicRoutes].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.split("/").length <= 2 ? 0.8 : 0.6,
  }));
}
