"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  const [hasEntered, setHasEntered] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasEntered(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const letters = ["K", "y", "r", "o"];

  const containerVariants = {
    initial: {},
    enter: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const letterVariants = {
    initial: { y: "110%", opacity: 0 },
    enter: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.65,
        ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number], // cubic-bezier easeOutQuad/easeOutCubic
        delay: i * 0.06 + 0.15,
      },
    }),
    exitHover: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.35,
        ease: [0.76, 0, 0.24, 1] as [number, number, number, number], // Power4-like ease
        delay: i * 0.025,
      },
    }),
    hover: (i: number) => ({
      y: "-110%",
      opacity: 0.4,
      transition: {
        duration: 0.35,
        ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
        delay: i * 0.025,
      },
    }),
  };

  const letterVariantsDuplicate = {
    initial: { y: "110%", opacity: 0 },
    enter: { y: "110%", opacity: 0 },
    exitHover: (i: number) => ({
      y: "110%",
      opacity: 0,
      transition: {
        duration: 0.35,
        ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
        delay: i * 0.025,
      },
    }),
    hover: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.35,
        ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
        delay: i * 0.025,
      },
    }),
  };

  const dotVariants = {
    initial: { scale: 0, opacity: 0 },
    enter: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 15,
        delay: 0.5,
      },
    },
    exitHover: {
      scale: 1,
      backgroundColor: "#22d3ee", // cyan-400
      boxShadow: "0 0 0px rgba(34, 211, 238, 0)",
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 15,
      },
    },
    hover: {
      scale: 1.4,
      backgroundColor: "#d946ef", // fuchsia-500
      boxShadow: "0 0 10px rgba(217, 70, 239, 0.7)",
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 10,
      },
    },
  };

  const activeVariant = isHovered
    ? "hover"
    : hasEntered
    ? "exitHover"
    : "enter";

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`flex items-center gap-0.5 select-none cursor-pointer ${className}`}
    >
      <motion.div
        className="flex items-center overflow-hidden py-1"
        variants={containerVariants}
        initial="initial"
        animate="enter"
      >
        {letters.map((char, index) => (
          <span
            key={index}
            className="relative inline-block overflow-hidden"
          >
            {/* Original Letter */}
            <motion.span
              custom={index}
              variants={letterVariants}
              animate={activeVariant}
              className="inline-block relative z-10"
            >
              {char}
            </motion.span>

            {/* Duplicate Letter (colored / gradient on hover) */}
            <motion.span
              custom={index}
              variants={letterVariantsDuplicate}
              animate={activeVariant}
              className="absolute left-0 top-0 inline-block bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent font-bold w-full h-full"
            >
              {char}
            </motion.span>
          </span>
        ))}
      </motion.div>

      {/* Decorative pulse dot */}
      <motion.span
        variants={dotVariants}
        animate={activeVariant}
        className="w-1.5 h-1.5 rounded-full inline-block ml-0.5 self-end mb-2"
        style={{ backgroundColor: "#22d3ee" }}
      />
    </div>
  );
}
