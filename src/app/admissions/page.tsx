import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, HeartHandshake, ShieldCheck, User, Users } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { Button } from "@/components/Button";
import CTASection from "@/components/CTASection";
import { admissionsSteps } from "@/data/site-content";

export const metadata: Metadata = {
  title: "Rehab & Mental Health Admissions",
  description:
    "Starting treatment at Seaside Wellness is simple and confidential. Learn about our admissions process, insurance verification, and how to get help today.",
  alternates: { canonical: "/admissions" },
};

const paths = [
  { href: "/admissions/admissions-process", icon: ArrowRight, title: "Admissions Process", text: "A clear, step-by-step look at what to expect from first call to admission day." },
  { href: "/admissions/insurance-verification", icon: ShieldCheck, title: "Verify Insurance", text: "Confidentially confirm your coverage — most major PPO plans accepted." },
  { href: "/admissions/help-for-yourself", icon: User, title: "Help for Yourself", text: "Taking the first step for your own recovery takes courage. We'll guide you." },
  { href: "/admissions/help-for-loved-one", icon: Users, title: "Help for a Loved One", text: "Worried about someone you love? Learn how to help them find care." },
];

export default function AdmissionsHub() {
  return (
    <>
      <PageHero
        eyebrow="Admissions"
        title="Getting started is simple"
        subtitle="Reaching out is the hardest part. From your first call, our admissions team handles the details so you can focus on healing."
        image="/wp-content/uploads/2025/08/70-web-or-mls-0E2A6536.jpg"
        crumbs={[{ label: "Admissions" }]}
      />

      {/* Steps */}
      <section className="py-16 md:py-24">
        <div className="container-page">
          <SectionHeading eyebrow="Four easy steps" title="Admissions made simple" />
          <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {admissionsSteps.map((s, i) => (
              <Reveal key={s.step} delay={i * 70} as="li">
                <div className="h-full rounded-2xl border border-shell bg-cream p-7">
                  <span className="font-display text-5xl text-gold-300">{s.step}</span>
                  <h3 className="mt-3 text-lg font-semibold text-ink">{s.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-600">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Paths */}
      <section className="bg-cream py-16 md:py-24">
        <div className="container-page">
          <SectionHeading eyebrow="How can we help?" title="Choose your path" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {paths.map((p, i) => (
              <Reveal key={p.href} delay={i * 60}>
                <Link href={p.href} className="group flex h-full items-start gap-5 rounded-2xl bg-white p-7 shadow-[var(--shadow-soft)] ring-1 ring-shell transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-gold-50 text-gold-600">
                    <p.icon className="size-6" />
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-1.5 text-xl font-semibold text-ink">{p.title}</span>
                    <span className="mt-1.5 block text-[0.95rem] leading-relaxed text-ink-600">{p.text}</span>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700">
                      Learn more <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Button href="/contact" size="lg" variant="secondary">
              <HeartHandshake className="size-5" /> Request a Confidential Callback
            </Button>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
