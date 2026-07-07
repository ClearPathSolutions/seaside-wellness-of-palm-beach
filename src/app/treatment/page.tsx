import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { CardGrid } from "@/components/cards";
import CTASection from "@/components/CTASection";
import { programs, therapies } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Addiction & Mental Health Treatment Programs",
  description:
    "Explore Seaside Wellness treatment programs — medical detox, residential inpatient, dual diagnosis, aftercare, and individual, group & family therapy in West Palm Beach.",
  alternates: { canonical: "/treatment" },
};

export default function TreatmentIndex() {
  return (
    <>
      <PageHero
        eyebrow="Treatment"
        title="Evidence-based programs, one campus"
        subtitle="A full continuum of care — from medically supervised detox to residential treatment and aftercare — delivered by a licensed clinical team."
        image="/wp-content/uploads/2025/08/67-web-or-mls-0E2A6521.jpg"
        crumbs={[{ label: "Treatment" }]}
      />

      <section className="py-16 md:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Programs"
            title="Levels of care"
            text="Every program is personalized to your needs and delivered in a calm, private, coastal setting."
            align="left"
            className="mx-0"
          />
          <div className="mt-12">
            <CardGrid items={programs} basePath="/treatment" />
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Therapies"
            title="Clinical modalities"
            text="Proven therapies woven through every level of care to address the root causes of addiction and mental health conditions."
            align="left"
            className="mx-0"
          />
          <div className="mt-12">
            <CardGrid items={therapies} basePath="/treatment" />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
