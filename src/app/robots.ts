import type { MetadataRoute } from "next";
import { getContent } from "@/lib/content";

/**
 * Search-engine and AI crawler policy.
 * Public pages are fully open; admin, APIs and private media stay closed.
 */
export default async function robots(): Promise<MetadataRoute.Robots> {
  const { settings } = await getContent();
  const host = settings.siteUrl.replace(/\/$/, "");

  const blocked = ["/admin/", "/api/", "/media/"];

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/images/"],
        disallow: blocked,
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: blocked,
      },
      {
        userAgent: "Googlebot-Image",
        allow: ["/images/", "/"],
        disallow: blocked,
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: blocked,
      },
      {
        userAgent: "DuckDuckBot",
        allow: "/",
        disallow: blocked,
      },
      // Keep the site visible to major AI crawlers (citations / discovery).
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: blocked,
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: blocked,
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: blocked,
      },
      {
        userAgent: "Anthropic-AI",
        allow: "/",
        disallow: blocked,
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: blocked,
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: blocked,
      },
      {
        userAgent: "Applebot",
        allow: "/",
        disallow: blocked,
      },
      {
        userAgent: "Applebot-Extended",
        allow: "/",
        disallow: blocked,
      },
    ],
    sitemap: `${host}/sitemap.xml`,
    host,
  };
}
