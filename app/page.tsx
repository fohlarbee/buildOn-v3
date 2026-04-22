"use client";

import { useLayoutEffect, useState } from "react";
import { DesktopCanvas } from "@/app/components/DesktopCanvas";
import { HeroSection } from "@/app/components/hero/HeroSection";
import { CoreValues } from "@/app/components/sections/CoreValues";
import { TeamSection } from "@/app/components/sections/TeamSection";
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
  const [mode, setMode] = useState<"mobile" | "desktop" | null>(() => {
    if (typeof window === "undefined") return null;
    return window.matchMedia("(min-width: 1024px)").matches
      ? "desktop"
      : "mobile";
  });

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
    return <main className="min-h-svh bg-[#E6ECFE]" />;
  }

  return (
    <main className="min-h-svh bg-white text-zinc-900">
      {mode === "desktop" ? (
        <DesktopCanvas>
          <HeroSection />
          <CoreValues />
          <TeamSection />
          <ServicesSection />
          <ProjectsSection />
          <ProcessSection />
          <ContactSection />
          <FooterSection />
        </DesktopCanvas>
      ) : (
        <MobileLayout />
      )}
    </main>
  );
}
