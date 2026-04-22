"use client";

import type { ReactElement, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Services section — matches Figma nodes 248:681 (services-text header) and
 * 248:657 (services card with items).
 *
 * Figma geometry:
 *   services-text  → x=2507, y=2154, w=210, h=88  (top-right area)
 *     ├─ "What we do.." pill (yellow-20%, 136×34, 16px SemiBold, corner 16)
 *     └─ "Our services"    (36px Bold, 210×48, navy #030033)
 *
 *   services card  → x=2007, y=2278, w=1210, h=640, corner=64
 *     ├─ image bg  (unsplash fill, cornerRadius 64)
 *     └─ bg frame  (rgba(21,28,101,0.3) + GLASS effect)
 *         ├─ services-items  → y=2371, w=1061, h=178, 4 cols, gap 43
 *         └─ Frame 73        → y=2618, w=813,  h=178, 3 cols, gap 35
 *
 * In Desktop coords (frame x=1891), section spans x=116 → x=1326.
 *
 * Animation: no explicit prototype reaction on this frame in the Figma file,
 * so we mirror the site-wide pattern (scroll-into-view reveal with the same
 * 0.8s ease-out used elsewhere). Header slides up first, then card fades in,
 * then items stagger in.
 */

const SECTION_X = 116; // 2007 - 1891
const HEADER_X = 616; // 2507 - 1891 (relative to canvas x=0)
const HEADER_Y = 2154;
const HEADER_W = 210;
const HEADER_H = 88;

const CARD_X = 116;
const CARD_Y = 2278;
const CARD_W = 1210;
const CARD_H = 640;
const CARD_RADIUS = 64;

const NAVY_DEEP = "#030033";
const NAVY = "#171A69";
const NAVY_OVERLAY = "rgba(21, 28, 101, 0.30)";
const YELLOW = "#FFC116";
const CORNFLOWER = "#557EF6";

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Service = { title: string; description: string; Icon: () => ReactElement };

const ROW1: Service[] = [
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
    description: "Interactive and Scalable learning platform.",
    Icon: SparkleIcon,
  },
  {
    title: "Tele-medicine",
    description: "Tele-medicine and research tools.",
    Icon: CloudIcon,
  },
  {
    title: "Coud computing",
    description:
      "Flexible and scalable cloud system for modern digital operations.",
    Icon: BrowserIcon,
  },
];

const ROW2: Service[] = [
  {
    title: "Martech",
    description: "Automation,Analytics,and engagement tools.",
    Icon: CompassIcon,
  },
  {
    title: "AI & Machine Learning",
    description: "Automation,Analytics,and engagement tools.",
    Icon: LayersIcon,
  },
  {
    title: "Blockchain",
    description: "Decentralized systems for trust.",
    Icon: NodeIcon,
  },
  {
    title: "Crypto projects",
    description: "Tokens, Wallets and exchange intergrations.",
    Icon: PhoneIcon,
  },
];

export function ServicesSection() {
  const reduce = useReducedMotion();
  const viewport = { once: true, amount: 0.2 };

  const slide = (delay: number, fromY = 32) => ({
    initial: reduce ? undefined : { opacity: 0, y: fromY },
    whileInView: { opacity: 1, y: 0 },
    viewport,
    transition: {
      duration: reduce ? 0 : 0.8,
      ease: EASE_OUT,
      delay: reduce ? 0 : delay,
    },
  });

  return (
    <>
      {/* Header (What we do.. + Our services) */}
      <motion.div
        {...slide(0)}
        style={{
          position: "absolute",
          top: HEADER_Y,
          left: HEADER_X,
          width: HEADER_W,
          height: HEADER_H,
        }}
        aria-label="Services header"
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 136,
            height: 34,
            background: "rgba(255,193,22,0.2)",
            border: "1px solid #F5F5F5",
            borderRadius: 16,
            padding: 0,
            color: YELLOW,
            fontFamily: "var(--font-red-hat)",
            fontWeight: 600,
            fontSize: 16,
            lineHeight: "21.17px",
            letterSpacing: 0,
          }}
        >
          What we do..
        </div>
        <h2
          style={{
            margin: "6px 0 0",
            color: NAVY_DEEP,
            fontFamily: "var(--font-red-hat)",
            fontWeight: 700,
            fontSize: 36,
            lineHeight: "47.63px",
            letterSpacing: 0,
            whiteSpace: "nowrap",
          }}
        >
          Our services
        </h2>
      </motion.div>

      {/* Services glass card */}
      <motion.div
        {...slide(0.12)}
        style={{
          position: "absolute",
          top: CARD_Y,
          left: CARD_X,
          width: CARD_W,
          height: CARD_H,
          borderRadius: CARD_RADIUS,
          overflow: "hidden",
          isolation: "isolate",
          boxShadow:
            "0 40px 80px -30px rgba(23, 26, 105, 0.35), 0 10px 30px -15px rgba(0,0,0,0.25)",
        }}
        aria-label="Services"
      >
        {/* Image background */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url(/figma/hero-image.png)",
            backgroundPosition: "center",
            backgroundSize: "cover",
            filter: "saturate(1.05)",
          }}
        />
        {/* Navy 30% + glass blur overlay */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: NAVY_OVERLAY,
            backdropFilter: "blur(14px) saturate(130%)",
            WebkitBackdropFilter: "blur(14px) saturate(130%)",
          }}
        />
        {/* Soft accent wash */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 15% 20%, rgba(85,126,246,0.25), transparent 45%)," +
              "radial-gradient(circle at 90% 85%, rgba(255,193,22,0.14), transparent 45%)",
          }}
        />

        {/* Inner content: title row + two rows of service chips */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            padding: "70px 90px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 48,
          }}
        >
          {/* Row 1: 4 cards */}
          <ServiceRow services={ROW1} baseDelay={0.28} slide={slide} />
          {/* Row 2: 3 cards */}
          <ServiceRow services={ROW2} baseDelay={0.44} slide={slide} />
        </div>
      </motion.div>
    </>
  );
}

