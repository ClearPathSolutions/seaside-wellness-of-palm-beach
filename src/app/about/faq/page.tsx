import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Faq from "@/components/Faq";
import CTASection from "@/components/CTASection";
import { miscDetails } from "@/data/details";
import { getMiscMeta } from "@/components/MiscDetailPage";

const SLUG = "faq";

export const metadata: Metadata = getMiscMeta(
  SLUG,
  "Addiction and Mental Health FAQ",
  "Answers to common questions about addiction, mental health, treatment programs, admissions, and insurance at Seaside Wellness in West Palm Beach.",
  "/about/faq"
);

export default function FaqPage() {
  const detail = miscDetails.get(SLUG);
  const faqs = detail?.faqs ?? [];

  const jsonLd =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  return (
    <>
      <PageHero
        eyebrow="Frequently asked questions"
        title="Answers to help you decide"
        subtitle="Common questions about our programs, admissions, insurance, and what recovery at Seaside Wellness looks like."
        image="/wp-content/uploads/2025/08/77-web-or-mls-0E2A6571.jpg"
        crumbs={[{ label: "About", href: "/about" }, { label: "FAQ" }]}
        showCta={false}
      />

      <section className="py-16 md:py-24">
        <div className="container-page mx-auto max-w-3xl">
          {faqs.length > 0 ? (
            <Faq items={faqs} />
          ) : (
            <p className="text-center text-ink-500">FAQ content is being prepared.</p>
          )}
        </div>
      </section>

      <CTASection />

      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
    </>
  );
}
