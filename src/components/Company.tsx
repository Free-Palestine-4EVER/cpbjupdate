"use client";

import { company, brand } from "@/lib/content";
import { Kicker } from "./ui";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

export default function Company() {
  return (
    <section className="relative bg-bg pb-28 md:pb-36">
      <div className="shell grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        {/* left */}
        <div>
          <Reveal>
            <Kicker index={company.index}>{company.kicker}</Kicker>
          </Reveal>
          <Reveal delay={0.06} variant="wipe">
            <h2 className="display mt-6 max-w-[14ch] text-[clamp(2rem,4.5vw,3.6rem)] text-fg">
              The engine of regional development.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-7 max-w-xl text-[1.05rem] font-light leading-relaxed text-mute">
              {company.lead}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
              {[
                ["Established", brand.established],
                ["Ownership", "100% Saudi"],
                ["Headquarters", "Riyadh, KSA"],
              ].map(([k, v]) => (
                <div key={k}>
                  <div className="mono text-[0.62rem] uppercase tracking-[0.18em] text-steel">
                    {k}
                  </div>
                  <div className="display mt-1 text-[1.3rem] font-bold text-fg">
                    {v}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* right — vision / mission / values */}
        <div className="flex flex-col gap-4">
          <Reveal>
            <div className="ticks rounded-xl border border-[var(--line)] bg-surface p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[var(--line-strong)]">
              <div className="mono text-[0.62rem] uppercase tracking-[0.22em] text-ember">
                Vision
              </div>
              <p className="mt-3 text-[1.05rem] font-light leading-relaxed text-fg-soft">
                {company.vision}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="ticks rounded-xl border border-[var(--line)] bg-surface p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[var(--line-strong)]">
              <div className="mono text-[0.62rem] uppercase tracking-[0.22em] text-ember">
                Mission
              </div>
              <p className="mt-3 text-[1.05rem] font-light leading-relaxed text-fg-soft">
                {company.mission}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="mono text-[0.62rem] uppercase tracking-[0.22em] text-steel">
              Core Values
            </div>
          </Reveal>
          <RevealGroup className="flex flex-wrap gap-2" stagger={0.05}>
            {company.values.map((v) => (
              <RevealItem
                key={v}
                className="flex items-center gap-2 rounded-full border border-[var(--line)] bg-surface px-4 py-2 transition-colors duration-300 hover:border-[var(--color-ember)]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-ember [animation:pulse-soft_2.6s_ease-in-out_infinite]" />
                <span className="text-[0.82rem] text-fg-soft">{v}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
