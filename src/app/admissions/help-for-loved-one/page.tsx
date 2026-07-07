import type { Metadata } from "next";
import MiscDetailPage, { getMiscMeta } from "@/components/MiscDetailPage";
import { admissionsLinks, bySlug } from "@/data/admissions";

const SLUG = "help-for-loved-one";
const self = bySlug(SLUG);

export const metadata: Metadata = getMiscMeta(
  SLUG,
  "Mental Health & Addiction Help for a Loved One",
  "Worried about someone you love? Learn how to help a loved one struggling with addiction or a mental health condition find compassionate care at Seaside Wellness.",
  `/admissions/${SLUG}`
);

export default function Page() {
  return (
    <MiscDetailPage
      slug={SLUG}
      image={self.image}
      eyebrow="Admissions"
      name="Get Help for a Loved One"
      short="Worried about someone you love? Here's how to support them in finding the right care."
      crumbs={[{ label: "Admissions", href: "/admissions" }, { label: "Help for a Loved One" }]}
      related={admissionsLinks.filter((a) => a.slug !== SLUG)}
      relatedBasePath="/admissions"
      relatedTitle="Admissions"
    />
  );
}
