import Image from "next/image";

export function MobileHero() {
  return (
    <section
      className="relative overflow-hidden bg-[#000558]"
      aria-label="Hero"
    >
      {/* Ambient glow wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 45% at 50% 20%, rgba(138,167,249,0.28) 0%, transparent 70%)," +
            "radial-gradient(50% 30% at 15% 80%, rgba(1,45,171,0.45) 0%, transparent 70%)," +
            "radial-gradient(40% 25% at 85% 30%, rgba(78,75,213,0.28) 0%, transparent 70%)",
        }}
      />

      {/* Hero image — astronaut fills the section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-full"
      >
        <div className="relative mx-auto h-full w-full max-w-[720px]">
          <Image
            src="/figma/hero-image.png"
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, 720px"
            className="object-cover object-[50%_35%] opacity-[0.92]"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,5,88,0.35) 0%, rgba(0,5,88,0) 22%, rgba(0,5,88,0) 70%, rgba(0,5,88,0.6) 100%)",
            }}
          />
        </div>
      </div>

      {/* Content — two glass cards, staggered (not straight stacked) */}
      <div className="relative z-10 mx-auto max-w-[720px] px-4 pt-4 pb-16 sm:px-6 sm:pt-6 sm:pb-20 md:px-10 md:pt-8 md:pb-24">
        {/* Small spacer so cards sit just below the navbar */}
        <div className="h-[60px] sm:h-[80px] md:h-[100px]" aria-hidden />

        <div className="relative">
          {/* Blue card — offset to the left */}
          <div className="hero-slide-in-left w-[88%] sm:w-[82%]">
            <GlassCard accent="blue">
              <p className="font-[var(--font-red-hat)] text-[13.5px] font-light leading-[1.55] text-[#F5F5F5] sm:text-[15px] md:text-base">
                Based in Delaware, United States, BuildOn, Inc. is a
                forward-thinking technology startup focused on turning bold
                ideas into impactful{" "}
                <span className="text-[#B0C3FB]">digital solutions</span>. We
                partner with businesses at every stage from early concept to
                fully deployed platforms.
              </p>
            </GlassCard>
          </div>

          {/* Yellow card — offset to the right, with breathing room below blue */}
          <div className="hero-slide-in-right mt-6 ml-auto w-[88%] sm:mt-8 sm:w-[82%]">
            <GlassCard accent="yellow">
              <p className="font-[var(--font-red-hat)] text-[13.5px] leading-[1.55] text-[#F5F5F5] sm:text-[15px] md:text-base">
                Our multidisciplinary team combines engineering, design, and
                strategic thinking to build solutions that not only solve
                problems but unlock new opportunities for growth and innovation.
              </p>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Glassmorphic card — truly see-through; `backdrop-filter: blur` lets the
 * astronaut behind read through as frosted glass. Blue/yellow accent is a
 * thin colored top rail, per the Figma reference.
 */
function GlassCard({
  accent,
  children,
}: {
  accent: "blue" | "yellow";
  children: React.ReactNode;
}) {
  const isYellow = accent === "yellow";
  const accentColor = isYellow ? "#FFC116" : "#B0C3FB";

  return (
    <div className="relative">
      {/* Colored top rail */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-[5px] left-3 right-3 h-[6px] rounded-t-xl"
        style={{
          background: accentColor,
          boxShadow: `0 0 14px ${accentColor}55`,
        }}
      />

      <div
        className="relative overflow-hidden rounded-2xl border border-white/20 px-5 py-4 sm:px-6 sm:py-5"
        style={{
          background: "rgba(255, 255, 255, 0.06)",
          backdropFilter: "blur(14px) saturate(140%)",
          WebkitBackdropFilter: "blur(14px) saturate(140%)",
          boxShadow: "0 18px 40px -22px rgba(0, 0, 0, 0.45)",
        }}
      >
        <div className="relative">{children}</div>
      </div>
    </div>
  );
}
