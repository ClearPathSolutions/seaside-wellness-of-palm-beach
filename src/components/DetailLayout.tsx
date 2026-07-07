import Link from "next/link";
import { ArrowRight, Phone, ShieldCheck } from "lucide-react";
import type { DetailContent, DetailSection, CatalogItem } from "@/data/types";
import { site } from "@/lib/site";
import PageHero, { type Crumb } from "./PageHero";
import Faq from "./Faq";
import CTASection from "./CTASection";
import Reveal from "./Reveal";

function SectionBody({ s, id }: { s: DetailSection; id: string }) {
  return (
    <section
      id={id}
      className="scroll-mt-28 border-t border-shell/70 pt-8 first:border-0 first:pt-0"
    >
      {s.heading && <h2>{s.heading}</h2>}
      {s.paragraphs?.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
      {s.bullets && s.bullets.length > 0 && (
        <ul>
          {s.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

/** Jump-link map for long articles — keeps all content but makes it scannable. */
function OnThisPage({
  sections,
  hasFaqs,
}: {
  sections: DetailSection[];
  hasFaqs: boolean;
}) {
  const items = sections
    .map((s, i) => ({ heading: s.heading, id: `section-${i}` }))
    .filter((x) => x.heading);
  if (items.length < 3) return null;
  return (
    <nav
      aria-label="On this page"
      className="my-10 rounded-2xl border border-shell bg-cream p-6"
    >
      <p className="eyebrow mb-4">In this guide</p>
      <ol className="grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
        {items.map((x, i) => (
          <li key={x.id}>
            <a
              href={`#${x.id}`}
              className="group flex items-baseline gap-2.5 text-[0.95rem] leading-snug text-ink-600 transition-colors hover:text-gold-800"
            >
              <span className="font-display text-base text-gold-600">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="underline-offset-2 group-hover:underline">{x.heading}</span>
            </a>
          </li>
        ))}
        {hasFaqs && (
          <li>
            <a
              href="#faqs"
              className="group flex items-baseline gap-2.5 text-[0.95rem] leading-snug text-ink-600 transition-colors hover:text-gold-800"
            >
              <span className="font-display text-base text-gold-600">
                {String(items.length + 1).padStart(2, "0")}
              </span>
              <span className="underline-offset-2 group-hover:underline">
                Frequently asked questions
              </span>
            </a>
          </li>
        )}
      </ol>
    </nav>
  );
}

export default function DetailLayout({
  detail,
  fallback,
  crumbs,
  eyebrow,
  related,
  relatedBasePath,
  relatedTitle,
}: {
  detail?: DetailContent;
  fallback: CatalogItem;
  crumbs: Crumb[];
  eyebrow: string;
  related?: CatalogItem[];
  relatedBasePath?: string;
  relatedTitle?: string;
}) {
  const heading = detail?.heading ?? fallback.name;
  const heroSubtitle = detail?.heroSubtitle ?? fallback.short;
  const intro = detail?.intro ?? [fallback.short];
  const sections = detail?.sections ?? [];
  const faqs = detail?.faqs ?? [];

  const faqJsonLd =
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
        eyebrow={eyebrow}
        title={heading}
        subtitle={heroSubtitle}
        image={fallback.image}
        imageAlt={fallback.name}
        crumbs={crumbs}
      />

      <section className="py-16 md:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-16">
          {/* Body */}
          <Reveal className="min-w-0">
            <div className="prose-seaside max-w-none">
              {intro.map((p, i) => (
                <p key={i} className={i === 0 ? "text-xl leading-relaxed text-ink" : undefined}>
                  {p}
                </p>
              ))}
            </div>

            <OnThisPage sections={sections} hasFaqs={faqs.length > 0} />

            {sections.length > 0 && (
              <div className="prose-seaside max-w-none">
                {sections.map((s, i) => (
                  <SectionBody key={i} s={s} id={`section-${i}`} />
                ))}
              </div>
            )}

            {faqs.length > 0 && (
              <div id="faqs" className="mt-14 scroll-mt-28">
                <h2 className="mb-6 text-2xl font-medium text-ink sm:text-3xl">
                  Frequently asked questions
                </h2>
                <Faq items={faqs} />
              </div>
            )}
          </Reveal>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-28 lg:h-fit space-y-6">
            <div className="rounded-2xl bg-ink p-7 text-white">
              <p className="eyebrow text-gold-300">Speak with our team</p>
              <p className="mt-3 font-display text-2xl leading-tight text-white">
                Confidential help is one call away
              </p>
              <p className="mt-2 text-sm text-cream/75">
                24/7 admissions · most PPO plans accepted · no obligation.
              </p>
              <a
                href={site.phoneHref}
                className="mt-5 flex items-center justify-center gap-2 rounded-full bg-gold-700 px-5 py-3.5 font-semibold text-white transition-colors hover:bg-gold-800"
              >
                <Phone className="size-4" /> {site.phone}
              </a>
              <Link
                href="/admissions/insurance-verification"
                className="mt-2.5 flex items-center justify-center gap-2 rounded-full border border-white/25 px-5 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                <ShieldCheck className="size-4" /> Verify Insurance
              </Link>
            </div>

            {related && related.length > 0 && relatedBasePath && (
              <div className="rounded-2xl border border-shell bg-cream p-6">
                <p className="eyebrow mb-4">{relatedTitle ?? "Related"}</p>
                <ul className="space-y-1">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link
                        href={`${relatedBasePath}/${r.slug}`}
                        className="group flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-[0.95rem] text-ink-700 transition-colors hover:bg-white hover:text-gold-800"
                      >
                        {r.name}
                        <ArrowRight className="size-4 text-ink-300 transition-transform group-hover:translate-x-0.5 group-hover:text-gold-600" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>

      <CTASection />

      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
    </>
  );
}
