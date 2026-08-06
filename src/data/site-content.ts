/** Homepage & cross-site content blocks. */

export const stats: { value: string; label: string }[] = [
  { value: "24/7", label: "On-site clinical & medical care" },
  { value: "1:1", label: "Personalized treatment plans" },
  // 3, not 5. The old value counted *programs* — detox, SUD residential, MH
  // residential, dual diagnosis, aftercare — but dual diagnosis is a clinical
  // specialisation and aftercare is not a licensed level of care. Three matches
  // the licensed scope and the site's own FAQ: medical detox, substance abuse
  // inpatient rehabilitation, and mental health inpatient stabilization. PHP and
  // IOP are available through affiliated network facilities, not on this campus —
  // which is exactly what the old "one campus" qualifier contradicted. See FAC-2.
  { value: "3", label: "Levels of care on site" },
  { value: "PPO", label: "Most major plans accepted" },
];

export const differentiators: { icon: string; title: string; text: string }[] = [
  {
    icon: "waves",
    title: "Recovery by the ocean",
    text: "A luxury coastal campus in West Palm Beach — steps from the water and minutes from downtown — designed to feel calm, private, and restorative.",
  },
  {
    icon: "stethoscope",
    title: "Physician-led, evidence-based",
    text: "Licensed clinicians deliver medical detox, CBT, DBT, EMDR, and trauma-informed care grounded in what the research shows actually works.",
  },
  {
    icon: "layers",
    title: "Dual diagnosis expertise",
    text: "We treat addiction and mental health together — not in isolation — addressing the root causes of co-occurring conditions.",
  },
  {
    icon: "users",
    title: "Small & personal",
    text: "An intimate setting with a high staff-to-client ratio means your care plan is truly yours, and no one gets lost in the crowd.",
  },
  {
    icon: "heart-handshake",
    title: "Family included",
    text: "Family therapy and education rebuild trust and communication, because recovery is strongest when loved ones heal too.",
  },
  {
    icon: "lifebuoy",
    title: "Support for life",
    text: "Aftercare planning and an active alumni community help you carry the work forward long after you leave.",
  },
];

export const admissionsSteps: { step: string; title: string; text: string }[] = [
  {
    step: "01",
    title: "Initial Call & Assessment",
    text: "Speak with an admissions specialist to discuss your needs and determine the appropriate level of care. This confidential conversation is the first step.",
  },
  {
    step: "02",
    title: "Insurance Verification",
    text: "We'll review your insurance coverage and explain your options. Many clients have little to no out-of-pocket cost. No insurance? We'll help you explore alternatives.",
  },
  {
    step: "03",
    title: "Pre-admission Planning",
    text: "Our team guides you through what to bring, transportation options, and what to expect during your stay — making the transition in as smooth as possible.",
  },
  {
    step: "04",
    title: "Admission Day",
    text: "On arrival you'll meet our clinical and medical staff, complete intake, and begin your recovery journey in a safe, supportive environment.",
  },
];

export const accreditations: { name: string; image: string; alt: string }[] = [
  {
    name: "The Joint Commission",
    image: "/images/brand/joint-commission.png",
    alt: "Seaside Wellness is Joint Commission accredited",
  },
  {
    name: "LegitScript Certified",
    image: "/images/brand/legitscript.png",
    alt: "Seaside Wellness is LegitScript certified",
  },
  {
    name: "NAMI",
    image: "/images/brand/nami.gif",
    alt: "National Alliance on Mental Illness",
  },
];

export const insuranceImage = "/images/brand/insurance-accepted.png";
export const insurers = [
  "Aetna",
  "Cigna",
  "Blue Cross Blue Shield",
  "UnitedHealthcare",
  "Humana",
  "Magellan",
];

/**
 * Real Google Business Profile reviews, mirrored onto the site.
 *
 * ⚠️ DELIBERATELY EMPTY. This slot previously held three invented quotes
 * attributed to "Alumnus" / "Parent of a client". Publishing fabricated
 * endorsements as a healthcare advertiser is an FTC Act §5 and Endorsement
 * Guides exposure, so the section renders nothing unless every entry here is a
 * genuine, attributable review. Do not repopulate with representative copy.
 *
 * To populate, either:
 *   a) paste real reviews from the GBP listing (see `site.reviewsUrl`), keeping
 *      the reviewer's own Google display name and their actual star rating, or
 *   b) fetch them via the Google Places API using `site.placeId`.
 *
 * Do not paraphrase, merge, or invent ratings. Note that adding
 * `aggregateRating` to the JSON-LD is only valid once real reviews render
 * on-page and the rating is accurate.
 */
export type GoogleReview = {
  /** The reviewer's own Google display name. */
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  /** ISO date, if known. */
  date?: string;
};

export const googleReviews: GoogleReview[] = [];
