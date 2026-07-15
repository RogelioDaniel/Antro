import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * POST /api/newsletter?XTransformPort=3000
 * Body: { email: string, lang?: "es" | "en" }
 * Persists a subscriber to the Subscriber table. Idempotent on email
 * (unique constraint — duplicate emails return 200 with `existing: true`).
 */
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const email: string = (body?.email ?? "").trim().toLowerCase();
    const lang: string = body?.lang === "en" ? "en" : "es";

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email" },
        { status: 400 }
      );
    }

    // upsert so repeat subscriptions don't error
    const sub = await db.subscriber.upsert({
      where: { email },
      update: { lang },
      create: { email, lang },
    });

    return NextResponse.json({
      ok: true,
      id: sub.id,
      email: sub.email,
      existing: sub.createdAt.getTime() < Date.now() - 1000,
    });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: (e as Error).message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    service: "La Negra — Newsletter",
    usage: "POST { email: string, lang?: 'es'|'en' } to subscribe.",
  });
}
