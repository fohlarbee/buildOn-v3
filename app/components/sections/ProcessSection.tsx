"use client";

import type { ReactElement } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Our Process section — Figma node 260:1227 (header Frame 38).
 *
 * Figma geometry (absolute):
 *   Header "Frame 38" → x=1958, y=4397, w=515, h=169
 *     ├─ "OUR PROCESS"  → 20px Bold, colour #0056A1, with 47×4 sky-blue
 *     │                   line marker before it (x=1958, y=4410)
 *     └─ "A simple yet effective four\nstep process...."
 *                        → 40px Bold Title case, colour #151C66
 *
 * The four process steps aren't detailed at depth=3 but lie below the
 * heading. We implement a 4-column step grid (Discover → Design →
 * Develop → Deliver) that scrolls into view with a staggered reveal.
 *
 * Section spans x=65..1375 (rel), y=4397..~5000.
 */

const HEADER_X = 67; // 1958 - 1891
const HEADER_Y = 4397;

const STEPS_X = 67;
const STEPS_Y = 4620;
const STEPS_W = 1308;
const STEPS_H = 320;

const NAVY = "#151C66";
const SKY = "#0094EC";
const PROCESS_BLUE = "#0056A1";
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

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

export function ProcessSection() {
  const reduce = useReducedMotion();
  const viewport = { once: true, amount: 0.25 };

  const slide = (delay: number, fromY = 28) => ({
    initial: reduce ? undefined : { opacity: 0, y: fromY },
    whileInView: { opacity: 1, y: 0 },
    viewport,
    transition: {
      duration: reduce ? 0 : 0.7,
      ease: EASE_OUT,
      delay: reduce ? 0 : delay,
    },
  });

  return (
    <>
      {/* Heading block */}
      <motion.div
        {...slide(0)}
        style={{
          position: "absolute",
          top: HEADER_Y,
          left: HEADER_X,
          width: 540,
          height: 169,
        }}
        aria-label="Our Process"
      >
        <div style={{ display: "flex", alignItems: "center", gap: 17 }}>
          <span
            aria-hidden
            style={{
              display: "inline-block",
              width: 47,
              height: 4,
              background: SKY,
              borderRadius: 999,
            }}
          />
          <span
            style={{
              color: PROCESS_BLUE,
              fontFamily: "var(--font-red-hat)",
              fontWeight: 700,
              fontSize: 20,
              lineHeight: "26px",
              letterSpacing: "0.04em",
            }}
          >
            OUR PROCESS
          </span>
        </div>
        <h2
          style={{
            margin: "37px 0 0",
            color: NAVY,
            fontFamily: "var(--font-roboto-slab), var(--font-red-hat)",
            fontWeight: 700,
            fontSize: 40,
            lineHeight: "53px",
            letterSpacing: "-0.01em",
            textTransform: "capitalize",
            maxWidth: 515,
          }}
        >
          A simple yet effective four
          <br />
          step process....
        </h2>
      </motion.div>

      {/* Four-step grid */}
      <div
        style={{
          position: "absolute",
          top: STEPS_Y,
          left: STEPS_X,
          width: STEPS_W,
          height: STEPS_H,
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 28,
        }}
      >
        {STEPS.map((step, i) => (
          <motion.div
            key={step.number}
            {...slide(0.12 + i * 0.1)}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 240, damping: 20 }}
            style={{
              position: "relative",
              background: "#FFFFFF",
              borderRadius: 32,
              padding: "32px 28px",
              border: "1px solid rgba(21, 28, 102, 0.08)",
              boxShadow:
                "0 30px 60px -30px rgba(21, 28, 102, 0.18), 0 6px 14px -8px rgba(21, 28, 102, 0.08)",
              display: "flex",
              flexDirection: "column",
              gap: 18,
              overflow: "hidden",
            }}
          >
            {/* Step number watermark */}
            <span
              aria-hidden
              style={{
                position: "absolute",
                right: 18,
                top: 10,
                fontFamily: "var(--font-roboto-slab)",
                fontWeight: 700,
                fontSize: 80,
                lineHeight: 1,
                color: "rgba(21, 28, 102, 0.06)",
                letterSpacing: "-0.04em",
              }}
            >
              {step.number}
            </span>

            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 16,
                background: `linear-gradient(135deg, ${SKY}, ${PROCESS_BLUE})`,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.35)",
              }}
            >
              <step.Icon />
            </div>
            <div
              style={{
                color: NAVY,
                fontFamily: "var(--font-red-hat)",
                fontWeight: 700,
                fontSize: 22,
                lineHeight: "28px",
              }}
            >
              {step.title}
            </div>
            <div
              style={{
                color: "rgba(21, 28, 102, 0.72)",
                fontFamily: "var(--font-red-hat)",
                fontWeight: 400,
                fontSize: 15,
                lineHeight: "22px",
              }}
            >
              {step.description}
            </div>

            {/* Connector line to next step (except last) */}
            {i < STEPS.length - 1 && (
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: 58,
                  right: -22,
                  width: 28,
                  height: 2,
                  background:
                    "linear-gradient(to right, rgba(0,148,236,0.5), rgba(0,148,236,0))",
                  pointerEvents: "none",
                }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </>
  );
}

// ─── icons ────────────────────────────────────────────────────────────────
function SearchIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
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
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
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
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
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
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
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
