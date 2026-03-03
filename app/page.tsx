"use client";

import Hero from "./components/hero";
import Skills from "./components/skills";
import Projects from "./components/projects";
import ExperienceSection from "./components/experience";
import Footer from "./components/footer";

export default function Page() {
  return (
    <>
      <Hero />
      <Skills />
      <Projects />
      <ExperienceSection />
      <Footer />
    </>
  );
}
