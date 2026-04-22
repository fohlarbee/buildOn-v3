"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useEffect, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";

const NAVY_BG = "#0B0F45";
const ACCENT = "#557EF6";
const SKY = "#0094EC";
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function MobileContact() {
  const reduce = useReducedMotion();
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [mounted, setMounted] = useState(false);
  const viewport = { once: true, amount: 0.2 };

  useEffect(() => {
    setMounted(true);
  }, []);

  const fade = (delay: number) => ({
    initial: reduce ? undefined : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport,
    transition: {
      duration: reduce ? 0 : 0.7,
      delay: reduce ? 0 : delay,
      ease: EASE_OUT,
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
      return;
    }

    setIsPending(true);
    setIsSent(false);
    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          name,
          user_email: userEmail,
          subject,
          message,
          title: subject || "Help Center Message",
          timestamp: new Date().toISOString(),
        },
        { publicKey },
      );
      setIsSent(true);
      toast.success("Message sent. We'll get back to you soon.");
      formEl.reset();
      window.setTimeout(() => {
        setIsHelpOpen(false);
        setIsSent(false);
      }, 1200);
    } catch (err) {
      const msg =
        typeof err === "object" && err !== null && "text" in err
          ? String((err as { text?: unknown }).text)
          : "Could not send message. Please try again.";
      toast.error(msg);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <section
        id="contact"
        className="relative overflow-hidden px-4 py-14 sm:px-6 sm:py-16 md:px-8 md:py-20"
        style={{ background: NAVY_BG }}
        aria-label="Contact us"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(500px 300px at 10% 20%, rgba(85,126,246,0.35), transparent 60%)," +
              "radial-gradient(500px 300px at 90% 85%, rgba(0,148,236,0.25), transparent 60%)",
          }}
        />

        <div className="relative mx-auto flex max-w-[720px] flex-col items-start gap-8 text-white sm:gap-10">
          <motion.div {...fade(0.1)} className="flex flex-col gap-2">
            <h2
              className="m-0 font-[var(--font-roboto-slab),var(--font-red-hat)] font-bold uppercase leading-[1.05] tracking-tight"
              style={{ fontSize: "clamp(2rem, 9vw, 3.25rem)" }}
            >
              Contact Us
            </h2>
            <motion.div
              aria-hidden
              initial={reduce ? undefined : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={viewport}
              transition={{ delay: 0.3, duration: 0.8, ease: EASE_OUT }}
              className="h-[2px] w-32 sm:w-44"
              style={{ background: SKY, transformOrigin: "left" }}
            />
          </motion.div>

          <motion.div {...fade(0.15)} className="flex w-full flex-col gap-4">
            <div
              className="font-[var(--font-red-hat)] text-xs font-medium uppercase"
              style={{
                letterSpacing: "0.12em",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              Say hello
            </div>
            <a
              href="mailto:support@buildonhq.org"
              className="w-fit break-all font-[var(--font-roboto-slab),var(--font-red-hat)] font-semibold leading-[1.25] text-white no-underline"
              style={{
                fontSize: "clamp(1.25rem, 5.5vw, 1.75rem)",
                borderBottom: `2px solid ${SKY}`,
                paddingBottom: 4,
                letterSpacing: "-0.01em",
              }}
            >
              support@buildonhq.org
            </a>
            <div className="mt-2 flex items-center gap-3">
              {SOCIALS.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  whileHover={{ y: -3, scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm"
                >
                  <s.Icon />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.a
            href="mailto:support@buildonhq.org"
            {...fade(0.25)}
            className="mt-2 inline-flex w-full max-w-[320px] items-center justify-center gap-3 rounded-full px-6 py-3.5 font-[var(--font-red-hat)] text-sm font-semibold text-white no-underline sm:w-auto"
            style={{
              background: `linear-gradient(90deg, ${ACCENT}, #4E4BD5)`,
              boxShadow:
                "0 18px 36px -12px rgba(85,126,246,0.6), inset 0 1px 0 rgba(255,255,255,0.3)",
              letterSpacing: "0.01em",
            }}
          >
            Let&apos;s build something
            <span aria-hidden style={{ fontSize: 18, lineHeight: 1 }}>
              →
            </span>
          </motion.a>

          <motion.div
            {...fade(0.35)}
            className="font-[var(--font-red-hat)] text-xs font-medium uppercase"
            style={{
              letterSpacing: "0.08em",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            Remote-first · Global
          </motion.div>
        </div>
      </section>

      {mounted
        ? createPortal(
            <div
              className="flex lg:hidden"
              style={{
                position: "fixed",
                right: 14,
                bottom: 42,
                zIndex: 9999,
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 10,
                maxWidth: "calc(100vw - 28px)",
              }}
            >
              <motion.button
                type="button"
                aria-label="Open Help Center"
                onClick={() => setIsHelpOpen((v) => !v)}
                whileHover={{ y: -2, scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 320, damping: 24 }
                }
                style={{
                  width: 52,
                  height: 52,
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
                    key="mobile-help-center-popover"
                    onSubmit={sendEmail}
                    initial={
                      reduce ? undefined : { opacity: 0, y: 16, scale: 0.96 }
                    }
                    animate={
                      reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }
                    }
                    exit={
                      reduce
                        ? { opacity: 0 }
                        : { opacity: 0, y: 10, scale: 0.97 }
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
                      width: "min(320px, calc(100vw - 28px))",
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
                        fontSize: 18,
                        lineHeight: "22px",
                        marginBottom: 4,
                      }}
                    >
                      Help Center
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-red-hat)",
                        fontSize: 12,
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

const SOCIALS = [
  { label: "Twitter / X", href: "#", Icon: TwitterIcon },
  { label: "LinkedIn", href: "#", Icon: LinkedInIcon },
  { label: "GitHub", href: "#", Icon: GitHubIcon },
  { label: "Instagram", href: "#", Icon: InstagramIcon },
];

function TwitterIcon() {
  return (
    <svg
      width="14"
      height="14"
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
      width="14"
      height="14"
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
      width="14"
      height="14"
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
      width="14"
      height="14"
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
      width="22"
      height="22"
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
          rows={3}
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
