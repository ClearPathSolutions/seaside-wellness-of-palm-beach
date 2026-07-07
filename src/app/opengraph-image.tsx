import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt =
  "Seaside Wellness — luxury addiction & mental health treatment in West Palm Beach, FL";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          background: "linear-gradient(135deg, #21393b 0%, #35302d 60%, #182b2c 100%)",
          color: "#f8f7f3",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#d8c193",
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
              color: "rgba(248,247,243,0.85)",
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
          <div style={{ display: "flex", width: 40, height: 4, background: "#c7ac7b" }} />
          <div style={{ display: "flex", color: "#d8c193" }}>{site.phone}</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
