import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { CardGrid } from "@/components/cards";
import CTASection from "@/components/CTASection";
import { substances, mentalHealth } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Substance Use & Conditions We Treat",
  description:
    "Seaside Wellness treats a wide range of substance use disorders and mental health conditions with personalized, evidence-based care in West Palm Beach.",
  alternates: { canonical: "/what-we-treat" },
};

export default function WhatWeTreatIndex() {
  return (
    <>
      <PageHero
        eyebrow="What we treat"
        title="Comprehensive treatment for addiction & mental health"
        subtitle="We provide personalized, evidence-based care for substance use disorders and mental health conditions — including co-occurring dual diagnosis."
        image="/wp-content/uploads/2025/08/48-web-or-mls-0E2A6426-1.jpg"
        crumbs={[{ label: "What We Treat" }]}
      />

      <section className="py-16 md:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Substance addiction"
            title="Substance use disorders we treat"
            text="Evidence-based addiction treatment, from safe medical detox through residential care and relapse prevention."
            align="left"
            className="mx-0"
          />
          <div className="mt-12">
            <CardGrid items={substances} basePath="/what-we-treat" />
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Mental health"
            title="Mental health conditions we treat"
            text="Compassionate, professional care for emotional, behavioral, and psychiatric challenges."
            align="left"
            className="mx-0"
          />
          <div className="mt-12">
            <CardGrid items={mentalHealth} basePath="/what-we-treat" />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
