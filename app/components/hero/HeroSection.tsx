"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import {
  COLORS,
  DESIGN,
  HERO_BG_PATH,
  LAYOUT,
  MOTION,
  TEXT,
} from "./constants";
import { NavBar } from "./NavBar";

/**
 * Positioned section inside the DesktopCanvas at (0, 0), 1440 × 965 design px.
 * This component no longer does its own scaling — the DesktopCanvas handles
 * scaling for the whole page so every section preserves its Figma position.
 */
export function HeroSection() {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: DESIGN.width,
        height: DESIGN.height,
      }}
    >
      <HeroCanvas />
    </div>
  );
}

function HeroCanvas() {
  const reduce = useReducedMotion();
  const containerControls = useAnimationControls();
  const [hovered, setHovered] = useState(false);

  // Entrance sequence: container hover state animates in on mount,
  // matching the Figma MOUSE_ENTER → Variant 2 transition (custom spring).
  useEffect(() => {
    if (reduce) {
      containerControls.set("hover");
      return;
    }
    const t = window.setTimeout(() => {
      containerControls.start("hover");
    }, MOTION.titleDelayMs);
    return () => window.clearTimeout(t);
  }, [containerControls, reduce]);

  const spring = reduce
    ? { duration: 0 }
    : { type: "spring" as const, ...MOTION.heroSpring };

  return (
    <section
      className="relative"
      style={{
        width: DESIGN.width,
        height: DESIGN.height,
        background: "transparent",
        overflow: "hidden",
      }}
      onMouseEnter={() => {
        setHovered(true);
        containerControls.start("hover");
      }}
      onMouseLeave={() => setHovered(false)}
      aria-label="Hero"
    >
      {/*
        Hero background — Figma hero-section-bg is a VECTOR, not a rectangle.
        The shape is a full-width bar that curves in at the bottom, leaving
        two white shelves on the sides and dropping a center tab (≈ x 508–910)
        down to y=932. The outer Core Values cards sit on the page bg; the
        middle card sits on this dark tab.
      */}
      <svg
        aria-hidden
        style={{
          position: "absolute",
          left: LAYOUT.bg.x,
          top: LAYOUT.bg.y,
          width: LAYOUT.bg.w,
          height: LAYOUT.bg.h,
          display: "block",
          overflow: "visible",
        }}
        viewBox={`0 0 ${LAYOUT.bg.w} ${LAYOUT.bg.h}`}
        preserveAspectRatio="none"
      >
        <path d={HERO_BG_PATH} fill={COLORS.bg} />
      </svg>

      {/* Blurred ellipses */}
      <Ellipse
        x={LAYOUT.ellipse7.x}
        y={LAYOUT.ellipse7.y}
        w={LAYOUT.ellipse7.w}
        h={LAYOUT.ellipse7.h}
        blur={LAYOUT.ellipse7.blur}
        fill={COLORS.ellipse7}
      />
      <Ellipse
        x={LAYOUT.ellipse6.x}
        y={LAYOUT.ellipse6.y}
        w={LAYOUT.ellipse6.w}
        h={LAYOUT.ellipse6.h}
        blur={LAYOUT.ellipse6.blur}
        fill={COLORS.ellipse6}
      />
      <Ellipse
        x={LAYOUT.ellipse4.x}
        y={LAYOUT.ellipse4.y}
        w={LAYOUT.ellipse4.w}
        h={LAYOUT.ellipse4.h}
        blur={LAYOUT.ellipse4.blur}
        fill={COLORS.ellipse4}
      />

      {/* Clipped content region matches the 1440×965 frame */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: DESIGN.width, height: DESIGN.height }}
      >
        {/* Hero image (animates from below the viewport up into place) */}
        <motion.div
          initial={{
            x: LAYOUT.heroImage.from.x,
            y: LAYOUT.heroImage.from.y,
          }}
          animate={containerControls}
          variants={{
            hover: { x: LAYOUT.heroImage.to.x, y: LAYOUT.heroImage.to.y },
          }}
          transition={spring}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: LAYOUT.heroImage.w,
            height: LAYOUT.heroImage.h,
          }}
        >
          <Image
            src="/figma/hero-image.png"
            alt=""
            fill
            sizes="1119px"
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Title — its own AFTER_TIMEOUT reveal animation */}
        <TitleOverlay reduce={!!reduce} spring={spring} />

        {/* Left card (Hero-scetin-card) */}
        <motion.div
          initial={{ x: LAYOUT.leftCard.from.x, y: LAYOUT.leftCard.from.y }}
          animate={containerControls}
          variants={{
            hover: { x: LAYOUT.leftCard.to.x, y: LAYOUT.leftCard.to.y },
          }}
          transition={spring}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: LAYOUT.leftCard.w,
            height: LAYOUT.leftCard.h,
          }}
        >
          <LeftCard />
        </motion.div>

        {/* Right card (hero-section-card, glass) */}
        <motion.div
          initial={{ x: LAYOUT.rightCard.from.x, y: LAYOUT.rightCard.from.y }}
          animate={containerControls}
          variants={{
            hover: { x: LAYOUT.rightCard.to.x, y: LAYOUT.rightCard.to.y },
          }}
          transition={spring}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: LAYOUT.rightCard.to.w,
            height: LAYOUT.rightCard.to.h,
          }}
        >
          <RightCard />
        </motion.div>

        {/* Nav sits above everything */}
        <NavBar />
      </div>

      {/* Subtle breathing glow that tracks real cursor hover on the section */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        animate={{ opacity: hovered ? 1 : 0.6 }}
        transition={{
          duration: MOTION.hoverSpringDurationS / 3,
          ease: "easeOut",
        }}
        style={{
          background:
            "radial-gradient(60% 40% at 50% 30%, rgba(120, 150, 255, 0.18) 0%, transparent 70%)",
        }}
      />
    </section>
  );
}

