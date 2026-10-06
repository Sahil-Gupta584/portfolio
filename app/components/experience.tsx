import { motion } from "framer-motion";
import { Link } from "@heroui/react";

const experiences = [
  {
    company: "Amphet",
    companyUrl: "https://amphet.co",
    
    role: "Full Stack Developer Intern",
    duration: "3 Months",
    description:
      "Boostraped Amphet's codebase with turborepo for making sure future scalabilty. Designed and imeplemnted dashabords and APIs. handled seamless deployment of mutiple apps on AWS ",
    techStack: ["Node.js", "Prisma", "orpc", "Tanstack", "AWS", "Docker"],
  },
  {
    company: "Primexop",
    companyUrl: "https://primexop.com",
    role: "Full Stack Developer Intern",
    duration: "6 Months",
    description:
      "Delivered 5+ solutions for clients. Completed personal Hospital system, School, Admin Panels in scalable manner with great user interface.",
    techStack: ["Node.js", "Prisma", "trpc", "Vite", "mySQL"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="page-shell content-section section-divider"
    >
      <div className="section-heading">
        <p className="code-caption">&lt;!-- experience --&gt;</p>
        <h2>Experience</h2>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {experiences.map((exp) => (
          <motion.article className="experience-entry" key={exp.role} variants={itemVariants}>
            <div className="experience-topline">
              <div>
                <h3>{exp.role}</h3>
                <p className="muted-copy">
                  <Link
                    underline="always"
                    href={exp.companyUrl}
                    className="transition-colors hover:text-primary"
                  >
                    {exp.company}
                  </Link>
                </p>
              </div>
              <span className="duration">{exp.duration}</span>
            </div>
            <p className="experience-summary">{exp.description}</p>
            <div className="inline-tech" aria-label="Technologies used">
              {exp.techStack.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}