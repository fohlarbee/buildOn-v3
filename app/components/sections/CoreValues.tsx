"use client";

import type { ReactElement } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Core Values band — three value cards positioned over the lower half of the
 * hero section. Matches Figma node 314:1284 (component set 314:1252).
 *
 * Figma geometry (absolute, inside Desktop frame at x=1891, y=0):
 *   container  → x=1930, y=769, w=1365, h=162   (clipsContent = true)
 *   card cols  → x=1977 (card 1), 2454 (card 2), 2978 (card 3) — width 270
 *   icon ring  → 65×65 (Variant 2), centred in card
 *
 * Figma prototype animation (container instance):
 *   AFTER_TIMEOUT 0.8s → SMART_ANIMATE EASE_OUT 0.8s  →  Variant 2
 * Variant 1 places the icon + copy ABOVE the clipped band (hidden). Variant 2
 * slides them down into the visible band.
 *
 * Web translation: the band is always in view under the hero, so we play the
 * same reveal on mount (after the hero's own 0.8s delay), keeping the Figma
 * timing — a staggered slide-down with 0.8s ease-out.
 *
 * Note on colors: the hero background is a notched vector (see hero-section-bg
 * in HeroSection.tsx), so the two outer cards sit on the page's white bg while
 * the middle card sits on the dark-blue center tab that hangs down from the
 * hero. Per Figma (component 314:1251), outer cards use navy title (#171C69)
 * + slate description (#5A6062), and the middle card uses pale title
 * (#E6ECFE) + off-white description (#F5F5F5) to read on the dark tab.
 */

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

const SECTION = { x: 39, y: 769, w: 1365, h: 162 } as const;

const CARD_W = 270;
const COLS = [47, 524, 1048] as const;
const CIRCLE = 65;
const CIRCLE_TOP = 4;
const TITLE_TOP = 84;
const DESC_TOP = 116;

const NAVY = "#171C69";
const YELLOW = "#FFC116";
// Per Figma per-tone text fills (component 314:1251)
const TITLE_ON_LIGHT = "#171C69";
const BODY_ON_LIGHT = "#5A6062";
const TITLE_ON_DARK = "#E6ECFE";
const BODY_ON_DARK = "#F5F5F5";

const SLIDE_FROM = -130;
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

// After the hero's container-hover kicks in (MOTION.titleDelayMs = 800ms),
// fire this band so the sequence reads as: hero settles → values slide down.
const START_DELAY_MS = 1100;

export function CoreValues() {
  const reduce = useReducedMotion();

  return (
    <div
      style={{
        position: "absolute",
        left: SECTION.x,
        top: SECTION.y,
        width: SECTION.w,
        height: SECTION.h,
        overflow: "hidden", // matches Figma clipsContent
        zIndex: 5,
      }}
      aria-label="Core values"
    >
      {CARDS.map((card, i) => (
        <CardBlock key={card.title} card={card} index={i} reduce={!!reduce} />
      ))}
    </div>
  );
}

function CardBlock({
  card,
  index,
  reduce,
}: {
  card: Card;
  index: number;
  reduce: boolean;
}) {
  const { Icon } = card;
  const onDark = card.tone === "yellow"; // middle card sits on the hero's dark-blue center tab
  const circleBg = onDark ? YELLOW : NAVY;
  const iconColor = onDark ? NAVY : "#FAF7FF";
  const titleColor = onDark ? TITLE_ON_DARK : TITLE_ON_LIGHT;
  const bodyColor = onDark ? BODY_ON_DARK : BODY_ON_LIGHT;
  const columnX = COLS[index];

  const transition = {
    duration: reduce ? 0 : 0.8,
    ease: EASE_OUT,
    delay: reduce ? 0 : START_DELAY_MS / 1000 + index * 0.12,
  };

  const initial = reduce ? { y: 0, opacity: 1 } : { y: SLIDE_FROM, opacity: 0 };

  return (
    <motion.div
      initial={initial}
      animate={{ y: 0, opacity: 1 }}
      transition={transition}
      style={{
        position: "absolute",
        left: columnX,
        top: 0,
        width: CARD_W,
        height: "100%",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: CIRCLE_TOP,
          left: (CARD_W - CIRCLE) / 2,
          width: CIRCLE,
          height: CIRCLE,
          borderRadius: "50%",
          background: circleBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: iconColor,
          boxShadow:
            card.tone === "yellow"
              ? "0 6.5px 8.125px -4.875px rgba(78, 75, 213, 0.45), 0 16.25px 20.31px -4.06px rgba(78, 75, 213, 0.3)"
              : "0 6.5px 8.125px -4.875px rgba(0, 0, 0, 0.35), 0 16.25px 20.31px -4.06px rgba(0, 0, 0, 0.25)",
        }}
      >
        <Icon />
      </div>

      <h3
        style={{
          position: "absolute",
          top: TITLE_TOP,
          left: 0,
          width: CARD_W,
          margin: 0,
          color: titleColor,
          fontFamily: "var(--font-red-hat)",
          fontWeight: 600,
          fontSize: 20,
          lineHeight: "26.46px",
          textAlign: "center",
          letterSpacing: "-0.01em",
        }}
      >
        {card.title}
      </h3>

      <p
        style={{
          position: "absolute",
          top: DESC_TOP,
          left: 0,
          width: CARD_W,
          margin: 0,
          padding: "0 8px",
          color: bodyColor,
          fontFamily: "var(--font-red-hat)",
          fontWeight: 400,
          fontSize: 12,
          lineHeight: "17px",
          textAlign: "center",
        }}
      >
        {card.desc}
      </p>
    </motion.div>
  );
}

// ─── icons ────────────────────────────────────────────────────────────────
function EyeIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
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
      width="26"
      height="26"
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
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21s-7-4.35-9.5-8.5C.4 8 3 4 7 4c2.1 0 3.7 1.1 5 2.7C13.3 5.1 14.9 4 17 4c4 0 6.6 4 4.5 8.5C19 16.65 12 21 12 21z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
