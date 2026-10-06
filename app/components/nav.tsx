"use client";
import { useState } from "react";
import { LuMenu as Menu, LuX as X } from "react-icons/lu";
import { useScrollActive } from "../hooks/useScrollActive";

const navLinks = [
  { href: "#me", id: "me", label: "Home" },
  { href: "#skills", id: "skills", label: "Stack" },
  { href: "#projects", id: "projects", label: "Projects" },
  { href: "#experience", id: "experience", label: "Experience" },
  { href: "#contact", id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeSection = useScrollActive();

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="site-header sticky top-0 z-50">
      <div className="page-shell nav-inner">
        <a href="#me" className="site-brand" aria-label="Sahil Gupta, home">
          &lt;sg<span className="brand-accent"> /&gt;</span>
        </a>

        <nav className="site-nav" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-active={activeSection === link.id}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
            className="menu-toggle"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <div className="page-shell">
        <div className="mobile-nav" data-open={mobileMenuOpen}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMobileMenu}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}