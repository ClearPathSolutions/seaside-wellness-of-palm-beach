import type { Metadata } from "next";
import { Cormorant_Garamond, Karla } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { site } from "@/lib/site";
import { organizationJsonLd } from "@/lib/seo";
import { isPreview } from "@/lib/deployment";
import { FIRST_TOUCH_CAPTURE_JS } from "@/lib/attribution";
import Analytics, { AnalyticsNoScript } from "@/components/Analytics";
import SessionTracker from "@/components/SessionTracker";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "West Palm Beach Rehab & Mental Health Center | Seaside Wellness",
    template: "%s | Seaside Wellness",
  },
  description: site.metaDescription,
  applicationName: site.legalName,
  keywords: [
    "West Palm Beach rehab",
    "addiction treatment Florida",
    "mental health treatment",
    "luxury detox Palm Beach",
    "dual diagnosis treatment",
    "residential inpatient rehab",
  ],
  // Only route-invariant fields belong here. Next merges `metadata` shallowly,
  // so any field set on this object is inherited wholesale by every page that
  // doesn't declare its own `openGraph` — pinning title/description/url here
  // made all 56 non-blog pages advertise the homepage. Next derives og:title
  // and og:description from each page's own title/description instead.
  openGraph: {
    type: "website",
    siteName: site.legalName,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  // Preview deployments emit `noindex`. robots.txt already disallows them, but
  // a Disallow only stops crawling — a URL discovered via an external link can
  // still be indexed without being fetched, and only a meta/header directive
  // prevents that. See the note in app/robots.ts (V0018).
  robots: isPreview ? { index: false, follow: false } : { index: true, follow: true },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      // The inline script below swaps `no-js`→`js` on <html> before React
      // hydrates, so the live DOM's className intentionally differs from the
      // server-rendered one. Suppress the resulting attribute mismatch warning
      // for this element only (does not affect its children).
      suppressHydrationWarning
      className={`no-js ${cormorant.variable} ${karla.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white">
        <AnalyticsNoScript />
        {/* Swap the no-js marker before paint so scroll-reveal animations run
            only when JS is available; without JS, revealed content stays visible. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.remove('no-js');document.documentElement.classList.add('js');",
          }}
        />
        {/* Persist the ad campaign on the entry pageview, before anything can
            navigate away from it. Clarion's form capture reads utm/gclid from
            the live URL at submit time, so without this every visitor who
            reads a second page before converting files as direct traffic.
            Inline and blocking on purpose — see lib/attribution.ts. */}
        <script dangerouslySetInnerHTML={{ __html: FIRST_TOUCH_CAPTURE_JS }} />
        <a href="#main" className="skip-link">Skip to content</a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <SessionTracker />
        <Header />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
        <Analytics />

        {/* CallTrackingMetrics (account 264810) — creates the visitor session
            Clarion attaches each lead to, and performs the dynamic phone-number
            swap.

            ⚠️ `async` is deliberate. Do NOT change this to a synchronous or
            `beforeInteractive` tag, and do not "correct" it back to the eager
            load the rollout spec's Section 2 describes — that guidance is wrong
            and reintroduces two silent failures:

              1. A synchronous tag in <head> runs before <body> exists. CTM's
                 number scan defaults its root to document.body and silently
                 no-ops when that is null, so it can miss every number on the
                 page. Nothing swaps, all visitors see the hardcoded number, and
                 CTM can only guess which web session an inbound call belongs
                 to — call attribution then fails intermittently.
              2. On a React site the sync tag rewrites the number before
                 hydration, and React then reverts the swap when it replaces the
                 server-rendered HTML.

            A plain tag rather than next/script: `next/script` injects through
            its own runtime, and what is wanted here is exactly this element in
            the HTML. React hoists an async script to <head> and dedupes it.

            Absolute https, never protocol-relative. Root layout, not a
            per-route include, so campaign landing pages are covered too.

            Exactly one copy. Count with:
              document.querySelectorAll('script[src*="tctm.co/t.js"]').length
            NOT script[src*="tctm.co"] — that returns 2 on a correct install,
            because t.js injects its own p.js. Removing that "extra" breaks CTM. */}
        <script async src="https://264810.tctm.co/t.js"></script>

        {/* Clarion Labs — hosted chat widget. Themed to Seaside's brand via the
            attributes Clarion documents (data-color / data-font / data-position).
            The launcher color uses gold-700 (#326052, the seafoam brand accent);
            finer styling lives in the `.clarion-chat` overrides in globals.css. */}
        <Script
          src="https://www.clarionlabs.ai/widget.v1.js"
          data-site-key="cpx_W7CkbBVZenGnvDbFYEKkZnvZSS7ynFh6"
          data-api="https://api.clarionlabs.ai"
          data-color="#326052"
          data-position="right"
          data-title="Seaside Wellness"
          data-font="var(--font-karla), ui-sans-serif, system-ui, sans-serif"
          strategy="lazyOnload"
        />

        {/* Clarion Labs — form capture. Kept for the integration handshake it
            pings on load; it does NOT carry this site's leads. Neither form
            sets `data-clarion-form`, which is the only thing this script
            auto-wires, and both submit explicitly via lib/clarion.ts so the
            persisted campaign survives. Adding that attribute to either form
            would send every lead twice — the script does not check
            `defaultPrevented`. */}
        <Script
          src="https://www.clarionlabs.ai/forms-capture.v1.js"
          data-site-key="cpx_W7CkbBVZenGnvDbFYEKkZnvZSS7ynFh6"
          data-api="https://api.clarionlabs.ai"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
