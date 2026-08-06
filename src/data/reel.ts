/**
 * On-screen text from the vertical brand reel (`public/video/seaside-reel.mp4`).
 *
 * Same reasoning as `brand-film.ts`: the reel carries part of its narrative in
 * burned-in text cards, and **burned-in text is an image**, so that narrative is
 * invisible to a screen reader. The text alternative below closes that gap.
 *
 * Recovered by sampling frames at 1.5–2 fps across the 57s runtime and reading
 * each card. Card timings are accurate to about ±0.3s.
 *
 * ⚠️ NO CAPTION TRACK IS SHIPPED FOR THIS FILE, DELIBERATELY.
 *
 * Frame sampling shows an on-camera interview at roughly 33–35s — a man speaking
 * directly to camera — and the text cards plainly do not caption him. Publishing
 * a `<track kind="captions" default>` built only from the cards would assert
 * complete English captions over a clip containing untranscribed speech, which
 * is a worse failure than shipping none: it removes the reader's cue that
 * anything is missing. Captions need the interview transcribed by someone who
 * can hear it. Tracked as VID-2 in ISSUES.md.
 *
 * The cards themselves are progressive, not cumulative — each shows only its new
 * fragment — so unlike the brand film's closing card they transcribe literally
 * without stuttering.
 */

/** The two sentences the cards spell out, as continuous prose. */
export const reelTranscript: string[] = [
  "Meaningful change can happen.",
  "Because no matter how difficult today may feel, a different tomorrow is possible.",
];
