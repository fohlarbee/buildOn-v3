"use client";

import type { ReactElement } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Service = { title: string; description: string; Icon: () => ReactElement };

const SERVICES: Service[] = [
  {
    title: "Fintech",
    description: "Secure payment and platforms.",
    Icon: BrowserIcon,
  },
  {
    title: "Cybersecurity",
    description:
      "Protecting systems and data with advanced security solutions.",
    Icon: PhoneIcon,
  },
  {
    title: "Edtech",
    description: "Interactive and scalable learning platforms.",
    Icon: SparkleIcon,
  },
  {
    title: "Tele-medicine",
    description: "Tele-medicine and research tools.",
    Icon: CloudIcon,
  },
  {
    title: "Cloud computing",
    description: "Flexible and scalable cloud systems.",
    Icon: BrowserIcon,
  },
  {
    title: "Martech",
    description: "Automation, analytics, and engagement tools.",
    Icon: CompassIcon,
  },
  {
    title: "AI & ML",
    description: "Intelligence that ships: automation & analytics.",
    Icon: LayersIcon,
  },
  {
    title: "Blockchain",
    description: "Decentralized systems for trust.",
    Icon: NodeIcon,
  },
  {
    title: "Crypto projects",
    description: "Tokens, wallets, and exchange integrations.",
    Icon: PhoneIcon,
  },
];

const NAVY_DEEP = "#030033";
const NAVY = "#171A69";
const YELLOW = "#FFC116";
const CORNFLOWER = "#557EF6";

export function MobileServices() {
  const reduce = useReducedMotion();
  const viewport = { once: true, amount: 0.1 };

  const fade = (delay: number) => ({
    initial: reduce ? undefined : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport,
    transition: {
      duration: reduce ? 0 : 0.7,
      delay: reduce ? 0 : delay,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  });

  return (
    <section
      id="services"
      className="relative px-4 py-14 sm:px-6 sm:py-16 md:px-8 md:py-20"
      aria-label="Services"
    >
      <div className="mx-auto max-w-[720px]">
        <motion.div {...fade(0)} className="flex flex-col items-start gap-2">
          <span
            className="inline-flex items-center justify-center rounded-2xl border border-white/80 px-4 py-1.5 font-[var(--font-red-hat)] text-sm font-semibold"
            style={{
              background: "rgba(255,193,22,0.2)",
              color: YELLOW,
            }}
          >
            What we do..
          </span>
          <h2
            className="font-[var(--font-red-hat)] text-3xl font-bold leading-tight sm:text-4xl"
            style={{ color: NAVY_DEEP }}
          >
            Our services
          </h2>
        </motion.div>

        <motion.div
          {...fade(0.1)}
          className="relative mt-8 overflow-hidden rounded-[28px] sm:mt-10 sm:rounded-[40px]"
          style={{
            boxShadow: "0 30px 60px -24px rgba(23, 26, 105, 0.35)",
          }}
        >
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage: "url(/figma/hero-image.png)",
              backgroundPosition: "center",
              backgroundSize: "cover",
              filter: "saturate(1.05)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background: "rgba(21, 28, 101, 0.35)",
              backdropFilter: "blur(14px) saturate(130%)",
              WebkitBackdropFilter: "blur(14px) saturate(130%)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 15% 20%, rgba(85,126,246,0.25), transparent 50%)," +
                "radial-gradient(circle at 85% 90%, rgba(255,193,22,0.15), transparent 50%)",
            }}
          />

          <div className="relative grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 sm:gap-5 sm:p-7 md:grid-cols-3 md:gap-6 md:p-8">
            {SERVICES.map((s, i) => (
              <motion.div
                key={`${s.title}-${i}`}
                {...fade(0.15 + i * 0.05)}
                className="flex flex-col items-start gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 text-white backdrop-blur-sm sm:p-5"
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-white sm:h-11 sm:w-11"
                  style={{
                    background: `linear-gradient(135deg, ${CORNFLOWER}, ${NAVY})`,
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.35)",
                  }}
                >
                  <s.Icon />
                </div>
                <div className="font-[var(--font-red-hat)] text-base font-bold text-[#FAF7FF] sm:text-[17px]">
                  {s.title}
                </div>
                <div className="font-[var(--font-red-hat)] text-xs leading-[1.5] text-[#F5F5F5]/90 sm:text-sm">
                  {s.description}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function BrowserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3"
        y="4"
        width="18"
        height="16"
        rx="2.2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M3 8h18M7 6h.01M10 6h.01"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="7"
        y="2"
        width="10"
        height="20"
        rx="2.4"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M11 18h2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
function SparkleIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2l1.8 5.4L19 9l-5.2 1.6L12 16l-1.8-5.4L5 9l5.2-1.6L12 2z" />
      <path d="M19 14l.8 2L22 17l-2.2 1L19 20l-.8-2L16 17l2.2-1L19 14z" />
    </svg>
  );
}
function CloudIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 17h10a4 4 0 1 0-1-7.87A5.5 5.5 0 0 0 5 11a4 4 0 0 0 2 6z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function CompassIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M15 9l-4 2-2 4 4-2 2-4z" fill="currentColor" />
    </svg>
  );
}
function LayersIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3l9 4.5L12 12 3 7.5 12 3z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M3 12.5l9 4.5 9-4.5M3 17l9 4.5 9-4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function NodeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="5" cy="12" r="2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="19" cy="5" r="2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="19" cy="19" r="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7 11l10-5M7 13l10 5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
