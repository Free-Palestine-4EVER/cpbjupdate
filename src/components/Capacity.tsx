"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { capacity } from "@/lib/content";
import { Kicker } from "./ui";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { Counter } from "./Counter";

export default function Capacity() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // the monumental numeral swells slightly as it crosses the viewport
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.93, 1.04, 0.97]);
  const nx = useTransform(scrollYProgress, [0, 1], [-14, 14]);

  return (
    <section
      ref={ref}
      className="force-dark relative overflow-hidden border-y border-[var(--line)] bg-bg py-28 md:py-36"
    >
      <div className="absolute inset-0 blueprint-grid opacity-40" />
      <div className="glow-ember pointer-events-none absolute left-1/2 top-1/3 h-[55vh] w-[80vw] -translate-x-1/2 opacity-50 [animation:pulse-soft_6s_ease-in-out_infinite]" />

      <div className="shell relative">
        <Reveal>
          <Kicker index={capacity.index}>{capacity.kicker}</Kicker>
        </Reveal>

        <div className="mt-8 flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal variant="wipe">
            <motion.div
              style={{ scale, x: nx }}
              className="flex origin-left items-end gap-4 will-change-transform"
            >
              <span className="numeral text-[clamp(3.6rem,17vw,12.5rem)] text-fg">
                <Counter to={3500} duration={2.2} />
              </span>
              <span className="mono mb-4 text-[0.9rem] uppercase tracking-[0.14em] text-ember md:mb-6">
                {capacity.headlineUnit}
              </span>
            </motion.div>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="max-w-md text-[1.02rem] font-light leading-relaxed text-mute">
              {capacity.sub}
            </p>
          </Reveal>
        </div>

        <RevealGroup className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] lg:grid-cols-4">
          {capacity.specs.map((s) => (
            <RevealItem
              key={s.label}
              className="group bg-surface p-7 transition-all duration-500 hover:-translate-y-1 hover:bg-surface-2 md:p-8"
            >
              <div className="display flex items-baseline text-[3rem] font-extrabold text-fg">
                <Counter to={s.value} duration={1.6} separator={false} />
                <span className="text-ember">{s.suffix}</span>
              </div>
              <div className="mono mt-3 text-[0.7rem] uppercase leading-relaxed tracking-[0.12em] text-mute">
                {s.label}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
