import { ImageResponse } from "next/og";

export const alt = "Liays Inc — Websites & Notion Systems for Winnipeg Businesses";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "90px",
          backgroundColor: "#0a0a0c",
          backgroundImage:
            "radial-gradient(circle at 82% 18%, rgba(91,76,255,0.35), transparent 55%), radial-gradient(circle at 8% 92%, rgba(255,77,28,0.28), transparent 50%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 40,
            fontWeight: 700,
            color: "#f7f6f2",
            letterSpacing: -1,
          }}
        >
          Liays
          <span style={{ color: "#ff4d1c" }}>.</span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: 66,
            fontWeight: 700,
            color: "#f7f6f2",
            lineHeight: 1.12,
            letterSpacing: -2,
            maxWidth: 920,
          }}
        >
          We build the site. We teach the system.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 28,
            color: "rgba(247,246,242,0.65)",
            maxWidth: 760,
          }}
        >
          Websites from $999 and hands-on Notion training for Winnipeg businesses.
        </div>
      </div>
    ),
    { ...size }
  );
}
