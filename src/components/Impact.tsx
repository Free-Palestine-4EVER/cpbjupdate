"use client";

import { impact } from "@/lib/content";
import { SectionHead } from "./ui";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { Counter } from "./Counter";

export default function Impact() {
  return (
    <section
      id="projects"
      className="relative scroll-mt-24 overflow-hidden border-t border-[var(--line)] bg-bg py-28 md:py-36"
    >
      <div className="glow-ember pointer-events-none absolute -right-20 top-10 h-[50vh] w-[50vh] opacity-40" />
      <div className="shell relative">
        <SectionHead
          index={impact.index}
          kicker={impact.kicker}
          title={
            <>
              Built into the spine{" "}
              <span className="text-mute">of the region.</span>
            </>
          }
          max="max-w-2xl"
        />

        {/* big stats + sectors/reach */}
        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <RevealGroup className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)]">
            {impact.bigStats.map((s) => (
              <RevealItem key={s.label} className="bg-surface p-8">
                <div className="display flex items-baseline text-[clamp(2.6rem,5vw,4.2rem)] font-extrabold text-fg">
                  <Counter to={s.value} duration={2} separator={false} />
                  <span className="ml-1 text-[1.2rem] text-ember">{s.suffix}</span>
                </div>
                <div className="mono mt-3 text-[0.66rem] uppercase leading-relaxed tracking-[0.12em] text-mute">
                  {s.label}
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="flex flex-col gap-8">
            <div>
              <Reveal>
                <div className="mono text-[0.62rem] uppercase tracking-[0.2em] text-steel">
                  Key Sectors Powered
                </div>
              </Reveal>
              <RevealGroup className="mt-4 flex flex-wrap gap-2" stagger={0.05}>
                {impact.sectors.map((s) => (
                  <RevealItem
                    key={s}
                    className="rounded-full border border-[var(--line)] bg-surface px-4 py-2 text-[0.84rem] text-fg-soft transition-colors duration-300 hover:border-[var(--color-ember)] hover:text-fg"
                  >
                    {s}
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
            <div>
              <Reveal>
                <div className="mono text-[0.62rem] uppercase tracking-[0.2em] text-steel">
                  Geographic Reach
                </div>
              </Reveal>
              <RevealGroup className="mt-4 flex flex-wrap gap-x-5 gap-y-2.5" stagger={0.03}>
                {impact.reach.map((c, ci) => (
                  <RevealItem key={c} className="flex items-center gap-2">
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-ember/80 [animation:pulse-soft_2.8s_ease-in-out_infinite]"
                      style={{ animationDelay: `${ci * 0.28}s` }}
                    />
                    <span className="text-[0.92rem] text-mute">{c}</span>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </div>

        {/* spotlights */}
        <Reveal className="mt-20">
          <div className="flex items-center gap-3">
            <span className="h-px w-7 bg-ember" />
            <span className="eyebrow text-mute">Mega-Project Spotlights</span>
          </div>
        </Reveal>

        <RevealGroup className="mt-8 grid gap-4 md:grid-cols-2" stagger={0.08}>
          {impact.projects.map((p, i) => (
            <RevealItem key={p.name}>
              <article className="group relative overflow-hidden rounded-2xl border border-[var(--line)] bg-surface p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-[var(--line-strong)] hover:bg-surface-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="display text-[1.5rem] font-bold text-fg">
                      {p.name}
                    </h3>
                    <div className="mono mt-1.5 text-[0.66rem] uppercase tracking-[0.14em] text-ember">
                      {p.place}
                    </div>
                  </div>
                  <span className="numeral text-[1.8rem] text-ghost">
                    0{i + 1}
                  </span>
                </div>
                <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-[var(--line)] pt-6">
                  <div className="col-span-2 sm:col-span-1">
                    <dt className="mono text-[0.58rem] uppercase tracking-[0.14em] text-steel">
                      Contractor
                    </dt>
                    <dd className="mt-1 text-[0.9rem] text-fg-soft">
                      {p.contractor}
                    </dd>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <dt className="mono text-[0.58rem] uppercase tracking-[0.14em] text-steel">
                      Product
                    </dt>
                    <dd className="mt-1 text-[0.9rem] text-fg-soft">{p.product}</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="mono text-[0.58rem] uppercase tracking-[0.14em] text-steel">
                      Project Value
                    </dt>
                    <dd className="display mt-1 text-[1.4rem] font-bold text-ember">
                      {p.value}
                    </dd>
                  </div>
                </dl>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
