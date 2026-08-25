import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillGroups = [
  {
    label: "Languages",
    items: ["JavaScript", "TypeScript", "Python"],
  },
  {
    label: "Libraries & Frameworks",
    items: [
      "React", "NextJS", "Express", "NodeJs", "Tailwind CSS",
      "React Query", "Redux", "Tanstack", "Langchain", "Langgraph",
      "Websocket", "Puppeteer",
    ],
  },
  {
    label: "Databases & ORMs",
    items: ["MongoDB", "Postgres", "Redis", "Prisma", "Appwrite"],
  },
  {
    label: "Tools & Platforms",
    items: ["GitHub Actions", "Serverless", "Docker", "AWS"],
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
        {/* Heading */}
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

        <div className="max-w-4xl mx-auto grid gap-8 lg:grid-cols-5">
          {/* Code editor card */}
          <motion.div
            className="lg:col-span-3 card-glow premium-card overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {/* title bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border/60 bg-background-secondary/60">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400/80" />
                <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
              </div>
              <span className="ml-2 text-xs text-muted-foreground font-mono">
                fullstack.ts
              </span>
            </div>

            {/* code */}
            <div className="p-5 md:p-6 font-mono text-sm md:text-base leading-relaxed code-block">
              <div className="mb-6">
                <span className="text-[#AF00DB]">import</span>{" "}
                <span className="text-[#001080]">skills</span>{" "}
                <span className="text-[#AF00DB]">from</span>{" "}
                <span className="text-[#A31515]">&quot;fullstack.ts&quot;</span>;
              </div>

              <div className="space-y-4">
                {skillGroups.map((group) => (
                  <div key={group.label} className="flex flex-wrap gap-x-2 gap-y-1">
                    <span className="text-[#AF00DB]">const</span>
                    <span className="text-[#001080]">{group.label}</span>
                    <span className="text-foreground">=</span>
                    {group.items.map((item, i) => (
                      <span key={item}>
                        <span className="text-[#795E26]">{item}</span>
                        {i < group.items.length - 1 && (
                          <span className="text-muted-foreground">,</span>
                        )}
                      </span>
                    ))}
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-border/50">
                <p className="text-[#008000]">{"//"} Start connection</p>
                <p className="text-foreground">
                  <span className="text-[#001080]">skills</span>.
                  <span className="text-[#795E26]">listen</span>(
                  <span className="text-[#A31515]">&quot;guptas3067@gmail.com&quot;</span>);
                </p>
              </div>
            </div>
          </motion.div>

          {/* Skill pills column */}
          <motion.div
            className="lg:col-span-2 flex flex-col gap-5"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {skillGroups.map((group, gi) => (
              <div key={group.label} className="card-glow premium-card p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-1.5 h-5 rounded-full bg-gradient-to-b from-primary to-accent" />
                  <h3 className="font-display font-semibold text-foreground text-sm">
                    {group.label}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item, i) => (
                    <motion.span
                      key={item}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-background-secondary text-muted-foreground border border-border/70 hover:border-primary/40 hover:text-foreground transition-colors"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.4 + gi * 0.1 + i * 0.03 }}
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
