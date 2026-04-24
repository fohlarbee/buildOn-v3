"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";

/**
 * Projects section — Figma node 257:1094 (Frame 74 / "Projects" pill) +
 * 257:1102 ("Group 4" navy card + carousel component).
 *
 * Figma geometry (absolute):
 *   Projects pill  →  x=2514, y=3016, 180×180, cornerRadius=100
 *                     "Projects" RHD 700 / 36px / 47.63lh / white
 *                     Same navy as card; sits ON TOP of the card.
 *
 *   Navy backdrop  →  x=1956, y=3103, 1312×1103, color #151C66
 *                     Top edge has a semicircular notch centred at the
 *                     pill so the pill visually "hangs" out of the card.
 *   Carousel stage →  x=1968, y=3286, 1288×736 (clipsContent=true,
 *                     inner strip is 6898×743 — 4 panels loop)
 *
 *   Project card text (per panel, e.g. I527:688;486:1035/1036):
 *     Title    → RHD 700 / 60px / 100lh / #FFF (max width 765)
 *     Body     → RHD 400 / 20px / 24.3lh / #FFF (max width 392.6)
 *
 * In Desktop coords (frame x=1891), the projects section spans
 * x=65 (rel) → x=1377 (rel).
 */

const PILL_X = 623; // 2514 - 1891
const SECTION_SHIFT_Y = 1123;
const PILL_Y = 3016 - SECTION_SHIFT_Y;
const PILL_SIZE = 180;

const CARD_X = 65; // 1956 - 1891
const CARD_Y = 3103 - SECTION_SHIFT_Y;
const CARD_W = 1312;
const CARD_H = 1103;

// Pill position relative to card.
const PILL_CENTER_X_IN_CARD = PILL_X + PILL_SIZE / 2 - CARD_X; // 648
const CARD_CORNER = 48;

// Half-ellipse notch cut out of the card's top edge so the circular
// "Projects" pill (PILL_SIZE = 180) nests into it. In Figma the pill's
// vertical centre (y=3106) sits 3px below the card top (y=3103), so the
// card needs to dip ~pill-radius at x = PILL_CENTER_X_IN_CARD. We widen
// the notch a bit beyond the pill for a visible cradle around it.
const NOTCH_HALF_W = 112; // total notch width 224 (pill 180 + 44px cradle)
const NOTCH_DEPTH = 96; // slightly beyond pill radius (90)

const STAGE_X = 77; // 1968 - 1891
const STAGE_Y = 3286 - SECTION_SHIFT_Y;
const STAGE_W = 1288;
const STAGE_H = 736;

const NAVY_CARD = "#151C66";
const NAVY_BORDER = "rgba(255,255,255,0.18)";

// Helper — builds a rounded-rectangle path with a half-ellipse notch cut
// out of the TOP edge. In SVG screen coords the Y axis points DOWN, so the
// arc must use sweep-flag = 0 to curve "down" (into the rectangle); with
// sweep-flag = 1 the arc would bump UPWARDS out of the card instead, which
// is why the previous notch was invisible against the top edge.
function buildNotchPath(
  width: number,
  height: number,
  corner: number,
  notchCenterX: number,
  notchHalfW: number,
  notchDepth: number,
) {
  const notchStart = notchCenterX - notchHalfW;
  const notchEnd = notchCenterX + notchHalfW;
  return (
    `M ${corner},0 ` +
    `L ${notchStart},0 ` +
    `A ${notchHalfW},${notchDepth} 0 0 0 ${notchEnd},0 ` +
    `L ${width - corner},0 ` +
    `Q ${width},0 ${width},${corner} ` +
    `L ${width},${height - corner} ` +
    `Q ${width},${height} ${width - corner},${height} ` +
    `L ${corner},${height} ` +
    `Q 0,${height} 0,${height - corner} ` +
    `L 0,${corner} ` +
    `Q 0,0 ${corner},0 Z`
  );
}

const CARD_PATH = buildNotchPath(
  CARD_W,
  CARD_H,
  CARD_CORNER,
  PILL_CENTER_X_IN_CARD,
  NOTCH_HALF_W,
  NOTCH_DEPTH,
);

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Project = {
  title: string;
  description: string;
  image: string;
};

// Four unique projects used in the projects carousel.
const PROJECTS: Project[] = [
  {
    title: "NextGen Banking Platform",
    description:
      "A secure, scalable fintech platform enabling seamless digital banking and payment solutions.",
    image: "/assets/Banking-platform.png",
  },
  {
    title: "AI Marketing Suite",
    description:
      "An intelligent automation platform that enhances customer engagement through data-driven insights.",
    image: "/assets/Ai-marketing-suite.png",
  },
  {
    title: "Decentralized Crypto Wallet",
    description:
      "A secure blockchain-based wallet with seamless token management and exchange integrations.",
    image: "/assets/Decentralized-crypto-wallet.png",
  },
  {
    title: "Telemedicine Platform",
    description:
      "A modern healthtech solution connecting patients and providers through real-time virtual care.",
    image: "/assets/Telemedicine.png",
  },
];

const AUTO_ADVANCE_MS = 3000;
const TRANSITION_MS = 350;

