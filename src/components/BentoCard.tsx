import { useRef, type PointerEvent } from "react";
import { motion, useSpring, type HTMLMotionProps } from "motion/react";

type Props = HTMLMotionProps<"div"> & {
  /** Tilt the card slightly toward the cursor (mouse only). */
  tilt?: boolean;
  /** Delay for the scroll-in reveal, in seconds. */
  delay?: number;
};

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * The base bento tile: reveal-on-scroll, cursor-following spotlight border,
 * and optional 3D tilt. All styling for the glow lives in `.card` (index.css).
 */
export function BentoCard({
  className = "",
  children,
  tilt = false,
  delay = 0,
  style,
  onPointerMove,
  onPointerLeave,
  ...rest
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(0, { stiffness: 180, damping: 18 });
  const rotateY = useSpring(0, { stiffness: 180, damping: 18 });

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (el) {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      el.style.setProperty("--x", `${x}px`);
      el.style.setProperty("--y", `${y}px`);
      if (tilt && e.pointerType === "mouse") {
        rotateY.set((x / r.width - 0.5) * 6);
        rotateX.set(-(y / r.height - 0.5) * 6);
      }
    }
    onPointerMove?.(e);
  };

  const handleLeave = (e: PointerEvent<HTMLDivElement>) => {
    rotateX.set(0);
    rotateY.set(0);
    onPointerLeave?.(e);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease, delay }}
      style={{ rotateX, rotateY, transformPerspective: 1200, borderRadius: 28, ...style }}
      className={`card rounded-[28px] ${className}`}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
