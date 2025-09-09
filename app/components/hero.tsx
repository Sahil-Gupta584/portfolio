"use client";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import twoFingers from "@/public/two-fingers.png";
import MagneticWrapper from "./magneticWrapper";
import { IoIosMail } from "react-icons/io";

export default function Hero() {
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const phrases = ["Frontend", "Backend", "Web Dev", "Freelance"];
  const phraseIndex = useRef(0);
  const charIndex = useRef(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  // Terminal typing effect
  useEffect(() => {
    const typeNextCharacter = () => {
      const currentPhrase = phrases[phraseIndex.current];

      if (isDeleting) {
        // Delete characters
        setTypedText(currentPhrase.substring(0, charIndex.current - 1));
        charIndex.current -= 1;
        setTypingSpeed(80); // Faster when deleting
      } else {
        // Type characters
        setTypedText(currentPhrase.substring(0, charIndex.current + 1));
        charIndex.current += 1;
        setTypingSpeed(150); // Normal typing speed
      }

      // Check if completed typing the phrase
      if (!isDeleting && charIndex.current === currentPhrase.length) {
        setTypingSpeed(2000); // Pause at end of phrase
        setIsDeleting(true);
      }
      // Check if completed deleting the phrase
      else if (isDeleting && charIndex.current === 0) {
        setIsDeleting(false);
        phraseIndex.current = (phraseIndex.current + 1) % phrases.length;
        setTypingSpeed(500); // Pause before typing next phrase
      }
    };

    const typingInterval = setTimeout(typeNextCharacter, typingSpeed);
    return () => clearTimeout(typingInterval);
  }, [typedText, isDeleting, typingSpeed]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  // Unique interactive element: 3D tilt effect on mousemove

  type meteor = {
    id: string;
    left: string;
    top: string;
    size: number;
    duration: number;
    delay: number;
  };
  // Generate random meteors
  const [meteors, setMeteors] = useState<meteor[]>([]);

  useEffect(() => {
    // Generate initial meteors
    generateMeteors();

    // Regenerate meteors every few seconds
    const meteorInterval = setInterval(() => {
      generateMeteors();
    }, 8000);

    return () => clearInterval(meteorInterval);
  }, []);

  const generateMeteors = () => {
    const newMeteors = [];
    const count = Math.floor(Math.random() * 3) + 2; // 2-4 meteors

    for (let i = 0; i < count; i++) {
      newMeteors.push({
        id: `meteor-${Date.now()}-${i}`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 30}%`,
        size: Math.floor(Math.random() * 150) + 50,
        duration: Math.floor(Math.random() * 3000) + 2000,
        delay: Math.floor(Math.random() * 2000),
      });
      const s = {
        id: `meteor-${Date.now()}-${i}`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 30}%`,
        size: Math.floor(Math.random() * 150) + 50,
        duration: Math.floor(Math.random() * 3000) + 2000,
        delay: Math.floor(Math.random() * 2000),
      };
      newMeteors.push(s);
    }

    setMeteors(newMeteors);
  };

  return (
    <>
      <section
        id="me"
        className="min-h-screen flex items-center justify-center pt-20 pb-16 px-6 relative bg-grid animated-gradient overflow-hidden"
      >
        {/* Animated meteors */}
        {meteors.map((meteor, i) => (
          <motion.div
            key={i}
            className="absolute bg-gradient-to-br from-primary/30 to-transparent rounded-full z-0 pointer-events-none"
            style={{
              left: meteor.left,
              top: meteor.top,
              width: `${meteor.size}px`,
              height: `${meteor.size}px`,
            }}
            initial={{
              opacity: 0.8,
              x: 0,
              y: 0,
              scale: 0.3,
            }}
            animate={{
              opacity: 0,
              x: meteor.size * 3,
              y: meteor.size * 3,
              scale: 0,
            }}
            transition={{
              duration: meteor.duration / 1000,
              delay: meteor.delay / 1000,
              ease: "easeOut",
            }}
          />
        ))}

        <div className="flex  items-center justify-between">
          <motion.div
            className="lg:w-2/5 animate-levitate hidden sm:inline"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <MagneticWrapper elasticity={10}>
              <img
                src={twoFingers.src}
                alt="Professional developer working on code"
                className="rounded-md object-cover w-full max-w-lg mx-auto shadow-lg "
              />
            </MagneticWrapper>
          </motion.div>

          <motion.div
            className="lg:w-1/2 mb-10 lg:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center sm:justify-start mb-4">
              <motion.div
                className="lg:w-2/5 animate-levitate inline sm:hidden h-fit self-end mt-[50px]"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <MagneticWrapper elasticity={10}>
                  <img
                    src={twoFingers.src}
                    alt="Professional developer working on code"
                    className="rounded-md object-cover w-full max-w-lg mx-auto shadow-lg h-[100px] "
                  />
                </MagneticWrapper>
              </motion.div>
              <div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="inline-block px-3 py-1 rounded-md bg-white/5 border border-white/10 mb-4"
                >
                  <span className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-amber-900 mr-2 animate-pulse"></span>
                    <span className="text-white/80 text-sm ">
                      Entrepreneur Enthusiast{" "}
                    </span>
                  </span>
                </motion.div>
                <motion.h1
                  className="font-display text-4xl md:text-5xl lg:text-6xl font-medium  text-white mb-1 "
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  Sahil Gupta
                </motion.h1>

                <motion.h2
                  className="text-base md:text-lg lg:text-xl font-normal text-white/70"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  Full Stack Developer
                  <br className="inline sm:hidden" />
                  <span className="text-primary/70 mx-2 hidden sm:inline">
                    •
                  </span>
                  <span className="text-primary inline-block">
                    <span className="terminal-cursor">{typedText}</span>
                    <span className={showCursor ? "opacity-100" : "opacity-0"}>
                      |
                    </span>
                  </span>
                </motion.h2>
              </div>
            </div>

            <motion.p
              className="text-base text-white/60 max-w-xl mb-8 leading-relaxed text-center sm:text-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              I&apos;m a full-stack developer who turns ideas into fast,
              responsive, and scalable web apps. From frontend interfaces to
              backend logic and real-time features, I handle it all. Let&apos;s
              build something that works beautifully and delivers real value.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 sm:justify-start justify-center z-50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <a
                href="https://x.com/sahil_builds"
                className="px-5 py-2.5 bg-primary text-white rounded-md hover:bg-primary/90 transition-all"
              >
                Get In Touch
              </a>
              <a
                href="#projects"
                className="px-5 py-2.5 bg-transparent border border-white/20 text-white rounded-md hover:bg-white/5 transition-all"
              >
                View Projects
              </a>
            </motion.div>

            <motion.div
              className="mt-8 flex items-center gap-3 sm:justify-start justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <span className="text-white/40 text-sm">Connect:</span>
              <div className="flex gap-3">
                <a
                  href="https://github.com/Sahil-Gupta584"
                  className="w-8 h-8 rounded-md flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all"
                  aria-label="GitHub"
                >
                  <MagneticWrapper elasticity={10}>
                    <FaGithub className="text-2xl size-[24px]"/>
                  </MagneticWrapper>
                </a>
                <MagneticWrapper>
                <a
                  href="https://www.linkedin.com/in/sahil-gupta-1b7742286"
                  className="w-8 h-8 rounded-md flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all"
                  aria-label="LinkedIn"
                >
                    <FaLinkedin />
                </a>
                  </MagneticWrapper>
                <a
                  href="https://x.com/sahil_builds"
                  className="w-8 h-8 rounded-md flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all"
                  aria-label="Stack Overflow"
                >
                  <MagneticWrapper>
                    <FaXTwitter />
                  </MagneticWrapper>
                </a>
                <a
                  href="mailto:guptas3067@gmail.com"
                  className="w-8 h-8 rounded-md flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all"
                  aria-label="Stack Overflow"
                >
                  <MagneticWrapper>
                    <IoIosMail />
                  </MagneticWrapper>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
