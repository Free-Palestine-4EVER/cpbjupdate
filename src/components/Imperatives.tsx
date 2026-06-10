"use client";

import { imperatives } from "@/lib/content";
import { SectionHead } from "./ui";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

export default function Imperatives() {
  return (
    <section id="capabilities" className="relative scroll-mt-24 bg-bg py-28 md:py-36">
      <div className="shell">
        <SectionHead
          index={imperatives.index}
          kicker={imperatives.kicker}
          title={
            <>
              Modern infrastructure demands{" "}
              <span className="text-mute">uncompromising scale.</span>
            </>
          }
          intro={imperatives.intro}
          max="max-w-3xl"
        />

        <RevealGroup className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] md:grid-cols-3">
          {imperatives.cards.map((c) => (
            <RevealItem
              key={c.no}
              className="group relative bg-surface p-8 transition-all duration-500 hover:-translate-y-1.5 hover:bg-surface-2 md:p-10"
            >
              <div className="flex items-center justify-between">
                <span
                  className="numeral inline-block text-[2.6rem] text-ghost transition-colors duration-500 [animation:floaty_5.5s_ease-in-out_infinite] group-hover:text-ember"
                  style={{ animationDelay: `${Number(c.no === "I" ? 0 : c.no === "II" ? 1.4 : 2.8)}s` }}
                >
                  {c.no}
                </span>
                <span className="h-2 w-2 rounded-full bg-ember/70 transition-transform duration-500 [animation:pulse-soft_2.4s_ease-in-out_infinite] group-hover:scale-150" />
              </div>
              <h3 className="display mt-10 text-[1.5rem] font-bold text-fg">
                {c.title}
              </h3>
              <p className="mt-4 text-[0.98rem] font-light leading-relaxed text-mute">
                {c.body}
              </p>
              {/* baseline blueprint line */}
              <div className="mt-8 h-px w-full bg-gradient-to-r from-ember/40 to-transparent transition-all duration-500 group-hover:from-ember" />
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1}>
          <p className="mono mt-8 max-w-2xl text-[0.78rem] leading-relaxed text-steel">
            // Subterranean networks — from metro tunnels to stormwater arteries —
            carry no margin for failure. JDCO exists to remove that risk.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
