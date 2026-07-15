"use client";

import { motion } from "framer-motion";
import { useUIStore } from "@/lib/store";
import { useT } from "@/lib/lang-store";
import { EASE_KINETIC, viewportOnce } from "@/lib/motion";

/**
 * Pattern CTA — full-bleed wine wall tiled with drifting agave glyphs
 * (KFC drumstick-wall reference) and a giant two-line kinetic headline
 * over a black pill CTA that opens the reservation modal.
 */

// Stylized agave: a fan of gold strokes radiating from the base.
const AGAVE_SVG = encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'><g fill='none' stroke='rgba(197,160,89,0.22)' stroke-width='2.5' stroke-linecap='round'><path d='M60 96 L60 40'/><path d='M60 96 L40 50'/><path d='M60 96 L80 50'/><path d='M60 96 L26 66'/><path d='M60 96 L94 66'/><path d='M60 96 L32 88'/><path d='M60 96 L88 88'/></g></svg>`,
);

export function PatternCtaSection() {
  const t = useT();
  const openReservation = useUIStore((s) => s.openReservation);

  return (
    <section
      className="wine-surface relative overflow-hidden py-32 sm:py-40"
      aria-label={t.kinetic.patternCta.button}
    >
      {/* Drifting agave wallpaper */}
      <div
        className="pattern-drift absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,${AGAVE_SVG}")`,
          backgroundSize: "120px 120px",
        }}
        aria-hidden="true"
      />
      <div className="cinematic-grain absolute inset-0 opacity-40" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <motion.h2
          className="font-kinetic text-foreground"
          style={{ fontSize: "clamp(2.4rem, 7.5vw, 5.5rem)", textShadow: "0 14px 50px rgba(0,0,0,0.5)" }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: EASE_KINETIC }}
        >
          {t.kinetic.patternCta.h2Line1}
          <br />
          <span className="text-primary">{t.kinetic.patternCta.h2Line2}</span>
        </motion.h2>

        <motion.button
          onClick={openReservation}
          className="mt-12 rounded-full bg-[#0a0a0a] px-12 py-5 text-[13px] uppercase tracking-[0.3em] text-foreground shadow-[0_18px_60px_rgba(0,0,0,0.5)] transition-transform hover:scale-105 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewportOnce}
          transition={{ type: "spring", stiffness: 160, damping: 18, delay: 0.3 }}
        >
          {t.kinetic.patternCta.button}
        </motion.button>
      </div>
    </section>
  );
}
