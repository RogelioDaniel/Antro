"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, Share2, Check } from "lucide-react";
import { BLOG_POSTS } from "@/lib/constants";
import { useT, useLangStore } from "@/lib/lang-store";
import { fadeUp, staggerFast, viewportOnce, EASE_CINEMA } from "@/lib/motion";

interface BlogArticleProps {
  postId: string;
}

/**
 * Client-rendered blog article body. The server route resolves the post +
 * emits JSON-LD, then renders this component for the interactive UI
 * (share button, language-aware content, animations).
 */
export function BlogArticle({ postId }: BlogArticleProps) {
  const t = useT();
  const lang = useLangStore((s) => s.lang);
  const post = useMemo(() => BLOG_POSTS.find((p) => p.id === postId), [postId]);

  if (!post) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
        <span className="font-serif-display text-4xl text-primary/40">404</span>
        <p className="mt-3 text-muted-foreground">
          {lang === "es" ? "Artículo no encontrado." : "Article not found."}
        </p>
        <Link
          href="/#blog"
          className="mt-6 inline-flex items-center gap-2 border-b border-primary/40 pb-1 text-[11px] uppercase tracking-[0.25em] text-primary hover:gap-3"
        >
          <ArrowLeft className="size-3.5" />
          {t.blog.back}
        </Link>
      </div>
    );
  }

  const title = t.blog.titles[post.titleKey];
  const excerpt = t.blog.excerpts[post.excerptKey];
  const body = t.blog.bodies[post.titleKey] ?? [];
  const dateObj = new Date(post.date + "T00:00:00");
  const formattedDate = dateObj.toLocaleDateString(
    lang === "es" ? "es-MX" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) {
        await navigator.share({ title: `La Negra — ${title}`, url });
      } else {
        await navigator.clipboard.writeText(url);
      }
    } catch {
      /* cancelled */
    }
  };

  return (
    <article className="relative pb-20">
      {/* Hero image */}
      <motion.div
        className="relative mx-auto mt-6 aspect-[16/9] max-w-4xl overflow-hidden rounded-sm border border-border/30"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: EASE_CINEMA }}
      >
        <Image
          src={post.image}
          alt={title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
      </motion.div>

      {/* Header */}
      <motion.header
        className="mx-auto mt-10 max-w-2xl px-5 text-center sm:px-8"
        initial="hidden"
        animate="visible"
        variants={staggerFast}
      >
        <motion.div
          variants={fadeUp}
          className="flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
        >
          <span className="rounded-full border border-primary/40 px-3 py-1 text-primary">
            {post.category}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="size-3 text-primary/70" />
            {post.readingTime} {t.blog.minRead}
          </span>
        </motion.div>
        <motion.h1
          variants={fadeUp}
          className="mt-5 font-serif-display text-[clamp(1.8rem,5vw,3rem)] font-medium leading-[1.1] text-foreground"
        >
          {title}
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-4 max-w-xl text-[15px] font-light italic leading-relaxed text-muted-foreground"
        >
          {excerpt}
        </motion.p>
        <motion.div
          variants={fadeUp}
          className="mt-5 flex items-center justify-center gap-2 text-[11px] text-muted-foreground"
        >
          <Calendar className="size-3.5 text-primary/70" />
          {t.blog.publishedOn} {formattedDate}
        </motion.div>
      </motion.header>

      {/* Body */}
      <motion.div
        className="mx-auto mt-12 max-w-2xl space-y-6 px-5 sm:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerFast}
      >
        {body.map((paragraph, i) => (
          <motion.p
            key={i}
            variants={fadeUp}
            className={
              i === 0
                ? "font-display-quote text-[17px] font-light italic leading-relaxed text-foreground/90 first-letter:float-left first-letter:mr-2 first-letter:font-serif-display first-letter:text-5xl first-letter:leading-[0.8] first-letter:text-primary"
                : "text-[15px] leading-[1.8] text-foreground/80"
            }
          >
            {paragraph}
          </motion.p>
        ))}
      </motion.div>

      {/* Share + back */}
      <motion.div
        className="mx-auto mt-14 flex max-w-2xl items-center justify-between border-t border-border/30 px-5 pt-8 sm:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.6 }}
      >
        <Link
          href="/#blog"
          className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
          {t.blog.back}
        </Link>
        <button
          onClick={share}
          className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-primary"
        >
          <Share2 className="size-3.5" />
          {t.blog.share}
        </button>
      </motion.div>
    </article>
  );
}
