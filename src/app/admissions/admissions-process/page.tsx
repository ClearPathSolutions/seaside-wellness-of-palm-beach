import type { Metadata } from "next";
import MiscDetailPage, { getMiscMeta } from "@/components/MiscDetailPage";
import { admissionsLinks, bySlug } from "@/data/admissions";

const SLUG = "admissions-process";
const self = bySlug(SLUG);

export const metadata: Metadata = getMiscMeta(
  SLUG,
  "Addiction & Mental Health Treatment Admissions Process",
  "A clear, step-by-step guide to the Seaside Wellness admissions process — from your first confidential call to admission day.",
  `/admissions/${SLUG}`
);

export default function Page() {
  return (
    <MiscDetailPage
      slug={SLUG}
      image={self.image}
      eyebrow="Admissions"
      name="The Admissions Process"
      short="A clear, step-by-step look at what to expect — from your first call to admission day."
      crumbs={[{ label: "Admissions", href: "/admissions" }, { label: "Admissions Process" }]}
      related={admissionsLinks.filter((a) => a.slug !== SLUG)}
      relatedBasePath="/admissions"
      relatedTitle="Admissions"
    />
  );
}
