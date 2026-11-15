import type { MetadataRoute } from "next";
import { getContent } from "@/lib/content";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const { settings } = await getContent();
  return {
    name: settings.name,
    short_name: "Faust",
    description: settings.seoDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#fafafa",
    theme_color: "#000000",
    lang: "en",
    dir: "ltr",
    categories: ["business", "productivity", "developer"],
    icons: [
      {
        src: "/images/people/avatar.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/people/avatar.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
