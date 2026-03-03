"use client";

import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";

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

export default function Footer() {
  return (
    <footer className="py-16 px-6 border-t border-stone-200 dark:border-stone-800">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-stone-400 dark:text-stone-600 text-sm mb-6 leading-relaxed">
          crafted with mass amounts of chai, late-night debugging sessions,
          <br className="hidden sm:inline" />
          {" "}and an unhealthy attachment to VS Code
        </p>

        <div className="flex justify-center gap-4 mb-6">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-stone-400 hover:text-stone-900 dark:text-stone-600 dark:hover:text-stone-100 transition-colors"
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
          ))}
        </div>

        <p className="text-stone-300 dark:text-stone-700 text-xs">
          &copy; {new Date().getFullYear()} Sahil Gupta
        </p>
      </div>
    </footer>
  );
}
