"use client";

import type { ReactElement } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Step = {
  number: string;
  title: string;
  description: string;
  Icon: () => ReactElement;
};

const STEPS: Step[] = [
  {
    number: "01",
    title: "Discover",
    description:
      "We uncover the real problem together — users, metrics, constraints, and opportunity.",
    Icon: SearchIcon,
  },
  {
    number: "02",
    title: "Design",
    description:
      "Concepts become clickable prototypes. We validate early, iterate often, commit confidently.",
    Icon: PenIcon,
  },
  {
    number: "03",
    title: "Develop",
    description:
      "Clean, testable code shipped in small weekly slices — with visibility every step of the way.",
    Icon: CodeIcon,
  },
  {
    number: "04",
    title: "Deliver",
    description:
      "Launch day isn't the end. We measure, refine, and help you scale what's working.",
    Icon: RocketIcon,
  },
];

const NAVY = "#151C66";
const SKY = "#0094EC";
const PROCESS_BLUE = "#0056A1";

export function MobileProcess() {
  const reduce = useReducedMotion();
  const viewport = { once: true, amount: 0.2 };

  const fade = (delay: number) => ({
    initial: reduce ? undefined : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport,
    transition: {
      duration: reduce ? 0 : 0.6,
      delay: reduce ? 0 : delay,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  });

  return (
    <section
      className="relative px-4 py-14 sm:px-6 sm:py-16 md:px-8 md:py-20"
      aria-label="Our process"
    >
      <div className="mx-auto max-w-[720px]">
        <motion.div {...fade(0)} className="mb-8 sm:mb-10">
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="inline-block h-1 w-10 rounded-full"
              style={{ background: SKY }}
            />
            <span
              className="font-[var(--font-red-hat)] text-sm font-bold sm:text-base"
              style={{ color: PROCESS_BLUE, letterSpacing: "0.06em" }}
            >
              OUR PROCESS
            </span>
          </div>
          <h2
            className="mt-4 font-[var(--font-roboto-slab),var(--font-red-hat)] text-3xl font-bold capitalize leading-[1.15] tracking-tight sm:text-[2.25rem]"
            style={{ color: NAVY }}
          >
            A simple yet effective four step process....
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              {...fade(0.1 + i * 0.08)}
              className="relative overflow-hidden rounded-[24px] border border-[#151C66]/10 bg-white p-5 shadow-[0_20px_40px_-24px_rgba(21,28,102,0.2)] sm:p-6"
            >
              <span
                aria-hidden
                className="absolute -right-1 -top-2 font-[var(--font-roboto-slab)] font-bold leading-none"
                style={{
                  fontSize: 72,
                  color: "rgba(21, 28, 102, 0.06)",
                  letterSpacing: "-0.04em",
                }}
              >
                {step.number}
              </span>

              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl text-white sm:h-14 sm:w-14"
                style={{
                  background: `linear-gradient(135deg, ${SKY}, ${PROCESS_BLUE})`,
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.35)",
                }}
              >
                <step.Icon />
              </div>
              <h3
                className="mt-4 font-[var(--font-red-hat)] text-lg font-bold sm:text-xl"
                style={{ color: NAVY }}
              >
                {step.title}
              </h3>
              <p
                className="mt-2 font-[var(--font-red-hat)] text-sm leading-[1.55] sm:text-[15px]"
                style={{ color: "rgba(21, 28, 102, 0.72)" }}
              >
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SearchIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M16 16l4 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
function PenIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 20l4-1 10-10a2.83 2.83 0 10-4-4L4 15v5z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function CodeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 6l-5 6 5 6M16 6l5 6-5 6M14 4l-4 16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function RocketIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M14 4s4 0 5 5c-5 1-5 5-5 5l-6-6s4 0 5-4zM9 15l-4 4M12 18l-3 3M6 12l-3 3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
