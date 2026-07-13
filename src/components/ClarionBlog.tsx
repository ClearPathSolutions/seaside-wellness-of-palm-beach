"use client";

import { useEffect } from "react";
import { CLARION_API, CLARION_BLOG_EMBED_SRC, CLARION_SITE_KEY } from "@/lib/clarion";

/**
 * Renders Clarion's hosted blog into a `[data-clarion-blog]` container.
 *
 * Clarion's blog-embed script scans the DOM once when it loads (no
 * MutationObserver), so a `next/script` loaded a single time per session would
 * not re-render the list when the user navigates back to this page client-side.
 * We instead attach a fresh script element on every mount — the container is
 * already in the DOM by the time this effect runs, so the script finds it and
 * renders — and remove the tag on unmount to keep the document clean.
 */
export default function ClarionBlog() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = CLARION_BLOG_EMBED_SRC;
    script.async = true;
    script.dataset.siteKey = CLARION_SITE_KEY;
    script.dataset.api = CLARION_API;
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  // Blog posts render inside this element (managed by Clarion).
  return <div data-clarion-blog />;
}
