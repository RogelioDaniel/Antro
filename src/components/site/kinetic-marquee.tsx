"use client";

/**
 * Kinetic marquee divider — a full-bleed strip of giant type that scrolls
 * horizontally forever (campaign-style section divider). Words alternate
 * between solid gold and hollow outline; a diamond ornament separates them.
 * Purely decorative: hidden from assistive tech.
 */
export function KineticMarquee({
  phrase,
  reverse = false,
  className,
}: {
  phrase: string;
  reverse?: boolean;
  className?: string;
}) {
  // One half of the loop; the track duplicates it for a seamless -50% cycle.
  const Half = () => (
    <div className="flex shrink-0 items-center">
      {Array.from({ length: 4 }).map((_, i) => (
        <span key={i} className="flex items-center">
          <span
            className={`font-kinetic px-6 text-[clamp(2.6rem,7vw,6rem)] leading-none ${
              i % 2 === 0 ? "text-primary" : "text-hollow"
            }`}
          >
            {phrase}
          </span>
          <span className="relative mx-2 h-3 w-3 shrink-0 rotate-45 border border-primary/70">
            <span className="absolute inset-[3px] bg-primary/60" />
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`relative overflow-hidden border-y border-primary/15 bg-[#0d0b08] py-5 ${className ?? ""}`}
      aria-hidden="true"
    >
      <div className="marquee-track" data-reverse={reverse || undefined}>
        <Half />
        <Half />
      </div>
    </div>
  );
}
