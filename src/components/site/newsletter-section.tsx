"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowRight, Check, Loader2 } from "lucide-react";
import { fadeUp, staggerFast, viewportOnce } from "@/lib/motion";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Email inválido");
      setStatus("error");
      return;
    }
    setError("");
    setStatus("loading");
    // Simulate subscription (would POST to /api/newsletter in production)
    setTimeout(() => {
      setStatus("done");
      setEmail("");
    }, 900);
  };

  return (
    <section
      className="relative overflow-hidden border-t border-border/20 bg-[#0a0a0a] py-20 sm:py-28"
      aria-labelledby="newsletter-heading"
    >
      {/* gold orb */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.06] blur-[120px]" />

      <div className="relative mx-auto max-w-2xl px-5 text-center sm:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerFast}
        >
          <motion.div
            variants={fadeUp}
            className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-primary/40 bg-primary/10"
          >
            <Mail className="size-5 text-primary" />
          </motion.div>
          <motion.h2
            id="newsletter-heading"
            variants={fadeUp}
            className="font-serif-display text-[clamp(1.6rem,4vw,2.6rem)] font-medium leading-tight text-foreground"
          >
            Join the Inner Circle
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-3 max-w-md text-[13px] font-light leading-relaxed text-muted-foreground"
          >
            Eventos privados, lanzamientos de mezcal y noches secretas.
            Solo para quienes saben dónde empieza la noche.
          </motion.p>
        </motion.div>

        <motion.form
          onSubmit={submit}
          className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative flex-1">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              placeholder="tu@email.com"
              aria-label="Email"
              className="h-12 w-full rounded-none border border-border/50 bg-[#0d0d0d] pl-11 pr-4 text-[14px] text-foreground placeholder:text-muted-foreground/60 focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/30"
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading" || status === "done"}
            className="group inline-flex h-12 items-center justify-center gap-2 bg-primary px-6 text-[11px] uppercase tracking-[0.25em] text-primary-foreground transition-all hover:bg-primary-dark hover:shadow-[0_0_30px_rgba(197,160,89,0.35)] disabled:opacity-70"
          >
            {status === "loading" ? (
              <Loader2 className="size-4 animate-spin" />
            ) : status === "done" ? (
              <>
                <Check className="size-4" /> Suscrito
              </>
            ) : (
              <>
                Suscribir
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </button>
        </motion.form>

        <div className="mt-3 h-5">
          <AnimatePresence mode="wait">
            {status === "error" && (
              <motion.p
                key="err"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-[12px] text-destructive"
              >
                {error}
              </motion.p>
            )}
            {status === "done" && (
              <motion.p
                key="ok"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-[12px] text-primary"
              >
                Bienvenido al círculo. Revisa tu correo.
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground/60">
          Sin spam · Cancela cuando quieras
        </p>
      </div>
    </section>
  );
}
