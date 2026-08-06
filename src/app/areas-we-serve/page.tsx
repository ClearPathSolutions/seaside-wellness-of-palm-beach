import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { CardGrid } from "@/components/cards";
import CTASection from "@/components/CTASection";
import { areas, additionalCommunities } from "@/data/catalog";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Areas We Serve Across South Florida",
  description:
    "Seaside Wellness serves West Palm Beach, Boca Raton, Boynton Beach, Delray Beach, Wellington, and communities across Palm Beach County and South Florida.",
  ...pageMeta("/areas-we-serve"),
};

export default function AreasIndex() {
  return (
    <>
      <PageHero
        eyebrow="Areas we serve"
        title="Trusted care, close to home"
        subtitle="Seaside Wellness provides high-quality addiction and mental health treatment to individuals across West Palm Beach and the surrounding South Florida communities."
        image="/images/facility/17-web-or-mls-DJI_0175_6_7_8_9.jpg"
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
          {/* showImage={false}: every area was illustrated with a photo of the
              West Palm Beach building, so the Boca Raton, Delray Beach and
              Wellington cards all showed the same property — a false implication
              on pages about other communities. Dropping the images is the honest
              default; restore them per-card only with genuine local photography.
              See VIS-9. */}
          <div className="mt-12">
            <CardGrid items={areas} basePath="/areas-we-serve" showImage={false} />
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
