import { team } from "./team";
import type { TeamMember } from "./types";

/**
 * Canonical staff display order, from the bio sheet.
 *
 * Deliberately NOT stored in `team.ts`. That file is regenerated from the
 * Quadrant support portal, so ordering added there is lost on the next sync —
 * and it fails silently, because the page still renders every person, just in
 * whatever order the portal returned. Keeping the order here lets the sync
 * rewrite bios, roles, credentials and photos freely without disturbing it.
 *
 * One list drives both the four-up preview on /about and the full grid on
 * /about/meet-the-team. Two lists would drift the moment someone was promoted.
 */
const ROSTER_ORDER = [
  "timothy-foley", // Program Director
  "erin-crawford", // Director of Nursing
  "steve-ryan", // Operations Director
  "michael-meagher", // Clinical Director
  "shaun-hutton", // Primary Therapist
  "april-blair", // Primary Therapist
  "kate-gulam", // Primary Therapist
  "shan-raiford", // Case Manager
  "jennifer-penny", // Client Care Coordinator
] as const;

/** How many of the above lead the org, for the /about preview grid. */
const LEADERSHIP_COUNT = 4;

/**
 * Everyone, in bio-sheet order.
 *
 * Anyone the portal adds who is not yet listed above is appended rather than
 * dropped. A new hire appearing last is a cosmetic problem; a new hire missing
 * from the team page entirely is a real one, and it would be easy to miss.
 */
export const roster: TeamMember[] = (() => {
  const bySlug = new Map(team.map((m) => [m.slug, m]));
  const ordered = ROSTER_ORDER.map((slug) => bySlug.get(slug)).filter(
    (m): m is TeamMember => Boolean(m)
  );
  const listed = new Set(ordered.map((m) => m.slug));
  const unlisted = team.filter((m) => !listed.has(m.slug));
  return [...ordered, ...unlisted];
})();

/** The directors, for the four-up grid on /about. */
export const leadership: TeamMember[] = roster.slice(0, LEADERSHIP_COUNT);
