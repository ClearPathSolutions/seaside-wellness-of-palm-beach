import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import BrandVideo from "@/components/BrandVideo";
import Gallery from "@/components/Gallery";
import CTASection from "@/components/CTASection";
import { miscDetails } from "@/data/details";
import { getMiscMeta } from "@/components/MiscDetailPage";
import { brandFilmTranscript } from "@/data/brand-film";
import { reelTranscript } from "@/data/reel";

const SLUG = "tour";

export const metadata: Metadata = getMiscMeta(
  SLUG,
  "Rehab Facility Tour",
  "Take a virtual tour of Seaside Wellness — a modern, luxury addiction and mental health treatment center in West Palm Beach, just steps from the water.",
  "/tour"
);

const VIDEO = "/video/seaside-brand-film.mp4";
const REEL = "/video/seaside-reel.mp4";
const REEL_POSTER = "/images/seaside-reel-poster.jpg";

const galleryImages = [
  { src: "/images/facility/5-web-or-mls-DJI_0101_2_3_4_5.jpg", alt: "Aerial view of the Seaside Wellness campus" },
  { src: "/images/facility/14-web-or-mls-DJI_0160_1_2_3_4.jpg", alt: "Aerial view of the property and coastline" },
  { src: "/images/facility/17-web-or-mls-DJI_0175_6_7_8_9.jpg", alt: "Aerial view of the grounds near the water" },
  { src: "/images/facility/26-web-or-mls-0E2A6316.jpg", alt: "Welcoming entryway" },
  { src: "/images/facility/34-web-or-mls-0E2A6356.jpg", alt: "Bright interior living space" },
  { src: "/images/facility/36-web-or-mls-0E2A6366.jpg", alt: "Comfortable seating area" },
  { src: "/images/facility/43-web-or-mls-0E2A6401.jpg", alt: "Interior detail" },
  { src: "/images/facility/47-web-or-mls-0E2A6421.jpg", alt: "Living space with natural light" },
  { src: "/images/facility/48-web-or-mls-0E2A6426-1.jpg", alt: "Private suite interior" },
  { src: "/images/facility/56-web-or-mls-0E2A6466-1.jpg", alt: "Outdoor lounge area" },
  { src: "/images/facility/62-web-or-mls-0E2A6496.jpg", alt: "Shared gathering space" },
  { src: "/images/facility/67-web-or-mls-0E2A6521.jpg", alt: "Comfortable common area" },
  { src: "/images/facility/68-web-or-mls-0E2A6526.jpg", alt: "Common space with natural light" },
  { src: "/images/facility/70-web-or-mls-0E2A6536.jpg", alt: "Dining and shared area" },
  { src: "/images/facility/73-web-or-mls-0E2A6551.jpg", alt: "Restful interior" },
  { src: "/images/facility/77-web-or-mls-0E2A6571.jpg", alt: "Therapy and consultation room" },
  { src: "/images/facility/83-web-or-mls-0E2A6601.jpg", alt: "Quiet corner for reflection" },
  { src: "/images/facility/87-web-or-mls-0E2A6621.jpg", alt: "Bedroom retreat" },
  { src: "/images/facility/89-web-or-mls-0E2A6631.jpg", alt: "Lounge and gathering space" },
  { src: "/images/facility/91-web-or-mls-0E2A6641.jpg", alt: "Restful bedroom" },
  { src: "/images/facility/98-web-or-mls-0E2A6676.jpg", alt: "Bright, calming interior" },
  { src: "/images/facility/100-web-or-mls-0E2A6686.jpg", alt: "Outdoor space by the water" },
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
        image="/images/facility/15-web-or-mls-DJI_0165_6_7_8_9.jpg"
        crumbs={[{ label: "Tour" }]}
      />

      <section className="py-16 md:py-24">
        <div className="container-page">
          <Reveal className="mx-auto mb-12 max-w-3xl text-center">
            {intro.map((p, i) => (
              <p key={i} className={i === 0 ? "text-lg leading-relaxed text-ink-600" : "mt-4 text-lg text-ink-600"}>
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal>
            <div className="mx-auto max-w-4xl">
              <BrandVideo
                src={VIDEO}
                poster="/images/facility/17-web-or-mls-DJI_0175_6_7_8_9.jpg"
                label="Watch the Seaside Wellness story"
                captionsSrc="/video/seaside-brand-film.en.vtt"
                captionsLabel="English (on-screen text)"
                transcript={brandFilmTranscript}
                transcriptLabel="Read the on-screen text"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Vertical social reel — filmed on site */}
      <section className="bg-ink py-16 text-white md:py-24">
        <div className="container-page grid items-center gap-12 lg:grid-cols-[1fr_22rem] lg:gap-16">
          <Reveal>
            <p className="eyebrow mb-4 text-gold-300">A minute on campus</p>
            <h2 className="text-3xl font-medium text-white sm:text-4xl">
              See the place, not just the plan
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-cream/80">
              A short film shot on site — the grounds and the coastline, the private suites and
              shared spaces, and the clinical work that happens between them. Sound on.
            </p>
          </Reveal>
          <Reveal delay={120} className="mx-auto w-full max-w-[22rem]">
            <BrandVideo
              src={REEL}
              poster={REEL_POSTER}
              aspect="portrait"
              sizes="(max-width: 1024px) 90vw, 352px"
              label="Watch a minute on campus at Seaside Wellness"
              // Transcript but deliberately no captionsSrc — the reel contains an
              // on-camera interview the text cards don't cover. See data/reel.ts.
              transcript={reelTranscript}
              transcriptLabel="Read the on-screen text"
            />
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
