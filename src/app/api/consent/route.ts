import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * POST /api/consent?XTransformPort=3000
 * Body: { action: "accept_all" | "essential_only" | "save_prefs", analytics: boolean, marketing: boolean }
 * Logs a cookie-consent decision server-side for LFPDPPP / GDPR audit trail.
 * Records IP + user-agent for compliance evidence.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const action: string = (body?.action ?? "").trim();
    const analytics: boolean = !!body?.analytics;
    const marketing: boolean = !!body?.marketing;

    if (!["accept_all", "essential_only", "save_prefs"].includes(action)) {
      return NextResponse.json(
        { ok: false, error: "Invalid action" },
        { status: 400 }
      );
    }

    // extract IP (respecting x-forwarded-for) + user-agent
    const fwd = req.headers.get("x-forwarded-for");
    const ip = fwd ? fwd.split(",")[0].trim() : (req.headers.get("x-real-ip") ?? null);
    const userAgent = req.headers.get("user-agent") ?? null;

    const log = await db.consentLog.create({
      data: { ip, userAgent, action, analytics, marketing },
    });

    return NextResponse.json({ ok: true, id: log.id, createdAt: log.createdAt });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: (e as Error).message },
      { status: 500 }
    );
  }
}

/**
 * GET /api/consent?XTransformPort=3000
 * Returns recent consent log entries (admin/audit use).
 */
export async function GET() {
  try {
    const logs = await db.consentLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    return NextResponse.json({ ok: true, logs });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: (e as Error).message },
      { status: 500 }
    );
  }
}
