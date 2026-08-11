"use client";

import { useState } from "react";
import { ExternalLink, MapPin } from "lucide-react";
import { site } from "@/lib/site";

/**
 * Click-to-load map.
 *
 * The Google Maps iframe used to load on page arrival. That put Google cookies
 * on the one page where prospective patients type health information into a
 * form — which HHS OCR guidance on online tracking technologies for covered
 * entities makes a decision to take deliberately, not to inherit from an embed.
 *
 * So nothing third-party loads until someone asks for it. Until then the panel
 * shows the address and a plain link out to Google Maps, which is what most
 * people actually want (directions on their own device) and which sets no
 * cookies here at all.
 *
 * Deliberately not a fake map image: rendering a real static map would need the
 * Static Maps API, and a decorative graphic pretending to be a map is worse than
 * an honest address card.
 */
export default function MapEmbed({ query }: { query: string }) {
  const [loaded, setLoaded] = useState(false);
  const embedSrc = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;

  if (loaded) {
    return (
      <div className="overflow-hidden rounded-2xl border border-shell">
        <iframe
          src={embedSrc}
          title={`Map to ${site.legalName}`}
          width="100%"
          height="260"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block"
        />
      </div>
    );
  }

  // No address repeated here — the consumer renders it adjacent.
  return (
    <div className="rounded-2xl border border-shell bg-cream p-6">
      <p className="flex items-center gap-2 text-sm font-semibold text-ink">
        <MapPin className="size-4 shrink-0 text-gold-600" /> Directions
      </p>
      <div className="mt-4 flex flex-wrap gap-2.5">
        <a
          href={site.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-ocean-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ocean-600"
        >
          Open in Google Maps <ExternalLink className="size-3.5" />
        </a>
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="inline-flex items-center rounded-full border border-ink-300 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-gold-500 hover:text-gold-700"
        >
          Show map here
        </button>
      </div>
      <p className="mt-3 text-xs text-ink-600">
        The embedded map loads from Google and sets Google cookies, so we only load it if
        you ask for it.
      </p>
    </div>
  );
}
