import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Button } from "@/components/Button";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "The story behind Seaside Wellness — a luxury addiction and mental health treatment center in West Palm Beach built on clinical excellence and genuine human connection.",
  alternates: { canonical: "/about/about-us" },
};

export default function OurStory() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title="Built for healing, grounded in expertise"
        subtitle="Seaside Wellness was created to prove that clinical excellence and real human warmth belong in the same place."
        image="/wp-content/uploads/2025/08/5-web-or-mls-DJI_0101_2_3_4_5.jpg"
        crumbs={[{ label: "About", href: "/about" }, { label: "Our Story" }]}
      />

      <section className="py-16 md:py-24">
        <div className="container-page mx-auto max-w-3xl">
          <div className="prose-seaside">
            <p className="text-xl leading-relaxed text-ink">
              Seaside Wellness is a luxury addiction treatment and mental health facility in West
              Palm Beach, Florida, offering high-quality, evidence-based care in a serene coastal
              environment designed for healing.
            </p>
            <p>
              We provide personalized care for individuals facing drug or alcohol addiction, mental
              health disorders, or dual diagnosis. Our programs span the full continuum of care —
              medical detox, residential inpatient treatment for both substance use and mental
              health, dual diagnosis care, and aftercare — all delivered by a licensed clinical
              team under one roof.
            </p>
            <h2>Our philosophy</h2>
            <p>
              We believe recovery is built on two things: clinical excellence and genuine human
              connection. Evidence-based therapies give our clients real, proven tools. A calm,
              private, and dignified environment gives them the space to actually use them.
            </p>
            <p>
              That&rsquo;s why our team treats every person — not just a diagnosis. Whether you&rsquo;re facing
              addiction, a co-occurring condition, or a primary mental health issue, our goal is the
              same: to help you feel safe, understood, and equipped for a healthier life.
            </p>
            <h2>An environment designed for recovery</h2>
            <p>
              Just steps from the water and minutes from downtown West Palm Beach, our facility was
              designed to feel less like an institution and more like a sanctuary. Comfortable,
              modern spaces and a small, personal setting mean no one gets lost in the crowd — and
              every care plan is truly individual.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/about/meet-the-team">Meet the Team <ArrowRight className="size-4" /></Button>
            <Button href="/tour" variant="ghost">Tour the Facility</Button>
          </div>
        </div>
      </section>

      {/* Image band */}
      <section className="pb-16 md:pb-24">
        <div className="container-page grid gap-4 sm:grid-cols-3">
          {[
            "/wp-content/uploads/2025/08/48-web-or-mls-0E2A6426-1.jpg",
            "/wp-content/uploads/2025/08/67-web-or-mls-0E2A6521.jpg",
            "/wp-content/uploads/2025/08/89-web-or-mls-0E2A6631.jpg",
          ].map((src, i) => (
            <Reveal key={src} delay={i * 60}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--shadow-soft)]">
                <Image src={src} alt="Seaside Wellness facility" fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
