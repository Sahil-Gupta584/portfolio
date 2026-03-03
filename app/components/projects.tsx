"use client";

import { motion } from "framer-motion";
import conceptify from "@/public/conceptify.png";
import booksmall from "@/public/booksmall.png";
import pdfkit from "@/public/pdfkit.png";
import syncmate from "@/public/syncmate.jpeg";
import insightly from "@/public/Insightly.png";
import racle from "@/public/racle.jpeg";
import { useEffect, useState, useMemo } from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { getPrs, type Tpr } from "../actions";

const statusOptions = [
  { id: "all", name: "All" },
  { id: "Open", name: "Open" },
  { id: "Merged", name: "Merged" },
  { id: "Closed", name: "Closed" },
];

const projects = [
  {
    title: "Insightly",
    category: "SaaS",
    description:
      "Web analytics platform with revenue attribution for payment providers, live visitors, and embeddable maps.",
    image: insightly.src,
    technologies: ["Appwrite", "Tanstack", "TailwindCSS"],
    githubUrl: "https://github.com/Sahil-Gupta584/tanstack-stat",
    liveUrl: "https://insightly.live",
  },
  {
    title: "Syncmate",
    category: "SaaS",
    description:
      "One-stop solution for content creators to manage multiple YouTube channels, video files and editors.",
    image: syncmate.src,
    technologies: ["Postgres", "tRPC", "AWS", "Docker"],
    githubUrl: "https://github.com/Sahil-Gupta584/Syncmate",
    liveUrl: "https://syncmate.xyz",
  },
  {
    title: "Racle",
    category: "Backend",
    description:
      "A minimalistic Vercel alternative. Host React projects for free with auto deployments on commit.",
    image: racle.src,
    technologies: ["tRPC", "Postgres", "Cloudflare", "Docker"],
    githubUrl: "https://github.com/Sahil-Gupta584/racke",
    liveUrl: "https://racle.xyz",
  },
  {
    title: "Conceptify",
    category: "Full Stack",
    description:
      "A tool for students to generate visual diagrams of their notes and get quick concept explanations.",
    image: conceptify.src,
    technologies: ["Node.js", "Next.js", "MongoDB"],
    githubUrl: "https://github.com/Sahil-Gupta584/Conceptify",
    liveUrl: "https://conceptify-kappa.vercel.app/landing",
  },
  {
    title: "Pdfkit",
    category: "API",
    description: "One-stop solution for all your document-related needs.",
    image: pdfkit.src,
    technologies: ["ILovePdf API", "Next.js"],
    githubUrl: "https://github.com/Sahil-Gupta584/pdfkit",
    liveUrl: "https://pdfkit.vercel.app/",
  },
  {
    title: "Booksmall",
    category: "Marketplace",
    description:
      "Marketplace for book enthusiasts to buy, sell, and trade books at a fraction of the cost.",
    image: booksmall.src,
    technologies: ["MongoDB", "tRPC", "WebSocket"],
    githubUrl: "https://github.com/Sahil-Gupta584/BooksMall",
    liveUrl: "https://books-mall.vercel.app",
  },
];

