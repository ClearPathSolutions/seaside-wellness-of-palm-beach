import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import { team } from "@/data/team";

export const metadata: Metadata = {
  title: "Meet the Team",
  description:
    "Meet the licensed clinical and medical team at Seaside Wellness in West Palm Beach — experienced professionals dedicated to compassionate, evidence-based care.",
  alternates: { canonical: "/about/meet-the-team" },
};

export default function MeetTheTeam() {
  return (
    <>
      <PageHero
        eyebrow="Our team"
        title="Meet the team"
        subtitle="Experienced, licensed, and genuinely compassionate — the people who will walk beside you through every step of recovery."
        image="/wp-content/uploads/2025/08/68-web-or-mls-0E2A6526.jpg"
        crumbs={[{ label: "About", href: "/about" }, { label: "Meet the Team" }]}
      />

      <section className="py-16 md:py-24">
        <div className="container-page">
          <div className="flex flex-wrap justify-center gap-8">
            {team.map((m, i) => (
              <Reveal key={m.slug} delay={(i % 3) * 60} className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.334rem)]">
                <Link
                  href={`/about/${m.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-soft)] ring-1 ring-shell transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-shell">
                    <Image src={m.image} alt={m.name} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-ink">{m.name}</h3>
                    <p className="mt-0.5 font-medium text-gold-700">{m.role}</p>
                    {m.credentials && <p className="mt-0.5 text-sm text-ink-500">{m.credentials}</p>}
                    <p className="mt-3 line-clamp-3 text-[0.95rem] leading-relaxed text-ink-600">{m.bio[0]}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700">
                      Read bio <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
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
