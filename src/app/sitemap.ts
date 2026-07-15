import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/constants";

/**
 * Dynamic sitemap.xml — includes the home page + blog index + all blog detail pages.
 * Served at /sitemap.xml.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://lanegra.mx";
  const now = new Date();

  const home = {
    url: base,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 1,
  };

  const blogIndex = {
    url: `${base}/blog`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  };

  const blogPosts = BLOG_POSTS.map((post) => ({
    url: `${base}/blog/${post.id}`,
    lastModified: new Date(post.date + "T00:00:00"),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [home, blogIndex, ...blogPosts];
}
