// Client helper for submitting forms to Clarion Labs.
//
// Clarion's forms-capture script only auto-wires `form[data-clarion-form]`
// elements, and it scans the DOM once (no MutationObserver), so React forms
// that mount after it are never picked up — a native submit would just reload
// the page. We therefore submit explicitly from our own onSubmit handler and
// control the confirmation UI ourselves.
//
// ⚠️ Do NOT add `data-clarion-form` to ContactForm or InsuranceVerificationForm.
// The vendor script does not check `defaultPrevented`, so an auto-wired form
// plus the explicit submit below would send every lead to Clarion twice.

import { clarionAttribution } from "@/lib/attribution";

export const CLARION_SITE_KEY = "cpx_W7CkbBVZenGnvDbFYEKkZnvZSS7ynFh6";
export const CLARION_API = "https://api.clarionlabs.ai";

// Clarion's hosted blog embed. It renders posts into a `[data-clarion-blog]`
// element and, like the forms-capture script, scans the DOM once on load — so
// the container must already exist when it runs. See ClarionBlog for how we
// (re-)attach it on mount to survive client-side navigation.
export const CLARION_BLOG_EMBED_SRC =
  "https://www.clarionlabs.ai/blog-embed.v1.js";

/**
 * Submit a form's data to Clarion under the given form key.
 * Throws if the submission fails so callers can surface an error state.
 *
 * This posts directly rather than delegating to `window.ClarionForms.submit()`,
 * which was the previous path. That API accepts only `{form_key, data}` and
 * fills in the attribution itself — reading utm/gclid from `location.search`
 * at submit time, which is precisely the campaign-loss bug (see
 * lib/attribution.ts). Delegating to it would overwrite the persisted campaign
 * with whatever is in the address bar, which on a form page is nothing.
 *
 * Posting ourselves also removes the dependency on the vendor script having
 * loaded at all: the old fallback path fired whenever the script was slow or
 * ad-blocked and sent no attribution whatsoever — not the campaign, not the
 * landing page, not the CTM session id.
 *
 * Same origin, same endpoint, same payload shape as the vendor script, so this
 * carries no new CORS exposure — only better values.
 */
export async function submitToClarion(
  formKey: string,
  data: Record<string, unknown>
): Promise<void> {
  const res = await fetch(`${CLARION_API}/forms/public/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // keepalive: the insurance form unmounts into its confirmation state as
    // soon as this resolves, and a lead must survive the page being left.
    keepalive: true,
    body: JSON.stringify({
      site_key: CLARION_SITE_KEY,
      form_key: formKey,
      data,
      ...clarionAttribution(),
    }),
  });

  if (!res.ok) {
    throw new Error(`Clarion submission failed (${res.status})`);
  }
}
