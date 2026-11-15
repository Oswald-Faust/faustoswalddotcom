import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { Clock } from "@/components/cv/Clock";
import { Greeting } from "@/components/cv/Greeting";
import { PrintButton } from "@/components/cv/PrintButton";
import { ProjectRows } from "@/components/cv/ProjectRows";
import { TextLink, plainText, tokenize } from "@/components/cv/rich";
import type { CvRow } from "@/content/types";
import { LanguageSwitch } from "@/components/site/LanguageSwitch";
import { getLocalizedContent } from "@/i18n/locale";
import { pageMetadata } from "@/lib/seo";

export const instant = false;

export async function generateMetadata(): Promise<Metadata> {
  const { content, locale } = await getLocalizedContent();
  const { cv, settings } = content;
  return pageMetadata({
    settings,
    locale,
    title: cv.pageTitle,
    description: cv.seoDescription,
    path: "/cv",
    type: "profile",
  });
}

/** "2025 - 2026" → "2025–2026" */
const range = (value: string) => value.replace(/\s*-\s*/g, "–");

/** "2026-08-16" → "Aug 16, 2026" or "16 août 2026" */
function shortDate(iso: string, locale: "en" | "fr") {
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

/** "https://www.linkedin.com/in/faust-oswald/" → "faust-oswald" */
const handle = (url: string) => url.replace(/\/+$/, "").split("/").pop() ?? url;

/**
 * A one-liner from a case-study description: its first sentence, minus the
 * "Name is" opening. Falls back to the tagline when the sentence has another shape.
 */
function oneLiner(description: string, fallback: string) {
  const sentence = description.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? "";
  const rest = sentence.match(/^.+? is (an? .+?)[.!?]$/)?.[1];
  return rest ? rest.charAt(0).toUpperCase() + rest.slice(1) : fallback;
}

/** Staggers the entrance of each block. */
const enter = (index: number) => ({ "--i": index }) as CSSProperties;

function Section({
  label,
  index,
  children,
}: {
  label: string;
  index: number;
  children: ReactNode;
}) {
  return (
    <section className="cv-enter cv-section" style={enter(index)}>
      <h2 className="cv-label">{label}</h2>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

/** Who · what · when, with a monogram in place of a logo. */
function Rows({ items }: { items: CvRow[] }) {
  return (
    <ul>
      {items.map((item) => {
        const content = (
          <>
            <span aria-hidden className="cv-logo">
              {item.name.charAt(0)}
            </span>
            <span className="cv-name">{item.name}</span>
            <span className="cv-role">{item.role}</span>
            <span className="cv-mono cv-num">{range(item.period)}</span>
          </>
        );
        return (
          <li key={`${item.name}-${item.period}`}>
            {item.url ? (
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="cv-row cv-row--entity">
                {content}
              </a>
            ) : (
              <div className="cv-row cv-row--entity">{content}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function More({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="cv-more group print:hidden">
      {children}
      <span aria-hidden className="transition-transform duration-150 group-hover:translate-x-0.5">
        →
      </span>
    </Link>
  );
}

export default async function CvPage() {
  const { content, locale, ui } = await getLocalizedContent();
  const { settings, about, projects, blog, footer, cv } = content;
  const { labels } = cv;

  const selected = cv.projectSlugs.length
    ? cv.projectSlugs.flatMap((slug) => projects.find((project) => project.slug === slug) ?? [])
    : projects.filter((project) => project.featured);
  const posts = [...blog.posts].sort((a, b) => b.date.localeCompare(a.date));
  const greeting = tokenize(cv.greeting);
  const paragraphs = cv.bio
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
  const elsewhere = [
    { name: "X", handle: `@${handle(settings.x)}`, href: settings.x },
    { name: "GitHub", handle: handle(cv.github), href: cv.github },
    { name: "LinkedIn", handle: handle(settings.linkedin), href: settings.linkedin },
    { name: footer.emailLabel, handle: settings.email, href: `mailto:${settings.email}` },
  ].filter((link) => link.href && link.href !== "mailto:");

  let block = 2;

  return (
    <div className="mx-auto max-w-[640px] px-5 sm:px-6">
      <header className="cv-enter flex items-start justify-between gap-6 pt-[72px] sm:pt-[120px] print:pt-0" style={enter(0)}>
        <div>
          <p className="font-medium tracking-[-0.01em]">
            <Link href="/">{settings.name}</Link>
          </p>
          <p className="text-balance text-(--cv-fg2)">{cv.subtitle}</p>
        </div>
        <div className="flex flex-col items-end gap-3 text-end text-(--cv-fg2)">
          <p className="flex flex-col items-end whitespace-nowrap">
            <span>{settings.city}</span>
            <Clock timezone={settings.timezone} />
          </p>
          <LanguageSwitch
            locale={locale}
            label={ui.language}
            names={ui.languages}
            className="print:hidden"
          />
        </div>
      </header>

      <main id="main">
        <section className="cv-enter mt-12 sm:mt-16 print:mt-6" style={enter(1)}>
          <Greeting tokens={greeting} avatar={about.portrait} label={plainText(greeting)} />
          <div className="mt-4 flex flex-col gap-6 text-[15px] leading-[1.6] text-pretty text-(--cv-fg2) print:mt-2 print:gap-2 print:text-[12px]">
            {paragraphs.map((paragraph, i) => (
              <p key={i}>
                {tokenize(paragraph).map((token, j) =>
                  token.type === "link" ? (
                    <TextLink key={j} href={token.href} className="cv-link">
                      {token.text}
                    </TextLink>
                  ) : token.type === "text" ? (
                    token.text
                  ) : null,
                )}
              </p>
            ))}
          </div>
        </section>

        {selected.length > 0 && (
          <Section label={labels.projects} index={block++}>
            <ProjectRows
              items={selected.map((project) => ({
                href: `/projects/${project.slug}`,
                name: project.title,
                text: oneLiner(project.description, project.tagline),
                cover: project.cover,
              }))}
            />
            <More href="/projects">{labels.allProjects}</More>
          </Section>
        )}

        {cv.work.length > 0 && (
          <Section label={labels.work} index={block++}>
            <Rows items={cv.work} />
          </Section>
        )}

        {cv.education.length > 0 && (
          <Section label={labels.education} index={block++}>
            <Rows items={cv.education} />
          </Section>
        )}

        {cv.involvements.length > 0 && (
          <Section label={labels.involvements} index={block++}>
            <Rows items={cv.involvements} />
          </Section>
        )}

        {cv.skills.length + cv.languages.length > 0 && (
          <Section label={labels.skills} index={block++}>
            <dl>
              {[
                ...cv.skills,
                ...(cv.languages.length
                  ? [
                      {
                        label: labels.languages,
                        list: cv.languages
                          .map((language) => (language.level ? `${language.name} (${language.level})` : language.name))
                          .join(", "),
                      },
                    ]
                  : []),
              ].map((group) => (
                <div key={group.label} className="cv-skill">
                  <dt className="font-medium">{group.label}</dt>
                  <dd className="text-(--cv-fg2)">{group.list}</dd>
                </div>
              ))}
            </dl>
          </Section>
        )}

        {posts.length > 0 && (
          <Section label={labels.writing} index={block++}>
            <ul>
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="cv-row cv-row--post">
                    <span className="cv-name">{post.title}</span>
                    <time dateTime={post.date} className="cv-mono">
                      {shortDate(post.date, locale)}
                    </time>
                  </Link>
                </li>
              ))}
            </ul>
            <More href="/blog">{labels.allPosts}</More>
          </Section>
        )}

        <Section label={labels.elsewhere} index={block++}>
          <ul>
            {elsewhere.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="cv-row cv-row--link"
                >
                  <span className="cv-name">{link.name}</span>
                  <span className="cv-mono cv-role">{link.handle}</span>
                  <span aria-hidden className="cv-arrow">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Section>
      </main>

      <footer className="cv-enter cv-footer" style={enter(block)}>
        <nav aria-label="Footer" className="flex flex-wrap items-center gap-4">
          <Link href="/">{labels.back}</Link>
          <a href={settings.calUrl} target="_blank" rel="noopener noreferrer">
            {footer.callCta}
          </a>
        </nav>
        <PrintButton label={labels.download} />
      </footer>
    </div>
  );
}
