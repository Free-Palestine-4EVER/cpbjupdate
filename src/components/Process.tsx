"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useInView } from "framer-motion";
import { process } from "@/lib/content";
import { Kicker } from "./ui";
import { Reveal } from "./Reveal";

const HAS_IO = typeof window === "undefined" || "IntersectionObserver" in window;

function Step({ s, i }: { s: (typeof process.steps)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  // re-evaluates on every scroll (once:false) — the step "ignites" while it
  // sits in the middle band of the viewport and dims again when it leaves
  const active = useInView(ref, { margin: "-42% 0px -42% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={HAS_IO ? { opacity: 0, x: 36 } : false}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.04 }}
      className="relative flex gap-6 pb-9 last:pb-0 md:gap-8"
    >
      <div
        className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border transition-all duration-500 md:h-16 md:w-16 ${
          active
            ? "scale-105 border-ember bg-ember/10 shadow-[0_0_34px_-8px_rgba(251,204,14,0.55)]"
            : "border-[var(--line)] bg-surface"
        }`}
      >
        <span
          className={`mono text-[0.92rem] font-semibold transition-colors duration-500 ${
            active ? "text-ember" : "text-steel"
          }`}
        >
          {s.n}
        </span>
      </div>
      <div className="pt-2.5">
        <h3
          className={`display text-[1.22rem] font-bold transition-colors duration-500 ${
            active ? "text-fg" : "text-fg-soft"
          }`}
        >
          {s.title}
        </h3>
        <p
          className={`mt-2 max-w-md text-[0.96rem] font-light leading-relaxed text-mute transition-opacity duration-500 ${
            active ? "opacity-100" : "opacity-55"
          }`}
        >
          {s.body}
        </p>
      </div>
    </motion.div>
  );
}

export default function Process() {
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.75", "end 0.45"],
  });
  const draw = useSpring(scrollYProgress, { stiffness: 90, damping: 26 });

  return (
    <section className="relative bg-bg py-28 md:py-36">
      <div className="shell grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        {/* sticky head */}
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <Reveal>
            <Kicker index={process.index}>{process.kicker}</Kicker>
          </Reveal>
          <Reveal delay={0.06} variant="wipe">
            <h2 className="display mt-6 max-w-[12ch] text-[clamp(2rem,4.5vw,3.4rem)] text-fg">
              {process.title}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mono mt-7 max-w-sm text-[0.8rem] leading-relaxed text-steel">
              // From aggregate to dispatch, every JDCO unit passes through six
              automated, monitored stages — engineered for repeatable precision
              at volume.
            </p>
          </Reveal>
        </div>

        {/* steps — the gold spine draws itself as you scroll */}
        <div ref={listRef} className="relative">
          <div className="absolute bottom-2 left-[27px] top-2 w-px bg-[var(--line)] md:left-[31px]" />
          <motion.div
            style={{ scaleY: draw }}
            className="absolute bottom-2 left-[27px] top-2 w-px origin-top bg-ember shadow-[0_0_14px_rgba(251,204,14,0.55)] md:left-[31px]"
          />
          {process.steps.map((s, i) => (
            <Step key={s.n} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
