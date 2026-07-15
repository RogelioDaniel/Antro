"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { useUIStore } from "@/lib/store";
import { useT } from "@/lib/lang-store";
import { EASE_CINEMA, letterDrop, letterStagger } from "@/lib/motion";
import { Button } from "@/components/ui/button";
import { ClubLights } from "@/components/site/club-lights";
import { Equalizer } from "@/components/site/equalizer";

// Deterministic ember positions for cinematic ambience (avoids re-randomizing on re-render)
const EMBER_CONFIG = [
  { left: 8, dur: 14, delay: 0, drift: 30, size: 2 },
  { left: 18, dur: 18, delay: 3, drift: -20, size: 1.5 },
  { left: 27, dur: 12, delay: 6, drift: 40, size: 2.5 },
  { left: 38, dur: 20, delay: 1.5, drift: -35, size: 1.5 },
  { left: 47, dur: 16, delay: 8, drift: 25, size: 2 },
  { left: 56, dur: 22, delay: 4, drift: -15, size: 1.5 },
  { left: 64, dur: 13, delay: 7, drift: 45, size: 2.5 },
  { left: 73, dur: 19, delay: 2, drift: -25, size: 2 },
  { left: 82, dur: 15, delay: 5, drift: 30, size: 1.5 },
  { left: 91, dur: 17, delay: 9, drift: -40, size: 2 },
];

const TILE_ROWS = 9;
const TILE_REPEATS = 8;

export function HeroSection() {
  const t = useT();
  const ref = useRef<HTMLElement>(null);
  const openReservation = useUIStore((s) => s.openReservation);
  const openVip = useUIStore((s) => s.openVip);
  const loaderDone = useUIStore((s) => s.loaderDone);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const wallY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  const letters = t.kinetic.heroWord.split("");

  return (
    <section
      ref={ref}
      id="top"
      className="wine-surface relative flex h-[100svh] min-h-[640px] w-full items-center justify-center overflow-hidden"
      aria-label="Inicio"
    >
      {/* Tiled phrase wall — the campaign wallpaper (KFC "EASY TO ENJOY" wall) */}
      <motion.div
        className="pointer-events-none absolute inset-[-12%]"
        style={{ y: wallY }}
        aria-hidden="true"
      >
        <div className="tile-drift flex h-full flex-col justify-between">
          {Array.from({ length: TILE_ROWS }).map((_, row) => (
            <div
              key={row}
              className="font-kinetic whitespace-nowrap text-[clamp(2.2rem,5.5vw,4.5rem)] text-[#7a1f2b]/35"
              style={{ transform: `translateX(${row % 2 === 0 ? -4 : 2}%)` }}
            >
              {Array.from({ length: TILE_REPEATS })
                .map(() => t.kinetic.heroTile)
                .join("    ")}
            </div>
          ))}
        </div>
      </motion.div>

      {/* The lighting rig — beams + haze over the type wall */}
      <ClubLights variant="hero" />

      {/* Vignette + grain to keep the premium darkness */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,10,0.55)_90%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
      <div className="cinematic-grain absolute inset-0 opacity-60" />

      {/* Floating gold embers */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {EMBER_CONFIG.map((e, i) => (
          <span
            key={i}
            className="ember"
            style={{
              left: `${e.left}%`,
              animationDuration: `${e.dur}s`,
              animationDelay: `${e.delay}s`,
              ["--drift" as string]: `${e.drift}px`,
              width: `${e.size}px`,
              height: `${e.size}px`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-6 text-center will-change-transform"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.span
          className="mb-4 text-[11px] uppercase tracking-[0.55em] text-primary sm:text-xs"
          initial={{ opacity: 0, y: 12 }}
          animate={loaderDone ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE_CINEMA }}
        >
          {t.hero.eyebrow}
        </motion.span>

        {/* Giant kinetic word — LA + NEGRA letter by letter */}
        <h1 className="flex flex-col items-center" aria-label={`${t.kinetic.heroPre} ${t.kinetic.heroWord}`}>
          <motion.span
            className="font-display-quote text-[clamp(1.6rem,4vw,3rem)] italic leading-none text-primary"
            initial={{ opacity: 0 }}
            animate={loaderDone ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.35, ease: EASE_CINEMA }}
            aria-hidden="true"
          >
            {t.kinetic.heroPre}
          </motion.span>
          <motion.span
            className="font-kinetic gold-halo mt-1 flex"
            style={{ fontSize: "clamp(5rem, 21vw, 19rem)" }}
            variants={prefersReduced ? undefined : letterStagger}
            initial={prefersReduced ? { opacity: 0 } : "hidden"}
            animate={
              loaderDone ? (prefersReduced ? { opacity: 1 } : "visible") : undefined
            }
            transition={prefersReduced ? { duration: 0.6 } : undefined}
            aria-hidden="true"
          >
            {letters.map((ch, i) => (
              <motion.span
                key={`${ch}-${i}`}
                custom={i}
                variants={prefersReduced ? undefined : letterDrop}
                className="chrome-gold inline-block"
              >
                {ch}
              </motion.span>
            ))}
          </motion.span>
        </h1>

        <motion.p
          className="mt-6 max-w-xl text-balance text-[15px] font-light leading-relaxed text-foreground/80 sm:text-base"
          initial={{ opacity: 0, y: 18 }}
          animate={loaderDone ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.75, ease: EASE_CINEMA }}
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          className="mt-9 flex flex-col items-center gap-5 sm:flex-row sm:gap-7"
          initial={{ opacity: 0, y: 18 }}
          animate={loaderDone ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.95, ease: EASE_CINEMA }}
        >
          <Button
            onClick={openReservation}
            size="lg"
            className="btn-shine group h-13 rounded-full bg-primary px-10 py-6 text-[12px] uppercase tracking-[0.25em] text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_0_50px_rgba(197,160,89,0.45)]"
          >
            {t.hero.ctaReserve}
          </Button>
          <button
            onClick={openVip}
            className="rounded-full border border-foreground/30 px-8 py-3.5 text-[12px] uppercase tracking-[0.25em] text-foreground/90 transition-colors hover:border-primary hover:text-primary"
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
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-foreground/70"
        initial={{ opacity: 0 }}
        animate={loaderDone ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.4 }}
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

      {/* Side ornament — the house's pulse */}
      <motion.div
        className="absolute bottom-8 left-6 z-10 hidden items-end gap-3 lg:flex"
        initial={{ opacity: 0 }}
        animate={loaderDone ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.6 }}
      >
        <Equalizer />
        <span className="pb-0.5 text-[9px] uppercase tracking-[0.35em] text-foreground/60">
          Live
        </span>
      </motion.div>

      {/* Side ornament — hours */}
      <motion.div
        className="absolute bottom-8 right-6 z-10 hidden flex-col items-end gap-1 lg:flex"
        initial={{ opacity: 0 }}
        animate={loaderDone ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.6 }}
      >
        <span className="text-[9px] uppercase tracking-[0.35em] text-foreground/60">
          {t.hero.hoursLabel}
        </span>
        <span className="text-[11px] tracking-[0.2em] text-primary">20:00 — 03:00</span>
      </motion.div>
    </section>
  );
}
