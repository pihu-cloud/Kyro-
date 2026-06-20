"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  GitBranch, Github, Code2, Globe, Server, Database, Flame, Layers,
  Terminal, ShieldCheck, Radio, Key, ClipboardCheck, Send, Compass, Wind
} from "lucide-react";

// Brand-styled technologies array (16 items from resumes)
const techStack = [
  {
    name: "React.js",
    icon: <Globe size={24} />,
    color: "rgba(6, 182, 212, 0.4)", // Cyan
    glow: "shadow-[0_0_20px_-3px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_0px_rgba(6,182,212,0.6)]",
    textColor: "text-cyan-400",
    floatDuration: 5,
    floatDelay: 0,
  },
  {
    name: "Next.js 14",
    icon: <Layers size={24} />,
    color: "rgba(var(--foreground-rgb), 0.4)", // Dynamic text/border color
    glow: "shadow-[0_0_20px_-3px_rgba(var(--foreground-rgb),0.15)] hover:shadow-[0_0_25px_0px_rgba(var(--foreground-rgb),0.4)]",
    textColor: "text-[var(--foreground)]",
    floatDuration: 6,
    floatDelay: 0.8,
  },
  {
    name: "TypeScript",
    icon: <Compass size={24} />,
    color: "rgba(59, 130, 246, 0.4)", // Blue
    glow: "shadow-[0_0_20px_-3px_rgba(59,130,246,0.2)] hover:shadow-[0_0_25px_0px_rgba(59,130,246,0.5)]",
    textColor: "text-blue-400",
    floatDuration: 5.6,
    floatDelay: 0.3,
  },
  {
    name: "Tailwind CSS",
    icon: <Wind size={24} />,
    color: "rgba(38, 198, 218, 0.4)", // Light Cyan
    glow: "shadow-[0_0_20px_-3px_rgba(38,198,218,0.2)] hover:shadow-[0_0_25px_0px_rgba(38,198,218,0.5)]",
    textColor: "text-cyan-300",
    floatDuration: 5.2,
    floatDelay: 1.1,
  },
  {
    name: "Node.js",
    icon: <Server size={24} />,
    color: "rgba(34, 197, 94, 0.4)", // Green
    glow: "shadow-[0_0_20px_-3px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_0px_rgba(34,197,94,0.6)]",
    textColor: "text-green-400",
    floatDuration: 5.5,
    floatDelay: 0.5,
  },
  {
    name: "Express.js",
    icon: <Code2 size={24} />,
    color: "rgba(168, 85, 247, 0.4)", // Purple
    glow: "shadow-[0_0_20px_-3px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_0px_rgba(168,85,247,0.6)]",
    textColor: "text-purple-400",
    floatDuration: 5.2,
    floatDelay: 1.2,
  },
  {
    name: "MongoDB",
    icon: <Database size={24} />,
    color: "rgba(16, 185, 129, 0.4)", // Emerald
    glow: "shadow-[0_0_20px_-3px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_0px_rgba(16,185,129,0.6)]",
    textColor: "text-emerald-400",
    floatDuration: 5.8,
    floatDelay: 0.2,
  },
  {
    name: "Mongoose ODM",
    icon: <Database size={24} className="opacity-70" />,
    color: "rgba(220, 38, 38, 0.4)", // Dark Red
    glow: "shadow-[0_0_20px_-3px_rgba(220,38,38,0.2)] hover:shadow-[0_0_25px_0px_rgba(220,38,38,0.5)]",
    textColor: "text-red-500",
    floatDuration: 6.4,
    floatDelay: 1.5,
  },
  {
    name: "Socket.io",
    icon: <Radio size={24} />,
    color: "rgba(236, 72, 153, 0.4)", // Pink
    glow: "shadow-[0_0_20px_-3px_rgba(236,72,153,0.2)] hover:shadow-[0_0_25px_0px_rgba(236,72,153,0.5)]",
    textColor: "text-pink-400",
    floatDuration: 5.3,
    floatDelay: 0.7,
  },
  {
    name: "NextAuth.js",
    icon: <Key size={24} />,
    color: "rgba(249, 115, 22, 0.4)", // Orange
    glow: "shadow-[0_0_20px_-3px_rgba(249,115,22,0.2)] hover:shadow-[0_0_25px_0px_rgba(249,115,22,0.5)]",
    textColor: "text-orange-400",
    floatDuration: 5.9,
    floatDelay: 1.4,
  },
  {
    name: "Zod Parsing",
    icon: <ClipboardCheck size={24} />,
    color: "rgba(14, 165, 233, 0.4)", // Sky Blue
    glow: "shadow-[0_0_20px_-3px_rgba(14,165,233,0.2)] hover:shadow-[0_0_25px_0px_rgba(14,165,233,0.5)]",
    textColor: "text-sky-400",
    floatDuration: 5.1,
    floatDelay: 0.9,
  },
  {
    name: "Python / Flask",
    icon: <Terminal size={24} />,
    color: "rgba(234, 179, 8, 0.4)", // Yellow
    glow: "shadow-[0_0_20px_-3px_rgba(234,179,8,0.2)] hover:shadow-[0_0_25px_0px_rgba(234,179,8,0.5)]",
    textColor: "text-yellow-400",
    floatDuration: 6.1,
    floatDelay: 0.6,
  },
  {
    name: "Firebase",
    icon: <Flame size={24} />,
    color: "rgba(245, 158, 11, 0.4)", // Amber
    glow: "shadow-[0_0_20px_-3px_rgba(245,158,11,0.3)] hover:shadow-[0_0_25px_0px_rgba(245,158,11,0.6)]",
    textColor: "text-amber-400",
    floatDuration: 6.2,
    floatDelay: 1.3,
  },
  {
    name: "Postman",
    icon: <Send size={24} />,
    color: "rgba(249, 115, 22, 0.4)", // Orange
    glow: "shadow-[0_0_20px_-3px_rgba(249,115,22,0.2)] hover:shadow-[0_0_25px_0px_rgba(249,115,22,0.5)]",
    textColor: "text-orange-400",
    floatDuration: 5.4,
    floatDelay: 0.4,
  },
  {
    name: "Git Versioning",
    icon: <GitBranch size={24} />,
    color: "rgba(239, 68, 68, 0.4)", // Red
    glow: "shadow-[0_0_20px_-3px_rgba(239,68,68,0.2)] hover:shadow-[0_0_25px_0px_rgba(239,68,68,0.5)]",
    textColor: "text-red-400",
    floatDuration: 5.7,
    floatDelay: 1.0,
  },
  {
    name: "GitHub Cloud",
    icon: <Github size={24} />,
    color: "rgba(156, 163, 175, 0.4)", // Gray
    glow: "shadow-[0_0_20px_-3px_rgba(156,163,175,0.2)] hover:shadow-[0_0_25px_0px_rgba(156,163,175,0.5)]",
    textColor: "text-[var(--foreground)]/80",
    floatDuration: 5.8,
    floatDelay: 0.1,
  },
];

