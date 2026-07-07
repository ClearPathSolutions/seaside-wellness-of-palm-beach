import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Seaside Wellness | West Palm Beach Rehab Center",
  description:
    "Contact Seaside Wellness in West Palm Beach for confidential, 24/7 help with addiction and mental health treatment. Call (855) 416-5648 or send a message.",
  alternates: { canonical: "/contact" },
};

const mapSrc =
  "https://www.google.com/maps?q=106+Blossom+Ln,+West+Palm+Beach,+FL+33404&output=embed";

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Reach out — we're here 24/7"
        subtitle="Whether you're ready to start or just have questions, our admissions team is available around the clock for a confidential, no-obligation conversation."
        image="/wp-content/uploads/2025/08/26-web-or-mls-0E2A6316.jpg"
        crumbs={[{ label: "Contact" }]}
        showCta={false}
      />

      <section className="py-16 md:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          {/* Form */}
          <Reveal>
            <h2 className="text-2xl font-medium text-ink sm:text-3xl">Send a confidential message</h2>
            <p className="mt-2 text-ink-600">
              Fill out the form and a member of our team will reach out shortly.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </Reveal>

          {/* Info */}
          <Reveal delay={100}>
            <div className="space-y-4">
              <div className="rounded-2xl bg-ink p-7 text-white">
                <p className="eyebrow text-gold-300">Speak with us now</p>
                <a href={site.phoneHref} className="mt-2 block font-display text-4xl text-white hover:text-gold-200">
                  {site.phone}
                </a>
                <p className="mt-1 text-sm text-cream/70">Confidential · 24 hours a day, 7 days a week</p>
              </div>

              <ul className="space-y-4 rounded-2xl border border-shell bg-cream p-7">
                <li className="flex items-start gap-4">
                  <Mail className="mt-1 size-5 shrink-0 text-gold-600" />
                  <div>
                    <p className="text-sm font-semibold text-ink">Email</p>
                    <a href={`mailto:${site.email}`} className="text-ink-600 hover:text-gold-700">{site.email}</a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <MapPin className="mt-1 size-5 shrink-0 text-gold-600" />
                  <div>
                    <p className="text-sm font-semibold text-ink">Visit us</p>
                    <p className="text-ink-600">{site.address.full}</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Clock className="mt-1 size-5 shrink-0 text-gold-600" />
                  <div>
                    <p className="text-sm font-semibold text-ink">Admissions hours</p>
                    <p className="text-ink-600">Available 24/7, including weekends & holidays</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Phone className="mt-1 size-5 shrink-0 text-gold-600" />
                  <div>
                    <p className="text-sm font-semibold text-ink">Phone</p>
                    <a href={site.phoneHref} className="text-ink-600 hover:text-gold-700">{site.phone}</a>
                  </div>
                </li>
              </ul>

              <div className="overflow-hidden rounded-2xl border border-shell">
                <iframe
                  src={mapSrc}
                  title="Map to Seaside Wellness"
                  width="100%"
                  height="260"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
