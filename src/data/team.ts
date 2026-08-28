import type { TeamMember } from "./types";

/**
 * Synced from the Quadrant support portal — edit bios at
 * support.quadranthealthgroup.com/dev/staff, then re-run
 * scripts/sync-team.mjs and redeploy.
 *
 * Not fetched at runtime on purpose: generateStaticParams and sitemap.ts read
 * this array at build time, so a live fetch would let routes and the sitemap
 * drift out of sync with the content.
 */
export const team: TeamMember[] = [
  {
    slug: "pamela-tambini",
    name: "Dr. Pamela Tambini",
    role: "Medical Oversight",
    image: "/images/team/pamela-tambini.jpg",
    bio: [
      "Dr. Pamela Tambini is a board-certified physician in Internal Medicine and Addiction Medicine, entrepreneur, and healthcare executive dedicated to advancing evidence-based treatment for individuals with substance use and co-occurring mental health disorders. She is the Founder and Chief Executive Officer of The Sober Connection, a physician-led medical services organization that partners with behavioral healthcare facilities nationwide to provide comprehensive medical leadership, provider staffing, quality assurance, and regulatory compliance solutions.",
      "With extensive experience across the continuum of addiction treatment\u2014including medical detoxification, residential treatment, partial hospitalization, intensive outpatient, and outpatient care\u2014Dr. Tambini has developed scalable clinical programs that improve patient outcomes while helping organizations maintain regulatory excellence and operational efficiency. Her expertise includes addiction medicine, psychopharmacology, withdrawal management, medical stabilization, utilization review, physician leadership, and multi-state healthcare operations.",
      "Prior to founding The Sober Connection, Dr. Tambini served as a hospitalist within the Veterans Health Administration, where she managed medically complex patients and collaborated with multidisciplinary teams to deliver high-quality inpatient care. Her clinical expertise, combined with her operational leadership, provides a unique perspective on integrating medical excellence with sustainable healthcare systems.",
      "Under Dr. Tambini's leadership, The Sober Connection has grown into a multi-state organization supporting behavioral healthcare facilities through physician staffing, medical directorships, quality improvement initiatives, provider education, credentialing, policy development, and clinical oversight. She is recognized for building high-performing medical teams, implementing standardized clinical processes, and helping treatment centers navigate accreditation, licensing, and payer requirements.",
      "Dr. Tambini is passionate about raising the standard of addiction medicine by combining compassionate patient care with innovative operational strategies. Her leadership philosophy emphasizes clinical integrity, accountability, and collaboration, with a focus on creating systems that support both providers and the patients they serve.",
      "She remains actively involved in medical education, physician mentorship, and the ongoing advancement of best practices in behavioral healthcare while continuing to care for patients and advise organizations on clinical program development, healthcare operations, and quality improvement initiatives.",
    ],
  },
  {
    slug: "april-blair",
    name: "April Blair",
    role: "Primary Therapist",
    credentials: "MSW, RCSWI",
    image: "/images/team/april-blair.png",
    bio: [
      "April Blair received her Master’s in Social Work from Florida State University. She utilizes a trauma-informed, person-centered approach in her work and is trained in LGBTQ-affirmative Cognitive Behavioral Therapy (CBT), creating a supportive and inclusive space for clients navigating recovery and life’s challenges. Before becoming a therapist, April spent more than a decade in case management, working closely with individuals facing major life stressors such as poverty, homelessness, unemployment, mental health concerns, substance use, and disability.",
      "This experience continues to shape her holistic and empathetic approach to therapy today.",
    ],
  },
  {
    slug: "shaun-hutton",
    name: "Dr. Shaun Hutton",
    role: "Primary Therapist",
    credentials: "PhD, RMHCI, CAP, ICADC",
    image: "/images/team/shaun-hutton.png",
    bio: [
      "Dr. Shaun Faith Hutton is a mental health and substance use disorder clinician with more than 25 years of experience helping individuals and families navigate addiction, trauma, grief, and co-occurring mental health challenges. She currently serves as a Primary Therapist, providing individual, group, and family counseling within residential and detoxification treatment settings. Dr. Hutton holds a Ph.D. and M.Phil. in Educational Psychology from Walden University and a Master's degree in Counseling Psychology (substance abuse concentration) from Pace University. She is a Registered Mental Health Counselor Intern (RMHCI), Certified Addictions Professional (CAP), and International Certified Alcohol and Drug Counselor (ICADC).",
      "Her therapeutic approach integrates Cognitive Behavioral Therapy (CBT), Dialectical Behavior Therapy (DBT), Motivational Interviewing (MI), trauma-informed care, and strengths-based interventions. Dr. Hutton is committed to creating a compassionate, supportive environment where clients can gain insight, build resilience, strengthen relationships, and develop the tools necessary for lasting recovery and personal growth.",
    ],
  },
  {
    slug: "erin-crawford",
    name: "Erin Crawford",
    role: "Director of Nursing",
    image: "/images/team/erin-crawford.jpg",
    bio: [
      "Born in Okinawa, Japan and raised in South Florida, Erin Crawford is a dedicated and compassionate Registered Nurse with a strong commitment to serving individuals affected by substance abuse, mental health challenges, and health disparities within our communities. She is a proud mother of two and finds balance between her professional and personal life. When she’s not cheering her children on at the soccer pitch, Erin enjoys relaxing at the beach with her beloved dog. Erin graduated with President’s Distinguished Honors from Chamberlain University, earning her Bachelor of Science in Nursing. She is currently pursuing her Master of Science in Nursing with a concentration as a Family Nurse Practitioner (FNP), continuing her mission to broaden her impact in patient care and advocacy.",
      "With a deep-rooted passion for helping others, Erin focuses her nursing career on empowering individuals facing addiction and mental health challenges. She is a fierce advocate for equitable care and works to uplift those experiencing social, economic, and healthcare disparities. Erin brings empathy, strength, and dedication to every role she takes on—driven by a desire to be a source of support and hope for those most in need.",
    ],
  },
  {
    slug: "jennifer-penny",
    name: "Jennifer Penny",
    role: "Client Care Coordinator",
    bio: [
      "Jennifer serves as a Client Care Coordinator and is passionate about helping individuals and families navigate the recovery process with compassion, understanding, and personalized support. With several years of experience in the behavioral healthcare field, she is dedicated to ensuring every client feels heard, valued, and supported from their very first interaction. Drawing from both her professional background and personal experience with recovery, Jennifer understands the courage it takes to ask for help.",
      "She is committed to making each client’s experience as seamless, comfortable, and encouraging as possible while advocating for the care that best meets their unique needs. Jennifer believes that every person deserves the opportunity to heal and is honored to be part of each client’s recovery journey. Her goal is to provide exceptional care, build meaningful connections, and help every individual take the next step toward lasting recovery with confidence and hope.",
    ],
  },
  {
    slug: "kate-gulam",
    name: "Kate Gulam",
    role: "Primary Therapist",
    credentials: "MSW",
    image: "/images/team/kate-gulam.jpg",
    bio: [
      "Kate Gulam, MSW, is a Primary Therapist at Seaside Wellness of Palm Beach who is dedicated to helping individuals navigate life's challenges and achieve meaningful, lasting change. Born and raised in Hobe Sound, Florida, Kate has always been passionate about serving her local community and supporting those in need. After earning her Bachelor's degree in Human Services from Palm Beach State College, Kate began her career advocating for children through the Guardian Ad Litem Program. Inspired by the impact of this work, she pursued a clinical path and earned her Master of Social Work from Tulane University. Kate has extensive experience working in high-acuity behavioral health settings, including serving as a therapist in an inpatient psychiatric hospital for children and later within a residential treatment environment.",
      "These experiences have shaped her compassionate, client-centered, and trauma-informed approach to care. She is committed to creating a safe and supportive therapeutic environment where individuals feel empowered to heal, grow, and build healthier lives. At Seaside Wellness of Palm Beach, Kate utilizes evidence-based therapeutic approaches while meeting each client with empathy, respect, and genuine compassion. She is passionate about helping individuals develop insight, resilience, and the tools necessary to support long-term recovery and emotional wellness. Outside of her professional role, Kate enjoys spending time outdoors, traveling, and baking. She has been married to her husband, Craig, for three years, and together they share their home with their beloved dog, Macho Man.",
    ],
  },
  {
    slug: "michael-meagher",
    name: "Michael Meagher",
    role: "Clinical Director",
    credentials: "MSW, LCSW, CAP",
    image: "/images/team/michael-meagher.jpg",
    bio: [
      "Michael Meagher, MSW, LCSW, CAP, is the Clinical Director with more than 13 years of experience in the behavioral health and substance use treatment field. He holds a Master of Social Work from Samford University and is both a Licensed Clinical Social Worker and Certified Addiction Professional in the state of Florida. Michael is also EMDR trained and specializes in co-occurring disorders, trauma-informed care, and addiction treatment. Throughout his career, Michael has worked across multiple levels of care, beginning in recovery support services before advancing into counseling, operations, and executive clinical leadership.",
      "As Clinical Director, he oversees clinical programming, staff supervision, regulatory compliance, utilization review, and multidisciplinary treatment coordination. He is passionate about creating individualized, evidence-based treatment experiences that support long-term recovery and meaningful personal growth.",
    ],
  },
  {
    slug: "shan-raiford",
    name: "Shán Raiford",
    role: "Case Manager",
    image: "/images/team/shan-raiford.jpg",
    bio: [
      "Shán Raiford is a National Certified Recovery Coach (NCRC) and experienced Case Manager with over a decade of service in the addiction treatment field. Since beginning his career in 2013, he has built a reputation for compassionate leadership, ethical practice, and results-driven client advocacy. With a foundation in behavioral health, recovery coaching, and case management, Shán specializes in comprehensive needs assessment, individualized service planning, care coordination, and discharge planning across multiple levels of care.",
      "His systems-level understanding of treatment operations allows him to effectively navigate complex cases while ensuring each client receives structured, person-centered support. Shán’s approach is grounded in accountability, collaboration, and genuine human connection. He believes recovery is not just about sobriety—it is about rebuilding purpose, restoring dignity, and strengthening community. His mission remains simple: empower individuals to transform adversity into growth and create sustainable, meaningful change.",
    ],
  },
  {
    slug: "steve-ryan",
    name: "Steve Ryan",
    role: "Operations Director",
    image: "/images/team/steve-ryan.jpg",
    bio: [
      "Steven Ryan serves as the Director of Operations at Seaside Wellness Palm Beach, where he helps oversee the day-to-day operations of the facility and supports a treatment environment built on structure, accountability, and compassion. Guided by a strong belief in faith, responsibility, and meaningful connection, Steven brings both leadership and lived understanding to his role. Steven’s path into this work is deeply personal. At a pivotal point in his own life, someone stepped in to offer the guidance, structure, and support he needed to begin rebuilding.",
      "That experience continues to shape the way he leads today. He understands that recovery is not a one-time event, but a daily commitment to growth, purpose, and doing the next right thing. In his role, Steven is focused on creating a safe, well-run, and supportive environment where clients can begin treatment with conﬁdence. He is committed to helping both staff and clients stay grounded in the values that support lasting change, while ensuring the facility operates with consistency, care, and professionalism.",
    ],
  },
  {
    slug: "timothy-foley",
    name: "Timothy Foley",
    role: "Program Director",
    image: "/images/team/timothy-foley.jpg",
    bio: [
      "Tim is a dedicated and compassionate Program Director with over seven years of experience in addiction treatment and behavioral health. He has developed and managed evidence-based, patient-centered programs and is skilled at leading multidisciplinary teams to deliver seamless, holistic care. With a strong background in program evaluation and staff development, Tim ensures services are effective, up to date, and tailored to client needs.",
      "He holds a bachelor’s degree in behavioral science and is known for his empathetic leadership style. Under his guidance, the program has achieved higher patient engagement and improved long-term recovery outcomes.",
    ],
  },
];
