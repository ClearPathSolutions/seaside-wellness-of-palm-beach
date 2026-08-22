// First-touch campaign attribution for lead submissions.
//
// THE BUG THIS FIXES
// Clarion's forms-capture.v1.js builds every submission's `utm` and `gclid`
// from a live `new URLSearchParams(location.search)` read at submit time. A
// visitor who lands on an ad and reads even one more page before converting
// therefore submits with the campaign already gone, and the lead files as
// direct traffic. It fails silently: the lead still arrives, the CRM record
// still looks populated, and the only visible symptom is paid spend that
// appears to convert at zero. We persist the campaign on the first pageview
// instead and send it explicitly.
//
// WHY NOT RESTORE THE CAMPAIGN INTO THE URL
// The other way to fix this is an inline shim that writes the saved params
// back into location.search so the vendor script finds them where it already
// looks. That is the simpler patch, and it is the wrong one *here*: it stamps
// `gclid` onto internal URLs like /programs/alcohol-detox/, joining an
// advertising click identifier to a path that discloses what someone is
// seeking treatment for. HHS OCR's guidance on online tracking technologies
// treats exactly that combination as PHI for a covered entity — the concern
// already logged against this site in LEGAL-REVIEW.md (SW-010). Sending the
// fields explicitly keeps the campaign out of the address bar entirely.

/**
 * localStorage rather than sessionStorage: a second tab is the same visit, and
 * CTM's own attribution window is 30 days. sessionStorage would drop the
 * campaign the moment someone opens the insurance form in a new tab.
 */
export const FIRST_TOUCH_KEY = "campaign.first_touch.v1";
export const FIRST_TOUCH_TTL_MS = 30 * 24 * 60 * 60 * 1000;

/**
 * `wbraid` and `gbraid` are Google's gclid substitutes under iOS ATT and
 * consent mode. The vendor script never collects them at all, so those clicks
 * are attributable in CTM (whose routing rules key on both) and invisible in
 * Clarion.
 */
export const CAMPAIGN_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "msclkid",
] as const;

type FirstTouch = {
  /** Raw campaign params exactly as they appeared in the entry URL. */
  p: Record<string, string>;
  /** The real entry page, campaign and all. */
  landing: string;
  /** External referrer only; "" when the visit started off-site or direct. */
  referrer: string;
  at: number;
};

/**
 * Runs as a blocking inline script at the top of <body>, before hydration and
 * before forms-capture.v1.js.
 *
 * It must be an inline script rather than a React effect: a visitor can land
 * on `/?gclid=…`, click an internal link, and be gone before React hydrates.
 * A full document load is also the only way campaign params ever arrive (an ad
 * click is never a client-side navigation), which is why there is no
 * route-change tracker to go with this — this runs on exactly the loads that
 * can carry a campaign.
 */
export const FIRST_TOUCH_CAPTURE_JS = `(function(){try{
var K=${JSON.stringify(FIRST_TOUCH_KEY)},T=${FIRST_TOUCH_TTL_MS},N=${JSON.stringify(CAMPAIGN_PARAMS)};
var q=new URLSearchParams(location.search),f={},i,v;
for(i=0;i<N.length;i++){v=q.get(N[i]);if(v)f[N[i]]=v;}
var s=null;try{var r=localStorage.getItem(K);s=r?JSON.parse(r):null;}catch(e){}
if(s&&(typeof s.at!=="number"||Date.now()-s.at>=T))s=null;
/* A fresh click always wins: that is a new campaign, not a continuation. */
if(!Object.keys(f).length&&s)return;
var d=document.referrer||"";
try{localStorage.setItem(K,JSON.stringify({p:f,landing:location.href,referrer:d&&d.indexOf(location.origin)!==0?d:"",at:Date.now()}));}catch(e){}
}catch(e){}})();`;

function readFirstTouch(): FirstTouch | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(FIRST_TOUCH_KEY);
    const v = raw ? (JSON.parse(raw) as FirstTouch) : null;
    if (!v || typeof v.at !== "number" || Date.now() - v.at >= FIRST_TOUCH_TTL_MS) return null;
    return v;
  } catch {
    return null;
  }
}

declare global {
  interface Window {
    __ctm?: { config?: { sid?: unknown; aid?: unknown } };
  }
}

/** CTM session ids are 24 hex characters with no dashes. A UUID is not one. */
const CTM_ID = /^[0-9a-f]{24}$/i;

/**
 * The CallTrackingMetrics visitor session id, which is what lets CTM attach a
 * forwarded lead to the visit (and therefore the ad click) that produced it.
 *
 * Read from `__ctm.config.sid`, falling back to the `__ctmid` first-party
 * cookie — t.js reconciles the two on load, and the cookie survives a full
 * page load and a second tab. Deliberately NOT cached in sessionStorage the
 * way the vendor script does it: CTM already persists this for 30 days, so a
 * local copy can only ever be staler.
 *
 * Returns null rather than a wrong-shaped value. Filing a lead against no
 * visit is recoverable; filing it against the wrong id is not, and this site
 * posts straight to Clarion with no server-side reader to catch a bad one.
 */
export function ctmSessionId(): string | null {
  if (typeof window === "undefined") return null;

  let sid = "";
  let vid = "";
  try {
    const raw = window.__ctm?.config?.sid;
    if (typeof raw === "string" || typeof raw === "number") sid = String(raw);
  } catch {
    /* __ctm absent — t.js blocked or not yet loaded */
  }
  try {
    const m = document.cookie.match(/(?:^|;\s*)__ctmid=([^;]*)/);
    if (m) vid = decodeURIComponent(m[1]);
  } catch {
    /* cookies unavailable */
  }

  if (CTM_ID.test(sid)) return sid;
  if (CTM_ID.test(vid)) return vid;
  if (sid || vid) {
    console.warn(
      "[attribution] CTM id present but not CTM-shaped — sending null rather than attaching the lead to the wrong visit."
    );
  }
  return null;
}

/** The top-level attribution fields Clarion reads, in the shape it expects. */
export type ClarionAttribution = {
  page_url: string;
  landing_page_url: string;
  referrer: string | null;
  utm: Record<string, string> | null;
  gclid: string | null;
  ctm_visitor_sid: string | null;
  user_agent: string;
};

/**
 * Build the attribution half of a Clarion submission.
 *
 * Key names and nesting mirror what forms-capture.v1.js sends, deliberately:
 * `ctm_visitor_sid` must be flat and top-level (Clarion's parser does not look
 * inside a nested object for it), and no key is invented, because an unknown
 * field on a strict validator would turn every lead into an error. Only the
 * values are better than the vendor's.
 */
export function clarionAttribution(): ClarionAttribution {
  const ft = readFirstTouch();
  const p = ft?.p ?? {};

  const utm: Record<string, string> = {};
  for (const k of ["source", "medium", "campaign", "term", "content"]) {
    const v = p[`utm_${k}`];
    if (v) utm[k] = v;
  }

  return {
    page_url: window.location.href,
    landing_page_url: ft?.landing || window.location.href,
    referrer: ft?.referrer || null,
    utm: Object.keys(utm).length ? utm : null,
    // Clarion has one click-id field. wbraid/gbraid are gclid's stand-ins, so
    // they ride in it rather than in a key Clarion has not agreed to accept.
    gclid: p.gclid || p.wbraid || p.gbraid || null,
    ctm_visitor_sid: ctmSessionId(),
    user_agent: window.navigator.userAgent,
  };
}
