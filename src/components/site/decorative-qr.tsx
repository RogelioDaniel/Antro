"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";

/**
 * Decorative QR-style pass. Renders a deterministic grid that visually
 * resembles a QR code (with the three corner finder patterns). Used to
 * simulate the VIP entry pass — not a scannable code by design.
 */
export function DecorativeQR({
  seed,
  className,
}: {
  seed: string;
  className?: string;
}) {
  const size = 21; // modules per side
  const cells = useMemo(() => {
    // simple hash -> pseudo-random but deterministic
    const state = { v: 2166136261 >>> 0 };
    for (let i = 0; i < seed.length; i++) {
      state.v ^= seed.charCodeAt(i);
      state.v = Math.imul(state.v, 16777619) >>> 0;
    }
    const rng = () => {
      state.v ^= state.v << 13;
      state.v ^= state.v >>> 17;
      state.v ^= state.v << 5;
      return ((state.v >>> 0) % 1000) / 1000;
    };

    const grid: boolean[][] = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => rng() > 0.55)
    );

    // Finder patterns at three corners (7x7 with inner 3x3)
    const placeFinder = (r: number, c: number) => {
      for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
          const onBorder = i === 0 || i === 6 || j === 0 || j === 6;
          const onInner = i >= 2 && i <= 4 && j >= 2 && j <= 4;
          grid[r + i][c + j] = onBorder || onInner;
        }
      }
      // clear separator ring
      for (let i = -1; i <= 7; i++) {
        for (let j = -1; j <= 7; j++) {
          if (i === -1 || i === 7 || j === -1 || j === 7) {
            const rr = r + i;
            const cc = c + j;
            if (rr >= 0 && rr < size && cc >= 0 && cc < size) grid[rr][cc] = false;
          }
        }
      }
      // re-place finder (separator cleared inner border)
      for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
          const onBorder = i === 0 || i === 6 || j === 0 || j === 6;
          const onInner = i >= 2 && i <= 4 && j >= 2 && j <= 4;
          grid[r + i][c + j] = onBorder || onInner;
        }
      }
    };
    placeFinder(0, 0);
    placeFinder(0, size - 7);
    placeFinder(size - 7, 0);

    // timing patterns
    for (let i = 8; i < size - 8; i++) {
      grid[6][i] = i % 2 === 0;
      grid[i][6] = i % 2 === 0;
    }

    return grid;
  }, [seed]);

  return (
    <div
      className={cn(
        "relative aspect-square w-full rounded-lg border border-primary/30 bg-[#0a0a0a] p-3",
        className
      )}
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="h-full w-full"
        shapeRendering="crispEdges"
        aria-hidden="true"
      >
        <rect width={size} height={size} fill="#0a0a0a" />
        {cells.map((row, r) =>
          row.map((on, c) =>
            on ? (
              <rect
                key={`${r}-${c}`}
                x={c}
                y={r}
                width={1}
                height={1}
                fill={c < 7 && r < 7 ? "#c5a059" : "#f5f5f5"}
              />
            ) : null
          )
        )}
      </svg>
      {/* center logo dot */}
      <div className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/60 bg-[#0a0a0a]">
        <span className="font-serif-display text-[10px] tracking-widest text-primary">LN</span>
      </div>
    </div>
  );
}
