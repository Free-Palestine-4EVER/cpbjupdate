"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { partners } from "@/lib/content";
import { SectionHead } from "./ui";
import { Reveal } from "./Reveal";

/* one sliding row of giant names — direction alternates, position scrubbed by scroll */
function NameRow({
  names,
  startIdx,
  dir,
  progress,
}: {
  names: string[];
  startIdx: number;
  dir: 1 | -1;
  progress: MotionValue<number>;
}) {
  const x = useTransform(
    progress,
    [0, 1],
    dir === 1 ? ["-14%", "4%"] : ["4%", "-14%"]
  );
  return (
    <div className="overflow-hidden border-t border-[var(--line-paper)] py-5 md:py-7">
      <motion.div
        style={{ x }}
        className="flex w-max items-baseline gap-7 whitespace-nowrap will-change-transform md:gap-10"
      >
        {names.map((n, i) => (
          <span key={n} className="flex items-baseline gap-3 md:gap-4">
            <span className="mono text-[0.6rem] tracking-[0.16em] text-ember">
              {String(startIdx + i + 1).padStart(2, "0")}
            </span>
            <span
              className={`display cursor-default text-[clamp(1.9rem,4.6vw,4.2rem)] font-extrabold leading-none transition-colors duration-300 ${
                i % 2 === 0
                  ? "text-[#2a2722] hover:text-ember"
                  : "text-outline-paper"
              }`}
            >
              {n}
            </span>
            <span className="self-center text-[0.8rem] text-ember/60 md:text-[1rem]">
              ◆
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Partners() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rows: string[][] = [
    partners.names.slice(0, 5),
    partners.names.slice(5, 10),
    partners.names.slice(10),
  ];

  return (
    <section ref={ref} className="relative overflow-hidden bg-paper py-28 text-ink md:py-36">
      <div className="shell">
        <SectionHead
          index={partners.index}
          kicker={partners.kicker}
          title={
            <>
              Approved where{" "}
              <span className="text-mute-paper">it matters most.</span>
            </>
          }
          intro={partners.intro}
          tone="paper"
          max="max-w-3xl"
        />
      </div>

      {/* full-bleed kinetic name wall — rows slide against each other on scroll */}
      <div className="mt-14 border-b border-[var(--line-paper)]">
        {rows.map((row, r) => (
          <NameRow
            key={r}
            names={row}
            startIdx={r * 5}
            dir={r % 2 === 0 ? 1 : -1}
            progress={scrollYProgress}
          />
        ))}
      </div>

      <div className="shell">
        <Reveal>
          <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
            <span className="mono text-[0.62rem] uppercase tracking-[0.2em] text-mute-paper">
              {partners.names.length}&nbsp;&nbsp;active approvals &amp; partnerships
            </span>
            <span className="mono text-[0.62rem] uppercase tracking-[0.2em] text-ember">
              ◆ Vision 2030 supply chain
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
