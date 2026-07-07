import type { CatalogItem } from "./types";

export const admissionsLinks: (CatalogItem & { image: string })[] = [
  {
    slug: "admissions-process",
    name: "Admissions Process",
    short: "What to expect from first call to admission day.",
    image: "/wp-content/uploads/2025/08/70-web-or-mls-0E2A6536.jpg",
  },
  {
    slug: "insurance-verification",
    name: "Insurance Verification",
    short: "Confidentially confirm your coverage.",
    image: "/wp-content/uploads/2025/08/67-web-or-mls-0E2A6521.jpg",
  },
  {
    slug: "help-for-yourself",
    name: "Help for Yourself",
    short: "Take the first step for your own recovery.",
    image: "/wp-content/uploads/2025/08/pexels-rozegold-2657617.jpg",
  },
  {
    slug: "help-for-loved-one",
    name: "Help for a Loved One",
    short: "Support someone you love in finding care.",
    image: "/wp-content/uploads/2025/10/pexels-rdne-5530626-scaled.jpg",
  },
];

export const bySlug = (slug: string) => admissionsLinks.find((a) => a.slug === slug)!;
