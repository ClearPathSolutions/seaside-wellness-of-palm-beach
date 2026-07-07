import type { Metadata } from "next";
import MiscDetailPage, { getMiscMeta } from "@/components/MiscDetailPage";
import { admissionsLinks, bySlug } from "@/data/admissions";

const SLUG = "help-for-yourself";
const self = bySlug(SLUG);

export const metadata: Metadata = getMiscMeta(
  SLUG,
  "Get Addiction & Mental Health Help for Yourself",
  "Taking the first step toward your own recovery takes courage. Learn how Seaside Wellness makes getting help simple, confidential, and supportive.",
  `/admissions/${SLUG}`
);

export default function Page() {
  return (
    <MiscDetailPage
      slug={SLUG}
      image={self.image}
      eyebrow="Admissions"
      name="Get Help for Yourself"
      short="Taking the first step for your own recovery takes courage — and you don't have to do it alone."
      crumbs={[{ label: "Admissions", href: "/admissions" }, { label: "Help for Yourself" }]}
      related={admissionsLinks.filter((a) => a.slug !== SLUG)}
      relatedBasePath="/admissions"
      relatedTitle="Admissions"
    />
  );
}
