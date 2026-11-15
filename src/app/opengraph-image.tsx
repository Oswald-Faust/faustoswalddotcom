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
          padding: 64,
          backgroundColor: "#050505",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              backgroundColor: "#222222",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 700,
              marginRight: 18,
            }}
          >
            FO
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              fontWeight: 600,
              letterSpacing: "-0.02em",
            }}
          >
            {settings.name}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 980,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 64,
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              marginBottom: 18,
            }}
          >
            Building products that pay off.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: "#b8b8b8",
              lineHeight: 1.35,
              letterSpacing: "-0.02em",
              maxWidth: 820,
            }}
          >
            {`${settings.role} · ${settings.city} · Web, mobile, SaaS & AI`}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#8a8a8a",
            letterSpacing: "-0.01em",
          }}
        >
          <div style={{ display: "flex" }}>faustoswald.com</div>
          <div style={{ display: "flex" }}>Awwwards Young Jury</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
