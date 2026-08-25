"use client";
import { Link } from "@heroui/react";
import { motion } from "framer-motion";
import { IoArrowForward } from "react-icons/io5";

const experiences = [
  {
    company: "Primexop",
    companyUrl: "https://primexop.com",
    role: "Full Stack Developer",
    duration: "6 Months",
    description:
      "Delivered 5+ solutions for clients. Completed personal Hospital system, School, Admin Panels in a scalable manner with great user interface.",
    techStack: ["Node.js", "Prisma", "tRPC", "Vite", "MySQL"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="py-24 px-6 relative aurora-bg overflow-hidden"
    >
      <div className="aurora-blob aurora-blob--pink animate-aurora" style={{ width: 300, height: 300, bottom: "10%", right: "10%" }} />
      <div className="absolute inset-0 dots-overlay opacity-40 z-0" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-4">
            <span className="text-muted-foreground text-sm font-medium">Career</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight">
            <span className="gradient-text">Experience</span>
          </h2>
        </motion.div>

        {/* timeline */}
        <motion.div
          className="relative pl-8 sm:pl-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* vertical line */}
          <div className="absolute left-2 sm:left-3 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-accent to-transparent" />

          {experiences.map((exp, index) => (
            <motion.div key={index} className="relative mb-8" variants={itemVariants}>
              {/* node */}
              <div className="absolute -left-[26px] sm:-left-[34px] top-1.5 w-4 h-4 rounded-full bg-surface border-2 border-primary shadow-[0_0_0_4px_rgb(99_102_241/0.15)]" />

              <div className="card-glow premium-card p-6 magnetic">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <h3 className="text-xl font-display font-semibold text-foreground">
                    {exp.role}
                  </h3>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {exp.duration}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
                  <Link
                    underline="always"
                    href={exp.companyUrl}
                    isExternal
                    showAnchorIcon
                    className="text-primary"
                  >
                    {exp.company}
                  </Link>
                </div>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {exp.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2.5 py-1 rounded-md bg-background-secondary text-muted-foreground border border-border/70"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}

          {/* future node */}
          <motion.div className="relative" variants={itemVariants}>
            <div className="absolute -left-[26px] sm:-left-[34px] top-1.5 w-4 h-4 rounded-full bg-background-secondary border-2 border-dashed border-border" />
            <div className="card-glow premium-card p-6 flex items-center justify-between gap-4">
              <p className="text-muted-foreground font-medium">
                Your company could be next.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-accent transition-colors"
              >
                Let&apos;s talk
                <IoArrowForward />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
