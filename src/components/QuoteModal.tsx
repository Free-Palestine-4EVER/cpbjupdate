"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { brand, products } from "@/lib/content";

/* Opened from any "Request a Quote" button via:
   window.dispatchEvent(new CustomEvent("open-quote"))
   No backend — the composed request is delivered through WhatsApp
   (JDCO's primary channel) with a prefilled-email fallback. */

const EASE = [0.16, 1, 0.3, 1] as const;

const PRODUCT_OPTIONS = [
  ...products.items.map((p) => p.name),
  "Jacking Pipes",
  "Other / Custom",
];

export default function QuoteModal() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [picked, setPicked] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const firstField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onOpen = () => {
      setOpen(true);
      setSent(false);
      setError("");
    };
    window.addEventListener("open-quote", onOpen);
    return () => window.removeEventListener("open-quote", onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    const t = setTimeout(() => firstField.current?.focus(), 350);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      clearTimeout(t);
    };
  }, [open]);

  const compose = () =>
    [
      "New quote request — jdco concept site",
      `Name: ${name}`,
      company && `Company: ${company}`,
      phone && `Phone: ${phone}`,
      email && `Email: ${email}`,
      picked.length && `Products: ${picked.join(", ")}`,
      message && `Details: ${message}`,
    ]
      .filter(Boolean)
      .join("\n");

  const validate = () => {
    if (!name.trim()) return "Please enter your name.";
    if (!phone.trim() && !email.trim())
      return "Please enter a phone number or an email.";
    return "";
  };

  const sendWhatsApp = () => {
    const err = validate();
    if (err) return setError(err);
    window.open(
      `https://wa.me/966596048049?text=${encodeURIComponent(compose())}`,
      "_blank",
      "noopener,noreferrer"
    );
    setSent(true);
  };

  const sendEmail = () => {
    const err = validate();
    if (err) return setError(err);
    window.location.href = `mailto:${brand.email}?subject=${encodeURIComponent(
      "Quote request — " + (company || name)
    )}&body=${encodeURIComponent(compose())}`;
    setSent(true);
  };

  const toggle = (p: string) =>
    setPicked((cur) =>
      cur.includes(p) ? cur.filter((x) => x !== p) : [...cur, p]
    );

  const field =
    "w-full rounded-xl border border-[var(--line-strong)] bg-surface-2 px-4 py-3 text-[0.95rem] text-fg placeholder:text-steel outline-none transition-colors focus:border-[var(--color-ember)]";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="force-dark fixed inset-0 z-[90] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <motion.div
            initial={{ y: 60, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="relative max-h-[92svh] w-full max-w-xl overflow-y-auto rounded-t-3xl border border-[var(--line-strong)] bg-bg p-6 shadow-[0_-20px_80px_rgba(0,0,0,0.6)] sm:rounded-3xl sm:p-9"
            role="dialog"
            aria-modal="true"
            aria-label="Request a quote"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-[var(--color-ember)] to-transparent" />

            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] text-mute transition-colors hover:border-[var(--color-ember)] hover:text-fg"
            >
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4l8 8M12 4l-8 8" />
              </svg>
            </button>

            {sent ? (
              <div className="py-10 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-ember bg-ember/10">
                  <svg viewBox="0 0 24 24" className="h-7 w-7 text-ember" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <motion.path
                      d="M4 12.5l5.5 5.5L20 6.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                    />
                  </svg>
                </div>
                <h3 className="display mt-6 text-[1.7rem] font-bold text-fg">
                  Request on its way.
                </h3>
                <p className="mt-3 text-[0.95rem] font-light text-mute">
                  Finish sending it in the window that just opened — the JDCO
                  team typically replies within one business day.
                </p>
                <button
                  onClick={() => setOpen(false)}
                  className="btn-ghost mono mt-8 rounded-full px-7 py-3 text-[0.74rem] uppercase tracking-[0.14em] text-fg"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <div className="eyebrow text-ember">Request a Quote</div>
                <h3 className="display mt-3 text-[1.8rem] font-bold leading-tight text-fg sm:text-[2.1rem]">
                  Tell us about your project.
                </h3>

                <div className="mt-7 grid gap-3.5 sm:grid-cols-2">
                  <input ref={firstField} className={field} placeholder="Your name *" value={name} onChange={(e) => setName(e.target.value)} />
                  <input className={field} placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} />
                  <input className={field} type="tel" placeholder="Phone / WhatsApp *" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  <input className={field} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="mono mt-6 text-[0.6rem] uppercase tracking-[0.2em] text-steel">
                  Products of interest
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {PRODUCT_OPTIONS.map((p) => {
                    const on = picked.includes(p);
                    return (
                      <button
                        key={p}
                        onClick={() => toggle(p)}
                        className={`mono rounded-full border px-3.5 py-1.5 text-[0.62rem] uppercase tracking-[0.1em] transition-all duration-300 ${
                          on
                            ? "border-ember bg-ember/15 text-ember"
                            : "border-[var(--line)] text-mute hover:border-[var(--line-strong)] hover:text-fg"
                        }`}
                      >
                        {on ? "◆ " : ""}
                        {p}
                      </button>
                    );
                  })}
                </div>

                <textarea
                  className={`${field} mt-5 min-h-[96px] resize-y`}
                  placeholder="Quantities, diameters, project location, timeline…"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />

                {error && (
                  <p className="mono mt-4 text-[0.72rem] uppercase tracking-[0.1em] text-ember">
                    ▲ {error}
                  </p>
                )}

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={sendWhatsApp}
                    className="btn-ember mono flex-1 rounded-full px-7 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.14em]"
                  >
                    Send via WhatsApp
                  </button>
                  <button
                    onClick={sendEmail}
                    className="btn-ghost mono flex-1 rounded-full px-7 py-4 text-[0.78rem] uppercase tracking-[0.14em] text-fg"
                  >
                    Send via Email
                  </button>
                </div>
                <p className="mono mt-4 text-center text-[0.6rem] uppercase tracking-[0.16em] text-steel">
                  Direct line — {brand.phone}
                </p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
