import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Bug,
  CircleCheck,
  Hash,
  Inbox,
  Languages,
  LayoutDashboard,
  Plus,
  ScanText,
  ShieldCheck,
  Trophy,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { BentoCard } from "../components/BentoCard";
import { SectionHeading } from "../components/SectionHeading";
import { Tag } from "../components/ui";
import { experience, roles, type Experience as Exp } from "../data/portfolio";

const highlightIcons: Record<string, LucideIcon> = {
  hash: Hash,
  inbox: Inbox,
  scan: ScanText,
  shield: ShieldCheck,
  zap: Zap,
  bug: Bug,
  check: CircleCheck,
  layout: LayoutDashboard,
  languages: Languages,
};

const ease = [0.22, 1, 0.36, 1] as const;

function ProjectRow({ exp, index, open, onToggle }: { exp: Exp; index: number; open: boolean; onToggle: () => void }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease, delay: index * 0.08 }}
      className="border-t border-line first:border-t-0"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="group flex w-full items-start gap-3 py-5 text-left sm:gap-4 sm:py-6 outline-none focus-visible:rounded-xl focus-visible:ring-2 focus-visible:ring-accent"
      >
        <span className="hidden pt-1.5 font-mono text-xs text-muted sm:inline">{String(index + 1).padStart(2, "0")}</span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <span className="text-[1.05rem] font-semibold leading-snug tracking-tight transition-colors group-hover:text-accent sm:text-xl">
              {exp.title}
            </span>
            <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-[11px] font-medium text-accent">{exp.client}</span>
          </span>
          <span className="mt-2 block max-w-2xl text-sm leading-relaxed text-muted sm:text-base">{exp.summary}</span>
          <span className="mt-3 flex flex-wrap gap-1.5">
            {exp.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </span>
        </span>
        <span
          className={`grid size-9 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
            open
              ? "rotate-45 border-accent bg-accent text-white"
              : "border-line text-muted group-hover:border-accent group-hover:text-accent"
          }`}
        >
          <Plus className="size-4" />
          <span className="sr-only">{open ? "Hide details" : "Show details"}</span>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-4 pb-6 sm:pb-7 sm:pl-8 sm:pr-12">
              <p className="text-sm leading-relaxed sm:text-base">
                <span className="mr-2 font-mono text-xs uppercase tracking-widest text-muted">Problem</span>
                {exp.problem}
              </p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {exp.built.map((b) => {
                  const Icon = highlightIcons[b.icon] ?? Zap;
                  return (
                    <li key={b.label} className="flex gap-3 rounded-2xl border border-line bg-card-2 p-3.5">
                      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent">
                        <Icon className="size-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold">{b.label}</span>
                        <span className="block text-sm text-muted">{b.text}</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
              <p className="flex items-start gap-2.5 rounded-2xl border border-accent/25 bg-accent/[0.06] p-3.5 text-sm leading-relaxed sm:text-base">
                <Trophy className="mt-0.5 size-4 shrink-0 text-accent" />
                {exp.outcome}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

export function Experience() {
  const [openId, setOpenId] = useState<string | null>(null);
  // newest role first
  const groups = [...roles].reverse().map((role) => ({
    role,
    projects: experience.filter((e) => e.role === role.title),
  }));

  return (
    <section id="work" className="mx-auto max-w-6xl px-4 pt-20 sm:pt-32">
      <SectionHeading
        eyebrow="Experience"
        title="Software that replaces manual processes"
        description="Forward-deployed at CCTech, building enterprise platforms for a renewable-energy client."
      />
      <div className="flex flex-col gap-4">
        {groups.map(({ role, projects }, gi) => {
          const current = gi === 0;
          return (
            <BentoCard key={role.title} delay={gi * 0.08} className="p-5 sm:p-8">
              <div className="grid grid-cols-1 gap-2 sm:gap-4 lg:grid-cols-[250px_1fr] lg:gap-10">
                <div className="self-start lg:sticky lg:top-28 lg:py-6">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 font-mono text-[11px] ${
                      current ? "border-ok/30 bg-ok/10 text-ok" : "border-line bg-card-2 text-muted"
                    }`}
                  >
                    {current && (
                      <span className="relative flex size-1.5">
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-ok opacity-70" />
                        <span className="relative inline-flex size-1.5 rounded-full bg-ok" />
                      </span>
                    )}
                    {role.period}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold leading-snug tracking-tight">{role.title}</h3>
                  <p className="mt-1 font-medium text-accent">{role.company}</p>
                  <p className="mt-1 text-sm text-muted">Centre for Computational Technologies · Ahmedabad</p>
                </div>
                <ul className="min-w-0">
                  {projects.map((exp, i) => (
                    <ProjectRow
                      key={exp.id}
                      exp={exp}
                      index={i}
                      open={openId === exp.id}
                      onToggle={() => setOpenId((id) => (id === exp.id ? null : exp.id))}
                    />
                  ))}
                </ul>
              </div>
            </BentoCard>
          );
        })}
      </div>
    </section>
  );
}

export function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-widest text-muted">{title}</p>
      <div className="mt-2 leading-relaxed text-fg/85">{children}</div>
    </div>
  );
}
