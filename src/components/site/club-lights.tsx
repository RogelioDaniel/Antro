"use client";

/**
 * ClubLights — the venue's lighting rig, as a decorative overlay.
 * Sweeping beams (warm gold spotlight + ultraviolet wash) over drifting
 * haze, blended with `screen` so they read as light, not paint.
 * Variants tune position/intensity per section. Purely decorative.
 */

type Variant = "hero" | "wow" | "cta";

const BEAMS: Record<
  Variant,
  {
    left: string;
    color: string;
    dur: number;
    from: number;
    to: number;
    op: number;
  }[]
> = {
  hero: [
    { left: "12%", color: "rgba(197,160,89,0.42)", dur: 10, from: -14, to: 20, op: 0.5 },
    { left: "62%", color: "rgba(139,92,246,0.34)", dur: 13, from: 16, to: -18, op: 0.42 },
    { left: "38%", color: "rgba(122,31,43,0.45)", dur: 17, from: -8, to: 10, op: 0.35 },
  ],
  wow: [
    { left: "6%", color: "rgba(139,92,246,0.32)", dur: 12, from: -20, to: 12, op: 0.45 },
    { left: "72%", color: "rgba(197,160,89,0.38)", dur: 15, from: 14, to: -16, op: 0.42 },
  ],
  cta: [
    { left: "30%", color: "rgba(197,160,89,0.35)", dur: 11, from: -12, to: 14, op: 0.4 },
    { left: "58%", color: "rgba(139,92,246,0.26)", dur: 14, from: 10, to: -12, op: 0.32 },
  ],
};

const HAZE: Record<
  Variant,
  { left: string; top: string; size: string; color: string; dur: number }[]
> = {
  hero: [
    { left: "-10%", top: "55%", size: "48vw", color: "rgba(122,31,43,0.35)", dur: 18 },
    { left: "60%", top: "62%", size: "42vw", color: "rgba(139,92,246,0.16)", dur: 23 },
  ],
  wow: [
    { left: "8%", top: "58%", size: "44vw", color: "rgba(139,92,246,0.14)", dur: 20 },
    { left: "55%", top: "48%", size: "40vw", color: "rgba(197,160,89,0.12)", dur: 26 },
  ],
  cta: [{ left: "22%", top: "45%", size: "50vw", color: "rgba(122,31,43,0.3)", dur: 21 }],
};

export function ClubLights({ variant = "hero" }: { variant?: Variant }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {HAZE[variant].map((h, i) => (
        <span
          key={`h-${i}`}
          className="haze"
          style={{
            left: h.left,
            top: h.top,
            width: h.size,
            height: h.size,
            background: `radial-gradient(circle, ${h.color} 0%, transparent 70%)`,
            ["--haze-dur" as string]: `${h.dur}s`,
          }}
        />
      ))}
      {BEAMS[variant].map((b, i) => (
        <span
          key={`b-${i}`}
          className="light-beam"
          style={{
            left: b.left,
            ["--beam-color" as string]: b.color,
            ["--beam-dur" as string]: `${b.dur}s`,
            ["--beam-from" as string]: `${b.from}deg`,
            ["--beam-to" as string]: `${b.to}deg`,
            ["--beam-op" as string]: `${b.op}`,
          }}
        />
      ))}
    </div>
  );
}
