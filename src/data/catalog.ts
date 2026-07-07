import type { Program, Therapy, Condition, Area } from "./types";

const F = "/wp-content/uploads/2025/08/"; // facility & photo folder

export const programs: Program[] = [
  {
    slug: "detox",
    name: "Alcohol & Drug Detox",
    short:
      "A safe, medically supervised detox with 24/7 clinical support for alcohol, opioids, benzodiazepines, and more.",
    image: F + "89-web-or-mls-0E2A6631.jpg",
    icon: "stethoscope",
  },
  {
    slug: "substance-abuse-residential",
    name: "Substance Abuse Residential",
    short:
      "Round-the-clock residential rehab in a private, structured setting designed for deep, lasting recovery.",
    image: F + "67-web-or-mls-0E2A6521.jpg",
    icon: "bed",
  },
  {
    slug: "mental-health-residential",
    name: "Mental Health Residential",
    short:
      "Compassionate residential mental health care with evidence-based therapy and holistic support to help you stabilize.",
    image: F + "48-web-or-mls-0E2A6426-1.jpg",
    icon: "brain",
  },
  {
    slug: "dual-diagnosis",
    name: "Dual Diagnosis",
    short:
      "Integrated treatment for co-occurring mental health and substance use disorders, addressing the root of both.",
    image: F + "77-web-or-mls-0E2A6571.jpg",
    icon: "layers",
  },
  {
    slug: "aftercare",
    name: "Aftercare & Alumni",
    short:
      "Recovery doesn't end at discharge. Our aftercare and alumni programs support stability for the long term.",
    image: F + "70-web-or-mls-0E2A6536.jpg",
    icon: "lifebuoy",
  },
];

export const therapies: Therapy[] = [
  {
    slug: "individual-therapy",
    name: "Individual Therapy",
    short:
      "One-on-one sessions with a licensed therapist to uncover root causes, build resilience, and drive change.",
    image: "/wp-content/uploads/2025/10/pexels-rdne-5530626-scaled.jpg",
    icon: "user",
  },
  {
    slug: "group-therapy",
    name: "Group Therapy",
    short:
      "A supportive space to connect, share experiences, and learn alongside others on the same path.",
    image: "/wp-content/uploads/2026/01/shutterstock_2442888395-scaled.jpg",
    icon: "users",
  },
  {
    slug: "family-therapy",
    name: "Family Therapy",
    short:
      "Rebuild trust and communication so the whole family can heal and support lasting recovery.",
    image: F + "pexels-hillaryfox-1595386-scaled.jpg",
    icon: "heart-handshake",
  },
];

export const substances: Condition[] = [
  {
    slug: "alcohol-addiction",
    name: "Alcohol Addiction",
    category: "substance",
    short: "Evidence-based alcohol rehab, from safe detox through residential care and relapse prevention.",
    image: "/wp-content/uploads/2025/10/pexels-pixabay-210237.jpg",
    icon: "wine",
  },
  {
    slug: "benzo-addiction",
    name: "Benzodiazepine Addiction",
    category: "substance",
    short: "Safe, physician-led detox and treatment for dependence on Xanax, Valium, Klonopin, and other benzos.",
    image: "/wp-content/uploads/2025/10/pexels-samiro-2041832.jpg",
    icon: "pill",
  },
  {
    slug: "cocaine-addiction",
    name: "Cocaine Addiction",
    category: "substance",
    short: "Comprehensive, evidence-based treatment for cocaine dependence and lasting recovery.",
    image: "/wp-content/uploads/2025/10/pexels-vidalbalielojrfotografia-2880897.jpg",
    icon: "activity",
  },
  {
    slug: "fentanyl-addiction",
    name: "Fentanyl Addiction",
    category: "substance",
    short: "Medical detox, 24/7 support, and compassionate care for one of the most dangerous opioids.",
    image: "/wp-content/uploads/2025/10/pexels-andre-furtado-43594-1429395.jpg",
    icon: "alert-triangle",
  },
  {
    slug: "heroin-addiction",
    name: "Heroin Addiction",
    category: "substance",
    short: "Safe detox, therapy, and structured residential treatment to break the cycle of heroin use.",
    image: "/wp-content/uploads/2025/10/pexels-peiheng-li-164426283-10871472.jpg",
    icon: "syringe",
  },
  {
    slug: "methamphetamine-addiction",
    name: "Methamphetamine Addiction",
    category: "substance",
    short: "Personalized detox and inpatient treatment to help you recover from meth dependence.",
    image: "/wp-content/uploads/2025/09/pexels-quang-nguyen-vinh-222549-3355732.jpg",
    icon: "zap",
  },
  {
    slug: "opiate-addiction",
    name: "Opiate Addiction",
    category: "substance",
    short: "Evidence-based opiate rehab that treats withdrawal safely and addresses the underlying causes.",
    image: "/wp-content/uploads/2025/10/pexels-daiangan-1581363.jpg",
    icon: "pill",
  },
  {
    slug: "opioid-addiction",
    name: "Opioid Addiction",
    category: "substance",
    short: "Compassionate opioid treatment and medical detox to help you recover safely and rebuild.",
    image: "/wp-content/uploads/2025/10/pexels-ollivves-931018.jpg",
    icon: "pill",
  },
  {
    slug: "prescription-drug-addiction",
    name: "Prescription Drug Addiction",
    category: "substance",
    short: "Break free from dependence on prescription medications with safe detox and long-term support.",
    image: F + "pexels-judit-peter-281675-1766604.jpg",
    icon: "clipboard",
  },
];

