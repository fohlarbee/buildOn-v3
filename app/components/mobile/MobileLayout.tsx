import { MobileNavBar } from "./MobileNavBar";
import { MobileHero } from "./MobileHero";
import { MobileCoreValues } from "./MobileCoreValues";
// import { MobileTeam } from "./MobileTeam";
import { MobileServices } from "./MobileServices";
import { MobileProjects } from "./MobileProjects";
import { MobileProcess } from "./MobileProcess";
import { MobileContact } from "./MobileContact";
import { MobileFooter } from "./MobileFooter";

/**
 * Responsive mobile + tablet layout for BuildOn, rendered below 1024px.
 * Above that breakpoint, the pixel-perfect DesktopCanvas takes over.
 *
 * Breakpoints used inside this layout (Tailwind defaults):
 *   default  → mobile portrait (< 640px)
 *   sm:      → large mobile / small tablet (>= 640px)
 *   md:      → tablet (>= 768px)
 *   (page switches to desktop canvas at lg = 1024px)
 */
export function MobileLayout() {
  return (
    <div className="w-full overflow-x-clip bg-transparent text-zinc-900">
      <MobileNavBar />
      {/* Hero + core values share a stacking context so value cards can float over the hero bottom */}
      <div className="relative isolate">
        <MobileHero />
        <MobileCoreValues />
      </div>
      {/* <MobileTeam /> */}
      <MobileServices />
      <MobileProjects />
      <MobileProcess />
      <MobileContact />
      <MobileFooter />
    </div>
  );
}
