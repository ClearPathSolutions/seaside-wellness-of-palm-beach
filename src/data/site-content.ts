/** Homepage & cross-site content blocks. */

export const stats: { value: string; label: string }[] = [
  { value: "24/7", label: "On-site clinical & medical care" },
  { value: "1:1", label: "Personalized treatment plans" },
  { value: "5", label: "Levels of care, one campus" },
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
    image: "/wp-content/uploads/2026/04/Joint-Commission.png",
    alt: "Seaside Wellness is Joint Commission accredited",
  },
  {
    name: "LegitScript Certified",
    image: "/wp-content/uploads/2026/04/legitscript-seaside.png",
    alt: "Seaside Wellness is LegitScript certified",
  },
  {
    name: "NAMI",
    image: "/wp-content/uploads/2026/04/NAMI_logo.gif",
    alt: "National Alliance on Mental Illness",
  },
];

export const insuranceImage = "/wp-content/uploads/2026/04/Copy-of-Insurance-New-Seaside.png";
export const insurers = [
  "Aetna",
  "Cigna",
  "Blue Cross Blue Shield",
  "UnitedHealthcare",
  "Humana",
  "Magellan",
];

/**
 * NOTE: Placeholder testimonials — representative statements for layout.
 * Replace with real, written-consent client/family reviews before launch.
 */
export const testimonials: { quote: string; name: string; context: string }[] = [
  {
    quote:
      "From the first phone call, I felt like a person and not a case number. The team walked my family through every step and never once made us feel judged.",
    name: "Alumnus",
    context: "Residential program",
  },
  {
    quote:
      "The dual diagnosis care changed everything for my son. For the first time, someone treated the anxiety underneath the addiction — not just the addiction.",
    name: "Parent of a client",
    context: "Dual diagnosis",
  },
  {
    quote:
      "It genuinely felt like healing by the ocean. Beautiful, calm, and private — but the clinical care was the real difference. I finally have tools that work.",
    name: "Alumnus",
    context: "Detox & residential",
  },
];
