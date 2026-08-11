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

/** Stable anchor id from a topic name. */
function slugifyTopic(name: string): string {
  return name.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function FaqPage() {
  const detail = miscDetails.get(SLUG);
  const faqs = detail?.faqs ?? [];

  // Preserve authoring order rather than sorting — the source set is already
  // sequenced from "what do you treat" through to "what does it cost", which is
  // the order a prospective client actually asks in.
  const groups: [string, typeof faqs][] = [];
  for (const f of faqs) {
    const key = f.category ?? "Frequently asked questions";
    const existing = groups.find(([name]) => name === key);
    if (existing) existing[1].push(f);
    else groups.push([key, [f]]);
  }

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
        image="/images/facility/77-web-or-mls-0E2A6571.jpg"
        crumbs={[{ label: "About", href: "/about" }, { label: "FAQ" }]}
        showCta={false}
      />

      <section className="py-16 md:py-24">
        <div className="container-page mx-auto max-w-3xl">
          {faqs.length === 0 && (
            <p className="text-center text-ink-500">FAQ content is being prepared.</p>
          )}

          {/* Grouped by topic. 39 questions in one flat accordion was
              unscannable, and the page had no h2 structure at all — the group
              headings give it both. The JSON-LD below stays flat, which is what
              FAQPage expects. See VIS-6. */}
          {groups.length > 0 && (
            <nav aria-label="FAQ topics" className="mb-12 rounded-2xl border border-shell bg-cream p-6">
              <p className="eyebrow mb-4">Jump to a topic</p>
              <ol className="grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                {groups.map(([name, items], i) => (
                  <li key={name}>
                    <a
                      href={`#${slugifyTopic(name)}`}
                      className="group flex items-baseline gap-2.5 text-[0.95rem] leading-snug text-ink-600 transition-colors hover:text-gold-800"
                    >
                      <span className="font-display text-base text-gold-600">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="underline-offset-2 group-hover:underline">
                        {name}{" "}
                        <span className="text-ink-600">({items.length})</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <div className="space-y-12">
            {groups.map(([name, items], i) => (
              <section key={name} id={slugifyTopic(name)} className="scroll-mt-28">
                <h2 className="mb-5 text-2xl font-medium text-ink sm:text-3xl">{name}</h2>
                <Faq items={items} defaultOpen={i === 0 ? 0 : null} />
              </section>
            ))}
          </div>
        </div>
      </section>

      <CTASection />

      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
    </>
  );
}
