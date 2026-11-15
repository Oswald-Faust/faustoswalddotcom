import type { MetadataRoute } from "next";
import { getContent } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { settings, projects, blog } = await getContent();
  const base = settings.siteUrl.replace(/\/$/, "");
  const now = new Date();

  const entry = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
    lastModified: Date = now,
  ): MetadataRoute.Sitemap[number] => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency,
    priority,
    alternates: {
      languages: {
        en: `${base}${path}`,
        fr: `${base}${path}`,
      },
    },
  });

  return [
    entry("/", 1, "weekly"),
    entry("/projects", 0.9, "weekly"),
    entry("/blog", 0.8, "weekly"),
    entry("/cv", 0.85, "monthly"),
    ...projects.map((project) =>
      entry(
        `/projects/${project.slug}`,
        project.featured ? 0.85 : 0.7,
        "monthly",
        project.year ? new Date(`${project.year}-01-01T00:00:00Z`) : now,
      ),
    ),
    ...blog.posts.map((post) =>
      entry(
        `/blog/${post.slug}`,
        0.65,
        "monthly",
        Number.isNaN(Date.parse(post.date)) ? now : new Date(`${post.date}T00:00:00Z`),
      ),
    ),
    entry("/terms", 0.2, "yearly"),
    entry("/privacy-policy", 0.2, "yearly"),
  ];
}
