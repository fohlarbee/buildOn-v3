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

/**
 * The BuildOn Figma file is a single Desktop - 2 frame, 1440 × 5844 design px,
 * with sections at absolute coordinates. DesktopCanvas scales the entire
 * design frame uniformly to the viewport width, so every section inside can
 * render at its exact Figma position (x, y, w, h) and preserve all pixel
 * relationships across the whole page.
 */

export const DESIGN_WIDTH = 1440;
export const DESIGN_HEIGHT = 5831;
export const DESIGN_BG = "#E6ECFE"; // page background from Figma (Desktop - 2)

const ScaleContext = createContext(1);
export function useDesignScale() {
  return useContext(ScaleContext);
}

const useIsoLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export function DesktopCanvas({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);

  useIsoLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const update = () => {
      const w = el.clientWidth;
      setScale(w / DESIGN_WIDTH);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative w-full overflow-hidden"
      style={{ height: DESIGN_HEIGHT * scale, background: DESIGN_BG }}
    >
      <div
        style={{
          width: DESIGN_WIDTH,
          height: DESIGN_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
        className="relative"
      >
        <ScaleContext.Provider value={scale}>{children}</ScaleContext.Provider>
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
