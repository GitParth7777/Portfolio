import { useEffect, useRef, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { lockScroll } from "../lib/scroll";

/**
 * Full detail view that morphs out of the card sharing its `layoutId`.
 */
export function DetailModal({
  layoutId,
  open,
  onClose,
  label,
  children,
}: {
  layoutId: string | null;
  open: boolean;
  onClose: () => void;
  label: string;
  children: ReactNode;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener("keydown", onKey);
      previouslyFocused?.focus({ preventScroll: true });
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && layoutId && (
        <div className="fixed inset-0 z-[80] grid place-items-center p-3 sm:p-6">
          <motion.div
            className="absolute inset-0 bg-black/55 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            layoutId={layoutId}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            style={{ borderRadius: 28 }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="card relative w-full max-w-3xl overflow-hidden"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-full border border-line bg-card-2 text-muted transition hover:rotate-90 hover:text-fg"
            >
              <X className="size-5" />
            </button>
            <motion.div
              data-lenis-prevent
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.15, duration: 0.35 } }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              className="max-h-[86vh] overflow-y-auto p-6 sm:p-10"
            >
              {children}
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
