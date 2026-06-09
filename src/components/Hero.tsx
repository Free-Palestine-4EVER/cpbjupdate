"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { brand, heroStats } from "@/lib/content";
import Magnetic from "./Magnetic";
import { useVisible } from "@/lib/useVisible";

const HeroPipe = dynamic(() => import("./HeroPipe"), { ssr: false });

const EASE = [0.16, 1, 0.3, 1] as const;
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.25 } },
};
const line = {
  hidden: { opacity: 0, y: 28, clipPath: "inset(0 0 100% 0)" },
  show: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 1, ease: EASE },
  },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

export default function Hero() {
  const [pipeRef, pipeVisible] = useVisible<HTMLDivElement>("100px");
  return (
    <section
      id="top"
      className="force-dark relative min-h-[100svh] w-full overflow-hidden bg-bg"
    >
      {/* ambient layers */}
      <div className="absolute inset-0 blueprint-grid opacity-[0.5]" />
      <div className="absolute inset-0 blueprint-grid-fine opacity-30 [mask-image:radial-gradient(60%_60%_at_70%_40%,black,transparent)]" />
      <div className="glow-ember pointer-events-none absolute right-[6%] top-[34%] h-[60vh] w-[60vh] opacity-70" />
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(120%_90%_at_50%_-10%,transparent,var(--scrim)_75%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />

      {/* 3D pipe */}
      <motion.div
        ref={pipeRef}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: EASE, delay: 0.2 }}
        className="pointer-events-none absolute right-[-14%] top-0 h-full w-[78%] opacity-90 sm:right-[-6%] sm:w-[58%] sm:opacity-100 md:right-[-2%] md:w-[52%]"
      >
        <HeroPipe active={pipeVisible} />
        {/* fade the canvas into the text on the left */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-bg via-transparent to-transparent" />
      </motion.div>

      {/* content */}
      <div className="shell relative z-10 flex min-h-[100svh] flex-col justify-center pb-28 pt-32">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item} className="mb-7">
            <span className="mono text-[0.7rem] uppercase tracking-[0.24em] text-mute">
              {brand.legal}
            </span>
            <span className="mono ml-3 text-[0.7rem] uppercase tracking-[0.24em] text-ember">
              Est. {brand.established}
            </span>
          </motion.div>

          <h1 className="display max-w-[18ch] text-[clamp(2.5rem,9.2vw,7.6rem)] text-fg">
            <span className="block overflow-hidden">
              <motion.span variants={line} className="block">
                The Foundation
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span variants={line} className="block">
                of Tomorrow<span className="text-ember">.</span>
              </motion.span>
            </span>
          </h1>

          <motion.div
            variants={item}
            className="mt-8 h-[3px] w-28 origin-left bg-ember"
          />

          <motion.p
            variants={item}
            className="mt-8 max-w-xl text-[1.08rem] font-light leading-relaxed text-fg-soft"
          >
            Riyadh-based precast concrete manufacturing for the region&apos;s most
            critical infrastructure. We don&apos;t just produce concrete —{" "}
            <span className="text-fg">we manufacture certainty.</span>
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a
                href="#contact"
                className="btn-ember inline-block rounded-full px-7 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.14em] mono"
              >
                Request a Quote
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#capabilities"
                className="btn-ghost inline-block rounded-full px-7 py-3.5 text-[0.78rem] uppercase tracking-[0.14em] text-fg mono"
              >
                Explore Capabilities
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>

        {/* trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 1.1 }}
          className="mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--line)] sm:grid-cols-4"
        >
          {heroStats.map((s) => (
            <div key={s.label} className="bg-surface px-5 py-5">
              <div className="flex items-baseline gap-1">
                <span className="display text-[1.6rem] font-extrabold text-fg">
                  {s.value}
                </span>
                <span className="mono text-[0.62rem] uppercase tracking-[0.12em] text-ember">
                  {s.unit}
                </span>
              </div>
              <div className="mono mt-1.5 text-[0.62rem] uppercase tracking-[0.14em] text-mute">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="mono text-[0.6rem] uppercase tracking-[0.3em] text-mute">
          Scroll
        </span>
        <span className="relative h-9 w-px overflow-hidden bg-[var(--hairline-fg)]">
          <motion.span
            className="absolute inset-x-0 top-0 h-3 bg-ember"
            animate={{ y: [-12, 36] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
