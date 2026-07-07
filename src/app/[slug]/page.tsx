import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import { posts, getPost } from "@/data/posts";
import { site } from "@/lib/site";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.excerpt,
    alternates: { canonical: `/${p.slug}` },
    openGraph: {
      type: "article",
      title: p.title,
      description: p.excerpt,
      publishedTime: p.date,
      images: [p.image],
    },
  };
}

function fmtDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();

  const more = posts.filter((x) => x.slug !== slug).slice(0, 3);
  const hasBody = p.body.length > 0;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.excerpt,
    datePublished: p.date,
    dateModified: p.date,
    image: `${site.url}${p.image}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${site.url}/${p.slug}` },
    author: { "@type": "Organization", name: site.legalName, url: site.url },
    publisher: {
      "@type": "Organization",
      name: site.legalName,
      logo: { "@type": "ImageObject", url: `${site.url}${site.logo}` },
    },
  };

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink">
        <Image src={p.image} alt={p.title} fill priority sizes="100vw" className="object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 to-ink/90" />
        <div className="container-page relative py-20 md:py-28">
          <Link href="/about/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-cream/80 hover:text-gold-300">
            <ArrowLeft className="size-4" /> All articles
          </Link>
          <p className="eyebrow mt-6 text-gold-400">{p.category}</p>
          <h1 className="mt-3 max-w-4xl text-3xl font-medium leading-tight text-white sm:text-4xl lg:text-5xl">
            {p.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-cream/70">
            <span className="flex items-center gap-1.5"><Calendar className="size-4 text-gold-400" /> {fmtDate(p.date)}</span>
            <span className="flex items-center gap-1.5"><Clock className="size-4 text-gold-400" /> {p.readingMinutes} min read</span>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-16 md:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_18rem] lg:gap-16">
          <Reveal className="min-w-0">
            <article className="prose-seaside max-w-none">
              {hasBody ? (
                p.body.map((s, i) => (
                  <section
                    key={i}
                    className={s.heading ? "scroll-mt-28 border-t border-shell/70 pt-8 first:border-0 first:pt-0" : undefined}
                  >
                    {s.heading && <h2>{s.heading}</h2>}
                    {s.paragraphs?.map((para, j) => (
                      <p key={j} className={i === 0 && j === 0 ? "text-xl leading-relaxed text-ink" : undefined}>
                        {para}
                      </p>
                    ))}
                    {s.bullets && s.bullets.length > 0 && (
                      <ul>
                        {s.bullets.map((b, j) => (
                          <li key={j}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))
              ) : (
                <p className="text-xl leading-relaxed text-ink">{p.excerpt}</p>
              )}
            </article>
          </Reveal>

          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <div className="rounded-2xl bg-ocean-700 p-7 text-white">
              <p className="font-display text-2xl leading-tight">Need to talk to someone today?</p>
              <p className="mt-2 text-sm text-cream/80">
                Our admissions team is available 24/7 for a confidential, no-obligation conversation.
              </p>
              <Link href="/contact" className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold-700 px-5 py-3 font-semibold text-white transition-colors hover:bg-gold-800">
                Reach out <ArrowRight className="size-4" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* More posts */}
      <section className="border-t border-shell bg-cream py-16 md:py-20">
        <div className="container-page">
          <h2 className="mb-8 text-2xl font-medium text-ink sm:text-3xl">Keep reading</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {more.map((m) => (
              <Link key={m.slug} href={`/${m.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-soft)] ring-1 ring-shell transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={m.image} alt={m.title} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="eyebrow text-gold-600">{m.category}</p>
                  <h3 className="mt-2 text-base font-semibold leading-snug text-ink">{m.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
