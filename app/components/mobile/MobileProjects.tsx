"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Project = {
  title: string;
  description: string;
  image: string;
};

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

const NAVY_CARD = "#151C66";
const AUTO_ADVANCE_MS = 4500;

export function MobileProjects() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const t = window.setTimeout(() => {
      setIndex((i) => (i + 1) % PROJECTS.length);
    }, AUTO_ADVANCE_MS);
    return () => window.clearTimeout(t);
  }, [index, reduce]);

  return (
    <section
      id="projects"
      className="relative px-4 py-14 sm:px-6 sm:py-16 md:px-8 md:py-20"
      aria-label="Featured projects"
    >
      <div className="mx-auto max-w-[720px]">
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-5 w-full max-w-[340px] rounded-[22px] border border-white/15 px-3 py-3 text-white sm:mb-7 sm:max-w-[380px]"
          style={{
            background:
              "linear-gradient(145deg, rgba(21,28,102,0.92), rgba(12,18,82,0.92))",
            boxShadow:
              "0 24px 44px -22px rgba(23, 25, 105, 0.62), inset 0 1px 0 rgba(255,255,255,0.16)",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="relative flex h-12 w-12 items-center justify-center rounded-full sm:h-14 sm:w-14"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, #7A95FF 0%, #4E4BD5 65%, #36309E 100%)",
                boxShadow:
                  "0 14px 30px -14px rgba(85,126,246,0.8), inset 0 1px 0 rgba(255,255,255,0.26)",
              }}
              aria-hidden
            >
              <div
                className="h-3 w-3 rounded-full bg-white/90"
                style={{ boxShadow: "0 0 0 4px rgba(255,255,255,0.16)" }}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-[var(--font-red-hat)] text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/65">
                Featured work
              </span>
              <span className="font-[var(--font-red-hat)] text-xl font-bold leading-tight text-white sm:text-2xl">
                Projects
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[28px] sm:rounded-[36px]"
          style={{
            background: NAVY_CARD,
            boxShadow:
              "0 30px 60px -30px rgba(21, 28, 102, 0.55), 0 10px 30px -20px rgba(0,0,0,0.4)",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(500px 300px at 18% 15%, rgba(85,126,246,0.28), transparent 60%)," +
                "radial-gradient(400px 220px at 85% 85%, rgba(255,193,22,0.12), transparent 60%)",
            }}
          />

          <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[16/10]">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={reduce ? false : { opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, x: -40 }}
                transition={{
                  duration: reduce ? 0 : 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute inset-0"
              >
                <Image
                  src={PROJECTS[index].image}
                  alt={PROJECTS[index].title}
                  fill
                  sizes="(max-width: 640px) 100vw, 720px"
                  className="object-cover"
                  priority={index === 0}
                  quality={100}
                  unoptimized
                />
                <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 px-5 pb-16 text-white sm:px-8 sm:pb-20">
                  <motion.h3
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.5 }}
                    className="font-[var(--font-red-hat)] font-bold leading-[1.1] text-white"
                    style={{ fontSize: "clamp(1.5rem, 6vw, 2.25rem)" }}
                  >
                    {PROJECTS[index].title}
                  </motion.h3>
                  <motion.p
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.5 }}
                    className="max-w-[44ch] font-[var(--font-red-hat)] text-sm leading-[1.5] text-white/90 sm:text-base"
                  >
                    {PROJECTS[index].description}
                  </motion.p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-x-0 bottom-5 z-10 flex items-center justify-center gap-2">
              {PROJECTS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show project ${i + 1}`}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: i === index ? 24 : 8,
                    background: i === index ? "#fff" : "rgba(255,255,255,0.45)",
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
