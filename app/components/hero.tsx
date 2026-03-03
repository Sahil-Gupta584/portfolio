"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import MagneticWrapper from "./magneticWrapper";

const funStatuses = [
  "Turning caffeine into code",
  "Probably debugging something",
  "Shipping features at 2am",
  "Negotiating with merge conflicts",
  "Googling errors professionally",
  "Pushing to main on a Friday",
];

export default function Hero() {
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [status] = useState(
    () => funStatuses[Math.floor(Math.random() * funStatuses.length)]
  );
  const phrases = ["Frontend", "Backend", "Full Stack", "Freelance"];
  const phraseIndex = useRef(0);
  const charIndex = useRef(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

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
    const timeout = setTimeout(typeNextCharacter, typingSpeed);
    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, typingSpeed]);

  useEffect(() => {
    const interval = setInterval(() => setShowCursor((p) => !p), 500);
    return () => clearInterval(interval);
  }, []);

  const socialLinks = [
    {
      href: "https://github.com/Sahil-Gupta584",
      icon: FaGithub,
      label: "GitHub",
    },
    {
      href: "https://www.linkedin.com/in/sahil-gupta-1b7742286",
      icon: FaLinkedin,
      label: "LinkedIn",
    },
    {
      href: "https://x.com/sahil_builds",
      icon: FaXTwitter,
      label: "X",
    },
    {
      href: "mailto:guptas3067@gmail.com",
      icon: IoIosMail,
      label: "Email",
    },
  ];

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden"
    >
      {/* Background gradient blobs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-indigo-200/30 dark:bg-indigo-500/10 rounded-full blur-3xl animate-blob" />
      <div
        className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-200/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-blob"
        style={{ animationDelay: "2s" }}
      />

      <div className="max-w-2xl mx-auto text-center relative z-10">
        {/* Status badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-stone-500 dark:text-stone-400">
            {status}
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-stone-900 dark:text-stone-50 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Sahil Gupta
        </motion.h1>

        {/* Role + Typing */}
        <motion.div
          className="text-lg sm:text-xl text-stone-500 dark:text-stone-400 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <span>Full Stack Developer</span>
          <span className="mx-2 text-stone-300 dark:text-stone-600">/</span>
          <span className="text-indigo-500 dark:text-indigo-400">
            {typedText}
            <span className={showCursor ? "opacity-100" : "opacity-0"}>|</span>
          </span>
        </motion.div>

        {/* Bio */}
        <motion.p
          className="text-base sm:text-lg text-stone-500 dark:text-stone-400 max-w-lg mx-auto mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          I build things for the web &mdash; from frontend interfaces to backend
          systems and everything in between.
          <br />
          <span className="text-stone-400 dark:text-stone-500 italic">
            Sometimes they even work on the first try.
          </span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <a
            href="https://x.com/sahil_builds"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-stone-900 dark:bg-stone-100 text-stone-50 dark:text-stone-900 rounded-lg text-sm font-medium hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors"
          >
            Let&apos;s Talk
          </a>
          <a
            href="#projects"
            className="px-5 py-2.5 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 rounded-lg text-sm font-medium hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors"
          >
            See My Work
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {socialLinks.map((link) => (
            <MagneticWrapper key={link.label} elasticity={10}>
              <a
                href={link.href}
                className="p-2 text-stone-400 dark:text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                aria-label={link.label}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel={
                  link.href.startsWith("mailto")
                    ? undefined
                    : "noopener noreferrer"
                }
              >
                <link.icon className="w-5 h-5" />
              </a>
            </MagneticWrapper>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
