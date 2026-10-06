"use client";
import { useEffect, useRef, useState } from "react";
import { LuArrowUpRight as ArrowUpRight } from "react-icons/lu";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import twoFingers from "@/public/two-fingers.png";
import MagneticWrapper from "./magneticWrapper";

const phrases = ["Frontend", "Backend", "Web Dev", "Freelance"];

const socials = [
  { href: "https://github.com/Sahil-Gupta584", label: "GitHub", icon: FaGithub },
  {
    href: "https://www.linkedin.com/in/sahil-gupta-1b7742286",
    label: "LinkedIn",
    icon: FaLinkedin,
  },
  { href: "https://x.com/sahil_builds", label: "X", icon: FaXTwitter },
  { href: "mailto:guptas3067@gmail.com", label: "Email", icon: IoIosMail },
];

export default function Hero() {
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const phraseIndex = useRef(0);
  const charIndex = useRef(0);
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

    const typingInterval = setTimeout(typeNextCharacter, typingSpeed);
    return () => clearTimeout(typingInterval);
  }, [typedText, isDeleting, typingSpeed]);

  return (
    <section id="me" className="page-shell hero-section">
      <div className="hero-grid">
        <div className="hero-art reveal reveal-delay">
          <div className="hero-art-inner">
            <MagneticWrapper elasticity={10} animationDuration={0.8}>
              {/* Local static import, and MagneticWrapper needs a plain DOM ref
                  on the node it drives with GSAP — so not next/image. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={twoFingers.src}
                alt="Developer at work"
                className="hero-img"
              />
            </MagneticWrapper>
          </div>
        </div>

        <div className="hero-copy">
          <p className="code-caption reveal">&lt;!-- portfolio --&gt;</p>
          <h1 className="reveal reveal-delay">
            Hi, I&apos;m <span>Sahil Gupta</span>.
          </h1>
          <p className="role-line reveal reveal-delay">
            Full Stack Developer
            <span className="role-sep" aria-hidden="true">
              ·
            </span>
            <span className="role-sep">
              {typedText}
              <span className="inline-block w-[1px] h-[1em] ml-[2px] translate-y-[2px] bg-primary align-middle animate-pulse" />
            </span>
          </p>
          <ul className="hero-bio list-disc reveal reveal-delay-2">

            <li>
              I&apos;m a Product-minded developer who loves identifying and solving problems with clean,
              responsive, and scalable web apps.
            </li>
            <li>
              Entrepreneurship is what still drives me in software field.
            </li>
            <li>

              I take full end to end ownership of the product and work on it with full dedication.
            </li>

          </ul>
          <a href="#contact" className="text-link reveal reveal-delay-2">
            Get in touch <ArrowUpRight size={15} />
          </a>

          <div className="social-row reveal reveal-delay-2">
            {socials.map(({ href, label, icon: Icon }) => (
              <MagneticWrapper
                key={label}
                elasticity={0.45}
                animationDuration={0.5}
              >
                <a
                  href={href}
                  className="social-btn"
                  aria-label={label}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  <Icon size={16} />
                </a>
              </MagneticWrapper>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}