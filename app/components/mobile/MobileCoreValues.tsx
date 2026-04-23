"use client";

import type { ReactElement } from "react";
import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Card = {
  tone: "navy" | "yellow";
  title: string;
  desc: string;
  Icon: () => ReactElement;
};

/** Narrative order for tablet+ grid (matches desktop story). */
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

/**
 * Mobile carousel order: lead with Scalable Architecture, then Vision, then Human.
 * Pyramid layout: active index = apex (center); (active+1) → bottom-right, (active-1) → bottom-left.
 */
const MOBILE_SEQUENCE: Card[] = [CARDS[1], CARDS[0], CARDS[2]];

const NAVY = "#171C69";
const YELLOW = "#FFC116";

/** Mobile pyramid: shorter card; width comes from inset stage (never flush to screen). */
const MOBILE_CARD_H = "clamp(13.25rem, 34vw, 14.75rem)" as const;

type PyramidRole = "center" | "left" | "right";

function pyramidRole(cardIndex: number, activeIndex: number): PyramidRole {
  const d = (cardIndex - activeIndex + 3) % 3;
  if (d === 0) return "center";
  if (d === 1) return "right";
  return "left";
}

/** Paint order: right wing, then left wing, then center — so the featured card is always on top. */
function pyramidPaintOrder(activeIndex: number): number[] {
  return [0, 1, 2].sort((a, b) => {
    const ra = pyramidRole(a, activeIndex);
    const rb = pyramidRole(b, activeIndex);
    if (ra === "center") return 1;
    if (rb === "center") return -1;
    if (ra === "right" && rb === "left") return -1;
    if (ra === "left" && rb === "right") return 1;
    return a - b;
  });
}

