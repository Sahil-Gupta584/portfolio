'use client'
import { useState, useEffect } from "react";
import { useScrollActive } from "../hooks/useScrollActive";
import { motion } from "framer-motion";
import { TiThMenu } from "react-icons/ti";
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

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { href: "#me", label: "Me" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
  ];

  const headerClass = scrolled 
    ? "glass backdrop-blur-md border-b border-white/10 shadow-lg" 
    : "bg-transparent";

  return (
    <motion.header 
      className={`fixed w-full z-50 transition-all duration-300 ${headerClass}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <div>
            <a href="#hero" className="font-display text-xl font-semibold text-white group flex items-center">
              <span className="text-white">
                John
              </span>
              <span className="text-accent mx-0.5">.</span>
              <span className="text-primary/90 relative font-mono">
                Code
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary/60 group-hover:w-full transition-all duration-300"></span>
              </span>
            </a>
          </div>

          <nav className="hidden sm:block">
            <ul className="flex space-x-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`nav-link text-white/60 hover:text-white transition-all py-1 text-sm ${
                      activeSection === link.href.substring(1) ? "active text-white" : ""
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a 
                  href="#me" 
                  className="px-3 py-1 bg-primary text-white rounded hover:bg-primary/90 transition-colors text-sm"
                >
                  Connect
                </a>
              </li>
            </ul>
          </nav>

          <button
            className="sm:hidden text-white focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ?<MdClose className="h-[25px] w-[25px]" />:<IoMenu className="h-[25px] w-[25px]"/>}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div 
        className={`sm:hidden bg-muted/90 backdrop-blur-md border-b border-white/5 px-5 py-3 ${mobileMenuOpen ? "block" : "hidden"}`}
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: mobileMenuOpen ? 1 : 0,
          height: mobileMenuOpen ? "auto" : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <ul className="space-y-3">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`block py-2 text-white/60 hover:text-white transition-colors text-sm ${
                  activeSection === link.href.substring(1) ? "text-white" : ""
                }`}
                onClick={closeMobileMenu}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.header>
  );
}
