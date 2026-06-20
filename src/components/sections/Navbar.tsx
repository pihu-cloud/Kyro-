"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Magnetic from "../ui/Magnetic";
import Logo from "../ui/Logo";


const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Process", href: "#process" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);

  // Monitor scroll behavior (sticky shrinks, progress bar percentage)
  useEffect(() => {
    const handleScroll = () => {
      // Shrink effect trigger
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Calculate progress percentage
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver to set active sections
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px", // Trigger active section when middle of section hits viewport
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sections = ["home", "about", "services", "projects", "process", "contact"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "py-3 glass-navbar shadow-lg" 
            : "py-6 bg-transparent border-b border-transparent"
        }`}
      >
        {/* Scroll Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/5 pointer-events-none">
          <motion.div
            className="h-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <Magnetic>
            <a 
              href="#home"
              onClick={(e) => handleLinkClick(e, "#home")}
              className="text-2xl font-bold font-sans tracking-tight text-[var(--foreground)]"
            >
              <Logo />
            </a>
          </Magnetic>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`text-sm font-medium tracking-wide uppercase transition-colors duration-300 relative py-1 ${
                  activeSection === link.href.replace("#", "")
                    ? "text-[var(--foreground)]"
                    : "text-[var(--muted-text)] hover:text-[var(--foreground)]"
                }`}
              >
                {link.name}
                {activeSection === link.href.replace("#", "") && (
                  <motion.span
                    layoutId="activeNavLine"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 to-cyan-400"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* CTA (desktop only) */}
          <div className="hidden md:flex items-center gap-5">
            <Magnetic>
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, "#contact")}
                className="px-5 py-2 text-xs font-bold font-mono tracking-widest uppercase rounded-full border border-[var(--border)] dark:border-violet-500/30 text-[var(--foreground)] hover:bg-black/5 dark:hover:bg-violet-600/10 hover:border-[var(--border-hover)] dark:hover:border-violet-400 transition-all duration-300"
              >
                Let's Build
              </a>
            </Magnetic>
          </div>

          {/* Mobile hamburger icon */}
          <div className="md:hidden flex items-center">
            <Magnetic>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[var(--muted-text)] hover:text-[var(--foreground)] transition-colors duration-300 focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </Magnetic>
          </div>
        </div>
      </header>


      {/* Mobile drawer overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-[#f8fafc]/98 dark:bg-[#050816]/98 backdrop-blur-xl z-40 flex flex-col justify-center px-8 transition-colors duration-500"
          >
            <div className="flex flex-col gap-6 text-left max-w-sm mx-auto w-full">
              <div className="flex justify-between items-center border-b border-slate-200 dark:border-white/5 pb-4">
                <span className="text-xs font-mono tracking-widest text-violet-400 uppercase">
                  NAVIGATION
                </span>
              </div>
              <nav className="flex flex-col gap-4">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 + 0.1, duration: 0.4 }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className={`text-3xl font-bold font-sans tracking-tight uppercase flex items-center justify-between ${
                        activeSection === link.href.replace("#", "")
                          ? "text-[var(--foreground)]"
                          : "text-slate-400 dark:text-gray-500 hover:text-[var(--foreground)]"
                      }`}
                    >
                      <span>{link.name}</span>
                      {activeSection === link.href.replace("#", "") && (
                        <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
                      )}
                    </a>
                  </motion.div>
                ))}
              </nav>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="mt-8 pt-8 border-t border-slate-200 dark:border-white/5 flex flex-col gap-4 font-mono text-sm text-[var(--muted-text)]"
              >
                <div>
                  <span className="text-violet-400 font-semibold">Email:</span> hello@kyro.dev
                </div>
                <div className="flex gap-4 text-xs tracking-widest uppercase">
                  <a href="#" className="hover:text-[var(--foreground)] transition-colors duration-200">GitHub</a>
                  <a href="#" className="hover:text-[var(--foreground)] transition-colors duration-200">LinkedIn</a>
                  <a href="#" className="hover:text-[var(--foreground)] transition-colors duration-200">Dribbble</a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
