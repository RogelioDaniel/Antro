"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, CalendarDays } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { useUIStore } from "@/lib/store";
import { useT } from "@/lib/lang-store";
import { useScrollSpy, useScrolled } from "@/hooks/use-scroll-spy";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/site/language-toggle";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 72;
  window.scrollTo({ top, behavior: "smooth" });
}

function Brand({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={() => {
        onClick?.();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="group flex items-baseline gap-2"
      aria-label="La Negra — inicio"
    >
      <span className="font-serif-display text-xl font-semibold tracking-[0.3em] text-foreground transition-colors group-hover:text-primary sm:text-2xl">
        LA NEGRA
      </span>
      <span className="hidden text-[9px] uppercase tracking-[0.4em] text-muted-foreground sm:inline">
        CDMX
      </span>
    </button>
  );
}

export function Navbar() {
  const t = useT();
  const scrolled = useScrolled(40);
  const activeId = useScrollSpy(NAV_LINKS.map((l) => l.id), 120);
  const openReservation = useUIStore((s) => s.openReservation);
  const openVip = useUIStore((s) => s.openVip);
  const openAvailability = useUIStore((s) => s.openAvailability);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLabel = (id: string) =>
    (
      {
        experience: t.nav.experience,
        menu: t.nav.menu,
        gallery: t.nav.gallery,
        events: t.nav.events,
        voices: t.nav.voices,
        location: t.nav.location,
      } as Record<string, string>
    )[id] ?? id;

  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileOpen]);

  const handleNav = (id: string) => {
    setMobileOpen(false);
    setTimeout(() => scrollToId(id), 80);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-border/60 bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav
        className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:h-[76px]"
        aria-label="Principal"
      >
        <Brand />

        {/* Desktop nav */}
        <ul className="hidden items-center gap-7 xl:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => handleNav(link.id)}
                data-active={activeId === link.id}
                className={cn(
                  "link-underline text-[11px] uppercase tracking-[0.22em] transition-colors",
                  activeId === link.id
                    ? "text-primary"
                    : "text-foreground/80 hover:text-foreground"
                )}
              >
                {navLabel(link.id)}
              </button>
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2.5 lg:flex">
          <LanguageToggle />
          <button
            onClick={openAvailability}
            className="flex h-9 items-center gap-1.5 rounded-md border border-border/50 px-3 text-[11px] uppercase tracking-[0.2em] text-foreground/80 transition-colors hover:border-primary/60 hover:text-primary"
            aria-label={t.modals.availability.title}
          >
            <CalendarDays className="size-3.5" />
          </button>
          <Button
            onClick={openVip}
            variant="outline"
            size="sm"
            className="h-9 border-primary/50 px-5 text-[11px] uppercase tracking-[0.2em] text-primary hover:bg-primary/10 hover:text-primary"
          >
            {t.nav.vip}
          </Button>
          <Button
            onClick={openReservation}
            size="sm"
            className="h-9 bg-primary px-5 text-[11px] uppercase tracking-[0.2em] text-primary-foreground hover:bg-primary/90"
          >
            {t.nav.reserve}
          </Button>
        </div>

        {/* Mobile: language toggle + hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <LanguageToggle />
          <button
            onClick={() => setMobileOpen(true)}
            className="flex h-11 w-11 items-center justify-center text-foreground"
            aria-label="Abrir menú"
            aria-expanded={mobileOpen}
          >
            <Menu className="size-6" />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 right-0 z-[70] flex w-[82%] max-w-sm flex-col border-l border-border/60 bg-[#0a0a0a] p-6 lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Menú móvil"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif-display text-lg tracking-[0.3em] text-foreground">
                  LA NEGRA
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex h-11 w-11 items-center justify-center text-muted-foreground hover:text-foreground"
                  aria-label="Cerrar menú"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="my-8 h-px w-full bg-border/40" />

              <nav className="flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.button
                    key={link.id}
                    onClick={() => handleNav(link.id)}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.06, duration: 0.4 }}
                    className={cn(
                      "flex items-baseline justify-between border-b border-border/20 py-4 text-left",
                      activeId === link.id ? "text-primary" : "text-foreground"
                    )}
                  >
                    <span className="font-serif-display text-2xl">{navLabel(link.id)}</span>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                      0{i + 1}
                    </span>
                  </motion.button>
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-3 pt-8">
                <Button
                  onClick={() => {
                    setMobileOpen(false);
                    setTimeout(openAvailability, 120);
                  }}
                  variant="outline"
                  className="h-12 border-border/50 text-[12px] uppercase tracking-[0.2em] text-foreground hover:bg-primary/10 hover:text-primary"
                >
                  <CalendarDays className="size-4" />
                  {t.modals.availability.title}
                </Button>
                <Button
                  onClick={() => {
                    setMobileOpen(false);
                    setTimeout(openReservation, 120);
                  }}
                  className="h-12 bg-primary text-[12px] uppercase tracking-[0.2em] text-primary-foreground hover:bg-primary/90"
                >
                  {t.hero.ctaReserve}
                </Button>
                <Button
                  onClick={() => {
                    setMobileOpen(false);
                    setTimeout(openVip, 120);
                  }}
                  variant="outline"
                  className="h-12 border-primary/50 text-[12px] uppercase tracking-[0.2em] text-primary hover:bg-primary/10"
                >
                  {t.hero.ctaVip}
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
