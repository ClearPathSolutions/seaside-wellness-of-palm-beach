"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { recordPageview } from "@/lib/session";

/**
 * Records a pageview on every route change so a lead carries the journey that
 * produced it, not just the page the form happened to sit on.
 *
 * `usePathname`, deliberately not `useSearchParams`: the latter forces a
 * Suspense boundary and opts every page that renders this into dynamic
 * rendering, which would cost this site its full static generation. The query
 * string is not needed here anyway — the campaign is captured once, before
 * hydration, by the inline script in the root layout.
 *
 * Renders nothing.
 */
export default function SessionTracker() {
  const pathname = usePathname();

  useEffect(() => {
    recordPageview(pathname);
  }, [pathname]);

  return null;
}
