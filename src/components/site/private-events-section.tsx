"use client";

import { motion } from "framer-motion";
import { Users, ArrowRight, Check } from "lucide-react";
import { PRIVATE_EVENTS } from "@/lib/constants";
import { useUIStore } from "@/lib/store";
import { useT, useLangStore } from "@/lib/lang-store";
import { fadeUp, staggerFast, viewportOnce } from "@/lib/motion";
import { Button } from "@/components/ui/button";

export function PrivateEventsSection() {
  const t = useT();
  const lang = useLangStore((s) => s.lang);
  const openPrivateEvents = useUIStore((s) => s.openPrivateEvents);

  return (
    <section
      id="private-events"
      className="relative border-t border-border/20 bg-background py-24 sm:py-32 lg:py-40"
      aria-labelledby="private-events-heading"
    >
      {/* faint texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] cinematic-grain" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          className="grid grid-cols-1 items-end gap-8 lg:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerFast}
        >
          <motion.div variants={fadeUp}>
            <span className="text-[11px] uppercase tracking-[0.45em] text-primary">
              {t.privateEvents.eyebrow}
            </span>
            <h2
              id="private-events-heading"
              className="mt-4 font-serif-display text-[clamp(2rem,5.5vw,4rem)] font-medium leading-[1.05] text-foreground"
            >
              {t.privateEvents.h2Line1} <span className="gold-gradient-text italic">{t.privateEvents.h2Line2}</span>
            </h2>
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="max-w-md text-[14px] font-light leading-relaxed text-muted-foreground lg:justify-self-end"
          >
            {t.privateEvents.body}
          </motion.p>
        </motion.div>

        {/* Options grid */}
        <motion.div
          className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerFast}
        >
          {PRIVATE_EVENTS.map((opt, i) => (
            <motion.article
              key={opt.id}
              variants={fadeUp}
              className="group relative flex flex-col overflow-hidden rounded-sm border border-border/30 bg-[#0d0d0d] p-7 transition-colors hover:border-primary/50"
            >
              {/* number watermark */}
              <span className="pointer-events-none absolute -right-2 -top-4 font-serif-display text-[7rem] font-bold leading-none text-primary/[0.05] transition-colors group-hover:text-primary/[0.09]">
                0{i + 1}
              </span>

              <div className="relative">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-primary">
                  <Users className="size-3.5" /> {opt.tagline}
                </div>
                <h3 className="mt-3 font-serif-display text-2xl text-foreground">
                  {opt.title}
                </h3>
                <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
                  {opt.description}
                </p>

                <ul className="mt-5 space-y-2">
                  {opt.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-[12px] text-foreground/80"
                    >
                      <Check className="size-3.5 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={openPrivateEvents}
                className="group/btn mt-7 inline-flex items-center gap-1.5 self-start border-b border-primary/40 pb-1 text-[11px] uppercase tracking-[0.2em] text-primary transition-all hover:gap-3"
              >
                {t.privateEvents.inquire}
                <ArrowRight className="size-3.5 transition-transform group-hover/btn:translate-x-0.5" />
              </button>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 flex flex-col items-center gap-4 rounded-sm border border-border/30 bg-[#0a0a0a]/60 p-8 text-center sm:flex-row sm:justify-between sm:text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7 }}
        >
          <div>
            <p className="font-serif-display text-xl text-foreground">
              {t.privateEvents.ctaTitle}
            </p>
            <p className="mt-1 text-[13px] text-muted-foreground">
              {t.privateEvents.ctaBody}
            </p>
          </div>
          <Button
            onClick={openPrivateEvents}
            className="h-12 rounded-none bg-primary px-7 text-[11px] uppercase tracking-[0.25em] text-primary-foreground transition-all hover:bg-primary-dark hover:shadow-[0_0_30px_rgba(197,160,89,0.35)]"
          >
            {t.privateEvents.ctaButton}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
