import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import privacyBlocks from "@/data/content/privacy.json";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Notice of Privacy Practices for Seaside Wellness of Palm Beach — how your protected health information may be used and disclosed, and your rights regarding it.",
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: true },
};

type Block =
  | { tag: "h2" | "h3" | "p"; text: string }
  | { tag: "ul"; items: string[] };

export default function PrivacyPolicy() {
  const blocks = privacyBlocks as Block[];
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="Our Notice of Privacy Practices — how your protected health information is used and disclosed, and your rights regarding it."
        image="/wp-content/uploads/2025/08/26-web-or-mls-0E2A6316.jpg"
        crumbs={[{ label: "Privacy Policy" }]}
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
