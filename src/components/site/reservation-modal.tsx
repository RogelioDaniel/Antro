"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Clock, Users, User, Phone, MessageCircle, Loader2 } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/lib/store";
import { TIME_SLOTS, SITE } from "@/lib/constants";
import {
  buildReservationMessage,
  openWhatsApp,
  type ReservationData,
} from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const today = new Date().toISOString().split("T")[0];

interface Errors {
  date?: string;
  time?: string;
  guests?: string;
  name?: string;
  phone?: string;
}

function validate(d: Partial<ReservationData>): Errors {
  const e: Errors = {};
  if (!d.date) e.date = "Selecciona una fecha";
  if (!d.time) e.time = "Elige una hora";
  if (!d.guests) e.guests = "Indica el número de personas";
  if (!d.name || d.name.trim().length < 2) e.name = "Tu nombre es requerido";
  if (!d.phone || d.phone.replace(/\D/g, "").length < 10)
    e.phone = "Teléfono inválido (mín. 10 dígitos)";
  return e;
}

export function ReservationModal() {
  const open = useUIStore((s) => s.openModal === "reservation");
  const close = useUIStore((s) => s.closeModal);
  const preselectedDate = useUIStore((s) => s.preselectedDate);
  const clearPreselectedDate = useUIStore((s) => s.clearPreselectedDate);

  const [form, setForm] = useState<Partial<ReservationData>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);

  // Pre-fill the date field when opened from the availability calendar
  useEffect(() => {
    if (open && preselectedDate) {
      const seed = preselectedDate;
      const id = setTimeout(() => {
        setForm((f) => ({ ...f, date: seed }));
        setTouched((t) => ({ ...t, date: true }));
        clearPreselectedDate();
      }, 0);
      return () => clearTimeout(id);
    }
  }, [open, preselectedDate, clearPreselectedDate]);

  // Reset form when closing
  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setForm({});
        setTouched({});
        setSubmitting(false);
      }, 250);
      return () => clearTimeout(t);
    }
  }, [open]);

  const errors = validate(form);
  const isValid = Object.keys(errors).length === 0;

  const set = (k: keyof ReservationData, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ date: true, time: true, guests: true, name: true, phone: true });
    if (!isValid || !form.date || !form.time || !form.guests || !form.name || !form.phone)
      return;
    setSubmitting(true);
    try {
      // Persist the reservation to the database
      const res = await fetch("/api/reservations?XTransformPort=3000", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          date: form.date,
          time: form.time,
          guests: form.guests,
          notes: form.notes ?? "",
        }),
      });
      const data = await res.json();
      const reservationId = data?.reservation?.id
        ? data.reservation.id.slice(-8).toUpperCase()
        : undefined;
      const message = buildReservationMessage(
        {
          date: form.date,
          time: form.time,
          guests: form.guests,
          name: form.name,
          phone: form.phone,
          notes: form.notes,
        },
        reservationId
      );
      openWhatsApp(message);
    } catch {
      // Fallback: open WhatsApp without persistence
      const message = buildReservationMessage({
        date: form.date,
        time: form.time,
        guests: form.guests,
        name: form.name,
        phone: form.phone,
        notes: form.notes,
      });
      openWhatsApp(message);
    } finally {
      setSubmitting(false);
      close();
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && close()}>
      <DialogContent className="glass-panel max-h-[92svh] overflow-y-auto rounded-sm border-primary/25 p-0 sm:max-w-[480px]">
        {/* top gold accent */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent" />
        <div className="p-6 sm:p-8">
          <DialogHeader className="space-y-2 text-left">
            <span className="text-[10px] uppercase tracking-[0.4em] text-primary">
              Reservación
            </span>
            <DialogTitle className="font-serif-display text-3xl font-medium text-foreground">
              Reserve a Table
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Confirma tu mesa. Te redirigimos a WhatsApp para validar la
              disponibilidad con nuestro anfitrión.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={onSubmit} className="mt-6 space-y-5" noValidate>
            {/* Date */}
            <Field
              label="Fecha"
              icon={<CalendarDays className="size-4" />}
              error={touched.date ? errors.date : undefined}
            >
              <Input
                type="date"
                min={today}
                value={form.date ?? ""}
                onChange={(e) => set("date", e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, date: true }))}
                className={cn(
                  "h-11 rounded-none border-border/60 bg-transparent pl-10 text-foreground",
                  "[&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                )}
                aria-invalid={!!(touched.date && errors.date)}
              />
            </Field>

            {/* Time + Guests */}
            <div className="grid grid-cols-2 gap-4">
              <Field
                label="Hora"
                icon={<Clock className="size-4" />}
                error={touched.time ? errors.time : undefined}
              >
                <Select
                  value={form.time ?? ""}
                  onValueChange={(v) => set("time", v)}
                >
                  <SelectTrigger className="h-11 rounded-none border-border/60 bg-transparent pl-10 text-foreground focus:ring-primary/30">
                    <SelectValue placeholder="—:—" />
                  </SelectTrigger>
                  <SelectContent className="max-h-64 border-border/60 bg-[#121212]">
                    {TIME_SLOTS.map((t) => (
                      <SelectItem
                        key={t}
                        value={t}
                        className="focus:bg-primary/15 focus:text-primary"
                      >
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field
                label="Personas"
                icon={<Users className="size-4" />}
                error={touched.guests ? errors.guests : undefined}
              >
                <Select
                  value={form.guests ?? ""}
                  onValueChange={(v) => set("guests", v)}
                >
                  <SelectTrigger className="h-11 rounded-none border-border/60 bg-transparent pl-10 text-foreground focus:ring-primary/30">
                    <SelectValue placeholder="—" />
                  </SelectTrigger>
                  <SelectContent className="max-h-64 border-border/60 bg-[#121212]">
                    {Array.from({ length: 12 }, (_, i) => String(i + 1)).map((g) => (
                      <SelectItem
                        key={g}
                        value={g}
                        className="focus:bg-primary/15 focus:text-primary"
                      >
                        {g} {g === "1" ? "persona" : "personas"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>

            {/* Name */}
            <Field
              label="Nombre"
              icon={<User className="size-4" />}
              error={touched.name ? errors.name : undefined}
            >
              <Input
                value={form.name ?? ""}
                onChange={(e) => set("name", e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                placeholder="Tu nombre completo"
                className="h-11 rounded-none border-border/60 bg-transparent pl-10 text-foreground placeholder:text-muted-foreground/60"
                aria-invalid={!!(touched.name && errors.name)}
              />
            </Field>

            {/* Phone */}
            <Field
              label="Teléfono"
              icon={<Phone className="size-4" />}
              error={touched.phone ? errors.phone : undefined}
            >
              <Input
                type="tel"
                inputMode="tel"
                value={form.phone ?? ""}
                onChange={(e) => set("phone", e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                placeholder="55 1234 5678"
                className="h-11 rounded-none border-border/60 bg-transparent pl-10 text-foreground placeholder:text-muted-foreground/60"
                aria-invalid={!!(touched.phone && errors.phone)}
              />
            </Field>

            <Button
              type="submit"
              disabled={submitting}
              className="group mt-2 h-12 w-full rounded-none bg-primary text-[12px] uppercase tracking-[0.25em] text-primary-foreground transition-all hover:bg-primary-dark hover:shadow-[0_0_30px_rgba(197,160,89,0.35)] disabled:opacity-60"
            >
              {submitting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <>
                  <MessageCircle className="size-4" />
                  Confirmar por WhatsApp
                </>
              )}
            </Button>

            <p className="text-center text-[11px] leading-relaxed text-muted-foreground">
              Al confirmar abriremos WhatsApp con tu solicitud pre-formateada
              al {SITE.phoneDisplay}.
            </p>
          </form>
        </div>
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
