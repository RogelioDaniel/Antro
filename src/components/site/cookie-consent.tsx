"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, Check, ShieldCheck } from "lucide-react";
import { useT } from "@/lib/lang-store";
import { EASE_CINEMA } from "@/lib/motion";

const STORAGE_KEY = "la-negra-cookie-consent";

type Consent = "accepted" | "declined" | null;

/**
 * Cookie / privacy consent banner (LFPDPPP / GDPR aware).
 * Appears once on first visit, persists the choice in localStorage.
 * Dismissible with Accept-all or Essential-only. Bilingual.
 */
export function CookieConsent() {
  const t = useT();
  const [consent, setConsent] = useState<Consent>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // read stored consent after mount to avoid SSR mismatch
    const stored = typeof window !== "undefined"
      ? (window.localStorage.getItem(STORAGE_KEY) as Consent)
      : null;
    const id = setTimeout(() => {
      setConsent(stored);
      setMounted(true);
    }, 0);
    return () => clearTimeout(id);
  }, []);

  const choose = (c: "accepted" | "declined") => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, c);
    }
    setConsent(c);
  };

  const show = mounted && consent === null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-[95] px-4 pb-4 sm:px-6 sm:pb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.5, ease: EASE_CINEMA }}
          role="dialog"
          aria-live="polite"
          aria-label={t.cookie.title}
        >
          <div className="glass-panel mx-auto max-w-3xl overflow-hidden rounded-sm border-primary/30 shadow-2xl">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent" />
            <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:gap-5 sm:p-6">
              {/* icon */}
              <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-center">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/40 bg-primary/10">
                  <Cookie className="size-5 text-primary" />
                </span>
              </div>

              {/* copy */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-3.5 text-primary" />
                  <h3 className="font-serif-display text-sm text-foreground">
                    {t.cookie.title}
                  </h3>
                </div>
                <p className="mt-1.5 text-[12px] leading-relaxed text-muted-foreground">
                  {t.cookie.body}{" "}
                  <a href="#" className="link-underline text-primary">
                    {t.cookie.link}
                  </a>
                </p>
              </div>

              {/* actions */}
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <button
                  onClick={() => choose("declined")}
                  className="inline-flex h-10 items-center justify-center gap-1.5 rounded-none border border-border/50 px-4 text-[10px] uppercase tracking-[0.2em] text-foreground/80 transition-colors hover:border-primary/50 hover:text-foreground"
                >
                  <X className="size-3.5" />
                  {t.cookie.decline}
                </button>
                <button
                  onClick={() => choose("accepted")}
                  className="inline-flex h-10 items-center justify-center gap-1.5 rounded-none bg-primary px-5 text-[10px] uppercase tracking-[0.2em] text-primary-foreground transition-all hover:bg-primary-dark hover:shadow-[0_0_24px_rgba(197,160,89,0.35)]"
                >
                  <Check className="size-3.5" />
                  {t.cookie.accept}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
