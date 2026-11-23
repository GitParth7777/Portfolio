import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";
import { scrollToId } from "../lib/scroll";
import { profile } from "../data/portfolio";
import { ThemeToggle } from "./ui";
import type { Theme } from "../hooks/useTheme";

const links = [
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];
const sectionIds = ["home", ...links.map((l) => l.id)];

function useActiveSection() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  return active;
}

export function Navbar({ theme, onToggleTheme }: { theme: Theme; onToggleTheme: (el: HTMLElement) => void }) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 240);
    if (y > prev && open) setOpen(false);
  });

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <motion.header
      animate={{ y: hidden ? -110 : 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    >
      <nav
        aria-label="Main"
        className="relative flex items-center gap-1 rounded-full border border-line bg-card/75 p-1.5 shadow-lg shadow-black/5 backdrop-blur-xl"
      >
        <button
          type="button"
          onClick={() => go("home")}
          aria-label="Back to top"
          className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-2 text-xs font-bold text-white transition-transform hover:scale-105"
        >
          PB
        </button>

        <ul className="hidden items-center md:flex">
          {links.map((l) => (
            <li key={l.id}>
              <button
                type="button"
                onClick={() => go(l.id)}
                aria-current={active === l.id ? "true" : undefined}
                className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                  active === l.id ? "text-fg" : "text-muted hover:text-fg"
                }`}
              >
                {active === l.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-card-2 ring-1 ring-line"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{l.label}</span>
              </button>
            </li>
          ))}
        </ul>

        <ThemeToggle theme={theme} onToggle={onToggleTheme} />

        <a
          href={profile.resume}
          target="_blank"
          rel="noopener"
          className="hidden rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-85 sm:inline-flex"
        >
          Resume
        </a>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="grid size-9 place-items-center rounded-full text-muted hover:bg-card-2 hover:text-fg md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>

      </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 -z-10 bg-black/30 backdrop-blur-[2px] md:hidden"
            />
          )}
          {open && (
            <motion.ul
              key="menu"
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-x-4 top-[calc(100%+10px)] z-10 mx-auto max-w-sm origin-top rounded-3xl border border-line bg-card p-2 shadow-2xl shadow-black/20 md:hidden"
            >
              {links.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: 0.03 * i } }}
                >
                  <button
                    type="button"
                    onClick={() => go(l.id)}
                    className={`w-full rounded-2xl px-4 py-3 text-left text-base ${
                      active === l.id ? "bg-card-2 text-fg" : "text-muted"
                    }`}
                  >
                    {l.label}
                  </button>
                </motion.li>
              ))}
              <li>
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noopener"
                  className="mt-1 block rounded-2xl bg-fg px-4 py-3 text-center text-base font-medium text-bg"
                >
                  Resume
                </a>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
    </motion.header>
  );
}
