import { motion } from "framer-motion";
import conceptify from "@/public/conceptify.png";
import booksmall from "@/public/booksmall.png";
import pdfkit from "@/public/pdfkit.png";
import { Tab, Tabs, Select, SelectItem, Avatar } from "@heroui/react";
import syncmate from "@/public/syncmate.jpeg";
import racle from "@/public/racle.jpeg";
import { useEffect, useState, useMemo } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { getPrs, type Tpr } from "../actions";

const statuses = [
  { id: "all", name: "All Statuses" },
  { id: "Open", name: "🟡 Open" },
  { id: "Merged", name: "✅ Merged" },
  { id: "Closed", name: "🔒 Closed" },
];

export default function Projects() {
  const [prsStatus, setPrsStatus] = useState<"loading" | "error" | "fetched">(
    "loading"
  );
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
      // Case-insensitive matching for robustness
      const ownerMatch = ownerFilter === "all" || pr.repo_owner.toLowerCase() === ownerFilter.toLowerCase();
      return statusMatch && ownerMatch;
    });
  }, [prs, statusFilter, ownerFilter]);

  const projects = [
    {
      title: "Syncmate",
      category: "SaaS",
      description:
        "Syncmate is onestop solution for content creators to manage there multiple youtube channels, video files and editors. ",
      image: syncmate.src,
      technologies: ["Postgres", "tRPC", "Aws", "Docker"],
      githubUrl: "https://github.com/Sahil-Gupta584/Syncmate",
      liveUrl: "https://syncmate.xyz",
    },
    {
      title: "Racle",
      category: "Backend",
      description:
        "Racle is a minimalistic Vercel alternative. You can host your react projects for free with auto deployments on commit triggered on you githuh repository.",
      image: racle.src,
      technologies: ["tRPC", "Postgres", "Cloudflare", "Docker"],
      githubUrl: "https://github.com/Sahil-Gupta584/racke",
      liveUrl: "https://racle.xyz",
    },
    {
      title: "Conceptify",
      category: "Full Stack",
      description:
        "Conceptify is a tool for students where they can generate generate visual diagrams of their notes, ask concepts, short explanation. ",
      image: conceptify.src,
      technologies: ["Node.js", "Next.js", "MongoDB", "API"],
      githubUrl: "https://github.com/Sahil-Gupta584/Conceptify",
      liveUrl: "https://conceptify-kappa.vercel.app/landing",
    },
    {
      title: "Pdfkit",
      category: "API",
      description:
        "Pdfkit is onestop solution for all of your document related works. ",
      image: pdfkit.src,
      technologies: ["ILovePdf API", "Next.js"],
      githubUrl: "https://github.com/Sahil-Gupta584/pdfkit",
      liveUrl: "https://pdfkit.vercel.app/",
    },
    {
      title: "Booksmall",
      category: "Marketplace",
      description:
        "Booksmall is marketplace for reader enthusiast where they can buy,read, sell and reapeat quickly with cutting new books cost. ",
      image: booksmall.src,
      technologies: ["Mongo", "tRPC", "Websocket"],
      githubUrl: "https://github.com/Sahil-Gupta584/BooksMall",
      liveUrl: "https://books-mall.vercel.app",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="projects" className="py-20 min-h-screen animated-gradient">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Tabs aria-label="Options" className="mb-4 text-xl">
            <Tab key="projects" title="Projects">
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {projects.map((project, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col bg-gray-900/70 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:border-blue-500/30"
                    variants={itemVariants}
                  >
                    <img
                      src={project.image}
                      className="w-full h-48 object-cover"
                      alt={project.title}
                    />
                    <div className="p-6 flex flex-col justify-between grow">
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="text-xl font-semibold text-white">
                            {project.title}
                          </h4>
                          <span className="bg-blue-500/20 text-blue-400 text-xs px-2.5 py-1 rounded-full">
                            {project.category}
                          </span>
                        </div>
                        <p className="text-gray-400 mb-4 text-sm text-start">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-5">
                          {project.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="bg-gray-800 text-gray-300 text-xs px-2.5 py-1 rounded-full border border-gray-700"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-between items-center self-end">
                        <a
                          href={project.liveUrl || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 gap-2 hover:text-blue-300 hover:underline font-medium flex items-center transition-colors"
                        >
                          <span>Visit</span>
                          <FaExternalLinkAlt />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </Tab>

            <Tab key="prs" title="Open Source">
              <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center items-center">
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
                  classNames={{
                    label: "text-white/70",
                    trigger: "bg-gray-900/50 border-gray-700 text-white hover:border-blue-500/50 transition-colors",
                    value: "text-white",
                    popoverContent: "bg-gray-900 border-gray-700",
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
                  classNames={{
                    label: "text-white/70",
                    trigger: "bg-gray-900/50 border-gray-700 text-white hover:border-blue-500/50 transition-colors",
                    value: "text-white",
                    popoverContent: "bg-gray-900 border-gray-700",
                    listboxWrapper: "max-h-[400px]",
                  }}
                  renderValue={(items) => {
                    return items.map((item) => (
                      <div key={item.key} className="flex items-center gap-2">
                        {item.data && item.data.avatar ? (
                          <Avatar alt={item.data.name} className="shrink-0 w-5 h-5" src={item.data.avatar} />
                        ) : null}
                        <span>{item.data?.name || "All Organizations"}</span>
                      </div>
                    ));
                  }}
                >
                  {(owner) => (
                    <SelectItem key={owner.id} textValue={owner.name}>
                      <div className="flex gap-2 items-center">
                        {owner.avatar && (
                          <Avatar alt={owner.name} className="shrink-0" size="sm" src={owner.avatar} />
                        )}
                        <span className="text-small text-white">{owner.name}</span>
                      </div>
                    </SelectItem>
                  )}
                </Select>
              </div>

              {prs ? (
                filteredPrs.length > 0 ? (
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {filteredPrs.map((pr, index) => (
                      <motion.div
                        key={index}
                        className="bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-xl p-5 shadow-lg hover:shadow-2xl hover:border-blue-500/40 transition-all duration-300 transform hover:-translate-y-1"
                        variants={itemVariants}
                      >
                        <div className="flex items-center mb-4">
                          <img
                            src={pr.avatar_url}
                            alt={pr.repo_owner}
                            className="w-12 h-12 rounded-full mr-4 border border-gray-600 shadow-md"
                          />
                          <div>
                            <p className="font-semibold text-white">
                              {pr.repo_owner}
                            </p>
                            <p
                              className={`uppercase w-fit items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${pr.status === "Open"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : pr.status === "Merged"
                                  ? "bg-green-500/20 text-green-400"
                                  : "bg-gray-500/20 text-gray-400"
                                }`}
                            >
                              {pr.status === "Open"
                                ? "🟡 Open"
                                : pr.status === "Merged"
                                  ? "✅ Merged"
                                  : "🔒 Closed"}
                            </p>
                          </div>
                        </div>

                        <a
                          href={pr.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-start text-lg font-medium text-blue-300 hover:text-blue-100 hover:underline transition-colors line-clamp-2"
                        >
                          {pr.title}
                        </a>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <div className="text-gray-400 text-center py-20 bg-gray-900/40 rounded-xl border border-dashed border-gray-800">
                    <p className="text-xl mb-2">🚀 No contributions found</p>
                    <p className="text-sm">Try adjusting your filters to see more results.</p>
                  </div>
                )
              ) : (
                <div className="text-gray-300 text-center py-10">
                  Loading...
                </div>
              )}
              {prsStatus === "error" && (
                <p className="text-red-400">Failed to fetch pr&apos;s</p>
              )}
            </Tab>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}
