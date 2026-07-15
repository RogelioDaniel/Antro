"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { BLOG_POSTS } from "@/lib/constants";
import { useT } from "@/lib/lang-store";
import { fadeUp, staggerFast, viewportOnce, EASE_CINEMA } from "@/lib/motion";

export function BlogSection() {
  const t = useT();

  return (
    <section
      id="blog"
      className="relative border-t border-border/20 bg-background py-24 sm:py-32 lg:py-40"
      aria-labelledby="blog-heading"
    >
      {/* faint texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] cinematic-grain" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          className="flex flex-col items-center text-center"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerFast}
        >
          <motion.span variants={fadeUp} className="text-[11px] uppercase tracking-[0.45em] text-primary">
            {t.blog.eyebrow}
          </motion.span>
          <motion.h2
            id="blog-heading"
            variants={fadeUp}
            className="mt-4 font-serif-display text-[clamp(2rem,5.5vw,4rem)] font-medium leading-[1.05] text-foreground"
          >
            {t.blog.h2}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-xl text-[14px] font-light leading-relaxed text-muted-foreground"
          >
            {t.blog.sub}
          </motion.p>
        </motion.div>

        {/* Article cards */}
        <motion.div
          className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerFast}
        >
          {BLOG_POSTS.map((post, i) => (
            <motion.article
              key={post.id}
              variants={fadeUp}
              className="group relative flex flex-col overflow-hidden rounded-sm border border-border/30 bg-[#0d0d0d] transition-colors hover:border-primary/50"
            >
              <Link href={`/blog/${post.id}`} className="absolute inset-0 z-10" aria-label={t.blog.titles[post.titleKey]} />
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={post.image}
                  alt={t.blog.titles[post.titleKey]}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/20 to-transparent" />
                {/* date badge */}
                <div className="absolute left-4 top-4 flex flex-col items-center rounded-sm border border-primary/40 bg-[#0a0a0a]/80 px-3 py-1.5 backdrop-blur">
                  <span className="font-serif-display text-lg leading-none text-primary">
                    {post.day}
                  </span>
                  <span className="text-[8px] uppercase tracking-[0.3em] text-foreground/80">
                    {post.month}
                  </span>
                </div>
                {/* category */}
                <span className="absolute right-4 top-4 rounded-full border border-border/50 bg-[#0a0a0a]/70 px-3 py-1 text-[9px] uppercase tracking-[0.25em] text-foreground/80 backdrop-blur">
                  {post.category}
                </span>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  <Clock className="size-3 text-primary/70" />
                  {post.readingTime} {t.blog.minRead}
                </div>
                <h3 className="mt-3 font-serif-display text-xl leading-snug text-foreground transition-colors group-hover:text-primary">
                  {t.blog.titles[post.titleKey]}
                </h3>
                <p className="mt-3 flex-1 text-[13px] leading-relaxed text-muted-foreground">
                  {t.blog.excerpts[post.excerptKey]}
                </p>
                <Link
                  href={`/blog/${post.id}`}
                  className="group/btn relative z-20 mt-5 inline-flex items-center gap-1.5 self-start border-b border-primary/40 pb-1 text-[10px] uppercase tracking-[0.25em] text-primary transition-all hover:gap-3"
                >
                  {t.blog.readMore}
                  <ArrowRight className="size-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                </Link>
              </div>

              {/* hover gold top accent */}
              <span className="absolute inset-x-0 top-0 h-px scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100" />
            </motion.article>
          ))}
        </motion.div>

        {/* View all */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE_CINEMA }}
        >
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-primary"
          >
            {t.blog.viewAll}
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
