"use client";

import type { ReactElement } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Card = {
  tone: "navy" | "yellow";
  title: string;
  desc: string;
  Icon: () => ReactElement;
};

const CARDS: Card[] = [
  {
    tone: "navy",
    title: "Vision-Driven Development",
    desc: "We build from a clear product vision — not from feature lists.",
    Icon: EyeIcon,
  },
  {
    tone: "yellow",
    title: "Scalable Architecture",
    desc: "Built to grow with your business — flexible, reliable, and efficient.",
    Icon: BoltIcon,
  },
  {
    tone: "navy",
    title: "Human-Centered Design",
    desc: "Interfaces people actually enjoy — clear, accessible, considered.",
    Icon: HeartIcon,
  },
];

const NAVY = "#171C69";
const YELLOW = "#FFC116";

export function MobileCoreValues() {
  const reduce = useReducedMotion();
  const viewport = { once: true, amount: 0.25 };

  return (
    <section
      className="relative bg-white px-4 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20"
      aria-label="Core values"
    >
      <div className="mx-auto grid max-w-[720px] grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
        {CARDS.map((card, i) => (
          <motion.div
            key={card.title}
            initial={reduce ? undefined : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{
              duration: reduce ? 0 : 0.6,
              delay: reduce ? 0 : i * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex flex-col items-center rounded-3xl border border-[#171C69]/10 bg-[#F5F7FE] p-6 text-center shadow-[0_20px_40px_-24px_rgba(23,28,105,0.25)] sm:p-7"
          >
            <div
              className="mb-4 flex h-14 w-14 items-center justify-center rounded-full sm:h-16 sm:w-16"
              style={{
                background: card.tone === "yellow" ? YELLOW : NAVY,
                color: card.tone === "yellow" ? NAVY : "#FAF7FF",
                boxShadow:
                  card.tone === "yellow"
                    ? "0 10px 20px -8px rgba(78, 75, 213, 0.45)"
                    : "0 10px 20px -8px rgba(0, 0, 0, 0.35)",
              }}
            >
              <card.Icon />
            </div>
            <h3
              className="font-[var(--font-red-hat)] text-[17px] font-semibold leading-tight tracking-tight sm:text-lg"
              style={{ color: NAVY }}
            >
              {card.title}
            </h3>
            <p className="mt-2 font-[var(--font-red-hat)] text-sm leading-[1.5] text-[#5A6062]">
              {card.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function EyeIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
function BoltIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
    </svg>
  );
}
function HeartIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21s-7-4.35-9.5-8.5C.4 8 3 4 7 4c2.1 0 3.7 1.1 5 2.7C13.3 5.1 14.9 4 17 4c4 0 6.6 4 4.5 8.5C19 16.65 12 21 12 21z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
