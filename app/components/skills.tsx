import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillGroups = [
  {
    label: "Languages",
    items: ["Javascript", "Typescript", "Python"],
  },
  {
    label: "Frameworks & tools",
    items: [
      "React",
      "NextJS",
      "Express",
      "NodeJs",
      "Tailwind CSS",
      "React Query",
      "Redux",
      "Tanstack",
      "Langchain",
      "Langraph",
      "Websocket",
      "Puppeteer",
    ],
  },
  {
    label: "Data & persistence",
    items: ["MongoDB", "Postgres", "Redis", "Prisma", "Appwrite"],
  },
  {
    label: "Infrastructure",
    items: ["GitHub Actions", "Serverless", "Docker", "AWS"],
  },
];

export default function Skills() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="skills"
      className="page-shell content-section"
      ref={sectionRef}
    >
      <div className="section-heading">
        <p className="code-caption">&lt;!-- stack --&gt;</p>
        <h2>Tools I work with</h2>
      </div>

      <motion.div
        className="skills-list"
        initial={{ opacity: 0, y: 14 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {skillGroups.map((group) => (
          <div className="skill-row" key={group.label}>
            <h3>{group.label}</h3>
            <p>
              {group.items.map((skill, skillIndex) => (
                <span key={skill}>
                  {skill}
                  {skillIndex < group.items.length - 1 ? (
                    <span aria-hidden="true" className="skill-separator">
                      {" · "}
                    </span>
                  ) : null}
                </span>
              ))}
            </p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}