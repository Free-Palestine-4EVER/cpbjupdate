"use client";

import { motion, type Variants } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/* Old webviews without IntersectionObserver would keep every whileInView
   element at opacity 0 forever — 90% of the page invisible. No IO → no
   entrance animation, content just shows. */
const HAS_IO = typeof window === "undefined" || "IntersectionObserver" in window;

/* phones get bigger travel + slower stagger so the scroll choreography is
   actually felt on a small screen. Flips AFTER mount — the first client
   render must match the SSR markup or React reports a hydration mismatch. */
function useSmall() {
  const [small, setSmall] = useState(false);
  useEffect(() => {
    if (window.innerWidth < 640) setSmall(true);
  }, []);
  return small;
}

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  variant?: "rise" | "wipe" | "fade";
  once?: boolean;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  variant = "rise",
  once = true,
}: Props) {
  const small = useSmall();
  const dy = small ? Math.round(y * 1.5) : y;
  const variants: Variants =
    variant === "wipe"
      ? {
          hidden: { opacity: 0, y: dy * 0.6, clipPath: "inset(0 0 100% 0)" },
          show: {
            opacity: 1,
            y: 0,
            clipPath: "inset(0 0 0% 0)",
            transition: { duration: 0.9, ease: EASE, delay },
          },
        }
      : variant === "fade"
      ? {
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { duration: 0.9, ease: EASE, delay } },
        }
      : {
          hidden: { opacity: 0, y: dy },
          show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: EASE, delay },
          },
        };

  if (!HAS_IO) {
    return (
      <motion.div className={className} initial={false} animate="show" variants={variants}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
    >
      {children}
    </motion.div>
  );
}

/** Staggered container — children animate in sequence */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  once?: boolean;
}) {
  const small = useSmall();
  if (!HAS_IO) {
    return (
      <motion.div className={className} initial={false} animate="show">
        {children}
      </motion.div>
    );
  }
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: small ? stagger * 1.25 : stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  y = 22,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const small = useSmall();
  const dy = small ? Math.round(y * 1.5) : y;
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: dy },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}
