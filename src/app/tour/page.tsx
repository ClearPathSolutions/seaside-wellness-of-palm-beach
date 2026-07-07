import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import BrandVideo from "@/components/BrandVideo";
import Gallery from "@/components/Gallery";
import CTASection from "@/components/CTASection";
import { miscDetails } from "@/data/details";
import { getMiscMeta } from "@/components/MiscDetailPage";

const SLUG = "tour";

export const metadata: Metadata = getMiscMeta(
  SLUG,
  "Rehab Facility Tour",
  "Take a virtual tour of Seaside Wellness — a modern, luxury addiction and mental health treatment center in West Palm Beach, just steps from the water.",
  "/tour"
);

const VIDEO = "/wp-content/uploads/2026/04/Seaside-Wellness-Brand-Story-Video-V2-VOICEOVER.mp4";

const U = "/wp-content/uploads/2025/08/";
const galleryImages = [
  { src: U + "5-web-or-mls-DJI_0101_2_3_4_5.jpg", alt: "Aerial view of the Seaside Wellness campus" },
  { src: U + "14-web-or-mls-DJI_0160_1_2_3_4.jpg", alt: "Aerial view of the property and coastline" },
  { src: U + "17-web-or-mls-DJI_0175_6_7_8_9.jpg", alt: "Aerial view of the grounds near the water" },
  { src: U + "26-web-or-mls-0E2A6316.jpg", alt: "Welcoming entryway" },
  { src: U + "34-web-or-mls-0E2A6356.jpg", alt: "Bright interior living space" },
  { src: U + "36-web-or-mls-0E2A6366.jpg", alt: "Comfortable seating area" },
  { src: U + "43-web-or-mls-0E2A6401.jpg", alt: "Interior detail" },
  { src: U + "47-web-or-mls-0E2A6421.jpg", alt: "Living space with natural light" },
  { src: U + "48-web-or-mls-0E2A6426-1.jpg", alt: "Private suite interior" },
  { src: U + "56-web-or-mls-0E2A6466-1.jpg", alt: "Outdoor lounge area" },
  { src: U + "62-web-or-mls-0E2A6496.jpg", alt: "Shared gathering space" },
  { src: U + "67-web-or-mls-0E2A6521.jpg", alt: "Comfortable common area" },
  { src: U + "68-web-or-mls-0E2A6526.jpg", alt: "Common space with natural light" },
  { src: U + "70-web-or-mls-0E2A6536.jpg", alt: "Dining and shared area" },
  { src: U + "73-web-or-mls-0E2A6551.jpg", alt: "Restful interior" },
  { src: U + "77-web-or-mls-0E2A6571.jpg", alt: "Therapy and consultation room" },
  { src: U + "83-web-or-mls-0E2A6601.jpg", alt: "Quiet corner for reflection" },
  { src: U + "87-web-or-mls-0E2A6621.jpg", alt: "Bedroom retreat" },
  { src: U + "89-web-or-mls-0E2A6631.jpg", alt: "Lounge and gathering space" },
  { src: U + "91-web-or-mls-0E2A6641.jpg", alt: "Restful bedroom" },
  { src: U + "98-web-or-mls-0E2A6676.jpg", alt: "Bright, calming interior" },
  { src: U + "100-web-or-mls-0E2A6686.jpg", alt: "Outdoor space by the water" },
];

export default function TourPage() {
  const detail = miscDetails.get(SLUG);
  const intro = detail?.intro ?? [
    "Experience Seaside Wellness through a virtual tour of our modern, luxury treatment center — just steps from the water and minutes from downtown West Palm Beach.",
  ];

  return (
    <>
      <PageHero
        eyebrow="Tour the facility"
        title="Tour our luxury West Palm Beach rehab"
        subtitle="A calm, private, coastal environment designed to make recovery feel less like treatment and more like healing."
        image="/wp-content/uploads/2025/08/15-web-or-mls-DJI_0165_6_7_8_9.jpg"
        crumbs={[{ label: "Tour" }]}
      />

      <section className="py-16 md:py-24">
        <div className="container-page">
          <Reveal className="mx-auto mb-12 max-w-3xl text-center">
            {intro.map((p, i) => (
              <p key={i} className={i === 0 ? "text-xl leading-relaxed text-ink" : "mt-4 text-lg text-ink-600"}>
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal>
            <div className="mx-auto max-w-4xl">
              <BrandVideo src={VIDEO} poster="/wp-content/uploads/2025/08/17-web-or-mls-DJI_0175_6_7_8_9.jpg" label="Watch the Seaside Wellness story" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-24">
        <div className="container-page">
          <SectionHeading eyebrow="Gallery" title="Inside Seaside Wellness" />
          <div className="mt-12">
            <Gallery images={galleryImages} />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
