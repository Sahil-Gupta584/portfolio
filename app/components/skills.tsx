import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Skills() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="skills"
      className="py-28 bg-[#0d1117] relative overflow-hidden min-h-screen"
      ref={sectionRef}
    >
      {/* Animated glowing background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-3">
            <span className="text-white/70 text-4xl">Skills</span>
          </div>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-6"></div>
        </motion.div>

        {/* Code Block Container with styled background */}
        <div className="backdrop-blur-md bg-black/30 border border-white/10 max-w-4xl mx-auto font-mono shadow-xl text-sm sm:text-xl rounded-lg overflow-hidden relative group hover:border-white/20 transition-all duration-300">
          {/* Terminal Controls */}
          <div className="flex items-center gap-1 px-3 py-1.5 bg-white/5 border-b border-white/5">
            <div className="flex space-x-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500/40"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/40"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-green-500/40"></div>
            </div>
            <span className="ml-2 text-xs sm:text-sm text-white/70">
              server.ts
            </span>
          </div>

          {/* Code Content */}
          <div className="p-4 leading-relaxed opacity-90">
            <div className="rounded-md w-fit">
              <span className="text-[#569CD6]">import</span>{" "}
              <span className="text-[#9CDCFE]">skills</span>{" "}
              <span className="text-[#b96161]">from</span>{" "}
              <span className="text-[#CE9178]">&quot;fullstack.ts&quot;</span>;
            </div>

            <div className="mt-10 space-y-4 md:space-y-6 w-fit text-sm sm:text-base">
              {/* Languages */}
              <div className="flex flex-wrap gap-x-2">
                <span className="text-[#569CD6]">const</span>
                <span className="text-[#9CDCFE]">Languages</span>
                <span className="text-white">=</span>
                {["Javascript", "Typescript", "Python"].map((lang, i) => (
                  <span key={i}>
                    <span className="text-[#DCDCAA]">{lang}</span>
                    {i < 2 && <span className="text-white">,</span>}
                  </span>
                ))}
              </div>

              {/* Libraries & Frameworks */}
              <div className="flex flex-wrap gap-x-2">
                <span className="text-[#569CD6]">const</span>
                <span className="text-[#9CDCFE]">
                  Libraries &amp; Frameworks
                </span>
                <span className="text-white">=</span>
                {[
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
                ].map((lib, i) => (
                  <span key={i}>
                    <span className="text-[#DCDCAA]">{lib}</span>
                    {i < 11 && <span className="text-white">,</span>}
                  </span>
                ))}
              </div>

              {/* Databases & ORMs */}
              <div className="flex flex-wrap gap-x-2">
                <span className="text-[#569CD6]">const</span>
                <span className="text-[#9CDCFE]">Databases &amp; ORMs</span>
                <span className="text-white">=</span>
                {["MongoDB", "Postgres", "Redis", "Prisma", "Appwrite"].map(
                  (db, i) => (
                    <span key={i}>
                      <span className="text-[#DCDCAA]">{db}</span>
                      {i < 4 && <span className="text-white">,</span>}
                    </span>
                  )
                )}
              </div>

              {/* Tools & Platforms */}
              <div className="flex flex-wrap gap-x-2">
                <span className="text-[#569CD6]">const</span>
                <span className="text-[#9CDCFE]">Tools &amp; Platforms</span>
                <span className="text-white">=</span>
                {["GitHub Actions", "Serverless", "Docker", "AWS"].map(
                  (tool, i) => (
                    <span key={i}>
                      <span className="text-[#DCDCAA]">{tool}</span>
                      {i < 7 && <span className="text-white">,</span>}
                    </span>
                  )
                )}
              </div>
            </div>
            <div className="text-sm sm:text-base">
              <p className="text-green-400 mt-6">{"//"} Start Connection</p>
              <p className="text-white">
                <span className="text-[#9CDCFE]">skills</span>.listen(guptas3067@gmail.com);
              </p>
            </div>
          </div>

          {/* Optional subtle glow on hover */}
          <div className="absolute inset-0 pointer-events-none rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-xl"></div>
        </div>
      </div>
    </section>
  );
}

// const Languages = Javascript, Typescript, Python
// const Libraries & Frameworks = React, NextJS, Express, NodeJs, Tailwind CSS, React Query, Redux, Tanstack, Langchain, Langraph, SocketIO, Puppeteer
// const Databases & ORMs = MongoDB, Postgres, Redis, Prisma, Appwrite
// const Tools & Platforms = GitHub Actions, Serverless, ESLint, AWS S3, AWS EC2, AWS CloudFront, Azure VM, Docker
