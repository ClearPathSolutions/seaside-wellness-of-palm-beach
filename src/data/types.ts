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
  image: string;
  bio: string[];
};

/** Long-form detail content (produced per page, rendered by templates). */
export type DetailSection = {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type Faq = { q: string; a: string };

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
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO
  readingMinutes: number;
  image: string;
  body: DetailSection[];
};
