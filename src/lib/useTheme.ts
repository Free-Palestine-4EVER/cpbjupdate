"use client";

import { useEffect, useState } from "react";

/** reactive `light` flag — tracks the `.light` class on <html> so 3D scenes
 *  (which paint with JS colors, not CSS vars) can recolor on theme toggle. */
export function useTheme() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    const el = document.documentElement;
    const sync = () => setLight(el.classList.contains("light"));
    sync();
    const mo = new MutationObserver(sync);
    mo.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);

  return light;
}
