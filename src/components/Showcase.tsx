"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { Kicker } from "./ui";
import { Reveal } from "./Reveal";
import SafeMount from "./SafeMount";
import { useVisible } from "@/lib/useVisible";

const Catalogue3D = dynamic(() => import("./Catalogue3D"), { ssr: false });

export default function Showcase() {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progress.current = v;
  });
  const [visRef, visible] = useVisible<HTMLDivElement>("200px");

  return (
    <section ref={ref} className="force-dark relative h-[200vh] bg-bg md:h-[280vh]">
      <div ref={visRef} className="sticky top-0 h-screen w-full overflow-hidden">
        {/* 3D scene */}
        <div className="absolute inset-0">
          <SafeMount>
            <Catalogue3D progress={progress} active={visible} />
          </SafeMount>
        </div>

        {/* blend edges into neighboring sections */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-bg to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-bg to-transparent" />

        {/* overlay copy */}
        <div className="pointer-events-none absolute inset-0">
          <div className="shell relative flex h-full flex-col justify-between py-[14vh]">
            <div>
              <Reveal>
                <Kicker>Engineered in 3D</Kicker>
              </Reveal>
              <Reveal delay={0.06} variant="wipe">
                <h2 className="display mt-5 max-w-[14ch] text-[clamp(2.2rem,5.5vw,4.4rem)] text-fg">
                  The catalogue, <span className="text-mute">rendered.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mono mt-5 max-w-xs text-[0.8rem] leading-relaxed text-steel">
                  // Every unit modeled to spec — from blueprint linework to
                  cast concrete. Scroll to rotate the range.
                </p>
              </Reveal>
            </div>

            <div className="flex items-center gap-3">
              <span className="h-px w-7 bg-ember" />
              <span className="mono text-[0.62rem] uppercase tracking-[0.2em] text-steel">
                Pipes · Box Culverts · Manholes
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
