"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Gold scroll-progress hairline pinned above the navbar — a quiet
 * premium cue that also orients the reader on a long single page.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-[#a6863e] via-[#f0d68f] to-[#c5a059]"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
