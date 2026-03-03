"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    label: "Languages",
    skills: ["JavaScript", "TypeScript", "Python"],
  },
  {
    label: "Frameworks & Libraries",
    skills: [
      "React",
      "Next.js",
      "Express",
      "Node.js",
      "Tailwind CSS",
      "React Query",
      "Redux",
      "Tanstack",
      "LangChain",
      "LangGraph",
      "WebSocket",
      "Puppeteer",
    ],
  },
  {
    label: "Databases & ORMs",
    skills: ["MongoDB", "PostgreSQL", "Redis", "Prisma", "Appwrite"],
  },
  {
    label: "Tools & Platforms",
    skills: ["GitHub Actions", "Docker", "AWS", "Serverless"],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 sm:py-32 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-semibold text-stone-900 dark:text-stone-100 mb-2">
            My Toolkit
          </h2>
          <p className="text-stone-500 dark:text-stone-400 text-sm">
            things I actually use, not just list on LinkedIn
          </p>
        </motion.div>

        <div className="space-y-10">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * (categoryIndex + 1) }}
            >
              <h3 className="text-xs font-medium text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-3">
                {category.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span key={skill} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
