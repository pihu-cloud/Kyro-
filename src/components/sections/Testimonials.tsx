"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Product Director at Roast & Co.",
    text: "Kyro Studio rebuilt our subscription app in Next.js. Page loads dropped below 200ms, and conversions surged by 22% within 30 days. Their engineering capabilities and eye for interface layouts are unmatched.",
    project: "Sterling Wholesale Portal",
  },
  {
    name: "Alex Rivera",
    role: "Co-Founder of Aegis Protocols",
    text: "Working with Divyam and Priyanshi was a game-changer. They built our Web3 time capsule application with incredible speed, delivering bulletproof security parameters, seamless IPFS handling, and a stunning UI.",
    project: "Jennifyy Chat Platform",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 = left, 1 = right
  const prefersReducedMotion = useReducedMotion();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    if (!prefersReducedMotion) {
      timerRef.current = setInterval(() => {
        handleNext();
      }, 6000);
    }
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [index, prefersReducedMotion]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  return (
    <section
      id="testimonials"
      className="relative py-24 md:py-32 bg-[var(--background)] grid-bg overflow-hidden border-t border-[var(--border)]"
    >
      {/* Decorative Blur Backgrounds */}
      <div className="glow-spot w-[350px] h-[350px] bg-violet-600/10 top-1/2 left-10 -translate-y-1/2" />
      <div className="glow-spot w-[350px] h-[350px] bg-cyan-600/10 top-1/2 right-10 -translate-y-1/2" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 z-10 relative">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono tracking-widest text-violet-400 uppercase">
            CLIENT VERDICTS
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--foreground)] mt-2">
            Trusted by Builders
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="glass-panel p-8 md:p-14 rounded-3xl relative overflow-hidden min-h-[320px] md:min-h-[260px] flex flex-col justify-between">
          <div className="absolute top-6 right-8 text-white/5 pointer-events-none">
            <Quote size={80} />
          </div>

          <div className="relative overflow-hidden flex-1 flex flex-col justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={index}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="space-y-6"
              >
                 <p className="text-[var(--foreground)] text-sm md:text-base font-light italic leading-relaxed pl-1">
                  &ldquo;{testimonials[index].text}&rdquo;
                </p>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 border-t border-[var(--border)]">
                  <div>
                    <h3 className="text-base font-bold text-[var(--foreground)]">
                      {testimonials[index].name}
                    </h3>
                    <p className="text-[var(--muted-text)] font-mono text-[11px] uppercase tracking-wider mt-0.5">
                      {testimonials[index].role}
                    </p>
                  </div>
                  
                  <span className="text-[10px] font-mono px-3 py-1 rounded bg-[var(--border)]/50 border border-[var(--border)] text-violet-400 font-bold uppercase tracking-wider w-fit">
                    Project: {testimonials[index].project}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-8 pt-4 border-t border-[var(--border)]">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > index ? 1 : -1);
                    setIndex(idx);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === index ? "bg-[var(--primary)] w-6" : "bg-[var(--border)] hover:bg-[var(--border-hover)]"
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-full border border-[var(--border)] hover:border-[var(--border-hover)] text-[var(--muted-text)] hover:text-[var(--foreground)] bg-[var(--card)] transition-all duration-200"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-full border border-[var(--border)] hover:border-[var(--border-hover)] text-[var(--muted-text)] hover:text-[var(--foreground)] bg-[var(--card)] transition-all duration-200"
                aria-label="Next testimonial"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
