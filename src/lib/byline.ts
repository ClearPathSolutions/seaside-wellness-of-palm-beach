import type { Post } from "@/data/types";
import { team } from "@/data/team";
import { site } from "@/lib/site";
import { canonicalPath } from "@/lib/routing";

/** Someone a post can credit: always a team member, so always a bio page. */
export type Person = {
  slug: string;
  name: string;
  credentials: string | null;
  bioPath: string;
  bioUrl: string;
};

export function getPerson(slug: string): Person {
  const m = team.find((t) => t.slug === slug);
  // Fail the build: a byline naming someone without a bio page is exactly
  // what the editorial policy promises never to publish.
  if (!m) throw new Error(`Byline references unknown team slug "${slug}"`);
  const bioPath = canonicalPath(`/about/${m.slug}`);
  return {
    slug,
    name: m.name,
    credentials: m.credentials ?? null,
    bioPath,
    bioUrl: `${site.url}${bioPath}`,
  };
}

export type Byline = {
  author: Person | null;
  /** Set only when the post has both a reviewer and a review date. */
  reviewer: Person | null;
  lastReviewed: string | null;
  modified: string | null;
};

/**
 * Resolves a post's byline per templates/article-byline.html. No fallbacks:
 * an unset author or reviewer renders no line and no schema.
 */
export function getByline(p: Post): Byline {
  if (p.lastReviewed && !/^\d{4}-\d{2}-\d{2}$/.test(p.lastReviewed)) {
    throw new Error(`${p.slug}: lastReviewed must be YYYY-MM-DD, got "${p.lastReviewed}"`);
  }
  const lastReviewed = p.lastReviewed || null;
  // Resolved even when undated, so a typo'd slug still fails the build.
  const reviewer = p.reviewedBy ? getPerson(p.reviewedBy) : null;
  return {
    author: p.writtenBy ? getPerson(p.writtenBy) : null,
    reviewer: lastReviewed ? reviewer : null,
    lastReviewed,
    // Posts carry a single date, which the article schema already uses as
    // dateModified; the byline's "Updated" follows it.
    modified: p.date || null,
  };
}

/** "2026-09-30" -> "September 30, 2026", in UTC so it can't slip a day. */
export function formatBylineDate(iso: string): string {
  return new Date(`${iso.slice(0, 10)}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
