import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { legalPageBody } from "@/lib/legalPages";

const title = `Terms of Service | ${site.legalName}`;
const description = `Terms of Service governing your access to and use of the ${site.legalName} website.`;
const base = pageMeta("/terms-of-service");

export const metadata: Metadata = {
  // Absolute: the root layout's "%s | Seaside Wellness" template would double the brand.
  title: { absolute: title },
  description,
  ...base,
  openGraph: { ...base.openGraph, title, description },
  robots: { index: true, follow: true },
};

export default function TermsOfService() {
  const html = legalPageBody("terms-of-service");
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        image="/images/facility/26-web-or-mls-0E2A6316.jpg"
        crumbs={[{ label: "Terms of Service" }]}
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
