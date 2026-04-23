/**
 * Pixel-perfect spec extracted from the BuildOn Figma file (node 354:1724).
 * Design canvas: 1440 × 965. All positions and sizes are in design pixels.
 * The component scales the canvas uniformly to fit the viewport width.
 */

export const DESIGN = {
  width: 1440,
  height: 965,
  bgHeight: 932,
} as const;

export const COLORS = {
  bg: "#000558",
  ellipse4: "#012DAB",
  ellipse6: "rgba(78, 75, 213, 0.2)",
  ellipse7: "#8AA7F9",
  cardLeftBg: "#00568D",
  cardText: "#F5F5F5",
  cardHighlightYellow: "#FFC116",
  cardHighlightBlue: "#00568D",
  navText: "#FFFFFF",
  navTextDim: "rgba(255, 255, 255, 0.7)",
  glassBorderStart: "rgba(255, 255, 255, 1)",
  glassBorderMid: "rgba(255, 255, 255, 0.6)",
  glassBorderEnd: "rgba(255, 255, 255, 0.1)",
  buttonBg: "rgba(138, 167, 249, 0.2)",
} as const;

/**
 * Exact fillGeometry path for hero-section-bg vector (Figma I354:1724;354:1657).
 * Local coords inside a 1440 × 932 viewBox. This is the notched/U-shape that
 * lets the page background show through behind the outer Core Values cards
 * while a center tab (x ≈ 508–910) hangs down to y = 932 behind the middle card.
 */
export const HERO_BG_PATH =
  "M0 0L1440 0L1440 702.806C1440 737.397 1412.52 765.728 1377.94 766.777L972.863 779.066C938.887 780.096 911.645 807.507 910.822 841.488L910.143 869.549C909.302 904.281 880.904 932 846.161 932L572.287 932C537.759 932 509.455 904.61 508.322 870.101L506.899 826.793C505.766 792.283 477.462 764.894 442.934 764.894L64.0001 764.894C28.6538 764.894 0 736.24 0 700.894L0 0Z";

export const LAYOUT = {
  bg: { x: 0, y: -1, w: 1440, h: 932 },
  ellipse4: { x: 0, y: -131, w: 1439, h: 502, blur: 302.3 },
  ellipse6: { x: 0, y: -212, w: 1439, h: 502, blur: 302.3 },
  ellipse7: { x: 0, y: -373, w: 1439, h: 502, blur: 302.3 },
  heroImage: {
    // Shifted right so the image center aligns with the U-shape/tab center.
    from: { x: 230.84, y: 913.75 },
    to: { x: 149.53, y: 108.94 },
    w: 1119.01,
    h: 604.47,
  },
  leftCard: {
    from: { x: -347, y: 419 },
    to: { x: 53, y: 419 },
    w: 340,
    h: 180,
  },
  rightCard: {
    from: { x: 1489, y: 441, w: 264, h: 126 },
    to: { x: 1004, y: 402, w: 340, h: 197 },
  },
  title: {
    from: { x: 285, y: -230, w: 911, h: 190, scale: 0.8506 },
    to: { x: 215, y: 111, w: 1071, h: 224, scale: 1 },
    fontSize: 144.3486,
    letterSpacing: 5.7739,
  },
  nav: {
    container: { y: 18.5, h: 45 },
    logo: { x: 1, y: 1, w: 256, h: 80 },
    itemsY: 30.5,
    items: [
      { label: "Home", x: 449, w: 44, dim: false },
      { label: "About", x: 533, w: 45, dim: true },
      { label: "Expertise", x: 618, w: 68, dim: true },
      { label: "Work", x: 726, w: 37, dim: true },
      { label: "Team", x: 803, w: 39, dim: true },
    ] as Array<{ label: string; x: number; w: number; dim: boolean }>,
    btns: { x: 1034, y: 18.5, w: 341, h: 45, itemSpacing: 39 },
  },
} as const;

/**
 * Motion tuned from Figma specs toward a swifter, smoother feel (snappier spring,
 * shorter lead-in). Figma reference was ~0.8s delay + very soft spring (~2.6s).
 */
export const MOTION = {
  /** Wait after mount before hero “settle” spring (image, cards, title start). */
  titleDelayMs: 380,
  /**
   * Shared spring for hero image + cards (and title x/y/scale).
   * Higher stiffness + balanced damping = faster settle, minimal overshoot.
   */
  heroSpring: { mass: 0.88, stiffness: 168, damping: 26 },
  /** Title opacity uses a short ease instead of spring to avoid floaty fade. */
  titleOpacityDurationS: 0.48,
  /** Hover radial glow opacity tween (section mouse move). */
  heroHoverGlowDurationS: 0.32,
  mailEaseInMs: 300,
  ctaDissolveMs: 500,
} as const;

export const TEXT = {
  title: "BuildOn Inc.",
  leftCard:
    "Based in Delaware, United States, BuildOn, Inc. is a forward-thinking technology startup focused on turning bold ideas into impactful digital solutions. We partner with businesses at every stage  from early concept to fully deployed platforms .",
  // Character ranges with yellow highlight (index 118..134, "BuildOn, Inc. is a"-ish) and blue last char
  leftCardRanges: {
    yellowFrom: 119,
    yellowTo: 136,
    blueFrom: 136,
    blueTo: 137,
  },
  rightCard:
    "Our multidisciplinary team combines engineering, design, and strategic thinking to build solutions that not only solve problems but unlock new opportunities for growth and innovation.",
} as const;
