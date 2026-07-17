"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
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
  const prefersReducedMotion = useReducedMotion();
  const scrolled = useScrolled(40);
  const activeId = useScrollSpy(
    NAV_LINKS.map((l) => l.id),
    120,
  );
  const openReservation = useUIStore((s) => s.openReservation);
  const openVip = useUIStore((s) => s.openVip);
  const openAvailability = useUIStore((s) => s.openAvailability);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);

  const navLabel = (id: string) =>
    (
      ({
        experience: t.nav.experience,
        menu: t.nav.menu,
        gallery: t.nav.gallery,
        events: t.nav.events,
        voices: t.nav.voices,
        location: t.nav.location,
      }) as Record<string, string>
    )[id] ?? id;

  useEffect(() => {
    if (!mobileOpen) return;

    const html = document.documentElement;
    const body = document.body;
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    const previous = {
      htmlOverflow: html.style.overflow,
      htmlOverscroll: html.style.overscrollBehavior,
      bodyOverflow: body.style.overflow,
      bodyOverscroll: body.style.overscrollBehavior,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyLeft: body.style.left,
      bodyRight: body.style.right,
      bodyWidth: body.style.width,
    };

    html.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";
    body.style.overflow = "hidden";
    body.style.overscrollBehavior = "none";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    const focusFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMobileOpen(false);
        return;
      }

      if (event.key !== "Tab" || !drawerRef.current) return;

      const focusable = Array.from(
        drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute("hidden"));

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      html.style.overflow = previous.htmlOverflow;
      html.style.overscrollBehavior = previous.htmlOverscroll;
      body.style.overflow = previous.bodyOverflow;
      body.style.overscrollBehavior = previous.bodyOverscroll;
      body.style.position = previous.bodyPosition;
      body.style.top = previous.bodyTop;
      body.style.left = previous.bodyLeft;
      body.style.right = previous.bodyRight;
      body.style.width = previous.bodyWidth;
      window.scrollTo({ left: scrollX, top: scrollY, behavior: "auto" });
      window.requestAnimationFrame(() => menuButtonRef.current?.focus());
    };
  }, [mobileOpen]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setMobileOpen(false);
    };

    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  const handleNav = (id: string) => {
    setMobileOpen(false);
    setTimeout(() => scrollToId(id), 80);
  };

  const mobileDrawer = (
    <AnimatePresence>
      {mobileOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[120] bg-black/75 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.1 : 0.25 }}
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <motion.aside
            ref={drawerRef}
            id="mobile-navigation-drawer"
            data-mobile-menu="open"
            className="fixed inset-y-0 right-0 z-[130] flex h-dvh max-h-dvh w-[min(88vw,24rem)] min-h-0 flex-col overflow-hidden border-l border-border/60 bg-[#0a0a0a] px-5 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-[calc(1rem+env(safe-area-inset-top))] shadow-[-24px_0_80px_rgba(0,0,0,0.5)] lg:hidden"
            initial={prefersReducedMotion ? { opacity: 0 } : { x: "100%" }}
            animate={prefersReducedMotion ? { opacity: 1 } : { x: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { x: "100%" }}
            transition={{
              duration: prefersReducedMotion ? 0.1 : 0.36,
              ease: [0.22, 1, 0.36, 1],
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
          >
            <div className="flex h-11 shrink-0 items-center justify-between">
              <span
                id="mobile-menu-title"
                className="font-serif-display text-lg tracking-[0.3em] text-foreground"
              >
                LA NEGRA
              </span>
              <button
                ref={closeButtonRef}
                onClick={() => setMobileOpen(false)}
                className="flex h-11 w-11 items-center justify-center text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
                aria-label="Cerrar menú"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="my-[clamp(0.75rem,2.5dvh,1.75rem)] h-px w-full shrink-0 bg-border/40" />

            <nav
              className="flex min-h-0 shrink flex-col overflow-y-auto overscroll-contain"
              aria-label="Navegación móvil"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  initial={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, x: 18 }
                  }
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: prefersReducedMotion ? 0 : 0.05 + i * 0.04,
                    duration: prefersReducedMotion ? 0.1 : 0.3,
                  }}
                  className={cn(
                    "flex min-h-11 flex-1 items-center justify-between border-b border-border/20 py-[clamp(0.35rem,1.3dvh,0.8rem)] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/70",
                    activeId === link.id ? "text-primary" : "text-foreground",
                  )}
                >
                  <span className="font-serif-display text-[clamp(1.35rem,6vw,1.85rem)] leading-none">
                    {navLabel(link.id)}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    0{i + 1}
                  </span>
                </motion.button>
              ))}
            </nav>

            <div className="mt-auto flex shrink-0 flex-col gap-2 pt-[clamp(0.75rem,2dvh,1.5rem)]">
              <Button
                onClick={() => {
                  setMobileOpen(false);
                  setTimeout(openAvailability, 120);
                }}
                variant="outline"
                className="h-11 border-border/50 px-3 text-[10px] uppercase tracking-[0.12em] text-foreground hover:bg-primary/10 hover:text-primary min-[360px]:text-[11px]"
              >
                <CalendarDays className="size-4" />
                {t.modals.availability.title}
              </Button>
              <Button
                onClick={() => {
                  setMobileOpen(false);
                  setTimeout(openReservation, 120);
                }}
                className="h-11 bg-primary text-[11px] uppercase tracking-[0.18em] text-primary-foreground hover:bg-primary/90"
              >
                {t.hero.ctaReserve}
              </Button>
              <Button
                onClick={() => {
                  setMobileOpen(false);
                  setTimeout(openVip, 120);
                }}
                variant="outline"
                className="h-11 border-primary/50 text-[11px] uppercase tracking-[0.18em] text-primary hover:bg-primary/10"
              >
                {t.hero.ctaVip}
              </Button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-border/60 bg-background/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
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
                      : "text-foreground/80 hover:text-foreground",
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
              onClick={() => openReservation()}
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
              ref={menuButtonRef}
              onClick={() => setMobileOpen(true)}
              className="flex h-11 w-11 items-center justify-center text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
              aria-label="Abrir menú"
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation-drawer"
            >
              <Menu className="size-6" />
            </button>
          </div>
        </nav>
      </header>
      {typeof document !== "undefined" &&
        createPortal(mobileDrawer, document.body)}
    </>
  );
}
