"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "./Reveal";

/* scroll-scrubbed inner parallax: the photo drifts inside its clipped frame */
function ParallaxPhoto({
  src,
  alt,
  speed = 7,
  sizes,
  priority = false,
  children,
  className = "",
}: {
  src: string;
  alt: string;
  speed?: number;
  sizes: string;
  priority?: boolean;
  children?: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${speed}%`, `${speed}%`]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={{ y, scale: 1 + speed * 0.025 }}
        className="absolute inset-0 will-change-transform"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </motion.div>
      {children}
    </div>
  );
}

function Caption({ fig, text }: { fig: string; text: string }) {
  return (
    <figcaption className="pointer-events-none absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/65 to-transparent p-4 sm:p-5">
      <span className="mono text-[0.6rem] uppercase tracking-[0.18em] text-white/85">
        {text}
      </span>
      <span className="mono text-[0.6rem] tracking-[0.18em] text-[#fbcc0e]">
        {fig}
      </span>
    </figcaption>
  );
}

export default function Field() {
  return (
    <section className="force-dark relative overflow-hidden border-y border-[var(--line)] bg-bg">
      {/* ---- full-bleed feature: the pour ---- */}
      <ParallaxPhoto
        src="/photos/pour-yard.jpg"
        alt="JDCO crew casting semi-dry precast elements at the Riyadh production yard"
        speed={9}
        sizes="100vw"
        className="h-[68vh] md:h-[92vh]"
      >
        {/* legibility scrims — fixed dark, photo band stays cinematic in both themes */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="shell pb-10 md:pb-16">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="h-px w-7 bg-[#fbcc0e]" />
                <span className="eyebrow text-white/70">
                  On the Ground — Riyadh Plant
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.08} variant="wipe">
              <h2 className="display mt-5 max-w-[14ch] text-[clamp(2.2rem,6.4vw,5rem)] text-white">
                Proof, poured every single day.
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mono mt-5 max-w-md text-[0.68rem] uppercase leading-relaxed tracking-[0.18em] text-white/65">
                Batch → cast → press → cure → dispatch · zero-slump semi-dry
                line · Othman bin Affan, Riyadh
              </p>
            </Reveal>
          </div>
        </div>
        <Caption fig="FIG. 01 / 03" text="Casting bay · planetary-mixed zero-slump pour" />
      </ParallaxPhoto>

      {/* ---- editorial two-up, counter-staggered parallax ---- */}
      <div className="shell-wide relative py-16 md:py-28">
        <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative grid gap-6 md:grid-cols-2 md:gap-10">
          <Reveal variant="wipe" className="md:mt-20">
            <figure className="ticks relative">
              <ParallaxPhoto
                src="/photos/crane-yard.jpg"
                alt="Overhead crane lifting cured precast units across the JDCO storage yard"
                speed={6}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="aspect-[16/10]"
              >
                <Caption fig="FIG. 02 / 03" text="50T overhead lift · open-yard curing & stacking" />
              </ParallaxPhoto>
            </figure>
          </Reveal>
          <Reveal variant="wipe" delay={0.1} className="md:-mt-10">
            <figure className="ticks relative">
              <ParallaxPhoto
                src="/photos/plant-grid.jpg"
                alt="Inside the JDCO halls — casting, power-floating, handling and finished RC pipes"
                speed={6}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="aspect-[16/10]"
              >
                <Caption fig="FIG. 03 / 03" text="Production halls · cast / finish / handle / inspect" />
              </ParallaxPhoto>
            </figure>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="relative mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--line)] pt-6">
            <span className="mono text-[0.62rem] uppercase tracking-[0.2em] text-mute">
              Shot at the JDCO plant — no renders, no stock
            </span>
            <span className="mono text-[0.62rem] uppercase tracking-[0.2em] text-ember">
              ◆ 3,500 T / Day leaves this yard
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
