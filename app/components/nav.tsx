"use client";
import { useState, useEffect } from "react";
import { useScrollActive } from "../hooks/useScrollActive";
import { motion, AnimatePresence } from "framer-motion";
import { IoMenu } from "react-icons/io5";
import { MdClose } from "react-icons/md";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useScrollActive();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const navLinks = [
    { href: "#me", label: "Me" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
  ];

  const headerClass = scrolled
    ? "glass-strong shadow-[0_4px_24px_rgb(24_24_27/0.06)] border-b border-border/60"
    : "bg-transparent";

  return (
    <motion.header
      className={`fixed w-full z-50 transition-all duration-400 ${headerClass}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <div>
            <a
              href="#me"
              className="font-display text-xl font-semibold text-foreground group flex items-center"
            >
              <span className="text-foreground">Sahil</span>
              <span className="text-accent mx-0.5">.</span>
              <span className="text-foreground relative font-mono">
                Code
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300 rounded-full" />
              </span>
            </a>
          </div>

          <nav className="hidden sm:block">
            <ul className="flex items-center space-x-7">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`nav-link text-muted-foreground py-1 text-sm ${
                      activeSection === link.href.substring(1) ? "active" : ""
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  className="btn-primary px-4 py-1.5 rounded-full text-sm font-medium inline-block"
                >
                  Connect me
                </a>
              </li>
            </ul>
          </nav>

          <button
            className="sm:hidden text-foreground focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <MdClose className="h-[25px] w-[25px]" />
            ) : (
              <IoMenu className="h-[25px] w-[25px]" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="sm:hidden glass-strong border-b border-border/60 px-5 py-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`block py-2 text-muted-foreground hover:text-foreground transition-colors text-sm ${
                      activeSection === link.href.substring(1) ? "text-foreground font-semibold" : ""
                    }`}
                    onClick={closeMobileMenu}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  className="btn-primary block text-center py-2.5 rounded-full text-sm font-medium"
                  onClick={closeMobileMenu}
                >
                  Connect me
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
