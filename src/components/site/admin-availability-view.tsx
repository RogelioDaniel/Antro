"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { RefreshCw, Lock, Loader2, ShieldCheck, Check, CalendarDays, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useAdminAuth, AdminPinGate } from "@/components/site/admin-shared";
import { fadeUp, staggerFast, EASE_CINEMA } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface Day {
  date: string;
  status: string;
  seatsLeft: number;
  note?: string | null;
}

const MONTHS_EN = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const STATUS_OPTS = [
  { key: "open", label: "Open", cls: "bg-primary text-primary-foreground", seats: 80 },
  { key: "limited", label: "Limited", cls: "bg-[#a6863e] text-primary-foreground", seats: 15 },
  { key: "full", label: "Full", cls: "bg-[#3a2020] text-foreground", seats: 0 },
];

export function AdminAvailabilityView() {
  const { authed, ready, login, logout } = useAdminAuth();
  const [days, setDays] = useState<Day[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [seatsInput, setSeatsInput] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/availability?XTransformPort=3000&days=35");
      const data = await res.json();
      setDays(data.days ?? []);
    } catch {
      setDays([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authed) load();
  }, [authed, load]);

  const dayMap = useMemo(() => {
    const m = new Map<string, Day>();
    for (const d of days) m.set(d.date, d);
    return m;
  }, [days]);

  const months = useMemo(() => {
    const out: { key: string; label: string; days: Day[] }[] = [];
    for (const d of days) {
      const [y, mo] = d.date.split("-");
      const key = `${y}-${mo}`;
      let bucket = out.find((b) => b.key === key);
      if (!bucket) {
        bucket = { key, label: `${MONTHS_EN[Number(mo) - 1]} ${y}`, days: [] };
        out.push(bucket);
      }
      bucket.days.push(d);
    }
    return out;
  }, [days]);

  const selectedDay = selected ? dayMap.get(selected) : null;

  // sync seats input when selection changes
  useEffect(() => {
    if (selectedDay) setSeatsInput(String(selectedDay.seatsLeft));
  }, [selected, selectedDay]);

  const setStatus = async (status: string, seats: number) => {
    if (!selected) return;
    setSaving(true);
    try {
      await fetch("/api/availability?XTransformPort=3000", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: selected, status, seatsLeft: seats }),
      });
      setDays((ds) =>
        ds.map((d) => (d.date === selected ? { ...d, status, seatsLeft: seats } : d))
      );
    } finally {
      setSaving(false);
    }
  };

  const onSaveSeats = (e: React.FormEvent) => {
    e.preventDefault();
    const seats = Number(seatsInput);
    if (!Number.isFinite(seats) || seats < 0) return;
    const status = seats === 0 ? "full" : seats < 21 ? "limited" : "open";
    setStatus(status, seats);
  };

  if (!authed) {
    return (
      <AdminPinGate
        authed={authed}
        ready={ready}
        onLogin={() => login()}
        title="Admin · Availability"
      />
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
      {/* Header */}
      <motion.div
        className="flex flex-wrap items-end justify-between gap-4"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE_CINEMA }}
      >
        <div>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-primary">
            <ShieldCheck className="size-3.5" />
            La Negra · Admin
          </div>
          <h1 className="mt-2 font-serif-display text-3xl text-foreground sm:text-4xl">
            Availability
          </h1>
          <p className="mt-1 text-[12px] text-muted-foreground">
            Override the auto-seeded per-night availability. Thu/Fri/Sat only.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/reservations"
            className="inline-flex h-10 items-center gap-2 rounded-none border border-border/50 px-4 text-[10px] uppercase tracking-[0.2em] text-foreground/80 transition-colors hover:border-primary/50 hover:text-primary"
          >
            <CalendarDays className="size-3.5" />
            Reservations
          </Link>
          <button
            onClick={load}
            disabled={loading}
            className="inline-flex h-10 items-center gap-2 rounded-none border border-border/50 px-4 text-[10px] uppercase tracking-[0.2em] text-foreground/80 transition-colors hover:border-primary/50 hover:text-primary disabled:opacity-50"
          >
            <RefreshCw className={cn("size-3.5", loading && "animate-spin")} />
            Refresh
          </button>
          <button
            onClick={logout}
            className="inline-flex h-10 items-center gap-2 rounded-none border border-border/50 px-4 text-[10px] uppercase tracking-[0.2em] text-foreground/80 transition-colors hover:border-destructive/50 hover:text-destructive"
          >
            <Lock className="size-3.5" />
            Lock
          </button>
        </div>
      </motion.div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        {/* Calendar grid */}
        <div className="rounded-sm border border-border/30 bg-[#0d0d0d] p-5">
          {loading && days.length === 0 ? (
            <div className="flex h-40 items-center justify-center text-muted-foreground">
              <Loader2 className="size-5 animate-spin" />
            </div>
          ) : (
            <div className="space-y-6 max-h-[560px] overflow-y-auto pr-1">
              {months.map((month) => (
                <div key={month.key}>
                  <p className="mb-2 font-serif-display text-sm text-primary">
                    {month.label}
                  </p>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {month.days.map((d) => {
                      const date = new Date(d.date + "T00:00:00");
                      const isFull = d.status === "full";
                      const isLimited = d.status === "limited";
                      const isSelected = selected === d.date;
                      return (
                        <button
                          key={d.date}
                          onClick={() => setSelected(d.date)}
                          className={cn(
                            "relative flex flex-col items-center rounded-sm border py-3 transition-colors",
                            isSelected
                              ? "border-primary bg-primary/15"
                              : isFull
                              ? "border-[#3a2020]/50 bg-[#1a1010]/30 opacity-60 hover:opacity-100"
                              : isLimited
                              ? "border-[#a6863e]/40 bg-[#a6863e]/5 hover:border-[#a6863e]"
                              : "border-border/40 bg-[#0a0a0a] hover:border-primary/50"
                          )}
                        >
                          <span className="font-serif-display text-lg text-foreground">
                            {date.getDate()}
                          </span>
                          <span className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground">
                            {["S", "M", "T", "W", "T", "F", "S"][date.getDay()]}
                          </span>
                          <span
                            className={cn(
                              "mt-1 text-[8px]",
                              isFull
                                ? "text-destructive/70"
                                : isLimited
                                ? "text-[#d4b069]"
                                : "text-primary/70"
                            )}
                          >
                            {d.seatsLeft}
                          </span>
                          {isSelected && (
                            <motion.span
                              layoutId="avail-admin-check"
                              className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground"
                            >
                              <Check className="size-2.5" />
                            </motion.span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Editor panel */}
        <motion.aside
          className="rounded-sm border border-border/30 bg-[#0d0d0d] p-5"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE_CINEMA }}
        >
          {selected && selectedDay ? (
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Selected
              </p>
              <p className="mt-1 font-serif-display text-xl text-foreground">
                {new Date(selected + "T00:00:00").toLocaleDateString("en-US", {
                  weekday: "long", day: "numeric", month: "long",
                })}
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[9px] uppercase tracking-[0.2em]",
                    selectedDay.status === "full"
                      ? "border-destructive/40 text-destructive"
                      : selectedDay.status === "limited"
                      ? "border-[#a6863e]/50 text-[#d4b069]"
                      : "border-primary/50 text-primary"
                  )}
                >
                  <span
                    className={cn(
                      "size-1.5 rounded-full",
                      selectedDay.status === "full"
                        ? "bg-destructive"
                        : selectedDay.status === "limited"
                        ? "bg-[#a6863e]"
                        : "bg-primary"
                    )}
                  />
                  {selectedDay.status}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  · {selectedDay.seatsLeft} seats
                </span>
              </div>

              {/* Quick status buttons */}
              <p className="mt-6 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Quick set
              </p>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {STATUS_OPTS.map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => setStatus(opt.key, opt.seats)}
                    disabled={saving}
                    className={cn(
                      "rounded-sm border py-3 text-[9px] uppercase tracking-[0.15em] transition-all disabled:opacity-50",
                      selectedDay.status === opt.key
                        ? cn(opt.cls, "border-transparent")
                        : "border-border/40 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* Custom seats */}
              <form onSubmit={onSaveSeats} className="mt-6">
                <label className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  Custom seats
                </label>
                <div className="mt-2 flex gap-2">
                  <input
                    type="number"
                    min={0}
                    max={200}
                    value={seatsInput}
                    onChange={(e) => setSeatsInput(e.target.value)}
                    className="h-10 w-full rounded-none border border-border/60 bg-[#0a0a0a] px-3 text-[14px] text-foreground focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/30"
                  />
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex h-10 shrink-0 items-center justify-center bg-primary px-4 text-[10px] uppercase tracking-[0.2em] text-primary-foreground transition-all hover:bg-primary-dark disabled:opacity-50"
                  >
                    {saving ? <Loader2 className="size-3.5 animate-spin" /> : <Check className="size-4" />}
                  </button>
                </div>
                <p className="mt-1.5 text-[10px] text-muted-foreground/60">
                  Status auto-derived: 0 = full, 1-20 = limited, 21+ = open.
                </p>
              </form>
            </div>
          ) : (
            <div className="flex h-full min-h-[200px] flex-col items-center justify-center text-center text-muted-foreground">
              <CalendarDays className="size-8 text-primary/30" />
              <p className="mt-3 text-[12px]">Select a date to edit</p>
            </div>
          )}
        </motion.aside>
      </div>

      {/* Back link */}
      <div className="mt-8">
        <Link
          href="/admin/reservations"
          className="group inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-3 transition-transform group-hover:-translate-x-0.5" />
          Go to Reservations
        </Link>
      </div>
    </div>
  );
}
