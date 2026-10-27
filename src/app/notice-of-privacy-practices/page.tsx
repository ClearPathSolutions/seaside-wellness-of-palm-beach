import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { legalPageBody } from "@/lib/legalPages";

const title = `Notice of Privacy Practices | ${site.legalName}`;
const description = `How ${site.legalName} may use and disclose your protected health information, and your rights regarding it.`;
const base = pageMeta("/notice-of-privacy-practices");

export const metadata: Metadata = {
  // Absolute: the root layout's "%s | Seaside Wellness" template would double the brand.
  title: { absolute: title },
  description,
  ...base,
  openGraph: { ...base.openGraph, title, description },
  robots: { index: true, follow: true },
};

export default function NoticeOfPrivacyPractices() {
  const html = legalPageBody("notice-of-privacy-practices");
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Notice of Privacy Practices"
        image="/images/facility/26-web-or-mls-0E2A6316.jpg"
        crumbs={[{ label: "Notice of Privacy Practices" }]}
        showCta={false}
      />

      <section className="py-16 md:py-24">
        <div className="container-page mx-auto max-w-3xl">
          {/* suppressHydrationWarning: CTM rewrites the phone link inside. */}
          <div
            className="prose-seaside"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </section>
    </>
  );
}
