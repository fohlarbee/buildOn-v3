"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { label: "Home", href: "#" },
  { label: "About", href: "#" },
  { label: "Expertise", href: "#services" },
  { label: "Work", href: "#projects" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export function MobileNavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-colors duration-300 ${
          scrolled
            ? "bg-[#000558]/90 backdrop-blur-md shadow-[0_8px_20px_-12px_rgba(0,5,88,0.6)]"
            : "bg-[#000558]"
        }`}
      >
        <div className="mx-auto flex h-14 max-w-[720px] items-center justify-between px-4 sm:h-16 sm:px-6">
          <Link
            href="#"
            aria-label="buildON — home"
            className="flex items-center"
          >
            <MobileLogo />
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="mailto:support@buildonhq.org"
              aria-label="Email us"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/25 bg-white/10 text-white transition hover:bg-white/20 sm:h-11 sm:w-11"
            >
              <MailIcon />
            </Link>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/25 bg-white/10 text-white transition hover:bg-white/20 sm:h-11 sm:w-11"
            >
              <HamburgerIcon open={open} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 30 }}
              className="fixed right-0 top-0 z-50 flex h-dvh w-[82%] max-w-sm flex-col gap-1 bg-[#000558] px-6 pb-10 pt-6 text-white shadow-2xl"
              aria-label="Mobile navigation"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="font-[var(--font-roboto-slab),var(--font-red-hat)] text-lg font-bold tracking-tight">
                  Menu
                </span>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/25 bg-white/10 transition hover:bg-white/20"
                >
                  <CloseIcon />
                </button>
              </div>

              <ul className="flex flex-col gap-1">
                {NAV_ITEMS.map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.04, duration: 0.35 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-3 py-3 font-[var(--font-red-hat)] text-lg font-medium text-white/85 transition hover:bg-white/10 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                className="mt-auto"
              >
                <Link
                  href="https://x.com/buildON_Inc"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-center rounded-xl border border-white/25 bg-white/10 px-4 py-3 font-[var(--font-red-hat)] text-sm font-medium text-white transition hover:bg-white/20"
                >
                  Get in touch
                </Link>
                <p className="mt-4 text-center font-[var(--font-red-hat)] text-xs text-white/50">
                  support@buildonhq.org
                </p>
              </motion.div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * The BuildOn Figma logo asset is a 1024×1024 PNG where the wordmark only
 * occupies the middle horizontal band (y-scale 0.458, y-offset 0.289 of the
 * source). We render that band scaled down to the header size.
 */
function MobileLogo() {
  const Y_SCALE = 0.45783135;
  const Y_OFFSET = 0.28915661;

  return (
    <>
      {/* Small (mobile): 120×38 */}
      <div className="relative h-[38px] w-[120px] overflow-hidden sm:hidden">
        <Image
          src="/figma/buildon-logo.png"
          alt="buildON"
          width={120}
          height={Math.round(38 / Y_SCALE)}
          style={{
            position: "absolute",
            left: 0,
            top: -(Y_OFFSET * (38 / Y_SCALE)),
            width: 120,
            height: 38 / Y_SCALE,
            display: "block",
            userSelect: "none",
            pointerEvents: "none",
          }}
          draggable={false}
        />
      </div>
      {/* Tablet: 160×50 */}
      <div className="relative hidden h-[50px] w-[160px] overflow-hidden sm:block">
        <Image
          src="/figma/buildon-logo.png"
          alt="buildON"
          width={160}
          height={Math.round(50 / Y_SCALE)}
          style={{
            position: "absolute",
            left: 0,
            top: -(Y_OFFSET * (50 / Y_SCALE)),
            width: 160,
            height: 50 / Y_SCALE,
            display: "block",
            userSelect: "none",
            pointerEvents: "none",
          }}
          draggable={false}
        />
      </div>
    </>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 22 22" fill="none" aria-hidden>
      <path
        d="M11 2.5a8.5 8.5 0 100 17 8.5 8.5 0 000-17z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M6 9l5 3.5L16 9M6 9v5a1 1 0 001 1h8a1 1 0 001-1V9M6 9l5-3 5 3"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  const bar =
    "absolute left-1/2 block h-[1.6px] w-[18px] -translate-x-1/2 rounded-full bg-current transition-all duration-300 ease-out";
  return (
    <span className="relative block h-[18px] w-[18px]" aria-hidden>
      <span
        className={bar}
        style={{
          top: "50%",
          transform: open
            ? "translate(-50%, -50%) rotate(45deg)"
            : "translate(-50%, calc(-50% - 5px))",
        }}
      />
      <span
        className={bar}
        style={{
          top: "50%",
          transform: "translate(-50%, -50%)",
          opacity: open ? 0 : 1,
        }}
      />
      <span
        className={bar}
        style={{
          top: "50%",
          transform: open
            ? "translate(-50%, -50%) rotate(-45deg)"
            : "translate(-50%, calc(-50% + 5px))",
        }}
      />
    </span>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
