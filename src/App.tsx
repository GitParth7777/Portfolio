import { useEffect } from "react";
import { MotionConfig } from "motion/react";
import { Navbar } from "./components/Navbar";
import { Background, ScrollProgress } from "./components/ui";
import { useTheme } from "./hooks/useTheme";
import { initSmoothScroll } from "./lib/scroll";
import { About } from "./sections/About";
import { Contact } from "./sections/Contact";
import { Experience } from "./sections/Experience";
import { Footer } from "./sections/Footer";
import { Hero } from "./sections/Hero";
import { Projects } from "./sections/Projects";
import { Skills } from "./sections/Skills";

export default function App() {
  const { theme, toggle } = useTheme();

  useEffect(() => initSmoothScroll(), []);

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-bg"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Background />
      <Navbar theme={theme} onToggleTheme={toggle} />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <About />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
