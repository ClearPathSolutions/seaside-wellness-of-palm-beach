import type { Metadata } from "next";
import { Cormorant_Garamond, Karla } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { site } from "@/lib/site";
import { organizationJsonLd } from "@/lib/seo";
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
  description: site.description,
  applicationName: site.legalName,
  keywords: [
    "West Palm Beach rehab",
    "addiction treatment Florida",
    "mental health treatment",
    "luxury detox Palm Beach",
    "dual diagnosis treatment",
    "residential inpatient rehab",
  ],
  openGraph: {
    type: "website",
    siteName: site.legalName,
    title: "West Palm Beach Rehab & Mental Health Center | Seaside Wellness",
    description: site.description,
    url: site.url,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
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
        {/* Swap the no-js marker before paint so scroll-reveal animations run
            only when JS is available; without JS, revealed content stays visible. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.remove('no-js');document.documentElement.classList.add('js');",
          }}
        />
        <a href="#main" className="skip-link">Skip to content</a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <Header />
        <main id="main" className="flex-1">{children}</main>
        <Footer />

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

        {/* Clarion Labs — form capture. afterInteractive so it is present to
            hook the [data-clarion-form] forms once the page hydrates. */}
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
