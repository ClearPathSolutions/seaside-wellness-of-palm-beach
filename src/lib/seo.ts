import type { Metadata } from "next";
import { site } from "@/lib/site";
import { ogImage } from "@/lib/og";
import { canonicalPath } from "@/lib/routing";
import { areas } from "@/data/catalog";

/**
 * Returns a title that avoids doubling the brand. The root layout applies the
 * template "%s | Seaside Wellness"; if a page's own title already contains the
 * brand, return it as an absolute title to bypass the template.
 */
export function smartTitle(title: string): Metadata["title"] {
  return /seaside/i.test(title) ? { absolute: title } : title;
}

/** Longest meta description Google reliably renders before truncating. */
export const META_DESCRIPTION_MAX = 155;

/**
 * Truncates at the last word boundary at or before `max`, appending an ellipsis.
 * A raw `.slice()` cuts mid-word, which is how the team bios ended up rendering
 * descriptions like "…a strong " in the SERP.
 */
export function truncate(text: string, max: number): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (max <= 0) return "";
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  const base = lastSpace > 0 ? cut.slice(0, lastSpace) : cut;
  // Drop any dangling punctuation so we don't produce ",…" or ".…".
  return base.replace(/[\s,;:.\-–—]+$/, "") + "…";
}

/**
 * Builds a meta description from a fixed prefix plus body copy, keeping the
 * whole string within `META_DESCRIPTION_MAX` and never cutting mid-word.
 */
export function metaDescription(prefix: string, body: string): string {
  const room = META_DESCRIPTION_MAX - prefix.length;
  return room <= 0 ? truncate(prefix, META_DESCRIPTION_MAX) : prefix + truncate(body, room);
}

/**
 * Route-invariant Open Graph fields.
 *
 * Next merges `metadata` objects **shallowly**, so a page that declares its own
 * `openGraph` replaces the parent's block wholesale rather than merging into it.
 * Any page setting `openGraph` must therefore spread this in, or `og:site_name`
 * and `og:locale` are silently dropped from that page's output.
 */
export const ogBase: NonNullable<Metadata["openGraph"]> = {
  siteName: site.legalName,
  locale: "en_US",
  // Restated deliberately — see the note in lib/og.ts. Pages with their own
  // artwork (blog posts) set `images` after spreading this, which wins.
  images: [ogImage()],
};

/**
 * Canonical URL + matching `og:url` from a single path, with the shared Open
 * Graph fields preserved. Keeps the two from drifting apart, which is how the
 * homepage's `og:url` ended up on every page.
 *
 * Relative paths resolve against `metadataBase` (set in the root layout).
 */
export function pageMeta(path: string): Pick<Metadata, "alternates" | "openGraph"> {
  // Normalised through canonicalPath so the canonical and og:url always match
  // the URL Next actually serves. `trailingSlash` governs routing only — it does
  // not rewrite these strings, so without this they would silently disagree.
  const url = canonicalPath(path);
  return {
    alternates: { canonical: url },
    openGraph: { ...ogBase, type: "website", url },
  };
}

/** Sitewide organization structured data for local / health SEO. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["MedicalClinic", "LocalBusiness"],
    "@id": `${site.url}/#organization`,
    name: site.legalName,
    alternateName: site.name,
    description: site.description,
    url: site.url,
    // E.164 — the format Google expects for structured data.
    telephone: site.phoneHref.replace("tel:", ""),
    email: site.email,
    logo: `${site.url}${site.logo}`,
    image: `${site.url}${site.logo}`,
    priceRange: "$$$",
    medicalSpecialty: ["Addiction", "Psychiatric"],
    // From the facility master data. Stated explicitly so institutional tenure
    // can't be inferred loosely — the parent network (Quadrant Health Group)
    // dates to 2020, this facility to 2025. See FAC-3.
    foundingDate: "2025",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: "US",
    },
    hasMap: site.mapUrl,
    // Mirrors the "Areas we serve" catalog so the served market is machine-readable.
    areaServed: areas.map((a) => ({
      "@type": "AdministrativeArea",
      name: a.name,
    })),
    // Admissions is staffed around the clock — the same claim the site makes in
    // the header utility bar and on /contact.
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    sameAs: [site.socials.facebook, site.socials.instagram, site.socials.linkedin],
  };
}

/** BreadcrumbList structured data from a crumb trail. */
export function breadcrumbJsonLd(crumbs: { label: string; href?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${site.url}${canonicalPath(c.href)}` } : {}),
    })),
  };
}
