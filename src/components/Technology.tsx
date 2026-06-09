"use client";

import { technology } from "@/lib/content";
import { SectionHead } from "./ui";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

export default function Technology() {
  return (
    <section
      id="technology"
      className="relative scroll-mt-24 bg-paper py-28 text-ink md:py-36"
    >
      {/* faint blueprint on paper */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--line-paper) 1px, transparent 1px), linear-gradient(to bottom, var(--line-paper) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(80% 60% at 50% 0%, black, transparent 80%)",
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

        <Reveal delay={0.1}>
          <div className="mt-14 overflow-hidden rounded-2xl border border-[var(--line-paper)] bg-[#f4f2eb]">
            <RevealGroup stagger={0.06}>
              {/* header */}
              <div className="grid grid-cols-[1.2fr_1fr_1.1fr] border-b border-[var(--line-paper)] bg-[#eae7df]">
                <div className="px-3 py-4 mono text-[0.62rem] uppercase tracking-[0.16em] text-mute-paper md:px-7">
                  Metric
                </div>
                <div className="px-3 py-4 mono text-[0.62rem] uppercase tracking-[0.16em] text-mute-paper md:px-7">
                  Traditional Wet Mix
                </div>
                <div className="flex items-center gap-2 border-l-2 border-ember bg-ember/[0.07] px-3 py-4 md:px-7">
                  <span className="h-1.5 w-1.5 rounded-full bg-ember" />
                  <span className="mono text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-ink">
                    JDCO Semi-Dry
                  </span>
                </div>
              </div>

              {/* rows */}
              {technology.rows.map((r) => (
                <RevealItem
                  key={r.metric}
                  className="grid grid-cols-[1.2fr_1fr_1.1fr] border-b border-[var(--line-paper)] last:border-0"
                >
                  <div className="px-3 py-5 text-[0.95rem] font-semibold text-ink md:px-7">
                    {r.metric}
                  </div>
                  <div className="px-3 py-5 text-[0.92rem] font-light text-mute-paper md:px-7">
                    {r.traditional}
                  </div>
                  <div className="flex items-center gap-2.5 border-l-2 border-ember bg-ember/[0.05] px-3 py-5 md:px-7">
                    <svg
                      viewBox="0 0 16 16"
                      className="h-3.5 w-3.5 shrink-0 text-ember"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M3 8.5l3.5 3.5L13 4" />
                    </svg>
                    <span className="text-[0.92rem] font-medium text-ink">
                      {r.jdco}
                    </span>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mono mt-6 text-[0.74rem] leading-relaxed text-mute-paper">
            // Zero-slump, end-pressed units leave the mold structurally rigid —
            enabling immediate reuse and the throughput that traditional wet-cast
            lines cannot match.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
