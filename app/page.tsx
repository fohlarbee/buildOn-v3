"use client";

import { useLayoutEffect, useState } from "react";
import { DesktopCanvas } from "@/app/components/DesktopCanvas";
import { HeroSection } from "@/app/components/hero/HeroSection";
import { CoreValues } from "@/app/components/sections/CoreValues";
// import { TeamSection } from "@/app/components/sections/TeamSection";
import { ServicesSection } from "@/app/components/sections/ServicesSection";
import { ProjectsSection } from "@/app/components/sections/ProjectsSection";
import { ProcessSection } from "@/app/components/sections/ProcessSection";
import { ContactSection } from "@/app/components/sections/ContactSection";
import { FooterSection } from "@/app/components/sections/FooterSection";
import { MobileLayout } from "@/app/components/mobile/MobileLayout";

/**
 * Mount only one layout at a time based on viewport width. The desktop canvas
 * is a 1440×5831 px frame that scales uniformly via JS; if it renders before
 * the media query resolves on a small screen, it briefly overflows massively.
 * We intentionally render nothing until viewport mode is known to avoid
 * showing the wrong layout first (desktop users seeing mobile flash).
 */
function useViewportMode(): "mobile" | "desktop" | null {
  // Keep server HTML and first client render identical to avoid hydration
  // mismatch, then resolve actual viewport mode after mount.
  const [mode, setMode] = useState<"mobile" | "desktop" | null>(null);

  useLayoutEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setMode(mq.matches ? "desktop" : "mobile");
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return mode;
}

export default function Home() {
  const mode = useViewportMode();

  if (mode === null) {
    return <main className="min-h-svh bg-transparent" />;
  }

  return (
    <main className="min-w-0 bg-transparent text-zinc-900">
      {mode === "desktop" ? (
        <>
          <DesktopCanvas>
            <HeroSection />
            <CoreValues />
            {/* <TeamSection /> */}
            <ServicesSection />
            <ProjectsSection />
            <ProcessSection />
          </DesktopCanvas>
          <ContactSection />
          <FooterSection />
        </>
      ) : (
        <MobileLayout />
      )}
    </main>
  );
}
