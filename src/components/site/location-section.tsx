"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Navigation, ExternalLink } from "lucide-react";
import { SITE } from "@/lib/constants";
import { fadeUp, staggerFast, viewportOnce } from "@/lib/motion";

export function LocationSection() {
  return (
    <section
      id="location"
      className="relative bg-[#0c0c0c] py-24 sm:py-32 lg:py-40"
      aria-labelledby="location-heading"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerFast}
        >
          <motion.span variants={fadeUp} className="text-[11px] uppercase tracking-[0.45em] text-primary">
            Encuéntranos
          </motion.span>
          <motion.h2
            id="location-heading"
            variants={fadeUp}
            className="mt-4 font-serif-display text-[clamp(2rem,5.5vw,4rem)] font-medium leading-[1.05] text-foreground"
          >
            Location &amp; Hours
          </motion.h2>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Map */}
          <motion.div
            className="relative aspect-[4/3] overflow-hidden rounded-sm border border-border/40 lg:aspect-auto lg:min-h-[460px]"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.9 }}
          >
            <iframe
              title="Mapa de La Negra en Roma Norte, CDMX"
              src={SITE.mapEmbed}
              className="dark-map absolute inset-0 h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* gradient frame overlay */}
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-primary/20" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0c0c0c] to-transparent" />
            {/* pin label */}
            <div className="pointer-events-none absolute bottom-5 left-5 rounded-sm border border-primary/40 bg-[#0a0a0a]/85 px-4 py-2.5 backdrop-blur">
              <p className="font-serif-display text-sm text-foreground">LA NEGRA</p>
              <p className="text-[10px] uppercase tracking-[0.25em] text-primary">
                Roma Norte
              </p>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            className="flex flex-col justify-between gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerFast}
          >
            <div className="space-y-8">
              <motion.div variants={fadeUp} className="border-l border-primary/40 pl-6">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-primary">
                  <MapPin className="size-3.5" /> Dirección
                </div>
                <p className="mt-3 font-serif-display text-2xl leading-snug text-foreground">
                  {SITE.address}
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="border-l border-primary/40 pl-6">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-primary">
                  <Clock className="size-3.5" /> Horario
                </div>
                <p className="mt-3 font-serif-display text-2xl text-foreground">
                  {SITE.hoursLabel}
                </p>
                <p className="mt-1 text-[14px] tracking-[0.2em] text-muted-foreground">
                  20:00 — 03:00
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="border-l border-primary/40 pl-6">
                <div className="text-[10px] uppercase tracking-[0.35em] text-primary">
                  Dress Code
                </div>
                <p className="mt-3 font-serif-display text-2xl text-foreground">
                  Smart Casual
                </p>
                <p className="mt-1 text-[13px] text-muted-foreground">
                  Reservamos el derecho de admisión.
                </p>
              </motion.div>
            </div>

            <motion.div variants={fadeUp} className="flex flex-col gap-3 sm:flex-row">
              <a
                href={SITE.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-13 flex-1 items-center justify-center gap-2 bg-primary px-6 py-3.5 text-[11px] uppercase tracking-[0.25em] text-primary-foreground transition-all hover:bg-primary-dark hover:shadow-[0_0_30px_rgba(197,160,89,0.35)]"
              >
                <Navigation className="size-4" />
                Get Directions
              </a>
              <a
                href={SITE.wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-13 flex-1 items-center justify-center gap-2 border border-border/60 px-6 py-3.5 text-[11px] uppercase tracking-[0.25em] text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                Waze
                <ExternalLink className="size-3.5" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
