import { motion } from "motion/react";
import { BentoCard } from "../components/BentoCard";
import { SectionHeading } from "../components/SectionHeading";
import { coreStack, dailyDrivers, skills } from "../data/portfolio";
import { TechIcon, techColor } from "../data/techIcons";

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.035, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 8, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35 } },
};

function CoreTile({ name, display, label, delay }: { name: string; display: string; label: string; delay: number }) {
  const color = techColor(name);
  return (
    <BentoCard delay={delay} tilt className="group flex flex-col items-center justify-center gap-3 px-3 py-6 text-center sm:gap-4 sm:px-4 sm:py-8">
      <div className="relative grid size-16 place-items-center">
        <span
          aria-hidden
          className="absolute inset-1 rounded-2xl opacity-30 blur-xl transition-opacity duration-500 group-hover:opacity-70"
          style={{ background: color }}
        />
        <span className="relative grid size-16 place-items-center rounded-2xl border border-line bg-card-2">
          <TechIcon name={name} className="size-8 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" />
        </span>
      </div>
      <div>
        <p className="font-semibold tracking-tight">{display}</p>
        <p className="mt-0.5 font-mono text-[11px] uppercase tracking-widest text-muted">{label}</p>
      </div>
    </BentoCard>
  );
}

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 pt-20 sm:pt-32">
      <SectionHeading
        eyebrow="Skills"
        title="The toolbox"
        description="The stack I reach for every day, and everything else I've shipped with."
      />

      {/* Core stack — big tiles */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {coreStack.map((c, i) => (
          <CoreTile key={c.name} {...c} delay={i * 0.06} />
        ))}
      </div>

      {/* Everything else — grouped list, daily drivers highlighted */}
      <BentoCard delay={0.1} className="mt-4 p-5 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-semibold">Full toolbox</h3>
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs text-fg">
            <span className="size-1.5 rounded-full bg-accent" /> Daily drivers
          </span>
        </div>
        <div className="mt-2 divide-y divide-line">
          {skills.map((group) => (
            <div key={group.title} className="grid grid-cols-1 gap-3 py-5 sm:grid-cols-[150px_1fr] sm:items-center">
              <p className="font-mono text-xs uppercase tracking-widest text-muted">{group.title}</p>
              <motion.ul
                variants={list}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                className="flex flex-wrap gap-2"
              >
                {group.items.map((name) => {
                  const hot = dailyDrivers.has(name);
                  return (
                    <motion.li
                      key={name}
                      variants={item}
                      className={`flex items-center gap-2 rounded-xl border px-2.5 py-1.5 text-[13px] sm:px-3 sm:text-sm transition-[transform,color,border-color] duration-200 hover:-translate-y-0.5 ${
                        hot
                          ? "border-accent/40 bg-accent/10 font-medium text-fg"
                          : "border-line bg-card-2 text-muted hover:border-accent/30 hover:text-fg"
                      }`}
                    >
                      <TechIcon name={name} className="size-4" />
                      {name}
                      {hot && <span className="size-1.5 rounded-full bg-accent" aria-label="daily driver" />}
                    </motion.li>
                  );
                })}
              </motion.ul>
            </div>
          ))}
        </div>
      </BentoCard>
    </section>
  );
}
