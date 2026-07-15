import { MENU, SITE } from "@/lib/constants";

/**
 * Generates a minimal, valid single-page PDF of the La Negra carta.
 * Hand-built PDF (no external library) with correct xref offsets.
 * Cinematic dark background + gold/white text.
 */

function esc(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

interface Obj {
  num: number;
  body: string;
}

export function buildMenuPdf(): Uint8Array {
  // ---- content stream ----
  const lines: string[] = [];
  // dark background
  lines.push("0.039 0.039 0.039 rg");
  lines.push("0 0 595 842 re f");

  // gold accent line under title (drawn later with known y)
  const gold = "0.772 0.627 0.349 rg";
  const white = "0.961 0.961 0.961 rg";
  const grey = "0.655 0.655 0.655 rg";

  const text = (
    font: string,
    size: number,
    color: string,
    x: number,
    y: number,
    s: string
  ) => {
    lines.push(
      `BT /${font} ${size} Tf ${color} 1 0 0 1 ${x.toFixed(2)} ${y.toFixed(2)} Tm (${esc(
        s
      )}) Tj ET`
    );
  };

  // Title
  text("F2", 30, gold, 70, 780, "LA NEGRA");
  // gold line
  lines.push(`${gold} 70 766 160 1.5 re f`);
  text("F1", 9, grey, 70, 748, "CARTA  ·  ROMA-CONDESA, CDMX");
  text("F1", 9, grey, 525, 748, "JUE — SÁB · 20:00 — 03:00");
  // right align note: approx — keep simple

  let y = 710;
  for (const section of MENU) {
    text("F2", 16, gold, 70, y, section.label.toUpperCase());
    text("F1", 8, grey, 250, y, section.eyebrow);
    y -= 8;
    // divider
    lines.push(`0.2 0.16 0.08 rg 70 ${y.toFixed(2)} 455 0.5 re f`);
    y -= 22;
    for (const item of section.items) {
      text("F1", 12, white, 78, y, item.name);
      // price right-aligned-ish
      text("F2", 12, gold, 470, y, item.price);
      // description
      if (item.description) {
        // wrap simple: truncate to ~62 chars
        const d =
          item.description.length > 64
            ? item.description.slice(0, 62) + "…"
            : item.description;
        text("F1", 8.5, grey, 78, y - 13, d);
      }
      y -= 34;
    }
    y -= 14;
  }

  // footer
  lines.push(`${gold} 70 56 455 0.5 re f`);
  text("F1", 8, grey, 70, 42, "la-negra.mx");
  text("F1", 8, grey, 525, 42, SITE.phoneDisplay);
  text("F1", 7, grey, 70, 30, "Beber con moderacion · 18+");

  const content = lines.join("\n");

  // ---- build objects ----
  const objects: Obj[] = [];
  objects.push({ num: 1, body: "<< /Type /Catalog /Pages 2 0 R >>" });
  objects.push({ num: 2, body: "<< /Type /Pages /Kids [3 0 R] /Count 1 >>" });
  objects.push({
    num: 3,
    body: "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>",
  });
  objects.push({
    num: 4,
    body: "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
  });
  objects.push({
    num: 5,
    body: "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
  });
  objects.push({
    num: 6,
    body: `<< /Length ${content.length} >>\nstream\n${content}\nendstream`,
  });

  // ---- assemble with xref ----
  let pdf = "%PDF-1.4\n";
  const offsets: Record<number, number> = {};
  for (const obj of objects) {
    offsets[obj.num] = pdf.length;
    pdf += `${obj.num} 0 obj\n${obj.body}\nendobj\n`;
  }
  const xrefStart = pdf.length;
  const count = objects.length + 1;
  pdf += `xref\n0 ${count}\n`;
  pdf += "0000000000 65535 f \n";
  for (let n = 1; n < count; n++) {
    pdf += `${String(offsets[n]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${count} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

  return new TextEncoder().encode(pdf);
}

export async function GET() {
  const bytes = buildMenuPdf();
  return new Response(bytes, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="la-negra-carta.pdf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
