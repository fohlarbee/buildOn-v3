"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useEffect, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";

/**
 * Contact Us section — Figma node 321:1550.
 *
 * Figma geometry (absolute):
 *   "CONTACT US" title → x=2469, y=5040, w=306, h=64
 *                        48px Bold UPPERCASE, colour #FFFFFF
 *   Vector 4 underline → x=1697, y=5110, w=218, stroke #0094EC
 *   Arrow icons + social cluster at x=1714, y=5054
 *
 * The section sits on a dark/navy full-bleed backdrop that transitions
 * into the footer. In the design the CTA row contains an email, a phone,
 * and socials at the top-left, with the big "CONTACT US" headline at
 * centre/right.
 *
 * In Desktop coords (frame x=1891), section spans roughly
 *   y=4980 → y=5260 (right before the footer glow at y=5281).
 */

const SECTION_X = 0;
const SECTION_Y = 4990;
const SECTION_W = 1440;
const SECTION_H = 280;

const NAVY_BG = "#0B0F45";
const ACCENT = "#557EF6";
const SKY = "#0094EC";
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function ContactSection() {
  const reduce = useReducedMotion();
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [mounted, setMounted] = useState(false);
  const viewport = { once: true, amount: 0.3 };

  useEffect(() => {
    setMounted(true);
  }, []);

  const slide = (delay: number, fromY = 28) => ({
    initial: reduce ? undefined : { opacity: 0, y: fromY },
    whileInView: { opacity: 1, y: 0 },
    viewport,
    transition: {
      duration: reduce ? 0 : 0.8,
      ease: EASE_OUT,
      delay: reduce ? 0 : delay,
    },
  });

  const sendEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPending) return;

    const formEl = e.currentTarget;
    const formData = new FormData(formEl);
    const name = String(formData.get("name") || "").trim();
    const userEmail = String(formData.get("user_email") || "").trim();
    const subject = String(formData.get("subject") || "").trim();
    const message = String(formData.get("message") || "").trim();
    if (!name || !userEmail || !message) {
      toast.error("Please fill in Full Name, Email Address, and Message.");
      return;
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (!serviceId || !templateId || !publicKey) {
      toast.error("Email service is not configured yet.");
      console.error("EmailJS config missing", {
        hasServiceId: Boolean(serviceId),
        hasTemplateId: Boolean(templateId),
        hasPublicKey: Boolean(publicKey),
      });
      return;
    }

    const templateParams = {
      name,
      user_email: userEmail,
      subject,
      message,
      title: subject || "Help Center Message",
      timestamp: new Date().toISOString(),
    };

    // Real pending state: show loading immediately, only show success on resolve.
    setIsPending(true);
    setIsSent(false);
    try {
      await emailjs.send(serviceId, templateId, templateParams, { publicKey });
      setIsSent(true);
      toast.success("Message sent. We'll get back to you soon.");
      formEl.reset();
      window.setTimeout(() => {
        setIsHelpOpen(false);
        setIsSent(false);
      }, 1200);
    } catch (error: unknown) {
      setIsSent(false);
      let message = "Could not send message. Please try again.";
      let status: number | undefined;
      let details: string | undefined;

      if (typeof error === "object" && error !== null) {
        const eObj = error as {
          status?: unknown;
          text?: unknown;
          message?: unknown;
          response?: unknown;
        };
        if (typeof eObj.status === "number") status = eObj.status;
        if (typeof eObj.text === "string" && eObj.text.trim()) {
          message = eObj.text;
        } else if (typeof eObj.message === "string" && eObj.message.trim()) {
          message = eObj.message;
        }
        if (typeof eObj.response === "string" && eObj.response.trim()) {
          details = eObj.response;
        }
      } else if (typeof error === "string" && error.trim()) {
        message = error;
      }

      const toastMessage = status ? `${message} (status ${status})` : message;
      toast.error(toastMessage);
      console.error("EmailJS send failed", {
        status,
        message,
        details,
        rawError: error,
        serviceId,
        templateId,
        publicKeyPrefix: publicKey.slice(0, 4),
        payloadKeys: Object.keys(templateParams),
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <section
        id="contact"
        style={{
          position: "absolute",
          top: SECTION_Y,
          left: SECTION_X,
          width: SECTION_W,
          height: SECTION_H,
          background: NAVY_BG,
          overflow: "hidden",
        }}
        aria-label="Contact Us"
      >
        {/* Soft radial highlights */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(600px 300px at 12% 18%, rgba(85,126,246,0.35), transparent 60%)," +
              "radial-gradient(800px 400px at 88% 85%, rgba(0,148,236,0.25), transparent 60%)",
          }}
        />

        {/* Left cluster: email + socials */}
        <motion.div
          {...slide(0)}
          style={{
            position: "absolute",
            top: 50,
            left: 78,
            display: "flex",
            flexDirection: "column",
            gap: 18,
            color: "#fff",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-red-hat)",
              fontWeight: 500,
              fontSize: 14,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            Say hello
          </div>
          <a
            href="mailto:support@buildonhq.org"
            style={{
              color: "#fff",
              fontFamily: "var(--font-roboto-slab), var(--font-red-hat)",
              fontWeight: 600,
              fontSize: 28,
              lineHeight: "36px",
              letterSpacing: "-0.01em",
              textDecoration: "none",
              borderBottom: `2px solid ${SKY}`,
              paddingBottom: 4,
              alignSelf: "flex-start",
            }}
          >
            support@buildonhq.org
          </a>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginTop: 6,
            }}
          >
            {SOCIALS.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                whileHover={{ y: -3, scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backdropFilter: "blur(6px)",
                  WebkitBackdropFilter: "blur(6px)",
                }}
              >
                <s.Icon />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Big CONTACT US headline with underline */}
        <motion.div
          {...slide(0.12)}
          style={{
            position: "absolute",
            top: 50,
            left: 578, // 2469 - 1891
            display: "flex",
            flexDirection: "column",
            gap: 14,
            color: "#fff",
          }}
        >
          <motion.h2
            initial={reduce ? undefined : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewport}
            transition={{ delay: 0.15, duration: 0.9, ease: EASE_OUT }}
            style={{
              margin: 0,
              fontFamily: "var(--font-roboto-slab), var(--font-red-hat)",
              fontWeight: 700,
              fontSize: 48,
              lineHeight: "64px",
              letterSpacing: "-0.01em",
              textTransform: "uppercase",
            }}
          >
            Contact Us
          </motion.h2>
          <motion.div
            aria-hidden
            initial={reduce ? undefined : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewport}
            transition={{ delay: 0.4, duration: 0.9, ease: EASE_OUT }}
            style={{
              width: 218,
              height: 2,
              background: SKY,
              transformOrigin: "left",
            }}
          />
        </motion.div>

        {/* Right CTA chip — "Let's build →" */}
        <motion.a
          href="mailto:support@buildonhq.org"
          {...slide(0.2)}
          whileHover={{ x: 4 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          style={{
            position: "absolute",
            top: 70,
            right: 78,
            display: "inline-flex",
            alignItems: "center",
            gap: 14,
            padding: "14px 22px",
            borderRadius: 999,
            background: `linear-gradient(90deg, ${ACCENT}, #4E4BD5)`,
            color: "#fff",
            fontFamily: "var(--font-red-hat)",
            fontWeight: 600,
            fontSize: 15,
            letterSpacing: "0.01em",
            textDecoration: "none",
            boxShadow:
              "0 18px 36px -12px rgba(85,126,246,0.6), inset 0 1px 0 rgba(255,255,255,0.3)",
          }}
        >
          Let&apos;s build something
          <span aria-hidden style={{ fontSize: 18, lineHeight: 1 }}>
            →
          </span>
        </motion.a>

        {/* Location tag */}
        <motion.div
          {...slide(0.28)}
          style={{
            position: "absolute",
            bottom: 40,
            right: 78,
            color: "rgba(255,255,255,0.6)",
            fontFamily: "var(--font-red-hat)",
            fontWeight: 500,
            fontSize: 13,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Remote-first · Global
        </motion.div>
      </section>

      {mounted
        ? createPortal(
            <div
              className="hidden lg:flex"
              style={{
                position: "fixed",
                right: 20,
                bottom: 32,
                zIndex: 9999,
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 10,
              }}
            >
              <motion.button
                type="button"
                aria-label="Open Help Center"
                onClick={() => setIsHelpOpen((v) => !v)}
                whileHover={{ y: -2, scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                animate={
                  reduce
                    ? undefined
                    : isHelpOpen
                      ? { scale: 1.02 }
                      : { scale: 1 }
                }
                transition={
                  reduce
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 320, damping: 24, mass: 0.8 }
                }
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.28)",
                  background: `linear-gradient(135deg, ${ACCENT}, #4E4BD5)`,
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow:
                    "0 16px 34px -12px rgba(85,126,246,0.72), 0 6px 18px rgba(0,0,0,0.35)",
                  cursor: "pointer",
                }}
              >
                <MessageIcon />
              </motion.button>

              <AnimatePresence initial={false}>
                {isHelpOpen && (
                  <motion.form
                    key="help-center-popover"
                    onSubmit={sendEmail}
                    initial={
                      reduce
                        ? undefined
                        : {
                            opacity: 0,
                            y: 22,
                            x: 6,
                            scale: 0.95,
                          }
                    }
                    animate={
                      reduce
                        ? { opacity: 1 }
                        : { opacity: 1, y: 0, x: 0, scale: 1 }
                    }
                    exit={
                      reduce
                        ? { opacity: 0 }
                        : { opacity: 0, y: 14, x: 4, scale: 0.97 }
                    }
                    transition={
                      reduce
                        ? { duration: 0 }
                        : {
                            type: "spring",
                            stiffness: 280,
                            damping: 26,
                            mass: 0.9,
                          }
                    }
                    style={{
                      width: 320,
                      borderRadius: 16,
                      border: "1px solid rgba(255,255,255,0.16)",
                      background: "rgba(11,15,69,0.96)",
                      backdropFilter: "blur(8px)",
                      WebkitBackdropFilter: "blur(8px)",
                      padding: 16,
                      color: "#FFFFFF",
                      boxShadow: "0 20px 45px rgba(0,0,0,0.45)",
                      transformOrigin: "bottom right",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-red-hat)",
                        fontWeight: 700,
                        fontSize: 20,
                        lineHeight: "24px",
                        marginBottom: 6,
                      }}
                    >
                      Help Center
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-red-hat)",
                        fontWeight: 400,
                        fontSize: 12,
                        lineHeight: "16px",
                        color: "rgba(255,255,255,0.75)",
                        marginBottom: 14,
                      }}
                    >
                      Typically responds in a few hours
                    </div>

                    {isSent ? (
                      <div
                        style={{
                          borderRadius: 12,
                          border: "1px solid rgba(122,255,188,0.3)",
                          background: "rgba(77, 186, 124, 0.15)",
                          color: "#DFFFEF",
                          fontFamily: "var(--font-red-hat)",
                          fontWeight: 500,
                          fontSize: 13,
                          lineHeight: "18px",
                          padding: "12px 10px",
                        }}
                      >
                        Message sent successfully.
                      </div>
                    ) : (
                      <>
                        <HelpField
                          label="Full Name"
                          type="text"
                          inputName="name"
                          required
                        />
                        <HelpField
                          label="Email Address"
                          type="email"
                          inputName="user_email"
                          required
                        />
                        <HelpField
                          label="Subject"
                          type="text"
                          inputName="subject"
                        />
                        <HelpField
                          label="Message"
                          type="textarea"
                          inputName="message"
                          required
                        />
                        <motion.button
                          type="submit"
                          whileHover={isPending ? undefined : { scale: 1.02 }}
                          whileTap={isPending ? undefined : { scale: 0.98 }}
                          disabled={isPending}
                          style={{
                            width: "100%",
                            marginTop: 4,
                            borderRadius: 10,
                            border: "1px solid rgba(255,255,255,0.2)",
                            background: `linear-gradient(135deg, ${ACCENT}, #4E4BD5)`,
                            color: "#fff",
                            fontFamily: "var(--font-red-hat)",
                            fontWeight: 600,
                            fontSize: 13,
                            lineHeight: "18px",
                            padding: "10px 12px",
                            cursor: isPending ? "not-allowed" : "pointer",
                            opacity: isPending ? 0.8 : 1,
                          }}
                        >
                          {isPending ? "Sending..." : "Send message"}
                        </motion.button>
                      </>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}

// ─── socials ──────────────────────────────────────────────────────────────
const SOCIALS = [
  { label: "Twitter / X", href: "#", Icon: TwitterIcon },
  { label: "LinkedIn", href: "#", Icon: LinkedInIcon },
  { label: "GitHub", href: "#", Icon: GitHubIcon },
  { label: "Instagram", href: "#", Icon: InstagramIcon },
];

function TwitterIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M18.244 2H21l-6.507 7.44L22 22h-6.828l-4.76-6.22L4.8 22H2l7-8-7-12h7l4.3 5.7L18.244 2zm-1.2 18h1.8L7.04 4H5.2l11.844 16z" />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3V9zm7 0h3.8v1.7h.05c.53-1 1.82-2.05 3.75-2.05 4 0 4.75 2.64 4.75 6.08V21h-4v-5.3c0-1.26-.02-2.88-1.75-2.88-1.75 0-2.02 1.37-2.02 2.78V21H10V9z" />
    </svg>
  );
}
function GitHubIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.1c-3.2.7-3.88-1.38-3.88-1.38-.52-1.33-1.28-1.68-1.28-1.68-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18A11 11 0 0 1 12 6.8c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.26 5.69.41.36.77 1.06.77 2.15v3.19c0 .31.21.67.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      aria-hidden
    >
      <path d="M4 5.5h16a1 1 0 0 1 1 1v9.2a1 1 0 0 1-1 1H9l-5 4v-4H4a1 1 0 0 1-1-1V6.5a1 1 0 0 1 1-1z" />
      <path d="M7.5 10.2h9M7.5 13.2h6" />
    </svg>
  );
}

function HelpField({
  label,
  type,
  inputName,
  required = false,
}: {
  label: string;
  type: "text" | "email" | "textarea";
  inputName: string;
  required?: boolean;
}) {
  const commonStyle = {
    width: "100%",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.06)",
    color: "#FFFFFF",
    fontFamily: "var(--font-red-hat)",
    fontSize: 13,
    lineHeight: "18px",
    padding: "10px 11px",
    outline: "none",
    marginBottom: 10,
  } as const;

  return (
    <label
      style={{
        display: "block",
        fontFamily: "var(--font-red-hat)",
        fontWeight: 500,
        fontSize: 12,
        lineHeight: "16px",
        marginBottom: 4,
      }}
    >
      {label}
      {type === "textarea" ? (
        <textarea
          name={inputName}
          rows={4}
          required={required}
          style={{ ...commonStyle, resize: "vertical" }}
        />
      ) : (
        <input
          type={type}
          name={inputName}
          required={required}
          style={commonStyle}
        />
      )}
    </label>
  );
}
