"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import conceptify from "@/public/conceptify.png";
import booksmall from "@/public/booksmall.png";
import pdfkit from "@/public/pdfkit.png";
import { Tab, Tabs, Select, SelectItem, Avatar } from "@heroui/react";
import syncmate from "@/public/syncmate.jpeg";
import insightly from "@/public/Insightly.png";
import racle from "@/public/racle.jpeg";
import { useEffect, useState, useMemo, useRef } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { getPrs, type Tpr } from "../actions";

const statuses = [
  { id: "all", name: "All Statuses" },
  { id: "Open", name: "Open" },
  { id: "Merged", name: "Merged" },
  { id: "Closed", name: "Closed" },
];

function ProjectCard({
  project,
  index,
}: {
  project: {
    title: string;
    category: string;
    description: string;
    image: string;
    technologies: string[];
    githubUrl: string;
    liveUrl: string;
  };
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 200, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="card-glow premium-card overflow-hidden magnetic"
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.08 } },
      }}
    >
      {/* image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={project.image}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          alt={project.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-surface/10 to-transparent" />
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium glass-strong text-foreground">
          {project.category}
        </span>
      </div>

      <div className="p-5 flex flex-col gap-3">
        <h4 className="text-lg font-display font-semibold text-foreground">
          {project.title}
        </h4>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-0.5 rounded-md bg-background-secondary text-muted-foreground border border-border/70"
            >
              {tech}
            </span>
          ))}
        </div>
        <a
          href={project.liveUrl || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="self-start inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-accent transition-colors mt-1"
        >
          <span>Visit live</span>
          <FaExternalLinkAlt className="text-xs" />
        </a>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [prsStatus, setPrsStatus] = useState<"loading" | "error" | "fetched">("loading");
  const [prs, setPrs] = useState<Tpr[] | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [ownerFilter, setOwnerFilter] = useState<string>("all");

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

  const owners = useMemo(() => {
    if (!prs) return [];
    const uniqueOwners = new Map<string, { id: string; name: string; avatar: string }>();
    prs.forEach((pr) => {
      if (!uniqueOwners.has(pr.repo_owner)) {
        uniqueOwners.set(pr.repo_owner, {
          id: pr.repo_owner,
          name: pr.repo_owner,
          avatar: pr.avatar_url,
        });
      }
    });
    return [
      { id: "all", name: "All Organizations", avatar: "" },
      ...Array.from(uniqueOwners.values()),
    ];
  }, [prs]);

  const filteredPrs = useMemo(() => {
    if (!prs) return [];
    return prs.filter((pr) => {
      const statusMatch = statusFilter === "all" || pr.status === statusFilter;
      const ownerMatch = ownerFilter === "all" || pr.repo_owner.toLowerCase() === ownerFilter.toLowerCase();
      return statusMatch && ownerMatch;
    });
  }, [prs, statusFilter, ownerFilter]);

  const projects = [
    {
      title: "Insightly",
      category: "SaaS",
      description:
        "Web analytics platform providing revenue attributions for payment providers. Supports live visitors view, embeddable maps and twitter link attributions.",
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
        "A minimalistic Vercel alternative. Host your React projects for free with auto deployments triggered on every GitHub commit.",
      image: racle.src,
      technologies: ["tRPC", "Postgres", "Cloudflare", "Docker"],
      githubUrl: "https://github.com/Sahil-Gupta584/racke",
      liveUrl: "https://racle.xyz",
    },
    {
      title: "Conceptify",
      category: "Full Stack",
      description:
        "A tool for students to generate visual diagrams of their notes, ask concepts and get short explanations.",
      image: conceptify.src,
      technologies: ["Node.js", "Next.js", "MongoDB", "API"],
      githubUrl: "https://github.com/Sahil-Gupta584/Conceptify",
      liveUrl: "https://conceptify-kappa.vercel.app/landing",
    },
    {
      title: "Pdfkit",
      category: "API",
      description:
        "A one-stop solution for all of your document related work.",
      image: pdfkit.src,
      technologies: ["ILovePdf API", "Next.js"],
      githubUrl: "https://github.com/Sahil-Gupta584/pdfkit",
      liveUrl: "https://pdfkit.vercel.app/",
    },
    {
      title: "Booksmall",
      category: "Marketplace",
      description:
        "A marketplace for reading enthusiasts to buy, read, sell and repeat quickly, cutting new book costs.",
      image: booksmall.src,
      technologies: ["Mongo", "tRPC", "Websocket"],
      githubUrl: "https://github.com/Sahil-Gupta584/BooksMall",
      liveUrl: "https://books-mall.vercel.app",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  return (
    <section id="projects" className="py-24 relative aurora-bg overflow-hidden">
      <div className="aurora-blob aurora-blob--violet animate-aurora" style={{ width: 360, height: 360, top: "20%", left: "-5%" }} />
      <div className="absolute inset-0 bg-grid-pattern opacity-40 z-0" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-4">
            <span className="text-muted-foreground text-sm font-medium">Selected work</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight">
            <span className="gradient-text">Projects</span> &amp; Open Source
          </h2>
        </motion.div>

        <Tabs aria-label="Options" className="mb-8" color="primary" variant="underlined">
          <Tab key="projects" title="Projects">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {projects.map((project, index) => (
                <ProjectCard key={index} project={project} index={index} />
              ))}
            </motion.div>
          </Tab>

          <Tab key="prs" title="Open Source">
            <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center items-center">
              <Select
                className="max-w-xs"
                label="Status"
                placeholder="All Statuses"
                variant="bordered"
                selectedKeys={new Set([statusFilter])}
                disallowEmptySelection
                onSelectionChange={(keys) => {
                  const val = Array.from(keys)[0] as string;
                  setStatusFilter(val || "all");
                }}
              >
                {statuses.map((s) => (
                  <SelectItem key={s.id} textValue={s.name}>
                    {s.name}
                  </SelectItem>
                ))}
              </Select>

              <Select
                className="max-w-xs"
                label="Organization"
                placeholder="All Organizations"
                variant="bordered"
                items={owners}
                selectedKeys={new Set([ownerFilter])}
                disallowEmptySelection
                onSelectionChange={(keys) => {
                  const val = Array.from(keys)[0] as string;
                  setOwnerFilter(val || "all");
                }}
                renderValue={(items) =>
                  items.map((item) => (
                    <div key={item.key} className="flex items-center gap-2">
                      {item.data && item.data.avatar ? (
                        <Avatar alt={item.data.name} className="shrink-0 w-5 h-5" src={item.data.avatar} />
                      ) : null}
                      <span>{item.data?.name || "All Organizations"}</span>
                    </div>
                  ))
                }
              >
                {(owner) => (
                  <SelectItem key={owner.id} textValue={owner.name}>
                    <div className="flex gap-2 items-center">
                      {owner.avatar && (
                        <Avatar alt={owner.name} className="shrink-0" size="sm" src={owner.avatar} />
                      )}
                      <span className="text-small">{owner.name}</span>
                    </div>
                  </SelectItem>
                )}
              </Select>
            </div>

            {prs ? (
              filteredPrs.length > 0 ? (
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {filteredPrs.map((pr, index) => (
                    <motion.div
                      key={index}
                      className="card-glow premium-card p-5 magnetic"
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                      }}
                    >
                      <div className="flex items-center mb-4">
                        <img
                          src={pr.avatar_url}
                          alt={pr.repo_owner}
                          className="w-11 h-11 rounded-full mr-3 border border-border shadow-sm"
                        />
                        <div>
                          <p className="font-semibold text-foreground text-sm">
                            {pr.repo_owner}
                          </p>
                          <span
                            className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                              pr.status === "Open"
                                ? "bg-amber-100 text-amber-700"
                                : pr.status === "Merged"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-zinc-100 text-zinc-600"
                            }`}
                          >
                            {pr.status}
                          </span>
                        </div>
                      </div>
                      <a
                        href={pr.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-start text-base font-medium text-primary hover:text-accent transition-colors line-clamp-2"
                      >
                        {pr.title}
                      </a>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="text-muted-foreground text-center py-20 premium-card border-dashed">
                  <p className="text-lg mb-2">No contributions found</p>
                  <p className="text-sm">Try adjusting your filters to see more results.</p>
                </div>
              )
            ) : (
              <div className="text-muted-foreground text-center py-10">
                Loading...
              </div>
            )}
            {prsStatus === "error" && (
              <p className="text-red-500 text-center mt-4">Failed to fetch PR&apos;s</p>
            )}
          </Tab>
        </Tabs>
      </div>
    </section>
  );
}
