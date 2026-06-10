"use client";

import { motion } from "framer-motion";
import { technology } from "@/lib/content";
import { SectionHead } from "./ui";
import { Reveal } from "./Reveal";

const EASE = [0.16, 1, 0.3, 1] as const;
const HAS_IO = typeof window === "undefined" || "IntersectionObserver" in window;

/* one-line verdict per metric — the takeaway a procurement engineer scans for */
const VERDICT = [
  "−40% water",
  "Rigid out of the mold",
  "Instant mold turnover",
  "Identical, every joint",
  "3,500 tons / day",
];

function Row({
  r,
  i,
}: {
  r: (typeof technology.rows)[number];
  i: number;
}) {
  return (
    <motion.div
      initial={HAS_IO ? { opacity: 0, y: 30 } : false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
      className="group relative grid items-center gap-4 py-7 transition-colors duration-300 hover:bg-[#efebe1] md:grid-cols-[1fr_0.9fr_1.1fr_auto] md:gap-8 md:py-8"
    >
      {/* gold rule draws across the full row when it enters */}
      <motion.span
        initial={HAS_IO ? { scaleX: 0 } : false}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.15 }}
        className="absolute left-0 top-0 h-[2px] w-full origin-left bg-gradient-to-r from-[var(--color-ember)] via-[var(--color-ember)]/45 to-transparent"
      />

      {/* metric */}
      <div>
        <div className="mono text-[0.58rem] uppercase tracking-[0.22em] text-[#a39d8e]">
          M-{String(i + 1).padStart(2, "0")}
        </div>
        <h3 className="display mt-1.5 text-[1.25rem] font-bold leading-tight text-ink md:text-[1.4rem]">
          {r.metric}
        </h3>
      </div>

      {/* traditional — always visible, deliberately quiet */}
      <div className="flex items-start gap-3">
        <svg viewBox="0 0 16 16" className="mt-1 h-3 w-3 shrink-0 text-[#b0aa9b]" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4l8 8M12 4l-8 8" />
        </svg>
        <div>
          <div className="mono text-[0.56rem] uppercase tracking-[0.2em] text-[#a39d8e]">
            Traditional wet mix
          </div>
          <div className="mt-1 text-[0.98rem] font-light leading-snug text-mute-paper">
            {r.traditional}
          </div>
        </div>
      </div>

      {/* JDCO — the loud one */}
      <div className="flex items-start gap-3 rounded-xl border-l-2 border-ember bg-gradient-to-r from-ember/[0.09] to-transparent py-3 pl-4 pr-2">
        <svg viewBox="0 0 16 16" className="mt-1 h-3.5 w-3.5 shrink-0 text-ember" fill="none" stroke="currentColor" strokeWidth="2.4">
          <motion.path
            d="M3 8.5l3.5 3.5L13 4"
            initial={HAS_IO ? { pathLength: 0 } : false}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.45 }}
          />
        </svg>
        <div>
          <div className="mono text-[0.56rem] uppercase tracking-[0.2em] text-[#8a7c45]">
            JDCO semi-dry
          </div>
          <div className="mt-1 text-[1.02rem] font-semibold leading-snug text-ink">
            {r.jdco}
          </div>
        </div>
      </div>

      {/* verdict chip */}
      <motion.div
        initial={HAS_IO ? { opacity: 0, x: 18 } : false}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.35 }}
        className="justify-self-start md:justify-self-end"
      >
        <span className="mono inline-block whitespace-nowrap rounded-full bg-[#131313] px-4 py-2 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-ember transition-transform duration-300 group-hover:-translate-y-0.5">
          ◆ {VERDICT[i]}
        </span>
      </motion.div>
    </motion.div>
  );
}

export default function Technology() {
  return (
    <section
      id="technology"
      className="relative scroll-mt-24 overflow-hidden bg-paper py-28 text-ink md:py-36"
    >
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--line-paper) 1px, transparent 1px), linear-gradient(to bottom, var(--line-paper) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(80% 60% at 50% 0%, black, transparent 80%)",
        }}
      />
      <div className="shell relative">
        <SectionHead
          index={technology.index}
          kicker={technology.kicker}
          title={
            <>
              Semi-dry technology vs.{" "}
              <span className="text-mute-paper">traditional wet mix.</span>
            </>
          }
          intro={technology.intro}
          tone="paper"
        />

        {/* datasheet header */}
        <Reveal delay={0.08}>
          <div className="mt-14 hidden items-center gap-8 border-b-2 border-ink/80 pb-3 md:grid md:grid-cols-[1fr_0.9fr_1.1fr_auto]">
            <span className="mono text-[0.6rem] uppercase tracking-[0.24em] text-[#8d8779]">
              Metric
            </span>
            <span className="mono text-[0.6rem] uppercase tracking-[0.24em] text-[#8d8779]">
              Legacy method
            </span>
            <span className="mono pl-4 text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-[#8a7c45]">
              ◆ The JDCO standard
            </span>
            <span className="mono text-[0.6rem] uppercase tracking-[0.24em] text-[#8d8779]">
              Verdict
            </span>
          </div>
        </Reveal>

        {/* rows */}
        <div className="border-b border-[var(--line-paper)]">
          {technology.rows.map((r, i) => (
            <Row key={r.metric} r={r} i={i} />
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
            <p className="mono max-w-2xl text-[0.74rem] leading-relaxed text-mute-paper">
              // Zero-slump, end-pressed units leave the mold structurally rigid
              — enabling immediate reuse and throughput that wet-cast lines
              cannot match.
            </p>
            <span className="mono text-[0.62rem] uppercase tracking-[0.2em] text-[#8a7c45]">
              5 / 5 metrics — semi-dry wins
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
