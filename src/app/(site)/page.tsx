import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  CreditCard,
  FileText,
  MessageSquareText,
  PackageCheck,
  Quote,
  RefreshCw,
} from "lucide-react";
import { Expertise } from "@/components/site/Expertise";
import { ExperienceStack, Faq } from "@/components/site/interactive";
import { SocialLinks } from "@/components/site/Footer";
import { HeroStack } from "@/components/site/HeroStack";
import { FadeIn, RevealText, RotatingWord } from "@/components/site/motion";
import { ProjectCard } from "@/components/site/ProjectCard";
import { AvatarStack, CallCard, LogosStrip } from "@/components/site/sections";
import { Cta, Media, Pill, Section, serviceIcons, stackIcons } from "@/components/site/ui";
import { getLocalizedContent } from "@/i18n/locale";

export const instant = false;

const STEP_ICONS = [RefreshCw, MessageSquareText, PackageCheck];

export default async function HomePage() {
  const { content, ui } = await getLocalizedContent();
  const { settings, hero, services, about, pricing, expertise, testimonials, faq } = content;
  const featured = content.projects.filter((p) => p.featured).slice(0, 4);
  const heroCards = (featured.length ? featured : content.projects)
    .slice(0, 3)
    .map((p) => ({ src: p.cover, title: p.title }));

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <Section divider={false} innerClassName="pb-20 pt-32 md:pb-24 md:pt-36">
        <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,1fr)_412px] lg:gap-0">
          <div>
            <FadeIn y={12}>
              <Pill live>{settings.availability}</Pill>
            </FadeIn>
            <h1 className="t-display relative z-10 mt-6">
              <span className="block text-muted lg:whitespace-nowrap">
                {hero.titleLead} <RotatingWord words={hero.rotatingWords} />
              </span>
              <span className="block">{hero.titleEnd}</span>
            </h1>
            <FadeIn delay={0.15}>
              <p className="t-body-lg mt-6 max-w-[390px]">
                <strong className="font-semibold">{hero.descriptionStrong}</strong>{" "}
                {hero.description}
              </p>
            </FadeIn>
            <FadeIn delay={0.25} className="mt-8">
              <Cta
                href={settings.calUrl}
                icon={
                  <Image
                    src="/images/people/memoji.png"
                    alt=""
                    width={56}
                    height={56}
                    className="size-7 bg-white object-cover object-top"
                  />
                }
              >
                {hero.cta}
              </Cta>
            </FadeIn>
          </div>
          <FadeIn delay={0.2} y={40} className="px-6 lg:px-0 lg:pr-8">
            <HeroStack cards={heroCards} shuffleLabel={ui.shuffle} />
          </FadeIn>
        </div>
      </Section>

      <LogosStrip
        lead={<AvatarStack label={hero.collaborations} ratingLabel={ui.stars} />}
        logos={content.logos}
      />

      {/* ── Projects ─────────────────────────────────────────────────── */}
      <Section id="projects" innerClassName="py-24 md:py-32">
        <RevealText
          parts={[{ text: content.projectsSection.title }]}
          className="t-h2"
        />
        <div className="mt-12 grid gap-x-6 gap-y-10 md:mt-14 md:grid-cols-2">
          {featured.map((project, i) => (
            <FadeIn key={project.slug} delay={(i % 2) * 0.1}>
              <ProjectCard
                slug={project.slug}
                title={project.title}
                tagline={project.tagline}
                cover={project.cover}
                priority={i < 2}
                viewLabel={ui.viewProject}
              />
            </FadeIn>
          ))}
        </div>
        <div className="mt-16 flex justify-center">
          <Link
            href="/projects"
            className="t-body-lg group inline-flex items-center gap-1.5 border-b border-ink pb-0.5"
          >
            {content.projectsSection.moreLabel}
            <ArrowUpRight
              className="size-[18px] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={2}
            />
          </Link>
        </div>
      </Section>

      {/* ── Services ─────────────────────────────────────────────────── */}
      <Section id="services" innerClassName="py-24 md:py-32">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_371px] lg:gap-10">
          <div>
            <RevealText
              parts={[
                { text: services.titleMuted, muted: true, block: true },
                { text: services.title },
              ]}
              className="t-h2 max-w-[540px]"
            />
            <p className="t-body-lg mt-16">{services.stackLabel}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {services.stack.map((key, i) => {
                const entry = stackIcons[key];
                if (!entry) return null;
                return (
                  <li key={key}>
                    <FadeIn delay={i * 0.04} y={10}>
                      <span
                        title={entry.label}
                        className="grid size-14 place-items-center rounded-xl bg-white shadow-card transition-transform duration-300 hover:-translate-y-1 [&_svg]:size-6"
                      >
                        {entry.icon}
                        <span className="sr-only">{entry.label}</span>
                      </span>
                    </FadeIn>
                  </li>
                );
              })}
            </ul>
          </div>
          <ul className="flex flex-col gap-8 lg:gap-12 lg:pt-3">
            {services.items.map((item, i) => (
              <li key={item.label}>
                <FadeIn delay={i * 0.07} y={14} className="flex items-center gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-ink text-white shadow-ink [&_svg]:size-[18px]">
                    {serviceIcons[item.icon] ?? serviceIcons.web}
                  </span>
                  <span className="t-lead">{item.label}</span>
                </FadeIn>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ── About ────────────────────────────────────────────────────── */}
      <Section id="about" innerClassName="py-24 md:py-32">
        <h2 className="t-h2">
          <span className="block text-muted">
            {about.titleLead} <RotatingWord words={about.rotatingWords} />{" "}
            {about.titleAfter}
          </span>
          <span className="block">{about.titleEnd}</span>
        </h2>
        <div className="mt-14 grid gap-12 md:mt-16 lg:grid-cols-[371px_minmax(0,1fr)] lg:gap-16">
          <div>
            <FadeIn className="relative overflow-hidden rounded-2xl bg-tint">
              <Media
                src={about.portrait}
                alt={ui.portrait(settings.name)}
                width={742}
                height={820}
                sizes="(min-width: 1024px) 371px, 100vw"
                className="aspect-[371/410] w-full object-cover"
              />
              <div className="absolute bottom-3.5 right-3.5">
                <SocialLinks settings={settings} tone="photo" followersLabel={ui.followers} />
              </div>
            </FadeIn>
            <p className="t-lead mt-4">{settings.name}</p>
            <p className="t-label mt-1.5 text-soft">{settings.role}</p>
            <p className="t-body-lg mt-9">{about.experienceLabel}</p>
            <div className="mt-4">
              <ExperienceStack
                items={about.experience}
                seeAll={ui.seeAll}
                showLess={ui.showLess}
              />
            </div>
          </div>
          <div className="flex flex-col gap-8">
            {about.paragraphs.map((paragraph, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <p className="t-lead">
                  <strong className="font-semibold">{paragraph.strong}</strong>
                  {paragraph.text && <> {paragraph.text}</>}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Pricing ──────────────────────────────────────────────────── */}
      <Section id="pricing" innerClassName="py-24 md:py-32">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <RevealText
            parts={[
              { text: pricing.titleMuted, muted: true, block: true },
              { text: pricing.title },
            ]}
            className="t-h2"
          />
          <p className="t-body-lg max-w-[300px] text-soft lg:pb-1">
            <strong className="block font-semibold text-ink">{pricing.introStrong}</strong>
            {pricing.intro}
          </p>
        </div>

        <ol className="mt-14 grid gap-8 sm:grid-cols-3 md:mt-16">
          {pricing.steps.map((step, i) => {
            const Icon = STEP_ICONS[i % STEP_ICONS.length];
            return (
              <li key={step.title}>
                <FadeIn delay={i * 0.08} y={14}>
                  <p className="t-body flex items-center gap-2 font-semibold">
                    <Icon className="size-4" strokeWidth={2.4} />
                    {step.title}
                  </p>
                  <p className="t-body mt-2.5 max-w-[250px] text-soft">{step.text}</p>
                </FadeIn>
              </li>
            );
          })}
        </ol>

        <div className="mt-20 grid gap-1.5 rounded-2xl bg-tint p-1.5 md:mt-24 lg:grid-cols-[402px_minmax(0,1fr)]">
          {/* Start today */}
          <div className="relative rounded-xl bg-white p-8 shadow-card">
            <FadeIn y={30} className="relative -ml-12 -mt-16 mb-10 hidden w-[393px] lg:block">
              <div className="on-dark relative h-[268px] -rotate-2 overflow-hidden rounded-3xl bg-ink p-7 text-white shadow-ink transition-transform duration-500 ease-out hover:rotate-0">
                <Pill>{pricing.cardBadge}</Pill>
                <Image
                  src="/images/misc/bolt.png"
                  alt=""
                  width={560}
                  height={560}
                  className="pointer-events-none absolute -right-8 top-0 size-[280px] object-contain brightness-75 grayscale invert"
                />
                <p className="t-lead absolute bottom-7 left-7 max-w-[250px] text-[#b8b8b8]">
                  {pricing.cardText}
                </p>
              </div>
            </FadeIn>
            <Pill live>{pricing.plansBadge}</Pill>
            <h3 className="t-h3 mt-6">{pricing.plansTitle}</h3>
            <p className="t-sm mt-4 max-w-[338px]">{pricing.plansText}</p>
          </div>

          {/* Subscription */}
          <div className="rounded-xl bg-white p-8 shadow-card">
            <h3 className="t-h3">{pricing.subscription.title}</h3>
            <p className="t-sm mt-4 max-w-[400px]">{pricing.subscription.description}</p>
            <hr className="my-6 border-[#dedede]" />
            <p className="flex items-baseline gap-2">
              <span className="text-[2.5rem] font-semibold leading-[1.2] tracking-[-0.03em]">
                {pricing.subscription.price}
              </span>
              <span className="t-cap text-soft">{pricing.subscription.period}</span>
            </p>
            <ul className="mt-6 grid gap-x-6 gap-y-4 sm:grid-cols-2">
              {pricing.subscription.features.map((feature) => (
                <li key={feature} className="t-label flex items-center gap-2">
                  <Check className="size-3.5 shrink-0" strokeWidth={3} />
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Cta href={settings.calUrl} icon={<CreditCard />}>
                {pricing.subscription.cta}
              </Cta>
            </div>
          </div>

          {/* One-off project */}
          <div className="on-dark grid gap-8 rounded-xl bg-ink p-8 text-white shadow-ink lg:col-span-2 lg:grid-cols-[minmax(0,390px)_minmax(0,1fr)_auto] lg:items-end">
            <div>
              <h3 className="t-h3">{pricing.oneOff.title}</h3>
              <p className="t-sm mt-8 max-w-[347px]">{pricing.oneOff.description}</p>
            </div>
            <ul className="grid gap-x-6 gap-y-4 sm:grid-cols-2 lg:pb-1">
              {pricing.oneOff.features.map((feature) => (
                <li key={feature} className="t-label flex items-center gap-2">
                  <Check className="size-3.5 shrink-0" strokeWidth={3} />
                  {feature}
                </li>
              ))}
            </ul>
            <Cta href={`mailto:${settings.email}?subject=Quote%20request`} variant="paper" icon={<FileText />}>
              {pricing.oneOff.cta}
            </Cta>
          </div>
        </div>
      </Section>

      <Expertise
        title={expertise.title}
        items={expertise.items}
        bannerText={expertise.bannerText}
        bannerCta={expertise.bannerCta}
        email={settings.email}
      />

      <LogosStrip
        lead={
          <p className="t-lead text-soft">
            {testimonials.logosLead}{" "}
            <strong className="font-semibold text-ink">{testimonials.logosStrong}</strong>
          </p>
        }
        logos={content.logos}
      />

      {/* ── Testimonials ─────────────────────────────────────────────── */}
      <Section innerClassName="py-24 md:py-32">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <RevealText
            parts={[
              { text: testimonials.titleMuted, muted: true, block: true },
              { text: testimonials.title },
            ]}
            className="t-h2"
          />
          <AvatarStack label={testimonials.label} ratingLabel={ui.stars} className="md:pb-3" />
        </div>
        <ul className="mt-12 grid gap-3 md:mt-14 md:grid-cols-3">
          {testimonials.items.map((item, i) => (
            <li key={item.name}>
              <FadeIn delay={i * 0.08} className="h-full">
                <figure className="flex h-full min-h-[280px] flex-col rounded-2xl bg-white p-6 shadow-card">
                  <Quote className="size-4 fill-ink" strokeWidth={0} aria-hidden />
                  <blockquote className="t-sm mt-4">{item.quote}</blockquote>
                  <figcaption className="mt-auto flex items-center gap-2.5 pt-8">
                    <Media
                      src={item.avatar}
                      alt=""
                      width={76}
                      height={76}
                      sizes="38px"
                      className="size-[38px] rounded-full object-cover"
                    />
                    <span>
                      <span className="t-label block">{item.name}</span>
                      <span className="t-cap mt-1.5 block text-soft">{item.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </FadeIn>
            </li>
          ))}
        </ul>
      </Section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <Section id="faq" innerClassName="py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,538px)_minmax(0,422px)] lg:justify-between">
          <div>
            <RevealText parts={[{ text: faq.title }]} className="t-h2" />
            <div className="mt-12 md:mt-14">
              <Faq items={faq.items} />
            </div>
          </div>
          <FadeIn className="lg:sticky lg:top-28 lg:self-start">
            <CallCard
              title={faq.ctaTitle}
              text={faq.ctaText}
              button={faq.ctaButton}
              calUrl={settings.calUrl}
            />
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
