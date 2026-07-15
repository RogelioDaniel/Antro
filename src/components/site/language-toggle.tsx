"use client";

import { useEffect } from "react";
import { Languages } from "lucide-react";
import { useLangStore } from "@/lib/lang-store";
import { cn } from "@/lib/utils";

/**
 * Compact ES/EN pill toggle. Sits in the navbar. Persists choice via the
 * lang store (localStorage) and updates <html lang> automatically.
 */
export function LanguageToggle({ className }: { className?: string }) {
  const lang = useLangStore((s) => s.lang);
  const setLang = useLangStore((s) => s.setLang);

  // hydrate from localStorage on mount
  useEffect(() => {
    const saved = window.localStorage.getItem("la-negra-lang");
    if (saved === "es" || saved === "en") {
      if (saved !== useLangStore.getState().lang) setLang(saved);
    }
  }, [setLang]);

  return (
    <div
      className={cn(
        "flex items-center rounded-full border border-border/50 bg-[#0a0a0a]/60 p-0.5",
        className
      )}
      role="group"
      aria-label="Language selector"
    >
      <Languages className="mx-1.5 size-3.5 text-muted-foreground" aria-hidden="true" />
      {(["es", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={cn(
            "min-h-[28px] rounded-full px-2.5 text-[10px] font-semibold uppercase tracking-[0.15em] transition-colors",
            lang === l
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
