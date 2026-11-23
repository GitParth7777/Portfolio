import { useEffect, useRef, type CSSProperties, type PointerEvent, type ReactNode } from "react";
import { animate, motion, useInView, useScroll, useSpring } from "motion/react";
import { Moon, Sun } from "lucide-react";
import { TechIcon } from "../data/techIcons";

/* ───────────── Magnetic: element drifts toward the cursor ───────────── */
export function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 250, damping: 15, mass: 0.4 });
  const y = useSpring(0, { stiffness: 250, damping: 15, mass: 0.4 });

  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div ref={ref} style={{ x, y }} onPointerMove={move} onPointerLeave={reset} className="inline-block">
      {children}
    </motion.div>
  );
}

/* ───────────── Tag chip ───────────── */
export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line bg-card-2 px-2.5 py-1 text-xs text-muted">
      {children}
    </span>
  );
}

/* ───────────── Infinite tech marquee ───────────── */
export function Marquee({ items, duration = 45 }: { items: string[]; duration?: number }) {
  return (
    <div className="marquee marquee-mask overflow-hidden">
      <div className="marquee-track flex w-max" style={{ "--duration": `${duration}s` } as CSSProperties}>
        {[...items, ...items].map((t, i) => (
          <span
            key={i}
            aria-hidden={i >= items.length}
            className="mr-3 flex items-center gap-2 whitespace-nowrap rounded-full border border-line bg-card-2 px-4 py-2 text-sm"
          >
            <TechIcon name={t} />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ───────────── Count-up number (runs once when scrolled into view) ───────────── */
export function CountUp({
  value,
  decimals = 0,
  suffix = "",
  className = "",
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const final = value.toFixed(decimals) + suffix;

  useEffect(() => {
    const node = ref.current;
    if (!inView || !node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.textContent = final;
      return;
    }
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => (node.textContent = v.toFixed(decimals) + suffix),
    });
    return () => controls.stop();
  }, [inView, value, decimals, suffix, final]);

  return (
    <>
      <span ref={ref} aria-hidden className={`tabular-nums ${className}`}>
        {(0).toFixed(decimals) + suffix}
      </span>
      <span className="sr-only">{final}</span>
    </>
  );
}

/* ───────────── Thin progress bar at the top of the page ───────────── */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, restDelta: 0.001 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-gradient-to-r from-accent to-accent-2"
    />
  );
}

/* ───────────── Page background: grid + slow-moving glow ───────────── */
export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="bg-grid absolute inset-0" />
      <motion.div
        className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-accent/15 blur-[120px]"
        animate={{ x: ["-50%", "-40%", "-58%", "-50%"], y: [0, 30, -10, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -top-20 right-[-10%] h-[360px] w-[420px] rounded-full bg-accent-2/10 blur-[110px]"
        animate={{ y: [0, 40, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/* ───────────── Theme toggle (sun ↔ moon) ───────────── */
export function ThemeToggle({ theme, onToggle }: { theme: "light" | "dark"; onToggle: (el: HTMLElement) => void }) {
  return (
    <button
      type="button"
      onClick={(e) => onToggle(e.currentTarget)}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className="relative grid size-9 place-items-center overflow-hidden rounded-full text-muted transition-colors hover:bg-card-2 hover:text-fg"
    >
      <motion.span
        key={theme}
        initial={{ y: 18, rotate: -90, opacity: 0 }}
        animate={{ y: 0, rotate: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="grid place-items-center"
      >
        {theme === "dark" ? <Moon className="size-[18px]" /> : <Sun className="size-[18px]" />}
      </motion.span>
    </button>
  );
}
