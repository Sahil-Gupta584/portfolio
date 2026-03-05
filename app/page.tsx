"use client";
import About from "./components/skills";
import Projects from "./components/projects";
import Hero from "./components/hero";
import ExperienceSection from "./components/experience";
import PortfolioAnalytics from "./components/portfolioAnalytics";
import { useState, useEffect } from "react";

export default function Page() {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setLoading(false);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

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
