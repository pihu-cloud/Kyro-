"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

// Section imports
import Loader from "@/components/sections/Loader";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import Process from "@/components/sections/Process";
import TechStack from "@/components/sections/TechStack";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Loader key="loader" onComplete={() => setIsLoading(false)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col min-h-screen relative"
          >
            {/* Sticky Navigation Bar */}
            <Navbar />

            {/* Main Content Sections */}
            <main className="flex-grow">
              <Hero />
              <About />
              <Services />
              <Projects />
              <Process />
              <TechStack />
              <Testimonials />
              <Contact />
            </main>

            {/* Footer */}
            <Footer />

            {/* Floating Back-To-Top Button */}
            <AnimatePresence>
              {showScrollTop && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5, y: 20 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  onClick={scrollToTop}
                  className="fixed bottom-8 right-8 z-40 p-4 rounded-full bg-violet-600 hover:bg-violet-500 text-white shadow-xl shadow-violet-500/20 border border-violet-400/30 hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none cursor-pointer flex items-center justify-center"
                  aria-label="Scroll to top"
                  style={{ touchAction: "manipulation" }}
                >
                  <ArrowUp size={18} />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
