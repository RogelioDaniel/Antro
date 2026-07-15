import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * POST /api/reservations?XTransformPort=3000
 * Body: { name, phone, date, time, guests, notes? }
 * Persists a reservation request to the Reservation table (status "pending"),
 * then returns the saved record so the client can open WhatsApp with a
 * pre-formatted message that includes the reservation ID.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const name: string = (body?.name ?? "").trim();
    const phone: string = (body?.phone ?? "").trim();
    const date: string = (body?.date ?? "").trim();
    const time: string = (body?.time ?? "").trim();
    const guestsRaw = Number(body?.guests);
    const notes: string | null = body?.notes ? String(body.notes).trim() : null;

    // validation
    if (!name || name.length < 2)
      return NextResponse.json({ ok: false, error: "Name required" }, { status: 400 });
    if (!phone || phone.replace(/\D/g, "").length < 10)
      return NextResponse.json({ ok: false, error: "Invalid phone" }, { status: 400 });
    if (!date)
      return NextResponse.json({ ok: false, error: "Date required" }, { status: 400 });
    if (!time)
      return NextResponse.json({ ok: false, error: "Time required" }, { status: 400 });
    if (!Number.isFinite(guestsRaw) || guestsRaw < 1 || guestsRaw > 20)
      return NextResponse.json({ ok: false, error: "Invalid guests" }, { status: 400 });

    const reservation = await db.reservation.create({
      data: {
        name,
        phone,
        date,
        time,
        guests: guestsRaw,
        notes,
        status: "pending",
        source: "website",
      },
    });

    return NextResponse.json({ ok: true, reservation });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: (e as Error).message },
      { status: 500 }
    );
  }
}

/**
 * GET /api/reservations?XTransformPort=3000
 * Returns recent reservations (most recent 50). Useful for a future admin view.
 */
export async function GET() {
  try {
    const reservations = await db.reservation.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    return NextResponse.json({ ok: true, reservations });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: (e as Error).message },
      { status: 500 }
    );
  }
}
