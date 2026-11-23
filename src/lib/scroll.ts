import Lenis from "lenis";

let lenis: Lenis | null = null;

/** Starts Lenis smooth scrolling (skipped when the user prefers reduced motion). */
export function initSmoothScroll() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};
  lenis = new Lenis({ autoRaf: true, lerp: 0.1 });
  return () => {
    lenis?.destroy();
    lenis = null;
  };
}

export function scrollToId(id: string) {
  const el = id === "home" ? document.body : document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(id === "home" ? 0 : el, { offset: -88 });
  else if (id === "home") window.scrollTo({ top: 0, behavior: "smooth" });
  else el.scrollIntoView({ behavior: "smooth" });
}

/** Freeze page scroll (used while a modal is open). */
export function lockScroll(locked: boolean) {
  if (locked) {
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
  } else {
    lenis?.start();
    document.documentElement.style.overflow = "";
  }
}
