import { NextResponse } from "next/server";
import { generateWhatsAppLink } from "@/lib/whatsapp";

/**
 * Optional helper endpoint: builds a WhatsApp deep-link from a posted
 * message body and returns it as JSON. The client normally builds the
 * link directly, but this exists for server-side integrations.
 *
 * POST /api/whatsapp?XTransformPort=3000
 * { "message": "..." }
 * -> { "url": "https://wa.me/..." }
 */
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const message: string = body?.message ?? "";
    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Missing 'message' field" },
        { status: 400 }
      );
    }
    return NextResponse.json({ url: generateWhatsAppLink(message) });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({
    service: "La Negra — WhatsApp bridge",
    usage: "POST { message: string } to receive a wa.me deep link.",
  });
}
