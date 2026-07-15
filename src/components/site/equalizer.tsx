"use client";

/**
 * Equalizer — a strip of dancing gold bars, the house's pulse.
 * Deterministic durations/delays so SSR and client agree. Decorative.
 */

const BARS = [
  { dur: 0.9, delay: 0.0 },
  { dur: 1.3, delay: 0.15 },
  { dur: 0.8, delay: 0.3 },
  { dur: 1.15, delay: 0.05 },
  { dur: 0.95, delay: 0.4 },
  { dur: 1.25, delay: 0.2 },
  { dur: 0.85, delay: 0.5 },
  { dur: 1.05, delay: 0.1 },
  { dur: 1.2, delay: 0.35 },
];

export function Equalizer({ className }: { className?: string }) {
  return (
    <div
      className={`flex items-end gap-[3px] ${className ?? ""}`}
      aria-hidden="true"
    >
      {BARS.map((b, i) => (
        <span
          key={i}
          className="eq-bar w-[3px] rounded-t-sm bg-primary/80"
          style={{
            height: 22,
            ["--eq-dur" as string]: `${b.dur}s`,
            ["--eq-delay" as string]: `${b.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
