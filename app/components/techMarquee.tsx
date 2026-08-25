"use client";

const techs = [
  "React", "Next.js", "TypeScript", "Node.js", "TailwindCSS",
  "Express", "MongoDB", "PostgreSQL", "Redis", "Prisma",
  "tRPC", "Tanstack", "Langchain", "Docker", "AWS",
  "WebSocket", "Puppeteer", "Appwrite", "GraphQL", "Redux",
];

export default function TechMarquee() {
  const row = [...techs, ...techs];

  return (
    <div className="relative py-10 border-y border-border/60 bg-background-secondary/40 overflow-hidden">
      <div className="marquee-mask">
        <div className="marquee-track gap-4">
          {row.map((tech, i) => (
            <span
              key={i}
              className="flex items-center gap-3 whitespace-nowrap text-lg md:text-xl font-display font-medium text-muted-foreground/70"
            >
              {tech}
              <span className="text-accent/50 text-2xl leading-none">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
