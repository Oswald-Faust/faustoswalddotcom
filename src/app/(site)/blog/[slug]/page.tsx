import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { SocialLinks } from "@/components/site/Footer";
import { FadeIn } from "@/components/site/motion";
import { Prose } from "@/components/site/Prose";
import { Media, Section } from "@/components/site/ui";
import { JsonLd } from "@/components/site/JsonLd";
import { getLocalizedContent } from "@/i18n/locale";
import { getContent } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { articleJsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const instant = false;

type Props = PageProps<"/blog/[slug]">;

export async function generateStaticParams() {
  const { blog } = await getContent();
  return blog.posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { content, locale, ui } = await getLocalizedContent();
  const post = content.blog.posts.find((p) => p.slug === slug);
  if (!post) return { title: ui.postNotFound };
  return pageMetadata({
    settings: content.settings,
    locale,
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    images: post.cover ? [post.cover] : undefined,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.date,
    authors: [post.author],
  });
}

export default function BlogPostPage({ params }: Props) {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <PostView params={params} />
    </Suspense>
  );
}

async function PostView({ params }: { params: Props["params"] }) {
  const { slug } = await params;
  const { content, locale, ui } = await getLocalizedContent();
  const { blog, settings } = content;
  const post = blog.posts.find((p) => p.slug === slug);
  if (!post) notFound();
  const others = blog.posts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <JsonLd
        data={[
          articleJsonLd({
            settings,
            title: post.title,
            description: post.excerpt,
            path: `/blog/${post.slug}`,
            cover: post.cover,
            date: post.date,
            author: post.author,
          }),
          breadcrumbJsonLd(settings, [
            { name: "Home", path: "/" },
            { name: ui.blog, path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />
      <Section divider={false} innerClassName="pb-12 pt-32 md:pt-36">
        <div className="mx-auto max-w-[580px]">
          <nav aria-label={ui.breadcrumb} className="t-cap flex flex-wrap gap-2 text-soft">
            <Link href="/blog" className="text-ink underline-offset-4 hover:underline">
              {ui.blog}
            </Link>
            <span aria-hidden>/</span>
            <span>{post.category}</span>
          </nav>
          <h1 className="mt-10 text-[clamp(2.25rem,1.6rem+2.6vw,3rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            {post.title}
          </h1>
          <p className="t-cap mt-8 flex gap-3">
            <time dateTime={post.date} className="text-soft">
              {formatDate(post.date, locale)}
            </time>
            <span>
              {ui.by} {post.author}
            </span>
          </p>
          <p className="t-body-lg mt-5">{post.excerpt}</p>
        </div>
        {post.cover && (
          <FadeIn className="mt-12">
            <Media
              src={post.cover}
              alt=""
              width={1984}
              height={1240}
              sizes="(min-width: 1080px) 992px, 100vw"
              priority
              className="aspect-[16/10] w-full rounded-2xl bg-tint object-cover"
            />
          </FadeIn>
        )}
      </Section>

      <Section innerClassName="py-16 md:py-20">
        <article className="mx-auto max-w-[580px]">
          <Prose source={post.body} />
        </article>
      </Section>

      <Section innerClassName="py-16 md:py-20">
        <div className="on-dark mx-auto flex max-w-[580px] flex-col items-start gap-5 rounded-2xl bg-ink p-8 text-white">
          <div>
            <h2 className="t-lead font-semibold">{ui.followTitle}</h2>
            <p className="t-sm mt-2 text-[#b8b8b8]">{ui.followText}</p>
          </div>
          <SocialLinks settings={settings} followersLabel={ui.followers} />
        </div>

        {others.length > 0 && (
          <div className="mx-auto mt-16 max-w-[580px]">
            <div className="flex items-baseline justify-between">
              <h2 className="t-h3">{ui.moreInsights}</h2>
              <Link href="/blog" className="t-label underline underline-offset-4">
                {ui.viewAll}
              </Link>
            </div>
            <ul className="mt-6 flex flex-col gap-3">
              {others.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/blog/${other.slug}`}
                    className="block rounded-2xl bg-white p-5 shadow-card transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    <p className="t-cap text-soft">{formatDate(other.date, locale)}</p>
                    <p className="t-body mt-2 font-semibold">{other.title}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Section>
    </>
  );
}
