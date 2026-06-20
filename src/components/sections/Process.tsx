"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useInView } from "framer-motion";
import { Database, Cpu, Layout, Cloud, Hammer, ShieldAlert } from "lucide-react";

const steps = [
  {
    phase: "01",
    title: "Requirement Engineering & Schema Design",
    description: "Formulating system models, defining normalized schemas (MongoDB/Mongoose), establishing strict TypeScript type interfaces, and detailing data flow pathways.",
    icon: <Database size={20} className="text-cyan-400" />,
  },
  {
    phase: "02",
    title: "API Architecture & Auth Modeling",
    description: "Designing REST endpoints, implementing secure NextAuth.js protocols, designing JWT handshake tokens, and configuring real-time WebSocket gateways.",
    icon: <Cpu size={20} className="text-violet-400" />,
  },
  {
    phase: "03",
    title: "Frontend Orchestration & State Mapping",
    description: "Constructing component trees, configuring global stores (Zustand), mapping dynamic forms, and programming smooth spring micro-interactions.",
    icon: <Layout size={20} className="text-fuchsia-400" />,
  },
  {
    phase: "04",
    title: "CI/CD Pipeline & Containerization",
    description: "Writing Dockerfiles, setting up automated GitHub workflow actions, linking branch deployments on Vercel/Railway, and configuring builds.",
    icon: <Cloud size={20} className="text-blue-400" />,
  },
  {
    phase: "05",
    title: "Diagnostics & Edge-Case Testing",
    description: "Executing strict Zod parser schemas, validating API responses, implementing boundary catches, and verifying layouts across viewports.",
    icon: <Hammer size={20} className="text-emerald-400" />,
  },
  {
    phase: "06",
    title: "Security Audits & Performance Scaling",
    description: "Optimizing database index lookups, securing headers, caching queries, minifying page bundles, and completing speed benchmarks.",
    icon: <ShieldAlert size={20} className="text-pink-400" />,
  },
];

function TimelineItem({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Track scroll metrics of this individual card relative to viewport center
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const isEven = index % 2 === 0;

  // Smooth springs to drive 3D rotations, scales, opacities, and offsets on scroll
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.45, 0.55, 1], [0.88, 1.03, 1.03, 0.88]), { stiffness: 85, damping: 20 });
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.2, 1, 1, 0.2]), { stiffness: 85, damping: 20 });
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]), { stiffness: 85, damping: 20 });
  const rotateY = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [isEven ? 18 : -18, 0, isEven ? -18 : 18]), { stiffness: 85, damping: 20 });
  const y = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -40]), { stiffness: 85, damping: 20 });

  // Center node bullet animations synced on scroll
  const nodeScale = useSpring(useTransform(scrollYProgress, [0, 0.45, 0.55, 1], [1, 1.35, 1.35, 1]), { stiffness: 110, damping: 18 });
  const nodeGlowColor = useTransform(scrollYProgress, [0.4, 0.5, 0.6], ["rgba(139,92,246,0.2)", "rgba(6,182,212,0.9)", "rgba(139,92,246,0.2)"]);

  return (
    <div
      ref={ref}
      style={{ perspective: "1000px" }}
      className={`relative flex flex-col md:flex-row items-center justify-between w-full mb-20 md:mb-28 last:mb-0 ${
        isEven ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Spacer for desktop layout alignment */}
      <div className="hidden md:block w-[45%]" />

      {/* Center Timeline Node Bullet with interactive ring */}
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[var(--background)] border border-[var(--border)] flex items-center justify-center z-10 shadow-lg">
        <motion.div
          style={{
            scale: nodeScale,
            borderColor: nodeGlowColor
          }}
          className="w-4 h-4 rounded-full border-2 bg-violet-500/20 flex items-center justify-center transition-colors"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
        </motion.div>
      </div>

      {/* Card Content Container */}
      <motion.div
        style={{
          scale,
          opacity,
          rotateX,
          rotateY,
          y,
          transformStyle: "preserve-3d"
        }}
        className="w-full md:w-[45%] pl-12 md:pl-0"
      >
        <div 
          className="glass-panel p-8 rounded-2xl border border-[var(--border)] relative group cursor-pointer transition-all duration-300 hover:border-[var(--border-hover)]"
        >
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[var(--border)] rounded-xl border border-[var(--border)] group-hover:bg-[var(--border-hover)] group-hover:border-violet-500/30 transition-colors">
                {step.icon}
              </div>
              <h3 className="text-lg font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                {step.title}
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded">
              Phase {step.phase}
            </span>
          </div>
          
          <p className="text-[var(--muted-text)] text-xs font-light leading-relaxed group-hover:text-[var(--foreground)] transition-colors">
            {step.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position of the timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      id="process"
      className="relative py-24 md:py-32 bg-transparent grid-bg overflow-hidden border-t border-[var(--border)]"
    >
      {/* Dynamic light glows in process section */}
      <div className="glow-spot w-[350px] h-[350px] bg-violet-600/5 top-1/4 left-1/4" />
      <div className="glow-spot w-[350px] h-[350px] bg-cyan-600/5 bottom-1/4 right-1/4" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 z-10 relative">
        {/* Section Header */}
        <div className="text-center md:text-left mb-20 md:mb-28 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <span className="text-xs font-mono tracking-widest text-violet-400 uppercase">
              WORK METHODOLOGY
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--foreground)] mt-2">
              Our Development Lifecycle
            </h2>
          </div>
          <p className="text-[var(--muted-text)] max-w-md font-light text-left md:text-right">
            How we translate abstract concepts into production-ready platforms. Step-by-step clarity from definition to deployment.
          </p>
        </div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative max-w-5xl mx-auto py-8">
          
          {/* Vertical Track background line */}
          <div className="absolute top-0 bottom-0 left-4 md:left-1/2 -translate-x-1/2 w-[2px] bg-[var(--border)]" />

          {/* Animated vertical filler line */}
          <motion.div
            className="absolute top-0 bottom-0 left-4 md:left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-violet-600 via-fuchsia-500 to-cyan-400 origin-top"
            style={{ scaleY }}
          />

          {/* Timeline Items */}
          <div className="flex flex-col">
            {steps.map((step, idx) => (
              <TimelineItem key={step.title} step={step} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

