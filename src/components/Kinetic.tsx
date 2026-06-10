"use client";

import {
  Children,
  createElement,
  isValidElement,
  type ReactNode,
  type ElementType,
} from "react";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/** split a ReactNode into animated "units": strings → words, elements → kept whole */
function buildUnits(node: ReactNode): { content: ReactNode; key: string }[] {
  const units: { content: ReactNode; key: string }[] = [];
  let k = 0;
  Children.toArray(node).forEach((child) => {
    if (typeof child === "string") {
      child
        .split(/(\s+)/)
        .filter((s) => s.trim().length > 0)
        .forEach((word) => units.push({ content: word, key: `w${k++}` }));
    } else if (isValidElement(child)) {
      units.push({ content: child, key: `e${k++}` });
    }
  });
  return units;
}

export function KineticText({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
  once = true,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  once?: boolean;
}) {
  const units = buildUnits(children);
  /* IMPORTANT: the in-view observer must live on the UNCLIPPED wrapper.
     Observing the per-word spans never fires — they start translated 110%
     inside overflow-hidden clips, and IntersectionObserver respects
     ancestor clipping, so a fully-clipped word is never "in view". */
  return createElement(
    Tag,
    { className },
    <motion.span
      className="inline"
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.055, delayChildren: delay } },
      }}
    >
      {units.map((u) => (
        <span
          key={u.key}
          className="mr-[0.24em] inline-flex overflow-hidden align-bottom"
          style={{ paddingBottom: "0.08em" }}
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%", opacity: 0 },
              show: {
                y: "0%",
                opacity: 1,
                transition: { duration: 0.7, ease: EASE },
              },
            }}
          >
            {u.content}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
