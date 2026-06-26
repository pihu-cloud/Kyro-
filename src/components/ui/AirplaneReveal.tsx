"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AirplaneRevealProps {
  name: string;
  colorTheme: "cyan" | "violet";
  onComplete: () => void;
}

export default function AirplaneReveal({ name, colorTheme, onComplete }: AirplaneRevealProps) {
  const [isDone, setIsDone] = useState(false);
  const letters = Array.from(name);

  useEffect(() => {
    // End the animation and reveal profile content after 2.8 seconds
    const timer = setTimeout(() => {
      setIsDone(true);
      setTimeout(onComplete, 600); // Wait for fade-out transition to complete
    }, 2800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const letterVariants = {
    initial: {
      opacity: 0,
      scale: 0.5,
      filter: "blur(12px)",
      textShadow: "0 0 0px rgba(255,255,255,0)",
    },
    animate: (i: number) => ({
      opacity: 1,
      scale: [0.5, 1.25, 1],
      filter: ["blur(12px)", "blur(0px)", "blur(0px)"],
      color: [
        "#ffffff",
        colorTheme === "cyan" ? "#22d3ee" : "#c084fc",
        colorTheme === "cyan" ? "#22d3ee" : "#a855f7"
      ],
      textShadow: [
        "0 0 0px rgba(255,255,255,0)",
        colorTheme === "cyan" 
          ? "0 0 35px rgba(34, 211, 238, 0.9), 0 0 15px rgba(34, 211, 238, 0.6)"
          : "0 0 35px rgba(168, 85, 247, 0.9), 0 0 15px rgba(168, 85, 247, 0.6)",
        colorTheme === "cyan"
          ? "0 0 15px rgba(34, 211, 238, 0.5)"
          : "0 0 15px rgba(168, 85, 247, 0.5)"
      ],
      transition: {
        duration: 0.7,
        ease: "easeOut" as const,
        delay: 0.5 + i * 0.12,
      }
    })
  };

  const smokePath = "M -100,300 C 200,100 400,500 600,300 C 800,100 1000,500 1300,300";

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
          className="fixed inset-0 bg-[#030014] z-[9999] flex flex-col items-center justify-center overflow-hidden select-none"
        >
          {/* Grid background overlay */}
          <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

          {/* SVG Canvas for smoke trail and auto-aligning plane */}
          <div className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center">
            <svg 
              viewBox="0 0 1200 600" 
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <filter id="glow-smoke" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Glowing Smoke Path */}
              <motion.path
                d={smokePath}
                fill="none"
                stroke={colorTheme === "cyan" ? "rgba(34, 211, 238, 0.7)" : "rgba(168, 85, 247, 0.7)"}
                strokeWidth="4"
                strokeLinecap="round"
                filter="url(#glow-smoke)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 2.2,
                  ease: [0.25, 1, 0.5, 1], // easeOutQuart for smooth finish
                  delay: 0.1
                }}
              />
            </svg>

            {/* Flying Airplane - Uses CSS offset-path for native curved path rotation */}
            <motion.div
              style={{
                offsetPath: `path('${smokePath}')`,
                offsetRotate: "auto",
                position: "absolute",
                left: 0,
                top: 0,
                width: "48px",
                height: "48px",
              } as React.CSSProperties}
              animate={{
                offsetDistance: ["0%", "100%"]
              }}
              transition={{
                duration: 2.2,
                ease: [0.25, 1, 0.5, 1],
                delay: 0.1
              }}
              className="flex items-center justify-center"
            >
              <svg 
                viewBox="0 0 24 24" 
                className={`w-10 h-10 ${
                  colorTheme === "cyan" ? "text-cyan-400" : "text-violet-400"
                } filter drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]`}
              >
                <path
                  fill="currentColor"
                  d="M2 21l21-9L2 3v7l15 2-15 2v7z"
                />
              </svg>
            </motion.div>
          </div>

          {/* Typography Name Display */}
          <div className="relative z-20 flex flex-col items-center">
            <span className="text-[10px] font-mono tracking-[0.4em] text-[var(--muted-text)] uppercase mb-4 animate-pulse">
              TRANSITIONING TO PROFILE
            </span>
            <div className="flex overflow-hidden py-4 px-8">
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-black font-sans tracking-[0.15em] uppercase flex select-none">
                {letters.map((char, idx) => (
                  <motion.span
                    key={idx}
                    custom={idx}
                    variants={letterVariants}
                    initial="initial"
                    animate="animate"
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </h1>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
