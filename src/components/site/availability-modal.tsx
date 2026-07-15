"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Check, Wine } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/lib/store";
import { useT, useLangStore } from "@/lib/lang-store";
import { EASE_CINEMA } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface Day {
  date: string;
  status: string;
  seatsLeft: number;
}

const WEEKDAYS_ES = ["D", "L", "M", "M", "J", "V", "S"];
const WEEKDAYS_EN = ["S", "M", "T", "W", "T", "F", "S"];
const MONTHS_ES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];
const MONTHS_EN = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function AvailabilityModal() {
  const t = useT();
  const lang = useLangStore.getState().lang;
  const open = useUIStore((s) => s.openModal === "availability");
  const close = useUIStore((s) => s.closeModal);
  const openReservation = useUIStore((s) => s.openReservation);
  const [days, setDays] = useState<Day[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setSelected(null);
      return;
    }
    setLoading(true);
    fetch("/api/availability?XTransformPort=3000")
      .then((r) => r.json())
      .then((d) => setDays(d.days ?? []))
      .catch(() => setDays([]))
      .finally(() => setLoading(false));
  }, [open]);

  const dayMap = useMemo(() => {
    const m = new Map<string, Day>();
    for (const d of days) m.set(d.date, d);
    return m;
  }, [days]);

  // Group days by month for rendering
  const months = useMemo(() => {
    const out: { key: string; label: string; days: (Day | null)[] }[] = [];
    for (const d of days) {
      const [y, m] = d.date.split("-");
      const key = `${y}-${m}`;
      let bucket = out.find((b) => b.key === key);
      if (!bucket) {
        bucket = {
          key,
          label: `${lang === "es" ? MONTHS_ES : MONTHS_EN[Number(m) - 1]} ${y}`,
          days: [],
        };
        out.push(bucket);
      }
      bucket.days.push(d);
    }
    return out;
  }, [days, lang]);

  const selectedDay = selected ? dayMap.get(selected) : null;

  const onReserve = () => {
    if (!selected) return;
    close();
    setTimeout(openReservation, 150);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && close()}>
      <DialogContent className="glass-panel max-h-[92svh] overflow-y-auto rounded-sm border-primary/25 p-0 sm:max-w-[520px]">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent" />
        <div className="p-6 sm:p-8">
          <DialogHeader className="space-y-2 text-left">
            <span className="text-[10px] uppercase tracking-[0.4em] text-primary">
              {t.modals.availability.eyebrow}
            </span>
            <DialogTitle className="font-serif-display text-3xl font-medium text-foreground">
              {t.modals.availability.title}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {t.modals.availability.desc}
            </DialogDescription>
          </DialogHeader>

          {/* Legend */}
          <div className="mt-5 flex flex-wrap gap-4">
            {[
              { key: "open", label: t.modals.availability.legendOpen, cls: "bg-primary" },
              { key: "limited", label: t.modals.availability.legendLimited, cls: "bg-[#a6863e]" },
              { key: "full", label: t.modals.availability.legendFull, cls: "bg-[#3a2020]" },
            ].map((l) => (
              <div key={l.key} className="flex items-center gap-2">
                <span className={cn("size-2.5 rounded-full", l.cls)} />
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {l.label}
                </span>
              </div>
            ))}
          </div>

          {/* Calendar */}
          <div className="mt-6 max-h-[340px] overflow-y-auto pr-1">
            {loading ? (
              <div className="flex h-40 items-center justify-center text-muted-foreground">
                <Loader2 className="size-5 animate-spin" />
              </div>
            ) : months.length === 0 ? (
              <div className="flex h-40 items-center justify-center text-[13px] text-muted-foreground">
                No dates available.
              </div>
            ) : (
              <div className="space-y-6">
                {months.map((month) => (
                  <div key={month.key}>
                    <p className="mb-2 font-serif-display text-sm text-primary">
                      {month.label}
                    </p>
                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                      {month.days.map((d) => {
                        const date = new Date(d!.date + "T00:00:00");
                        const dayNum = date.getDate();
                        const isFull = d!.status === "full";
                        const isLimited = d!.status === "limited";
                        const isSelected = selected === d!.date;
                        return (
                          <motion.button
                            key={d!.date}
                            whileHover={!isFull ? { scale: 1.04 } : undefined}
                            whileTap={!isFull ? { scale: 0.97 } : undefined}
                            transition={{ duration: 0.2, ease: EASE_CINEMA }}
                            disabled={isFull}
                            onClick={() => setSelected(d!.date)}
                            className={cn(
                              "relative flex flex-col items-center rounded-sm border py-3 transition-colors",
                              isFull
                                ? "cursor-not-allowed border-border/20 bg-[#1a1010]/40 opacity-50"
                                : isSelected
                                ? "border-primary bg-primary/15"
                                : isLimited
                                ? "border-[#a6863e]/40 bg-[#a6863e]/5 hover:border-[#a6863e]"
                                : "border-border/40 bg-[#0d0d0d] hover:border-primary/50"
                            )}
                          >
                            <span className="font-serif-display text-lg text-foreground">
                              {dayNum}
                            </span>
                            <span className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground">
                              {(lang === "es" ? WEEKDAYS_ES : WEEKDAYS_EN)[date.getDay()]}
                            </span>
                            {!isFull && (
                              <span
                                className={cn(
                                  "mt-1 text-[8px]",
                                  isLimited ? "text-[#d4b069]" : "text-primary/70"
                                )}
                              >
                                {d!.seatsLeft} {lang === "es" ? "lug" : "seats"}
                              </span>
                            )}
                            {isFull && (
                              <span className="mt-1 text-[8px] text-destructive/70">
                                {lang === "es" ? "lleno" : "full"}
                              </span>
                            )}
                            {isSelected && (
                              <motion.span
                                layoutId="avail-check"
                                className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground"
                              >
                                <Check className="size-2.5" />
                              </motion.span>
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Selected + CTA */}
          <motion.div
            className="mt-6 rounded-sm border border-border/40 bg-[#0a0a0a]/60 p-4"
            animate={{ opacity: selected ? 1 : 0.5 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Wine className="size-5 text-primary" />
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    {t.modals.availability.selected}
                  </p>
                  <p className="font-serif-display text-base text-foreground">
                    {selected
                      ? new Date(selected + "T00:00:00").toLocaleDateString(
                          lang === "es" ? "es-MX" : "en-US",
                          { weekday: "short", day: "numeric", month: "short" }
                        )
                      : "—"}
                  </p>
                </div>
              </div>
              {selectedDay && (
                <span
                  className={cn(
                    "rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.2em]",
                    selectedDay.status === "full"
                      ? "border-destructive/40 text-destructive"
                      : selectedDay.status === "limited"
                      ? "border-[#a6863e]/50 text-[#d4b069]"
                      : "border-primary/50 text-primary"
                  )}
                >
                  {selectedDay.status === "full"
                    ? t.modals.availability.legendFull
                    : selectedDay.status === "limited"
                    ? t.modals.availability.legendLimited
                    : t.modals.availability.legendOpen}{" "}
                  · {selectedDay.seatsLeft}
                </span>
              )}
            </div>
            <Button
              onClick={onReserve}
              disabled={!selected || selectedDay?.status === "full"}
              className="mt-4 h-12 w-full rounded-none bg-primary text-[12px] uppercase tracking-[0.25em] text-primary-foreground transition-all hover:bg-primary-dark hover:shadow-[0_0_30px_rgba(197,160,89,0.35)] disabled:opacity-40"
            >
              {t.hero.ctaReserve}
            </Button>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
