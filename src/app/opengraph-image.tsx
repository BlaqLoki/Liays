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
          backgroundColor: "#12160f",
          backgroundImage:
            "radial-gradient(circle at 82% 18%, rgba(199,154,62,0.35), transparent 55%), radial-gradient(circle at 8% 92%, rgba(213,100,47,0.28), transparent 50%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 40,
            fontWeight: 700,
            color: "#f5efe3",
            letterSpacing: -1,
          }}
        >
          Liays
          <span style={{ color: "#d5642f" }}>.</span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: 66,
            fontWeight: 700,
            color: "#f5efe3",
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
            color: "rgba(245,239,227,0.65)",
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
