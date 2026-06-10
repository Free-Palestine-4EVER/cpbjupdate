"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  animate,
} from "framer-motion";
import { technology } from "@/lib/content";
import { SectionHead } from "./ui";
import { Reveal } from "./Reveal";

/* ============================================================
   The Wipe — drag the gold blade to sweep between the two
   manufacturing worlds. Identical metric rows sit in both layers,
   so values literally swap under the blade as it crosses them.
   ============================================================ */

function MetricRows({ side }: { side: "wet" | "dry" }) {
  const dry = side === "dry";
  return (
    <div className="mt-8 w-full md:mt-10">
      {technology.rows.map((r, i) => (
        <div
          key={r.metric}
          className={`grid grid-cols-[1fr_auto] items-baseline gap-4 border-t py-4 md:py-5 ${
            dry ? "border-[#3a3414]" : "border-[var(--line-paper)]"
          }`}
        >
          <div>
            <div
              className={`mono text-[0.56rem] uppercase tracking-[0.2em] ${
                dry ? "text-[#b89a3e]" : "text-[#a39d8e]"
              }`}
            >
              M-{String(i + 1).padStart(2, "0")} · {r.metric}
            </div>
            <div
              className={`mt-1.5 text-[0.98rem] md:text-[1.05rem] ${
                dry ? "font-semibold text-[#f4f4f1]" : "font-light text-mute-paper"
              }`}
            >
              {dry ? r.jdco : r.traditional}
            </div>
          </div>
          {dry ? (
            <svg viewBox="0 0 16 16" className="h-4 w-4 text-ember" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M3 8.5l3.5 3.5L13 4" />
            </svg>
          ) : (
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-[#a39d8e]" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4l8 8M12 4l-8 8" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}

function PanelContent({ side }: { side: "wet" | "dry" }) {
  const dry = side === "dry";
  return (
    <div className="flex h-full flex-col px-6 py-8 sm:px-10 md:px-14 md:py-12">
      <div className="flex items-center gap-3">
        <span className={`h-px w-7 ${dry ? "bg-ember" : "bg-[#a39d8e]"}`} />
        <span
          className={`mono text-[0.6rem] uppercase tracking-[0.24em] ${
            dry ? "text-ember" : "text-[#8d8779]"
          }`}
        >
          {dry ? "The JDCO Standard — Semi-Dry" : "Legacy Method — Wet Cast"}
        </span>
      </div>
      <div
        className={`display mt-4 text-[clamp(3rem,9vw,7rem)] leading-none ${
          dry ? "text-[#f4f4f1]" : "text-[#7b766a]"
        }`}
      >
        {dry ? (
          <>
            DRY<span className="text-ember">.</span>
          </>
        ) : (
          "WET."
        )}
      </div>
      <MetricRows side={side} />
    </div>
  );
}

function Wipe() {
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const inView = useInView(ref, { margin: "-25% 0px -25% 0px", once: true });

  const frac = useMotionValue(0.78); // start mostly-wet so the reveal sweeps gold IN
  const sx = useSpring(frac, { stiffness: 160, damping: 26, mass: 0.4 });
  const clip = useTransform(sx, (v) => `inset(0 ${100 - v * 100}% 0 0)`);
  const left = useTransform(sx, (v) => `${v * 100}%`);

  // entrance choreography: the blade sweeps to reveal the JDCO side
  useEffect(() => {
    if (inView) {
      const a = animate(frac, 0.42, { duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 });
      return () => a.stop();
    }
  }, [inView, frac]);

  const setFromPointer = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    frac.set(Math.min(0.93, Math.max(0.07, (clientX - r.left) / r.width)));
  };

  return (
    <div
      ref={ref}
      className="relative mt-14 cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-2xl border border-[var(--line-paper)] shadow-[0_40px_90px_-40px_rgba(0,0,0,0.45)]"
      onPointerDown={(e) => {
        dragging.current = true;
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        setFromPointer(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && setFromPointer(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      {/* base layer — the JDCO dark/gold world (revealed on the right) */}
      <div className="relative bg-[#15140f]">
        <div className="blueprint-grid-fine absolute inset-0 opacity-50" />
        <div className="glow-ember pointer-events-none absolute right-[-12%] top-1/2 h-[120%] w-[55%] -translate-y-1/2 opacity-50" />
        <PanelContent side="dry" />
      </div>

      {/* top layer — wet world, clipped to the left of the blade */}
      <motion.div style={{ clipPath: clip }} className="absolute inset-0 bg-[#e9e5da]">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, rgba(120,114,100,0.08) 0 14px, transparent 14px 28px)",
          }}
        />
        <PanelContent side="wet" />
      </motion.div>

      {/* the blade */}
      <motion.div style={{ left }} className="pointer-events-none absolute inset-y-0 z-10 w-0">
        <div className="absolute inset-y-0 left-0 w-[2px] -translate-x-1/2 bg-ember shadow-[0_0_18px_rgba(251,204,14,0.65)]" />
        <div className="absolute left-0 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-ember bg-[#131313] shadow-[0_0_30px_rgba(251,204,14,0.4)]">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-ember" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 7l-5 5 5 5M16 7l5 5-5 5" />
          </svg>
        </div>
        <span className="mono absolute bottom-4 left-0 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#131313] px-3 py-1 text-[0.54rem] uppercase tracking-[0.2em] text-ember [animation:pulse-soft_2.2s_ease-in-out_infinite]">
          ◀ Drag ▶
        </span>
      </motion.div>
    </div>
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

        <Wipe />

        <Reveal delay={0.1}>
          <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
            <p className="mono max-w-2xl text-[0.74rem] leading-relaxed text-mute-paper">
              // Drag the blade. Zero-slump, end-pressed units leave the mold
              structurally rigid — enabling immediate reuse and throughput that
              wet-cast lines cannot match.
            </p>
            <span className="mono text-[0.62rem] uppercase tracking-[0.2em] text-ember">
              5 / 5 metrics — semi-dry wins
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
