"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useT } from "@/lib/lang-store";
import { EASE_KINETIC, viewportOnce } from "@/lib/motion";

/**
 * WOW section — the campaign centerpiece.
 * Concentric rings of circular text rotate at different speeds around a
 * circular photograph; a giant kinetic word sits across the whole scene.
 * (KFC "WOOOW" reference, translated to the house's wine + gold voice.)
 */

const RINGS = [
  { r: 130, dur: 46, reverse: false, opacity: 0.5 },
  { r: 196, dur: 62, reverse: true, opacity: 0.38 },
  { r: 262, dur: 80, reverse: false, opacity: 0.28 },
];

export function WowSection() {
  const t = useT();
  const prefersReduced = useReducedMotion();

  return (
    <section
      className="wine-surface relative flex min-h-[92svh] items-center justify-center overflow-hidden py-28"
      aria-label={t.kinetic.wow.caption}
    >
      <div className="cinematic-grain absolute inset-0 opacity-50" />

      {/* Concentric target circles + rotating ring text */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 600 600"
          className="h-[min(140vw,780px)] w-[min(140vw,780px)]"
        >
          {/* tonal bullseye */}
          <circle cx="300" cy="300" r="290" fill="rgba(61,10,18,0.55)" />
          <circle cx="300" cy="300" r="228" fill="rgba(74,13,22,0.6)" />
          <circle cx="300" cy="300" r="162" fill="rgba(90,18,28,0.65)" />

          <defs>
            {RINGS.map((ring, i) => (
              <path
                key={i}
                id={`wow-ring-${i}`}
                d={`M 300,300 m -${ring.r},0 a ${ring.r},${ring.r} 0 1,1 ${ring.r * 2},0 a ${ring.r},${ring.r} 0 1,1 -${ring.r * 2},0`}
                fill="none"
              />
            ))}
          </defs>

          {RINGS.map((ring, i) => (
            <g
              key={i}
              className={prefersReduced ? undefined : "ring-spin"}
              data-reverse={ring.reverse || undefined}
              style={{ ["--ring-dur" as string]: `${ring.dur}s`, transformOrigin: "300px 300px" }}
            >
              <text
                className="font-kinetic"
                fill={`rgba(197,160,89,${ring.opacity})`}
                fontSize={i === 0 ? 30 : 26}
                letterSpacing="3"
              >
                <textPath href={`#wow-ring-${i}`}>
                  {t.kinetic.wow.ring.repeat(3)}
                </textPath>
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Giant word across the scene */}
      <motion.h2
        className="font-kinetic pointer-events-none absolute z-10 w-full text-center text-foreground"
        style={{ fontSize: "clamp(4rem, 17vw, 15rem)", textShadow: "0 20px 80px rgba(0,0,0,0.6)" }}
        initial={{ opacity: 0, scale: 0.86 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.9, ease: EASE_KINETIC }}
      >
        {t.kinetic.wow.word}
      </motion.h2>

      {/* Circular photo punched through the word */}
      <motion.div
        className="relative z-20 h-[min(58vw,340px)] w-[min(58vw,340px)] overflow-hidden rounded-full border-[6px] border-foreground shadow-[0_30px_90px_rgba(0,0,0,0.65)]"
        initial={{ scale: 0, rotate: -8 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={viewportOnce}
        transition={{ type: "spring", stiffness: 120, damping: 16, delay: 0.25 }}
      >
        <Image
          src="/images/gallery/g2.png"
          alt="La pista de La Negra en plena noche"
          fill
          sizes="(max-width: 768px) 58vw, 340px"
          className="object-cover"
        />
      </motion.div>

      {/* Caption */}
      <motion.p
        className="font-display-quote absolute bottom-12 z-20 w-full px-6 text-center text-xl italic text-foreground/85 sm:text-2xl"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.8, delay: 0.5, ease: EASE_KINETIC }}
      >
        {t.kinetic.wow.caption}
      </motion.p>
    </section>
  );
}
