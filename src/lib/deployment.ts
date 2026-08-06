/**
 * Which deployment this build is — the single source of truth.
 *
 * Vercel sets `VERCEL_ENV` to "production" | "preview" | "development" at build
 * time. Read once here so `app/robots.ts` and the root layout's `robots`
 * metadata cannot disagree: a build that disallows crawling in robots.txt while
 * still emitting `index, follow` sends contradictory signals, which is worse
 * than either alone.
 *
 * Undefined outside Vercel, so a local `next start` behaves like production and
 * stays crawlable for testing.
 */
export const isPreview =
  process.env.VERCEL_ENV === "preview" || process.env.VERCEL_ENV === "development";
