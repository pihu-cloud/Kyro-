"use client";

import { motion } from "framer-motion";

const PlaneIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full">
    <path
      fill="currentColor"
      d="M2 21l21-9L2 3v7l15 2-15 2v7z"
    />
  </svg>
);

export default function DriftingAirplanes() {
  const plane1Variants = {
    hidden: { x: "-10vw", y: "85vh", rotate: 28, opacity: 0, scale: 0.8 },
    animate: {
      x: "110vw",
      y: "15vh",
      opacity: [0, 0.06, 0.06, 0],
      transition: {
        duration: 22,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "linear" as const,
        delay: 2,
      },
    },
  };

  const plane2Variants = {
    hidden: { x: "-10vw", y: "45vh", rotate: 16, opacity: 0, scale: 0.6 },
    animate: {
      x: "110vw",
      y: "20vh",
      opacity: [0, 0.04, 0.04, 0],
      transition: {
        duration: 26,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "linear" as const,
        delay: 10,
      },
    },
  };

  const plane3Variants = {
    hidden: { x: "110vw", y: "95vh", rotate: -155, opacity: 0, scale: 0.7 },
    animate: {
      x: "-10vw",
      y: "35vh",
      opacity: [0, 0.05, 0.05, 0],
      transition: {
        duration: 30,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "linear" as const,
        delay: 6,
      },
    },
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Plane 1: Left-to-Right ascending */}
      <motion.div
        variants={plane1Variants}
        initial="hidden"
        animate="animate"
        className="absolute w-8 h-8 text-cyan-500/80 filter blur-[0.5px]"
      >
        <PlaneIcon />
      </motion.div>

      {/* Plane 2: Left-to-Right slow glide */}
      <motion.div
        variants={plane2Variants}
        initial="hidden"
        animate="animate"
        className="absolute w-6 h-6 text-violet-500/80 filter blur-[0.5px]"
      >
        <PlaneIcon />
      </motion.div>

      {/* Plane 3: Right-to-Left descending */}
      <motion.div
        variants={plane3Variants}
        initial="hidden"
        animate="animate"
        className="absolute w-7 h-7 text-fuchsia-500/70 filter blur-[1px]"
      >
        <PlaneIcon />
      </motion.div>
    </div>
  );
}
