"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  RefreshCw,
  Check,
  X,
  Clock,
  Phone,
  Users,
  Calendar,
  CalendarDays,
  Loader2,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { fadeUp, staggerFast, viewportOnce, EASE_CINEMA } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface Reservation {
  id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  notes: string | null;
  status: string;
  source: string;
  createdAt: string;
}

type Status = "pending" | "confirmed" | "cancelled";
type Filter = "all" | Status;

const ADMIN_PIN = "LANEGRA"; // demo gate — replace with real auth in production
const SESSION_KEY = "la-negra-admin-session";

const STATUS_META: Record<Status, { label: string; cls: string; dot: string }> = {
  pending: {
    label: "Pending",
    cls: "border-[#a6863e]/50 text-[#d4b069] bg-[#a6863e]/5",
    dot: "bg-[#a6863e]",
  },
  confirmed: {
    label: "Confirmed",
    cls: "border-primary/50 text-primary bg-primary/5",
    dot: "bg-primary",
  },
  cancelled: {
    label: "Cancelled",
    cls: "border-destructive/40 text-destructive bg-destructive/5",
    dot: "bg-destructive",
  },
};

export function AdminReservationsView() {
  const [authed, setAuthed] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // restore session
  useEffect(() => {
    if (typeof window !== "undefined" && window.sessionStorage.getItem(SESSION_KEY) === "1") {
      setAuthed(true);
    }
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/reservations?XTransformPort=3000");
      const data = await res.json();
      setReservations(data.reservations ?? []);
    } catch {
      setReservations([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // auto-load when authed
  useEffect(() => {
    if (authed) load();
  }, [authed, load]);

  const tryPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.toUpperCase() === ADMIN_PIN) {
      setAuthed(true);
      setPinError(false);
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } else {
      setPinError(true);
    }
  };

  const logout = () => {
    window.sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
    setPinInput("");
  };

  const updateStatus = async (id: string, status: Status) => {
    setUpdatingId(id);
    try {
      await fetch("/api/reservations?XTransformPort=3000", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      setReservations((rs) =>
        rs.map((r) => (r.id === id ? { ...r, status } : r))
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered =
    filter === "all"
      ? reservations
      : reservations.filter((r) => r.status === filter);

  const counts = {
    all: reservations.length,
    pending: reservations.filter((r) => r.status === "pending").length,
    confirmed: reservations.filter((r) => r.status === "confirmed").length,
    cancelled: reservations.filter((r) => r.status === "cancelled").length,
  };

  // ---- PIN gate ----
  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center px-5">
        <motion.div
          className="w-full max-w-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_CINEMA }}
        >
          <div className="glass-panel rounded-sm border-primary/30 p-8">
            <div className="flex flex-col items-center text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-primary/40 bg-primary/10">
                <Lock className="size-6 text-primary" />
              </span>
              <h1 className="mt-5 font-serif-display text-2xl text-foreground">
                Admin Access
              </h1>
              <p className="mt-2 text-[12px] text-muted-foreground">
                Enter the staff PIN to view reservations.
              </p>
            </div>
            <form onSubmit={tryPin} className="mt-6 space-y-3">
              <input
                type="password"
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                placeholder="PIN"
                autoFocus
                className={cn(
                  "h-12 w-full rounded-none border bg-[#0a0a0a] px-4 text-center text-[14px] tracking-[0.3em] text-foreground placeholder:tracking-[0.3em] focus:outline-none focus:ring-1",
                  pinError
                    ? "border-destructive/60 focus:ring-destructive/40"
                    : "border-border/60 focus:border-primary/60 focus:ring-primary/30"
                )}
                aria-label="Admin PIN"
              />
              <AnimatePresence>
                {pinError && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-center text-[11px] text-destructive"
                  >
                    Incorrect PIN. Try again.
                  </motion.p>
                )}
              </AnimatePresence>
              <button
                type="submit"
                className="h-12 w-full rounded-none bg-primary text-[11px] uppercase tracking-[0.25em] text-primary-foreground transition-all hover:bg-primary-dark hover:shadow-[0_0_24px_rgba(197,160,89,0.35)]"
              >
                Unlock
              </button>
            </form>
            <div className="mt-5 text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-muted-foreground hover:text-primary"
              >
                <ArrowLeft className="size-3" />
                Back to site
              </Link>
            </div>
            <p className="mt-4 rounded-sm border border-border/30 bg-[#0a0a0a]/50 p-2 text-center text-[10px] text-muted-foreground/60">
              Demo PIN: <span className="font-mono text-primary/80">LANEGRA</span>
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  // ---- Dashboard ----
  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
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
            Reservations
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/admin/availability"
            className="inline-flex h-10 items-center gap-2 rounded-none border border-border/50 px-4 text-[10px] uppercase tracking-[0.2em] text-foreground/80 transition-colors hover:border-primary/50 hover:text-primary"
          >
            <CalendarDays className="size-3.5" />
            Availability
          </a>
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

      {/* Filter tabs + counts */}
      <div className="mt-8 flex flex-wrap gap-2">
        {(["all", "pending", "confirmed", "cancelled"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.2em] transition-all",
              filter === f
                ? "border-primary bg-primary/10 text-primary"
                : "border-border/40 text-muted-foreground hover:border-primary/50 hover:text-foreground"
            )}
          >
            {f}
            <span className="rounded-full bg-[#0a0a0a] px-1.5 py-0.5 text-[9px] text-muted-foreground">
              {counts[f]}
            </span>
          </button>
        ))}
      </div>

      {/* List */}
      <div className="mt-8">
        {loading && reservations.length === 0 ? (
          <div className="flex h-40 items-center justify-center text-muted-foreground">
            <Loader2 className="size-5 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex h-40 items-center justify-center rounded-sm border border-border/20 text-[13px] text-muted-foreground">
            No reservations found.
          </div>
        ) : (
          <motion.div
            className="space-y-3"
            initial="hidden"
            animate="visible"
            variants={staggerFast}
          >
            {filtered.map((r) => {
              const st = r.status as Status;
              const meta = STATUS_META[st];
              return (
                <motion.article
                  key={r.id}
                  variants={fadeUp}
                  className="group relative overflow-hidden rounded-sm border border-border/30 bg-[#0d0d0d] p-5 transition-colors hover:border-border/50 sm:p-6"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    {/* Left: identity */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-serif-display text-lg text-foreground">
                          {r.name}
                        </h3>
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[9px] uppercase tracking-[0.2em]",
                            meta.cls
                          )}
                        >
                          <span className={cn("size-1.5 rounded-full", meta.dot)} />
                          {meta.label}
                        </span>
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="size-3 text-primary/70" />
                          {r.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="size-3 text-primary/70" />
                          {r.time}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Users className="size-3 text-primary/70" />
                          {r.guests} {r.guests === 1 ? "guest" : "guests"}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Phone className="size-3 text-primary/70" />
                          {r.phone}
                        </span>
                      </div>
                      {r.notes && (
                        <p className="mt-2 text-[12px] italic text-muted-foreground/80">
                          “{r.notes}”
                        </p>
                      )}
                      <p className="mt-2 font-mono text-[10px] text-muted-foreground/50">
                        Folio: {r.id.slice(-8).toUpperCase()} ·{" "}
                        {new Date(r.createdAt).toLocaleString()}
                      </p>
                    </div>

                    {/* Right: actions */}
                    <div className="flex shrink-0 items-center gap-2">
                      {st !== "confirmed" && (
                        <button
                          onClick={() => updateStatus(r.id, "confirmed")}
                          disabled={updatingId === r.id}
                          className="inline-flex h-9 items-center gap-1.5 rounded-none border border-primary/50 bg-primary/10 px-3 text-[10px] uppercase tracking-[0.2em] text-primary transition-all hover:bg-primary/20 disabled:opacity-50"
                        >
                          {updatingId === r.id ? (
                            <Loader2 className="size-3.5 animate-spin" />
                          ) : (
                            <Check className="size-3.5" />
                          )}
                          Confirm
                        </button>
                      )}
                      {st !== "cancelled" && (
                        <button
                          onClick={() => updateStatus(r.id, "cancelled")}
                          disabled={updatingId === r.id}
                          className="inline-flex h-9 items-center gap-1.5 rounded-none border border-destructive/40 px-3 text-[10px] uppercase tracking-[0.2em] text-destructive transition-all hover:bg-destructive/10 disabled:opacity-50"
                        >
                          <X className="size-3.5" />
                          Cancel
                        </button>
                      )}
                      {st === "cancelled" && (
                        <button
                          onClick={() => updateStatus(r.id, "pending")}
                          disabled={updatingId === r.id}
                          className="inline-flex h-9 items-center gap-1.5 rounded-none border border-border/50 px-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-all hover:text-foreground disabled:opacity-50"
                        >
                          <RefreshCw className="size-3.5" />
                          Reopen
                        </button>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}
