"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { GALLERY, GALLERY_CAPTIONS, type GalleryCategory } from "@/lib/constants";
import { useUIStore } from "@/lib/store";
import { useT, useLangStore } from "@/lib/lang-store";
import { fadeUp, staggerFast, viewportOnce, EASE_CINEMA } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Filter = "all" | GalleryCategory;

const FILTERS: Filter[] = ["all", "room", "craft", "people", "garnish"];

export function GallerySection() {
  const t = useT();
  const lang = useLangStore((s) => s.lang);
  const openLightbox = useUIStore((s) => s.openLightbox);
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(
    () => (filter === "all" ? GALLERY : GALLERY.filter((g) => g.category === filter)),
    [filter]
  );

  const filterLabel = (f: Filter) =>
    (
      {
        all: t.gallery.filters.all,
        room: t.gallery.filters.room,
        craft: t.gallery.filters.craft,
        people: t.gallery.filters.people,
        garnish: t.gallery.filters.garnish,
      } as Record<Filter, string>
    )[f];

  return (
    <section
      id="gallery"
      className="relative border-t border-border/20 bg-background py-24 sm:py-32 lg:py-40"
      aria-labelledby="gallery-heading"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          className="flex flex-col items-center text-center"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerFast}
        >
          <motion.span variants={fadeUp} className="text-[11px] uppercase tracking-[0.45em] text-primary">
            {t.gallery.eyebrow}
          </motion.span>
          <motion.h2
            id="gallery-heading"
            variants={fadeUp}
            className="mt-4 font-serif-display text-[clamp(2rem,5.5vw,4rem)] font-medium leading-[1.05] text-foreground"
          >
            {t.gallery.h2}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-xl text-[14px] font-light leading-relaxed text-muted-foreground"
          >
            {t.gallery.sub}
          </motion.p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="mt-10 flex flex-wrap justify-center gap-2"
          role="radiogroup"
          aria-label={t.gallery.h2}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6 }}
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              role="radio"
              aria-checked={filter === f}
              className={cn(
                "relative min-h-[44px] rounded-full border px-5 py-2 text-[10px] uppercase tracking-[0.25em] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                filter === f
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border/40 text-muted-foreground hover:border-primary/50 hover:text-foreground"
              )}
            >
              {filterLabel(f)}
              {filter === f && (
                <motion.span
                  layoutId="gallery-filter-dot"
                  className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary"
                  transition={{ duration: 0.3, ease: EASE_CINEMA }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Masonry grid (animated on filter change) */}
        <motion.div
          className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:auto-rows-[200px] lg:auto-rows-[240px]"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((img, i) => (
              <motion.button
                key={img.src}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: EASE_CINEMA, delay: i * 0.04 }}
                onClick={() => openLightbox(GALLERY.indexOf(img))}
                className={cn(
                  "group relative overflow-hidden rounded-sm border border-border/30",
                  img.span
                )}
                aria-label={GALLERY_CAPTIONS[img.captionKey][lang]}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
                <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-primary/40 bg-[#0a0a0a]/70 text-primary opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                  <ZoomIn className="size-3.5" />
                </span>
                <div className="absolute bottom-0 left-0 flex w-full items-center justify-between p-4">
                  <span className="font-serif-display text-sm text-foreground">
                    {GALLERY_CAPTIONS[img.captionKey][lang]}
                  </span>
                  <span className="font-mono text-[10px] text-primary/70">
                    {String(GALLERY.indexOf(img) + 1).padStart(2, "0")}
                  </span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <Lightbox />
    </section>
  );
}

function Lightbox() {
  const t = useT();
  const { open, index } = useUIStore((s) => s.lightbox);
  const setIndex = useUIStore((s) => s.setLightboxIndex);
  const close = useUIStore((s) => s.closeLightbox);
  const lang = useLangStore((s) => s.lang);

  const next = useCallback(
    (dir: 1 | -1) => {
      setIndex((index + dir + GALLERY.length) % GALLERY.length);
    },
    [index, setIndex]
  );

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next(1);
      if (e.key === "ArrowLeft") next(-1);
    };
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", handler);
    };
  }, [open, next, close]);

  const current = GALLERY[index];

  return (
    <AnimatePresence>
      {open && current && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-[#0a0a0a]/95 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Visor de galería"
        >
          <button
            onClick={close}
            className="absolute right-5 top-5 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-border/50 text-foreground transition-colors hover:border-primary hover:text-primary"
            aria-label="Cerrar"
          >
            <X className="size-5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              next(-1);
            }}
            className="absolute left-3 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-border/50 text-foreground transition-colors hover:border-primary hover:text-primary sm:left-6"
            aria-label="Anterior"
          >
            <ChevronLeft className="size-5" />
          </button>

          <motion.figure
            key={current.src}
            className="relative mx-auto max-h-[85vh] max-w-[90vw]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: EASE_CINEMA }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={current.src}
              alt={current.alt}
              className="max-h-[78vh] w-auto rounded-sm border border-border/40 object-contain"
            />
            <figcaption className="mt-4 flex items-center justify-center gap-3 text-center">
              <span className="font-serif-display text-lg text-foreground">
                {GALLERY_CAPTIONS[current.captionKey][lang]}
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                {index + 1} / {GALLERY.length}
              </span>
            </figcaption>
          </motion.figure>

          <button
            onClick={(e) => {
              e.stopPropagation();
              next(1);
            }}
            className="absolute right-3 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-border/50 text-foreground transition-colors hover:border-primary hover:text-primary sm:right-6"
            aria-label="Siguiente"
          >
            <ChevronRight className="size-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
