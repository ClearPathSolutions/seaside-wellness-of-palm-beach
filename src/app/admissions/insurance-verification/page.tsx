import type { Metadata } from "next";
import MiscDetailPage, { getMiscMeta } from "@/components/MiscDetailPage";
import InsuranceVerificationForm from "@/components/InsuranceVerificationForm";
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
      belowContent={
        <div id="verify" className="mt-14 scroll-mt-28 rounded-2xl border border-shell bg-cream p-6 sm:p-8">
          <p className="eyebrow mb-2">Verify your coverage</p>
          <h2 className="mb-2 text-2xl font-medium text-ink sm:text-3xl">
            Confidential insurance verification
          </h2>
          <p className="mb-6 text-ink-600">
            Share a few details and our admissions team will confirm your benefits — usually within
            the same day. There is no cost and no obligation.
          </p>
          <InsuranceVerificationForm />
        </div>
      }
    />
  );
}
