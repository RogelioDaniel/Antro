/**
 * WhatsApp integration helpers.
 * Builds a pre-formatted wa.me deep link with reservation / VIP list data.
 */
import { SITE } from "@/lib/constants";

export interface ReservationData {
  date: string;
  time: string;
  guests: string;
  name: string;
  phone: string;
  notes?: string;
}

export interface VipData {
  name: string;
  guests: string;
  arrival: string;
  agreedDressCode: boolean;
}

export interface PrivateEventData {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  date: string;
  guests: string;
  message: string;
}

function normalizePhone(raw: string): string {
  // Keep digits, ensure mexican prefix if user wrote local number
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("52")) return digits;
  if (digits.startsWith("1") && digits.length === 11) return "52" + digits.slice(1);
  if (digits.length === 10) return "52" + digits;
  return digits;
}

export function generateWhatsAppLink(message: string): string {
  return `https://wa.me/${SITE.phone}?text=${encodeURIComponent(message)}`;
}

export function buildReservationMessage(d: ReservationData): string {
  return [
    "*LA NEGRA — Reservación de Mesa*",
    "",
    `Nombre: ${d.name}`,
    `Fecha: ${d.date}`,
    `Hora: ${d.time}`,
    `Personas: ${d.guests}`,
    `Teléfono: ${d.phone}`,
    d.notes ? `Notas: ${d.notes}` : "",
    "",
    "Confirmo mi reservación. ¡Gracias!",
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildVipMessage(d: VipData): string {
  return [
    "*LA NEGRA — Lista VIP*",
    "",
    `Nombre: ${d.name}`,
    `Acompañantes: ${d.guests}`,
    `Llegada aprox.: ${d.arrival}`,
    "",
    "Solicito acceso a la lista VIP de La Negra.",
  ].join("\n");
}

export function buildPrivateEventMessage(d: PrivateEventData): string {
  return [
    "*LA NEGRA — Evento Privado*",
    "",
    `Contacto: ${d.name}`,
    `Email: ${d.email}`,
    `Teléfono: ${d.phone}`,
    `Tipo de evento: ${d.eventType}`,
    `Fecha tentativa: ${d.date}`,
    `Personas: ${d.guests}`,
    d.message ? `Mensaje: ${d.message}` : "",
    "",
    "Solicito cotización para un evento privado en La Negra.",
  ]
    .filter(Boolean)
    .join("\n");
}

export function openWhatsApp(message: string) {
  if (typeof window !== "undefined") {
    window.open(generateWhatsAppLink(message), "_blank", "noopener,noreferrer");
  }
}

export { normalizePhone };
