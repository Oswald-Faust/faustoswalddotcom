import { Dock } from "@/components/site/Dock";
import { Footer } from "@/components/site/Footer";
import { Nav } from "@/components/site/Nav";
import { getLocalizedContent } from "@/i18n/locale";

export const instant = false;

export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const { content, locale, ui } = await getLocalizedContent();
  const { settings } = content;

  return (
    <>
      <a
        href="#main"
        className="t-label sr-only z-[60] rounded-full bg-ink px-4 py-3 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {ui.skip}
      </a>
      <Nav
        name={settings.name}
        email={settings.email}
        locale={locale}
        copy={{
          navLabel: ui.navLabel,
          home: ui.home,
          projects: ui.projects,
          services: ui.services,
          pricing: ui.pricing,
          blog: ui.blog,
          contact: ui.contact,
          openMenu: ui.openMenu,
          closeMenu: ui.closeMenu,
          language: ui.language,
          languages: ui.languages,
        }}
      />
      <main id="main">{children}</main>
      <Footer content={content} copy={ui} />
      <Dock
        email={settings.email}
        calUrl={settings.calUrl}
        awardTitle={settings.awardTitle}
        awardSubtitle={settings.awardSubtitle}
        talkTitle={ui.talkTitle}
        talkText={ui.talkText}
        emailLabel={ui.emailMe}
        callLabel={ui.bookCall}
      />
    </>
  );
}
