import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { CardGrid } from "@/components/cards";
import CTASection from "@/components/CTASection";
import { areas, additionalCommunities } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Florida Addiction Treatment Center | Areas We Serve",
  description:
    "Seaside Wellness serves West Palm Beach, Boca Raton, Boynton Beach, Delray Beach, Wellington, and communities across Palm Beach County and South Florida.",
  alternates: { canonical: "/areas-we-serve" },
};

export default function AreasIndex() {
  return (
    <>
      <PageHero
        eyebrow="Areas we serve"
        title="Trusted care, close to home"
        subtitle="Seaside Wellness provides high-quality addiction and mental health treatment to individuals across West Palm Beach and the surrounding South Florida communities."
        image="/wp-content/uploads/2025/08/17-web-or-mls-DJI_0175_6_7_8_9.jpg"
        crumbs={[{ label: "Areas We Serve" }]}
      />

      <section className="py-16 md:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Featured communities"
            title="Serving Palm Beach County & beyond"
            align="left"
            className="mx-0"
          />
          <div className="mt-12">
            <CardGrid items={areas} basePath="/areas-we-serve" />
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Additional communities"
            title="More of South Florida we're proud to serve"
            align="center"
          />
          <div className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-3">
            {additionalCommunities.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-1.5 rounded-full border border-shell bg-white px-4 py-2 text-sm font-medium text-ink-600"
              >
                <MapPin className="size-3.5 text-gold-500" />
                {c}, FL
              </span>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
