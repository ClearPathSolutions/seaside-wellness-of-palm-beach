# Seaside Wellness — Next.js Website

A modern, mobile-first rebuild of [seasidewellnesspb.com](https://seasidewellnesspb.com) — a luxury
addiction & mental health treatment center in West Palm Beach, FL. Migrated from WordPress to
**Next.js 16 (App Router) + React 19 + Tailwind CSS v4**, optimized for performance, SEO, and
Vercel deployment.

## Tech stack

- **Next.js 16** (App Router, React Server Components, static generation)
- **React 19** · **TypeScript** · **Tailwind CSS v4**
- **lucide-react** icons · **next/font** (Cormorant Garamond + Karla)
- All content modeled as typed data — no CMS/database required

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## Project structure

```
src/
  app/                       # routes (App Router)
    page.tsx                 # homepage
    treatment/[slug]/        # program & therapy detail pages
    what-we-treat/[slug]/    # condition detail pages
    areas-we-serve/[slug]/   # location pages
    about/[member]/          # team member bios
    [slug]/                  # blog posts (root-level URLs, preserved from WP)
    admissions/…  tour/  contact/  api/contact/
    sitemap.ts  robots.ts  not-found.tsx
  components/                # Header, Footer, PageHero, cards, Gallery, Faq, etc.
  data/                      # typed content
    catalog.ts               # programs, therapies, conditions, areas (+ images/blurbs)
    team.ts  posts.ts  site-content.ts  admissions.ts
    content/*.json           # long-form page bodies (extracted from the original site)
  lib/site.ts                # business info + navigation
public/wp-content/uploads/   # all images & the brand video (paths preserved from WP)
```

## Content

Text, images, team bios, blog posts, and FAQs were extracted from the live WordPress site and
modeled as typed data / JSON. Detail-page bodies live in `src/data/content/*.json` and are merged
with catalog metadata at build time. To edit copy, edit the data files — no code changes needed.

## Before launch — action items

1. **Testimonials** — `src/data/site-content.ts` `testimonials[]` are placeholders (attributed to
   "Alumnus" / "Parent of a client"). Replace with real, written-consent client/family reviews
   before launch — publishing fabricated testimonials for a healthcare provider risks FTC/state
   advertising violations.
2. **Contact form delivery** — `src/app/api/contact/route.ts` now sends via **Resend** when
   `RESEND_API_KEY` is set (optional `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`). Add the key in
   Vercel → Settings → Environment Variables and verify a sending domain. Without a key it logs
   the submission so the form still works in development.
3. **Analytics / tracking** — add GA4 / Meta Pixel / call-tracking as desired.
4. **Domain & canonical** — `src/lib/site.ts` `url` is set to the production domain; update if
   different.
5. **Legal review** — the site now has a HIPAA Notice of Privacy Practices (`/privacy-policy`) and
   a Terms of Service (`/terms`), split from a single file. The Terms are generic boilerplate that
   still references marketplace concepts (reviews, deals, newsletters) that don't apply — have
   counsel review/replace before launch.
6. **Area pages** — `src/data/content/areas.json` bodies are near-identical across locations
   (duplicate-content SEO risk). Differentiate per community when possible.

## Deploy to Vercel

1. Push this folder to a Git repository (GitHub/GitLab/Bitbucket).
2. In Vercel, **Add New → Project** and import the repo. Framework preset auto-detects **Next.js**.
3. Build command `next build`, output handled automatically. Deploy.
4. Add your domain in **Project → Settings → Domains** and point DNS to Vercel.

Or from the CLI:

```bash
npm i -g vercel
vercel            # preview
vercel --prod     # production
```

## Notes

- The brand video (`public/wp-content/uploads/2026/04/…mp4`) is compressed to ~13 MB and streamed
  with `preload="none"`. For heavy traffic, consider hosting video on a dedicated CDN/streaming host.
- Images use `next/image` and are optimized on demand by Vercel — originals are kept full-size.
- A crisis banner (988 Lifeline) appears sitewide in the footer.
