"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Team section — matches Figma node 314:1449 (component set 314:1398).
 *
 * Figma geometry (absolute in Desktop frame at x=1891):
 *   Team-container → x=1930, y=1030, w=1364, h=1024
 *   Frame 76 (bg)   → x=1949, y=1030, w=1313, h=1024, r=72, navy #171A69
 *                    + bg image overlay at 10% opacity, same bounds
 *   our-team-container → y=836 (hidden in Variant 1, reveals in Variant 2)
 *     ├─ "Our Team" (RHD 700, 38/50.27, #E9EBF8)
 *     ├─ "The People Behind the Innovation" (RHD 600, 24/31.75, #FFC116)
 *     └─ description text (white, Light 20/26.46)
 *   team-container  → y=1297, w=870, h=576 (inner content box, centred)
 *     ├─ team2  → 4-col grid (row 1), 46px col-gap, 27px row-gap
 *     └─ Team   → 3-col grid (row 2), 48px col-gap, 27px row-gap
 *
 * Interaction (container): MOUSE_ENTER → SMART_ANIMATE EASE_OUT 0.8s → Variant 2.
 * Variant 1 hides the heading + description; Variant 2 reveals them and slides
 * the team grid into place. On the web we play this as a scroll-into-view
 * reveal (whileInView) so the animation feels organic.
 */

const SECTION = { x: 39, y: 1030, w: 1364, h: 1024 } as const;
// Background card: 1313×1024 with 72px corner radius, inset 19px from section
// left (1949 - 1930 = 19).
const BG = { x: 19, y: 0, w: 1313, h: 1024, radius: 72 } as const;

const NAVY = "#171A69";
// body copy inside the team section uses white-80
const COPY = "rgba(255,255,255,0.8)";

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Member = { name: string; role: string; accent: string };

// Team members — names and roles per Figma team-container (component 314:1398).
// Accent colors are retained from the current card design (avatar gradients).
const ROW1: Member[] = [
  { role: "Team Lead", name: "Fhex", accent: "#8AA7F9" },
  { role: "Cybersecurity", name: "K-Gold", accent: "#FFC116" },
  { role: "Tech lead", name: "PerceptronCipher", accent: "#EA97B9" },
  { role: "Product lead", name: "Travis", accent: "#7BE3B3" },
];

const ROW2: Member[] = [
  { role: "Operations", name: "Emmy", accent: "#F97B7B" },
  { role: "Operations", name: "Emmy", accent: "#B09BFF" },
  { role: "Socials", name: "Renzo", accent: "#FFDC71" },
];

export function TeamSection() {
  const reduce = useReducedMotion();
  const viewport = { once: true, amount: 0.25 };

  const slide = (delay: number) => ({
    initial: reduce ? undefined : { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport,
    transition: {
      duration: reduce ? 0 : 0.8,
      ease: EASE_OUT,
      delay: reduce ? 0 : delay,
    },
  });

  return (
    <section
      aria-label="Team"
      style={{
        position: "absolute",
        left: SECTION.x,
        top: SECTION.y,
        width: SECTION.w,
        height: SECTION.h,
      }}
    >
      {/* Navy rounded card background */}
      <div
        style={{
          position: "absolute",
          left: BG.x,
          top: BG.y,
          width: BG.w,
          height: BG.h,
          borderRadius: BG.radius,
          background: NAVY,
          overflow: "hidden",
          boxShadow: "0 40px 80px -30px rgba(23, 26, 105, 0.45)",
        }}
      >
        {/* Subtle bg image overlay (10% opacity) matching Figma. Uses the
            hero image as a thematic fill until a dedicated asset is provided. */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.1,
            backgroundImage: "url(/figma/hero-image.png)",
            backgroundPosition: "center",
            backgroundSize: "cover",
            mixBlendMode: "screen",
          }}
        />
        {/* Soft radial accents so the navy isn't flat */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 20% 18%, rgba(138,167,249,0.18), transparent 45%)," +
              "radial-gradient(circle at 85% 88%, rgba(255,193,22,0.12), transparent 55%)",
          }}
        />
      </div>

      {/* Heading block — Figma our-team-container (I314:1449;314:1355).
          "Our Team"  → Red Hat Display 700, 38px / 50.27 lh, #E9EBF8
          "The People Behind the Innovation" → RHD 600, 24px / 31.75 lh, #FFC116 */}
      <motion.div
        {...slide(0)}
        style={{
          position: "absolute",
          top: 120,
          left: 0,
          width: SECTION.w,
          textAlign: "center",
        }}
      >
        <h2
          style={{
            margin: 0,
            color: "#E9EBF8",
            fontFamily: "var(--font-red-hat)",
            fontWeight: 700,
            fontSize: 38,
            lineHeight: "50.27px",
            letterSpacing: 0,
          }}
        >
          Our Team
        </h2>
        <div
          style={{
            marginTop: 14,
            color: "#FFC116",
            fontFamily: "var(--font-red-hat)",
            fontWeight: 600,
            fontSize: 24,
            lineHeight: "31.75px",
            letterSpacing: 0,
          }}
        >
          The People Behind the Innovation
        </div>
      </motion.div>

      {/* Description paragraph */}
      <motion.p
        {...slide(0.12)}
        style={{
          position: "absolute",
          top: 240,
          left: (SECTION.w - 926) / 2,
          width: 926,
          margin: 0,
          color: COPY,
          textAlign: "center",
          fontFamily: "var(--font-red-hat)",
          fontWeight: 300,
          fontSize: 20,
          lineHeight: "26.46px",
        }}
      >
        Our team is made up of engineers, designers, and strategists passionate
        about building technology that makes a difference. We collaborate,
        innovate, and push boundaries to deliver exceptional results.
      </motion.p>

      {/* Team grid row 1 (4 columns) */}
      <TeamGrid
        members={ROW1}
        top={360}
        columns={4}
        slide={slide}
        baseDelay={0.22}
      />

      {/* Team grid row 2 (3 columns) */}
      <TeamGrid
        members={ROW2}
        top={680}
        columns={3}
        slide={slide}
        baseDelay={0.4}
      />

      {/* "Get in touch" CTA (Figma BUTTONS, id 245:651). Nudged down from the
          Figma y=938 so it clears row 2 (which ends at 944 in our web layout)
          and still sits comfortably inside the 1024-tall navy card. */}
      <motion.a
        href="#contact"
        {...slide(0.6)}
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.98 }}
        style={{
          position: "absolute",
          top: 962,
          left: (SECTION.w - 277) / 2,
          width: 277,
          height: 45,
          borderRadius: 999,
          background: "linear-gradient(90deg, #8AA7F9, #4E4BD5)",
          color: "#FFFFFF",
          fontFamily: "var(--font-red-hat)",
          fontWeight: 600,
          fontSize: 14,
          letterSpacing: "0.02em",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textDecoration: "none",
          boxShadow:
            "0 14px 30px -10px rgba(78, 75, 213, 0.6), inset 0 1px 0 rgba(255,255,255,0.35)",
        }}
      >
        Get in touch
      </motion.a>
    </section>
  );
}

