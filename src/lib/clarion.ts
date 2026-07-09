// Client helper for submitting forms to Clarion Labs.
//
// Clarion's forms-capture script only scans the DOM once (no MutationObserver),
// so React forms that mount after it are never auto-wired — a native submit
// would just reload the page. We therefore submit explicitly from our own
// onSubmit handler using the documented `window.ClarionForms.submit()` API,
// falling back to a direct POST if the script has not loaded yet. Either way
// the submit is captured and we control the confirmation UI ourselves.

export const CLARION_SITE_KEY = "cpx_W7CkbBVZenGnvDbFYEKkZnvZSS7ynFh6";
export const CLARION_API = "https://api.clarionlabs.ai";

type ClarionForms = {
  submit: (args: { form_key: string; data: Record<string, unknown> }) => Promise<unknown>;
  scan?: () => void;
};

declare global {
  interface Window {
    ClarionForms?: ClarionForms;
  }
}

/**
 * Submit a form's data to Clarion under the given form key.
 * Throws if the submission fails so callers can surface an error state.
 */
export async function submitToClarion(
  formKey: string,
  data: Record<string, unknown>
): Promise<void> {
  // Preferred path: the loaded widget's documented API.
  if (typeof window !== "undefined" && window.ClarionForms?.submit) {
    await window.ClarionForms.submit({ form_key: formKey, data });
    return;
  }

  // Fallback: post directly to Clarion's public submit endpoint. Mirrors the
  // body shape the forms-capture script sends, so submissions still land if
  // the script is slow to load or blocked.
  const res = await fetch(`${CLARION_API}/forms/public/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      site_key: CLARION_SITE_KEY,
      form_key: formKey,
      data,
      page_url: typeof window !== "undefined" ? window.location.href : "",
      referrer: typeof document !== "undefined" ? document.referrer : "",
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent : "",
    }),
  });

  if (!res.ok) {
    throw new Error(`Clarion submission failed (${res.status})`);
  }
}
