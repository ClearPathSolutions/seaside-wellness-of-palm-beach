/** Shared content types for the Seaside Wellness site. */

export type CatalogItem = {
  slug: string;
  name: string;
  /** short card blurb (1–2 sentences) */
  short: string;
  image: string;
  /** lucide icon key (see components/Icon) */
  icon?: string;
};

export type Program = CatalogItem;
export type Therapy = CatalogItem;

export type Condition = CatalogItem & {
  category: "substance" | "mental-health";
};

export type Area = CatalogItem & {
  region: string;
};

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  credentials?: string;
  /** Optional: portal-synced staff may not have a headshot yet. */
  image?: string;
  bio: string[];
};

/** Long-form detail content (produced per page, rendered by templates). */
export type DetailSection = {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
  /**
   * Paragraphs that belong *after* the bullet list.
   *
   * Sections are commonly authored as intro → list → closing thought. Without a
   * slot for the closing paragraph it has to live in `paragraphs`, which renders
   * before the list, so the section reads out of order. Positional rather than
   * pretty on purpose: the name says where it goes.
   */
  afterBullets?: string[];
};

export type Faq = {
  q: string;
  a: string;
  /**
   * Optional topic grouping. Used on the standalone /about/faq page, where 39
   * questions in one flat accordion were unscannable. Detail-page FAQ sets are
   * short enough to stay ungrouped, so this is undefined there.
   */
  category?: string;
};

export type DetailContent = {
  slug: string;
  /** SEO */
  metaTitle: string;
  metaDescription: string;
  /** Hero */
  heading: string;
  heroSubtitle: string;
  /** Body */
  intro: string[];
  sections: DetailSection[];
  faqs?: Faq[];
};

export type Post = {
  slug: string;
  /** Full headline — rendered as the on-page `<h1>`. */
  title: string;
  /**
   * Optional shorter title for the `<title>` tag only. Set where `title` plus
   * the " | Seaside Wellness" suffix would run past ~60 chars and truncate in
   * search results. Falls back to `title`.
   */
  metaTitle?: string;
  excerpt: string;
  category: string;
  date: string; // ISO
  readingMinutes: number;
  image: string;
  body: DetailSection[];
};
