"use client";

import { motion, useReducedMotion } from "framer-motion";

type Member = { name: string; role: string; accent: string };

const MEMBERS: Member[] = [
  { role: "Team Lead", name: "Fhex", accent: "#8AA7F9" },
  { role: "Cybersecurity", name: "K-Gold", accent: "#FFC116" },
  { role: "Tech lead", name: "PerceptronCipher", accent: "#EA97B9" },
  { role: "Product lead", name: "Travis", accent: "#7BE3B3" },
  { role: "Operations", name: "Emmy", accent: "#F97B7B" },
  { role: "Operations", name: "Emmy", accent: "#B09BFF" },
  { role: "Socials", name: "Renzo", accent: "#FFDC71" },
];

export function MobileTeam() {
  const reduce = useReducedMotion();
  const viewport = { once: true, amount: 0.15 };

  const fade = (delay: number) => ({
    initial: reduce ? undefined : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport,
    transition: {
      duration: reduce ? 0 : 0.7,
      delay: reduce ? 0 : delay,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  });

  return (
    <section
      id="team"
      className="relative px-4 py-14 sm:px-6 sm:py-16 md:px-8 md:py-20"
      aria-label="Team"
    >
      <div
        className="relative mx-auto max-w-[720px] overflow-hidden rounded-[32px] px-5 py-12 sm:rounded-[40px] sm:px-8 sm:py-14 md:px-10 md:py-16"
        style={{
          background: "#171A69",
          boxShadow: "0 30px 60px -30px rgba(23, 26, 105, 0.45)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "url(/figma/hero-image.png)",
            backgroundPosition: "center",
            backgroundSize: "cover",
            opacity: 0.08,
            mixBlendMode: "screen",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 20% 15%, rgba(138,167,249,0.22), transparent 50%)," +
              "radial-gradient(circle at 85% 90%, rgba(255,193,22,0.15), transparent 55%)",
          }}
        />

        <div className="relative text-center">
          <motion.h2
            {...fade(0)}
            className="font-[var(--font-red-hat)] text-3xl font-bold leading-tight text-[#E9EBF8] sm:text-4xl"
          >
            Our Team
          </motion.h2>
          <motion.div
            {...fade(0.08)}
            className="mt-2 font-[var(--font-red-hat)] text-lg font-semibold text-[#FFC116] sm:text-xl"
          >
            The People Behind the Innovation
          </motion.div>
          <motion.p
            {...fade(0.16)}
            className="mx-auto mt-4 max-w-[50ch] font-[var(--font-red-hat)] text-sm font-light leading-[1.55] text-white/80 sm:text-base"
          >
            Our team is made up of engineers, designers, and strategists
            passionate about building technology that makes a difference. We
            collaborate, innovate, and push boundaries to deliver exceptional
            results.
          </motion.p>
        </div>

        <div className="relative mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 md:gap-6">
          {MEMBERS.map((m, i) => (
            <motion.div
              key={`${m.name}-${i}`}
              {...fade(0.24 + i * 0.06)}
              className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm sm:p-5"
            >
              <Avatar name={m.name} accent={m.accent} />
              <div className="text-center">
                <div className="font-[var(--font-red-hat)] text-sm font-medium text-white sm:text-base">
                  {m.role}
                </div>
                <div className="font-[var(--font-red-hat)] text-xs font-light text-white/75 sm:text-sm">
                  {m.name}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.a
          href="#contact"
          {...fade(0.55)}
          className="relative mx-auto mt-10 flex h-11 w-full max-w-[280px] items-center justify-center rounded-full font-[var(--font-red-hat)] text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          style={{
            background: "linear-gradient(90deg, #8AA7F9, #4E4BD5)",
            boxShadow:
              "0 14px 30px -10px rgba(78, 75, 213, 0.6), inset 0 1px 0 rgba(255,255,255,0.35)",
            letterSpacing: "0.02em",
          }}
        >
          Get in touch
        </motion.a>
      </div>
    </section>
  );
}

function Avatar({ name, accent }: { name: string; accent: string }) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
  return (
    <div
      className="flex h-16 w-16 items-center justify-center rounded-full font-[var(--font-red-hat)] text-xl font-bold text-white sm:h-20 sm:w-20 sm:text-2xl"
      style={{
        background: `linear-gradient(160deg, ${accent}, rgba(23,26,105,0.6))`,
        letterSpacing: "0.03em",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.25), 0 12px 24px -10px rgba(0,0,0,0.45)",
      }}
      aria-hidden
    >
      {initials}
    </div>
  );
}
