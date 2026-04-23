"use client";

import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

type CanvasRootStyle = CSSProperties & { zoom?: number };

/**
 * The BuildOn Figma file is a single 1440×H design-px frame with sections
 * absolutely positioned. The frame is placed in a **centered, max-w-[1440px]**
 * column (with page padding). We use CSS `zoom` (not `transform: scale`) so
 * the scaled design’s **layout** size matches the painted size — otherwise
 * overflow would clip the right side of the 1440 canvas when the column is
 * narrower than 1440px, breaking the hero and following sections.
 *
 * Use `overflow-hidden` (both axes), not `overflow-x-hidden`: with only x set,
 * CSS pairs `overflow-y: visible` to `auto`, creating an inner scrollport and
 * a bogus vertical scrollbar on this column until the user scrolls the page.
 */

export const DESIGN_WIDTH = 1440;
/** Canvas ends after the process section; contact + footer are full-bleed below. */
export const DESIGN_HEIGHT = 3817;
/** Figma flat “paper” mid-stop; shell uses `var(--buildon-page-gradient)` in CSS. */
export const DESIGN_BG = "#E6ECFE";

const ScaleContext = createContext(1);
export function useDesignScale() {
  return useContext(ScaleContext);
}

const useIsoLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export function DesktopCanvas({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  // Initial 1 matches SSR; useLayoutEffect sets the real value before first paint.
  const [scale, setScale] = useState(1);

  useIsoLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const update = () => {
      const w = el.clientWidth;
      if (w === 0) {
        // Rare: layout not ready; retry next frame so we never stay at scale 1
        // on a narrow column (avoids 1440px layout width and root overflow).
        requestAnimationFrame(() => {
          const w2 = el.clientWidth;
          if (w2 > 0) setScale(w2 / DESIGN_WIDTH);
        });
        return;
      }
      setScale(w / DESIGN_WIDTH);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // `transform: scale()` does not shrink the layout box: a 1440px-tall child
  // stays 1440px wide in the layout, so a narrower max-width parent + overflow
  // clips the right side (pre-transform) — the hero U-shape and sections
  // look broken. `zoom` scales paint *and* layout size together (same idea
  // as the previous full-bleed canvas), so the 1440×H frame actually occupies
  // (1440×scale)×(H×scale) in the document.
  return (
    <div className="flex w-full justify-center bg-transparent px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
      <div
        ref={wrapRef}
        className="relative w-full max-w-[1440px] overflow-hidden"
        style={{
          background: `var(--buildon-page-gradient, ${DESIGN_BG})`,
        }}
      >
        <div
          className="relative"
          style={
            {
              width: DESIGN_WIDTH,
              height: DESIGN_HEIGHT,
              zoom: scale,
            } as CanvasRootStyle
          }
        >
          <ScaleContext.Provider value={scale}>
            {children}
          </ScaleContext.Provider>
        </div>
      </div>
    </div>
  );
}

/**
 * Absolutely-positioned section block within the design canvas.
 * x, y, w, h are in DESIGN pixels.
 */
export function Section({
  x,
  y,
  w,
  h,
  style,
  className,
  children,
  id,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={className}
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        ...style,
      }}
    >
      {children}
    </section>
  );
}
