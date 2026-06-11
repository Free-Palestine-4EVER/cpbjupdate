"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { KineticText } from "./Kinetic";
import { Reveal } from "./Reveal";

/* shared cinematic hero for the dedicated pages — compact cousin of the
   homepage hero: blueprint grids, kinetic title, optional parallax photo */
export default function PageHero({
  crumb,
  title,
  sub,
  meta = [],
  photo,
  photoAlt = "",
}: {
  crumb: string;
  title: string;
  sub: string;
  meta?: string[];
  photo?: string;
  photoAlt?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1.22]);

  return (
    <section
      ref={ref}
      className="force-dark relative flex min-h-[64svh] w-full items-end overflow-hidden border-b border-[var(--line)] bg-bg pb-14 pt-36 md:min-h-[70svh] md:pb-20"
    >
      {photo && (
        <motion.div style={{ y, scale }} className="absolute inset-0 will-change-transform">
          <Image
            src={photo}
            alt={photoAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-45"
          />
        </motion.div>
      )}
      <div className="absolute inset-0 blueprint-grid opacity-40" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/45" />
      <div className="glow-ember pointer-events-none absolute right-[-8%] top-[20%] h-[50vh] w-[50vh] opacity-50" />

      <div className="shell relative">
        <Reveal>
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="mono text-[0.66rem] uppercase tracking-[0.24em] text-white/60 transition-colors hover:text-white"
            >
              JDCO
            </a>
            <span className="h-px w-7 bg-ember" />
            <span className="mono text-[0.66rem] uppercase tracking-[0.24em] text-ember">
              {crumb}
            </span>
          </div>
        </Reveal>
        <KineticText
          as="h1"
          className="display mt-6 max-w-[16ch] text-[clamp(2.6rem,7.5vw,5.8rem)] text-white"
        >
          {title}
        </KineticText>
        <Reveal delay={0.12}>
          <p className="mt-7 max-w-xl text-[1.06rem] font-light leading-relaxed text-white/75">
            {sub}
          </p>
        </Reveal>
        {meta.length > 0 && (
          <Reveal delay={0.18}>
            <div className="mono mt-9 flex flex-wrap gap-x-8 gap-y-3 text-[0.62rem] uppercase tracking-[0.2em] text-white/50">
              {meta.map((m, i) => (
                <span key={m} className={i === meta.length - 1 ? "text-ember" : ""}>
                  {i === meta.length - 1 ? "◆ " : ""}
                  {m}
                </span>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
