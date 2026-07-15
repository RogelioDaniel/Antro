/**
 * Language store + hook. Resolves the active language in this priority:
 *   1. `?lang=es|en` URL query param (shareable / SEO)
 *   2. localStorage preference
 *   3. default "es" (CDMX audience)
 * Persists choice to localStorage + syncs `?lang=` in the URL and `<html lang>`.
 */
import { create } from "zustand";
import { DICTS, type Dict, type Lang } from "@/lib/i18n";

interface LangState {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: Dict;
}

const STORAGE_KEY = "la-negra-lang";

function readUrlLang(): Lang | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const q = params.get("lang");
  return q === "es" || q === "en" ? q : null;
}

function writeUrlLang(l: Lang) {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  url.searchParams.set("lang", l);
  window.history.replaceState({}, "", url.toString());
}

function getInitial(): Lang {
  if (typeof window === "undefined") return "es";
  // 1. URL query wins (shareable links)
  const fromUrl = readUrlLang();
  if (fromUrl) {
    window.localStorage.setItem(STORAGE_KEY, fromUrl);
    return fromUrl;
  }
  // 2. localStorage
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === "es" || saved === "en") return saved;
  // 3. default
  return "es";
}

export const useLangStore = create<LangState>((set, get) => ({
  lang: "es", // SSR default; hydrated client-side
  setLang: (l) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, l);
      document.documentElement.lang = l === "es" ? "es-MX" : "en";
      writeUrlLang(l);
    }
    set({ lang: l, t: DICTS[l] });
  },
  toggle: () => {
    const next = get().lang === "es" ? "en" : "es";
    get().setLang(next);
  },
  t: DICTS.es,
}));

/** Hydrate the store from URL/localStorage on first client mount. */
export function hydrateLang() {
  if (typeof window === "undefined") return;
  const initial = getInitial();
  const { lang, setLang } = useLangStore.getState();
  if (lang !== initial) {
    setLang(initial);
  } else {
    // ensure URL reflects the resolved lang even if no query was present
    writeUrlLang(initial);
    document.documentElement.lang = initial === "es" ? "es-MX" : "en";
  }
}

/** Selector hook returning the active dictionary. */
export function useT(): Dict {
  return useLangStore((s) => s.t);
}
