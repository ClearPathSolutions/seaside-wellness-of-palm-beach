import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import { Button } from "@/components/Button";
import CTASection from "@/components/CTASection";
import { team } from "@/data/team";
import { differentiators } from "@/data/site-content";

export const metadata: Metadata = {
  title: "About Seaside Wellness | Trusted South Florida Rehab Center",
  description:
    "Learn about Seaside Wellness — a luxury addiction and mental health treatment center in West Palm Beach, Florida, led by an experienced, licensed clinical team.",
  alternates: { canonical: "/about" },
};

export default function AboutHub() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Recovery by the ocean, backed by real clinical expertise"
        subtitle="Seaside Wellness blends a calm, luxury coastal setting with evidence-based care and a team that treats every person — not just a diagnosis."
        image="/wp-content/uploads/2025/08/15-web-or-mls-DJI_0165_6_7_8_9.jpg"
        crumbs={[{ label: "About" }]}
      />

      {/* Mission */}
      <section className="py-16 md:py-24">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="eyebrow mb-4">Our mission</p>
            <h2 className="text-3xl font-medium text-ink sm:text-4xl">
              Professional, compassionate care in a place that feels like healing
            </h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink-600">
              <p>
                At Seaside Wellness, we provide professional, evidence-based treatment for
                addiction, mental health disorders, and co-occurring conditions. Our licensed team
                delivers personalized care in a private, coastal environment designed to help
                clients feel safe, supported, and understood.
              </p>
              <p>
                We believe recovery is built on both clinical excellence and genuine human
                connection — and that everyone deserves a path forward with dignity.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/about/about-us" variant="ghost">Read Our Story</Button>
              <Button href="/tour">Tour the Facility <ArrowRight className="size-4" /></Button>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-[var(--shadow-soft)]">
                <Image src="/wp-content/uploads/2025/08/48-web-or-mls-0E2A6426-1.jpg" alt="Interior at Seaside Wellness" fill sizes="25vw" className="object-cover" />
              </div>
              <div className="relative mt-8 aspect-[3/4] overflow-hidden rounded-2xl shadow-[var(--shadow-soft)]">
                <Image src="/wp-content/uploads/2025/08/89-web-or-mls-0E2A6631.jpg" alt="Common area at Seaside Wellness" fill sizes="25vw" className="object-cover" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="bg-cream py-16 md:py-24">
        <div className="container-page">
          <SectionHeading eyebrow="What sets us apart" title="Why families choose Seaside" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {differentiators.map((d, i) => (
              <Reveal key={d.title} delay={i * 50}>
                <div className="h-full rounded-2xl border border-shell bg-white p-7">
                  <span className="grid size-12 place-items-center rounded-xl bg-gold-50 text-gold-600">
                    <Icon name={d.icon} className="size-6" />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold text-ink">{d.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-600">{d.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team preview */}
      <section className="py-16 md:py-24">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Our team" title="Meet the people behind your care" align="left" className="mx-0" />
            <Link href="/about/meet-the-team" className="hidden font-semibold text-gold-700 hover:text-gold-800 sm:inline-flex sm:items-center sm:gap-1.5">
              Meet the full team <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {team.slice(0, 4).map((m, i) => (
              <Reveal key={m.slug} delay={i * 50}>
                <Link href={`/about/${m.slug}`} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-shell shadow-[var(--shadow-soft)]">
                    <Image src={m.image} alt={m.name} fill sizes="(max-width:768px) 50vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <p className="mt-3 font-semibold text-ink">{m.name}</p>
                  <p className="text-sm text-ink-500">{m.role}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
