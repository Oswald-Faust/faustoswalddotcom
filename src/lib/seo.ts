import type { Metadata } from "next";
import type { SiteContent } from "@/content/types";
import type { Locale } from "@/i18n/types";

export const OG_IMAGE = "/images/people/portrait.png";

export function absoluteUrl(siteUrl: string, path = "/"): string {
  const base = siteUrl.replace(/\/$/, "");
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function siteRobots(): NonNullable<Metadata["robots"]> {
  return {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  };
}

export function pageMetadata({
  settings,
  locale,
  title,
  description,
  path = "/",
  images,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
}: {
  settings: SiteContent["settings"];
  locale: Locale;
  title: string;
  description: string;
  path?: string;
  images?: string[];
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
}): Metadata {
  const url = absoluteUrl(settings.siteUrl, path);
  const ogImages = (images?.length ? images : [OG_IMAGE]).map((src) => ({
    url: src.startsWith("http") ? src : absoluteUrl(settings.siteUrl, src),
    width: 1200,
    height: 630,
    alt: title,
  }));

  return {
    title,
    description,
    applicationName: settings.name,
    authors: [{ name: settings.name, url: settings.siteUrl }],
    creator: settings.name,
    publisher: settings.name,
    category: "technology",
    keywords: [
      settings.name,
      "Product Software Engineer",
      "Fullstack",
      "Next.js",
      "React",
      "SaaS",
      "AI",
      "Cotonou",
      "Benin",
      "Framer",
      "Mobile apps",
    ],
    alternates: {
      canonical: url,
      languages: {
        en: url,
        fr: url,
        "x-default": url,
      },
    },
    robots: siteRobots(),
    openGraph: {
      title,
      description,
      url,
      siteName: settings.name,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? ["en_US"] : ["fr_FR"],
      type,
      images: ogImages,
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
      ...(authors ? { authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImages.map((image) => image.url),
      creator: "@OswaldFaust2",
    },
  };
}

export function personJsonLd(settings: SiteContent["settings"]) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${absoluteUrl(settings.siteUrl)}/#person`,
    name: settings.name,
    url: settings.siteUrl,
    image: absoluteUrl(settings.siteUrl, OG_IMAGE),
    jobTitle: settings.role,
    email: settings.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: settings.city,
      addressCountry: "BJ",
    },
    sameAs: [
      settings.linkedin,
      settings.x,
      settings.instagram,
      settings.facebook,
      "https://github.com/Oswald-Faust",
      "https://www.awwwards.com/",
    ].filter(Boolean),
    knowsAbout: [
      "Product engineering",
      "Web applications",
      "Mobile applications",
      "SaaS",
      "Artificial intelligence",
      "Next.js",
      "React",
      "TypeScript",
    ],
  };
}

export function websiteJsonLd(settings: SiteContent["settings"]) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${absoluteUrl(settings.siteUrl)}/#website`,
    url: settings.siteUrl,
    name: settings.name,
    description: settings.seoDescription,
    inLanguage: ["en", "fr"],
    publisher: { "@id": `${absoluteUrl(settings.siteUrl)}/#person` },
    potentialAction: {
      "@type": "SearchAction",
      target: `${absoluteUrl(settings.siteUrl, "/projects")}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function professionalServiceJsonLd(settings: SiteContent["settings"]) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${absoluteUrl(settings.siteUrl)}/#service`,
    name: `${settings.name} — Product Software Engineering`,
    url: settings.siteUrl,
    image: absoluteUrl(settings.siteUrl, OG_IMAGE),
    description: settings.seoDescription,
    email: settings.email,
    priceRange: "€€",
    areaServed: "Worldwide",
    address: {
      "@type": "PostalAddress",
      addressLocality: settings.city,
      addressCountry: "BJ",
    },
    founder: { "@id": `${absoluteUrl(settings.siteUrl)}/#person` },
    sameAs: [settings.linkedin, settings.x].filter(Boolean),
  };
}

export function breadcrumbJsonLd(
  settings: SiteContent["settings"],
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(settings.siteUrl, item.path),
    })),
  };
}

export function articleJsonLd({
  settings,
  title,
  description,
  path,
  cover,
  date,
  author,
}: {
  settings: SiteContent["settings"];
  title: string;
  description: string;
  path: string;
  cover?: string;
  date: string;
  author: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: absoluteUrl(settings.siteUrl, path),
    image: cover ? absoluteUrl(settings.siteUrl, cover) : absoluteUrl(settings.siteUrl, OG_IMAGE),
    datePublished: date,
    dateModified: date,
    author: {
      "@type": "Person",
      name: author,
      url: settings.siteUrl,
    },
    publisher: {
      "@type": "Person",
      name: settings.name,
      url: settings.siteUrl,
      image: absoluteUrl(settings.siteUrl, OG_IMAGE),
    },
    mainEntityOfPage: absoluteUrl(settings.siteUrl, path),
    inLanguage: ["en", "fr"],
  };
}

export function projectJsonLd({
  settings,
  title,
  description,
  path,
  cover,
  year,
  client,
}: {
  settings: SiteContent["settings"];
  title: string;
  description: string;
  path: string;
  cover: string;
  year: string;
  client: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: title,
    description,
    url: absoluteUrl(settings.siteUrl, path),
    image: absoluteUrl(settings.siteUrl, cover),
    dateCreated: year,
    creator: { "@id": `${absoluteUrl(settings.siteUrl)}/#person` },
    about: client,
    inLanguage: ["en", "fr"],
  };
}
