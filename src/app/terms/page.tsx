import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import termsBlocks from "@/data/content/terms.json";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service governing your access to and use of the Seaside Wellness of Palm Beach website.",
  alternates: { canonical: "/terms" },
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
        image="/wp-content/uploads/2025/08/26-web-or-mls-0E2A6316.jpg"
        crumbs={[{ label: "Terms of Service" }]}
        showCta={false}
      />

      <section className="py-16 md:py-24">
        <div className="container-page mx-auto max-w-3xl">
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
