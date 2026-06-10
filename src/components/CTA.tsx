"use client";

import { cta, brand } from "@/lib/content";
import { Reveal } from "./Reveal";
import Magnetic from "./Magnetic";

export default function CTA() {
  return (
    <section
      id="contact"
      className="force-dark relative scroll-mt-24 overflow-hidden border-y border-[var(--line)] bg-bg py-24 md:py-40"
    >
      <div className="absolute inset-0 blueprint-grid opacity-40" />
      <div className="glow-ember pointer-events-none absolute left-1/2 top-1/2 h-[70vh] w-[90vw] -translate-x-1/2 -translate-y-1/2 opacity-50" />
      {/* faint stacked-pipe motif */}
      <svg
        className="pointer-events-none absolute -bottom-10 right-[-4%] h-[220px] w-[220px] text-blueprint opacity-[0.12] [animation:slow-rot_110s_linear_infinite] sm:h-[360px] sm:w-[360px]"
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        {[
          [60, 70],
          [110, 70],
          [85, 115],
          [135, 115],
          [110, 160],
        ].map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="22" />
            <circle cx={cx} cy={cy} r="13" opacity="0.6" />
          </g>
        ))}
      </svg>

      <div className="shell relative text-center">
        <Reveal>
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-7 bg-ember" />
            <span className="eyebrow text-mute">{cta.kicker}</span>
            <span className="h-px w-7 bg-ember" />
          </div>
        </Reveal>
        <Reveal delay={0.06} variant="wipe">
          <h2 className="display mx-auto mt-7 max-w-[16ch] text-[clamp(2.4rem,7vw,5.6rem)] text-fg">
            Build the future with absolute certainty.
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-7 max-w-xl text-[1.1rem] font-light leading-relaxed text-mute">
            {cta.sub}
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-11 flex flex-wrap items-center justify-center gap-3">
            <Magnetic>
              <a
                href={`mailto:${brand.email}`}
                className="btn-ember inline-block rounded-full px-8 py-4 text-[0.8rem] font-semibold uppercase tracking-[0.14em] mono"
              >
                Request a Quote
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={brand.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost inline-block rounded-full px-8 py-4 text-[0.8rem] uppercase tracking-[0.14em] text-fg mono"
              >
                WhatsApp&nbsp;·&nbsp;{brand.mobile}
              </a>
            </Magnetic>
          </div>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] md:grid-cols-4">
            {[
              ["Email", brand.email, `mailto:${brand.email}`],
              ["Phone", brand.phone, `tel:${brand.phone.replace(/\s/g, "")}`],
              ["Location", brand.location, brand.maps],
              ["Web", brand.web, `https://${brand.web}`],
            ].map(([k, v, href]) => (
              <a
                key={k}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group bg-surface px-5 py-6 text-left transition-colors hover:bg-surface-2"
              >
                <div className="mono text-[0.58rem] uppercase tracking-[0.18em] text-steel transition-colors group-hover:text-ember">
                  {k}
                </div>
                <div className="mt-2 text-[0.86rem] text-fg-soft break-words">
                  {v}
                </div>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
