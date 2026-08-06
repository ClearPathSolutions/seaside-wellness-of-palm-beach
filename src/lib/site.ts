export const site = {
  name: "Seaside Wellness",
  legalName: "Seaside Wellness of Palm Beach",
  tagline: "Your path to healing starts at Seaside Wellness",
  /**
   * Long-form prose description. Used for the JSON-LD `description`, where
   * length is unconstrained. Not a meta description — see `metaDescription`.
   */
  description:
    "Seaside Wellness is a luxury addiction treatment and mental health facility in West Palm Beach, Florida — offering evidence-based detox, residential inpatient, and dual diagnosis care just steps from the water.",
  /**
   * SERP-length variant (≤155 chars) for the homepage `<meta name="description">`.
   * `description` was being reused verbatim at 210 chars and truncating.
   */
  metaDescription:
    "Luxury addiction and mental health treatment in West Palm Beach, FL — evidence-based detox, residential inpatient, and dual diagnosis care.",
  url: "https://seasidewellnesspb.com",
  phone: "(855) 416-5648",
  phoneHref: "tel:+18554165648",
  email: "info@seasidewellnesspb.com",
  address: {
    street: "106 Blossom Ln",
    city: "West Palm Beach",
    region: "FL",
    postalCode: "33404",
    full: "106 Blossom Ln, West Palm Beach, FL 33404",
  },
  socials: {
    facebook: "https://facebook.com/seasidewellnesspb",
    instagram: "https://instagram.com/seasidewellnesspb",
    linkedin: "https://linkedin.com/company/seaside-wellness-pb/",
  },
  /**
   * Google Business Profile.
   *
   * Checked 2026-08-06: this listing publishes the address as
   * "106 Blossom Ln, West Palm Beach, FL 33404" — i.e. it agrees with this site
   * and with production, not with the master-data row's "Palm Beach Shores".
   * See FAC-1 in ISSUES.md.
   */
  placeId: "ChIJnYAXE9PZ2IgREdolATVwAMM",
  mapUrl: "https://www.google.com/maps/place/?q=place_id:ChIJnYAXE9PZ2IgREdolATVwAMM",
  /** Public review listing — for "read our reviews". */
  reviewsUrl:
    "https://search.google.com/local/reviews?placeid=ChIJnYAXE9PZ2IgREdolATVwAMM",
  /** Opens the GBP review dialog directly — for alumni review requests. */
  reviewUrl: "https://g.page/r/CRHaJQE1cADDEAI/review",
  logo: "/images/brand/seaside-logo-horizontal.png",
} as const;

export type NavChild = { label: string; href: string };
export type NavColumn = { heading?: string; items: NavChild[] };
export type NavItem = {
  label: string;
  href: string;
  columns?: NavColumn[];
  featured?: { title: string; text: string; href: string; image: string };
};

export const nav: NavItem[] = [
  {
    label: "About Us",
    href: "/about",
    columns: [
      {
        heading: "The Facility",
        items: [
          { label: "Our Story", href: "/about/our-story" },
          { label: "Meet the Team", href: "/about/meet-the-team" },
          { label: "Tour the Facility", href: "/tour" },
        ],
      },
      {
        heading: "Resources",
        items: [
          { label: "FAQ", href: "/about/faq" },
          { label: "Blog", href: "/about/blog" },
          { label: "Contact", href: "/contact" },
        ],
      },
    ],
    featured: {
      title: "Recovery by the ocean",
      text: "See why families across South Florida trust Seaside.",
      href: "/about/our-story",
      image: "/images/facility/5-web-or-mls-DJI_0101_2_3_4_5.jpg",
    },
  },
  {
    label: "Treatment",
    href: "/treatment",
    columns: [
      {
        heading: "Programs",
        items: [
          { label: "Alcohol & Drug Detox", href: "/treatment/detox" },
          { label: "Substance Abuse Residential", href: "/treatment/substance-abuse-residential" },
          { label: "Mental Health Residential", href: "/treatment/mental-health-residential" },
          { label: "Dual Diagnosis", href: "/treatment/dual-diagnosis" },
          { label: "Aftercare Program", href: "/treatment/aftercare" },
        ],
      },
      {
        heading: "Therapies",
        items: [
          { label: "Individual Therapy", href: "/treatment/individual-therapy" },
          { label: "Group Therapy", href: "/treatment/group-therapy" },
          { label: "Family Therapy", href: "/treatment/family-therapy" },
        ],
      },
    ],
  },
  {
    label: "What We Treat",
    href: "/what-we-treat",
    columns: [
      {
        heading: "Substance Addiction",
        items: [
          { label: "Alcohol Addiction", href: "/what-we-treat/alcohol-addiction" },
          { label: "Benzo Addiction", href: "/what-we-treat/benzo-addiction" },
          { label: "Cocaine Addiction", href: "/what-we-treat/cocaine-addiction" },
          { label: "Fentanyl Addiction", href: "/what-we-treat/fentanyl-addiction" },
          { label: "Heroin Addiction", href: "/what-we-treat/heroin-addiction" },
          { label: "Meth Addiction", href: "/what-we-treat/methamphetamine-addiction" },
          { label: "Opiate Addiction", href: "/what-we-treat/opiate-addiction" },
          { label: "Opioid Addiction", href: "/what-we-treat/opioid-addiction" },
          { label: "Prescription Drug Addiction", href: "/what-we-treat/prescription-drug-addiction" },
        ],
      },
      {
        heading: "Mental Health",
        items: [
          { label: "Anxiety", href: "/what-we-treat/anxiety" },
          { label: "Depression", href: "/what-we-treat/depression" },
          { label: "PTSD", href: "/what-we-treat/ptsd" },
          { label: "Bipolar Disorder", href: "/what-we-treat/bipolar" },
          { label: "Personality Disorder", href: "/what-we-treat/personality-disorder" },
          { label: "ADHD", href: "/what-we-treat/adhd" },
          { label: "Schizophrenia", href: "/what-we-treat/schizophrenia" },
        ],
      },
    ],
  },
  {
    label: "Areas We Serve",
    href: "/areas-we-serve",
    columns: [
      {
        heading: "Communities",
        items: [
          { label: "West Palm Beach", href: "/areas-we-serve/west-palm-beach" },
          { label: "Boca Raton", href: "/areas-we-serve/boca-raton" },
          { label: "Boynton Beach", href: "/areas-we-serve/boynton-beach" },
          { label: "Delray Beach", href: "/areas-we-serve/delray-beach" },
        ],
      },
      {
        heading: "Regions",
        items: [
          { label: "Wellington", href: "/areas-we-serve/wellington" },
          { label: "Palm Beach County", href: "/areas-we-serve/palm-beach-county" },
          { label: "South Florida", href: "/areas-we-serve/south-florida" },
        ],
      },
    ],
  },
  {
    label: "Admissions",
    href: "/admissions",
    columns: [
      {
        heading: "Get Started",
        items: [
          { label: "Admissions Process", href: "/admissions/admissions-process" },
          { label: "Insurance Verification", href: "/admissions/insurance-verification" },
          { label: "Help for Yourself", href: "/admissions/help-for-yourself" },
          { label: "Help for a Loved One", href: "/admissions/help-for-loved-one" },
        ],
      },
    ],
  },
  { label: "Contact", href: "/contact" },
];
