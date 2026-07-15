"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { EVENTS } from "@/lib/constants";
import { useUIStore } from "@/lib/store";
import { useT } from "@/lib/lang-store";
import { fadeUp, staggerFast, viewportOnce, EASE_CINEMA } from "@/lib/motion";

export function EventsSection() {
  const t = useT();
  const openReservation = useUIStore((s) => s.openReservation);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <section
      id="events"
      className="relative bg-background py-24 sm:py-32 lg:py-40"
      aria-labelledby="events-heading"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerFast}
          >
            <motion.span variants={fadeUp} className="text-[11px] uppercase tracking-[0.45em] text-primary">
              {t.events.eyebrow}
            </motion.span>
            <motion.h2
              id="events-heading"
              variants={fadeUp}
              className="mt-4 font-serif-display text-[clamp(2rem,5.5vw,4rem)] font-medium leading-[1.05] text-foreground"
            >
              {t.events.h2}
            </motion.h2>
          </motion.div>

          <motion.div
            className="hidden gap-2 sm:flex"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ delay: 0.3 }}
          >
            <button
              onClick={() => scrollBy(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border/50 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              aria-label="Anterior"
            >
              <ArrowRight className="size-4 rotate-180" />
            </button>
            <button
              onClick={() => scrollBy(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border/50 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              aria-label="Siguiente"
            >
              <ArrowRight className="size-4" />
            </button>
          </motion.div>
        </div>

        {/* Horizontal scroll grid */}
        <motion.div
          ref={scrollRef}
          className="hide-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 -mx-5 px-5 sm:mx-0 sm:px-0"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerFast}
        >
          {EVENTS.map((ev) => (
            <motion.article
              key={ev.id}
              variants={fadeUp}
              className="group relative w-[78vw] shrink-0 snap-start overflow-hidden rounded-sm border border-border/30 bg-[#0d0d0d] sm:w-[340px]"
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={ev.image}
                  alt={ev.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />

                {/* Date badge */}
                <div className="absolute right-4 top-4 flex flex-col items-center rounded-sm border border-primary/40 bg-[#0a0a0a]/80 px-3 py-2 backdrop-blur">
                  <span className="font-serif-display text-2xl leading-none text-primary">
                    {ev.day}
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.3em] text-foreground/80">
                    {ev.month}
                  </span>
                </div>

                {/* Category */}
                <span className="absolute left-4 top-4 rounded-full border border-border/50 bg-[#0a0a0a]/70 px-3 py-1 text-[9px] uppercase tracking-[0.25em] text-foreground/80 backdrop-blur">
                  {ev.category}
                </span>

                {/* Bottom content */}
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-serif-display text-2xl leading-tight text-foreground">
                    {ev.title}
                  </h3>
                  <p className="mt-1 text-[12px] text-muted-foreground">
                    {ev.artist}
                  </p>
                </div>
              </div>

              {/* Footer / CTA */}
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                  <Calendar className="size-3.5 text-primary/70" />
                  {ev.price === "$0" ? "Entrada libre" : `Desde ${ev.price} MXN`}
                </div>
                <button
                  onClick={openReservation}
                  className="group/btn inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-primary transition-all hover:gap-2.5"
                >
                  {ev.cta}
                  <ArrowRight className="size-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                </button>
              </div>

              {/* hover gold border glow */}
              <div className="pointer-events-none absolute inset-0 rounded-sm opacity-0 ring-1 ring-primary/40 transition-opacity duration-500 group-hover:opacity-100" />
            </motion.article>
          ))}

          {/* trailing spacer for snap */}
          <div className="w-1 shrink-0 sm:hidden" aria-hidden="true" />
        </motion.div>

        {/* mobile hint */}
        <motion.p
          className="mt-2 text-center text-[10px] uppercase tracking-[0.3em] text-muted-foreground sm:hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
        >
          Desliza para ver más →
        </motion.p>
      </div>
    </section>
  );
}
