import { db } from "@/lib/db";

/**
 * GET /api/reservations/export?XTransformPort=3000
 * Returns all reservations as a CSV download (UTF-8 with BOM for Excel).
 * Intended for staff/admin use.
 */
function csvEscape(v: unknown): string {
  const s = v == null ? "" : String(v);
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export async function GET() {
  try {
    const reservations = await db.reservation.findMany({
      orderBy: { createdAt: "desc" },
      take: 1000,
    });

    const headers = [
      "Folio",
      "Name",
      "Phone",
      "Date",
      "Time",
      "Guests",
      "Status",
      "Source",
      "Notes",
      "Created At",
    ];

    const rows = reservations.map((r) =>
      [
        r.id.slice(-8).toUpperCase(),
        r.name,
        r.phone,
        r.date,
        r.time,
        r.guests,
        r.status,
        r.source,
        r.notes ?? "",
        r.createdAt.toISOString(),
      ]
        .map(csvEscape)
        .join(",")
    );

    // UTF-8 BOM so Excel reads accents correctly
    const csv = "\uFEFF" + [headers.map(csvEscape).join(","), ...rows].join("\r\n");

    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="la-negra-reservations-${new Date()
          .toISOString()
          .split("T")[0]}.csv"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
