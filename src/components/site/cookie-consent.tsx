"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Cookie, X, Check, ShieldCheck, Settings, Lock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { useT } from "@/lib/lang-store";
import { EASE_CINEMA } from "@/lib/motion";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "la-negra-cookie-consent";

interface Preferences {
  essential: boolean; // always true
  analytics: boolean;
  marketing: boolean;
}

type Consent = "accepted" | "declined" | null;

function readStored(): Consent {
  if (typeof window === "undefined") return null;
  return (window.localStorage.getItem(STORAGE_KEY) as Consent) ?? null;
}

function readPrefs(): Preferences {
  if (typeof window === "undefined") return { essential: true, analytics: false, marketing: false };
  try {
    const raw = window.localStorage.getItem("la-negra-cookie-prefs");
    if (raw) {
      const p = JSON.parse(raw);
      return { essential: true, analytics: !!p.analytics, marketing: !!p.marketing };
    }
  } catch {
    /* ignore */
  }
  return { essential: true, analytics: false, marketing: false };
}

/**
 * Cookie / privacy consent banner (LFPDPPP / GDPR aware).
 * Banner: Accept all / Essential only / Manage preferences.
 * Modal: granular toggles for Analytics + Marketing (Essential locked).
 */
export function CookieConsent() {
  const t = useT();
  const prefersReducedMotion = useReducedMotion();
  const [consent, setConsent] = useState<Consent>(null);
  const [mounted, setMounted] = useState(false);
  const [manageOpen, setManageOpen] = useState(false);
  const [prefs, setPrefs] = useState<Preferences>({
    essential: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const id = setTimeout(() => {
      setConsent(readStored());
      setPrefs(readPrefs());
      setMounted(true);
    }, 0);
    return () => clearTimeout(id);
  }, []);

  const choose = (c: "accepted" | "declined") => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, c);
      if (c === "accepted") {
        const all = { essential: true, analytics: true, marketing: true };
        window.localStorage.setItem("la-negra-cookie-prefs", JSON.stringify(all));
        setPrefs(all);
      } else {
        const min = { essential: true, analytics: false, marketing: false };
        window.localStorage.setItem("la-negra-cookie-prefs", JSON.stringify(min));
        setPrefs(min);
      }
    }
    setConsent(c);
    // log server-side for LFPDPPP audit trail (fire-and-forget)
    const action = c === "accepted" ? "accept_all" : "essential_only";
    fetch("/api/consent?XTransformPort=3000", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action,
        analytics: c === "accepted",
        marketing: c === "accepted",
      }),
    }).catch(() => {});
  };

  const savePrefs = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("la-negra-cookie-prefs", JSON.stringify(prefs));
      // banner consent follows whether any non-essential is on
      window.localStorage.setItem(
        STORAGE_KEY,
        prefs.analytics || prefs.marketing ? "accepted" : "declined"
      );
    }
    setConsent(prefs.analytics || prefs.marketing ? "accepted" : "declined");
    setManageOpen(false);
    // log server-side for LFPDPPP audit trail (fire-and-forget)
    fetch("/api/consent?XTransformPort=3000", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "save_prefs",
        analytics: prefs.analytics,
        marketing: prefs.marketing,
      }),
    }).catch(() => {});
  };

  const show = mounted && consent === null;

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.div
            data-cookie-consent="open"
            className="fixed inset-x-0 bottom-0 z-[95] px-4 pb-4 sm:px-6 sm:pb-6"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
            transition={
              prefersReducedMotion
                ? { duration: 0.15 }
                : { duration: 0.5, ease: EASE_CINEMA }
            }
            role="dialog"
            aria-live="polite"
            aria-label={t.cookie.title}
          >
            <div className="glass-panel mx-auto max-w-3xl overflow-hidden rounded-sm border-primary/30 shadow-2xl">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent" />
              <div className="grid gap-4 p-5 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center sm:gap-x-5 sm:p-6">
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
                <div className="flex flex-col gap-2 sm:col-span-2 sm:grid sm:grid-cols-2 md:grid-cols-3">
                  <button
                    onClick={() => setManageOpen(true)}
                    className="inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-none border border-border/50 px-4 text-[10px] uppercase tracking-[0.2em] text-foreground/80 transition-colors hover:border-primary/50 hover:text-primary sm:col-span-2 md:col-span-1"
                  >
                    <Settings className="size-3.5" />
                    {t.cookie.manage}
                  </button>
                  <button
                    onClick={() => choose("declined")}
                    className="inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-none border border-border/50 px-4 text-[10px] uppercase tracking-[0.2em] text-foreground/80 transition-colors hover:border-primary/50 hover:text-foreground"
                  >
                    <X className="size-3.5" />
                    {t.cookie.decline}
                  </button>
                  <button
                    onClick={() => choose("accepted")}
                    className="inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-none bg-primary px-5 text-[10px] uppercase tracking-[0.2em] text-primary-foreground transition-all hover:bg-primary-dark hover:shadow-[0_0_24px_rgba(197,160,89,0.35)]"
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

      {/* Manage preferences modal */}
      <Dialog open={manageOpen} onOpenChange={(o) => setManageOpen(o)}>
        <DialogContent className="glass-panel overflow-hidden rounded-sm border-primary/25 p-0 sm:max-w-[460px]">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent" />
          <div className="p-6 sm:p-8">
            <DialogHeader className="space-y-2 text-left">
              <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-primary">
                <Cookie className="size-3.5" /> {t.cookie.title}
              </span>
              <DialogTitle className="font-serif-display text-2xl font-medium text-foreground">
                {t.cookie.modalTitle}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                {t.cookie.modalBody}
              </DialogDescription>
            </DialogHeader>

            {/* toggles */}
            <div className="mt-6 space-y-3">
              {/* Essential (locked) */}
              <div className="flex items-start gap-3 rounded-sm border border-border/40 bg-[#0a0a0a]/50 p-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <Lock className="size-3.5 text-primary" />
                    <span className="text-[13px] font-medium text-foreground">
                      {t.cookie.essential}
                    </span>
                    <span className="rounded-full border border-primary/40 px-2 py-0.5 text-[8px] uppercase tracking-[0.2em] text-primary">
                      {t.cookie.essentialLocked}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                    {t.cookie.essentialDesc}
                  </p>
                </div>
                <Switch checked disabled className="data-[state=checked]:bg-primary/60" />
              </div>

              {/* Analytics */}
              <PrefRow
                label={t.cookie.analytics}
                desc={t.cookie.analyticsDesc}
                checked={prefs.analytics}
                onToggle={(v) => setPrefs((p) => ({ ...p, analytics: v }))}
              />

              {/* Marketing */}
              <PrefRow
                label={t.cookie.marketing}
                desc={t.cookie.marketingDesc}
                checked={prefs.marketing}
                onToggle={(v) => setPrefs((p) => ({ ...p, marketing: v }))}
              />
            </div>

            <button
              onClick={savePrefs}
              className="mt-7 flex h-12 w-full items-center justify-center gap-2 bg-primary text-[12px] uppercase tracking-[0.25em] text-primary-foreground transition-all hover:bg-primary-dark hover:shadow-[0_0_30px_rgba(197,160,89,0.35)]"
            >
              <Check className="size-4" />
              {t.cookie.save}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function PrefRow({
  label,
  desc,
  checked,
  onToggle,
}: {
  label: string;
  desc: string;
  checked: boolean;
  onToggle: (v: boolean) => void;
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-sm border p-4 transition-colors",
        checked ? "border-primary/40 bg-primary/5" : "border-border/40 bg-[#0a0a0a]/50"
      )}
    >
      <div className="min-w-0 flex-1">
        <span className="text-[13px] font-medium text-foreground">{label}</span>
        <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{desc}</p>
      </div>
      <Switch
        checked={checked}
        onCheckedChange={onToggle}
        className="data-[state=checked]:bg-primary"
      />
    </div>
  );
}
