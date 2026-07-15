"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Disc3, ExternalLink } from "lucide-react";
import { useT } from "@/lib/lang-store";
import { SITE } from "@/lib/constants";

/**
 * Ambient playlist embed for the experience section.
 * A stylized "now spinning" card with a hidden Spotify iframe that
 * toggles play/pause. Fits the cinematic dark theme.
 */
export function AmbientPlayer() {
  const t = useT();
  const [playing, setPlaying] = useState(false);

  // Spotify embed for a public mezcal/nightlife-flavored playlist
  const embedSrc =
    "https://open.spotify.com/embed/playlist/37i9dQZF1DX8Sz1gsYZdwj?utm_source=generator&theme=0";

  return (
    <motion.div
      className="relative overflow-hidden rounded-sm border border-border/40 bg-[#0d0d0d]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
    >
      {/* vinyl visual */}
      <div className="relative flex items-center gap-5 p-6">
        <motion.div
          className="relative flex h-20 w-20 shrink-0 items-center justify-center"
          animate={playing ? { rotate: 360 } : { rotate: 0 }}
          transition={
            playing
              ? { duration: 6, repeat: Infinity, ease: "linear" }
              : { duration: 0.4 }
          }
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#1a1a1a] to-[#050505] shadow-inner" />
          <div className="absolute inset-2 rounded-full border border-primary/20" />
          <div className="absolute inset-4 rounded-full border border-primary/10" />
          <div className="absolute inset-6 rounded-full border border-primary/10" />
          <div className="relative flex h-7 w-7 items-center justify-center rounded-full bg-primary">
            <Disc3 className="size-4 text-primary-foreground" />
          </div>
          <div className="absolute inset-0 rounded-full ring-1 ring-primary/30" />
        </motion.div>

        <div className="min-w-0 flex-1">
          <span className="text-[10px] uppercase tracking-[0.35em] text-primary">
            {t.experience.eyebrow === "Our Concept" ? "Now Spinning" : "Sonando Ahora"}
          </span>
          <p className="mt-1 font-serif-display text-xl text-foreground">
            Mezcal &amp; Midnight
          </p>
          <p className="truncate text-[12px] text-muted-foreground">
            {t.experience.eyebrow === "Our Concept"
              ? "A curated set for the dark hours."
              : "Una selección curada para las horas oscuras."}
          </p>
        </div>

        <button
          onClick={() => setPlaying((p) => !p)}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all hover:bg-primary-dark hover:shadow-[0_0_24px_rgba(197,160,89,0.4)]"
          aria-label={playing ? "Pausar" : "Reproducir"}
        >
          {playing ? <Pause className="size-5" /> : <Play className="size-5 translate-x-0.5" />}
        </button>
      </div>

      {/* hidden spotify iframe — mounts when playing */}
      {playing && (
        <div className="border-t border-border/30">
          <iframe
            src={embedSrc}
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="La Negra ambient playlist"
            className="block"
            style={{ borderRadius: 0 }}
          />
        </div>
      )}

      {/* footer link */}
      <a
        href={SITE.spotify}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-1.5 border-t border-border/30 py-2.5 text-[10px] uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-primary"
      >
        <ExternalLink className="size-3" />
        Spotify · La Negra
      </a>
    </motion.div>
  );
}
