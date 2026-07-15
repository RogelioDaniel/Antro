import type { Metadata } from "next";
import { AdminReservationsView } from "@/components/site/admin-reservations-view";

export const metadata: Metadata = {
  title: "Admin · Reservations — La Negra",
  description: "Staff reservations dashboard.",
  robots: { index: false, follow: false },
};

/**
 * Admin reservations dashboard (/admin/reservations).
 * PIN-gated client view that lists all persisted reservations and allows
 * staff to confirm / cancel / reopen them via PATCH /api/reservations.
 * Intentionally not indexed (robots noindex).
 */
export default function AdminReservationsPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminReservationsView />
    </div>
  );
}
