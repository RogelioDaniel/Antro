import type { Metadata } from "next";
import { AdminAvailabilityView } from "@/components/site/admin-availability-view";

export const metadata: Metadata = {
  title: "Admin · Availability — La Negra",
  description: "Staff availability calendar editor.",
  robots: { index: false, follow: false },
};

/**
 * Admin availability calendar editor (/admin/availability).
 * PIN-gated. Lets staff override per-night availability (open/limited/full
 * + custom seat count) via PATCH /api/availability. Noindex.
 */
export default function AdminAvailabilityPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminAvailabilityView />
    </div>
  );
}
