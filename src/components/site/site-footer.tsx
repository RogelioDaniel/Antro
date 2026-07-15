"use client";

import { motion } from "framer-motion";
import { Instagram, Music2, MapPin } from "lucide-react";
import { SITE, NAV_LINKS } from "@/lib/constants";
import { fadeUp, staggerFast, viewportOnce } from "@/lib/motion";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 72;
  window.scrollTo({ top, behavior: "smooth" });
}

export function SiteFooter() {
  return (
    <footer className="relative mt-auto border-t border-border/40 bg-[#070707] pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          className="grid grid-cols-1 gap-12 md:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerFast}
        >
          {/* Brand column */}
          <motion.div variants={fadeUp} className="md:col-span-1">
            <div className="flex items-baseline gap-2">
              <span className="font-serif-display text-2xl font-semibold tracking-[0.3em] text-foreground">
                LA NEGRA
              </span>
              <span className="text-[9px] uppercase tracking-[0.4em] text-muted-foreground">
                CDMX
              </span>
            </div>
            <p className="mt-5 max-w-xs text-[13px] font-light leading-relaxed text-muted-foreground">
              {SITE.tagline} Author cantina in Roma-Condesa. Mezcal, mixology and
              high-end gastronomy.
            </p>

            {/* Social */}
            <div className="mt-7 flex gap-3">
              {[
                { href: SITE.instagram, label: "Instagram", icon: <Instagram className="size-4" /> },
                { href: SITE.tiktok, label: "TikTok", icon: <Music2 className="size-4" /> },
                { href: SITE.spotify, label: "Spotify", icon: <Music2 className="size-4" /> },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border/50 text-muted-foreground transition-all hover:border-primary hover:text-primary"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div variants={fadeUp} className="md:justify-self-center">
            <h3 className="text-[10px] uppercase tracking-[0.35em] text-primary">
              Navegación
            </h3>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => scrollToId(l.id)}
                    className="link-underline text-[13px] text-foreground/80 hover:text-foreground"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal + contact */}
          <motion.div variants={fadeUp} className="md:justify-self-end">
            <h3 className="text-[10px] uppercase tracking-[0.35em] text-primary">
              La Casa
            </h3>
            <ul className="mt-5 space-y-3 text-[13px] text-foreground/80">
              <li>
                <a href="#" className="link-underline">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="link-underline">Términos</a>
              </li>
              <li>
                <a href="#" className="link-underline">Dress Code</a>
              </li>
              <li className="flex items-start gap-2 pt-2 text-muted-foreground">
                <MapPin className="mt-0.5 size-3.5 shrink-0 text-primary/70" />
                <span>{SITE.address}</span>
              </li>
              <li className="text-muted-foreground">
                <a href={`tel:${SITE.phone}`} className="link-underline">
                  {SITE.phoneDisplay}
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Big watermark */}
        <div className="pointer-events-none mt-16 select-none overflow-hidden">
          <p className="font-serif-display text-[clamp(3rem,16vw,12rem)] font-semibold leading-none tracking-tight text-foreground/[0.04]">
            LA NEGRA
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-border/30 pt-6 sm:flex-row">
          <p className="text-[11px] tracking-wide text-muted-foreground">
            © {new Date().getFullYear()} La Negra. Made with mezcal in CDMX.
          </p>
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70">
            Beber con moderación · 18+
          </p>
        </div>
      </div>
    </footer>
  );
}
