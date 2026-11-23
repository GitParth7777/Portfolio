import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import emailjs from "@emailjs/browser";
import { ArrowUpRight, Check, Copy, Loader2, Mail, Phone, Send } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { BentoCard } from "../components/BentoCard";
import { Magnetic } from "../components/ui";
import { profile } from "../data/portfolio";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const emailjsReady = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

type Status = "idle" | "sending" | "sent" | "error";

const inputCls =
  "w-full rounded-2xl border border-line bg-card-2 px-4 py-3 text-base outline-none transition placeholder:text-muted/70 focus:border-accent focus:ring-4 focus:ring-accent/15";

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="group flex w-full items-center gap-3 rounded-2xl border border-line bg-card-2 p-3 pl-4 text-left transition-colors hover:border-accent/50"
    >
      <Mail className="size-5 shrink-0 text-accent" />
      <span className="min-w-0 flex-1 truncate text-sm sm:text-base">{profile.email}</span>
      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-card text-muted ring-1 ring-line group-hover:text-fg">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={copied ? "ok" : "copy"}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {copied ? <Check className="size-4 text-ok" /> : <Copy className="size-4" />}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="sr-only" aria-live="polite">
        {copied ? "Email copied" : ""}
      </span>
    </button>
  );
}

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("company")) return; // honeypot: bots fill hidden fields

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!emailjsReady) {
      // EmailJS keys not configured yet → fall back to the visitor's mail app
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(`Portfolio enquiry from ${name}`)}&body=${body}`;
      return;
    }

    setStatus("sending");
    try {
      await emailjs.send(
        SERVICE_ID!,
        TEMPLATE_ID!,
        { from_name: name, from_email: email, reply_to: email, message },
        { publicKey: PUBLIC_KEY! },
      );
      setStatus("sent");
      form.reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 pt-20 sm:pt-32">
      <BentoCard className="overflow-hidden p-5 sm:p-10 lg:p-14">
        <div aria-hidden className="absolute -left-32 -top-32 -z-10 size-96 rounded-full bg-accent/15 blur-3xl" />
        <div aria-hidden className="absolute -bottom-32 -right-32 -z-10 size-96 rounded-full bg-accent-2/10 blur-3xl" />
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="flex min-w-0 flex-col gap-6">
            <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-accent">
              <span className="h-px w-6 bg-accent" /> Contact
            </p>
            <h2 className="text-[2.5rem] font-semibold leading-[1.02] tracking-tight text-balance sm:text-6xl">
              Let's build something people rely on.
            </h2>
            <p className="max-w-md text-muted sm:text-lg">
              I'm open to full-stack and product engineering roles. The fastest way to reach me is email or LinkedIn.
            </p>
            <CopyEmail />
            <div className="flex flex-wrap gap-2">
              {[
                { href: profile.linkedin.url, icon: FaLinkedin, label: "LinkedIn" },
                { href: profile.github.url, icon: FaGithub, label: "GitHub" },
                { href: profile.phoneHref, icon: Phone, label: profile.phone },
              ].map(({ href, icon: Icon, label }) => (
                <Magnetic key={label} strength={0.2}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full border border-line bg-card-2 px-4 py-2 text-sm transition-colors hover:border-accent/50"
                  >
                    <Icon className="size-4" /> {label}
                    {href.startsWith("http") && (
                      <ArrowUpRight className="size-3.5 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    )}
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>

          <form onSubmit={onSubmit} className="flex min-w-0 flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm">
                <span className="text-muted">Name</span>
                <input name="name" required autoComplete="name" placeholder="Your name" className={inputCls} />
              </label>
              <label className="flex flex-col gap-2 text-sm">
                <span className="text-muted">Email</span>
                <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" className={inputCls} />
              </label>
            </div>
            <label className="flex flex-col gap-2 text-sm">
              <span className="text-muted">Message</span>
              <textarea
                name="message"
                required
                rows={6}
                placeholder="Tell me about the role or project…"
                className={`${inputCls} resize-none`}
              />
            </label>
            {/* honeypot — hidden from people, visible to bots */}
            <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

            <button
              type="submit"
              disabled={status === "sending"}
              className="group relative mt-1 inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-accent to-accent-2 px-6 font-medium text-white shadow-lg shadow-accent/25 transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={status}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="inline-flex items-center gap-2"
                >
                  {status === "sending" && (
                    <>
                      <Loader2 className="size-4 animate-spin" /> Sending…
                    </>
                  )}
                  {status === "sent" && (
                    <>
                      <Check className="size-4" /> Message sent! I'll reply soon.
                    </>
                  )}
                  {(status === "idle" || status === "error") && (
                    <>
                      Send message
                      <Send className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </>
                  )}
                </motion.span>
              </AnimatePresence>
            </button>
            <p className="min-h-5 text-sm" aria-live="polite">
              {status === "error" && (
                <span className="text-red-500">
                  Something went wrong. Please email me directly at {profile.email}.
                </span>
              )}
            </p>
          </form>
        </div>
      </BentoCard>
    </section>
  );
}
