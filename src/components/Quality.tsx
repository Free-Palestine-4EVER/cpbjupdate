"use client";

import Image from "next/image";
import { quality } from "@/lib/content";
import { SectionHead } from "./ui";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

/* the REAL ISO 9001:2015 certificate (InterCert), scraped from jdco.com.sa */
function CertCard() {
  return (
    <a
      href="/photos/iso-cert.png"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block w-40 rotate-[2.5deg] overflow-hidden rounded-lg border border-[var(--line-strong)] bg-white shadow-[0_22px_55px_-18px_rgba(0,0,0,0.65)] transition-transform duration-500 hover:rotate-0 hover:scale-[1.05] sm:w-44"
    >
      <Image
        src="/photos/iso-cert.png"
        alt="JDCO ISO 9001:2015 certificate of registration issued by InterCert"
        width={419}
        height={588}
        className="w-full"
      />
      <span className="mono absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-3 pb-2 pt-9 text-[0.52rem] uppercase tracking-[0.14em] text-white/90">
        The actual certificate ◆ InterCert
      </span>
    </a>
  );
}

function IsoBadge() {
  return (
    <div className="relative flex h-28 w-28 shrink-0 items-center justify-center rounded-full border border-ember/40">
      <div className="absolute inset-2 rounded-full border border-dashed border-ember/30" />
      <div className="text-center">
        <div className="display text-[1.1rem] font-extrabold leading-none text-fg">
          ISO
        </div>
        <div className="mono mt-1 text-[0.56rem] tracking-[0.12em] text-ember">
          9001:2015
        </div>
      </div>
    </div>
  );
}

function TestDiagram({ id }: { id: string }) {
  if (id === "Test B")
    return (
      <svg viewBox="0 0 120 80" className="h-20 w-full text-blueprint" fill="none" stroke="currentColor" strokeWidth="1">
        <rect x="10" y="28" width="44" height="24" />
        <rect x="66" y="28" width="44" height="24" />
        <path d="M54 28v24M66 28v24" className="text-ember" stroke="currentColor" />
        <path d="M30 40h8M82 40h8" className="text-ember" stroke="currentColor" strokeWidth="1.4" />
        <path d="M36 37l4 3-4 3M88 37l4 3-4 3" className="text-ember" stroke="currentColor" strokeWidth="1.4" />
        <text x="60" y="14" textAnchor="middle" className="mono" fill="currentColor" fontSize="6" opacity="0.7">ZERO LEAKAGE</text>
      </svg>
    );
  return (
    <svg viewBox="0 0 120 80" className="h-20 w-full text-blueprint" fill="none" stroke="currentColor" strokeWidth="1">
      <circle cx="60" cy="42" r="22" />
      <circle cx="60" cy="42" r="14" opacity="0.6" />
      <path d="M60 6v10M60 68v6" className="text-ember" stroke="currentColor" strokeWidth="1.4" />
      <path d="M56 12l4 4 4-4M56 70l4-4 4 4" className="text-ember" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export default function Quality() {
  return (
    <section id="quality" className="relative scroll-mt-24 bg-bg py-28 md:py-36">
      <div className="shell">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHead
            index={quality.index}
            kicker={quality.kicker}
            title={
              <>
                Quality is a system,{" "}
                <span className="text-mute">not an afterthought.</span>
              </>
            }
            intro={quality.intro}
            max="max-w-2xl"
          />
          <Reveal delay={0.1}>
            <div className="flex items-end gap-7">
              <IsoBadge />
              <CertCard />
            </div>
          </Reveal>
        </div>

        {/* QMS stages */}
        <RevealGroup className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-4">
          {quality.stages.map((s) => (
            <RevealItem
              key={s.n}
              className="group bg-surface p-7 transition-all duration-500 hover:-translate-y-1 hover:bg-surface-2"
            >
              <span className="mono inline-block text-[0.7rem] font-semibold text-ember transition-transform duration-500 group-hover:scale-125">
                {s.n}
              </span>
              <h3 className="display mt-4 text-[1.12rem] font-bold text-fg">
                {s.title}
              </h3>
              <p className="mt-3 text-[0.9rem] font-light leading-relaxed text-mute">
                {s.body}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* stress tests */}
        <RevealGroup className="mt-6 grid gap-4 md:grid-cols-2" stagger={0.1}>
          {quality.tests.map((t) => (
            <RevealItem key={t.tag}>
              <div className="ticks flex h-full flex-col rounded-2xl border border-[var(--line)] bg-surface p-8">
                <div className="flex items-center justify-between">
                  <span className="mono text-[0.62rem] uppercase tracking-[0.18em] text-ember">
                    {t.tag}
                  </span>
                  <span className="mono text-[0.6rem] uppercase tracking-[0.14em] text-steel">
                    Verification
                  </span>
                </div>
                <div className="my-6 rounded-xl border border-[var(--line)] bg-bg p-4">
                  <TestDiagram id={t.tag} />
                </div>
                <h3 className="display text-[1.4rem] font-bold text-fg">
                  {t.title}
                </h3>
                <p className="mt-3 text-[0.95rem] font-light leading-relaxed text-mute">
                  {t.body}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* triad */}
        <div className="mt-24">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-7 bg-ember" />
              <span className="eyebrow text-mute">Total Risk Mitigation</span>
            </div>
          </Reveal>
          <Reveal delay={0.06} variant="wipe">
            <h3 className="display mt-5 max-w-[16ch] text-[clamp(1.8rem,4vw,3rem)] text-fg">
              {quality.triad.title}
            </h3>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-5 max-w-xl text-[1.02rem] font-light leading-relaxed text-mute">
              {quality.triad.sub}
            </p>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-4 md:grid-cols-3" stagger={0.1}>
            {quality.triad.pillars.map((p, i) => (
              <RevealItem key={p.title}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-[var(--line)] bg-gradient-to-b from-surface to-surface p-8">
                  <div className="numeral text-[3.4rem] text-ghost transition-colors duration-500 group-hover:text-ember/80">
                    0{i + 1}
                  </div>
                  <h4 className="display mt-4 text-[1.3rem] font-bold text-fg">
                    {p.title}
                  </h4>
                  <p className="mt-3 text-[0.95rem] font-light leading-relaxed text-mute">
                    {p.body}
                  </p>
                  <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-ember to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