function TitleOverlay({
  reduce,
  spring,
}: {
  reduce: boolean;
  spring: {
    type?: "spring";
    mass?: number;
    stiffness?: number;
    damping?: number;
    duration?: number;
  };
}) {
  return (
    <motion.div
      initial={{
        x: LAYOUT.title.from.x,
        y: LAYOUT.title.from.y,
        scale: LAYOUT.title.from.scale,
        opacity: 0,
      }}
      animate={
        reduce
          ? { x: LAYOUT.title.to.x, y: LAYOUT.title.to.y, scale: 1, opacity: 1 }
          : { x: LAYOUT.title.to.x, y: LAYOUT.title.to.y, scale: 1, opacity: 1 }
      }
      transition={{
        ...spring,
        delay: reduce ? 0 : MOTION.titleDelayMs / 1000,
      }}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: LAYOUT.title.to.w,
        height: LAYOUT.title.to.h,
        transformOrigin: "top left",
      }}
    >
      <h1
        style={{
          margin: 0,
          fontFamily: "var(--font-roboto-slab)",
          fontWeight: 700,
          fontSize: LAYOUT.title.fontSize,
          lineHeight: 1,
          letterSpacing: LAYOUT.title.letterSpacing,
          whiteSpace: "nowrap",
          // Figma gradient fill with COLOR_DODGE blend: near-white → white 2%
          background:
            "linear-gradient(172deg, #F5F5F5 0%, rgba(255,255,255,0.02) 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          color: "transparent",
          mixBlendMode: "color-dodge",
          filter: "drop-shadow(0 2px 20px rgba(255,255,255,0.1))",
        }}
      >
        {TEXT.title}
      </h1>
    </motion.div>
  );
}

function Ellipse({
  x,
  y,
  w,
  h,
  blur,
  fill,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  blur: number;
  fill: string;
}) {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        borderRadius: "50%",
        background: fill,
        filter: `blur(${blur}px)`,
        willChange: "transform",
      }}
    />
  );
}

