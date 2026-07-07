"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Phone, ShieldCheck, X } from "lucide-react";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/cn";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close the mobile drawer on Escape.
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50">
      {/* Utility bar */}
      <div className="hidden md:block bg-ink text-cream/90 text-[0.8rem]">
        <div className="container-page flex items-center justify-between py-2">
          <p className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-gold-400" />
            Confidential, 24/7 admissions · Joint Commission accredited
          </p>
          <div className="flex items-center gap-5">
            <a href={`mailto:${site.email}`} className="hover:text-gold-300 transition-colors">
              {site.email}
            </a>
            <a href={site.phoneHref} className="font-semibold text-gold-300 hover:text-gold-200 transition-colors">
              {site.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={cn(
          "bg-white/95 backdrop-blur-md transition-shadow duration-300 border-b border-shell",
          scrolled ? "shadow-[0_6px_24px_rgba(40,45,51,0.07)]" : ""
        )}
      >
        <div className="container-page flex items-center justify-between gap-4 py-3">
          <Link href="/" className="shrink-0" aria-label={`${site.name} home`}>
            <Image
              src={site.logo}
              alt={`${site.legalName} logo`}
              width={1997}
              height={800}
              priority
              className="h-11 w-auto md:h-12"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
            {nav.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(item.columns ? item.label : null)}
                  onMouseLeave={() => setOpenMenu(null)}
                  onFocus={() => item.columns && setOpenMenu(item.label)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node))
                      setOpenMenu(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") setOpenMenu(null);
                  }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1 whitespace-nowrap px-2.5 py-2 rounded-full text-[0.9rem] font-semibold transition-colors xl:px-3",
                      active ? "text-gold-700" : "text-ink-700 hover:text-gold-700"
                    )}
                    aria-current={active ? "page" : undefined}
                    aria-haspopup={item.columns ? "true" : undefined}
                    aria-expanded={item.columns ? openMenu === item.label : undefined}
                  >
                    {item.label}
                    {item.columns && (
                      <ChevronDown
                        className={cn(
                          "size-4 transition-transform duration-300",
                          openMenu === item.label && "rotate-180"
                        )}
                      />
                    )}
                  </Link>

                  {item.columns && openMenu === item.label && (
                    <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3">
                      <div className="flex max-w-[92vw] overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-lift)] ring-1 ring-shell animate-rise">
                        <div className="flex gap-8 p-6">
                          {item.columns.map((col) => (
                            <div key={col.heading} className="min-w-[11rem]">
                              {col.heading && (
                                <p className="eyebrow mb-2 text-[0.65rem]">{col.heading}</p>
                              )}
                              <ul className="space-y-0.5">
                                {col.items.map((c) => (
                                  <li key={c.href}>
                                    <Link
                                      href={c.href}
                                      onClick={() => setOpenMenu(null)}
                                      className="block whitespace-nowrap rounded-lg px-3 py-1.5 text-[0.9rem] text-ink-700 hover:bg-gold-50 hover:text-gold-800 transition-colors"
                                    >
                                      {c.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                        {item.featured && (
                          <Link
                            href={item.featured.href}
                            onClick={() => setOpenMenu(null)}
                            className="relative hidden w-52 shrink-0 group overflow-hidden xl:block"
                          >
                            <Image
                              src={item.featured.image}
                              alt=""
                              fill
                              sizes="208px"
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
                            <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                              <p className="font-display text-lg leading-tight">
                                {item.featured.title}
                              </p>
                              <p className="mt-1 text-xs text-white/80">{item.featured.text}</p>
                            </div>
                          </Link>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/admissions/insurance-verification"
              className="hidden xl:inline-flex items-center whitespace-nowrap rounded-full border border-ink-300 px-4 py-2.5 text-sm font-semibold text-ink hover:border-gold-500 hover:text-gold-700 transition-colors"
            >
              Verify Insurance
            </Link>
            <a
              href={site.phoneHref}
              className="hidden sm:inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-gold-700 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(53,48,45,0.28)] hover:bg-gold-800 transition-colors lg:px-5"
            >
              <Phone className="size-4 shrink-0" />
              {site.phone}
            </a>
            {/* Compact tap-to-call — always visible on small phones where the pill is hidden */}
            <a
              href={site.phoneHref}
              aria-label={`Call ${site.phone}`}
              className="sm:hidden inline-flex size-11 items-center justify-center rounded-full bg-gold-700 text-white shadow-[0_8px_24px_rgba(53,48,45,0.28)] hover:bg-gold-800 transition-colors"
            >
              <Phone className="size-5" />
            </a>
            <button
              type="button"
              className="lg:hidden inline-flex size-11 items-center justify-center rounded-full p-2.5 text-ink hover:bg-shell transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-drawer"
            >
              <Menu className="size-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}

function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [prevOpen, setPrevOpen] = useState(open);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  // Collapse any open accordion section when the drawer closes (render-time
  // reset on prop change — no effect needed).
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (!open) setExpanded(null);
  }

  // Move focus into the drawer on open; restore it to the trigger on close.
  useEffect(() => {
    if (!open) return;
    lastFocused.current = document.activeElement as HTMLElement | null;
    panelRef.current?.querySelector<HTMLElement>("button, a[href]")?.focus();
    return () => lastFocused.current?.focus?.();
  }, [open]);

  // Trap Tab focus within the drawer while it's open.
  const trapFocus = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab" || !panelRef.current) return;
    const focusable = panelRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <div
      id="mobile-drawer"
      inert={!open || undefined}
      className={cn(
        "lg:hidden fixed inset-0 z-50 transition-opacity duration-300",
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
    >
      <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={onClose} />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        onKeyDown={trapFocus}
        className={cn(
          "absolute right-0 top-0 h-full w-[min(24rem,90vw)] bg-cream shadow-2xl flex flex-col transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-shell px-5 py-4">
          <span className="font-display text-xl text-ink">Menu</span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-ink hover:bg-shell"
            aria-label="Close menu"
          >
            <X className="size-6" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-3" aria-label="Mobile">
          {nav.map((item) => (
            <div key={item.label} className="border-b border-shell/70 last:border-0">
              {item.columns ? (
                <>
                  <button
                    type="button"
                    onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                    className="flex w-full items-center justify-between px-2 py-3.5 text-left font-semibold text-ink"
                    aria-expanded={expanded === item.label}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "size-5 text-ink-500 transition-transform",
                        expanded === item.label && "rotate-180"
                      )}
                    />
                  </button>
                  <div
                    inert={expanded === item.label ? undefined : true}
                    className={cn(
                      "grid transition-all duration-300",
                      expanded === item.label
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="pb-3 pl-3">
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className="block py-2 text-sm font-semibold text-gold-700"
                        >
                          All {item.label} →
                        </Link>
                        {item.columns.map((col) => (
                          <div key={col.heading} className="mb-1">
                            {col.heading && (
                              <p className="eyebrow mt-2 mb-1 text-[0.6rem]">{col.heading}</p>
                            )}
                            {col.items.map((c) => (
                              <Link
                                key={c.href}
                                href={c.href}
                                onClick={onClose}
                                className="block py-1.5 text-[0.92rem] text-ink-600"
                              >
                                {c.label}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <Link href={item.href} onClick={onClose} className="block px-2 py-3.5 font-semibold text-ink">
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="border-t border-shell p-4 space-y-2">
          <a
            href={site.phoneHref}
            className="flex items-center justify-center gap-2 rounded-full bg-gold-700 px-5 py-3.5 font-semibold text-white"
          >
            <Phone className="size-4" /> Call {site.phone}
          </a>
          <Link
            href="/admissions/insurance-verification"
            className="flex items-center justify-center gap-2 rounded-full border border-ink-300 px-5 py-3 font-semibold text-ink"
          >
            <ShieldCheck className="size-4" /> Verify Insurance
          </Link>
        </div>
      </div>
    </div>
  );
}
