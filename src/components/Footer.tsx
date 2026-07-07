import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "./SocialIcons";
import { site } from "@/lib/site";

const columns: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Treatment",
    links: [
      { label: "Alcohol & Drug Detox", href: "/treatment/detox" },
      { label: "Substance Abuse Residential", href: "/treatment/substance-abuse-residential" },
      { label: "Mental Health Residential", href: "/treatment/mental-health-residential" },
      { label: "Dual Diagnosis", href: "/treatment/dual-diagnosis" },
      { label: "Aftercare", href: "/treatment/aftercare" },
    ],
  },
  {
    heading: "What We Treat",
    links: [
      { label: "Alcohol Addiction", href: "/what-we-treat/alcohol-addiction" },
      { label: "Opioid Addiction", href: "/what-we-treat/opioid-addiction" },
      { label: "Anxiety", href: "/what-we-treat/anxiety" },
      { label: "Depression", href: "/what-we-treat/depression" },
      { label: "PTSD", href: "/what-we-treat/ptsd" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about/about-us" },
      { label: "Meet the Team", href: "/about/meet-the-team" },
      { label: "Tour the Facility", href: "/tour" },
      { label: "Areas We Serve", href: "/areas-we-serve" },
      { label: "Blog", href: "/about/blog" },
    ],
  },
  {
    heading: "Admissions",
    links: [
      { label: "Admissions Process", href: "/admissions/admissions-process" },
      { label: "Verify Insurance", href: "/admissions/insurance-verification" },
      { label: "Help for Yourself", href: "/admissions/help-for-yourself" },
      { label: "Help for a Loved One", href: "/admissions/help-for-loved-one" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-cream/80">
      {/* Crisis note */}
      <div className="bg-ocean-700 text-cream text-center text-sm py-2.5 px-4">
        In a crisis? Call or text <a href="tel:988" className="font-semibold underline underline-offset-2">988</a> (Suicide &amp; Crisis Lifeline) — free, confidential, 24/7.
      </div>

      <div className="container-page py-14 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_2.7fr]">
          {/* Brand */}
          <div>
            <div className="inline-block rounded-xl bg-cream px-4 py-3">
              <Image
                src={site.logo}
                alt={`${site.legalName} logo`}
                width={1997}
                height={800}
                className="h-10 w-auto"
              />
            </div>
            <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-cream/70">
              A luxury addiction &amp; mental health treatment center in West Palm Beach,
              Florida — delivering evidence-based care just steps from the water.
            </p>
            <div className="mt-6 space-y-2.5 text-[0.95rem]">
              <a href={site.phoneHref} className="flex items-center gap-3 hover:text-gold-300 transition-colors">
                <Phone className="size-4 text-gold-400 shrink-0" /> {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:text-gold-300 transition-colors">
                <Mail className="size-4 text-gold-400 shrink-0" /> {site.email}
              </a>
              <p className="flex items-start gap-3">
                <MapPin className="size-4 text-gold-400 shrink-0 mt-1" /> {site.address.full}
              </p>
            </div>
            <div className="mt-6 flex items-center gap-3">
              {[
                { Icon: FacebookIcon, href: site.socials.facebook, label: "Facebook" },
                { Icon: InstagramIcon, href: site.socials.instagram, label: "Instagram" },
                { Icon: LinkedinIcon, href: site.socials.linkedin, label: "LinkedIn" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-full border border-cream/20 text-cream/80 hover:border-gold-400 hover:text-gold-300 transition-colors"
                >
                  <Icon className="size-[18px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((col) => (
              <nav key={col.heading} aria-label={col.heading}>
                <p className="eyebrow mb-3 text-gold-400/90">{col.heading}</p>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-[0.9rem] text-cream/70 hover:text-gold-300 transition-colors"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Accreditations */}
        <div className="mt-12 flex flex-wrap items-center gap-6 border-t border-cream/10 pt-8">
          <span className="eyebrow text-cream/70">Accredited &amp; Certified</span>
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex h-14 items-center rounded-lg bg-white/95 px-3">
              <Image src="/wp-content/uploads/2026/04/Joint-Commission.png" alt="Joint Commission accredited" width={150} height={150} loading="eager" className="h-10 w-auto" />
            </div>
            <div className="flex h-14 items-center rounded-lg bg-white/95 px-3">
              <Image src="/wp-content/uploads/2026/04/legitscript-seaside.png" alt="LegitScript certified" width={292} height={314} loading="eager" className="h-10 w-auto" />
            </div>
            <div className="flex h-14 items-center rounded-lg bg-white/95 px-3">
              <Image src="/wp-content/uploads/2026/04/NAMI_logo.gif" alt="NAMI member" width={200} height={100} loading="eager" className="h-8 w-auto" unoptimized />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-cream/70 md:flex-row md:items-center md:justify-between">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>© {year} {site.legalName}. All rights reserved.</span>
            <Link href="/privacy-policy" className="hover:text-gold-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gold-300 transition-colors">
              Terms of Service
            </Link>
          </p>
          <p className="max-w-2xl md:text-right">
            Seaside Wellness provides medical care for informational purposes; this site is not a
            substitute for professional medical advice, diagnosis, or treatment.
          </p>
        </div>
      </div>
    </footer>
  );
}
