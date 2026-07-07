import type { Metadata } from "next";
import { site } from "@/lib/site";

/**
 * Returns a title that avoids doubling the brand. The root layout applies the
 * template "%s | Seaside Wellness"; if a page's own title already contains the
 * brand, return it as an absolute title to bypass the template.
 */
export function smartTitle(title: string): Metadata["title"] {
  return /seaside/i.test(title) ? { absolute: title } : title;
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
    telephone: site.phone,
    email: site.email,
    logo: `${site.url}${site.logo}`,
    image: `${site.url}${site.logo}`,
    priceRange: "$$$",
    medicalSpecialty: ["Addiction", "Psychiatric"],
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: "US",
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
      ...(c.href ? { item: `${site.url}${c.href}` } : {}),
    })),
  };
}
