import type { Metadata } from "next";
import MiscDetailPage, { getMiscMeta } from "@/components/MiscDetailPage";
import { admissionsLinks, bySlug } from "@/data/admissions";

const SLUG = "insurance-verification";
const self = bySlug(SLUG);

export const metadata: Metadata = getMiscMeta(
  SLUG,
  "Insurance Verification for Rehab",
  "Verify your insurance for treatment at Seaside Wellness. We work directly with most major PPO plans to confirm your coverage quickly and confidentially.",
  `/admissions/${SLUG}`
);

export default function Page() {
  return (
    <MiscDetailPage
      slug={SLUG}
      image={self.image}
      eyebrow="Admissions"
      name="Insurance Verification"
      short="We work directly with most major PPO insurers to verify your coverage quickly and confidentially."
      crumbs={[{ label: "Admissions", href: "/admissions" }, { label: "Insurance Verification" }]}
      related={admissionsLinks.filter((a) => a.slug !== SLUG)}
      relatedBasePath="/admissions"
      relatedTitle="Admissions"
    />
  );
}