function ServiceRow({
  services,
  baseDelay,
  slide,
}: {
  services: Service[];
  baseDelay: number;
  slide: (
    delay: number,
    fromY?: number,
  ) => {
    initial: { opacity: number; y: number } | undefined;
    whileInView: { opacity: number; y: number };
    viewport: { once: boolean; amount: number };
    transition: {
      duration: number;
      ease: [number, number, number, number];
      delay: number;
    };
  };
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 32,
        width: "100%",
        justifyContent: "center",
        flexWrap: "nowrap",
      }}
    >
      {services.map((s, i) => (
        <motion.div
          key={s.title}
          {...slide(baseDelay + i * 0.08, 24)}
          whileHover={{ y: -4, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
          style={{ flex: "1 1 0", maxWidth: 240 }}
        >
          <ServiceCard service={s} />
        </motion.div>
      ))}
    </div>
  );
}

function ServiceCard({ service }: { service: Service }): ReactNode {
  const { Icon } = service;
  return (
    <div
      style={{
        width: "100%",
        minHeight: 178,
        borderRadius: 28,
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.14)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        padding: "26px 22px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 18,
        color: "#fff",
        cursor: "pointer",
        transition: "background 0.3s ease",
      }}
    >
      <div
        style={{
          width: 46,
          height: 46,
          borderRadius: 14,
          background: `linear-gradient(135deg, ${CORNFLOWER}, ${NAVY})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.35)",
        }}
      >
        <Icon />
      </div>
      <div
        style={{
          fontFamily: "var(--font-red-hat)",
          fontWeight: 700,
          fontSize: 18,
          lineHeight: "23.814px",
          letterSpacing: 0,
          color: "#FAF7FF",
          width: "100%",
          textAlign: "center",
        }}
      >
        {service.title}
      </div>
      <div
        style={{
          fontFamily: "var(--font-red-hat)",
          fontWeight: 400,
          fontSize: 14,
          lineHeight: "18.522px",
          color: "#F5F5F5",
          width: "100%",
          textAlign: "center",
        }}
      >
        {service.description}
      </div>
    </div>
  );
}

// ─── icons ────────────────────────────────────────────────────────────────
function BrowserIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
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
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
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
      width="22"
      height="22"
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
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
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
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M15 9l-4 2-2 4 4-2 2-4z" fill="currentColor" />
    </svg>
  );
}
function LayersIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
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
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="5" cy="12" r="2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="19" cy="5" r="2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="19" cy="19" r="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7 11l10-5M7 13l10 5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
