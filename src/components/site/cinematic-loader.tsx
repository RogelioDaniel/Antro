"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useUIStore } from "@/lib/store";
import { EASE_CINEMA } from "@/lib/motion";

/**
 * Cinematic boot loader.
 * - Solid black overlay
 * - "LA NEGRA" fades in with a blur-to-focus effect
 * - A thin gold line draws underneath the logo from centre outward
 * - Duration ~2.5s, then fades out revealing the hero
 * - Body scroll is locked while visible
 */
export function CinematicLoader() {
  const setLoaderDone = useUIStore((s) => s.setLoaderDone);
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Lock scroll while the loader is on screen.
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const fadeTimer = setTimeout(() => setShow(false), 2500);
    const doneTimer = setTimeout(() => {
      setLoaderDone(true);
      document.body.style.overflow = prev || "";
    }, 3200);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
      document.body.style.overflow = prev || "";
    };
  }, [setLoaderDone]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="cinematic-loader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0a]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: EASE_CINEMA }}
          aria-hidden="true"
          role="status"
          aria-live="polite"
        >
          {/* faint grain */}
          <div className="cinematic-grain absolute inset-0 opacity-60" />

          <motion.div
            className="relative flex flex-col items-center"
            initial="hidden"
            animate="visible"
          >
            <motion.span
              className="font-serif-display text-[clamp(2rem,7vw,3.75rem)] font-semibold tracking-[0.35em] text-foreground"
              variants={{
                hidden: { opacity: 0, filter: "blur(16px)", letterSpacing: "0.55em" },
                visible: {
                  opacity: 1,
                  filter: "blur(0px)",
                  letterSpacing: "0.35em",
                  transition: { duration: 1.4, ease: EASE_CINEMA },
                },
              }}
            >
              LA NEGRA
            </motion.span>

            {/* gold line drawing from center outward */}
            <motion.div
              className="mt-6 h-px bg-primary"
              style={{ transformOrigin: "center" }}
              initial={{ scaleX: 0, width: "0%", opacity: 0 }}
              animate={{
                scaleX: 1,
                width: "min(60vw, 320px)",
                opacity: 1,
              }}
              transition={{ duration: 1.1, ease: EASE_CINEMA, delay: 0.7 }}
            />

            <motion.span
              className="mt-4 text-[10px] uppercase tracking-[0.5em] text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.4, ease: EASE_CINEMA }}
            >
              Cantina · CDMX
            </motion.span>
          </motion.div>

          {/* progress dot */}
          <motion.span
            className="absolute bottom-10 h-1 w-1 rounded-full bg-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 1.6 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
