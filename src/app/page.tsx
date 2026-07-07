import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Phone,
  ShieldCheck,
  CheckCircle2,
  MapPin,
} from "lucide-react";
import { site } from "@/lib/site";
import { Button } from "@/components/Button";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Icon from "@/components/Icon";
import { ServiceCard, LinkTile } from "@/components/cards";
import CTASection from "@/components/CTASection";
import BrandVideo from "@/components/BrandVideo";
import { programs, therapies, substances, mentalHealth, areas } from "@/data/catalog";
import {
  stats,
  differentiators,
  admissionsSteps,
  accreditations,
  insuranceImage,
  insurers,
  testimonials,
} from "@/data/site-content";
import { latestPosts } from "@/data/posts";

const HERO = "/wp-content/uploads/2025/08/5-web-or-mls-DJI_0101_2_3_4_5.jpg";
const INTRO_IMG = "/wp-content/uploads/2025/08/67-web-or-mls-0E2A6521.jpg";
const TOUR_IMG = "/wp-content/uploads/2025/08/17-web-or-mls-DJI_0175_6_7_8_9.jpg";
const VIDEO = "/wp-content/uploads/2026/04/Seaside-Wellness-Brand-Story-Video-V2-VOICEOVER.mp4";

export default function Home() {
  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="relative isolate overflow-hidden bg-ink">
        <Image src={HERO} alt="Aerial view of the Seaside Wellness campus in West Palm Beach" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-ink/85 via-ink/65 to-ocean-800/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />

        <div className="container-page relative flex min-h-[88vh] flex-col justify-center py-24 md:min-h-[90vh]">
          <div className="max-w-3xl animate-rise">
            <p className="eyebrow text-gold-300 mb-5">West Palm Beach, Florida</p>
            <h1 className="text-4xl font-medium leading-[1.04] text-white sm:text-5xl lg:text-[4.25rem]">
              Your path to healing starts at Seaside Wellness
            </h1>
            <p className="mt-6 max-w-xl text-lg text-cream/85 sm:text-xl">
              A luxury addiction &amp; mental health treatment center offering evidence-based
              detox, residential inpatient, and dual diagnosis care — just steps from the water.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href={site.phoneHref} size="lg" variant="primary">
                <Phone className="size-5" /> Call {site.phone}
              </Button>
              <Button href="/admissions/insurance-verification" size="lg" variant="onDark">
                Verify Your Insurance
              </Button>
            </div>
            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm text-cream/80">
              {["24/7 confidential admissions", "Joint Commission accredited", "Most PPO plans accepted"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-gold-400" /> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- TRUST STRIP ---------- */}
      <section className="border-b border-shell bg-cream">
        <div className="container-page flex flex-wrap items-center justify-center gap-x-10 gap-y-5 py-6">
          <span className="eyebrow text-ink-400">Accredited &amp; Certified</span>
          {accreditations.map((a) => (
            <Image
              key={a.name}
              src={a.image}
              alt={a.alt}
              width={200}
              height={100}
              loading="eager"
              unoptimized={a.image.endsWith(".gif")}
              className="h-12 w-auto opacity-90 transition hover:opacity-100"
            />
          ))}
        </div>
      </section>

      {/* ---------- INTRO ---------- */}
      <section className="py-20 md:py-28">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-[var(--shadow-lift)]">
                <Image src={INTRO_IMG} alt="A private suite at Seaside Wellness" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-2 hidden rounded-2xl bg-ocean-600 p-6 text-white shadow-xl sm:block lg:-right-6">
                <p className="font-display text-4xl">106 Blossom Ln</p>
                <p className="mt-1 text-sm text-cream/80">West Palm Beach, FL 33404</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <p className="eyebrow mb-4">A premier facility in Palm Beach</p>
            <h2 className="text-3xl font-medium text-ink sm:text-4xl lg:text-[2.75rem]">
              Evidence-based care in a calm, coastal sanctuary
            </h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink-600">
              <p>
                Seaside Wellness is a luxury addiction treatment and mental health facility in West
                Palm Beach, offering high-quality, evidence-based care in a serene environment
                designed for healing.
              </p>
              <p>
                We provide personalized treatment for individuals facing drug or alcohol addiction,
                mental health disorders, or dual diagnosis — combining licensed clinical expertise
                with genuine human connection.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/about/about-us" variant="ghost">Our Story</Button>
              <Button href="/treatment">Explore Treatment <ArrowRight className="size-4" /></Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- PROGRAMS ---------- */}
      <section className="bg-cream py-20 md:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Programs"
            title="Evidence-based programs, one campus"
            text="From medically supervised detox to residential care and aftercare, every level of care is delivered by a licensed team under one roof."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((p, i) => (
              <Reveal key={p.slug} delay={i * 60}>
                <ServiceCard item={p} basePath="/treatment" className="h-full" />
              </Reveal>
            ))}
            <Reveal delay={programs.length * 60}>
              <div className="flex h-full flex-col justify-center rounded-2xl bg-ink p-8 text-white">
                <h3 className="text-2xl font-medium text-white">Therapies</h3>
                <p className="mt-2 text-cream/75">Clinical modalities woven through every program.</p>
                <ul className="mt-5 space-y-2.5">
                  {therapies.map((t) => (
                    <li key={t.slug}>
                      <Link href={`/treatment/${t.slug}`} className="group flex items-center justify-between rounded-lg border border-white/10 px-4 py-3 transition-colors hover:border-gold-400/60 hover:bg-white/5">
                        <span className="font-medium">{t.name}</span>
                        <ArrowRight className="size-4 text-gold-400 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- VIDEO ---------- */}
      <section className="py-20 md:py-28">
        <div className="container-page grid items-center gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow mb-4">How we help you recover</p>
            <h2 className="text-3xl font-medium text-ink sm:text-4xl">
              Structure, connection, and real clinical care
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-600">
              Our approach to treatment is built on structure and genuine connection. Watch a short
              story of how our programs work — and what recovery by the ocean really looks like.
            </p>
            <div className="mt-8">
              <Button href="/tour" variant="secondary">Tour the Facility <ArrowRight className="size-4" /></Button>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <BrandVideo src={VIDEO} poster={TOUR_IMG} label="Watch the Seaside Wellness story" />
          </Reveal>
        </div>
      </section>

      {/* ---------- STATS ---------- */}
      <section className="bg-ocean-700 py-14 text-white">
        <div className="container-page grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 80} className="text-center">
              <p className="font-display text-5xl text-gold-300 lg:text-6xl">{s.value}</p>
              <p className="mt-2 text-sm text-cream/80">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- WHY CHOOSE ---------- */}
      <section className="py-20 md:py-28">
        <div className="container-page">
          <SectionHeading eyebrow="Why Seaside" title="A different kind of treatment center" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {differentiators.map((d, i) => (
              <Reveal key={d.title} delay={i * 60}>
                <div className="h-full rounded-2xl border border-shell bg-white p-7 transition-shadow duration-300 hover:shadow-[var(--shadow-soft)]">
                  <span className="grid size-12 place-items-center rounded-xl bg-gold-50 text-gold-600">
                    <Icon name={d.icon} className="size-6" />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold text-ink">{d.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-600">{d.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- WHAT WE TREAT ---------- */}
      <section className="bg-cream py-20 md:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="What we treat"
            title="Comprehensive care for addiction & mental health"
            text="We treat a wide range of substance use disorders and mental health conditions with personalized, evidence-based programs."
          />
          <div className="mt-14 grid gap-10 lg:grid-cols-2">
            <Reveal>
              <h3 className="mb-5 flex items-center gap-2 text-2xl font-medium text-ink">
                <span className="h-px w-8 bg-gold-400" /> Substance Addiction
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {substances.map((c) => (
                  <LinkTile key={c.slug} item={c} basePath="/what-we-treat" />
                ))}
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h3 className="mb-5 flex items-center gap-2 text-2xl font-medium text-ink">
                <span className="h-px w-8 bg-gold-400" /> Mental Health
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {mentalHealth.map((c) => (
                  <LinkTile key={c.slug} item={c} basePath="/what-we-treat" />
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- TOUR TEASER ---------- */}
      <section className="relative isolate overflow-hidden">
        <Image src={TOUR_IMG} alt="Seaside Wellness grounds" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/55 to-transparent" />
        <div className="container-page relative py-24 md:py-32">
          <Reveal className="max-w-xl">
            <p className="eyebrow text-gold-300 mb-4">Tour our luxury rehab</p>
            <h2 className="text-3xl font-medium text-white sm:text-4xl lg:text-5xl">
              Experience Seaside Wellness for yourself
            </h2>
            <p className="mt-5 text-lg text-cream/85">
              A modern, luxury treatment center just steps from the water and minutes from downtown
              West Palm Beach. See the space where healing happens.
            </p>
            <div className="mt-8">
              <Button href="/tour" size="lg" variant="primary">Take the Virtual Tour <ArrowRight className="size-4" /></Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- ADMISSIONS ---------- */}
      <section className="py-20 md:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Admissions made simple"
            title="Get help in four easy steps"
            text="Reaching out is the hardest part. From there, our team guides you through every step."
          />
          <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {admissionsSteps.map((s, i) => (
              <Reveal key={s.step} delay={i * 70} as="li">
                <div className="relative h-full rounded-2xl border border-shell bg-cream p-7">
                  <span className="font-display text-5xl text-gold-300">{s.step}</span>
                  <h3 className="mt-3 text-lg font-semibold text-ink">{s.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-600">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <div className="mt-10 flex justify-center">
            <Button href="/admissions/admissions-process" variant="secondary" size="lg">
              See the Full Admissions Process <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* ---------- AREAS ---------- */}
      <section className="bg-ink py-20 text-white md:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Areas we serve"
            title="Proudly serving West Palm Beach & beyond"
            tone="light"
          />
          <div className="mt-14 flex flex-wrap justify-center gap-4">
            {areas.map((a, i) => (
              <Reveal key={a.slug} delay={i * 50} className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]">
                <Link href={`/areas-we-serve/${a.slug}`} className="group flex h-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 transition-colors hover:border-gold-400/60 hover:bg-white/[0.07]">
                  <MapPin className="size-5 shrink-0 text-gold-400" />
                  <span className="flex-1 font-medium">{a.name}</span>
                  <ArrowRight className="size-4 text-cream/40 transition-transform group-hover:translate-x-1" />
                </Link>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-center text-cream/60">
            <Link href="/areas-we-serve" className="font-semibold text-gold-300 hover:text-gold-200">
              View all communities we serve →
            </Link>
          </p>
        </div>
      </section>

      {/* ---------- INSURANCE ---------- */}
      <section className="py-20 md:py-28">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="overflow-hidden rounded-2xl shadow-[var(--shadow-soft)] ring-1 ring-shell">
              <Image src={insuranceImage} alt="Seaside Wellness accepts most major PPO insurance plans" width={750} height={500} className="h-auto w-full" />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <p className="eyebrow mb-4 inline-flex items-center gap-2">
              <ShieldCheck className="size-4 text-gold-500" /> Insurance
            </p>
            <h2 className="text-3xl font-medium text-ink sm:text-4xl">We accept most major insurances</h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-600">
              Seaside Wellness works directly with insurers to verify your coverage quickly and
              confidentially. Many clients have little to no out-of-pocket cost.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {insurers.map((n) => (
                <li key={n} className="rounded-full border border-shell bg-cream px-4 py-1.5 text-sm font-medium text-ink-600">{n}</li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href="/admissions/insurance-verification" size="lg">Verify Your Insurance <ArrowRight className="size-4" /></Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- TESTIMONIALS ---------- */}
      <section className="bg-cream py-20 md:py-28">
        <div className="container-page">
          <SectionHeading eyebrow="In their words" title="They trusted us with their recovery" />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={i} delay={i * 80}>
                <figure className="flex h-full flex-col rounded-2xl bg-white p-8 shadow-[var(--shadow-soft)] ring-1 ring-shell">
                  <span className="font-display text-6xl leading-none text-gold-300">&ldquo;</span>
                  <blockquote className="-mt-4 flex-1 text-lg leading-relaxed text-ink-700">{t.quote}</blockquote>
                  <figcaption className="mt-6 border-t border-shell pt-4">
                    <p className="font-semibold text-ink">{t.name}</p>
                    <p className="text-sm text-ink-500">{t.context}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- BLOG ---------- */}
      <section className="py-20 md:py-28">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="From the blog" title="Resources for recovery" align="left" className="mx-0" />
            <Link href="/about/blog" className="hidden font-semibold text-gold-700 hover:text-gold-800 sm:inline-flex sm:items-center sm:gap-1.5">
              View all articles <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {latestPosts.map((p, i) => (
              <Reveal key={p.slug} delay={i * 70}>
                <Link href={`/${p.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-soft)] ring-1 ring-shell transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={p.image} alt={p.title} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="eyebrow text-gold-600">{p.category}</p>
                    <h3 className="mt-2 text-lg font-semibold leading-snug text-ink">{p.title}</h3>
                    <p className="mt-2 flex-1 text-[0.9rem] leading-relaxed text-ink-600">{p.excerpt}</p>
                    <span className="mt-4 text-sm text-ink-400">{p.readingMinutes} min read</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
