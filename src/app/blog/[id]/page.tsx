import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BLOG_POSTS, SITE } from "@/lib/constants";
import { BlogArticle } from "@/components/site/blog-article";
import { Navbar } from "@/components/site/navbar";
import { SiteFooter } from "@/components/site/site-footer";
import { FloatingWhatsApp } from "@/components/site/floating-whatsapp";
import { LanguageToggle } from "@/components/site/language-toggle";

/**
 * Blog detail page. Server component that:
 *  - resolves the post id
 *  - emits JSON-LD Article + BreadcrumbList schema for SEO
 *  - renders the cinematic chrome + BlogArticle client component
 */
export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = BLOG_POSTS.find((p) => p.id === id);
  if (!post) return { title: "La Negra — Journal" };
  const title =
    post.titleKey === "mezcalOrigin"
      ? "The origin of single-village mezcal"
      : post.titleKey === "romaNight"
      ? "A night in Roma-Condesa"
      : "Signature mixology: the craft of the cocktail";
  return {
    title: `${title} — La Negra Journal`,
    description:
      post.excerptKey === "mezcalOriginEx"
        ? "From the heart of agave to the glass. A journey to the Oaxaca mountains with the master mezcalero."
        : post.excerptKey === "romaNightEx"
        ? "Why Roma-Condesa is the nocturnal heart of CDMX, and how La Negra became its author cantina."
        : "Behind every cocktail is a story. How La Negra Tónica was born and why smoke changes everything.",
    openGraph: {
      title: `${title} — La Negra Journal`,
      type: "article",
      images: [{ url: post.image, width: 1344, height: 768, alt: title }],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = BLOG_POSTS.find((p) => p.id === id);
  if (!post) notFound();

  const title =
    post.titleKey === "mezcalOrigin"
      ? "The origin of single-village mezcal"
      : post.titleKey === "romaNight"
      ? "A night in Roma-Condesa"
      : "Signature mixology: the craft of the cocktail";

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    image: [post.image],
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: "La Negra" },
    publisher: {
      "@type": "Organization",
      name: "La Negra",
      logo: { "@type": "ImageObject", url: "https://lanegra.mx/logo.svg" },
    },
    description:
      post.excerptKey === "mezcalOriginEx"
        ? "From the heart of agave to the glass. A journey to the Oaxaca mountains."
        : post.excerptKey === "romaNightEx"
        ? "Why Roma-Condesa is the nocturnal heart of CDMX."
        : "Behind every cocktail is a story.",
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://lanegra.mx/blog/${post.id}` },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://lanegra.mx" },
      { "@type": "ListItem", position: 2, name: "Journal", item: "https://lanegra.mx/#blog" },
      { "@type": "ListItem", position: 3, name: title, item: `https://lanegra.mx/blog/${post.id}` },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Navbar />
      <main className="flex-1 pt-[68px] lg:pt-[76px]">
        <BlogArticle postId={post.id} />
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
    </div>
  );
}
