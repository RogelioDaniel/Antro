import type { Metadata } from "next";
import { BlogIndexView } from "@/components/site/blog-index-view";
import { Navbar } from "@/components/site/navbar";
import { SiteFooter } from "@/components/site/site-footer";
import { FloatingWhatsApp } from "@/components/site/floating-whatsapp";

export const metadata: Metadata = {
  title: "The Journal — La Negra",
  description:
    "Chronicles of mezcal, night and cantina. Stories from Roma-Condesa, CDMX.",
  openGraph: {
    title: "The Journal — La Negra",
    description:
      "Chronicles of mezcal, night and cantina. Stories from Roma-Condesa, CDMX.",
    type: "website",
  },
};

/**
 * Blog index page (/blog). Lists all journal articles in an editorial grid
 * with a featured first post. Server component that emits a Blog JSON-LD
 * schema for SEO, then renders the client view.
 */
export default function BlogIndexPage() {
  const blogLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "La Negra Journal",
    description:
      "Chronicles of mezcal, night and cantina. Stories from Roma-Condesa, CDMX.",
    url: "https://lanegra.mx/blog",
    publisher: {
      "@type": "Organization",
      name: "La Negra",
      logo: { "@type": "ImageObject", url: "https://lanegra.mx/logo.svg" },
    },
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogLd) }}
      />
      <Navbar />
      <main className="flex-1">
        <BlogIndexView />
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
    </div>
  );
}
