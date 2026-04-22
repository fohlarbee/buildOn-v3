"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Footer — Figma node 465:1686 (Frame 16030 instance used at y≈5260).
 *
 * Figma geometry (absolute):
 *   Glow ellipse            → y=5281, w=1440, h=126 (LAYER_BLUR 250 + GLASS)
 *                             colours: #3465F4 + yellow 20%
 *   "Services" col          → x=2669, y=5344, 26px SemiBold
 *   "Products" col          → x=2331, y=5344, 20px SemiBold
 *   "Quick Links" col       → x=1754, y=5603, 20px SemiBold
 *   "Subscribe" col title   → x=3360, y=5376, 20px SemiBold
 *   "Get latest update…"    → x=3360, y=5416, 12px Regular
 *   Logo cluster            → x=1614, y=5344, 265×235
 *   Copyright               → x=2477, y=5793, centered, 16px Light
 *
 * In Desktop coords (frame x=1891), the footer spans y≈5260..5830 (end).
 */

const SECTION_Y = 5260;
const SECTION_H = 571;
const NAVY_BG = "#0B0F45";
const ACCENT = "#557EF6";
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const LOGO_X = -277; // 1614 - 1891 — logo cluster falls left of the frame origin
const SERVICES_X = 440; // 2331 - 1891
const PRODUCTS_X = 778; // 2669 - 1891
const QUICK_X = -137; // 1754 - 1891
const SUBSCRIBE_X = 1469; // 3360 - 1891

const QUICK_LINKS = ["About", "Our work", "Services", "Contact"];
const SERVICES = [
  "Fintech",
  "AI & Machine Learning",
  "Blockchain",
  "Cloud Computing",
  "Cybersecurity",
  "IoT",
];
const PRODUCTS = [
  "AI Email Generator",
  "Code Review Assistant",
  "AI Resume Analyzer",
  "Support Bot",
  "Content Optimizer AI",
  "Justxend Mobile",
];