export default function Projects() {
  const [activeTab, setActiveTab] = useState<"projects" | "opensource">(
    "projects"
  );
  const [prsStatus, setPrsStatus] = useState<"loading" | "error" | "fetched">(
    "loading"
  );
  const [prs, setPrs] = useState<Tpr[] | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    (async () => {
      const data = await getPrs();
      if (data.ok && data.results) {
        setPrsStatus("fetched");
        setPrs(data.results);
      } else {
        setPrsStatus("error");
      }
    })();
  }, []);

  const filteredPrs = useMemo(() => {
    if (!prs) return [];
    return prs.filter(
      (pr) => statusFilter === "all" || pr.status === statusFilter
    );
  }, [prs, statusFilter]);

  return (
    <section id="projects" className="py-24 sm:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-semibold text-stone-900 dark:text-stone-100 mb-2">
            Things I&apos;ve Built
          </h2>
          <p className="text-stone-500 dark:text-stone-400 text-sm">
            some of these actually have users
          </p>
        </motion.div>

        {/* Tab Switcher */}
        <div className="flex gap-1 mb-10 p-1 bg-stone-100 dark:bg-stone-900 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-4 py-2 text-sm rounded-md transition-all ${
              activeTab === "projects"
                ? "bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-sm"
                : "text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300"
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab("opensource")}
            className={`px-4 py-2 text-sm rounded-md transition-all ${
              activeTab === "opensource"
                ? "bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-sm"
                : "text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300"
            }`}
          >
            Open Source
          </button>
        </div>

        {/* Projects Grid */}
        {activeTab === "projects" && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            {projects.map((project) => (
              <motion.div
                key={project.title}
                className="group rounded-xl border border-stone-200 dark:border-stone-800 overflow-hidden bg-white dark:bg-stone-900 hover:border-stone-300 dark:hover:border-stone-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.4 },
                  },
                }}
              >
                <div className="aspect-video overflow-hidden bg-stone-100 dark:bg-stone-800">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-stone-900 dark:text-stone-100">
                      {project.title}
                    </h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-sm text-stone-500 dark:text-stone-400 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 flex items-center gap-1.5 transition-colors"
                    >
                      Visit <FaExternalLinkAlt className="w-3 h-3" />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 flex items-center gap-1.5 transition-colors"
                    >
                      Code <FaGithub className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Open Source */}
        {activeTab === "opensource" && (
          <div>
            {/* Status Filter */}
            <div className="flex gap-2 mb-8 flex-wrap">
              {statusOptions.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setStatusFilter(s.id)}
                  className={`px-3 py-1.5 text-sm rounded-lg border transition-all ${
                    statusFilter === s.id
                      ? "bg-stone-900 dark:bg-stone-100 text-stone-50 dark:text-stone-900 border-stone-900 dark:border-stone-100"
                      : "bg-transparent border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400 hover:border-stone-400 dark:hover:border-stone-600"
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>

            {prsStatus === "loading" && (
              <div className="text-center py-20 text-stone-400 dark:text-stone-500">
                <div className="inline-block w-5 h-5 border-2 border-stone-300 dark:border-stone-600 border-t-transparent rounded-full animate-spin mb-3" />
                <p className="text-sm">Fetching contributions...</p>
              </div>
            )}

            {prsStatus === "error" && (
              <div className="text-center py-20 text-stone-400 dark:text-stone-500">
                <p className="text-sm">
                  Failed to load contributions. GitHub might be having a moment.
                </p>
              </div>
            )}

            {prsStatus === "fetched" && filteredPrs.length === 0 && (
              <div className="text-center py-20 text-stone-400 dark:text-stone-500">
                <p className="text-lg mb-1">Nothing here</p>
                <p className="text-sm">
                  Try adjusting the filter... or check back after my next coding
                  spree.
                </p>
              </div>
            )}

            {prsStatus === "fetched" && filteredPrs.length > 0 && (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.05 },
                  },
                }}
              >
                {filteredPrs.map((pr, i) => (
                  <motion.a
                    key={i}
                    href={pr.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 p-4 rounded-lg border border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 bg-white dark:bg-stone-900 transition-all hover:-translate-y-0.5"
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <img
                      src={pr.avatar_url}
                      alt={pr.repo_owner}
                      className="w-8 h-8 rounded-full flex-shrink-0 mt-0.5"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-stone-900 dark:text-stone-100 line-clamp-1 mb-1">
                        {pr.title}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-stone-500 dark:text-stone-400">
                          {pr.repo_owner}
                        </span>
                        <span
                          className={`text-xs px-1.5 py-0.5 rounded-full ${
                            pr.status === "Open"
                              ? "bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                              : pr.status === "Merged"
                              ? "bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400"
                              : "bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400"
                          }`}
                        >
                          {pr.status}
                        </span>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </motion.div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
