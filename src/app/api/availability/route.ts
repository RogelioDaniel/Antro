import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET /api/availability?XTransformPort=3000
 * Returns availability for the next `days` (default 35) nights.
 * Auto-seeds missing days so the calendar always has data.
 * Status logic: open (>=21 seats), limited (1-20), full (0).
 */
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const days = Math.min(Number(url.searchParams.get("days") ?? 35), 90);

    // Build the list of dates we care about (only Thu/Fri/Sat — La Negra nights)
    const today = new Date();
    const dates: string[] = [];
    for (let i = 0; i < days * 2 && dates.length < days; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const dow = d.getDay(); // 0 Sun ... 6 Sat
      if (dow === 4 || dow === 5 || dow === 6) {
        // Thu(4) Fri(5) Sat(6)
        dates.push(d.toISOString().split("T")[0]);
      }
    }

    // Fetch existing rows
    const existing = await db.reservationDay.findMany({
      where: { date: { in: dates } },
    });
    const existingMap = new Map(existing.map((r) => [r.date, r]));

    // Seed missing days with deterministic pseudo-random availability
    const toCreate: { date: string; status: string; seatsLeft: number }[] = [];
    for (const date of dates) {
      if (!existingMap.has(date)) {
        // deterministic pseudo-random based on date string
        let h = 0;
        for (let i = 0; i < date.length; i++) h = (h * 31 + date.charCodeAt(i)) >>> 0;
        const r = (h % 100) / 100;
        // ~55% open, ~30% limited, ~15% full
        const seatsLeft = r > 0.85 ? 0 : r > 0.55 ? Math.max(1, Math.floor(r * 30)) : 60 + Math.floor(r * 30);
        const status = seatsLeft === 0 ? "full" : seatsLeft < 21 ? "limited" : "open";
        toCreate.push({ date, status, seatsLeft });
      }
    }
    if (toCreate.length) {
      await db.reservationDay.createMany({ data: toCreate });
    }

    // Re-fetch and return sorted
    const all = await db.reservationDay.findMany({
      where: { date: { in: dates } },
      orderBy: { date: "asc" },
    });

    return NextResponse.json({ days: all });
  } catch (e) {
    return NextResponse.json(
      { error: (e as Error).message },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/availability?XTransformPort=3000
 * Body: { date, status, seatsLeft }
 * Admin action: upserts a ReservationDay row to override the seeder.
 */
export async function PATCH(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const date: string = (body?.date ?? "").trim();
    const status: string = (body?.status ?? "").trim();
    const seatsLeft = Number(body?.seatsLeft);

    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date))
      return NextResponse.json({ error: "Invalid date (yyyy-mm-dd)" }, { status: 400 });
    if (!["open", "limited", "full"].includes(status))
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    if (!Number.isFinite(seatsLeft) || seatsLeft < 0 || seatsLeft > 200)
      return NextResponse.json({ error: "Invalid seatsLeft" }, { status: 400 });

    const day = await db.reservationDay.upsert({
      where: { date },
      update: { status, seatsLeft },
      create: { date, status, seatsLeft },
    });
    return NextResponse.json({ ok: true, day });
  } catch (e) {
    return NextResponse.json(
      { error: (e as Error).message },
      { status: 500 }
    );
  }
}
