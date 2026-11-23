import { useRef, type ReactNode } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { Mic } from "lucide-react";
import { useTicker } from "../hooks/useTicker";

/* Small animated illustrations shown inside the experience / project cards.
   Each one only animates while it is on screen. */

function useVisible() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  return { ref, inView };
}

/* ───────────── Shifra: voice assistant ───────────── */
const conversation = [
  { who: "You", text: "Explain WebSockets in one line." },
  { who: "Shifra", text: "A connection that stays open, so the server can push updates instantly." },
  { who: "You", text: "And how is that different from REST?" },
  { who: "Shifra", text: "REST asks and waits for an answer. A WebSocket keeps the line open." },
];
const bars = Array.from({ length: 28 }, (_, i) => i);

export function VoiceVisual() {
  const { ref, inView } = useVisible();
  const tick = useTicker(2800, inView);
  const line = conversation[tick % conversation.length];
  const isUser = line.who === "You";

  return (
    <div ref={ref} className="flex h-full flex-col items-center justify-center gap-5 py-2">
      <div className="relative grid place-items-center">
        <span className="animate-ping-soft absolute size-14 rounded-full bg-accent/40" />
        <span className="animate-ping-soft absolute size-14 rounded-full bg-accent/30" style={{ animationDelay: "1s" }} />
        <span className="relative grid size-14 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-2 text-white shadow-lg shadow-accent/30">
          <Mic className="size-6" />
        </span>
      </div>
      <div className="flex h-10 items-center gap-[3px]" aria-hidden>
        {bars.map((i) => (
          <span
            key={i}
            className="animate-wave w-[3px] rounded-full bg-gradient-to-t from-accent to-accent-2"
            style={{
              height: `${14 + ((i * 37) % 26)}px`,
              animationDelay: `${((i * 137) % 1000) / 1000}s`,
              animationPlayState: inView ? "running" : "paused",
            }}
          />
        ))}
      </div>
      <div className="h-16 w-full max-w-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={tick}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className={`flex ${isUser ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${
                isUser ? "rounded-br-md bg-accent text-white" : "rounded-bl-md border border-line bg-card"
              }`}
            >
              <span className="mb-0.5 block text-[10px] font-semibold opacity-70">{line.who}</span>
              {line.text}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ───────────── CodeSync: two people editing the same file ───────────── */
const typedLine = 'socket.emit("join", { roomId, username });';

export function EditorVisual() {
  const { ref, inView } = useVisible();
  const tick = useTicker(85, inView);
  const cycle = typedLine.length + 30;
  const pos = tick % cycle;
  const typed = typedLine.slice(0, Math.min(pos, typedLine.length));
  const showToast = pos < 14;

  return (
    <div ref={ref} className="relative overflow-hidden rounded-xl border border-line bg-[#0d0d12] font-mono text-[11px] text-zinc-300 sm:text-xs">
      <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 truncate text-zinc-500">room: a1b2-c3d4</span>
        <span className="ml-auto flex items-center gap-1.5 text-zinc-400">
          <span className="flex -space-x-1.5">
            <span className="grid size-5 place-items-center rounded-full bg-violet-500 text-[9px] font-semibold text-white ring-2 ring-[#0d0d12]">P</span>
            <span className="grid size-5 place-items-center rounded-full bg-pink-500 text-[9px] font-semibold text-white ring-2 ring-[#0d0d12]">R</span>
          </span>
          2 online
        </span>
      </div>
      <div className="space-y-1 px-3 py-3 leading-relaxed">
        <Line n={1}>
          <span className="text-violet-400">const</span> socket = <span className="text-sky-400">io</span>(SERVER_URL);
        </Line>
        <Line n={2}>
          <span className="text-zinc-500">{"// sync every keystroke"}</span>
        </Line>
        <Line n={3}>
          <span className="whitespace-pre">
            {typed}
            <span className="inline-block h-[1.1em] w-px translate-y-[2px] bg-pink-400" />
            <span className="ml-1 rounded bg-pink-500 px-1 py-px text-[9px] text-white">Riya</span>
          </span>
        </Line>
        <Line n={4}>
          socket.<span className="text-sky-400">on</span>(<span className="text-emerald-400">"code-change"</span>, ({"{ code }"}) =&gt; {"{"}
        </Line>
        <Line n={5}>
          <span className="whitespace-pre">  </span>
          <span className="text-sky-400">setCode</span>(code);
          <span className="animate-blink ml-px inline-block h-[1.1em] w-px translate-y-[2px] bg-violet-400" />
        </Line>
        <Line n={6}>{"});"}</Line>
      </div>
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-2 right-2 rounded-lg bg-emerald-500/15 px-2 py-1 text-[10px] text-emerald-400"
          >
            Riya joined the room
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Line({ n, children }: { n: number; children: ReactNode }) {
  return (
    <div className="flex min-h-[1.4em] gap-3">
      <span className="w-3 shrink-0 select-none text-right text-zinc-600">{n}</span>
      <span className="min-w-0 truncate">{children}</span>
    </div>
  );
}
