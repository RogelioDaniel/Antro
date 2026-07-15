/**
 * Shared Framer Motion variants for cinematic, consistent animation language.
 */
import type { Variants } from "framer-motion";

export const EASE_CINEMA = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_CINEMA },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1, ease: EASE_CINEMA } },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_CINEMA } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: EASE_CINEMA },
  },
};

export const blurFocus: Variants = {
  hidden: { opacity: 0, filter: "blur(14px)", scale: 1.04 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    transition: { duration: 1.4, ease: EASE_CINEMA },
  },
};

/** Shared viewport config for useInView-driven sections. */
export const viewportOnce = { once: true, amount: 0.25 } as const;

/* ------------------------------------------------------------------
   Kinetic system — campaign-style motion (loader, hero, wow moments)
   ------------------------------------------------------------------ */

/** Snappier ease for the loud kinetic moments (heavy type slamming in). */
export const EASE_KINETIC = [0.83, 0, 0.17, 1] as const;

/** Per-letter drop used on the giant hero word. */
export const letterDrop: Variants = {
  hidden: { opacity: 0, y: "0.6em", rotate: 3, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotate: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, delay: 0.05 * i, ease: EASE_KINETIC },
  }),
};

/** Container that staggers giant letters. */
export const letterStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } },
};
