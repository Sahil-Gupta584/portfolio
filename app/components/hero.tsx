"use client";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import twoFingers from "@/public/two-fingers.png";
import MagneticWrapper from "./magneticWrapper";
import { IoIosMail } from "react-icons/io";
import { HiArrowDown } from "react-icons/hi2";

const stats = [
  { value: "6+", label: "Projects shipped" },
  { value: "15+", label: "Open-source PRs" },
  { value: "1yr", label: "Experience" },
];

export default function Hero() {
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const phrases = ["Frontend", "Backend", "Web Dev", "Freelance"];
  const phraseIndex = useRef(0);
  const charIndex = useRef(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  // spotlight position
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const typeNextCharacter = () => {
      const currentPhrase = phrases[phraseIndex.current];
      if (isDeleting) {
        setTypedText(currentPhrase.substring(0, charIndex.current - 1));
        charIndex.current -= 1;
        setTypingSpeed(80);
      } else {
        setTypedText(currentPhrase.substring(0, charIndex.current + 1));
        charIndex.current += 1;
        setTypingSpeed(150);
      }
      if (!isDeleting && charIndex.current === currentPhrase.length) {
        setTypingSpeed(2000);
        setIsDeleting(true);
      } else if (isDeleting && charIndex.current === 0) {
        setIsDeleting(false);
        phraseIndex.current = (phraseIndex.current + 1) % phrases.length;
        setTypingSpeed(500);
      }
    };
    const typingInterval = setTimeout(typeNextCharacter, typingSpeed);
    return () => clearTimeout(typingInterval);
  }, [typedText, isDeleting, typingSpeed]);

  useEffect(() => {
    const cursorInterval = setInterval(() => setShowCursor((p) => !p), 500);
    return () => clearInterval(cursorInterval);
  }, []);

  const handleSpotlight = (e: React.MouseEvent) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <section
      id="me"
      ref={heroRef}
      onMouseMove={handleSpotlight}
      className="min-h-screen flex items-center justify-center pt-28 pb-16 px-6 relative aurora-bg overflow-hidden"
    >
      {/* spotlight cursor glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${spotlight.x}px ${spotlight.y}px, rgb(99 102 241 / 0.08), transparent 70%)`,
        }}
      />

      {/* aurora blobs */}
      <div className="aurora-blob aurora-blob--indigo animate-aurora" style={{ width: 420, height: 420, top: "5%", left: "8%" }} />
      <div className="aurora-blob aurora-blob--violet animate-aurora" style={{ width: 380, height: 380, bottom: "5%", right: "8%", animationDelay: "-7s" }} />
      <div className="aurora-blob aurora-blob--pink animate-aurora" style={{ width: 260, height: 260, top: "40%", left: "45%", animationDelay: "-3s" }} />

      {/* grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-60 z-0" />

      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 relative z-10 max-w-6xl w-full">
        {/* Image */}
        <motion.div
          className="lg:w-2/5 animate-levitate w-full flex justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <MagneticWrapper elasticity={10}>
            <div className="relative magnetic">
              {/* glow ring behind image */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-primary/30 via-accent/20 to-pink-500/20 blur-2xl opacity-70" />
              <img
                src={twoFingers.src}
                alt="Sahil Gupta — full stack developer"
                className="relative rounded-full object-cover w-full max-w-[280px] mx-auto"
              />
            </div>
          </MagneticWrapper>
        </motion.div>

        {/* Text */}
        <motion.div className="lg:w-3/5 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-5"
          >
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-muted-foreground text-sm font-medium">
              Entrepreneur Enthusiast
            </span>
          </motion.div>

          <motion.h1
            className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Sahil <span className="gradient-text">Gupta</span>
          </motion.h1>

          <motion.h2
            className="text-lg md:text-xl font-normal text-muted-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Full Stack Developer
            <span className="text-accent/70 mx-2 hidden sm:inline">•</span>
            <span className="text-foreground font-medium">
              <span className="terminal-cursor">{typedText}</span>
              <span className={showCursor ? "opacity-100" : "opacity-0"}>|</span>
            </span>
          </motion.h2>

          <motion.p
            className="text-base text-muted-foreground max-w-xl mb-8 leading-relaxed mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            I&apos;m a full-stack developer who turns ideas into fast, responsive,
            and scalable web apps. From frontend interfaces to backend logic and
            real-time features, I handle it all. Let&apos;s build something that
            works beautifully and delivers real value.
          </motion.p>

          {/* stats */}
          <motion.div
            className="flex justify-center lg:justify-start gap-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
          >
            {stats.map((s) => (
              <div key={s.label} className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl font-display font-bold gradient-text">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <MagneticWrapper elasticity={8}>
              <a
                href="#contact"
                className="btn-primary px-6 py-3 rounded-full font-medium inline-flex magnetic items-center gap-2"
              >
                Get In Touch
              </a>
            </MagneticWrapper>
            <MagneticWrapper elasticity={8}>
              <a
                href="#projects"
                className="btn-ghost px-6 py-3 rounded-full font-medium inline-flex magnetic items-center gap-2"
              >
                View Projects
              </a>
            </MagneticWrapper>
          </motion.div>

          {/* socials */}
          <motion.div
            className="mt-8 flex items-center gap-3 justify-center lg:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <span className="text-muted-foreground/70 text-sm">Connect:</span>
            <div className="flex gap-2">
              {[
                { href: "https://github.com/Sahil-Gupta584", icon: FaGithub, label: "GitHub" },
                { href: "https://www.linkedin.com/in/sahil-gupta-1b7742286", icon: FaLinkedin, label: "LinkedIn" },
                { href: "https://x.com/sahil_builds", icon: FaXTwitter, label: "X" },
                { href: "mailto:guptas3067@gmail.com", icon: IoIosMail, label: "Email" },
              ].map((s) => (
                <MagneticWrapper key={s.label} elasticity={6}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="magnetic w-10 h-10 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <s.icon className="text-lg" />
                  </a>
                </MagneticWrapper>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* scroll indicator */}
      <motion.a
        href="#skills"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground/60 scroll-indicator z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        aria-label="Scroll down"
      >
        <span className="text-xs">Scroll</span>
        <HiArrowDown className="text-base" />
      </motion.a>
    </section>
  );
}
