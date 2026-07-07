import type { Metadata } from "next";
import Link from "next/link";
import { Home, Phone } from "lucide-react";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="grid min-h-[70vh] place-items-center bg-cream px-4 py-24">
      <div className="mx-auto max-w-lg text-center">
        <p className="font-display text-7xl text-gold-400">404</p>
        <h1 className="mt-4 text-3xl font-medium text-ink sm:text-4xl">This page couldn&apos;t be found</h1>
        <p className="mt-4 text-lg text-ink-600">
          The page you&apos;re looking for may have moved. Let&apos;s get you back on the path to
          healing.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-gold-700 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-gold-800"
          >
            <Home className="size-4" /> Back to Home
          </Link>
          <a
            href={site.phoneHref}
            className="inline-flex items-center gap-2 rounded-full border border-ink-300 px-6 py-3.5 font-semibold text-ink transition-colors hover:border-gold-500 hover:text-gold-700"
          >
            <Phone className="size-4" /> Call {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
