"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink, ShieldCheck, Video } from "lucide-react";
import TiltCard from "../ui/TiltCard";

const projects = [
  {
    title: "Sterling Insurance Portal",
    description: "A California wholesale insurance portal enabling agencies to submit risks, receive quotes, finance policies, and bind coverage in one integrated system.",
    features: [
      "CA-specific templates (Restaurant, Contractor, etc.)",
      "Intelligent multi-carrier risk routing",
      "Integrated ACH/Card payments & EMI calculator",
    ],
    tech: ["Next.js 14", "TypeScript", "MongoDB", "NextAuth.js", "Tailwind CSS", "Zod"],
    liveUrl: "https://sterling-insurance-enpgjv8na-divyam-sainis-projects.vercel.app/signin",
    icon: <ShieldCheck size={36} className="text-cyan-400 group-hover:scale-110 transition-transform duration-500" />,
    mockupType: "sterling"
  },
  {
    title: "Jennifyy",
    description: "A fullstack real-time messaging and HD video calling application. Features JWT protected endpoints, concurrent multi-user chat, reactions, typing indicators, and 32 custom UI themes.",
    features: [
      "Real-time chat & reactions via Stream API",
      "1-on-1 & Group HD Video Calls with screen recording",
      "Global state management with Zustand & 32 UI themes",
    ],
    tech: ["React.js", "Express.js", "MongoDB", "TailwindCSS", "Zustand", "Stream API"],
    liveUrl: "https://shiny-winner-production.up.railway.app",
    icon: <Video size={36} className="text-violet-400 group-hover:scale-110 transition-transform duration-500" />,
    mockupType: "jennifyy"
  },
];

