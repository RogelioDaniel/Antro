"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import { SITE } from "@/lib/constants";

const DEFAULT_MSG =
  "Hola La Negra, me gustaría información sobre reservaciones y la lista VIP.";

export function FloatingWhatsApp() {
  const [show, setShow] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 2800);
    const t2 = setTimeout(() => setTooltipOpen(true), 5200);
    const t3 = setTimeout(() => setTooltipOpen(false), 11000);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed bottom-5 right-5 z-[90] flex items-end gap-3 sm:bottom-7 sm:right-7"
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.8 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Tooltip bubble */}
          <AnimatePresence>
            {tooltipOpen && (
              <motion.div
                className="relative mb-1 hidden max-w-[200px] rounded-lg border border-border/50 bg-[#121212] px-4 py-3 shadow-xl sm:block"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  onClick={() => setTooltipOpen(false)}
                  className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border border-border/50 bg-[#0a0a0a] text-muted-foreground hover:text-foreground"
                  aria-label="Cerrar"
                >
                  <X className="size-3" />
                </button>
                <p className="text-[12px] leading-snug text-foreground">
                  ¿Reservaciones o lista VIP?
                </p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  Escríbenos, respondemos rápido.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* WhatsApp button */}
          <a
            href={generateWhatsAppLink(DEFAULT_MSG)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contactar por WhatsApp"
            className="whatsapp-pulse group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform hover:scale-105"
          >
            <MessageCircle className="size-7 text-white" fill="currentColor" />
            {/* online dot */}
            <span className="absolute right-0 top-0 flex h-3.5 w-3.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-[#25D366] bg-primary" />
            </span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
