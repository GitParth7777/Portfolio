import { motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  const words = title.split(" ");
  return (
    <div className="mb-8 max-w-2xl sm:mb-12">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease }}
        className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-accent"
      >
        <span className="h-px w-6 bg-accent" />
        {eyebrow}
      </motion.p>
      <h2 className="mt-4 text-3xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl">
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
            <motion.span
              className="inline-block"
              initial={{ y: "105%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease, delay: 0.05 + i * 0.05 }}
            >
              {w}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease, delay: 0.25 }}
          className="mt-4 text-base text-muted sm:text-lg"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
