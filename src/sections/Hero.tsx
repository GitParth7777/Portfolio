import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight, Download, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { BentoCard } from "../components/BentoCard";
import { Magnetic, Marquee } from "../components/ui";
import { marqueeTech, profile } from "../data/portfolio";
import { scrollToId } from "../lib/scroll";

const ease = [0.22, 1, 0.36, 1] as const;

function SplitText({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  return (
    <span className={`inline-flex overflow-hidden pb-[0.08em] ${className}`} aria-label={text}>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block"
          initial={{ y: "110%", rotate: 8 }}
          animate={{ y: 0, rotate: 0 }}
          transition={{ duration: 0.9, ease, delay: delay + i * 0.035 }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

function Pulse({ className = "bg-ok" }: { className?: string }) {
  return (
    <span className="relative flex size-2">
      <span className={`absolute inline-flex size-full animate-ping rounded-full opacity-70 ${className}`} />
      <span className={`relative inline-flex size-2 rounded-full ${className}`} />
    </span>
  );
}

function SocialsCard({ delay }: { delay: number }) {
  const links = [
    { href: profile.github.url, icon: FaGithub, label: "GitHub", handle: profile.github.handle },
    { href: profile.linkedin.url, icon: FaLinkedin, label: "LinkedIn", handle: profile.linkedin.handle },
    { href: `mailto:${profile.email}`, icon: Mail, label: "Email", handle: "Say hello" },
  ];
  return (
    <BentoCard delay={delay} className="flex flex-col gap-2 p-3 sm:row-span-2">
      <div className="px-3 pt-3">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">Find me online</p>
        <p className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight lg:text-[2.6rem]">
          Let's
          <br />
          <span className="text-muted">connect.</span>
        </p>
      </div>
      <div className="flex flex-1 flex-col justify-end gap-2">
        {links.map(({ href, icon: Icon, label, handle }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-2xl border border-line bg-card-2 p-3.5 transition-colors hover:border-accent/50"
          >
            <Icon className="size-7 shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" />
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold">{label}</span>
              <span className="block truncate font-mono text-xs text-muted">{label === "Email" ? handle : `@${handle}`}</span>
            </span>
            <span className="grid size-8 shrink-0 place-items-center rounded-full border border-line text-muted transition-all duration-300 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
              <ArrowUpRight className="size-3.5" />
            </span>
          </a>
        ))}
      </div>
    </BentoCard>
  );
}

export function Hero() {
  return (
    <section id="home" className="mx-auto max-w-6xl px-4 pt-24 sm:pt-28">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[minmax(250px,auto)_minmax(250px,auto)_auto]">
        {/* Intro */}
        <BentoCard className="flex flex-col justify-between gap-8 overflow-hidden p-6 sm:col-span-2 sm:p-9 lg:row-span-2">
          <div aria-hidden className="absolute -right-24 -top-24 -z-10 size-80 rounded-full bg-accent/20 blur-3xl" />
          <div>
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-card-2 px-3 py-1.5 text-xs text-muted"
            >
              <Pulse /> {profile.availability}
            </motion.span>
            <h1 className="mt-6 text-[clamp(3rem,8vw,5.5rem)] font-semibold leading-[0.92] tracking-tighter">
              <SplitText text={profile.firstName} delay={0.2} />
              <br />
              <SplitText text={profile.name.split(" ").slice(1).join(" ")} delay={0.38} className="text-muted" />
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.7 }}
              className="mt-5 text-lg font-medium sm:text-xl"
            >
              {profile.role}
              <span className="text-muted"> · {profile.city}</span>
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.8 }}
              className="mt-3 max-w-lg text-base leading-relaxed text-muted"
            >
              {profile.tagline}
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.95 }}
            className="flex flex-wrap gap-3"
          >
            <Magnetic>
              <a
                href={profile.resume}
                download="Parth_Babariya_Resume.pdf"
                className="group inline-flex items-center gap-2 rounded-full bg-fg px-4 py-3 text-sm font-medium text-bg sm:px-5 transition-shadow hover:shadow-xl hover:shadow-accent/20"
              >
                <Download className="size-4 transition-transform group-hover:translate-y-0.5" />
                Download resume
              </a>
            </Magnetic>
            <Magnetic>
              <button
                type="button"
                onClick={() => scrollToId("contact")}
                className="group inline-flex items-center gap-2 rounded-full border border-line bg-card-2 px-4 py-3 text-sm font-medium sm:px-5 transition-colors hover:border-accent/50"
              >
                Let's talk
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </button>
            </Magnetic>
          </motion.div>
        </BentoCard>

        {/* Photo */}
        <BentoCard delay={0.1} className="group aspect-[4/5] overflow-hidden sm:aspect-auto sm:min-h-[380px] sm:row-span-2">
          <img
            src={profile.photo}
            alt={`Portrait of ${profile.name}`}
            width={900}
            height={971}
            fetchPriority="high"
            className="absolute inset-0 -z-10 size-full rounded-[28px] object-cover object-[50%_22%] transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-1/2 rounded-b-[28px] bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2 rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-white backdrop-blur-md">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{profile.name}</p>
              <p className="truncate text-xs text-white/70">{profile.role}</p>
            </div>
            <span className="text-xl" role="img" aria-label="waving hand">
              👋
            </span>
          </div>
        </BentoCard>

        <SocialsCard delay={0.2} />

        {/* Tech marquee */}
        <BentoCard delay={0.1} className="flex items-center gap-4 px-2 py-4 sm:col-span-2 lg:col-span-4">
          <Marquee items={marqueeTech} />
        </BentoCard>
      </div>
    </section>
  );
}
