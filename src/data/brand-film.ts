/**
 * Transcript of the brand film's on-screen narrative.
 *
 * The film tells its story almost entirely through full-screen text cards. That
 * matters for accessibility in a way that is easy to miss: **burned-in text is
 * an image**, so the film's entire narrative is invisible to screen-reader
 * users. A text alternative is therefore required regardless of the audio.
 *
 * Timings were measured from the file by sampling frames and detecting the
 * near-white card frames (`signalstats` luminance), then reading each card. They
 * are accurate to about ±0.5s — fine for cue boundaries, and each cue is held
 * generously so nothing disappears early.
 *
 * ⚠️ Two caveats, both tracked under SW-007 in ISSUES.md:
 *
 * 1. **This is the on-screen text, not a transcript of the audio.** The file is
 *    named "…V2-VOICEOVER", so a narrator very likely reads these same words —
 *    but that has not been verified by anyone who can hear it. If the voiceover
 *    says more than the cards, or if the on-camera conversations carry dialogue,
 *    the caption track is incomplete and needs extending.
 * 2. **The film misspells "Dependence" as "Dependance"** on the condition card.
 *    The transcript below uses the correct spelling; the video itself needs
 *    re-rendering to fix it at source.
 *
 * If you edit these cues, regenerate the WebVTT file — see
 * `scripts/build-vtt.mjs`.
 */

export type Cue = { start: number; end: number; text: string };

/** The brand film, 179s. Cards appear in seven groups separated by footage. */
export const brandFilmCues: Cue[] = [
  { start: 9.5, end: 12.0, text: "It can feel overwhelming" },
  { start: 12.0, end: 13.0, text: "not just for them" },
  { start: 13.0, end: 15.0, text: "but for the people who love them most." },

  { start: 18.5, end: 20.0, text: "But there is hope" },
  { start: 20.0, end: 22.5, text: "and there is help." },

  { start: 33.5, end: 35.0, text: "Including anxiety," },
  { start: 35.0, end: 36.0, text: "depression," },
  { start: 36.0, end: 37.0, text: "PTSD," },
  { start: 37.0, end: 38.0, text: "bipolar disorder," },
  { start: 38.0, end: 40.5, text: "substance dependence." },

  { start: 98.0, end: 99.5, text: "What truly defines" },
  { start: 99.5, end: 100.5, text: "Seaside Wellness" },
  { start: 100.5, end: 102.0, text: "is our team." },

  { start: 112.0, end: 114.0, text: "Recovery isn't just about" },
  { start: 114.0, end: 116.5, text: "stopping a behavior." },

  { start: 128.0, end: 130.5, text: "It's about understanding the root causes," },
  { start: 130.5, end: 132.5, text: "rebuilding confidence," },
  { start: 132.5, end: 134.5, text: "learning the tools" },
  { start: 134.5, end: 136.0, text: "needed to move" },
  { start: 136.0, end: 139.0, text: "forward in life." },

  // One cue, not three. On screen this card builds up word by word — "Stability,"
  // then "stability, clarity," then the full line — but a caption track is not an
  // animation. Transcribed literally it replays "stability, clarity" three times
  // in four seconds, which reads as a stutter. Held for the whole card instead.
  { start: 154.0, end: 158.0, text: "Stability, clarity, and hope for their future." },
];

/**
 * The transcript as continuous prose, for the on-page text alternative.
 * Reads as sentences rather than as cue fragments.
 */
export const brandFilmTranscript: string[] = [
  "It can feel overwhelming — not just for them, but for the people who love them most.",
  "But there is hope, and there is help.",
  "Including anxiety, depression, PTSD, bipolar disorder, substance dependence.",
  "What truly defines Seaside Wellness is our team.",
  "Recovery isn't just about stopping a behavior. It's about understanding the root causes, rebuilding confidence, learning the tools needed to move forward in life.",
  "Stability, clarity, and hope for their future.",
];
