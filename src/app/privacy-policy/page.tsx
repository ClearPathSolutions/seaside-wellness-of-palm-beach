import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { legalPageBody } from "@/lib/legalPages";

const title = `Privacy Policy | ${site.legalName}`;
const description = `How ${site.legalName} collects, uses, discloses, and protects information you provide through our website and when you contact us.`;
const base = pageMeta("/privacy-policy");

export const metadata: Metadata = {
  // Absolute: the root layout's "%s | Seaside Wellness" template would double the brand.
  title: { absolute: title },
  description,
  ...base,
  openGraph: { ...base.openGraph, title, description },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicy() {
  const html = legalPageBody("privacy-policy");
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        image="/images/facility/26-web-or-mls-0E2A6316.jpg"
        crumbs={[{ label: "Privacy Policy" }]}
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
