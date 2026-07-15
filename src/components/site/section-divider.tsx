"use client";

import { motion } from "framer-motion";
import { EASE_CINEMA, viewportOnce } from "@/lib/motion";

/**
 * Animated cinematic section divider.
 * A thin gold line that draws outward from center with a small diamond
 * ornament. Use between sections to add editorial rhythm.
 */
export function SectionDivider({
  label,
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center gap-4 py-2 ${className ?? ""}`}
      aria-hidden="true"
    >
      <motion.span
        className="h-px bg-gradient-to-r from-transparent to-primary/60"
        initial={{ scaleX: 0, width: 0 }}
        whileInView={{ scaleX: 1, width: "min(22vw, 180px)" }}
        viewport={viewportOnce}
        transition={{ duration: 1, ease: EASE_CINEMA }}
        style={{ transformOrigin: "right" }}
      />
      <motion.span
        className="relative flex h-2 w-2 rotate-45 border border-primary"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.6, delay: 0.3, ease: EASE_CINEMA }}
      >
        <span className="absolute inset-[3px] bg-primary/70" />
      </motion.span>
      {label && (
        <motion.span
          className="text-[9px] uppercase tracking-[0.4em] text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {label}
        </motion.span>
      )}
      <motion.span
        className="h-2 w-2 rotate-45 border border-primary"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.6, delay: 0.3, ease: EASE_CINEMA }}
      />
      <motion.span
        className="h-px bg-gradient-to-l from-transparent to-primary/60"
        initial={{ scaleX: 0, width: 0 }}
        whileInView={{ scaleX: 1, width: "min(22vw, 180px)" }}
        viewport={viewportOnce}
        transition={{ duration: 1, ease: EASE_CINEMA }}
        style={{ transformOrigin: "left" }}
      />
    </div>
  );
}
