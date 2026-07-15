"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";
import { fadeUp, staggerFast, viewportOnce } from "@/lib/motion";

export function VoicesSection() {
  // duplicate for a seamless marquee loop
  const marquee = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section
      id="voices"
      className="relative overflow-hidden border-y border-border/30 bg-[#0c0c0c] py-24 sm:py-32 lg:py-40"
      aria-labelledby="voices-heading"
    >
      {/* faint gold orb */}
      <div className="pointer-events-none absolute -left-40 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-primary/5 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 top-1/4 h-[400px] w-[400px] rounded-full bg-[#7a1f2b]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          className="flex flex-col items-center text-center"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerFast}
        >
          <motion.span variants={fadeUp} className="text-[11px] uppercase tracking-[0.45em] text-primary">
            Voces de la noche
          </motion.span>
          <motion.h2
            id="voices-heading"
            variants={fadeUp}
            className="mt-4 font-serif-display text-[clamp(2rem,5.5vw,4rem)] font-medium leading-[1.05] text-foreground"
          >
            What They Say
          </motion.h2>
          <motion.div variants={fadeUp} className="mt-5 flex items-center gap-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-4 fill-primary text-primary" />
            ))}
            <span className="ml-2 text-[12px] uppercase tracking-[0.25em] text-muted-foreground">
              4.9 · 320+ reseñas
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Marquee row */}
      <div className="relative mt-16">
        {/* edge fades */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-[#0c0c0c] to-transparent sm:w-32" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-[#0c0c0c] to-transparent sm:w-32" />

        <motion.div
          className="flex w-max gap-5"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 38,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {marquee.map((t, i) => (
            <TestimonialCard key={i} t={t} index={i % TESTIMONIALS.length} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function TestimonialCard({
  t,
  index,
}: {
  t: (typeof TESTIMONIALS)[number];
  index: number;
}) {
  return (
    <article className="group relative w-[88vw] shrink-0 overflow-hidden rounded-sm border border-border/30 bg-[#0a0a0a]/80 p-7 backdrop-blur sm:w-[400px]">
      <div className="pointer-events-none absolute -right-6 -top-6 text-primary/10">
        <Quote className="size-24" fill="currentColor" />
      </div>

      <div className="relative">
        <div className="mb-4 flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="size-3.5 fill-primary text-primary" />
          ))}
        </div>

        <p className="font-display-quote text-[17px] font-light italic leading-relaxed text-foreground/90">
          “{t.quote}”
        </p>

        <div className="mt-6 flex items-center gap-3 border-t border-border/30 pt-5">
          <div className="relative h-11 w-11 overflow-hidden rounded-full border border-primary/40">
            <img
              src={t.avatar}
              alt={t.name}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <p className="font-serif-display text-sm text-foreground">{t.name}</p>
            <p className="text-[10px] uppercase tracking-[0.25em] text-primary/80">
              {t.role}
            </p>
          </div>
          <span className="ml-auto font-mono text-[10px] text-muted-foreground/60">
            0{index + 1}
          </span>
        </div>
      </div>
    </article>
  );
}
