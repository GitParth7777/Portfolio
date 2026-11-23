import { useCallback, useState } from "react";
import { ArrowUpRight, Info, Maximize2 } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { BentoCard } from "../components/BentoCard";
import { DetailModal } from "../components/DetailModal";
import { SectionHeading } from "../components/SectionHeading";
import { Magnetic, Tag } from "../components/ui";
import { EditorVisual, VoiceVisual } from "../components/visuals";
import { projects, type Project } from "../data/portfolio";
import { Block } from "./Experience";

const visuals = { voice: VoiceVisual, editor: EditorVisual } as const;

function Links({ p }: { p: Project }) {
  return (
    <div className="flex flex-wrap gap-2">
      <Magnetic strength={0.2}>
        <a
          href={p.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-85"
        >
          Live demo <ArrowUpRight className="size-4" />
        </a>
      </Magnetic>
      <Magnetic strength={0.2}>
        <a
          href={p.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card-2 px-4 py-2 text-sm font-medium transition-colors hover:border-accent/50"
        >
          <FaGithub className="size-4" /> Code
        </a>
      </Magnetic>
    </div>
  );
}

export function Projects() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = projects.find((p) => p.id === activeId);
  const close = useCallback(() => setActiveId(null), []);

  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 pt-20 sm:pt-32">
      <SectionHeading
        eyebrow="Projects"
        title="Things I built on my own"
        description="Real-time and AI side projects, both deployed with live demos."
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {projects.map((p, i) => {
          const Visual = visuals[p.visual as keyof typeof visuals];
          return (
            <BentoCard key={p.id} layoutId={`proj-${p.id}`} delay={i * 0.1} className="group flex min-w-0 flex-col gap-5 p-4 sm:gap-6 sm:p-6">
              <div className="flex min-h-[240px] min-w-0 items-center rounded-2xl bg-card-2 p-3 ring-1 ring-line sm:min-h-[260px] sm:p-4">
                <div className="w-full min-w-0">{Visual && <Visual />}</div>
              </div>
              <div className="flex flex-1 flex-col gap-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight">{p.name}</h3>
                    <p className="mt-1 text-muted">{p.tagline}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveId(p.id)}
                    aria-label={`Open details: ${p.name}`}
                    className="grid size-10 shrink-0 place-items-center rounded-full border border-line text-muted transition-all hover:border-accent hover:bg-accent hover:text-white"
                  >
                    <Maximize2 className="size-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
                <div className="mt-auto pt-2">
                  <Links p={p} />
                </div>
              </div>
            </BentoCard>
          );
        })}
      </div>
      <p className="mt-4 flex items-start gap-2 text-xs text-muted sm:items-center">
        <Info className="size-3.5 shrink-0" />
        Both demos run on Render's free tier, so the first load can take up to a minute while the server wakes up.
      </p>

      <DetailModal layoutId={active ? `proj-${active.id}` : null} open={!!active} onClose={close} label={active?.name ?? ""}>
        {active && (
          <article className="flex flex-col gap-7 pr-6">
            <header>
              <p className="font-mono text-xs text-muted">Side project</p>
              <h3 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{active.name}</h3>
              <p className="mt-1 text-accent">{active.tagline}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {active.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </header>
            <Block title="Why">
              <p>{active.why}</p>
            </Block>
            <Block title="How">
              <p>{active.how}</p>
            </Block>
            <div className="rounded-2xl border border-accent/25 bg-accent/[0.06] p-5">
              <p className="font-mono text-xs uppercase tracking-widest text-accent">Result</p>
              <p className="mt-2 leading-relaxed">{active.result}</p>
            </div>
            <Links p={active} />
          </article>
        )}
      </DetailModal>
    </section>
  );
}
