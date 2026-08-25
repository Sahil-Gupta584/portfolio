"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import MagneticWrapper from "./magneticWrapper";

const socials = [
  { href: "https://github.com/Sahil-Gupta584", label: "GitHub", icon: FaGithub },
  { href: "https://www.linkedin.com/in/sahil-gupta-1b7742286", label: "LinkedIn", icon: FaLinkedin },
  { href: "https://x.com/sahil_builds", label: "X", icon: FaXTwitter },
  { href: "mailto:guptas3067@gmail.com", label: "Email", icon: IoIosMail },
];

export default function Footer() {
  return (
    <footer id="contact" className="relative aurora-bg overflow-hidden">
      {/* aurora blobs */}
      <div className="aurora-blob aurora-blob--violet animate-aurora" style={{ width: 360, height: 360, top: "-10%", left: "10%" }} />
      <div className="aurora-blob aurora-blob--pink animate-aurora" style={{ width: 300, height: 300, bottom: "-10%", right: "15%", animationDelay: "-6s" }} />

      <div className="container mx-auto px-6 py-24 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm text-muted-foreground mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Available for freelance & full-time
          </span>

          <h2 className="text-4xl md:text-6xl font-display font-semibold tracking-tight mb-5">
            Let&apos;s build something
            <br />
            <span className="gradient-text">people love.</span>
          </h2>

          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
            Have a project in mind or just want to say hi? My inbox is always open.
          </p>

          <MagneticWrapper elasticity={8}>
            <a
              href="mailto:guptas3067@gmail.com"
              className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-medium text-base magnetic"
            >
              <IoIosMail className="text-xl" />
              Get in touch
            </a>
          </MagneticWrapper>

          <div className="flex justify-center gap-4 mt-10">
            {socials.map((s) => (
              <MagneticWrapper key={s.label} elasticity={6}>
                <a
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="magnetic w-11 h-11 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <s.icon className="text-lg" />
                </a>
              </MagneticWrapper>
            ))}
          </div>
        </motion.div>

        <div className="mt-20 pt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Sahil Gupta. Crafted with care.</p>
          <p className="flex items-center gap-1.5">
            Built with Next.js, Tailwind & framer-motion
          </p>
        </div>
      </div>
    </footer>
  );
}
