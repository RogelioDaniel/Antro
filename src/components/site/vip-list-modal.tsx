"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, User, Clock, Check, Sparkles, Share2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/lib/store";
import { VIP_ARRIVAL_SLOTS } from "@/lib/constants";
import { buildVipMessage, openWhatsApp, type VipData } from "@/lib/whatsapp";
import { DecorativeQR } from "@/components/site/decorative-qr";
import { cn } from "@/lib/utils";

interface Errors {
  name?: string;
  guests?: string;
  arrival?: string;
  agreed?: string;
}

function validate(d: Partial<VipData>): Errors {
  const e: Errors = {};
  if (!d.name || d.name.trim().length < 2) e.name = "Tu nombre es requerido";
  const g = Number(d.guests);
  if (!d.guests) e.guests = "Indica acompañantes";
  else if (g < 1 || g > 4) e.guests = "Máximo 4 personas en lista VIP";
  if (!d.arrival) e.arrival = "Selecciona hora de llegada";
  if (!d.agreedDressCode) e.agreed = "Debes aceptar el dress code";
  return e;
}

export function VipListModal() {
  const open = useUIStore((s) => s.openModal === "vip");
  const close = useUIStore((s) => s.closeModal);

  const [form, setForm] = useState<Partial<VipData>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [passId, setPassId] = useState("");

  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setForm({});
        setTouched({});
        setSubmitting(false);
        setSuccess(false);
        setPassId("");
      }, 250);
      return () => clearTimeout(t);
    }
  }, [open]);

  const errors = validate(form);
  const isValid = Object.keys(errors).length === 0;

  const set = (k: keyof VipData, v: string | boolean) =>
    setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, guests: true, arrival: true, agreed: true });
    if (
      !isValid ||
      !form.name ||
      !form.guests ||
      !form.arrival ||
      !form.agreedDressCode
    )
      return;
    setSubmitting(true);
    const id = `LN-VIP-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    setPassId(id);
    // Also push the request to WhatsApp in the background
    const message = buildVipMessage({
      name: form.name,
      guests: form.guests,
      arrival: form.arrival,
      agreedDressCode: form.agreedDressCode,
    });
    setTimeout(() => {
      openWhatsApp(message);
      setSubmitting(false);
      setSuccess(true);
    }, 700);
  };

  const share = async () => {
    const text = `Mi pase VIP La Negra · ${passId}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "La Negra VIP", text });
      } else {
        await navigator.clipboard.writeText(text);
      }
    } catch {
      /* user cancelled */
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && close()}>
      <DialogContent className="glass-panel max-h-[92svh] overflow-y-auto rounded-sm border-primary/25 p-0 sm:max-w-[460px]">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent" />
        <AnimatePresence mode="wait">
          {!success ? (
            <motion.div
              key="form"
              className="p-6 sm:p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <DialogHeader className="space-y-2 text-left">
                <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-primary">
                  <Sparkles className="size-3" /> Lista VIP
                </span>
                <DialogTitle className="font-serif-display text-3xl font-medium text-foreground">
                  VIP Access List
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Acceso prioritario. Rápido y sin fricción. Máximo 4 personas.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={onSubmit} className="mt-6 space-y-5" noValidate>
                <Field label="Nombre" icon={<User className="size-4" />} error={touched.name ? errors.name : undefined}>
                  <Input
                    value={form.name ?? ""}
                    onChange={(e) => set("name", e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                    placeholder="Tu nombre"
                    className="h-11 rounded-none border-border/60 bg-transparent pl-10 text-foreground placeholder:text-muted-foreground/60"
                    aria-invalid={!!(touched.name && errors.name)}
                  />
                </Field>

                <div className="grid grid-cols-2 gap-4">
                  <Field label="Acompañantes" icon={<Users className="size-4" />} error={touched.guests ? errors.guests : undefined}>
                    <Select
                      value={form.guests ?? ""}
                      onValueChange={(v) => set("guests", v)}
                    >
                      <SelectTrigger className="h-11 rounded-none border-border/60 bg-transparent pl-10 text-foreground focus:ring-primary/30">
                        <SelectValue placeholder="—" />
                      </SelectTrigger>
                      <SelectContent className="border-border/60 bg-[#121212]">
                        {["1", "2", "3", "4"].map((g) => (
                          <SelectItem key={g} value={g} className="focus:bg-primary/15 focus:text-primary">
                            {g}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field label="Llegada aprox." icon={<Clock className="size-4" />} error={touched.arrival ? errors.arrival : undefined}>
                    <Select
                      value={form.arrival ?? ""}
                      onValueChange={(v) => set("arrival", v)}
                    >
                      <SelectTrigger className="h-11 rounded-none border-border/60 bg-transparent pl-10 text-foreground focus:ring-primary/30">
                        <SelectValue placeholder="—:—" />
                      </SelectTrigger>
                      <SelectContent className="max-h-64 border-border/60 bg-[#121212]">
                        {VIP_ARRIVAL_SLOTS.map((t) => (
                          <SelectItem key={t} value={t} className="focus:bg-primary/15 focus:text-primary">
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                </div>

                {/* Dress code checkbox */}
                <label
                  className={cn(
                    "flex cursor-pointer items-start gap-3 rounded-sm border p-4 transition-colors",
                    touched.agreed && errors.agreed
                      ? "border-destructive/50"
                      : "border-border/50 hover:border-primary/50"
                  )}
                >
                  <Checkbox
                    checked={!!form.agreedDressCode}
                    onCheckedChange={(v) => set("agreedDressCode", v === true)}
                    className="mt-0.5 border-primary/50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                  />
                  <span className="text-[13px] leading-relaxed text-foreground/80">
                    Acepto el dress code{" "}
                    <span className="text-primary">Smart Casual</span> de La Negra.
                  </span>
                </label>
                {touched.agreed && errors.agreed && (
                  <p className="-mt-2 text-[11px] text-destructive">{errors.agreed}</p>
                )}

                <Button
                  type="submit"
                  disabled={submitting}
                  className="mt-2 h-12 w-full rounded-none bg-primary text-[12px] uppercase tracking-[0.25em] text-primary-foreground transition-all hover:bg-primary-dark hover:shadow-[0_0_30px_rgba(197,160,89,0.35)] disabled:opacity-60"
                >
                  {submitting ? "Generando pase…" : "Solicitar Acceso VIP"}
                </Button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              className="p-6 sm:p-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex flex-col items-center text-center">
                <motion.div
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-primary/40 bg-primary/10"
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                >
                  <Check className="size-6 text-primary" />
                </motion.div>
                <span className="mt-4 text-[10px] uppercase tracking-[0.4em] text-primary">
                  Pase Confirmado
                </span>
                <h3 className="mt-2 font-serif-display text-3xl font-medium text-foreground">
                  Bienvenido a la lista
                </h3>
                <p className="mt-2 max-w-xs text-[13px] leading-relaxed text-muted-foreground">
                  Muestra este pase en la entrada. Tu nombre ya está en lista.
                </p>

                {/* QR pass */}
                <div className="mt-6 w-full max-w-[220px]">
                  <DecorativeQR seed={passId + form.name} />
                </div>

                <div className="mt-4 w-full rounded-sm border border-border/40 bg-[#0f0f0f] p-4 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
                      Pass ID
                    </span>
                    <span className="font-mono text-[11px] text-primary">{passId}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
                      Nombre
                    </span>
                    <span className="text-[12px] text-foreground">{form.name}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
                      Personas
                    </span>
                    <span className="text-[12px] text-foreground">{form.guests}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
                      Llegada
                    </span>
                    <span className="text-[12px] text-foreground">{form.arrival}</span>
                  </div>
                </div>

                <div className="mt-5 flex w-full gap-3">
                  <Button
                    onClick={share}
                    variant="outline"
                    className="h-11 flex-1 rounded-none border-border/60 text-[11px] uppercase tracking-[0.2em] text-foreground hover:bg-primary/10 hover:text-primary"
                  >
                    <Share2 className="size-4" /> Guardar
                  </Button>
                  <Button
                    onClick={close}
                    className="h-11 flex-1 rounded-none bg-primary text-[11px] uppercase tracking-[0.2em] text-primary-foreground hover:bg-primary-dark"
                  >
                    Listo
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

function Field({
  label,
  icon,
  error,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </Label>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-primary/70">
            {icon}
          </span>
        )}
        {children}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[11px] text-destructive"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
