import { motion } from "framer-motion";
import { Select, SelectItem, Avatar } from "@heroui/react";
import { useEffect, useState, useMemo } from "react";
import { LuArrowUpRight as ArrowUpRight } from "react-icons/lu";
import { getPrs, type Tpr } from "../actions";

const statuses = [
  { id: "Open", name: "🟡 Open" },
  { id: "Merged", name: "✅ Merged" },
  { id: "Closed", name: "🔒 Closed" },
];

/** Closed PRs are hidden until you opt in — the list starts on live + merged. */
const DEFAULT_STATUSES = ["Open", "Merged"];

const projects = [
  {
    title: "Screenly",
    category: "App",
    description:
      "Screenly is a productivity app helping people to reduce screen time by staking money.",
    image: 'https://screenly-website.vercel.app/og.png',
    technologies: ["Node.js", "Tanstack", "Expo"],
    githubUrl: "https://github.com/Sahil-Gupta584/screenly",
    liveUrl: "https://screenly-website.vercel.app",
  },
  {
    title: "Payo",
    category: "AI",
    description:
      "Payo is standalone mcp powering AI agents to order items from Binkit, Zepto.",
    image: 'https://www.payo.live/og-image.png',
    technologies: ["Node.js", "Tanstack", "Solari", "WebScraping"],
    githubUrl: "https://github.com/Sahil-Gupta584/payo",
    liveUrl: "https://www.payo.live/",
  },
  {
    title: "Insightly",
    category: "SaaS",
    description:
      "Insightly is web analytics platform, providing revenue attributions for payment providers. It supports live visitors view, embeddable maps and twitter link attributions.",
    image: "https://www.insightly.live/images/open-graph.png",
    technologies: ["Appwrite", "Tanstack", "TailwindCSS"],
    githubUrl: "https://github.com/Sahil-Gupta584/insightly",
    liveUrl: "https://insightly.live",
  },
  {
    title: "GetBestRide",
    category: "Tool",
    description:
      "GetBestRide is a platform for so user can compare same rides across OLA, Uber and Rapido. Helping user to find our cheapest cab provder for same route. ",
    technologies: ["WebScraping", "Solari"],
    githubUrl: "https://github.com/Sahil-Gupta584/getbestride",
    liveUrl: "https://getbestride.vercel.app/",
    image: "https://getbestride.vercel.app/og.png",
  },
  {
    title: "OpenCMO",
    image: "https://www.opencmo.site/og.png",
    category: "Marketing",
    description:
      "OpenCMO is best open-source platform to find out leads for your product. It scans x, reddit for your product, and finds out potential leads. one time setup. You recieve latest leads on few hours of interval in you email. ",
    technologies: ["RapidAPI", "oRPC",],
    githubUrl: "https://github.com/Sahil-Gupta584/opencmo",
    liveUrl: "https://www.opencmo.site",
  },
  {
    title: "Syncmate",
    category: "SaaS",
    description:
      "Syncmate is onestop solution for content creators to manage there multiple youtube channels, video files and editors. ",
    image: "https://syncmate-web.vercel.app/opengraph-image.png",
    technologies: ["Postgres", "tRPC", "Aws", "Docker"],
    githubUrl: "https://github.com/Sahil-Gupta584/Syncmate",
    liveUrl: "https://syncmate-web.vercel.app",
  },
  {
    title: "Racle",
    category: "Backend",
    description:
      "Racle is a minimalistic Vercel alternative. You can host your react projects for free with auto deployments on commit triggered on you githuh repository.",
    image: "https://racle.vercel.app/open-graph.png",
    technologies: ["tRPC", "Postgres", "Cloudflare", "Docker"],
    githubUrl: "https://github.com/Sahil-Gupta584/racke",
    liveUrl: "https://racle.xyz",
  },
];

const statusBadge = (status: string) => {
  if (status === "Open") return "🟡 Open";
  if (status === "Merged") return "✅ Merged";
  return "🔒 Closed";
};

/* HeroUI Select is themed to match the minimal monochrome shell while keeping
   all existing filter behaviour intact. */
const selectClasses = {
  label: "text-[hsl(var(--muted-foreground))] text-[11px] tracking-wide",
  trigger:
    "bg-transparent border border-[hsl(var(--border))] text-foreground data-[hover=true]:bg-[hsl(var(--muted))] data-[hover=true]:border-[hsl(var(--border))] transition-colors",
  value: "text-foreground text-[12px]",
  popoverContent: "bg-[hsl(var(--popover))] border border-[hsl(var(--border))] shadow-xl",
  listboxWrapper: "max-h-[400px] p-1",
  listbox: "bg-transparent",
  item: "text-foreground text-[12px] data-[hover=true]:bg-[hsl(var(--muted))] data-[hover=true]:text-foreground data-[selected=true]:text-[hsl(var(--primary))]",
  sectionTitle: "text-[hsl(var(--muted-foreground))]",
};

