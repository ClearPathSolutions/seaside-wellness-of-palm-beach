import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import termsBlocks from "@/data/content/terms.json";
import { formatLegalDate, termsRevised } from "@/data/legal";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service governing your access to and use of the Seaside Wellness of Palm Beach website.",
  ...pageMeta("/terms"),
  robots: { index: true, follow: true },
};

type Block =
  | { tag: "h2" | "h3" | "p"; text: string }
  | { tag: "ul"; items: string[] };

export default function Terms() {
  const blocks = termsBlocks as Block[];
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        subtitle="The terms that govern your access to and use of this website."
        image="/images/facility/26-web-or-mls-0E2A6316.jpg"
        crumbs={[{ label: "Terms of Service" }]}
        showCta={false}
      />

      <section className="py-16 md:py-24">
        <div className="container-page mx-auto max-w-3xl">
          {/* The Terms promise to publish this ("we will also indicate at the top
              of this page the date that revisions were last made") — it was missing. */}
          <p className="mb-8 text-sm text-ink-500">
            Last revised {formatLegalDate(termsRevised)}
          </p>
          <div className="prose-seaside">
            {blocks.map((b, i) => {
              if (b.tag === "ul") {
                return (
                  <ul key={i}>
                    {b.items.map((it, j) => (
                      <li key={j}>{it}</li>
                    ))}
                  </ul>
                );
              }
              if (b.tag === "h2") return <h2 key={i}>{b.text}</h2>;
              if (b.tag === "h3") return <h3 key={i}>{b.text}</h3>;
              return <p key={i}>{b.text}</p>;
            })}
          </div>
        </div>
      </section>
    </>
  );
}
