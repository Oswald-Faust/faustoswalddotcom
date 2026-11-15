import type { Metadata } from "next";
import { LegalPage } from "@/components/site/LegalPage";
import { privacySource } from "@/content/legal";
import { getLocalizedContent } from "@/i18n/locale";
import { formatDate } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";

export const instant = false;

export async function generateMetadata(): Promise<Metadata> {
  const { content, locale, ui } = await getLocalizedContent();
  return pageMetadata({
    settings: content.settings,
    locale,
    title: ui.privacyTitle,
    description: ui.privacyDescription,
    path: "/privacy-policy",
  });
}

export default async function PrivacyPage() {
  const { locale, ui } = await getLocalizedContent();
  return (
    <LegalPage
      title={ui.privacyTitle}
      updated={formatDate("2026-08-16", locale)}
      updatedLabel={ui.lastUpdated}
      source={privacySource}
    />
  );
}
