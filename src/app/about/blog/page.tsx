import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import ClarionBlog from "@/components/ClarionBlog";

export const metadata: Metadata = {
  title: "Blog — Addiction & Mental Health Resources",
  description:
    "Guidance and insight on addiction, mental health, detox, and recovery from the clinical team at Seaside Wellness in West Palm Beach.",
  alternates: { canonical: "/about/blog" },
};

export default function BlogIndex() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Resources for recovery"
        subtitle="Clinical insight and compassionate guidance on addiction, mental health, and the road to lasting recovery."
        image="/wp-content/uploads/2025/08/70-web-or-mls-0E2A6536.jpg"
        crumbs={[{ label: "About", href: "/about" }, { label: "Blog" }]}
        showCta={false}
      />

      <section className="py-16 md:py-24">
        <div className="container-page">
          <Reveal>
            {/* Post listing is managed and rendered by Clarion. */}
            <ClarionBlog />
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
