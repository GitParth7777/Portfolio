import { motion } from "motion/react";
import { Database, GraduationCap, Paintbrush, ShieldCheck } from "lucide-react";
import { BentoCard } from "../components/BentoCard";
import { SectionHeading } from "../components/SectionHeading";
import { CountUp } from "../components/ui";
import { about, education } from "../data/portfolio";

const principles = [
  {
    icon: Database,
    title: "Data that arrives intact",
    text: "Concurrency-safe numbering, careful migrations, verified results.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by default",
    text: "SSO with Entra ID, OAuth 2.0 and JWT, done properly from the start.",
  },
  {
    icon: Paintbrush,
    title: "Screens people enjoy",
    text: "Responsive, localized, and polished down to the last button.",
  },
];

function CgpaRing() {
  const r = 52;
  return (
    <div className="relative grid size-36 place-items-center">
      <svg viewBox="0 0 120 120" className="absolute inset-0 -rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" stroke="var(--line)" strokeWidth="8" />
        <motion.circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="url(#cgpa)"
          strokeWidth="8"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: education.cgpa / 10 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        />
        <defs>
          <linearGradient id="cgpa" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--accent)" />
            <stop offset="1" stopColor="var(--accent-2)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="text-center">
        <p className="text-3xl font-semibold tracking-tight">
          <CountUp value={education.cgpa} decimals={2} />
        </p>
        <p className="text-xs text-muted">CGPA / 10</p>
      </div>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 pt-20 sm:pt-32">
      <SectionHeading eyebrow="About" title="The parts users never see, and the ones they do" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <BentoCard className="flex flex-col justify-center gap-5 p-6 sm:col-span-3 sm:p-10 lg:col-span-2">
          {about.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.12 }}
              className={i === 0 ? "text-lg leading-relaxed sm:text-2xl" : "text-base leading-relaxed text-muted sm:text-lg"}
            >
              {p}
            </motion.p>
          ))}
        </BentoCard>

        <BentoCard delay={0.1} tilt className="flex flex-col items-center gap-5 p-6 text-center sm:col-span-3 lg:col-span-1">
          <span className="inline-flex items-center gap-2 self-start font-mono text-xs uppercase tracking-widest text-muted">
            <GraduationCap className="size-4" /> Education
          </span>
          <CgpaRing />
          <div>
            <p className="text-lg font-semibold">{education.school}</p>
            <p className="mt-1 text-sm text-muted">{education.degree}</p>
            <p className="mt-2 font-mono text-xs text-muted">
              {education.location} · {education.period}
            </p>
          </div>
        </BentoCard>

        {principles.map(({ icon: Icon, title, text }, i) => (
          <BentoCard key={title} delay={0.05 * i} tilt className="p-6">
            <span className="grid size-10 place-items-center rounded-xl bg-accent/10 text-accent">
              <Icon className="size-5" />
            </span>
            <h3 className="mt-4 font-semibold">{title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted">{text}</p>
          </BentoCard>
        ))}
      </div>
    </section>
  );
}