export default function TechStack() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="tech"
      className="relative py-24 md:py-32 bg-[var(--background)] grid-bg overflow-hidden border-t border-[var(--border)]"
    >
      {/* Decorative Glow spot */}
      <div className="glow-spot w-[400px] h-[400px] bg-violet-600/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 z-10 relative">
        {/* Section Header */}
        <div className="text-center md:text-left mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <span className="text-xs font-mono tracking-widest text-violet-400 uppercase">
              TOOLS & ECOSYSTEMS
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--foreground)] mt-2">
              Our Tech Stack
            </h2>
          </div>
          <p className="text-[var(--muted-text)] max-w-md font-light text-left md:text-right">
            Curated frameworks, languages, and security architectures integrated into our development systems.
          </p>
        </div>

        {/* Floating Badges Container (16 items grid) */}
        <div 
          ref={ref}
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-5xl mx-auto mt-8"
        >
          {techStack.map((tech) => (
            <motion.div
              key={tech.name}
              initial={isInView ? { opacity: 0, scale: 0.8 } : {}}
              animate={isInView ? {
                opacity: 1,
                scale: 1,
                y: [0, -12, 0] // Floating keyframe looping
              } : {}}
              transition={isInView ? {
                opacity: { duration: 0.6 },
                scale: { duration: 0.6 },
                y: {
                  duration: tech.floatDuration,
                  repeat: Infinity,
                  ease: "easeInOut" as const,
                  delay: tech.floatDelay,
                }
              } : {}}
              whileHover={{ 
                scale: 1.05, 
                transition: { duration: 0.2 } 
              }}
              style={{ borderColor: tech.color }}
              className={`p-6 bg-[var(--card)] backdrop-blur-md border rounded-2xl flex flex-col items-center justify-center gap-4 cursor-pointer text-center group transition-all duration-300 ${tech.glow}`}
            >
              <div className={`p-3 rounded-xl bg-[var(--border)] group-hover:bg-[var(--border-hover)] transition-colors duration-300 ${tech.textColor}`}>
                {tech.icon}
              </div>
              <span className="text-xs font-bold font-mono tracking-wide text-[var(--foreground)] group-hover:scale-105 transition-transform duration-300">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
