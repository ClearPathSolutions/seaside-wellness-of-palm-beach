import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/seo";
import { Button } from "./Button";

export type Crumb = { label: string; href?: string };

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image: string;
  imageAlt?: string;
  crumbs?: Crumb[];
  showCta?: boolean;
};

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt = "",
  crumbs = [],
  showCta = true,
}: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-55"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/55 to-ink/85" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/70 to-transparent" />

      <div className="container-page relative py-20 md:py-28 lg:py-32">
        {crumbs.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(
                breadcrumbJsonLd([{ label: "Home", href: "/" }, ...crumbs])
              ),
            }}
          />
        )}
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-cream/70">
              <li>
                <Link href="/" className="hover:text-gold-300 transition-colors">Home</Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.label} className="flex items-center gap-1.5">
                  <ChevronRight className="size-3.5 text-cream/40" />
                  {c.href ? (
                    <Link href={c.href} className="hover:text-gold-300 transition-colors">{c.label}</Link>
                  ) : (
                    <span className="text-cream">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {eyebrow && <p className="eyebrow text-gold-400 mb-4">{eyebrow}</p>}
        <h1 className="max-w-4xl text-4xl font-medium leading-[1.05] text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 max-w-2xl text-lg text-cream/85 leading-relaxed">{subtitle}</p>
        )}

        {showCta && (
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href={site.phoneHref} size="lg" variant="primary">
              <Phone className="size-4" /> Call {site.phone}
            </Button>
            <Button href="/admissions/insurance-verification" size="lg" variant="onDark">
              Verify Your Insurance
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