export default function Projects() {
  const [tab, setTab] = useState<"projects" | "prs">("projects");
  const [prsStatus, setPrsStatus] = useState<"loading" | "error" | "fetched">(
    "loading"
  );
  const [prs, setPrs] = useState<Tpr[] | null>(null);
  const [statusFilter, setStatusFilter] = useState<string[]>(DEFAULT_STATUSES);
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
      const statusMatch =
        statusFilter.length === 0 || statusFilter.includes(pr.status);
      const ownerMatch =
        ownerFilter === "all" ||
        pr.repo_owner.toLowerCase() === ownerFilter.toLowerCase();
      return statusMatch && ownerMatch;
    });
  }, [prs, statusFilter, ownerFilter]);

  return (
    <section id="projects" className="page-shell content-section">
      <div className="section-heading">
        <p className="code-caption">&lt;!-- projects --&gt;</p>
        <h2>Selected work</h2>
      </div>

      <div className="seg-tabs" role="tablist" aria-label="Projects and open source">
        <button
          type="button"
          role="tab"
          aria-selected={tab === "projects"}
          aria-controls="projects-panel"
          data-selected={tab === "projects"}
          onClick={() => setTab("projects")}
        >
          Projects
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "prs"}
          aria-controls="prs-panel"
          data-selected={tab === "prs"}
          onClick={() => setTab("prs")}
        >
          Open Source
        </button>
      </div>

      {tab === "projects" ? (
        <motion.div
          id="projects-panel"
          role="tabpanel"
          className="project-list"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          {projects.map((project) => (
            <article className="project-entry" key={project.title}>
              <img
                src={project.image}
                alt={project.title}
                width={296}
                height={192}
                loading="lazy"
              />
              <div>
                <div className="project-head">
                  <h3>{project.title}</h3>
                  <span className="project-category">{project.category}</span>
                </div>
                <p className="project-copy">{project.description}</p>
                <div className="inline-tech" aria-label="Technologies used">
                  {project.technologies.map((tech) => (
                    <span className="border p-1" key={tech}>{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    Live <ArrowUpRight size={13} />
                  </a>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    Source <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </motion.div>
      ) : (
        <motion.div
          id="prs-panel"
          role="tabpanel"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="pr-toolbar">
            <Select
              aria-label="Status"
              placeholder="Status"
              selectionMode="multiple"
              variant="bordered"
              size="sm"
              className="max-w-[220px]"
              selectedKeys={new Set(statusFilter)}
              disallowEmptySelection
              onSelectionChange={(keys) => {
                const next = Array.from(keys).map(String);
                setStatusFilter(next.length ? next : DEFAULT_STATUSES);
              }}
              classNames={selectClasses}
              renderValue={(items) => (
                <div className="flex items-center gap-2">
                  {items.map((item) => (
                    <span key={item.key}>
                      {statuses.find((s) => s.id === item.key)?.name ??
                        String(item.key)}
                    </span>
                  ))}
                </div>
              )}
            >
              {statuses.map((s) => (
                <SelectItem key={s.id} textValue={s.name}>
                  {s.name}
                </SelectItem>
              ))}
            </Select>

            <Select
              aria-label="Organization"
              placeholder="All Organizations"
              variant="bordered"
              size="sm"
              items={owners}
              className="max-w-[220px]"
              selectedKeys={new Set([ownerFilter])}
              disallowEmptySelection
              onSelectionChange={(keys) => {
                const val = Array.from(keys)[0] as string;
                setOwnerFilter(val || "all");
              }}
              classNames={{
                ...selectClasses,
                listboxWrapper: "max-h-[400px] p-1",
              }}
              renderValue={(items) => {
                return items.map((item) => (
                  <div key={item.key} className="flex items-center gap-2">
                    {item.data && item.data.avatar ? (
                      <Avatar
                        alt={item.data.name}
                        className="shrink-0 w-4 h-4"
                        src={item.data.avatar}
                      />
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
                    <span className="text-[12px] text-foreground">{owner.name}</span>
                  </div>
                </SelectItem>
              )}
            </Select>
          </div>

          {prs ? (
            filteredPrs.length > 0 ? (
              <div className="pr-list">
                {filteredPrs.map((pr, index) => (
                  <div className="pr-row" key={`${pr.html_url}-${index}`}>
                    {/* Avatars come from an arbitrary remote host at runtime and
                        are only 30px, so they load straight from GitHub's CDN
                        rather than through the image optimizer. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={pr.avatar_url} alt={pr.repo_owner} loading="lazy" />
                    <div className="pr-meta">
                      <p className="pr-owner">{pr.repo_owner}</p>
                      <a
                        href={pr.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pr-title"
                      >
                        {pr.title}
                      </a>
                    </div>
                    <span className="pr-status" data-status={pr.status}>
                      {statusBadge(pr.status)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No contributions found — try adjusting your filters.</p>
              </div>
            )
          ) : (
            <div className="empty-state">
              <p>Loading pull requests…</p>
            </div>
          )}
          {prsStatus === "error" && (
            <p className="empty-state text-destructive">Failed to fetch pr&apos;s</p>
          )}
        </motion.div>
      )}
    </section>
  );
}