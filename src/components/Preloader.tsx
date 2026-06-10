"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, animate } from "framer-motion";
import { LogoMark } from "./Logo";

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    // sessionStorage can THROW in private mode / in-app browsers (WhatsApp,
    // Instagram). An uncaught throw here tears down the React tree and leaves
    // the scroll lock on — visitor stuck on one screen. Never trust it.
    let preloaded = false;
    try {
      preloaded = !!sessionStorage.getItem("jdco-preloaded");
    } catch {}
    if (preloaded) {
      setDone(true);
      return;
    }
    document.documentElement.style.overflow = "hidden";
    // hard failsafe: whatever happens, the curtain lifts
    const failsafe = setTimeout(() => setDone(true), 4500);
    const controls = animate(0, 100, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => {
        try {
          sessionStorage.setItem("jdco-preloaded", "1");
        } catch {}
        setTimeout(() => setDone(true), 380);
      },
    });
    return () => {
      controls.stop();
      clearTimeout(failsafe);
      document.documentElement.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (done) document.documentElement.style.overflow = "";
  }, [done]);

  if (!hydrated) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="force-dark fixed inset-0 z-[100] flex flex-col justify-between bg-bg px-[var(--gut)] py-10"
          initial={{ clipPath: "inset(0 0 0 0)" }}
          exit={{
            clipPath: "inset(0 0 100% 0)",
            transition: { duration: 0.95, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          <div className="absolute inset-0 blueprint-grid opacity-30" />
          <div className="glow-ember pointer-events-none absolute left-1/2 top-1/2 h-[50vh] w-[50vh] -translate-x-1/2 -translate-y-1/2 opacity-50" />

          {/* top row */}
          <div className="relative flex items-center justify-between">
            <span className="mono text-[0.62rem] uppercase tracking-[0.24em] text-mute">
              Al-Jazirah Development Factory
            </span>
            <span className="mono text-[0.62rem] uppercase tracking-[0.24em] text-ember">
              Riyadh · KSA
            </span>
          </div>

          {/* center mark */}
          <div className="relative flex flex-col items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <LogoMark className="h-16 w-16 text-fg" />
            </motion.div>
            <div className="display mt-6 text-[2.4rem] font-extrabold tracking-[-0.02em] text-fg">
              JDCO
            </div>
            <div className="mono mt-2 text-[0.6rem] uppercase tracking-[0.34em] text-mute">
              The Foundation of Tomorrow
            </div>
          </div>

          {/* bottom: counter + progress */}
          <div className="relative">
            <div className="flex items-end justify-between">
              <span className="mono text-[0.62rem] uppercase tracking-[0.2em] text-steel">
                Loading capability profile
              </span>
              <span className="numeral text-[clamp(2.5rem,8vw,5rem)] text-fg tnum">
                {String(count).padStart(3, "0")}
              </span>
            </div>
            <div className="mt-4 h-px w-full bg-[var(--line)]">
              <div
                className="h-full bg-ember transition-[width] duration-100 ease-linear"
                style={{ width: `${count}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
