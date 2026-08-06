import { ImageResponse } from "next/og";
import { site } from "@/lib/site";
import { OG_IMAGE_ALT, OG_IMAGE_CONTENT_TYPE, OG_IMAGE_SIZE } from "@/lib/og";


export const alt = OG_IMAGE_ALT;
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

/* Brand tokens, mirrored from globals.css. `next/og` can't read CSS custom
   properties, so these are literals — kept in sync with @theme by hand.
   The seafoam values are the current brand; the card previously still carried
   the pre-rebrand warm gold (#d8c193 / #c7ac7b / #35302d). */
const INK = "#282d33"; // --color-ink
const OCEAN_700 = "#21393b"; // --color-ocean-700
const OCEAN_800 = "#182b2c"; // --color-ocean-800
const CREAM = "#f5f6f7"; // --color-cream
const SEAFOAM = "#98c8b8"; // --color-gold-300
const SEAFOAM_DEEP = "#6fae9b"; // --color-gold-400

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: `linear-gradient(135deg, ${OCEAN_700} 0%, ${INK} 60%, ${OCEAN_800} 100%)`,
          color: CREAM,
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: SEAFOAM,
            fontFamily: "sans-serif",
          }}
        >
          West Palm Beach, Florida
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 84, lineHeight: 1.05, fontWeight: 600 }}>
            Seaside Wellness
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 38,
              color: "rgba(245,246,247,0.85)",
              maxWidth: 900,
              fontFamily: "sans-serif",
            }}
          >
            Luxury addiction &amp; mental health treatment — evidence-based care by the water.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontSize: 28,
            fontFamily: "sans-serif",
          }}
        >
          <div style={{ display: "flex", width: 40, height: 4, background: SEAFOAM_DEEP }} />
          <div style={{ display: "flex", color: SEAFOAM }}>{site.phone}</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
