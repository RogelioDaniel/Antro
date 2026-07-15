/**
 * Language store + hook. Persists choice in localStorage and reflects it
 * on <html lang>. Components consume `useLang()` to get the active dict.
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

function getInitial(): Lang {
  if (typeof window === "undefined") return "es";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === "es" || saved === "en") return saved;
  // default to Spanish (CDMX audience)
  return "es";
}

export const useLangStore = create<LangState>((set, get) => ({
  lang: "es", // SSR default; hydrated client-side
  setLang: (l) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, l);
      document.documentElement.lang = l === "es" ? "es-MX" : "en";
    }
    set({ lang: l, t: DICTS[l] });
  },
  toggle: () => {
    const next = get().lang === "es" ? "en" : "es";
    get().setLang(next);
  },
  t: DICTS.es,
}));

/** Hydrate the store from localStorage on first client mount. */
export function hydrateLang() {
  if (typeof window === "undefined") return;
  const initial = getInitial();
  const { lang, setLang } = useLangStore.getState();
  if (lang !== initial) setLang(initial);
}

/** Selector hook returning the active dictionary. */
export function useT(): Dict {
  return useLangStore((s) => s.t);
}