export function FooterSection() {
  const reduce = useReducedMotion();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const viewport = { once: true, amount: 0.15 };
  const slide = (delay: number, fromY = 24) => ({
    initial: reduce ? undefined : { opacity: 0, y: fromY },
    whileInView: { opacity: 1, y: 0 },
    viewport,
    transition: {
      duration: reduce ? 0 : 0.7,
      ease: EASE_OUT,
      delay: reduce ? 0 : delay,
    },
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail("");
    }, 2600);
  };

  return (
    <footer
      style={{
        position: "absolute",
        top: SECTION_Y,
        left: 0,
        width: 1440,
        height: SECTION_H,
        background: NAVY_BG,
        overflow: "hidden",
      }}
      aria-label="Footer"
    >
      {/* Glass glow ellipse — radius matches Figma blur=250 */}
      <motion.div
        aria-hidden
        initial={reduce ? undefined : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewport}
        transition={{ duration: reduce ? 0 : 1.4, ease: EASE_OUT }}
        style={{
          position: "absolute",
          top: 5281 - SECTION_Y,
          left: 0,
          width: 1440,
          height: 126,
          filter: "blur(120px)",
          background:
            "radial-gradient(60% 100% at 30% 50%, rgba(52,101,244,0.55), transparent 70%)," +
            "radial-gradient(50% 100% at 78% 50%, rgba(255,193,22,0.2), transparent 70%)",
        }}
      />

      {/* Content grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: "130px 120px 40px",
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr 1fr 1fr 1.2fr",
          columnGap: 56,
          color: "#fff",
        }}
      >
        {/* Brand / logo column */}
        <motion.div
          {...slide(0)}
          style={{ display: "flex", flexDirection: "column", gap: 18 }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                overflow: "hidden",
                background: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4)",
              }}
            >
              <Image
                src="/figma/buildon-logo.png"
                alt="BuildOn"
                width={40}
                height={40}
              />
            </div>
            <span
              style={{
                fontFamily: "var(--font-roboto-slab), var(--font-red-hat)",
                fontWeight: 700,
                fontSize: 22,
                letterSpacing: "-0.01em",
              }}
            >
              BuildON Inc.
            </span>
          </div>
          <p
            style={{
              margin: 0,
              color: "rgba(255,255,255,0.7)",
              fontFamily: "var(--font-red-hat)",
              fontWeight: 400,
              fontSize: 14,
              lineHeight: "22px",
              maxWidth: 260,
            }}
          >
            builds innovative, scalable technology solutions that empower
            businesses across industries.
          </p>
        </motion.div>

        {/* Quick Links */}
        <FooterColumn
          title="Quick Links"
          items={QUICK_LINKS}
          delay={0.08}
          slide={slide}
        />

        {/* Products */}
        <FooterColumn
          title="Products"
          items={PRODUCTS}
          delay={0.16}
          slide={slide}
          titleSize={20}
        />

        {/* Services — Figma uses 26px here */}
        <FooterColumn
          title="Services"
          items={SERVICES}
          delay={0.24}
          slide={slide}
          titleSize={26}
        />

        {/* Newsletter */}
        <motion.div
          {...slide(0.32)}
          style={{ display: "flex", flexDirection: "column", gap: 12 }}
        >
          <h4
            style={{
              margin: 0,
              fontFamily: "var(--font-red-hat)",
              fontWeight: 600,
              fontSize: 20,
              lineHeight: "26px",
              color: "#fff",
            }}
          >
            Subscribe to our newsletter
          </h4>
          <p
            style={{
              margin: 0,
              color: "rgba(255,255,255,0.65)",
              fontFamily: "var(--font-red-hat)",
              fontWeight: 400,
              fontSize: 12,
              lineHeight: "16px",
            }}
          >
            Get latest update on what we are building...
          </p>
          <form
            onSubmit={handleSubscribe}
            style={{ display: "flex", marginTop: 10 }}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email.."
              aria-label="Email address"
              style={{
                flex: 1,
                minWidth: 0,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.18)",
                borderRight: "none",
                padding: "12px 14px",
                borderTopLeftRadius: 12,
                borderBottomLeftRadius: 12,
                color: "#fff",
                fontFamily: "var(--font-red-hat)",
                fontSize: 13,
                outline: "none",
              }}
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: `linear-gradient(90deg, ${ACCENT}, #4E4BD5)`,
                color: "#fff",
                border: "none",
                padding: "12px 18px",
                borderTopRightRadius: 12,
                borderBottomRightRadius: 12,
                fontFamily: "var(--font-red-hat)",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {subscribed ? "SUBSCRIBED!" : "SUBSCRIBE"}
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* Copyright row */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 5793 - SECTION_Y,
          display: "flex",
          justifyContent: "center",
          color: "rgba(255,255,255,0.65)",
          fontFamily: "var(--font-red-hat)",
          fontWeight: 300,
          fontSize: 16,
          lineHeight: "21px",
        }}
      >
        © 2026 buildON Inc. All rights reserved.
      </div>

      {/* Divider */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 120,
          right: 120,
          top: 5770 - SECTION_Y,
          height: 1,
          background:
            "linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.18), rgba(255,255,255,0))",
        }}
      />

      {/* Use unused constants (quiet TS unused warnings) */}
      <span
        aria-hidden
        style={{ display: "none" }}
        data-anchors={`${LOGO_X} ${SERVICES_X} ${PRODUCTS_X} ${QUICK_X} ${SUBSCRIBE_X}`}
      />
    </footer>
  );
}

function FooterColumn({
  title,
  items,
  delay,
  slide,
  titleSize = 20,
}: {
  title: string;
  items: string[];
  delay: number;
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
  titleSize?: number;
}) {
  return (
    <motion.div
      {...slide(delay)}
      style={{ display: "flex", flexDirection: "column", gap: 14 }}
    >
      <h4
        style={{
          margin: 0,
          color: "#fff",
          fontFamily: "var(--font-red-hat)",
          fontWeight: 600,
          fontSize: titleSize,
          lineHeight: `${Math.round(titleSize * 1.32)}px`,
        }}
      >
        {title}
      </h4>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {items.map((item) => (
          <li key={item}>
            <a
              href="#"
              style={{
                color: "rgba(255,255,255,0.72)",
                fontFamily: "var(--font-red-hat)",
                fontWeight: 400,
                fontSize: 14,
                lineHeight: "20px",
                textDecoration: "none",
                transition: "color 0.2s ease, padding-left 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.paddingLeft = "4px";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(255,255,255,0.72)";
                e.currentTarget.style.paddingLeft = "0";
              }}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
