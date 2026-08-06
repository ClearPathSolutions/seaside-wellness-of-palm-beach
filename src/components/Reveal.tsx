"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "article";
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
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
  );
  return observer;
}

/** Fade + rise into view on scroll. Respects reduced-motion via CSS. */
export default function Reveal({ children, className, delay = 0, as = "div" }: Props) {
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
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        className
      )}
    >
      {children}
    </Tag>
  );
}
