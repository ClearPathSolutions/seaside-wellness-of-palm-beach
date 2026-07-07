import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import { posts } from "@/data/posts";

export const metadata: Metadata = {
  title: "Blog — Addiction & Mental Health Resources",
  description:
    "Guidance and insight on addiction, mental health, detox, and recovery from the clinical team at Seaside Wellness in West Palm Beach.",
  alternates: { canonical: "/about/blog" },
};

function fmtDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogIndex() {
  const [featured, ...rest] = posts;
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
          {/* Featured */}
          <Reveal>
            <Link
              href={`/${featured.slug}`}
              className="group grid overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-soft)] ring-1 ring-shell transition-shadow hover:shadow-[var(--shadow-lift)] lg:grid-cols-2"
            >
              <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto">
                <Image src={featured.image} alt={featured.title} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex flex-col justify-center p-8 lg:p-12">
                <div className="flex items-center gap-3 text-sm">
                  <span className="eyebrow text-gold-600">{featured.category}</span>
                  <span className="text-ink-400">·</span>
                  <span className="text-ink-500">{featured.readingMinutes} min read</span>
                </div>
                <h2 className="mt-3 text-2xl font-medium text-ink sm:text-3xl">{featured.title}</h2>
                <p className="mt-4 leading-relaxed text-ink-600">{featured.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 font-semibold text-gold-700">
                  Read article <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>

          {/* Grid */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={i * 40}>
                <Link
                  href={`/${p.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-soft)] ring-1 ring-shell transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={p.image} alt={p.title} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="eyebrow text-gold-600">{p.category}</span>
                      <span className="text-ink-400">·</span>
                      <span className="text-ink-500">{p.readingMinutes} min</span>
                    </div>
                    <h3 className="mt-2 text-lg font-semibold leading-snug text-ink">{p.title}</h3>
                    <p className="mt-2 flex-1 text-[0.9rem] leading-relaxed text-ink-600">{p.excerpt}</p>
                    <span className="mt-4 text-xs text-ink-400">{fmtDate(p.date)}</span>
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
