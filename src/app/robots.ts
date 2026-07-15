import type { MetadataRoute } from "next";

/**
 * Dynamic robots.txt — allows all crawlers, points to the sitemap.
 * Served at /robots.txt.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api"],
      },
    ],
    sitemap: "https://lanegra.mx/sitemap.xml",
    host: "https://lanegra.mx",
  };
}
