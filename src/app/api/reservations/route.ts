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
 * GET /api/reservations?XTransformPort=3000&status=pending|confirmed|cancelled
 * Returns recent reservations (most recent 100), optionally filtered by status.
 */
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const status = url.searchParams.get("status");
    const where = status && ["pending", "confirmed", "cancelled"].includes(status)
      ? { status }
      : {};
    const reservations = await db.reservation.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    return NextResponse.json({ ok: true, reservations });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: (e as Error).message },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/reservations?XTransformPort=3000
 * Body: { id, status: "pending"|"confirmed"|"cancelled" }
 * Updates a reservation's status (admin action).
 */
export async function PATCH(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const id: string = (body?.id ?? "").trim();
    const status: string = (body?.status ?? "").trim();
    if (!id)
      return NextResponse.json({ ok: false, error: "id required" }, { status: 400 });
    if (!["pending", "confirmed", "cancelled"].includes(status))
      return NextResponse.json(
        { ok: false, error: "Invalid status" },
        { status: 400 }
      );

    const updated = await db.reservation.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json({ ok: true, reservation: updated });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: (e as Error).message },
      { status: 500 }
    );
  }
}
