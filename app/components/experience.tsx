"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    company: "Primexop",
    companyUrl: "https://primexop.com",
    role: "Full Stack Developer",
    duration: "6 months",
    description:
      "Delivered 5+ client solutions including hospital systems, school management, and admin panels. Built scalable architectures with great user interfaces.",
    techStack: ["Node.js", "Prisma", "tRPC", "Vite", "MySQL"],
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24 sm:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-semibold text-stone-900 dark:text-stone-100 mb-2">
            Experience
          </h2>
          <p className="text-stone-500 dark:text-stone-400 text-sm">
            they let me touch production
          </p>
        </motion.div>

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-stone-900 dark:text-stone-100">
                    {exp.role}
                  </h3>
                  <a
                    href={exp.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
                  >
                    {exp.company}
                  </a>
                </div>
                <span className="text-sm text-stone-400 dark:text-stone-500 mt-1 sm:mt-0">
                  {exp.duration}
                </span>
              </div>
              <p className="text-sm text-stone-500 dark:text-stone-400 mb-4 leading-relaxed">
                {exp.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {exp.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 border border-stone-200 dark:border-stone-700"
                  >
                    {tech}
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
