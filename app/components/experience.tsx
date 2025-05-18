import { Link } from "@heroui/react";
import { motion } from "framer-motion";

const experiences = [
  {
    company: "Primexop",
    companyUrl: "https://primexop.com",
    role: "Full Stack Developer",
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
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
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
      className="py-20 px-6 bg-[#0d1117] min-h-screen"
    >
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Experience
        </motion.h2>

        <motion.div
          className="grid gap-10 md:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="bg-[#1e1e2f] border border-gray-700 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              variants={itemVariants}
            >
              <h3 className="text-xl font-semibold text-blue-400">
                {exp.role}
              </h3>
              <div className="flex justify-between items-center text-sm text-gray-400 mt-1 mb-2">
                <Link underline="always" href={exp.companyUrl} >{exp.company} </Link>
                <span>{exp.duration}</span>
              </div>
              <p className="text-gray-300 mb-4">{exp.description}</p>
              <div className="flex flex-wrap gap-2">
                {exp.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-blue-900/40 border border-blue-700 text-blue-300 text-xs px-3 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
