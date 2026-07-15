"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Clock, ArrowLeft } from "lucide-react";
import { BLOG_POSTS } from "@/lib/constants";
import { useT, useLangStore } from "@/lib/lang-store";
import { fadeUp, staggerFast, viewportOnce } from "@/lib/motion";

/**
 * Blog index page (/blog). Lists all journal articles in a rich editorial grid.
 * Client component because it consumes the language store for bilingual copy.
 */
export function BlogIndexView() {
  const t = useT();
  const lang = useLangStore((s) => s.lang);

  return (
    <div className="relative">
      {/* Hero header */}
      <motion.section
        className="relative overflow-hidden border-b border-border/20 pt-32 pb-16 sm:pt-40 sm:pb-20"
        initial="hidden"
        animate="visible"
        variants={staggerFast}
      >
        <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-primary/[0.05] blur-[120px]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.03] cinematic-grain" />
        <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
          <motion.span
            variants={fadeUp}
            className="text-[11px] uppercase tracking-[0.45em] text-primary"
          >
            {t.blog.eyebrow}
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="mt-5 font-serif-display text-[clamp(2.2rem,6vw,4.5rem)] font-medium leading-[1.02] text-foreground"
          >
            {t.blog.h2}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-xl text-[15px] font-light leading-relaxed text-muted-foreground"
          >
            {t.blog.sub}
          </motion.p>
        </div>
      </motion.section>

      {/* Articles list */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerFast}
        >
          {BLOG_POSTS.map((post, i) => {
            const title = t.blog.titles[post.titleKey];
            const excerpt = t.blog.excerpts[post.excerptKey];
            const dateObj = new Date(post.date + "T00:00:00");
            const formattedDate = dateObj.toLocaleDateString(
              lang === "es" ? "es-MX" : "en-US",
              { year: "numeric", month: "long", day: "numeric" }
            );
            const isFeatured = i === 0;

            return (
              <motion.article
                key={post.id}
                variants={fadeUp}
                className={`group relative flex flex-col overflow-hidden rounded-sm border border-border/30 bg-[#0d0d0d] transition-colors hover:border-primary/50 ${
                  isFeatured ? "md:col-span-2" : ""
                }`}
              >
                <Link
                  href={`/blog/${post.id}`}
                  className="absolute inset-0 z-10"
                  aria-label={title}
                />
                {/* Image */}
                <div
                  className={`relative overflow-hidden ${
                    isFeatured ? "aspect-[21/9]" : "aspect-[16/10]"
                  }`}
                >
                  <Image
                    src={post.image}
                    alt={title}
                    fill
                    sizes={isFeatured ? "(max-width: 768px) 100vw, 100vw" : "(max-width: 768px) 100vw, 50vw"}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/20 to-transparent" />
                  {isFeatured && (
                    <span className="absolute left-4 top-4 rounded-full border border-primary/60 bg-[#0a0a0a]/80 px-3 py-1 text-[9px] uppercase tracking-[0.25em] text-primary backdrop-blur">
                      {lang === "es" ? "Destacado" : "Featured"}
                    </span>
                  )}
                  <div className="absolute left-4 top-4 flex flex-col items-center rounded-sm border border-primary/40 bg-[#0a0a0a]/80 px-3 py-1.5 backdrop-blur">
                    <span className="font-serif-display text-lg leading-none text-primary">
                      {post.day}
                    </span>
                    <span className="text-[8px] uppercase tracking-[0.3em] text-foreground/80">
                      {post.month}
                    </span>
                  </div>
                  <span className="absolute right-4 top-4 rounded-full border border-border/50 bg-[#0a0a0a]/70 px-3 py-1 text-[9px] uppercase tracking-[0.25em] text-foreground/80 backdrop-blur">
                    {post.category}
                  </span>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="size-3 text-primary/70" />
                      {post.readingTime} {t.blog.minRead}
                    </span>
                    <span>·</span>
                    <span>{formattedDate}</span>
                  </div>
                  <h2
                    className={`mt-3 font-serif-display leading-snug text-foreground transition-colors group-hover:text-primary ${
                      isFeatured ? "text-2xl sm:text-3xl" : "text-xl"
                    }`}
                  >
                    {title}
                  </h2>
                  <p className="mt-3 flex-1 text-[14px] leading-relaxed text-muted-foreground">
                    {excerpt}
                  </p>
                  <span className="group/btn relative z-20 mt-5 inline-flex items-center gap-1.5 self-start border-b border-primary/40 pb-1 text-[10px] uppercase tracking-[0.25em] text-primary transition-all hover:gap-3">
                    {t.blog.readMore}
                    <ArrowRight className="size-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                  </span>
                </div>

                {/* hover gold top accent */}
                <span className="absolute inset-x-0 top-0 h-px scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100" />
              </motion.article>
            );
          })}
        </motion.div>

        {/* Back to home */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
            {lang === "es" ? "Volver al inicio" : "Back to home"}
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
