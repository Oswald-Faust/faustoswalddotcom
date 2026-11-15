import type { Metadata } from "next";
import { FadeIn, RevealText } from "@/components/site/motion";
import { ProjectCard } from "@/components/site/ProjectCard";
import { AvatarStack, CallCard, LogosStrip } from "@/components/site/sections";
import { Section } from "@/components/site/ui";
import type { ProjectCategory } from "@/content/types";
import { getLocalizedContent } from "@/i18n/locale";
import { pageMetadata } from "@/lib/seo";

export const instant = false;

export async function generateMetadata(): Promise<Metadata> {
  const { content, locale, ui } = await getLocalizedContent();
  return pageMetadata({
    settings: content.settings,
    locale,
    title: ui.projectsMetaTitle,
    description: ui.projectsMetaDescription,
    path: "/projects",
  });
}

const ORDER: ProjectCategory[] = ["web", "mobile", "landing"];

export default async function ProjectsPage() {
  const { content, ui } = await getLocalizedContent();
  const { projectsSection, projects, settings, testimonials, faq } = content;

  return (
    <>
      <Section divider={false} innerClassName="pb-20 pt-36 text-center md:pb-24 md:pt-44">
        <RevealText
          as="h1"
          parts={[{ text: projectsSection.pageTitle }]}
          className="t-display mx-auto max-w-[520px]"
        />
        <FadeIn delay={0.2}>
          <p className="t-body-lg mx-auto mt-7 max-w-[480px]">{projectsSection.pageIntro}</p>
        </FadeIn>
      </Section>

      {ORDER.map((category) => {
        const items = projects.filter((p) => p.category === category);
        if (items.length === 0) return null;
        return (
          <Section key={category} innerClassName="py-16 md:py-20">
            <h2 className="t-h3 text-[1.625rem]">{projectsSection.categoryLabels[category]}</h2>
            <div className="mt-8 grid gap-x-6 gap-y-10 md:grid-cols-2">
              {items.map((project, i) => (
                <FadeIn key={project.slug} delay={(i % 2) * 0.1}>
                  <ProjectCard
                    slug={project.slug}
                    title={project.title}
                    tagline={project.tagline}
                    cover={project.cover}
                    priority={category === "web" && i < 2}
                    viewLabel={ui.viewProject}
                  />
                </FadeIn>
              ))}
            </div>
          </Section>
        );
      })}

      <LogosStrip
        lead={<AvatarStack label={testimonials.label} ratingLabel={ui.stars} />}
        logos={content.logos}
      />

      <Section innerClassName="py-24 md:py-32">
        <FadeIn className="mx-auto max-w-[520px]">
          <CallCard
            title={ui.likeWhatYouSee}
            text={faq.ctaText}
            button={faq.ctaButton}
            calUrl={settings.calUrl}
          />
        </FadeIn>
      </Section>
    </>
  );
}
