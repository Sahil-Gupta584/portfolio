"use client";
import About from "./components/skills";
import Projects from "./components/projects";
import Hero from "./components/hero";

export default function Page() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      {/* <ExperienceSection /> */}
    </>
  );
}