export const mentalHealth: Condition[] = [
  {
    slug: "anxiety",
    name: "Anxiety",
    category: "mental-health",
    short: "Personalized therapy and care to quiet chronic anxiety and restore balance and peace of mind.",
    image: "/wp-content/uploads/2025/08/pexels-rozegold-2657617.jpg",
    icon: "wind",
  },
  {
    slug: "depression",
    name: "Depression",
    category: "mental-health",
    short: "Compassionate, evidence-based depression treatment to help you feel like yourself again.",
    image: F + "pexels-umaraffan499-88212.jpg",
    icon: "cloud-rain",
  },
  {
    slug: "ptsd",
    name: "PTSD",
    category: "mental-health",
    short: "Trauma-informed therapy for lasting healing from post-traumatic stress.",
    image: F + "48-web-or-mls-0E2A6426-1.jpg",
    icon: "shield",
  },
  {
    slug: "bipolar",
    name: "Bipolar Disorder",
    category: "mental-health",
    short: "Personalized care for mood stabilization, insight, and lasting recovery.",
    image: F + "91-web-or-mls-0E2A6641.jpg",
    icon: "waves",
  },
  {
    slug: "personality-disorder",
    name: "Personality Disorder",
    category: "mental-health",
    short: "Evidence-based treatment that supports long-term healing and healthier relationships.",
    image: F + "56-web-or-mls-0E2A6466-1.jpg",
    icon: "puzzle",
  },
  {
    slug: "adhd",
    name: "ADHD",
    category: "mental-health",
    short: "A specialized ADHD program with personalized therapy to restore focus and balance.",
    image: F + "77-web-or-mls-0E2A6571.jpg",
    icon: "target",
  },
  {
    slug: "schizophrenia",
    name: "Schizophrenia",
    category: "mental-health",
    short: "Compassionate, personalized care for clarity, stability, and long-term wellbeing.",
    image: F + "36-web-or-mls-0E2A6366-1.jpg",
    icon: "sparkles",
  },
];

export const conditions: Condition[] = [...substances, ...mentalHealth];

export const areas: Area[] = [
  {
    slug: "west-palm-beach",
    name: "West Palm Beach",
    region: "Palm Beach County",
    short: "Evidence-based addiction and mental health treatment in a peaceful coastal setting — our home.",
    image: F + "5-web-or-mls-DJI_0101_2_3_4_5.jpg",
    icon: "map-pin",
  },
  {
    slug: "boca-raton",
    name: "Boca Raton",
    region: "South Palm Beach County",
    short: "Personalized, evidence-based programs close to Boca Raton, in nearby West Palm Beach.",
    image: F + "17-web-or-mls-DJI_0175_6_7_8_9.jpg",
    icon: "map-pin",
  },
  {
    slug: "boynton-beach",
    name: "Boynton Beach",
    region: "Central Palm Beach County",
    short: "Trusted recovery programs and mental health care close to home for Boynton Beach residents.",
    image: F + "15-web-or-mls-DJI_0165_6_7_8_9.jpg",
    icon: "map-pin",
  },
  {
    slug: "delray-beach",
    name: "Delray Beach",
    region: "South Palm Beach County",
    short: "Evidence-based addiction treatment just north of Delray Beach in a serene coastal setting.",
    image: F + "26-web-or-mls-0E2A6316.jpg",
    icon: "map-pin",
  },
  {
    slug: "wellington",
    name: "Wellington",
    region: "Western Palm Beach County",
    short: "Confidential, compassionate addiction and mental health treatment near Wellington.",
    image: F + "34-web-or-mls-0E2A6356.jpg",
    icon: "map-pin",
  },
  {
    slug: "palm-beach-county",
    name: "Palm Beach County",
    region: "Southeast Florida",
    short: "Detox, residential, and dual diagnosis care serving all of Palm Beach County.",
    image: F + "68-web-or-mls-0E2A6526.jpg",
    icon: "map-pin",
  },
  {
    slug: "south-florida",
    name: "South Florida",
    region: "Statewide",
    short: "Comprehensive detox and residential treatment for South Florida in a calm coastal setting.",
    image: "/wp-content/uploads/2025/10/pexels-jeremy-bishop-1260133-2765872.jpg",
    icon: "map-pin",
  },
];

/** Additional communities served (from homepage list). */
export const additionalCommunities: string[] = [
  "Atlantis",
  "Boca Pointe",
  "Coconut Creek",
  "Deerfield Beach",
  "Highland Beach",
  "Hillsboro Beach",
  "Lake Worth",
  "Lantana",
  "Ocean Ridge",
  "Palm Beach",
  "Palm Springs",
  "Parkland",
  "Royal Palm Estates",
  "Seminole Manor",
  "Terra Mar",
];
