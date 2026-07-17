"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useUIStore } from "@/lib/store";
import { useT } from "@/lib/lang-store";
import { EASE_KINETIC } from "@/lib/motion";

const INTRO_SESSION_KEY = "la-negra:intro-seen";

function hasSeenIntro() {
  try {
    return window.sessionStorage.getItem(INTRO_SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

function markIntroSeen() {
  try {
    window.sessionStorage.setItem(INTRO_SESSION_KEY, "1");
  } catch {
    // Storage can be unavailable in strict privacy modes; the intro still remains non-blocking.
  }
}

/**
 * Kinetic boot loader (campaign-style).
 * Phase 1 (0–1.1s): three gold bars pulse on black.
 * Phase 2 (1.1–2.6s): the house phrase crosses the screen at giant scale,
 *   zooming from oversized to readable as it slides — kinetic marquee.
 * Exit: the whole panel wipes upward like a curtain, revealing the hero.
 * It runs once per session, never blocks past the hard timeout, and is skipped
 * for reduced motion or Save-Data. Body scroll is locked only while visible.
 */
export function CinematicLoader() {
  const t = useT();
  const setLoaderDone = useUIStore((s) => s.setLoaderDone);
  const prefersReduced = useReducedMotion();
  const [phase, setPhase] = useState<"bars" | "phrase">("bars");
  const [show, setShow] = useState(false);

  useEffect(() => {
    const saveData = Boolean(
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData,
    );

    if (hasSeenIntro() || prefersReduced || saveData) {
      markIntroSeen();
      setLoaderDone(true);
      return;
    }

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const showTimer = window.setTimeout(() => setShow(true), 0);

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      setShow(false);
      setLoaderDone(true);
      markIntroSeen();
      document.body.style.overflow = prev || "";
    };

    const phraseTimer = setTimeout(() => setPhase("phrase"), 1100);
    const hideTimer = setTimeout(() => setShow(false), 2700);
    const doneTimer = setTimeout(finish, 3400);
    const hardStopTimer = setTimeout(finish, 4200);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(phraseTimer);
      clearTimeout(hideTimer);
      clearTimeout(doneTimer);
      clearTimeout(hardStopTimer);
      document.body.style.overflow = prev || "";
    };
  }, [setLoaderDone, prefersReduced]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="kinetic-loader"
          className="loader-failsafe wine-surface fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          initial={{ y: 0, opacity: 1 }}
          exit={
            prefersReduced
              ? { opacity: 0, transition: { duration: 0.5 } }
              : { y: "-100%", transition: { duration: 0.8, ease: EASE_KINETIC } }
          }
          aria-hidden="true"
          role="status"
          aria-live="polite"
        >
          <div className="cinematic-grain absolute inset-0 opacity-50" />

          {/* Phase 1 — three pulsing gold bars (the beat before the drop) */}
          {phase === "bars" && (
            <div className="flex items-center gap-5" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="block h-24 w-7 bg-primary sm:h-32 sm:w-9"
                  style={{
                    animation: prefersReduced
                      ? undefined
                      : `bar-pulse 0.55s ease-in-out ${i * 0.14}s infinite`,
                    transformOrigin: "center",
                    boxShadow:
                      "0 0 34px rgba(197,160,89,0.55), 0 0 90px rgba(139,92,246,0.2)",
                  }}
                />
              ))}
            </div>
          )}

          {/* Phase 2 — giant phrase slams across the screen */}
          {phase === "phrase" && (
            <motion.div
              className="font-kinetic chrome-gold gold-halo whitespace-nowrap"
              style={{ fontSize: "clamp(6rem, 26vw, 22rem)" }}
              initial={
                prefersReduced
                  ? { opacity: 0 }
                  : { x: "60%", scale: 1.35, opacity: 1 }
              }
              animate={
                prefersReduced
                  ? { opacity: 1 }
                  : { x: "-60%", scale: 1, opacity: 1 }
              }
              transition={
                prefersReduced
                  ? { duration: 0.4 }
                  : { duration: 1.7, ease: [0.3, 0.1, 0.3, 1] }
              }
            >
              {t.kinetic.loaderPhrase}
            </motion.div>
          )}

          {/* Corner brand mark, quiet and constant */}
          <span className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.5em] text-foreground/60">
            LA NEGRA · {t.loader.tagline}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
