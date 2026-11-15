import { ImageResponse } from "next/og";
import { getContent } from "@/lib/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Faust Oswald — Product Software Engineer";

export default async function OpenGraphImage() {
  const { settings } = await getContent();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background: "#050505",
          color: "#ffffff",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: "-0.02em",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 999,
              background: "#222",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
            }}
          >
            FO
          </div>
          {settings.name}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 980 }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 560,
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
            }}
          >
            Building products that pay off.
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#b8b8b8",
              lineHeight: 1.35,
              letterSpacing: "-0.02em",
              maxWidth: 820,
            }}
          >
            {settings.role} · {settings.city} · Web, mobile, SaaS & AI
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#8a8a8a",
            letterSpacing: "-0.01em",
          }}
        >
          <span>faustoswald.com</span>
          <span>Awwwards Young Jury</span>
        </div>
      </div>
    ),
    size,
  );
}
