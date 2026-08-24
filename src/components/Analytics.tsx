import Script from "next/script";
import { isPreview } from "@/lib/deployment";

/** Google Tag Manager container. */
const GTM_ID = "GTM-NJH47VRC";

/*
 * NOTE: CallTrackingMetrics (264810.tctm.co/t.js) is deliberately NOT here.
 *
 * It is loaded once in app/layout.tsx at `beforeInteractive`, because it
 * rewrites the displayed phone number and deferring it lets a visitor read and
 * dial the untracked one. lib/attribution.ts then reads `__ctm.config.sid` to
 * attach each lead to that CTM visit.
 *
 * Do not add a second copy — including via a GTM tag. Two copies double-count
 * sessions and make the number swap unpredictable.
 */

/**
 * Google Tag Manager, production deployments only.
 *
 * Gated on `isPreview` for a practical reason as much as a tidy one: branch
 * previews answer 200 for all 81 URLs, so an ungated tag would file preview
 * traffic and any test form fill as real conversions in GTM and CTM. Local
 * `next start` counts as production (VERCEL_ENV is unset), which keeps the tags
 * testable without deploying.
 *
 * `afterInteractive` is deliberate. GTM does not need to run before hydration,
 * and `beforeInteractive` would put a blocking third-party fetch ahead of our
 * own JS on a site whose main conversion path is a phone number.
 */
export default function Analytics() {
  if (isPreview) return null;

  return (
    <>
      <Script id="gtm-init" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>
    </>
  );
}

/**
 * GTM's `<noscript>` fallback.
 *
 * Separate from the component above because it belongs immediately inside
 * `<body>`, while the tag itself is better placed at the end of the tree.
 */
export function AnalyticsNoScript() {
  if (isPreview) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
