import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import type { SiteContent } from "@/content/types";
import type { UiCopy } from "@/i18n/ui";
import { CurrentYear, LocalTime } from "./interactive";
import { FadeIn, RotatingWord } from "./motion";

export function SocialLinks({
  settings,
  tone = "dark",
  followersLabel = "followers",
}: {
  settings: SiteContent["settings"];
  tone?: "dark" | "photo";
  followersLabel?: string;
}) {
  const round =
    tone === "dark"
      ? "bg-white text-ink"
      : "bg-black/50 text-white backdrop-blur-md";
  const pill =
    tone === "dark"
      ? "bg-white/10 text-white"
      : "bg-black/50 text-white backdrop-blur-md";
  return (
    <ul className="flex items-center gap-1.5">
      <li>
        <a
          href={settings.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className={`grid size-[30px] place-items-center rounded-full transition-transform duration-300 hover:-translate-y-0.5 ${round}`}
        >
          <FaInstagram className="size-3.5" />
        </a>
      </li>
      <li>
        <a
          href={settings.x}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X (Twitter)"
          className={`grid size-[30px] place-items-center rounded-full transition-transform duration-300 hover:-translate-y-0.5 ${round}`}
        >
          <FaXTwitter className="size-3.5" />
        </a>
      </li>
      <li>
        <a
          href={settings.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`LinkedIn, ${settings.linkedinFollowers} ${followersLabel}`}
          className={`t-cap flex h-[30px] items-center gap-1.5 rounded-full px-2.5 transition-transform duration-300 hover:-translate-y-0.5 ${pill}`}
        >
          <FaLinkedinIn className="size-3.5" />
          {settings.linkedinFollowers}
        </a>
      </li>
      <li>
        <a
          href={settings.facebook}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Facebook, ${settings.facebookFollowers} ${followersLabel}`}
          className={`t-cap flex h-[30px] items-center gap-1.5 rounded-full px-2.5 transition-transform duration-300 hover:-translate-y-0.5 ${pill}`}
        >
          <FaFacebookF className="size-3" />
          {settings.facebookFollowers}
        </a>
      </li>
    </ul>
  );
}

export function Footer({ content, copy }: { content: SiteContent; copy: UiCopy }) {
  const { settings, footer } = content;
  const menu = [
    { href: "/projects", label: copy.work },
    { href: "/#services", label: copy.services },
    { href: "/#pricing", label: copy.pricing },
    { href: "/blog", label: copy.blog },
    { href: "/cv", label: copy.cv },
    { href: "/terms", label: copy.terms },
    { href: "/privacy-policy", label: copy.privacy },
  ];

  return (
    <footer className="on-dark overflow-hidden bg-ink text-white">
      <div className="shell pt-16 md:pt-16">
        <p className="t-display">
          <span className="block">
            {footer.titleLead}{" "}
            <RotatingWord words={footer.rotatingWords} />
          </span>
          <span className="block text-muted">{footer.titleEnd}</span>
        </p>

        <div className="mt-12 grid gap-8 border-b border-white/15 pb-10 sm:grid-cols-3">
          <div>
            <p className="t-label text-muted">{footer.emailLabel}</p>
            <a
              href={`mailto:${settings.email}`}
              className="t-body-lg mt-2.5 inline-block break-all underline-offset-4 hover:underline"
            >
              {settings.email}
            </a>
          </div>
          <div>
            <p className="t-label text-muted">{footer.callLabel}</p>
            <a
              href={settings.calUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="t-body-lg mt-2.5 inline-block underline-offset-4 hover:underline"
            >
              {footer.callCta}
            </a>
          </div>
          <div>
            <p className="t-label text-muted">{footer.socialLabel}</p>
            <div className="mt-4">
              <SocialLinks settings={settings} followersLabel={copy.followers} />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-6 pt-6">
          <nav aria-label={copy.footerNav}>
            <p className="t-cap text-muted">{copy.menu}</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 sm:grid-cols-3">
              {menu.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="t-cap underline-offset-4 hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="t-cap flex flex-col items-start gap-2.5 text-[#b8b8b8] sm:items-end">
            <LocalTime timezone={settings.timezone} city={settings.city} label={copy.localTime} />
            <span>
              © <CurrentYear fallback={2026} /> {settings.name}
            </span>
          </div>
        </div>

        <FadeIn y={80} blur={false} className="-mb-[0.33em] mt-4 select-none">
          <p
            aria-hidden
            className="whitespace-nowrap text-center font-medium leading-none tracking-[-0.03em]"
            style={{ fontSize: "clamp(5rem, 30.6vw, 21.2rem)" }}
          >
            {footer.wordmark}
          </p>
        </FadeIn>
      </div>
    </footer>
  );
}
