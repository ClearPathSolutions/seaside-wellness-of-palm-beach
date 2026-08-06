import type { Post, DetailSection } from "./types";
import postBodies from "./content/posts.json";

/**
 * Post metadata. Long-form bodies live in ./content/posts.json (merged by slug).
 *
 * `readingMinutes` is intentionally absent — it is derived from the body at
 * merge time. Hand-authored values had drifted 2–3× above the real length
 * (a 421-word post claimed 7 minutes).
 */
const meta: Omit<Post, "body" | "readingMinutes">[] = [
  {
    // Ported from production 2026-08-06 (published there 2026-07-17, i.e. after
    // the content snapshot this build was migrated from — which is why it was
    // the only production URL with no build route). Copy is the client's own,
    // extracted verbatim, with ONE deliberate correction: the closing section
    // claimed Seaside provides "every level of care … and ongoing outpatient
    // support", which contradicts both the licensed scope (detox & residential)
    // and the site's own FAQ. It now uses the FAQ's accurate framing.
    slug: "drug-rehab-west-palm-beach-complete-guide",
    title: "Drug Rehab in West Palm Beach: Your Complete Guide to Recovery",
    metaTitle: "Drug Rehab in West Palm Beach",
    excerpt:
      "Searching for a drug rehab in West Palm Beach? Explore detox, residential, and outpatient care, plus how to choose the right program for lasting recovery.",
    category: "Treatment",
    date: "2026-07-17",
    image: "/images/facility/14-web-or-mls-DJI_0160_1_2_3_4.jpg",
  },
  {
    slug: "recovery-by-the-ocean-palm-beach",
    title: "Recovery by the Ocean in Palm Beach",
    excerpt:
      "How a calm coastal environment supports addiction healing — and why setting matters as much as clinical care.",
    category: "Recovery",
    date: "2026-06-15",
    image: "/images/stock/pexels-jeremy-bishop-1260133-2765872.jpg",
  },
  {
    slug: "how-to-find-a-luxury-detox",
    title: "How to Find a Luxury Detox in Palm Beach That Accepts Private Insurance",
    metaTitle: "Finding a Luxury Detox in Palm Beach",
    excerpt:
      "A practical guide to finding a luxury detox in Palm Beach that accepts private insurance — what to look for and what to ask.",
    category: "Detox",
    date: "2026-05-28",
    image: "/images/facility/5-web-or-mls-DJI_0101_2_3_4_5.jpg",
  },
  {
    slug: "when-detox-is-the-right-first-step-in-addiction-recovery",
    title: "When Detox Is the Right First Step in Addiction Recovery",
    metaTitle: "When Detox Is the Right First Step",
    excerpt:
      "Not sure if detox is needed? Learn when detox is the right first step, and how it supports safety, stability, and long-term healing.",
    category: "Detox",
    date: "2026-05-10",
    image: "/images/stock/pexels-rdne-5530626-scaled.jpg",
  },
  {
    slug: "what-happens-during-medical-detox",
    title: "What Happens During Medical Detox for Addiction?",
    metaTitle: "What Happens During Medical Detox",
    excerpt:
      "Learn what happens during medical detox, how withdrawal is managed, and why supervised detox is often the safest first step.",
    category: "Detox",
    date: "2026-04-22",
    image: "/images/stock/shutterstock_2442888395-scaled.jpg",
  },
  {
    slug: "mental-health-treatment-west-palm-beach-fl",
    title: "Mental Health Treatment in West Palm Beach FL: Residential Care for Lasting Recovery",
    metaTitle: "Mental Health Treatment, West Palm Beach",
    excerpt:
      "How structured residential programs and dual diagnosis support help you recover from mental health conditions.",
    category: "Mental Health",
    date: "2026-04-05",
    image: "/images/facility/48-web-or-mls-0E2A6426-1.jpg",
  },
  {
    slug: "west-palm-beach-addiction-treatment-guide",
    title: "Comprehensive Addiction & Mental Health Treatment in West Palm Beach",
    metaTitle: "Addiction Treatment in West Palm Beach",
    excerpt:
      "A guide to personalized clinical care and holistic support for substance use and mental health concerns.",
    category: "Treatment",
    date: "2026-03-18",
    image: "/images/facility/67-web-or-mls-0E2A6521.jpg",
  },
  {
    slug: "high-functioning-depression-signs",
    title: "High-Functioning Depression: Signs You Shouldn't Ignore",
    metaTitle: "High-Functioning Depression: Key Signs",
    excerpt:
      "The signs of high-functioning depression, why it often goes unnoticed, and when to seek professional support.",
    category: "Mental Health",
    date: "2026-02-27",
    image: "/images/stock/pexels-umaraffan499-88212.jpg",
  },
  {
    slug: "what-depression-really-looks-like",
    title: "What Depression Really Looks Like Beyond Feeling Sad",
    metaTitle: "What Depression Really Looks Like",
    excerpt:
      "The lesser-known signs of depression, how it affects daily life, and when treatment can support long-term wellbeing.",
    category: "Mental Health",
    date: "2026-02-10",
    image: "/images/stock/pexels-rozegold-2657617.jpg",
  },
  {
    slug: "how-ptsd-affects-daily-life",
    title: "How PTSD Can Affect Daily Life Long After Trauma",
    metaTitle: "How PTSD Affects Daily Life",
    excerpt:
      "How PTSD affects emotional health, relationships, sleep, and daily functioning — and how treatment helps.",
    category: "Mental Health",
    date: "2026-01-24",
    image: "/images/facility/56-web-or-mls-0E2A6466-1.jpg",
  },
  {
    slug: "how-benzo-addiction-affects-daily-life",
    title: "How Benzo Addiction Can Affect Daily Life",
    excerpt:
      "How benzodiazepine addiction impacts mental health, relationships, work, and overall daily functioning over time.",
    category: "Addiction",
    date: "2026-01-08",
    image: "/images/stock/pexels-samiro-2041832.jpg",
  },
  {
    slug: "how-long-should-you-stay-in-rehab",
    title: "How Long Should You Stay in Rehab? What to Consider",
    metaTitle: "How Long Should You Stay in Rehab?",
    excerpt:
      "How long rehab should last, the factors that affect treatment length, and why longer stays often lead to better outcomes.",
    category: "Treatment",
    date: "2025-12-15",
    image: "/images/facility/77-web-or-mls-0E2A6571.jpg",
  },
  {
    slug: "holiday-pressure-and-addiction-when-its-time-to-reach-out-for-help",
    title: "Holiday Pressure and Addiction: When It's Time to Reach Out for Help",
    metaTitle: "Holiday Pressure and Addiction",
    excerpt:
      "How holiday stress can worsen addiction, and how to know when it's time to seek help.",
    category: "Recovery",
    date: "2025-12-01",
    image: "/images/stock/pexels-quang-nguyen-vinh-222549-3355732.jpg",
  },
  {
    slug: "beyond-the-dry-january-trend-when-brief-abstinence-signals-a-need-for-clinical-intervention",
    title: "Beyond the Dry January Trend: When Brief Abstinence Signals a Need for Clinical Intervention",
    metaTitle: "When Dry January Signals a Real Problem",
    excerpt:
      "When a month off alcohol reveals a deeper problem — and how to know if clinical intervention is warranted.",
    category: "Addiction",
    date: "2026-01-02",
    image: "/images/stock/pexels-pixabay-210237.jpg",
  },
];

const bodyMap = new Map<string, DetailSection[]>(
  (postBodies as { slug: string; body: DetailSection[] }[]).map((b) => [b.slug, b.body])
);

/** Average adult reading speed for prose; the usual figure used for estimates. */
const WORDS_PER_MINUTE = 225;

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/** Reading time derived from the rendered body, rounded up to a whole minute. */
function readingMinutesFor(body: DetailSection[], fallback: string): number {
  const words = body.length
    ? body.reduce(
        (n, s) =>
          n +
          countWords(s.heading ?? "") +
          (s.paragraphs ?? []).reduce((m, p) => m + countWords(p), 0) +
          (s.bullets ?? []).reduce((m, b) => m + countWords(b), 0),
        0
      )
    : countWords(fallback);
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

export const posts: Post[] = meta
  .map((m) => {
    const body = bodyMap.get(m.slug) ?? [];
    return { ...m, body, readingMinutes: readingMinutesFor(body, m.excerpt) };
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export const latestPosts = posts.slice(0, 3);

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
