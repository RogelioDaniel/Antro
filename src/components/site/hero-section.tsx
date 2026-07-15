"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { useUIStore } from "@/lib/store";
import { useT } from "@/lib/lang-store";
import { EASE_CINEMA } from "@/lib/motion";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const t = useT();
  const ref = useRef<HTMLElement>(null);
  const openReservation = useUIStore((s) => s.openReservation);
  const openVip = useUIStore((s) => s.openVip);

  // Slow cinematic parallax on the background image
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.22]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex h-[100svh] min-h-[640px] w-full items-center justify-center overflow-hidden"
      aria-label="Inicio"
    >
      {/* Background image with slow cinematic zoom */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ y: bgY, scale: bgScale }}
      >
        <img
          src="/images/hero-bg.png"
          alt="Interior de la cantina La Negra con luz dorada y botellas de mezcal"
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
      </motion.div>

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/55 to-[#0a0a0a]/70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,10,0.6)_85%)]" />
      <div className="cinematic-grain absolute inset-0 opacity-70" />

      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center will-change-transform"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.span
          className="mb-6 text-[11px] uppercase tracking-[0.55em] text-primary sm:text-xs"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE_CINEMA }}
        >
          {t.hero.eyebrow}
        </motion.span>

        <motion.h1
          className="font-serif-display text-foreground text-gold-glow text-[clamp(2.75rem,9vw,7rem)] font-medium leading-[0.95]"
          initial={{ opacity: 0, y: 28, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.3, delay: 0.45, ease: EASE_CINEMA }}
        >
          {t.hero.h1Line1}
          <br />
          <span className="gold-gradient-text italic">{t.hero.h1Line2}</span>
        </motion.h1>

        <motion.p
          className="mt-7 max-w-xl text-balance text-[15px] font-light leading-relaxed text-foreground/75 sm:text-base"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.85, ease: EASE_CINEMA }}
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center gap-5 sm:flex-row sm:gap-7"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1, ease: EASE_CINEMA }}
        >
          <Button
            onClick={openReservation}
            size="lg"
            className="group h-13 rounded-none bg-primary px-9 py-6 text-[12px] uppercase tracking-[0.25em] text-primary-foreground transition-all hover:bg-primary-dark hover:shadow-[0_0_40px_rgba(197,160,89,0.4)]"
          >
            {t.hero.ctaReserve}
          </Button>
          <button
            onClick={openVip}
            className="link-underline text-[12px] uppercase tracking-[0.25em] text-foreground/85 transition-colors hover:text-primary"
          >
            {t.hero.ctaVip}
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => {
          const el = document.getElementById("experience");
          if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY - 72;
            window.scrollTo({ top, behavior: "smooth" });
          }
        }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        aria-label={t.hero.scroll}
      >
        <span className="text-[9px] uppercase tracking-[0.4em]">{t.hero.scroll}</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="size-4" />
        </motion.span>
      </motion.button>

      {/* Side ornament — hours */}
      <motion.div
        className="absolute bottom-8 right-6 z-10 hidden flex-col items-end gap-1 lg:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
      >
        <span className="text-[9px] uppercase tracking-[0.35em] text-muted-foreground">
          {t.hero.hoursLabel}
        </span>
        <span className="text-[11px] tracking-[0.2em] text-primary">20:00 — 03:00</span>
      </motion.div>
    </section>
  );
}
