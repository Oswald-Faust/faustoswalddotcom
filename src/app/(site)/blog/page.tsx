import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn, RevealText } from "@/components/site/motion";
import { Media, Section } from "@/components/site/ui";
import { getLocalizedContent } from "@/i18n/locale";
import { formatDate } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";

export const instant = false;

export async function generateMetadata(): Promise<Metadata> {
  const { content, locale, ui } = await getLocalizedContent();
  return pageMetadata({
    settings: content.settings,
    locale,
    title: ui.blogMetaTitle,
    description: ui.blogMetaDescription,
    path: "/blog",
  });
}

export default async function BlogPage() {
  const { content, locale, ui } = await getLocalizedContent();
  const { blog } = content;
  const posts = [...blog.posts].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <Section divider={false} innerClassName="pb-20 pt-36 text-center md:pb-24 md:pt-44">
        <RevealText
          as="h1"
          parts={[{ text: blog.title }]}
          className="t-display mx-auto max-w-[640px]"
        />
        <FadeIn delay={0.2}>
          <p className="t-body-lg mx-auto mt-7 max-w-[560px]">{blog.intro}</p>
        </FadeIn>
      </Section>

      <Section innerClassName="py-16 md:py-20">
        {posts.length === 0 ? (
          <p className="t-body-lg py-16 text-center text-soft">
            {ui.noArticles}
          </p>
        ) : (
          <ul className="grid gap-x-6 gap-y-12 md:grid-cols-2">
            {posts.map((post, i) => (
              <li key={post.slug}>
                <FadeIn delay={(i % 2) * 0.1}>
                  <Link href={`/blog/${post.slug}`} className="group block">
                    <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-tint">
                      <Media
                        src={post.cover}
                        alt=""
                        width={968}
                        height={726}
                        sizes="(min-width: 768px) 484px, 100vw"
                        priority={i < 2}
                        className="size-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
                      />
                    </div>
                    <p className="t-cap mt-5 flex gap-3 text-soft">
                      <span className="text-ink">{post.category}</span>
                      <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
                      <span>
                        {ui.by} {post.author}
                      </span>
                    </p>
                    <h2 className="t-lead mt-3 font-semibold underline-offset-4 group-hover:underline">
                      {post.title}
                    </h2>
                    <p className="t-sm mt-2 text-soft">{post.excerpt}</p>
                  </Link>
                </FadeIn>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </>
  );
}
