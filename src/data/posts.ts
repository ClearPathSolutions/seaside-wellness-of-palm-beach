import type { Post, DetailSection } from "./types";
import postBodies from "./content/posts.json";

/** Post metadata. Long-form bodies live in ./content/posts.json (merged by slug). */
const meta: Omit<Post, "body">[] = [
  {
    slug: "recovery-by-the-ocean-palm-beach",
    title: "Recovery by the Ocean in Palm Beach",
    excerpt:
      "How a calm coastal environment supports addiction healing — and why setting matters as much as clinical care.",
    category: "Recovery",
    date: "2026-06-15",
    readingMinutes: 7,
    image: "/wp-content/uploads/2025/10/pexels-jeremy-bishop-1260133-2765872.jpg",
  },
  {
    slug: "how-to-find-a-luxury-detox",
    title: "How to Find a Luxury Detox in Palm Beach That Accepts Private Insurance",
    excerpt:
      "A practical guide to finding a luxury detox in Palm Beach that accepts private insurance — what to look for and what to ask.",
    category: "Detox",
    date: "2026-05-28",
    readingMinutes: 8,
    image: "/wp-content/uploads/2025/08/5-web-or-mls-DJI_0101_2_3_4_5.jpg",
  },
  {
    slug: "when-detox-is-the-right-first-step-in-addiction-recovery",
    title: "When Detox Is the Right First Step in Addiction Recovery",
    excerpt:
      "Not sure if detox is needed? Learn when detox is the right first step, and how it supports safety, stability, and long-term healing.",
    category: "Detox",
    date: "2026-05-10",
    readingMinutes: 9,
    image: "/wp-content/uploads/2025/10/pexels-rdne-5530626-scaled.jpg",
  },
  {
    slug: "what-happens-during-medical-detox",
    title: "What Happens During Medical Detox for Addiction?",
    excerpt:
      "Learn what happens during medical detox, how withdrawal is managed, and why supervised detox is often the safest first step.",
    category: "Detox",
    date: "2026-04-22",
    readingMinutes: 7,
    image: "/wp-content/uploads/2026/01/shutterstock_2442888395-scaled.jpg",
  },
  {
    slug: "mental-health-treatment-west-palm-beach-fl",
    title: "Mental Health Treatment in West Palm Beach FL: Residential Care for Lasting Recovery",
    excerpt:
      "How structured residential programs and dual diagnosis support help you recover from mental health conditions.",
    category: "Mental Health",
    date: "2026-04-05",
    readingMinutes: 8,
    image: "/wp-content/uploads/2025/08/48-web-or-mls-0E2A6426-1.jpg",
  },
  {
    slug: "west-palm-beach-addiction-treatment-guide",
    title: "Comprehensive Addiction & Mental Health Treatment in West Palm Beach",
    excerpt:
      "A guide to personalized clinical care and holistic support for substance use and mental health concerns.",
    category: "Treatment",
    date: "2026-03-18",
    readingMinutes: 7,
    image: "/wp-content/uploads/2025/08/67-web-or-mls-0E2A6521.jpg",
  },
  {
    slug: "high-functioning-depression-signs",
    title: "High-Functioning Depression: Signs You Shouldn't Ignore",
    excerpt:
      "The signs of high-functioning depression, why it often goes unnoticed, and when to seek professional support.",
    category: "Mental Health",
    date: "2026-02-27",
    readingMinutes: 7,
    image: "/wp-content/uploads/2025/08/pexels-umaraffan499-88212.jpg",
  },
  {
    slug: "what-depression-really-looks-like",
    title: "What Depression Really Looks Like Beyond Feeling Sad",
    excerpt:
      "The lesser-known signs of depression, how it affects daily life, and when treatment can support long-term wellbeing.",
    category: "Mental Health",
    date: "2026-02-10",
    readingMinutes: 8,
    image: "/wp-content/uploads/2025/08/pexels-rozegold-2657617.jpg",
  },
  {
    slug: "how-ptsd-affects-daily-life",
    title: "How PTSD Can Affect Daily Life Long After Trauma",
    excerpt:
      "How PTSD affects emotional health, relationships, sleep, and daily functioning — and how treatment helps.",
    category: "Mental Health",
    date: "2026-01-24",
    readingMinutes: 8,
    image: "/wp-content/uploads/2025/08/56-web-or-mls-0E2A6466-1.jpg",
  },
  {
    slug: "how-benzo-addiction-affects-daily-life",
    title: "How Benzo Addiction Can Affect Daily Life",
    excerpt:
      "How benzodiazepine addiction impacts mental health, relationships, work, and overall daily functioning over time.",
    category: "Addiction",
    date: "2026-01-08",
    readingMinutes: 7,
    image: "/wp-content/uploads/2025/10/pexels-samiro-2041832.jpg",
  },
  {
    slug: "how-long-should-you-stay-in-rehab",
    title: "How Long Should You Stay in Rehab? What to Consider",
    excerpt:
      "How long rehab should last, the factors that affect treatment length, and why longer stays often lead to better outcomes.",
    category: "Treatment",
    date: "2025-12-15",
    readingMinutes: 7,
    image: "/wp-content/uploads/2025/08/77-web-or-mls-0E2A6571.jpg",
  },
  {
    slug: "holiday-pressure-and-addiction-when-its-time-to-reach-out-for-help",
    title: "Holiday Pressure and Addiction: When It's Time to Reach Out for Help",
    excerpt:
      "How holiday stress can worsen addiction, and how to know when it's time to seek help.",
    category: "Recovery",
    date: "2025-12-01",
    readingMinutes: 8,
    image: "/wp-content/uploads/2025/09/pexels-quang-nguyen-vinh-222549-3355732.jpg",
  },
  {
    slug: "beyond-the-dry-january-trend-when-brief-abstinence-signals-a-need-for-clinical-intervention",
    title: "Beyond the Dry January Trend: When Brief Abstinence Signals a Need for Clinical Intervention",
    excerpt:
      "When a month off alcohol reveals a deeper problem — and how to know if clinical intervention is warranted.",
    category: "Addiction",
    date: "2026-01-02",
    readingMinutes: 7,
    image: "/wp-content/uploads/2025/10/pexels-pixabay-210237.jpg",
  },
];

const bodyMap = new Map<string, DetailSection[]>(
  (postBodies as { slug: string; body: DetailSection[] }[]).map((b) => [b.slug, b.body])
);

export const posts: Post[] = meta
  .map((m) => ({ ...m, body: bodyMap.get(m.slug) ?? [] }))
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export const latestPosts = posts.slice(0, 3);

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
