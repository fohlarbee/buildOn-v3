"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { COLORS, LAYOUT, MOTION } from "./constants";

const NAV_LINKS: Record<string, string> = {
  Home: "/",
  About: "#core-values",
  Expertise: "#services",
  Work: "#projects",
  Team: "#team",
};

/**
 * Renders the exact Figma wordmark asset using the same imageTransform the
 * design uses (scaleMode: STRETCH with y-scale 0.458, y-offset 0.289). The
 * image is 1:1 aspect (1024×1024) with the actual wordmark occupying the
 * middle horizontal band — we display only that band, stretched to the 256×80
 * rectangle Figma declares.
 */
function FigmaLogo() {
  const rectW = LAYOUT.nav.logo.w; // 256
  const rectH = LAYOUT.nav.logo.h; // 80
  const yScale = 0.45783135; // from Figma imageTransform
  const yOffset = 0.28915661;

  // If the final strip (0.458 * source height) fills rectH, the full source
  // image rendered at the same width would be rectH / yScale tall.
  const renderedH = rectH / yScale;
  const topShift = -(yOffset * renderedH);

  return (
    <div
      style={{
        position: "absolute",
        left: LAYOUT.nav.logo.x,
        top: LAYOUT.nav.logo.y,
        width: rectW,
        height: rectH,
        overflow: "hidden",
      }}
    >
      <Image
        src="/figma/buildon-logo.png"
        alt="buildON"
        width={rectW}
        height={Math.round(renderedH)}
        priority
        style={{
          position: "absolute",
          left: 0,
          top: topShift,
          width: rectW,
          height: renderedH,
          display: "block",
          userSelect: "none",
          pointerEvents: "none",
        }}
        draggable={false}
      />
    </div>
  );
}

export function NavBar() {
  return (
    <div className="absolute inset-x-0 top-0 h-20">
      <Link href="/" aria-label="buildON — home" className="block">
        <FigmaLogo />
      </Link>

      {/* Nav items (absolute pixel positions from Figma) */}
      <nav aria-label="Main">
        {LAYOUT.nav.items.map((item) => (
          <Link
            key={item.label}
            href={NAV_LINKS[item.label] ?? "/"}
            style={{
              position: "absolute",
              left: item.x,
              top: LAYOUT.nav.itemsY,
              width: item.w,
              height: 21,
              fontFamily: "var(--font-red-hat)",
              fontWeight: 400,
              fontSize: 16,
              lineHeight: "21.168px",
              color: item.dim ? COLORS.navTextDim : COLORS.navText,
            }}
            className="transition-colors duration-200 hover:text-white"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* BTNS group (mail icon + CTA) */}
      <div
        style={{
          position: "absolute",
          left: LAYOUT.nav.btns.x,
          top: LAYOUT.nav.btns.y,
          width: LAYOUT.nav.btns.w,
          height: LAYOUT.nav.btns.h,
          display: "flex",
          alignItems: "center",
          gap: LAYOUT.nav.btns.itemSpacing,
        }}
      >
        <MailButton />
        <CtaButton />
      </div>
    </div>
  );
}

function GlassBorderGradient() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-[12px] p-px"
      style={{
        background:
          "linear-gradient(140deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.1) 100%)",
        WebkitMask:
          "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
      }}
    />
  );
}

function MailButton() {
  return (
    <motion.div
      initial={false}
      whileHover={{ scale: 1.05 }}
      transition={{
        duration: MOTION.mailEaseInMs / 1000,
        ease: [0.42, 0, 1, 1],
      }}
      style={{ width: 45, height: 45 }}
    >
      <Link
        href="mailto:support@buildonhq.org"
        aria-label="Email us"
        className="relative flex h-full w-full items-center justify-center rounded-[12px] overflow-hidden"
        style={{ background: COLORS.buttonBg }}
      >
        <GlassBorderGradient />
        <MailIcon />
      </Link>
    </motion.div>
  );
}

function CtaButton() {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      style={{ width: 257, height: 45 }}
    >
      <Link
        href="https://x.com/buildON_Inc"
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex h-full w-full items-center justify-center rounded-[12px] overflow-hidden"
        style={{ background: COLORS.buttonBg }}
      >
        <GlassBorderGradient />
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[12px]"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.02) 100%)",
          }}
          variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
          transition={{
            duration: MOTION.ctaDissolveMs / 1000,
            ease: [0.42, 0, 0.58, 1],
          }}
        />
        <span
          style={{
            position: "relative",
            fontFamily: "var(--font-red-hat)",
            fontWeight: 400,
            fontSize: 12,
            lineHeight: "15.876px",
            color: COLORS.navText,
          }}
        >
          Get in touch
        </span>
      </Link>
    </motion.div>
  );
}

function MailIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      className="relative"
      aria-hidden
    >
      <path
        d="M11 2.5a8.5 8.5 0 100 17 8.5 8.5 0 000-17z"
        stroke="white"
        strokeWidth="1"
      />
      <path
        d="M6 9l5 3.5L16 9M6 9v5a1 1 0 001 1h8a1 1 0 001-1V9M6 9l5-3 5 3"
        stroke="white"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