export function MobileCoreValues() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const viewport = { once: true, amount: 0.25 };

  const spring = useMemo(
    () =>
      reduce
        ? { duration: 0 }
        : { type: "spring" as const, stiffness: 300, damping: 28, mass: 0.85 },
    [reduce],
  );

  const activeTitle = MOBILE_SEQUENCE[active]?.title ?? "";

  function goNext() {
    setActive((i) => (i + 1) % MOBILE_SEQUENCE.length);
  }

  return (
    <section
      className="relative z-20 -mt-[clamp(4rem,14vw,7rem)] max-sm:overflow-x-clip bg-transparent px-4 pb-12 pt-0 sm:-mt-24 sm:px-6 sm:pb-14 md:-mt-28 md:px-10 md:pb-16"
      aria-label="Core values"
    >
      <div className="mx-auto max-w-[720px]">
        {/* Mobile: triangular deck — width from content box (`--cv-card-w`), no `100vw` / full-bleed */}
        <div
          className="mx-auto hidden w-full max-sm:px-3 max-sm:flex max-sm:justify-center sm:hidden"
          aria-roledescription="carousel"
        >
          <div className="relative mx-auto min-h-[min(25rem,44svh)] w-full max-w-[min(15rem,calc(100%-2rem))] px-2 pb-[clamp(4.5rem,12svh,6.5rem)]">
            <p className="sr-only" aria-live="polite">
              Featured value: {activeTitle}
            </p>
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[62%] bg-[radial-gradient(ellipse_85%_70%_at_50%_0%,rgba(255,255,255,0.14),transparent_72%)]" />

            {pyramidPaintOrder(active).map((idx) => {
              const card = MOBILE_SEQUENCE[idx];
              const role = pyramidRole(idx, active);
              const isCenter = role === "center";

              return (
                <div
                  key={card.title}
                  className="absolute left-1/2 top-0 w-full max-w-full -translate-x-1/2 overflow-visible"
                >
                  <motion.article
                    role="group"
                    aria-label={card.title}
                    tabIndex={isCenter ? 0 : -1}
                    aria-current={isCenter ? "true" : undefined}
                    className={`pointer-events-auto relative box-border flex w-full max-w-full shrink-0 flex-col rounded-3xl border text-center shadow-[0_24px_56px_-14px_rgba(15,23,72,0.42)] backdrop-blur-md backdrop-saturate-150 supports-backdrop-filter:bg-white/82 ${
                      isCenter
                        ? "border-white/45 bg-white/95 shadow-[0_28px_64px_-12px_rgba(15,23,72,0.48)]"
                        : "border-white/28 bg-white/88"
                    } ${!isCenter ? "cursor-pointer" : ""}`}
                    style={{
                      transformOrigin: "50% 0%",
                      height: MOBILE_CARD_H,
                      minHeight: MOBILE_CARD_H,
                      maxHeight: MOBILE_CARD_H,
                    }}
                    initial={
                      reduce
                        ? false
                        : {
                            x: 0,
                            y: 24,
                            scale: 1,
                            opacity: 0,
                            rotate: idx === 0 ? 0 : idx === 1 ? 3 : -3,
                            zIndex: 10,
                          }
                    }
                    animate={{
                      x:
                        role === "center"
                          ? 0
                          : role === "left"
                            ? "-24%"
                            : "24%",
                      y: role === "center" ? 16 : 120,
                      scale: 1,
                      rotate: role === "center" ? 0 : role === "left" ? -3 : 3,
                      opacity: 1,
                      zIndex:
                        role === "center" ? 50 : role === "left" ? 20 : 15,
                    }}
                    transition={reduce ? { duration: 0 } : spring}
                    onClick={() => {
                      if (!isCenter) setActive(idx);
                    }}
                  >
                    <div className="flex h-full min-h-0 w-full min-w-0 max-w-full flex-col px-4 pb-4 pt-4 text-center">
                      <div
                        className="mx-auto mb-3 flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                        style={{
                          background: card.tone === "yellow" ? YELLOW : NAVY,
                          color: card.tone === "yellow" ? NAVY : "#FAF7FF",
                          boxShadow:
                            card.tone === "yellow"
                              ? "0 10px 20px -8px rgba(78, 75, 213, 0.45)"
                              : "0 10px 20px -8px rgba(0, 0, 0, 0.35)",
                        }}
                      >
                        <card.Icon />
                      </div>
                      <h3
                        className="line-clamp-2 min-h-[2.875rem] w-full min-w-0 shrink-0 break-words font-[var(--font-red-hat)] text-[15px] font-semibold leading-snug tracking-tight"
                        style={{ color: NAVY }}
                      >
                        {card.title}
                      </h3>
                      <div className="mt-2 flex min-h-0 w-full min-w-0 flex-1 flex-col">
                        <p className="line-clamp-6 min-h-0 w-full min-w-0 flex-1 overflow-hidden break-words font-[var(--font-red-hat)] text-[12.5px] leading-snug text-[#5A6062]">
                          {card.desc}
                        </p>
                      </div>
                    </div>
                  </motion.article>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tablet+: original grid order */}
        <div
          className="max-sm:hidden grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-6"
          role="list"
          aria-label="Core values"
        >
          {CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              role="listitem"
              initial={
                reduce
                  ? undefined
                  : {
                      opacity: 0,
                      scale: 0.94,
                      y: 22,
                      rotate: i === 1 ? 0 : i === 0 ? -1.5 : 1.5,
                    }
              }
              whileInView={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
              viewport={viewport}
              transition={
                reduce
                  ? { duration: 0 }
                  : {
                      type: "spring",
                      stiffness: 380,
                      damping: 28,
                      delay: i * 0.09,
                    }
              }
              className="flex flex-col items-center rounded-3xl border border-white/35 bg-white/90 p-6 text-center shadow-[0_24px_56px_-14px_rgba(15,23,72,0.42)] backdrop-blur-md backdrop-saturate-150 sm:p-7 md:shadow-[0_28px_60px_-16px_rgba(15,23,72,0.38)] supports-backdrop-filter:bg-white/82"
            >
              <motion.div
                initial={reduce ? undefined : { scale: 0.85, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={viewport}
                transition={
                  reduce
                    ? { duration: 0 }
                    : {
                        type: "spring",
                        stiffness: 400,
                        damping: 22,
                        delay: 0.15 + i * 0.06,
                      }
                }
                className="mb-4 flex h-14 w-14 items-center justify-center rounded-full sm:h-16 sm:w-16"
                style={{
                  background: card.tone === "yellow" ? YELLOW : NAVY,
                  color: card.tone === "yellow" ? NAVY : "#FAF7FF",
                  boxShadow:
                    card.tone === "yellow"
                      ? "0 10px 20px -8px rgba(78, 75, 213, 0.45)"
                      : "0 10px 20px -8px rgba(0, 0, 0, 0.35)",
                }}
              >
                <card.Icon />
              </motion.div>
              <h3
                className="font-[var(--font-red-hat)] text-[17px] font-semibold leading-tight tracking-tight sm:text-lg"
                style={{ color: NAVY }}
              >
                {card.title}
              </h3>
              <p className="mt-2 font-[var(--font-red-hat)] text-sm leading-[1.5] text-[#5A6062]">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 flex flex-col items-center gap-3 sm:hidden">
          <div
            className="flex items-center gap-2"
            role="group"
            aria-label="Choose featured core value"
          >
            {MOBILE_SEQUENCE.map((c, i) => (
              <button
                key={c.title}
                type="button"
                aria-current={i === active ? true : undefined}
                aria-label={`Show ${c.title}`}
                onClick={() => setActive(i)}
                className="rounded-full transition-all duration-300 ease-out motion-reduce:transition-none"
                style={{
                  width: i === active ? 28 : 8,
                  height: 8,
                  backgroundColor: i === active ? NAVY : `${NAVY}33`,
                  boxShadow: i === active ? `0 0 0 2px ${YELLOW}55` : undefined,
                }}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={goNext}
            className="inline-flex items-center gap-2 rounded-full border border-[#171C69]/15 bg-white/90 px-4 py-2 font-[var(--font-red-hat)] text-xs font-semibold text-[#171C69] shadow-md backdrop-blur-sm active:scale-[0.98] motion-safe:transition-transform"
            style={{ color: NAVY }}
            aria-label="Show next core value"
          >
            <span
              aria-hidden
              className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#171C69]/20 text-[10px] text-[#171C69]"
            >
              →
            </span>
            Next value
          </button>
        </div>
      </div>
    </section>
  );
}

function EyeIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
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
      width="24"
      height="24"
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
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21s-7-4.35-9.5-8.5C.4 8 3 4 7 4c2.1 0 3.7 1.1 5 2.7C13.3 5.1 14.9 4 17 4c4 0 6.6 4 4.5 8.5C19 16.65 12 21 12 21z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