// Pure CSS high-fidelity interactive mockups
function ProjectMockup({ type }: { type: string }) {
  if (type === "sterling") {
    return (
      <div className="w-full h-full flex items-center justify-center p-6 bg-[#040c14] relative overflow-hidden group">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.12)_0%,transparent_60%)]" />
        <div className="w-[85%] h-[80%] rounded-lg bg-[#010408] border border-cyan-900/30 shadow-2xl p-4 flex flex-col justify-between relative z-10 transition-transform duration-500 group-hover:scale-105">
          <div className="flex items-center justify-between border-b border-cyan-950 pb-2">
            <span className="text-[9px] font-mono text-cyan-400 tracking-wider font-bold">STERLING INSURANCE</span>
            <div className="flex gap-1.5 items-center">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[8px] font-mono text-emerald-400 font-semibold">CA PORTAL</span>
            </div>
          </div>
          <div className="flex-1 my-3 flex flex-col gap-2 justify-center">
            <div className="flex justify-between items-center bg-cyan-950/10 px-2 py-1.5 rounded border border-cyan-900/20">
              <span className="text-[9px] text-gray-400">Industry: Restaurant (CA-102)</span>
              <span className="text-[9px] text-emerald-400 font-mono">Quotes Ready</span>
            </div>
            <div className="flex justify-between items-center text-[9px] text-gray-500 px-1">
              <span>Wholesale Fee</span>
              <span className="text-white font-bold">$75.00</span>
            </div>
          </div>
          <div className="flex justify-between items-center bg-cyan-950/20 p-2 rounded border border-cyan-900/35">
            <span className="text-[8px] font-mono text-cyan-500">EMI Monthly Finance</span>
            <span className="text-[10px] font-mono text-white font-bold">$342.50 /mo</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-6 bg-[#090614] relative overflow-hidden group">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.12)_0%,transparent_60%)]" />
      <div className="w-[85%] h-[80%] rounded-lg bg-[#04020a] border border-violet-900/30 shadow-2xl p-4 flex flex-col justify-between relative z-10 transition-transform duration-500 group-hover:scale-105">
        <div className="flex items-center justify-between border-b border-violet-950 pb-2">
          <span className="text-[9px] font-mono text-violet-400 tracking-wider font-bold">📹 JENNIFYY CALL</span>
          <span className="text-[8px] font-mono text-gray-500">Theme: Emerald Glow</span>
        </div>
        <div className="flex-1 my-3 flex gap-2 items-center">
          <div className="w-12 h-12 rounded-lg bg-violet-950/40 border border-violet-500/20 flex items-center justify-center relative overflow-hidden">
            <span className="text-[10px] font-bold text-violet-300">USER</span>
            <div className="absolute bottom-0.5 left-0.5 right-0.5 h-1 bg-emerald-500 rounded" />
          </div>
          <div className="w-12 h-12 rounded-lg bg-cyan-950/40 border border-cyan-500/20 flex items-center justify-center relative overflow-hidden">
            <span className="text-[10px] font-bold text-cyan-300">GUEST</span>
            <div className="absolute bottom-0.5 left-0.5 right-0.5 h-1 bg-cyan-500 rounded" />
          </div>
        </div>
        <div className="flex justify-between items-center text-[8px] font-mono text-gray-500">
          <span className="animate-pulse text-violet-400">typing reactions...</span>
          <span>Stream API Bound</span>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position of the entire container (200vh height)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Card 1 Animations (Sterling)
  // Slides left, shrinks back in depth, rotates, and fades
  const x1 = useTransform(scrollYProgress, [0, 0.55], ["0%", "-115%"]);
  const scale1 = useTransform(scrollYProgress, [0, 0.55], [1, 0.82]);
  const rotateY1 = useTransform(scrollYProgress, [0, 0.55], [0, 15]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.45, 0.55], [1, 0.9, 0]);

  // Card 2 Animations (Jennifyy)
  // Slides in from right, scales up to full size, rotates straight, and fades in
  const x2 = useTransform(scrollYProgress, [0.15, 0.75], ["115%", "0%"]);
  const scale2 = useTransform(scrollYProgress, [0.15, 0.75], [0.82, 1]);
  const rotateY2 = useTransform(scrollYProgress, [0.15, 0.75], [-15, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.15, 0.25, 0.75], [0, 0.35, 1]);

  // Dynamic Z-indices to ensure the active card is always on top and clickable
  const zIndex1 = useTransform(scrollYProgress, [0, 0.4, 0.45], [20, 20, 10]);
  const zIndex2 = useTransform(scrollYProgress, [0, 0.4, 0.45], [10, 10, 20]);

  return (
    <section id="projects" className="relative">
      {/* Desktop Sticky 3D Stacking Gallery */}
      <div
        ref={containerRef}
        className="relative h-[220vh] bg-transparent border-t border-[var(--border)] md:block hidden"
        data-cursor-drag
      >
        {/* Sticky panel that pins screen for horizontal scroll experience */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">
          {/* Section Grid Background */}
          <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
          
          {/* Glow decoration */}
          <div className="glow-spot w-[450px] h-[450px] bg-violet-600/5 top-1/4 left-1/4" />
          <div className="glow-spot w-[450px] h-[450px] bg-cyan-600/5 bottom-1/4 right-1/4" />

          <div className="max-w-7xl mx-auto px-6 md:px-12 w-full z-10 flex flex-col relative h-[85vh] justify-between">
            
            {/* Header */}
            <div className="flex justify-between items-end mb-6 w-full">
              <div>
                <span className="text-xs font-mono tracking-widest text-violet-400 uppercase">
                  SELECTED PROJECTS
                </span>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--foreground)] mt-2">
                  Featured Work
                </h2>
              </div>
              <p className="text-[var(--muted-text)] max-w-sm font-light text-right text-xs leading-relaxed">
                Use your mouse wheel or swipe up/down. Stacking cards rotate in 3D space.
              </p>
            </div>

            {/* Stacking 3D Deck Canvas */}
            <div className="relative flex-1 w-full flex items-center justify-center perspective-1000">
              
              {/* Card 1: Sterling */}
              <motion.div
                style={{
                  x: x1,
                  scale: scale1,
                  rotateY: rotateY1,
                  opacity: opacity1,
                  zIndex: zIndex1,
                  transformStyle: "preserve-3d"
                }}
                className="absolute w-[800px] h-[460px]"
              >
                <TiltCard className="h-full group">
                  <div className="gradient-border-card overflow-hidden flex h-full backdrop-blur-md">
                    {/* Left: Mockup */}
                    <div className="w-[50%] h-full border-r border-[var(--border)] relative overflow-hidden">
                      <ProjectMockup type={projects[0].mockupType} />
                    </div>
                    
                    {/* Right: Details */}
                    <div className="w-[50%] p-8 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-[var(--border)] rounded-xl border border-[var(--border)]">
                            {projects[0].icon}
                          </div>
                          <h3 className="text-2xl font-bold text-[var(--foreground)] group-hover:text-cyan-300 transition-colors duration-300">
                            {projects[0].title}
                          </h3>
                        </div>
                        
                        <p className="text-[var(--muted-text)] text-xs font-light leading-relaxed mb-4">
                          {projects[0].description}
                        </p>

                        <ul className="space-y-2 mb-4">
                          {projects[0].features.map((feat) => (
                            <li key={feat} className="flex items-center gap-2.5 text-xs text-[var(--muted-text)] font-mono">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-3 pt-3 border-t border-[var(--border)]">
                        <div className="flex flex-wrap gap-1.5">
                          {projects[0].tech.map((tag) => (
                            <span
                              key={tag}
                              className="text-[9px] font-mono px-2 py-0.5 rounded bg-[var(--border)]/50 text-[var(--muted-text)] border border-[var(--border)]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex justify-between items-center pt-2">
                          <span className="text-[10px] font-mono text-[var(--muted-text)]/70 uppercase">
                            Proprietary Client Work
                          </span>
                          <a
                            href={projects[0].liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
                          >
                            <span>LIVE PORTAL</span>
                            <ExternalLink size={14} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>

              {/* Card 2: Jennifyy */}
              <motion.div
                style={{
                  x: x2,
                  scale: scale2,
                  rotateY: rotateY2,
                  opacity: opacity2,
                  zIndex: zIndex2,
                  transformStyle: "preserve-3d"
                }}
                className="absolute w-[800px] h-[460px]"
              >
                <TiltCard className="h-full group">
                  <div className="gradient-border-card overflow-hidden flex h-full backdrop-blur-md">
                    {/* Left: Mockup */}
                    <div className="w-[50%] h-full border-r border-[var(--border)] relative overflow-hidden">
                      <ProjectMockup type={projects[1].mockupType} />
                    </div>
                    
                    {/* Right: Details */}
                    <div className="w-[50%] p-8 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-[var(--border)] rounded-xl border border-[var(--border)]">
                            {projects[1].icon}
                          </div>
                          <h3 className="text-2xl font-bold text-[var(--foreground)] group-hover:text-violet-300 transition-colors duration-300">
                            {projects[1].title}
                          </h3>
                        </div>
                        
                        <p className="text-[var(--muted-text)] text-xs font-light leading-relaxed mb-4">
                          {projects[1].description}
                        </p>

                        <ul className="space-y-2 mb-4">
                          {projects[1].features.map((feat) => (
                            <li key={feat} className="flex items-center gap-2.5 text-xs text-[var(--muted-text)] font-mono">
                              <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-3 pt-3 border-t border-[var(--border)]">
                        <div className="flex flex-wrap gap-1.5">
                          {projects[1].tech.map((tag) => (
                            <span
                              key={tag}
                              className="text-[9px] font-mono px-2 py-0.5 rounded bg-[var(--border)]/50 text-[var(--muted-text)] border border-[var(--border)]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex justify-between items-center pt-2">
                          <span className="text-[10px] font-mono text-[var(--muted-text)]/70 uppercase">
                            Proprietary Client Work
                          </span>
                          <a
                            href={projects[1].liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 text-xs font-mono text-violet-400 hover:text-violet-300 transition-colors duration-200"
                          >
                            <span>LIVE PLATFORM</span>
                            <ExternalLink size={14} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>

            </div>
          </div>
        </div>
      </div>

      {/* Mobile Fallback: Standard responsive vertical stack */}
      <div className="md:hidden block py-20 px-6 bg-transparent border-t border-[var(--border)] relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          {/* Header */}
          <div>
            <span className="text-xs font-mono tracking-widest text-violet-400 uppercase">
              SELECTED PROJECTS
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] mt-2">
              Featured Work
            </h2>
          </div>

          {/* List of cards */}
          <div className="flex flex-col gap-8">
            {projects.map((project) => (
              <div key={project.title} className="gradient-border-card overflow-hidden flex flex-col rounded-2xl">
                {/* Visual mockup */}
                <div className="h-[200px] border-b border-[var(--border)] relative overflow-hidden">
                  <ProjectMockup type={project.mockupType} />
                </div>
                
                {/* Details */}
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-[var(--border)] rounded-lg border border-[var(--border)]">
                        {project.icon}
                      </div>
                      <h3 className="text-xl font-bold text-[var(--foreground)]">
                        {project.title}
                      </h3>
                    </div>
                    <p className="text-[var(--muted-text)] text-xs font-light leading-relaxed mb-6">
                      {project.description}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {project.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-2 text-[10px] text-[var(--muted-text)] font-mono">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-4 pt-4 border-t border-[var(--border)]">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((tag) => (
                        <span key={tag} className="text-[9px] font-mono px-2 py-0.5 rounded bg-[var(--border)]/50 text-[var(--muted-text)] border border-[var(--border)]">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-[9px] font-mono text-[var(--muted-text)]/70 uppercase">
                        Proprietary Client Work
                      </span>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-xs font-mono text-cyan-400"
                      >
                        <span>DEMO</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