export function ProjectsSection() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  // Auto-advance: re-scheduled on every index change. A setTimeout keyed to
  // `index` is more reliable than a single setInterval — it always fires
  // 3s after the last slide committed, regardless of StrictMode double
  // mounts or transition timing. Hover-to-pause was removed so the
  // cadence is guaranteed.
  useEffect(() => {
    if (reduce === true) return;
    const t = window.setTimeout(() => {
      setIndex((i) => (i + 1) % PROJECTS.length);
    }, AUTO_ADVANCE_MS);
    return () => window.clearTimeout(t);
  }, [index, reduce]);

  const slideIn = (delay: number, fromY = 40) => ({
    initial: reduce ? undefined : { opacity: 0, y: fromY },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: {
      duration: reduce ? 0 : 0.8,
      ease: EASE_OUT,
      delay: reduce ? 0 : delay,
    },
  });

  return (
    <>
      {/* Navy backdrop + carousel stage (rendered BEFORE pill so the pill
          sits on top of the notch). */}
      <motion.div
        {...slideIn(0.08)}
        style={{
          position: "absolute",
          top: CARD_Y,
          left: CARD_X,
          width: CARD_W,
          height: CARD_H,
          zIndex: 1,
        }}
        aria-label="Featured projects"
      >
        {/* Notched navy card backdrop */}
        <svg
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            display: "block",
            filter:
              "drop-shadow(0 40px 80px rgba(21, 28, 102, 0.55)) drop-shadow(0 10px 30px rgba(0,0,0,0.4))",
          }}
          viewBox={`0 0 ${CARD_W} ${CARD_H}`}
          preserveAspectRatio="none"
        >
          <path d={CARD_PATH} fill={NAVY_CARD} />
        </svg>

        {/* Soft accent glows inside the card */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(600px 400px at 18% 15%, rgba(85,126,246,0.28), transparent 60%)," +
              "radial-gradient(500px 300px at 85% 85%, rgba(255,193,22,0.12), transparent 60%)",
            pointerEvents: "none",
            clipPath: `path("${CARD_PATH}")`,
            WebkitClipPath: `path("${CARD_PATH}")`,
          }}
        />

        {/* Stage — flat rectangle per Figma Frame 16030 (clipsContent: true,
            no notch). Only the outer navy card has the pill-notch. */}
        <div
          style={{
            position: "absolute",
            top: STAGE_Y - CARD_Y,
            left: STAGE_X - CARD_X,
            width: STAGE_W,
            height: STAGE_H,
            overflow: "hidden",
            borderRadius: 48,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={reduce ? false : { x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={reduce ? { opacity: 0 } : { x: -80, opacity: 0 }}
              transition={{
                duration: reduce ? 0 : TRANSITION_MS / 1000,
                ease: EASE_OUT,
              }}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "flex-end",
                padding: "64px 72px",
                color: "#fff",
              }}
            >
              {/* Project image fill */}
              <Image
                src={PROJECTS[index].image}
                alt={PROJECTS[index].title}
                fill
                sizes="1288px"
                priority={index === 0}
                quality={100}
                unoptimized
                style={{ objectFit: "cover" }}
              />
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  gap: 0,
                  maxWidth: 765,
                }}
              >
                {/* Title — Figma RHD 700, 60/100, #FFF */}
                <motion.h3
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.5, ease: EASE_OUT }}
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-red-hat)",
                    fontWeight: 700,
                    fontSize: 60,
                    lineHeight: "100px",
                    letterSpacing: 0,
                    color: "#FFFFFF",
                  }}
                >
                  {PROJECTS[index].title}
                </motion.h3>
                {/* Description — Figma RHD 400, 20/24.3, #FFF (max 392.6) */}
                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.5, ease: EASE_OUT }}
                  style={{
                    margin: 0,
                    maxWidth: 393,
                    fontFamily: "var(--font-red-hat)",
                    fontWeight: 400,
                    fontSize: 20,
                    lineHeight: "24.3px",
                    color: "#FFFFFF",
                  }}
                >
                  {PROJECTS[index].description}
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel dots */}
          <div
            style={{
              position: "absolute",
              bottom: 28,
              right: 40,
              display: "flex",
              gap: 10,
              zIndex: 2,
            }}
          >
            {PROJECTS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show project ${i + 1}`}
                style={{
                  width: i === index ? 28 : 10,
                  height: 10,
                  borderRadius: 999,
                  background: i === index ? "#fff" : "rgba(255,255,255,0.45)",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  transition: "width 0.35s ease, background 0.35s ease",
                }}
              />
            ))}
          </div>
        </div>

        {/* Subtle inner top highlight */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            borderTop: `1px solid ${NAVY_BORDER}`,
            pointerEvents: "none",
            clipPath: `path("${CARD_PATH}")`,
            WebkitClipPath: `path("${CARD_PATH}")`,
          }}
        />
      </motion.div>

      {/* "Projects" circular pill — rendered AFTER the card so it stacks
          above it and "hangs" into the notch. */}
      <motion.div
        {...slideIn(0)}
        whileHover={{ scale: 1.04, y: -4 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        style={{
          position: "absolute",
          top: PILL_Y,
          left: PILL_X,
          width: PILL_SIZE,
          height: PILL_SIZE,
          borderRadius: 100,
          background: NAVY_CARD,
          boxShadow:
            "0 28px 48px -18px rgba(23, 25, 105, 0.55), inset 0 1px 0 rgba(255,255,255,0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "default",
          zIndex: 2,
        }}
        aria-label="Projects label"
      >
        <h2
          style={{
            margin: 0,
            color: "#FFFFFF",
            fontFamily: "var(--font-red-hat)",
            fontWeight: 700,
            fontSize: 36,
            lineHeight: "47.63px",
            letterSpacing: 0,
          }}
        >
          Projects
        </h2>
      </motion.div>
    </>
  );
}
