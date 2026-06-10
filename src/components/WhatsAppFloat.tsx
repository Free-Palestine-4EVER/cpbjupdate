"use client";

import { motion } from "framer-motion";
import { brand } from "@/lib/content";

export default function WhatsAppFloat() {
  return (
    <motion.a
      href={brand.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with JDCO on WhatsApp"
      initial={{ opacity: 0, scale: 0.6, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 2 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="group fixed bottom-5 right-5 z-[75] flex items-center gap-0 rounded-full bg-[#25D366] p-3.5 shadow-[0_10px_34px_-8px_rgba(37,211,102,0.65)] sm:bottom-7 sm:right-7"
    >
      {/* pulse ring */}
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-25 [animation-duration:2.6s]" />
      <svg viewBox="0 0 32 32" className="h-6 w-6 fill-white sm:h-7 sm:w-7" aria-hidden>
        <path d="M16 .8C7.7.8.9 7.5.9 15.8c0 2.6.7 5.2 2 7.5L.8 31.2l8.1-2.1c2.2 1.2 4.6 1.8 7.1 1.8 8.3 0 15.1-6.7 15.1-15S24.3.8 16 .8zm0 27.6c-2.2 0-4.4-.6-6.3-1.7l-.5-.3-4.8 1.2 1.3-4.6-.3-.5c-1.2-2-1.9-4.3-1.9-6.7C3.5 8.9 9.1 3.3 16 3.3s12.5 5.6 12.5 12.5S22.9 28.4 16 28.4zm6.9-9.4c-.4-.2-2.2-1.1-2.6-1.2-.3-.1-.6-.2-.8.2-.2.4-1 1.2-1.2 1.5-.2.2-.4.3-.8.1-.4-.2-1.6-.6-3-1.9-1.1-1-1.9-2.2-2.1-2.6-.2-.4 0-.6.2-.8l.6-.7c.2-.2.2-.4.4-.6.1-.2.1-.5 0-.7-.1-.2-.8-2.1-1.2-2.8-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.7.1-1 .5-.3.4-1.3 1.3-1.3 3.1s1.3 3.6 1.5 3.9c.2.2 2.6 4 6.3 5.6.9.4 1.6.6 2.1.8.9.3 1.7.2 2.3.1.7-.1 2.2-.9 2.5-1.8.3-.9.3-1.6.2-1.8-.1-.1-.3-.2-.7-.4z" />
      </svg>
      <span className="mono max-w-0 overflow-hidden whitespace-nowrap text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white transition-all duration-500 group-hover:ml-2.5 group-hover:max-w-[140px]">
        WhatsApp us
      </span>
    </motion.a>
  );
}
