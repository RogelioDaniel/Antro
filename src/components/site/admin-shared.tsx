"use client";

import { useEffect, useState } from "react";
import { Lock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_CINEMA } from "@/lib/motion";
import { cn } from "@/lib/utils";

const ADMIN_PIN = "LANEGRA";
const SESSION_KEY = "la-negra-admin-session";

/**
 * Shared admin PIN gate. Wraps protected admin views. Uses sessionStorage
 * so the gate persists across tabs in the same session but clears on close.
 */
export function useAdminAuth() {
  const [authed, setAuthed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => {
      if (typeof window !== "undefined" && window.sessionStorage.getItem(SESSION_KEY) === "1") {
        setAuthed(true);
      }
      setReady(true);
    }, 0);
    return () => clearTimeout(id);
  }, []);

  const login = () => {
    window.sessionStorage.setItem(SESSION_KEY, "1");
    setAuthed(true);
  };
  const logout = () => {
    window.sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
  };

  return { authed, ready, login, logout };
}

export function AdminPinGate({
  authed,
  ready,
  onLogin,
  title,
}: {
  authed: boolean;
  ready: boolean;
  onLogin: (pin: string) => boolean;
  title: string;
}) {
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);

  const tryPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.toUpperCase() === ADMIN_PIN) {
      onLogin(pinInput);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  if (authed || !ready) return null;

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
              {title}
            </h1>
            <p className="mt-2 text-[12px] text-muted-foreground">
              Enter the staff PIN to continue.
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
