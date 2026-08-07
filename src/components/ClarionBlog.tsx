"use client";

import { useEffect, useRef, useState } from "react";
import { CLARION_API, CLARION_BLOG_EMBED_SRC, CLARION_SITE_KEY } from "@/lib/clarion";

/**
 * Renders Clarion's hosted blog into a `[data-clarion-blog]` container, with
 * Clarion as the primary blog source.
 *
 * Clarion's blog-embed script scans the DOM once when it loads (no
 * MutationObserver), so a `next/script` loaded a single time per session would
 * not re-render the list when the user navigates back to this page client-side.
 * We instead attach a fresh script element on every mount — the container is
 * already in the DOM by the time this effect runs, so the script finds it and
 * renders — and remove the tag on unmount to keep the document clean.
 *
 * `fallback` is shown until Clarion renders content into its container (i.e.
 * while the embed is not yet live or has no posts). This keeps the previously
 * authored posts visible during the migration to Clarion and hands over
 * automatically once Clarion becomes the source of truth. The fallback is
 * server-rendered, so it is present in the initial HTML for SEO.
 */
export default function ClarionBlog({ fallback }: { fallback?: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [clarionRendered, setClarionRendered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Hand over to Clarion as soon as it renders anything into its container.
    const check = () => {
      if (container.childElementCount > 0) setClarionRendered(true);
    };
    check();
    const observer = new MutationObserver(check);
    observer.observe(container, { childList: true });

    const script = document.createElement("script");
    script.src = CLARION_BLOG_EMBED_SRC;
    script.async = true;
    script.dataset.siteKey = CLARION_SITE_KEY;
    script.dataset.api = CLARION_API;
    document.body.appendChild(script);

    return () => {
      observer.disconnect();
      script.remove();
    };
  }, []);

  return (
    <>
      {/* Clarion renders posts into this element once its embed is live. */}
      <div data-clarion-blog ref={containerRef} />
      {fallback && !clarionRendered ? fallback : null}
    </>
  );
}
