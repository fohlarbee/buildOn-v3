"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const NAVY_BG = "#0B0F45";
const ACCENT = "#557EF6";

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

export function MobileFooter() {
  const reduce = useReducedMotion();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const viewport = { once: true, amount: 0.1 };
  const fade = (delay: number) => ({
    initial: reduce ? undefined : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport,
    transition: {
      duration: reduce ? 0 : 0.6,
      delay: reduce ? 0 : delay,
      ease: [0.16, 1, 0.3, 1] as const,
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
      className="relative overflow-hidden px-4 pb-10 pt-12 sm:px-6 sm:pb-12 sm:pt-14 md:px-8 md:pb-14 md:pt-16"
      style={{ background: NAVY_BG }}
      aria-label="Footer"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-32"
        style={{
          background:
            "radial-gradient(60% 100% at 30% 50%, rgba(52,101,244,0.45), transparent 70%)," +
            "radial-gradient(50% 100% at 78% 50%, rgba(255,193,22,0.18), transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative mx-auto max-w-[720px] text-white">
        {/* Brand block */}
        <motion.div {...fade(0)} className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-white">
              <Image
                src="/figma/buildon-logo.png"
                alt="BuildOn"
                width={40}
                height={40}
              />
            </div>
            <span
              className="font-[var(--font-roboto-slab),var(--font-red-hat)] text-xl font-bold"
              style={{ letterSpacing: "-0.01em" }}
            >
              BuildON Inc.
            </span>
          </div>
          <p
            className="max-w-[50ch] font-[var(--font-red-hat)] text-sm leading-[1.6]"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            builds innovative, scalable technology solutions that empower
            businesses across industries.
          </p>
        </motion.div>

        {/* Newsletter */}
        <motion.div
          {...fade(0.1)}
          className="mt-8 flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
        >
          <h4 className="m-0 font-[var(--font-red-hat)] text-lg font-semibold">
            Subscribe to our newsletter
          </h4>
          <p
            className="m-0 font-[var(--font-red-hat)] text-xs"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            Get latest update on what we are building...
          </p>
          <form
            onSubmit={handleSubscribe}
            className="mt-1 flex flex-col gap-2 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email.."
              aria-label="Email address"
              className="flex-1 rounded-xl border border-white/20 bg-white/10 px-4 py-3 font-[var(--font-red-hat)] text-sm text-white placeholder-white/50 outline-none focus:border-white/40"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-xl border-none px-5 py-3 font-[var(--font-red-hat)] text-sm font-semibold text-white"
              style={{
                background: `linear-gradient(90deg, ${ACCENT}, #4E4BD5)`,
              }}
            >
              {subscribed ? "SUBSCRIBED!" : "SUBSCRIBE"}
            </motion.button>
          </form>
        </motion.div>

        {/* Link columns */}
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3">
          <FooterColumn
            title="Quick Links"
            items={QUICK_LINKS}
            delay={0.15}
            fade={fade}
          />
          <FooterColumn
            title="Products"
            items={PRODUCTS}
            delay={0.2}
            fade={fade}
          />
          <FooterColumn
            title="Services"
            items={SERVICES}
            delay={0.25}
            fade={fade}
            className="col-span-2 md:col-span-1"
          />
        </div>

        {/* Divider + copyright */}
        <motion.div
          {...fade(0.35)}
          className="mt-10 border-t border-white/10 pt-6 text-center font-[var(--font-red-hat)] text-xs font-light sm:text-sm"
          style={{ color: "rgba(255,255,255,0.65)" }}
        >
          © 2026 buildON Inc. All rights reserved.
        </motion.div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
  delay,
  fade,
  className,
}: {
  title: string;
  items: string[];
  delay: number;
  fade: (delay: number) => {
    initial: { opacity: number; y: number } | undefined;
    whileInView: { opacity: number; y: number };
    viewport: { once: boolean; amount: number };
    transition: {
      duration: number;
      delay: number;
      ease: readonly [number, number, number, number];
    };
  };
  className?: string;
}) {
  return (
    <motion.div
      {...fade(delay)}
      className={`flex flex-col gap-3 ${className ?? ""}`}
    >
      <h4 className="m-0 font-[var(--font-red-hat)] text-base font-semibold text-white sm:text-lg">
        {title}
      </h4>
      <ul className="m-0 flex flex-col gap-2 p-0">
        {items.map((item) => (
          <li key={item} className="list-none">
            <a
              href="#"
              className="font-[var(--font-red-hat)] text-sm no-underline transition hover:text-white"
              style={{ color: "rgba(255,255,255,0.72)" }}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
