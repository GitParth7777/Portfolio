import { ArrowUp } from "lucide-react";
import { profile } from "../data/portfolio";
import { scrollToId } from "../lib/scroll";

export function Footer() {
  return (
    <footer className="mx-auto mt-24 max-w-6xl px-4 pb-10">
      <div className="flex flex-col items-center justify-between gap-4 border-t border-line pt-8 text-sm text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with React, Motion &amp; Tailwind.
        </p>
        <button
          type="button"
          onClick={() => scrollToId("home")}
          className="group inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 transition-colors hover:text-fg"
        >
          Back to top <ArrowUp className="size-4 transition-transform group-hover:-translate-y-0.5" />
        </button>
      </div>
    </footer>
  );
}
