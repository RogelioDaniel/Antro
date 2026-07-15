"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Download } from "lucide-react";
import { MENU } from "@/lib/constants";
import { useUIStore } from "@/lib/store";
import { fadeUp, staggerFast, viewportOnce, EASE_CINEMA } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function MenuSection() {
  const activeTab = useUIStore((s) => s.activeTab);
  const setActiveTab = useUIStore((s) => s.setActiveTab);
  const section = MENU.find((m) => m.category === activeTab)!;

  return (
    <section
      id="menu"
      className="relative border-y border-border/30 bg-[#0c0c0c] py-24 sm:py-32 lg:py-40"
      aria-labelledby="menu-heading"
    >
      {/* faint gold orb */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          className="flex flex-col items-center text-center"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerFast}
        >
          <motion.span variants={fadeUp} className="text-[11px] uppercase tracking-[0.45em] text-primary">
            La Carta
          </motion.span>
          <motion.h2
            id="menu-heading"
            variants={fadeUp}
            className="mt-5 font-serif-display text-[clamp(2rem,5.5vw,4rem)] font-medium leading-[1.05] text-foreground"
          >
            The Menu
          </motion.h2>
        </motion.div>

        {/* Tabs */}
        <motion.div
          className="mt-10 flex flex-wrap justify-center gap-1 rounded-none border border-border/40 bg-[#0a0a0a]/60 p-1.5 sm:inline-flex sm:gap-2"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6 }}
        >
          {MENU.map((m) => (
            <button
              key={m.category}
              onClick={() => setActiveTab(m.category)}
              className={cn(
                "relative min-h-[44px] px-5 py-2.5 text-[11px] uppercase tracking-[0.25em] transition-colors sm:px-8",
                activeTab === m.category
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-pressed={activeTab === m.category}
            >
              {activeTab === m.category && (
                <motion.span
                  layoutId="menu-tab-pill"
                  className="absolute inset-0 rounded-none bg-primary"
                  transition={{ duration: 0.4, ease: EASE_CINEMA }}
                />
              )}
              <span className="relative z-10">{m.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Active section content */}
        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Visual */}
          <motion.div
            className="relative order-1 overflow-hidden rounded-sm border border-border/30 lg:order-2"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.9, ease: EASE_CINEMA }}
          >
            <img
              src={section.image}
              alt={section.label}
              className="aspect-[4/5] w-full object-cover lg:aspect-[3/4]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <span className="text-[10px] uppercase tracking-[0.35em] text-primary">
                {section.eyebrow}
              </span>
              <p className="mt-1 font-serif-display text-2xl text-foreground">
                {section.label}
              </p>
            </div>
          </motion.div>

          {/* Items list */}
          <div className="order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.ul
                key={section.category}
                className="space-y-1"
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -10 }}
                variants={staggerFast}
                transition={{ staggerChildren: 0.06 }}
              >
                {section.items.map((item) => (
                  <motion.li
                    key={item.name}
                    variants={fadeUp}
                    className="group -mx-3 cursor-default rounded-sm px-3 py-4 transition-colors hover:bg-[#121212]"
                  >
                    <div className="flex items-baseline">
                      <h3 className="font-serif-display text-lg text-foreground transition-colors group-hover:text-primary sm:text-xl">
                        {item.name}
                      </h3>
                      {item.badge && (
                        <span className="ml-2 rounded-full border border-primary/40 px-2 py-0.5 text-[8px] uppercase tracking-[0.2em] text-primary">
                          {item.badge}
                        </span>
                      )}
                      <span className="menu-leader" aria-hidden="true" />
                      <span className="font-serif-display text-lg text-primary sm:text-xl">
                        {item.price}
                      </span>
                    </div>
                    <p className="mt-1.5 text-[13px] font-light leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </motion.li>
                ))}
              </motion.ul>
            </AnimatePresence>

            <motion.a
              href="/api/menu/pdf"
              download
              className="group mt-8 inline-flex items-center gap-2 border-b border-primary/40 pb-1 text-[11px] uppercase tracking-[0.25em] text-primary transition-all hover:border-primary hover:gap-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={viewportOnce}
              transition={{ delay: 0.3 }}
            >
              <Download className="size-3.5" />
              Download Full Menu (PDF)
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
