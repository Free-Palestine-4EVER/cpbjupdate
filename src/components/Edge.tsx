"use client";

import Image from "next/image";
import { SectionHead } from "./ui";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

/* "Our Winning Edge" — from the official JDCO company profile */
const PILLARS = [
  {
    n: "01",
    title: "Quality First",
    body: "Every unit leaves the line inside an auditable ISO 9001:2015 system — tested, calibrated, certified.",
  },
  {
    n: "02",
    title: "Strong Relationships",
    body: "Approvals and repeat business with the Kingdom's ministries, municipalities and elite contractors.",
  },
  {
    n: "03",
    title: "Productivity",
    body: "Semi-dry technology and automated lines keep 3,500 tons moving out of the yard every single day.",
  },
  {
    n: "04",
    title: "On-Time Delivery",
    body: "Heavy dispatch fleet and 50-ton lifting capacity built around one promise — your schedule holds.",
  },
  {
    n: "05",
    title: "Our People",
    body: "Engineers, technicians and operators who have been casting the region's infrastructure since 2007.",
  },
];

export default function Edge() {
  return (
    <section className="relative bg-paper py-28 text-ink md:py-36">
      <div className="shell">
        <SectionHead
          kicker="Our Winning Edge"
          title={
            <>
              Five reasons the region{" "}
              <span className="text-mute-paper">builds with JDCO.</span>
            </>
          }
          tone="paper"
          max="max-w-3xl"
        />

        <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-[var(--line-paper)] bg-[var(--line-paper)] sm:grid-cols-2 lg:grid-cols-5" stagger={0.07}>
          {PILLARS.map((p) => (
            <RevealItem
              key={p.n}
              y={30}
              className="group bg-[#f4f2eb] p-7 transition-all duration-500 hover:-translate-y-1 hover:bg-[#efece4]"
            >
              <span className="mono text-[0.7rem] font-semibold text-ember">
                {p.n}
              </span>
              <h3 className="display mt-4 text-[1.15rem] font-bold leading-tight text-ink">
                {p.title}
              </h3>
              <p className="mt-3 text-[0.88rem] font-light leading-relaxed text-mute-paper">
                {p.body}
              </p>
              <div className="mt-6 h-px w-full bg-gradient-to-r from-ember/40 to-transparent transition-all duration-500 group-hover:from-ember" />
            </RevealItem>
          ))}
        </RevealGroup>

        {/* on-the-line strip — real plant photography */}
        <Reveal delay={0.1}>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              { src: "/photos/rebar.jpg", cap: "Cage-welded reinforcement · medium-frequency steel fabrication" },
              { src: "/photos/mixer.jpg", cap: "Planetary mixing · 1.4m³ in 2.5 minutes, zero-slump" },
            ].map((f) => (
              <figure key={f.src} className="ticks group relative overflow-hidden rounded-xl">
                <div className="relative aspect-[16/8] overflow-hidden">
                  <Image
                    src={f.src}
                    alt={f.cap}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                </div>
                <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <span className="mono text-[0.58rem] uppercase tracking-[0.16em] text-white/85">
                    {f.cap}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
