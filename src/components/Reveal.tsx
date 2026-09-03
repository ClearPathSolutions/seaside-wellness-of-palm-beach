"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "article";
  /**
   * Fade only, without the upward translate. Pass `false` whenever the subtree
   * contains scroll targets (`id` anchors).
   *
   * A transform on an ancestor moves everything inside it, and the browser
   * resolves an anchor scroll against wherever the target sits at that instant.
   * If the 700ms transform is still running — or has not started, which is the
   * case on a fresh load — the scroll is computed against content that is still
   * 24px (`translate-y-6`) low, and completing the transform then slides the
   * document up under the already-finished scroll. The section lands 24px too
   * high, which is enough to tuck its heading behind the 110px sticky header.
   *
   * Measured on the deployed site before this was fixed: a jump link and a
   * `#hash` deep link both settled at 88px instead of the intended 112px.
   */
  translate?: boolean;
};

/**
 * One IntersectionObserver shared by every Reveal on the page, rather than one
 * per instance (the homepage alone mounts 22). Callbacks are looked up by
 * element, and each target is unobserved as soon as it fires — the reveal is
 * one-way, so there is nothing to keep watching.
 *
 * Created lazily on first use so it is never constructed during SSR.
 */
let observer: IntersectionObserver | null = null;
const callbacks = new WeakMap<Element, () => void>();

function sharedObserver(): IntersectionObserver | null {
  if (typeof IntersectionObserver === "undefined") return null;
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        callbacks.get(entry.target)?.();
        callbacks.delete(entry.target);
        observer?.unobserve(entry.target);
      }
    },
    // threshold MUST stay 0. An element taller than the viewport can never reach
    // a fractional threshold, because intersectionRatio is capped at
    // viewportHeight / elementHeight. The old value of 0.12 combined with the
    // -60px bottom margin meant anything taller than (viewport - 60) / 0.12
    // never fired at all — roughly 5,500px on a 720px-tall window. The detail
    // pages wrap their whole article body in one Reveal and run 4,700-6,900px,
    // so 12 pages rendered a permanently invisible body at 1440x720 and 21 at
    // 1440x620. It presented as "blank space on scroll" and moved around
    // depending on window height, which is what made it look intermittent.
    //
    // With threshold 0 the callback fires as soon as any part of the element
    // crosses into the root, which is height-independent and what the animation
    // actually wants. The negative bottom margin still delays the reveal until
    // the element is 60px inside the viewport, so the timing is unchanged for
    // everything that already worked.
    { threshold: 0, rootMargin: "0px 0px -60px 0px" }
  );
  return observer;
}

/** Fade + rise into view on scroll. Respects reduced-motion via CSS. */
export default function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
  translate = true,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = sharedObserver();
    // Failsafe: without IntersectionObserver, reveal immediately so content is
    // never left stuck hidden. Runs once on mount (stable guard), so it can't
    // cause the cascading renders the lint rule guards against.
    if (!io) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShown(true);
      return;
    }

    callbacks.set(el, () => setShown(true));
    io.observe(el);
    return () => {
      callbacks.delete(el);
      io.unobserve(el);
    };
  }, []);

  const Tag = as as "div";
  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      data-reveal
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-700 ease-out motion-reduce:transition-none",
        shown ? "opacity-100" : "opacity-0",
        translate && (shown ? "translate-y-0" : "translate-y-6"),
        className
      )}
    >
      {children}
    </Tag>
  );
}
