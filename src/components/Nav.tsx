"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { nav } from "@/lib/content";
import { Wordmark } from "./Logo";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // take over from the pre-hydration inline menu handler: adopt its state
  // (user may have opened the menu before React arrived), then clear the class
  useEffect(() => {
    const h = document.documentElement;
    if (h.classList.contains("menu-open")) setOpen(true);
    h.classList.remove("menu-open");
  }, []);

  return (
    <>
      {/* top scroll progress */}
      <motion.div
        className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-ember"
        style={{ scaleX: progress }}
      />

      <header className="fixed inset-x-0 top-0 z-[65] flex justify-center px-4 pt-4">
        <motion.nav
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className={`flex w-full max-w-[1180px] items-center justify-between gap-2 rounded-full border px-2.5 py-2 transition-colors duration-500 sm:gap-4 sm:px-3 sm:py-2.5 ${
            scrolled
              ? "border-[var(--line-strong)] bg-bg/80 backdrop-blur-xl"
              : "border-[var(--line)] bg-bg/45 backdrop-blur-md"
          }`}
        >
          <a href="#top" className="pl-2 text-fg" aria-label="JDCO home">
            <Wordmark />
          </a>

          {/* center links */}
          <div className="hidden items-center gap-7 lg:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="mono link-sweep text-[0.72rem] uppercase tracking-[0.16em] text-mute transition-colors hover:text-fg"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href="#contact"
              className="btn-ghost hidden rounded-full px-4 py-2 text-[0.72rem] uppercase tracking-[0.14em] text-fg sm:inline-block mono"
            >
              Profile
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent("open-quote"));
              }}
              className="btn-ember whitespace-nowrap rounded-full px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.12em] mono sm:px-4 sm:text-[0.72rem] sm:tracking-[0.14em]"
            >
              <span className="sm:hidden">Quote</span>
              <span className="hidden sm:inline">Request a Quote</span>
            </a>
            {/* mobile toggle — data-menu-btn lets the inline pre-hydration
                script work this button before React loads */}
            <button
              data-menu-btn
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
              className="ml-1 flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] text-fg lg:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 top-0 h-px w-full bg-current transition-transform ${
                    open ? "translate-y-1.5 rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 h-px w-full bg-current transition-opacity ${
                    open ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-3 h-px w-full bg-current transition-transform ${
                    open ? "-translate-y-1.5 -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </motion.nav>
      </header>

      {/* mobile panel — ALWAYS in the DOM (the SSR HTML must contain it so
          the pre-hydration handler can show it via html.menu-open). Plain
          CSS transitions, no framer initial styles, so the no-JS failsafe
          can't accidentally force it visible. */}
      <div
        data-mobile-panel
        className={`fixed inset-x-4 top-[84px] z-[64] rounded-2xl border border-[var(--line-strong)] bg-bg/95 p-3 backdrop-blur-xl transition-all duration-300 ease-out lg:hidden ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        {nav.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className="mono block rounded-xl px-4 py-3 text-[0.8rem] uppercase tracking-[0.14em] text-mute hover:bg-white/5 hover:text-fg"
          >
            {item.label}
          </a>
        ))}
      </div>
    </>
  );
}
