"use client";
import About from "./components/skills";
import Projects from "./components/projects";
import Hero from "./components/hero";
import ExperienceSection from "./components/experience";
import Contact from "./components/contact";

export default function Page() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ExperienceSection />
      <About />
      <Projects />
      <Contact />
      <footer className="page-shell site-footer">
        <span>&lt; Sahil Gupta /&gt;</span>
        <span>Full Stack Developer</span>
      </footer>
    </main>
  );
}