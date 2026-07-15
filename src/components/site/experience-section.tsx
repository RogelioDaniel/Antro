"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Droplet, Wine, Utensils } from "lucide-react";
import { fadeUp, staggerContainer, viewportOnce, EASE_CINEMA } from "@/lib/motion";

const GALLERY = [
  {
    src: "/images/experience-1.png",
    alt: "Botellas de mezcal artesanal en estantería con luz dorada",
    caption: "Single-village mezcal",
    span: "md:col-span-4 md:row-span-2",
    parallax: 60,
  },
  {
    src: "/images/experience-2.png",
    alt: "Bartender preparando un cóctel de mezcal con luz dramática",
    caption: "Signature mixology",
    span: "md:col-span-8",
    parallax: 30,
  },
  {
    src: "/images/experience-3.png",
    alt: "Interior oscuro y lujoso de la cantina con luces colgantes doradas",
    caption: "The room",
    span: "md:col-span-8",
    parallax: 45,
  },
];

export function ExperienceSection() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      ref={ref}
      id="experience"
      className="relative bg-background py-24 sm:py-32 lg:py-40"
      aria-labelledby="experience-heading"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Eyebrow + heading */}
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          <motion.span
            variants={fadeUp}
            className="text-[11px] uppercase tracking-[0.45em] text-primary"
          >
            Our Concept
          </motion.span>
          <motion.h2
            id="experience-heading"
            variants={fadeUp}
            className="mt-5 font-serif-display text-[clamp(2rem,5.5vw,4rem)] font-medium leading-[1.05] text-foreground"
          >
            A homage to darkness
            <br />
            and <span className="gold-gradient-text italic">fine drinking.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-7 max-w-2xl text-pretty text-[15px] font-light leading-relaxed text-muted-foreground sm:text-base"
          >
            At La Negra, we rescue the tradition of the Mexican cantina and
            elevate it to its maximum expression. Single-village mezcal,
            signature mixology, and a gastronomic curation that defies the
            night.
          </motion.p>
        </motion.div>

        {/* Decorative quote */}
        <motion.blockquote
          className="mx-auto mt-14 max-w-2xl text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 1.2, ease: EASE_CINEMA }}
        >
          <p className="font-display-quote text-[clamp(1.25rem,3vw,1.9rem)] font-light italic leading-snug text-foreground/85">
            “La noche no se bebe. Se habita.”
          </p>
        </motion.blockquote>

        {/* Asymmetric parallax gallery */}
        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-12 md:auto-rows-[260px]">
          {GALLERY.map((img, i) => (
            <ParallaxCard key={i} {...img} index={i} />
          ))}
        </div>

        {/* Three pillars */}
        <motion.div
          className="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-border/40 sm:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          {[
            { k: "01", icon: "droplet", t: "Mezcal de Pueblo", d: "Espíritus trazables, destilados por maestros mezcaleros." },
            { k: "02", icon: "wine", t: "Mixología de Autor", d: "Cócteles que reinterpretan la cantina mexicana." },
            { k: "03", icon: "utensils", t: "Curaduría Gastronómica", d: "Alta cocina informal que acompaña la noche." },
          ].map((p) => (
            <motion.div
              key={p.k}
              variants={fadeUp}
              className="group relative bg-[#0d0d0d] p-7 transition-colors hover:bg-[#121212]"
            >
              {/* gold top accent on hover */}
              <span className="absolute inset-x-0 top-0 h-px scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100" />
              <div className="flex items-center justify-between">
                <span className="font-serif-display text-3xl text-primary/60 transition-colors group-hover:text-primary">
                  {p.k}
                </span>
                <PillarIcon name={p.icon} />
              </div>
              <h3 className="mt-3 font-serif-display text-xl text-foreground">
                {p.t}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                {p.d}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function PillarIcon({ name }: { name: string }) {
  const cls =
    "size-6 text-muted-foreground/50 transition-colors group-hover:text-primary";
  if (name === "droplet") return <Droplet className={cls} />;
  if (name === "wine") return <Wine className={cls} />;
  return <Utensils className={cls} />;
}

function ParallaxCard({
  src,
  alt,
  caption,
  span,
  parallax,
  index,
}: {
  src: string;
  alt: string;
  caption: string;
  span: string;
  parallax: number;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // images move slower than the container -> parallax
  const y = useTransform(scrollYProgress, [0, 1], [`-${parallax}px`, `${parallax}px`]);

  return (
    <motion.div
      ref={ref}
      className={`group relative overflow-hidden rounded-sm border border-border/30 ${span}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.9, delay: index * 0.12, ease: EASE_CINEMA }}
    >
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className="absolute inset-0 h-[calc(100%+120px)] w-full -translate-y-[60px] object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 flex w-full items-center justify-between p-5">
        <span className="text-[10px] uppercase tracking-[0.35em] text-foreground/90">
          {caption}
        </span>
        <span className="font-serif-display text-sm text-primary">
          0{index + 1}
        </span>
      </div>
    </motion.div>
  );
}
