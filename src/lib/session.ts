// Visit session store: who this visitor is across pageviews, and what they
// looked at before converting.
//
// This is the `session` object forwarded alongside a lead. It is NOT the CTM
// visit — see the warning on sessionId() below, because confusing the two is
// the single most damaging mistake available here.
//
// No server relay exists on this site: the browser posts leads straight to
// Clarion's public endpoint, which is the correct architecture given that POST
// already works from this origin. That places one real constraint on this
// file. The usual advice is to rebuild and sanitise a client-shaped object
// server-side before forwarding it, because your own endpoint is public and
// unauthenticated. There is no such hop here, so the bounds below are not a
// defence against a hostile client — a hostile client would simply post to
// Clarion directly. They exist to stop *us* sending something enormous: a bot
// or a very long visit can otherwise grow this object without limit, and an
// oversized body is a dropped lead.

import { readFirstTouch } from "@/lib/attribution";

const SESSION_KEY = "session.v1";

/** A visit ends after 30 minutes of inactivity, the analytics convention. */
const IDLE_MS = 30 * 60 * 1000;

/** Bounds. See the note above for what these are and are not protecting. */
const MAX_PAGEVIEWS = 50;
const MAX_PATH_LEN = 200;
const MAX_BYTES = 8 * 1024;

type Pageview = { path: string; at: number };

type SessionRecord = {
  id: string;
  started_at: number;
  last_at: number;
  /** Trimmed to MAX_PAGEVIEWS; `count` keeps the true total. */
  views: Pageview[];
  count: number;
};

function newId(): string {
  try {
    if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  } catch {
    /* fall through */
  }
  return `s-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function read(): SessionRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    const v = raw ? (JSON.parse(raw) as SessionRecord) : null;
    if (!v || typeof v.started_at !== "number" || typeof v.last_at !== "number") return null;
    if (!Array.isArray(v.views)) return null;
    return v;
  } catch {
    return null;
  }
}

function write(rec: SessionRecord): void {
  try {
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(rec));
  } catch {
    /* private mode / quota — attribution still works without the session */
  }
}

function start(now: number): SessionRecord {
  return { id: newId(), started_at: now, last_at: now, views: [], count: 0 };
}

/**
 * Record a pageview, starting a new session when the last one has gone stale
 * or when a fresh ad click has arrived since it began.
 *
 * Called on every route change, not just first paint — a visitor who lands on
 * an ad and reads three pages before converting should arrive as one session
 * of four pageviews, not one of one.
 */
export function recordPageview(path: string): void {
  if (typeof window === "undefined") return;

  const now = Date.now();
  let rec = read();

  const idle = rec ? now - rec.last_at > IDLE_MS : false;
  // A campaign captured after this session began is a new click, and a new
  // click is a new visit — otherwise the second campaign's leads would carry
  // the first campaign's pageview history.
  const ft = readFirstTouch();
  const reclicked = !!(rec && ft && ft.at > rec.started_at);

  if (!rec || idle || reclicked) rec = start(now);

  const clean = String(path || "/").slice(0, MAX_PATH_LEN);
  const last = rec.views[rec.views.length - 1];
  // Guard against a re-render or a replaceState recording the same page twice.
  if (!last || last.path !== clean) {
    rec.views.push({ path: clean, at: now });
    rec.count += 1;
    if (rec.views.length > MAX_PAGEVIEWS) rec.views = rec.views.slice(-MAX_PAGEVIEWS);
  }

  rec.last_at = now;
  write(rec);
}

/** The session as sent to Clarion. Timestamps are ISO — a CRM reads those. */
export type SessionPayload = {
  id: string;
  started_at: string;
  last_activity_at: string;
  pageview_count: number;
  pageviews: { path: string; at: string }[];
};

/**
 * Build the `session` object for a submission, or null when there is nothing
 * worth sending (no session recorded, or storage unavailable).
 *
 * Deliberately does NOT repeat the campaign, landing page or referrer: those
 * are already flat top-level fields on the submission, and two copies of the
 * same fact is two things to disagree.
 *
 * ⚠️ `id` is this site's own session id. It is a UUID and it is NOT
 * `ctm_visitor_sid`. CTM's id is 24 hex characters with no dashes and lives at
 * the top level of the payload. Never substitute one for the other — sending a
 * UUID as the CTM id files the lead against a visit that does not exist.
 */
export function sessionPayload(): SessionPayload | null {
  const rec = read();
  if (!rec || !rec.count) return null;

  const build = (views: Pageview[]): SessionPayload => ({
    id: rec.id,
    started_at: new Date(rec.started_at).toISOString(),
    last_activity_at: new Date(rec.last_at).toISOString(),
    pageview_count: rec.count,
    pageviews: views.map((v) => ({ path: v.path, at: new Date(v.at).toISOString() })),
  });

  // Shed oldest pageviews until the object fits. The most recent pages are the
  // ones that led to the conversion, so they are the ones worth keeping.
  let views = rec.views;
  let out = build(views);
  while (views.length > 1 && JSON.stringify(out).length > MAX_BYTES) {
    views = views.slice(Math.ceil(views.length / 2));
    out = build(views);
  }
  return out;
}
