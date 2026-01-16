"use client";
import About from "./components/skills";
import Projects from "./components/projects";
import Hero from "./components/hero";
import ExperienceSection from "./components/experience";
import PortfolioAnalytics from "./components/portfolioAnalytics";

export default function Page() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <ExperienceSection />
      <PortfolioAnalytics />
    </>
  );
}
