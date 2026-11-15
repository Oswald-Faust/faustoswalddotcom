import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowUpRight, MessagesSquare } from "lucide-react";
import { FadeIn, RevealText } from "@/components/site/motion";
import { ProjectCard } from "@/components/site/ProjectCard";
import { Media, Section } from "@/components/site/ui";
import { JsonLd } from "@/components/site/JsonLd";
import { getLocalizedContent } from "@/i18n/locale";
import { getContent } from "@/lib/content";
import { breadcrumbJsonLd, pageMetadata, projectJsonLd } from "@/lib/seo";

export const instant = false;

type Props = PageProps<"/projects/[slug]">;

export async function generateStaticParams() {
  const { projects } = await getContent();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { content, locale, ui } = await getLocalizedContent();
  const project = content.projects.find((p) => p.slug === slug);
  if (!project) return { title: ui.projectNotFound };
  return pageMetadata({
    settings: content.settings,
    locale,
    title: `${project.title} — ${project.headline}`,
    description: project.description.slice(0, 180),
    path: `/projects/${project.slug}`,
    images: [project.cover],
  });
}

export default function ProjectPage({ params }: Props) {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ProjectView params={params} />
    </Suspense>
  );
}

async function ProjectView({ params }: { params: Props["params"] }) {
  const { slug } = await params;
  const { content, ui } = await getLocalizedContent();
  const index = content.projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = content.projects[index];
  const next = content.projects[(index + 1) % content.projects.length];
  const scope = [...project.scope, ...project.scope];

  return (
    <>
      <JsonLd
        data={[
          projectJsonLd({
            settings: content.settings,
            title: project.title,
            description: project.description,
            path: `/projects/${project.slug}`,
            cover: project.cover,
            year: project.year,
            client: project.client,
          }),
          breadcrumbJsonLd(content.settings, [
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
            { name: project.title, path: `/projects/${project.slug}` },
          ]),
        ]}
      />
      <Section divider={false} innerClassName="pb-16 pt-36 md:pb-20 md:pt-40">
        <div className="mx-auto max-w-[580px]">
          <RevealText
            as="h1"
            parts={[{ text: project.headline }]}
            className="text-[clamp(2.25rem,1.6rem+2.6vw,3rem)] font-medium leading-[1.1] tracking-[-0.03em]"
          />
          <FadeIn delay={0.15}>
            <dl className="t-cap mt-8 flex gap-8">
              <div className="flex gap-2">
                <dt className="text-soft">{ui.client}</dt>
                <dd>{project.client}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-soft">{ui.year}</dt>
                <dd>{project.year}</dd>
              </div>
            </dl>
            <p className="t-sm mt-8 text-[0.9375rem]">{project.description}</p>

            {project.scope.length > 0 && (
              <div className="mt-8">
                <p className="t-cap text-soft">{ui.scope}</p>
                <div className="fade-x mt-3 overflow-hidden rounded-full bg-white shadow-pill">
                  <ul className="t-cap flex w-max animate-ticker py-2.5 hover:[animation-play-state:paused]">
                    {scope.map((item, i) => (
                      <li
                        key={i}
                        aria-hidden={i >= project.scope.length}
                        className="flex items-center whitespace-nowrap after:mx-2.5 after:text-muted after:content-['·']"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="t-body-lg group mt-8 inline-flex items-center gap-1.5 border-b border-ink pb-0.5"
              >
                {project.liveLabel || ui.viewLive}
                <ArrowUpRight
                  className="size-[18px] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={2}
                />
              </a>
            )}
          </FadeIn>
        </div>
      </Section>

      <Section innerClassName="flex flex-col gap-14 py-16 md:py-20">
        {project.blocks.map((block, i) =>
          block.type === "images" ? (
            <FadeIn
              key={i}
              className={
                block.images.length > 1 ? "grid gap-3 sm:grid-cols-2" : "grid gap-3"
              }
            >
              {block.images.map((src, j) => (
                <Media
                  key={src + j}
                  src={src}
                  alt={ui.screenshot(project.title, i + 1, j + 1, block.images.length)}
                  width={block.images.length > 1 ? 980 : 1984}
                  height={block.images.length > 1 ? 615 : 1245}
                  sizes={
                    block.images.length > 1
                      ? "(min-width: 640px) 490px, 100vw"
                      : "(min-width: 1080px) 992px, 100vw"
                  }
                  priority={i === 0}
                  className="h-auto w-full rounded-2xl bg-tint"
                />
              ))}
            </FadeIn>
          ) : (
            <FadeIn key={i} className="mx-auto w-full max-w-[580px]">
              <h2 className="t-lead">{block.heading}</h2>
              <p className="t-sm mt-3 text-[0.9375rem]">{block.body}</p>
            </FadeIn>
          ),
        )}
      </Section>

      <Section innerClassName="py-24 md:py-32">
        <RevealText parts={[{ text: ui.seeOther }]} className="t-h2" />
        <div className="mt-12 grid gap-x-6 gap-y-10 md:grid-cols-2">
          <FadeIn>
            <a
              href={`mailto:${content.settings.email}`}
              className="group flex aspect-[4/3] flex-col items-center justify-center gap-4 rounded-2xl bg-white p-8 text-center shadow-card transition-transform duration-500 hover:-translate-y-1"
            >
              <span className="grid size-10 place-items-center rounded-xl bg-white shadow-pill">
                <MessagesSquare className="size-[18px]" strokeWidth={2.2} />
              </span>
              <span className="t-body-lg max-w-[240px] text-soft">
                {ui.coolIdea}{" "}
                <strong className="font-semibold text-ink">{ui.timeToListen}</strong>
              </span>
            </a>
          </FadeIn>
          <FadeIn delay={0.1}>
            <ProjectCard
              slug={next.slug}
              title={next.title}
              tagline={next.tagline}
              cover={next.cover}
              viewLabel={ui.viewProject}
            />
          </FadeIn>
        </div>
        <div className="mt-16 flex justify-center">
          <Link
            href="/projects"
            className="t-body-lg group inline-flex items-center gap-1.5 border-b border-ink pb-0.5"
          >
            {ui.viewAllProjects}
            <ArrowUpRight
              className="size-[18px] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={2}
            />
          </Link>
        </div>
      </Section>
    </>
  );
}
