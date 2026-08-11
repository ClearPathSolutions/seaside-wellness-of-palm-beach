"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Faq as FaqItem } from "@/data/types";

export default function Faq({
  items,
  defaultOpen = 0,
}: {
  items: FaqItem[];
  /**
   * Index open on first render, or null for all-collapsed. Grouped renderings
   * pass null on every group but the first — otherwise each group opens its own
   * first item and four panels sit open at once.
   */
  defaultOpen?: number | null;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  // Per-instance prefix. The ids used to be `faq-btn-${i}`, which collided the
  // moment more than one Faq rendered on a page: /about/faq groups its 39
  // questions into four categories, so every id existed four times over and
  // aria-controls / aria-labelledby resolved to the first match — pointing three
  // of the four groups at the wrong panel for assistive tech.
  const uid = useId();
  return (
    <div className="divide-y divide-shell rounded-2xl border border-shell bg-white">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              type="button"
              id={`${uid}-btn-${i}`}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={isOpen}
              aria-controls={`${uid}-panel-${i}`}
            >
              <span className="text-lg font-semibold text-ink">{f.q}</span>
              <ChevronDown
                className={`size-5 shrink-0 text-gold-600 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              id={`${uid}-panel-${i}`}
              role="region"
              aria-labelledby={`${uid}-btn-${i}`}
              inert={isOpen ? undefined : true}
              className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-6 leading-relaxed text-ink-600">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
