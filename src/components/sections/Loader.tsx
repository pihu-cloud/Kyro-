"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Prevent scrolling during load
    document.body.style.overflow = "hidden";

    // Progress counter animation
    const duration = 1600; // 1.6 seconds
    const intervalTime = 30;
    const steps = duration / intervalTime;
    let stepCount = 0;

    const timer = setInterval(() => {
      stepCount++;
      const nextProgress = Math.min(
        Math.floor((stepCount / steps) * 100),
        100
      );
      
      setProgress(nextProgress);

      if (nextProgress === 100) {
        clearInterval(timer);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(() => {
            document.body.style.overflow = "";
            onComplete();
          }, 600); // Wait for slide up transition
        }, 300); // Hold at 100% briefly
      }
    }, intervalTime);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  // Text animation variants
  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const letterVariants = {
    initial: { y: 60, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          className="fixed inset-0 bg-[#030014] z-[99999] flex flex-col justify-between p-8 md:p-16 select-none"
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
        >
          {/* Top Info */}
          <div className="flex justify-between items-center text-xs font-mono tracking-widest text-violet-400 uppercase">
            <div>PRIYANSHI & DIVYAM</div>
            <div>FULL-STACK PORTFOLIO ©2026</div>
          </div>

          {/* Center Brand Text */}
          <div className="flex flex-col items-start gap-4">
            <motion.h1
              className="text-4xl md:text-7xl font-bold tracking-tighter text-white font-sans overflow-hidden flex"
              variants={containerVariants}
              initial="initial"
              animate="animate"
            >
              {Array.from("KYRO STUDIO").map((letter, idx) => (
                <motion.span
                  key={idx}
                  variants={letterVariants}
                  className={letter === " " ? "w-4 md:w-8" : ""}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-gray-400 font-mono text-sm tracking-wide pl-1"
            >
              Designing and engineering high-end digital experiences
            </motion.p>
          </div>

          {/* Bottom Progress Indicator */}
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-baseline font-mono">
              <span className="text-xs text-gray-500 uppercase tracking-widest">
                SYSTEM BOOTING
              </span>
              <motion.span 
                className="text-6xl md:text-9xl font-bold font-sans text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-cyan-400"
                layout
              >
                {progress}%
              </motion.span>
            </div>
            
            {/* Progress line */}
            <div className="w-full h-[2px] bg-white/5 relative overflow-hidden rounded-full">
              <motion.div 
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400 rounded-full"
                style={{ width: `${progress}%` }}
                layout
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