function TeamGrid({
  members,
  top,
  columns,
  slide,
  baseDelay,
}: {
  members: Member[];
  top: number;
  columns: number;
  slide: (delay: number) => {
    initial: { opacity: number; y: number } | undefined;
    whileInView: { opacity: number; y: number };
    viewport: { once: boolean; amount: number };
    transition: {
      duration: number;
      ease: [number, number, number, number];
      delay: number;
    };
  };
  baseDelay: number;
}) {
  const cardW = 200;
  const cardH = 264;
  const gap = 46;
  const rowW = columns * cardW + (columns - 1) * gap;
  const startX = (SECTION.w - rowW) / 2;

  return (
    <div
      style={{
        position: "absolute",
        top,
        left: startX,
        width: rowW,
        height: cardH,
      }}
    >
      {members.map((m, i) => (
        <motion.div
          key={`${m.name}-${m.role}-${i}`}
          {...slide(baseDelay + i * 0.08)}
          style={{
            position: "absolute",
            left: i * (cardW + gap),
            top: 0,
            width: cardW,
            height: cardH,
          }}
        >
          <TeamCard member={m} />
        </motion.div>
      ))}
    </div>
  );
}

function TeamCard({ member }: { member: Member }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: 28,
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255,0.12)",
        padding: 18,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 14,
        overflow: "hidden",
      }}
    >
      <Avatar name={member.name} accent={member.accent} />
      {/* Card text — Figma 223:336 (role) RHD 500 20/26.46, 223:337 (name) RHD 300 20/26.46 */}
      <div style={{ textAlign: "center", marginTop: 4 }}>
        <div
          style={{
            color: "#FFFFFF",
            fontFamily: "var(--font-red-hat)",
            fontWeight: 500,
            fontSize: 20,
            lineHeight: "26.46px",
          }}
        >
          {member.role}
        </div>
        <div
          style={{
            color: COPY,
            fontFamily: "var(--font-red-hat)",
            fontWeight: 300,
            fontSize: 20,
            lineHeight: "26.46px",
          }}
        >
          {member.name}
        </div>
      </div>
    </div>
  );
}

function Avatar({ name, accent }: { name: string; accent: string }): ReactNode {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
  return (
    <div
      style={{
        width: 140,
        height: 140,
        borderRadius: "50%",
        background: `linear-gradient(160deg, ${accent}, rgba(23,26,105,0.6))`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontFamily: "var(--font-red-hat)",
        fontWeight: 700,
        fontSize: 42,
        letterSpacing: "0.03em",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.25), 0 20px 40px -16px rgba(0,0,0,0.45)",
      }}
      aria-hidden
    >
      {initials}
    </div>
  );
}
