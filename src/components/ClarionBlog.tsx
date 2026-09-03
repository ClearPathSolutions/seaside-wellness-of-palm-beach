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
/**
 * Give a post's headings the `id`s its own Table of Contents already links to.
 *
 * Clarion renders each post with a "Table of Contents" list of `<a href="#slug">`
 * entries, but emits no `id` on any heading — so every entry is a dead link.
 * Clicking one sets the hash, the browser finds no target, and the page simply
 * does not move. Measured on the live post
 * `is-drug-rehab-in-west-palm-beach-covered-by-insurance`: 12 in-page links,
 * 20 headings, 0 ids.
 *
 * Rather than guessing Clarion's slug format, we work from the links it
 * actually wrote: slugify each heading, and if a link is looking for that slug,
 * put it on that heading. Anything we cannot match is left untouched — a
 * heading with no id is a link that does nothing, which is where we started,
 * whereas a heading with the wrong id scrolls people to the wrong section.
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function linkUpHeadings(container: HTMLElement): void {
  const headings = Array.from(
    container.querySelectorAll<HTMLElement>("h1, h2, h3, h4")
  );
  if (headings.length === 0) return;

  // First heading wins a duplicated slug, matching how a reader would expect
  // the first occurrence to be the one linked.
  const bySlug = new Map<string, HTMLElement>();
  for (const h of headings) {
    const slug = slugify(h.textContent ?? "");
    if (slug && !bySlug.has(slug)) bySlug.set(slug, h);
  }

  const links = container.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
  for (const a of Array.from(links)) {
    const raw = (a.getAttribute("href") ?? "").slice(1);
    if (!raw) continue;
    let wanted = raw;
    try {
      wanted = decodeURIComponent(raw);
    } catch {
      /* malformed escape — use it verbatim */
    }
    // Already resolvable (Clarion may fix this, or it points at a footnote).
    if (document.getElementById(wanted)) continue;
    const target = bySlug.get(wanted);
    if (target && !target.id) target.id = wanted;
  }
}

export default function ClarionBlog({ fallback }: { fallback?: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [clarionRendered, setClarionRendered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Hand over to Clarion as soon as it renders anything into its container.
    const check = () => {
      if (container.childElementCount > 0) setClarionRendered(true);
      // Runs on every render pass: the list and an opened post are separate
      // renders, and only the post body carries the Table of Contents.
      linkUpHeadings(container);
    };
    check();
    const observer = new MutationObserver(check);
    observer.observe(container, { childList: true, subtree: true });

    // Scroll to in-post anchors ourselves instead of letting the browser
    // perform a fragment navigation.
    //
    // A fragment navigation changes the history entry, and the App Router
    // answers that by restoring the scroll position it had saved for the
    // page — which drags the reader back to where they started, mid-scroll.
    // Measured on the live insurance post: clicking a contents entry scrolled
    // from 683 up toward the section, reached 1471, then snapped back to 683
    // as popstate fired. It reads as the page glitching and throwing you back
    // to the top.
    //
    // Doing the scroll here and never touching history avoids that entirely.
    // scrollIntoView honours the scroll-margin-top set in globals.css, so the
    // heading still clears the sticky header.
    const onClick = (e: MouseEvent) => {
      // Leave modified clicks and anything already handled alone.
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const el = e.target instanceof Element ? e.target : null;
      const anchor = el?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor || !container.contains(anchor)) return;

      const raw = (anchor.getAttribute("href") ?? "").slice(1);
      if (!raw) return;
      let id = raw;
      try {
        id = decodeURIComponent(raw);
      } catch {
        /* malformed escape — use it verbatim */
      }

      // No target means a link Clarion wrote but never anchored (its
      // [1]/[2] citations). Leaving the default alone keeps today's
      // do-nothing behaviour rather than inventing a destination.
      const target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      // The browser normally moves focus on a fragment navigation. Since we
      // just prevented that, do it here, or keyboard and screen-reader users
      // stay put while the page scrolls away from them.
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    };
    container.addEventListener("click", onClick);

    const script = document.createElement("script");
    script.src = CLARION_BLOG_EMBED_SRC;
    script.async = true;
    script.dataset.siteKey = CLARION_SITE_KEY;
    script.dataset.api = CLARION_API;
    document.body.appendChild(script);

    return () => {
      observer.disconnect();
      container.removeEventListener("click", onClick);
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
