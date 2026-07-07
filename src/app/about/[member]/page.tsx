import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Phone } from "lucide-react";
import { team } from "@/data/team";
import { site } from "@/lib/site";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";

export function generateStaticParams() {
  return team.map((m) => ({ member: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ member: string }>;
}): Promise<Metadata> {
  const { member } = await params;
  const m = team.find((t) => t.slug === member);
  if (!m) return {};
  return {
    title: `${m.name}${m.credentials ? ", " + m.credentials : ""} — ${m.role}`,
    description: `${m.name}, ${m.role} at Seaside Wellness. ${m.bio[0].slice(0, 130)}`,
    alternates: { canonical: `/about/${m.slug}` },
  };
}

export default async function MemberPage({
  params,
}: {
  params: Promise<{ member: string }>;
}) {
  const { member } = await params;
  const m = team.find((t) => t.slug === member);
  if (!m) notFound();

  return (
    <>
      <section className="bg-cream">
        <div className="container-page py-14 md:py-20">
          <Link
            href="/about/meet-the-team"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-600 hover:text-gold-700"
          >
            <ArrowLeft className="size-4" /> Back to the team
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[22rem_1fr] lg:gap-16">
            <Reveal>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-shell shadow-[var(--shadow-lift)]">
                <Image src={m.image} alt={m.name} fill priority sizes="(max-width:1024px) 100vw, 22rem" className="object-cover" />
              </div>
            </Reveal>
            <Reveal delay={100} className="min-w-0">
              <p className="eyebrow mb-3">{m.role}</p>
              <h1 className="text-4xl font-medium text-ink sm:text-5xl">{m.name}</h1>
              {m.credentials && <p className="mt-2 text-lg font-medium text-gold-700">{m.credentials}</p>}
              <div className="prose-seaside mt-6 max-w-none">
                {m.bio.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <a
                href={site.phoneHref}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-gold-800"
              >
                <Phone className="size-4" /> Speak with our team
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
