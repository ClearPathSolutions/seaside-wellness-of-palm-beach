import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Icon from "./Icon";
import Reveal from "./Reveal";
import type { CatalogItem } from "@/data/types";

/** 3-up responsive grid that centers the last row so orphan cards never hang. */
export function CardGrid({
  items,
  basePath,
}: {
  items: CatalogItem[];
  basePath: string;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {items.map((it, i) => (
        <Reveal
          key={it.slug}
          delay={(i % 3) * 60}
          className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
        >
          <ServiceCard item={it} basePath={basePath} className="h-full" />
        </Reveal>
      ))}
    </div>
  );
}

/** Rich image card used for programs, conditions, areas. */
export function ServiceCard({
  item,
  basePath,
  className,
}: {
  item: CatalogItem;
  basePath: string;
  className?: string;
}) {
  return (
    <Link
      href={`${basePath}/${item.slug}`}
      className={`group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-soft)] ring-1 ring-shell transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] ${className ?? ""}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        {item.icon && (
          <span className="absolute left-4 top-4 grid size-11 place-items-center rounded-full bg-white/90 text-gold-600 shadow-sm backdrop-blur">
            <Icon name={item.icon} className="size-5" />
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-semibold text-ink">{item.name}</h3>
        <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-ink-600">{item.short}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700">
          Learn more
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

/** Compact link tile for dense grids (conditions). */
export function LinkTile({ item, basePath }: { item: CatalogItem; basePath: string }) {
  return (
    <Link
      href={`${basePath}/${item.slug}`}
      className="group flex items-center gap-3 rounded-xl border border-shell bg-white px-4 py-3.5 transition-all duration-300 hover:border-gold-300 hover:bg-gold-50"
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-shell text-gold-600 transition-colors group-hover:bg-white">
        <Icon name={item.icon} className="size-5" />
      </span>
      <span className="min-w-0 flex-1 font-semibold text-ink">{item.name}</span>
      <ArrowRight className="size-4 shrink-0 text-ink-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-gold-600" />
    </Link>
  );
}
