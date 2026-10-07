import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import { site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import {
  editorial,
  editorialPolicyBody,
  editorialPolicyReady,
  editorialPolicyServed,
  EDITORIAL_POLICY_PATH,
  EDITORIAL_POLICY_URL,
} from "@/lib/editorial";

const title = `Editorial Policy | ${editorial.facilityName}`;
// The package template's meta description, merge fields filled.
const description = `How ${editorial.facilityName} researches, writes, clinically reviews and updates the health information on ${editorial.domain}.`;

const base = pageMeta(EDITORIAL_POLICY_PATH);

export const metadata: Metadata = {
  // Absolute: the package specifies the full facility name, which the root
  // layout's "%s | Seaside Wellness" template would otherwise double.
  title: { absolute: title },
  description,
  ...base,
  openGraph: { ...base.openGraph, title, description },
  // Indexable only once ready; review builds (local / preview) stay noindex.
  robots: editorialPolicyReady ? { index: true, follow: true } : { index: false, follow: false },
};

export default function EditorialPolicyPage() {
  // Production withholds the policy until it is filled in and signed off.
  if (!editorialPolicyServed) notFound();
  const html = editorialPolicyBody();

  return (
    <>
      <PageHero
        eyebrow="About"
        title="Editorial Policy"
        image="/images/facility/26-web-or-mls-0E2A6316.jpg"
        crumbs={[{ label: "About", href: "/about" }, { label: "Editorial Policy" }]}
        showCta={false}
      />
      {/* editorial-policy-dev-package/schema/editorial-policy-page.jsonld.
          isPartOf is omitted: this site has no WebSite node to reference. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": `${EDITORIAL_POLICY_URL}#webpage`,
            url: EDITORIAL_POLICY_URL,
            name: "Editorial Policy",
            description,
            about: { "@id": `${site.url}/#organization` },
            ...(editorial.lastReviewed ? { lastReviewed: editorial.lastReviewed } : {}),
            inLanguage: "en-US",
          }),
        }}
      />

      <section className="py-16 md:py-24">
        <div className="container-page mx-auto max-w-3xl">
          {/* The body is the package template's own <article class="editorial-policy">.
              suppressHydrationWarning: CTM rewrites the phone link inside. */}
          <div
            className="prose-seaside"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </section>

      <CTASection />
    </>
  );
}