function LeftCard() {
  return (
    <CardShell
      accent="blue"
      cardX={LAYOUT.leftCard.to.x}
      cardY={LAYOUT.leftCard.to.y}
    >
      <p
        style={{
          margin: 0,
          fontFamily: "var(--font-red-hat)",
          fontWeight: 300,
          fontSize: 16,
          lineHeight: "21.168px",
          color: COLORS.cardText,
        }}
      >
        {
          "Based in Delaware, United States, buildON Inc. is a forward-thinking technology startup focused on turning bold ideas into impactful digital solutions. We partner with businesses at every stage "
        }
        <span style={{ color: COLORS.cardHighlightYellow }}>
          {"from early concept"}
        </span>
        <span style={{ color: COLORS.cardHighlightBlue }}> </span>
        {" to fully deployed platforms ."}
      </p>
    </CardShell>
  );
}

function RightCard() {
  return (
    <CardShell
      accent="yellow"
      cardX={LAYOUT.rightCard.to.x}
      cardY={LAYOUT.rightCard.to.y}
    >
      <p
        style={{
          margin: 0,
          fontFamily: "var(--font-red-hat)",
          fontWeight: 400,
          fontSize: 16,
          lineHeight: "21.168px",
          color: COLORS.cardText,
        }}
      >
        {TEXT.rightCard}
      </p>
    </CardShell>
  );
}

/**
 * Glassmorphic card matching mobile: colored top rail, frosted fill, white
 * border, soft shadow. DesktopCanvas applies `transform: scale(...)` to an
 * ancestor, which in Chrome/Safari neutralizes real `backdrop-filter`
 * sampling of elements outside the transformed subtree. To get a reliable
 * "you can see the astronaut through the glass" effect, we render a
 * blurred clone of the hero image inside the card, aligned to the card's
 * position so it matches the image visible behind it pixel-for-pixel.
 */
function CardShell({
  accent,
  cardX,
  cardY,
  children,
}: {
  accent: "blue" | "yellow";
  cardX: number;
  cardY: number;
  children: React.ReactNode;
}) {
  const isYellow = accent === "yellow";
  const accentColor = isYellow ? "#FFC116" : "#B0C3FB";

  const heroOffsetX = LAYOUT.heroImage.to.x - cardX;
  const heroOffsetY = LAYOUT.heroImage.to.y - cardY;

  return (
    <div className="relative h-full w-full">
      {/* Colored top accent rail (matches mobile GlassCard) */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-5px] left-3 right-3 h-[6px] rounded-t-xl"
        style={{
          background: accentColor,
          boxShadow: `0 0 14px ${accentColor}55`,
        }}
      />

      <div
        className="relative h-full overflow-hidden"
        style={{
          borderRadius: 16,
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow:
            "0 18px 40px -22px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255,255,255,0.15)",
          padding: "22px 24px",
        }}
      >
        {/* Blurred hero-image layer — produces the glass look even when an
            ancestor transform disables real backdrop-filter. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ borderRadius: "inherit", overflow: "hidden" }}
        >
          <img
            src="/figma/hero-image.png"
            alt=""
            aria-hidden
            style={{
              position: "absolute",
              left: heroOffsetX,
              top: heroOffsetY,
              width: LAYOUT.heroImage.w,
              height: LAYOUT.heroImage.h,
              maxWidth: "none",
              objectFit: "cover",
              filter: "blur(28px) saturate(150%)",
              opacity: 0.95,
              transform: "scale(1.12)",
              transformOrigin: "center",
            }}
          />
          {/* Frost tint — soft white wash so the card reads as glass, not photo */}
          <div
            className="absolute inset-0"
            style={{
              background: "rgba(255, 255, 255, 0.06)",
              backdropFilter: "blur(6px) saturate(130%)",
              WebkitBackdropFilter: "blur(6px) saturate(130%)",
            }}
          />
        </div>

        <div className="relative z-[1] h-full">{children}</div>
      </div>
    </div>
  );
}
