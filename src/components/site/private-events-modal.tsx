"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  CalendarDays,
  Users,
  MessageSquare,
  Loader2,
  MessageCircle,
} from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/lib/store";
import { PRIVATE_EVENTS, SITE } from "@/lib/constants";
import {
  buildPrivateEventMessage,
  openWhatsApp,
  type PrivateEventData,
} from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const today = new Date().toISOString().split("T")[0];

interface Errors {
  name?: string;
  email?: string;
  phone?: string;
  eventType?: string;
  date?: string;
  guests?: string;
}

function validate(d: Partial<PrivateEventData>): Errors {
  const e: Errors = {};
  if (!d.name || d.name.trim().length < 2) e.name = "Requerido";
  if (!d.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) e.email = "Email inválido";
  if (!d.phone || d.phone.replace(/\D/g, "").length < 10) e.phone = "Teléfono inválido";
  if (!d.eventType) e.eventType = "Selecciona un formato";
  if (!d.date) e.date = "Selecciona una fecha";
  if (!d.guests) e.guests = "Indica el número";
  return e;
}

export function PrivateEventsModal() {
  const open = useUIStore((s) => s.openModal === "private-events");
  const close = useUIStore((s) => s.closeModal);

  const [form, setForm] = useState<Partial<PrivateEventData>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);

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

  const set = (k: keyof PrivateEventData, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      name: true,
      email: true,
      phone: true,
      eventType: true,
      date: true,
      guests: true,
    });
    if (!isValid || !form.name || !form.email || !form.phone || !form.eventType || !form.date || !form.guests)
      return;
    setSubmitting(true);
    const message = buildPrivateEventMessage({
      name: form.name,
      email: form.email,
      phone: form.phone,
      eventType: form.eventType,
      date: form.date,
      guests: form.guests,
      message: form.message ?? "",
    });
    setTimeout(() => {
      openWhatsApp(message);
      setSubmitting(false);
      close();
    }, 700);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && close()}>
      <DialogContent className="glass-panel max-h-[92svh] overflow-y-auto rounded-sm border-primary/25 p-0 sm:max-w-[520px]">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent" />
        <div className="p-6 sm:p-8">
          <DialogHeader className="space-y-2 text-left">
            <span className="text-[10px] uppercase tracking-[0.4em] text-primary">
              Evento Privado
            </span>
            <DialogTitle className="font-serif-display text-3xl font-medium text-foreground">
              Solicitar Cotización
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Comparte los detalles. Te contactamos por WhatsApp con una
              propuesta a la medida.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Nombre" icon={<User className="size-4" />} error={touched.name ? errors.name : undefined}>
                <Input
                  value={form.name ?? ""}
                  onChange={(e) => set("name", e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                  placeholder="Tu nombre"
                  className="h-11 rounded-none border-border/60 bg-transparent pl-10 text-foreground placeholder:text-muted-foreground/60"
                />
              </Field>
              <Field label="Email" icon={<Mail className="size-4" />} error={touched.email ? errors.email : undefined}>
                <Input
                  type="email"
                  value={form.email ?? ""}
                  onChange={(e) => set("email", e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                  placeholder="tu@email.com"
                  className="h-11 rounded-none border-border/60 bg-transparent pl-10 text-foreground placeholder:text-muted-foreground/60"
                />
              </Field>
            </div>

            <Field label="Teléfono" icon={<Phone className="size-4" />} error={touched.phone ? errors.phone : undefined}>
              <Input
                type="tel"
                value={form.phone ?? ""}
                onChange={(e) => set("phone", e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                placeholder="55 1234 5678"
                className="h-11 rounded-none border-border/60 bg-transparent pl-10 text-foreground placeholder:text-muted-foreground/60"
              />
            </Field>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Formato" error={touched.eventType ? errors.eventType : undefined}>
                <Select
                  value={form.eventType ?? ""}
                  onValueChange={(v) => set("eventType", v)}
                >
                  <SelectTrigger className="h-11 rounded-none border-border/60 bg-transparent text-foreground focus:ring-primary/30">
                    <SelectValue placeholder="Selecciona" />
                  </SelectTrigger>
                  <SelectContent className="border-border/60 bg-[#121212]">
                    {PRIVATE_EVENTS.map((o) => (
                      <SelectItem key={o.id} value={o.title} className="focus:bg-primary/15 focus:text-primary">
                        {o.title}
                      </SelectItem>
                    ))}
                    <SelectItem value="Otro" className="focus:bg-primary/15 focus:text-primary">
                      Otro / Personalizado
                    </SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Personas" icon={<Users className="size-4" />} error={touched.guests ? errors.guests : undefined}>
                <Input
                  type="number"
                  min={1}
                  value={form.guests ?? ""}
                  onChange={(e) => set("guests", e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, guests: true }))}
                  placeholder="20"
                  className="h-11 rounded-none border-border/60 bg-transparent pl-10 text-foreground placeholder:text-muted-foreground/60"
                />
              </Field>
            </div>

            <Field label="Fecha tentativa" icon={<CalendarDays className="size-4" />} error={touched.date ? errors.date : undefined}>
              <Input
                type="date"
                min={today}
                value={form.date ?? ""}
                onChange={(e) => set("date", e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, date: true }))}
                className="h-11 rounded-none border-border/60 bg-transparent pl-10 text-foreground [&&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:cursor-pointer"
              />
            </Field>

            <Field label="Mensaje (opcional)" icon={<MessageSquare className="size-4" />}>
              <Textarea
                value={form.message ?? ""}
                onChange={(e) => set("message", e.target.value)}
                placeholder="Cuéntanos sobre tu evento..."
                rows={3}
                className="rounded-none border-border/60 bg-transparent pl-10 pt-3 text-foreground placeholder:text-muted-foreground/60"
              />
            </Field>

            <Button
              type="submit"
              disabled={submitting}
              className="mt-2 h-12 w-full rounded-none bg-primary text-[12px] uppercase tracking-[0.25em] text-primary-foreground transition-all hover:bg-primary-dark hover:shadow-[0_0_30px_rgba(197,160,89,0.35)] disabled:opacity-60"
            >
              {submitting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <>
                  <MessageCircle className="size-4" />
                  Enviar solicitud por WhatsApp
                </>
              )}
            </Button>

            <p className="text-center text-[11px] text-muted-foreground">
              Se abrirá WhatsApp con tu solicitud para {SITE.phoneDisplay}.
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
