"use client";

import { brand, nav } from "@/lib/content";
import { Wordmark } from "./Logo";
import { RevealGroup, RevealItem } from "./Reveal";

export default function Footer() {
  return (
    <footer className="force-dark bg-bg pb-10 pt-20">
      <div className="shell">
        <RevealGroup
          className="grid gap-12 border-b border-[var(--line)] pb-14 md:grid-cols-[1.4fr_1fr_1fr]"
          stagger={0.1}
        >
          <RevealItem>
            <span className="text-fg">
              <Wordmark />
            </span>
            <p className="mt-6 max-w-xs text-[0.92rem] font-light leading-relaxed text-mute">
              {brand.legal}. Engineering certainty for the region&apos;s most
              critical infrastructure since {brand.established}.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["ISO 9001:2015", "Vision 2030", "ASTM C748-M"].map((b) => (
                <span
                  key={b}
                  className="mono rounded-full border border-[var(--line)] px-3 py-1 text-[0.58rem] uppercase tracking-[0.12em] text-steel"
                >
                  {b}
                </span>
              ))}
            </div>
          </RevealItem>

          <RevealItem>
            <div className="mono text-[0.6rem] uppercase tracking-[0.2em] text-steel">
              Navigate
            </div>
            <ul className="mt-5 space-y-3">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="link-sweep text-[0.92rem] text-mute transition-colors hover:text-fg"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </RevealItem>

          <RevealItem>
            <div className="mono text-[0.6rem] uppercase tracking-[0.2em] text-steel">
              Contact
            </div>
            <ul className="mt-5 space-y-3 text-[0.92rem] text-mute">
              <li>
                <a href={`mailto:${brand.email}`} className="link-sweep hover:text-fg">
                  {brand.email}
                </a>
              </li>
              <li>
                <a href={`tel:${brand.phone.replace(/\s/g, "")}`} className="link-sweep hover:text-fg">
                  {brand.phone}
                </a>
              </li>
              <li>
                <a
                  href={brand.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-sweep hover:text-fg"
                >
                  {brand.mobile} · WhatsApp
                </a>
              </li>
              <li>{brand.location}</li>
              <li>
                <a
                  href={`https://${brand.web}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-sweep text-ember"
                >
                  {brand.web}
                </a>
              </li>
            </ul>
          </RevealItem>
        </RevealGroup>

        <div className="flex flex-wrap gap-2 border-b border-[var(--line)] py-7">
          {brand.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mono group rounded-full border border-[var(--line)] px-4 py-2 text-[0.62rem] uppercase tracking-[0.14em] text-mute transition-colors hover:border-[var(--color-ember)] hover:text-fg"
            >
              {s.label}
              <span className="ml-2 text-steel transition-colors group-hover:text-ember">
                {s.handle}
              </span>
            </a>
          ))}
        </div>

        <div className="flex flex-col items-start justify-between gap-3 pt-7 md:flex-row md:items-center">
          <span className="mono text-[0.62rem] uppercase tracking-[0.14em] text-steel">
            © {brand.established}–2026 {brand.short}. All rights reserved.
          </span>
          <span className="mono text-[0.62rem] uppercase tracking-[0.14em] text-steel">
            Concept design · Not an official JDCO website
          </span>
        </div>
      </div>
    </footer>
  );
}
