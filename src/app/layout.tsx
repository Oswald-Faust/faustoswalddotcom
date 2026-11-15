import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { JsonLd } from "@/components/site/JsonLd";
import { getLocalizedContent } from "@/i18n/locale";
import {
  absoluteUrl,
  OG_IMAGE,
  pageMetadata,
  personJsonLd,
  professionalServiceJsonLd,
  websiteJsonLd,
} from "@/lib/seo";
import "./globals.css";

export const instant = false;

const switzer = localFont({
  src: "../fonts/Switzer-Variable.woff2",
  variable: "--font-switzer",
  weight: "100 900",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const { content, locale } = await getLocalizedContent();
  const { settings } = content;
  const shared = pageMetadata({
    settings,
    locale,
    title: settings.seoTitle,
    description: settings.seoDescription,
    path: "/",
  });

  return {
    ...shared,
    metadataBase: new URL(settings.siteUrl),
    title: { default: settings.seoTitle, template: `%s — ${settings.name}` },
    icons: {
      icon: [{ url: "/images/people/avatar.png", type: "image/png" }],
      apple: [{ url: "/images/people/avatar.png" }],
      shortcut: ["/images/people/avatar.png"],
    },
    manifest: "/manifest.webmanifest",
    other: {
      "geo.region": "BJ",
      "geo.placename": settings.city,
    },
    openGraph: {
      ...shared.openGraph,
      images: [
        {
          url: absoluteUrl(settings.siteUrl, OG_IMAGE),
          width: 1200,
          height: 630,
          alt: settings.name,
        },
      ],
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
  ],
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const { content, locale } = await getLocalizedContent();
  const { settings } = content;

  return (
    <html lang={locale} className={`${switzer.variable} antialiased`}>
      <body>
        <JsonLd
          data={[
            personJsonLd(settings),
            websiteJsonLd(settings),
            professionalServiceJsonLd(settings),
          ]}
        />
        {children}
      </body>
    </html>
  );
}
