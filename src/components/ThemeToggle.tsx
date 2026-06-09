"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [light, setLight] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // re-apply theme after hydration (React resets <html> className on hydrate).
    // a ?theme= query param wins per-tab so dark+light can be viewed side by side.
    let saved: string | null = null;
    try {
      const p = new URLSearchParams(window.location.search).get("theme");
      saved = p || localStorage.getItem("jdco-theme");
    } catch {}
    const isLight = saved === "light";
    document.documentElement.classList.toggle("light", isLight);
    setLight(isLight);
    setReady(true);
  }, []);

  const toggle = () => {
    const el = document.documentElement;
    const next = !el.classList.contains("light");
    el.classList.toggle("light", next);
    try {
      localStorage.setItem("jdco-theme", next ? "light" : "dark");
    } catch {}
    setLight(next);
  };

  return (
    <button
      onClick={toggle}
      aria-label={light ? "Switch to dark theme" : "Switch to light theme"}
      className={`relative flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] text-fg transition-colors hover:border-[var(--line-strong)] ${className}`}
    >
      <span className="sr-only">Toggle theme</span>
      {ready && (light ? <Moon /> : <Sun />)}
    </button>
  );
}

function Sun() {
  return (
    <svg viewBox="0 0 24 24" className="h-[15px] w-[15px]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2v2.5M12 19.5V22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M2 12h2.5M19.5 12H22M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" />
    </svg>
  );
}

function Moon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[15px] w-[15px]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
    </svg>
  );
}
