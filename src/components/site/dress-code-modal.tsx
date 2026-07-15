"use client";

import { motion } from "framer-motion";
import { Shirt, Sparkles, Check, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useUIStore } from "@/lib/store";

const GUIDELINES = [
  { label: "Smart Casual", note: "Elegancia relajada, con intención." },
  { label: "No deportivo", note: "Sin tenis deportivos, shorts o playeras sin cuello." },
  { label: "Accesorios bienvenidos", note: "Joyas, sombreros y detalles que celebren la noche." },
  { label: "Reservamos admisión", note: "El anfitrión puede negar el acceso." },
];

const INSPIRATION = [
  "Traje sastre sin corbata",
  "Vestido de cóctel",
  "Botines + camisa de lino",
  "Blazer negro + jewelry",
];

export function DressCodeModal() {
  const open = useUIStore((s) => s.openModal === "dresscode");
  const close = useUIStore((s) => s.closeModal);

  return (
    <Dialog open={open} onOpenChange={(o) => !o && close()}>
      <DialogContent className="glass-panel overflow-hidden rounded-sm border-primary/25 p-0 sm:max-w-[440px]">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent" />
        {/* hero strip */}
        <div className="relative flex items-center justify-center gap-3 bg-[#0d0d0d] px-6 py-8">
          <div className="pointer-events-none absolute inset-0 opacity-30 cinematic-grain" />
          <Shirt className="size-6 text-primary" />
          <span className="text-[10px] uppercase tracking-[0.45em] text-primary">
            Dress Code
          </span>
        </div>

        <div className="p-6 pt-4 sm:p-8 sm:pt-4">
          <DialogHeader className="space-y-2 text-center">
            <DialogTitle className="font-serif-display text-3xl font-medium text-foreground">
              Smart Casual
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              La noche se viste. Estas son nuestras lineamientos.
            </DialogDescription>
          </DialogHeader>

          {/* guidelines */}
          <ul className="mt-6 space-y-3">
            {GUIDELINES.map((g, i) => (
              <motion.li
                key={g.label}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 * i + 0.1, duration: 0.4 }}
                className="flex items-start gap-3 rounded-sm border border-border/30 bg-[#0a0a0a]/50 p-3"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Check className="size-3" />
                </span>
                <div>
                  <p className="text-[13px] font-medium text-foreground">{g.label}</p>
                  <p className="text-[11px] text-muted-foreground">{g.note}</p>
                </div>
              </motion.li>
            ))}
          </ul>

          {/* inspiration chips */}
          <div className="mt-6">
            <p className="mb-2 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.3em] text-primary">
              <Sparkles className="size-3" /> Inspiración
            </p>
            <div className="flex flex-wrap gap-2">
              {INSPIRATION.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-border/50 px-3 py-1.5 text-[11px] text-foreground/80"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={close}
            className="mt-7 flex h-12 w-full items-center justify-center gap-2 bg-primary text-[12px] uppercase tracking-[0.25em] text-primary-foreground transition-all hover:bg-primary-dark hover:shadow-[0_0_30px_rgba(197,160,89,0.35)]"
          >
            <X className="size-4" /> Entendido
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
