"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiReact,
  SiNextdotjs,
  SiExpress,
  SiNodedotjs,
  SiTailwindcss,
  SiReactquery,
  SiRedux,
  SiLangchain,
  SiPuppeteer,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiPrisma,
  SiAppwrite,
  SiGithubactions,
  SiServerless,
  SiDocker,
  SiAmazonwebservices,
} from "react-icons/si";
import type { IconType } from "react-icons";

type Tech = {
  name: string;
  icon: IconType;
  color: string;
};

const skillGroups: { label: string; items: Tech[] }[] = [
  {
    label: "Languages",
    items: [
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "Python", icon: SiPython, color: "#3776AB" },
    ],
  },
  {
    label: "Libraries & Frameworks",
    items: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "NextJS", icon: SiNextdotjs, color: "#111827" },
      { name: "Express", icon: SiExpress, color: "#111827" },
      { name: "NodeJs", icon: SiNodedotjs, color: "#339933" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "React Query", icon: SiReactquery, color: "#FF4154" },
      { name: "Redux", icon: SiRedux, color: "#764ABC" },
      { name: "Tanstack", icon: SiReact, color: "#FF4154" },
      { name: "Langchain", icon: SiLangchain, color: "#1C7C4E" },
      { name: "Langgraph", icon: SiLangchain, color: "#2563EB" },
      { name: "Websocket", icon: SiNodedotjs, color: "#6B7280" },
      { name: "Puppeteer", icon: SiPuppeteer, color: "#40B5A4" },
    ],
  },
  {
    label: "Databases & ORMs",
    items: [
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "Postgres", icon: SiPostgresql, color: "#4169E1" },
      { name: "Redis", icon: SiRedis, color: "#DC382D" },
      { name: "Prisma", icon: SiPrisma, color: "#2D3748" },
      { name: "Appwrite", icon: SiAppwrite, color: "#F02E65" },
    ],
  },
  {
    label: "Tools & Platforms",
    items: [
      { name: "GitHub Actions", icon: SiGithubactions, color: "#2088FF" },
      { name: "Serverless", icon: SiServerless, color: "#FD5750" },
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "AWS", icon: SiAmazonwebservices, color: "#FF9900" },
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="skills"
      className="py-28 relative overflow-hidden aurora-bg"
      ref={sectionRef}
    >
      <div className="aurora-blob aurora-blob--indigo animate-aurora" style={{ width: 320, height: 320, top: "10%", right: "5%" }} />
      <div className="absolute inset-0 dots-overlay opacity-50 z-0" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-4">
            <span className="text-muted-foreground text-sm font-medium">My toolkit</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight">
            <span className="gradient-text">Skills</span> &amp; Stack
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto grid gap-6 sm:grid-cols-2">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.label}
              className="card-glow premium-card p-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + gi * 0.1 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-5 rounded-full bg-gradient-to-b from-primary to-accent" />
                <h3 className="font-display font-semibold text-foreground text-sm">
                  {group.label}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {group.items.map((tech, i) => (
                  <motion.div
                    key={tech.name}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-background-secondary border border-border/70 hover:border-primary/40 transition-colors group/tech"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.3 + gi * 0.1 + i * 0.04 }}
                  >
                    <tech.icon
                      className="text-base transition-transform group-hover/tech:scale-110"
                      style={{ color: tech.color }}
                    />
                    <span className="text-xs font-medium text-muted-foreground group-hover/tech:text-foreground transition-colors">
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
