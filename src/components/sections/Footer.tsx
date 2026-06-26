"use client";

import { motion } from "framer-motion";
import { ArrowUp, Sparkles, Github, Linkedin, Mail } from "lucide-react";
import Magnetic from "../ui/Magnetic";
import Logo from "../ui/Logo";

export default function Footer() {
  const handleScrollTo = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-[var(--background)] pt-16 pb-8 border-t border-[var(--border)] overflow-hidden grid-bg z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 pb-12 border-b border-[var(--border)]">
          {/* Logo & Slogan */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3">
            <a 
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleScrollTo("home");
              }}
              className="text-2xl font-bold font-sans tracking-tight text-[var(--foreground)]"
            >
              <Logo />
            </a>
            <p className="text-xs text-[var(--muted-text)] font-mono tracking-wide max-w-xs">
              Designing and engineering high-end digital products that scale.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-xs font-mono tracking-widest uppercase text-[var(--muted-text)]">
            <a 
              href="#home" 
              onClick={(e) => { e.preventDefault(); handleScrollTo("home"); }} 
              className="hover:text-[var(--foreground)] transition-colors duration-200"
            >
              Home
            </a>
            <a 
              href="#about" 
              onClick={(e) => { e.preventDefault(); handleScrollTo("about"); }} 
              className="hover:text-[var(--foreground)] transition-colors duration-200"
            >
              About
            </a>
            <a 
              href="#services" 
              onClick={(e) => { e.preventDefault(); handleScrollTo("services"); }} 
              className="hover:text-[var(--foreground)] transition-colors duration-200"
            >
              Services
            </a>
            <a 
              href="#projects" 
              onClick={(e) => { e.preventDefault(); handleScrollTo("projects"); }} 
              className="hover:text-[var(--foreground)] transition-colors duration-200"
            >
              Projects
            </a>
            <a 
              href="#process" 
              onClick={(e) => { e.preventDefault(); handleScrollTo("process"); }} 
              className="hover:text-[var(--foreground)] transition-colors duration-200"
            >
              Process
            </a>
            <a 
              href="#contact" 
              onClick={(e) => { e.preventDefault(); handleScrollTo("contact"); }} 
              className="hover:text-[var(--foreground)] transition-colors duration-200"
            >
              Contact
            </a>
          </div>

          {/* Back to top button */}
          <div>
            <Magnetic>
              <button
                onClick={() => handleScrollTo("home")}
                className="p-3 rounded-full border border-[var(--border)] hover:border-[var(--border-hover)] text-[var(--muted-text)] hover:text-[var(--foreground)] bg-[var(--card)] transition-all duration-300 group focus:outline-none"
                aria-label="Back to top"
              >
                <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
              </button>
            </Magnetic>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-8 text-[11px] font-mono text-[var(--muted-text)]">
          <div className="flex items-center gap-2">
            <Sparkles size={12} className="text-violet-400" />
            <span>© 2026 Kyro Studio. All rights reserved. Crafted by Priyanshi & Divyam.</span>
          </div>

          {/* Social icons */}
          <div className="flex gap-4">
            <Magnetic>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-[var(--foreground)] transition-colors"
                aria-label="GitHub"
              >
                <Github size={16} />
              </a>
            </Magnetic>
            <Magnetic>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-[var(--foreground)] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
            </Magnetic>
            <Magnetic>
              <a 
                href="mailto:kyro.builds306@gmail.com" 
                className="hover:text-[var(--foreground)] transition-colors"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </footer>
  );
}
