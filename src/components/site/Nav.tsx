"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/types";
import { cn } from "@/lib/cn";
import { LanguageSwitch } from "./LanguageSwitch";

type NavCopy = {
  navLabel: string;
  home: string;
  projects: string;
  services: string;
  pricing: string;
  blog: string;
  contact: string;
  openMenu: string;
  closeMenu: string;
  language: string;
  languages: Record<Locale, string>;
};

/**
 * Floating glass pill. Full at the top of the page, it folds down to
 * avatar + name + three dots once you scroll, and unfolds again on hover or
 * keyboard focus. Below `md` the dots open a small menu sheet.
 */
export function Nav({
  name,
  email,
  locale,
  copy,
}: {
  name: string;
  email: string;
  locale: Locale;
  copy: NavCopy;
}) {
  const links = [
    { href: "/projects", label: copy.projects },
    { href: "/#services", label: copy.services },
    { href: "/#pricing", label: copy.pricing },
    { href: "/blog", label: copy.blog },
  ];
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const collapsed = scrolled && !hovered;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4 md:top-6">
      <nav
        aria-label={copy.navLabel}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        className="pointer-events-auto relative flex items-center rounded-[32px] bg-white/55 p-3 ring-1 ring-black/[0.05] backdrop-blur-xl backdrop-saturate-150"
      >
        <Link href="/" className="flex items-center gap-2 pr-1" aria-label={`${name} — ${copy.home}`}>
          <Image
            src="/images/people/avatar.png"
            alt=""
            width={64}
            height={64}
            className="size-8 rounded-full object-cover"
            priority
          />
          <span className="t-label whitespace-nowrap">{name}</span>
        </Link>

        <LanguageSwitch
          locale={locale}
          label={copy.language}
          names={copy.languages}
          className="ml-3"
        />

        {/* Desktop links: collapse to zero width with a grid track transition */}
        <div
          className={cn(
            "hidden transition-[grid-template-columns,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:grid",
            collapsed ? "grid-cols-[0fr] opacity-0" : "grid-cols-[1fr] opacity-100",
          )}
          aria-hidden={collapsed}
        >
          <div className="flex min-w-0 items-center overflow-hidden">
            <ul className="flex items-center gap-4 pl-7 pr-4">
              {links.map((link) => {
                const active = !link.href.includes("#") && pathname.startsWith(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      tabIndex={collapsed ? -1 : undefined}
                      className={cn(
                        "t-label relative whitespace-nowrap transition-colors hover:text-soft",
                        "after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:bg-current after:transition-transform after:duration-300",
                        active ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <a
              href={`mailto:${email}`}
              tabIndex={collapsed ? -1 : undefined}
              className="t-label inline-flex h-8 items-center whitespace-nowrap rounded-full bg-bg px-[18px] shadow-card transition-transform duration-300 hover:-translate-y-0.5"
            >
              {copy.contact}
            </a>
          </div>
        </div>

        {/* Dots: always on mobile, only when folded on desktop */}
        <div
          className={cn(
            "grid transition-[grid-template-columns,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            collapsed
              ? "md:grid-cols-[1fr] md:opacity-100"
              : "md:grid-cols-[0fr] md:opacity-0",
          )}
        >
          <div className="min-w-0 overflow-hidden">
            <button
              type="button"
              aria-label={menuOpen ? copy.closeMenu : copy.openMenu}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="ml-5 flex h-8 items-center gap-[3px] px-2 md:pointer-events-none"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={cn(
                    "size-1.5 rounded-full transition-colors duration-300",
                    i === 1 ? "bg-ink" : "bg-muted",
                    menuOpen && "bg-ink",
                  )}
                />
              ))}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(8px)" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 top-full mt-2 rounded-3xl bg-white/90 p-2 shadow-float ring-1 ring-black/[0.05] backdrop-blur-xl md:hidden"
            >
              <ul>
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="t-label block rounded-2xl px-4 py-3 active:bg-tint"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href={`mailto:${email}`}
                    className="t-label mt-1 block rounded-2xl bg-ink px-4 py-3 text-center text-white"
                  >
                    {copy.contact}
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
