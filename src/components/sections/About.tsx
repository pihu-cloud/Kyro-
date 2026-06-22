"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Terminal, Layout, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import TiltCard from "../ui/TiltCard";

// Statistics Counter Component
function StatCounter({ value, title, suffix = "" }: { value: number; title: string; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const end = value;
      const duration = 1500; // 1.5s
      const steps = 50;
      const stepTime = duration / steps;
      let stepCount = 0;

      const timer = setInterval(() => {
        stepCount++;
        const nextVal = Math.floor((stepCount / steps) * end);
        setDisplayValue(nextVal);
        if (stepCount >= steps) {
          setDisplayValue(end);
          clearInterval(timer);
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="flex flex-col items-center p-6 glass-panel rounded-2xl text-center">
      <span className="text-3xl md:text-4xl font-extrabold text-[var(--foreground)] mb-2 font-sans flex items-center">
        {displayValue}
        <span className="text-cyan-400">{suffix}</span>
      </span>
      <span className="text-xs font-mono tracking-widest text-[var(--muted-text)] uppercase">{title}</span>
    </div>
  );
}

export default function About() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 15,
      },
    },
  };

  const priyanshiSkills = [
    { name: "React / Redux / Zustand", level: 95 },
    { name: "Next.js / TypeScript", level: 90 },
    { name: "REST API Integration", level: 95 },
    { name: "Framer Motion / Tailwind", level: 92 },
  ];

  const divyamSkills = [
    { name: "Next.js 14 / TypeScript", level: 95 },
    { name: "Node.js / Express.js", level: 92 },
    { name: "MongoDB / Mongoose", level: 90 },
    { name: "NextAuth / JWT Security", level: 92 },
  ];

  return (
    <section id="about" className="relative py-24 md:py-32 bg-transparent grid-bg overflow-hidden border-t border-[var(--border)]">
      {/* Decorative Glow background */}
      <div className="glow-spot w-[400px] h-[400px] bg-violet-600/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 z-10 relative">
        {/* Section Header */}
        <div className="text-center md:text-left mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <span className="text-xs font-mono tracking-widest text-violet-400 uppercase">
              CO-FOUNDERS & BUILDERS
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--foreground)] mt-2">
              Meet the Core Team
            </h2>
          </div>
          <p className="text-[var(--muted-text)] max-w-md font-light text-left md:text-right">
            We are engineering synergy. Two MERN & Next.js specialists operating in tandem to develop applications with seamless user-flows and highly scalable production architectures.
          </p>
        </div>

        {/* Profiles Grid */}
        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-8 lg:gap-12"
        >
          {/* Member 1: Priyanshi Agarwal */}
          <motion.div variants={cardVariants} className="cursor-pointer" data-cursor-view>
            <Link href="/team/priyanshi" className="block h-full">
              <TiltCard className="h-full group">
                <div className="gradient-border-card p-8 md:p-10 flex flex-col justify-between h-full min-h-[480px]">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-[var(--foreground)] group-hover:text-cyan-400 transition-colors">Priyanshi Agarwal</h3>
                        <p className="text-cyan-400 font-mono text-xs tracking-wider uppercase mt-1">
                          Frontend Architect
                        </p>
                      </div>
                      <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400 group-hover:bg-cyan-500/25 transition-all">
                        <Layout size={24} />
                      </div>
                    </div>
                    <p className="text-[var(--muted-text)] font-light mb-8 text-sm leading-relaxed">
                      MERN Stack Developer with 2 production internships and 2 national hackathon appearances. Specializing in responsive client layouts, REST integrations, and fluid user interactions. Focuses on writing polished frontend systems with high performance scores.
                    </p>
                  </div>

                  {/* Skill List */}
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="text-xs font-mono tracking-widest text-gray-500 uppercase mb-3">
                        CORE STACK
                      </h4>
                      {priyanshiSkills.map((skill) => (
                        <div key={skill.name} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-[var(--foreground)]/80 font-medium">{skill.name}</span>
                            <span className="text-[var(--muted-text)] font-mono">{skill.level}%</span>
                          </div>
                          <div className="w-full h-1 bg-[var(--border)] rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={isInView ? { width: `${skill.level}%` } : {}}
                              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                              className="h-full bg-gradient-to-r from-violet-500 to-cyan-400"
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 group-hover:translate-x-1.5 transition-transform duration-300 pt-2 border-t border-[var(--border)]">
                      <span>VIEW FULL RESUME & WORKS</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </TiltCard>
            </Link>
          </motion.div>

          {/* Member 2: Divyam Saini */}
          <motion.div variants={cardVariants} className="cursor-pointer" data-cursor-view>
            <Link href="/team/divyam" className="block h-full">
              <TiltCard className="h-full group">
                <div className="gradient-border-card p-8 md:p-10 flex flex-col justify-between h-full min-h-[480px]">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-[var(--foreground)] group-hover:text-violet-400 transition-colors">Divyam Saini</h3>
                        <p className="text-violet-400 font-mono text-xs tracking-wider uppercase mt-1">
                          Full Stack Developer
                        </p>
                      </div>
                      <div className="p-3 bg-violet-500/10 rounded-xl text-violet-400 group-hover:bg-violet-500/25 transition-all">
                        <Terminal size={24} />
                      </div>
                    </div>
                    <p className="text-[var(--muted-text)] font-light mb-8 text-sm leading-relaxed">
                      Full Stack Developer with enterprise deployment experience. Architected and shipped a comprehensive wholesale insurance portal currently powering 3+ live agencies. Specialized in backend schemas, database normalization, and secure NextAuth patterns.
                    </p>
                  </div>

                  {/* Skill List */}
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="text-xs font-mono tracking-widest text-gray-500 uppercase mb-3">
                        CORE STACK
                      </h4>
                      {divyamSkills.map((skill) => (
                        <div key={skill.name} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-[var(--foreground)]/80 font-medium">{skill.name}</span>
                            <span className="text-[var(--muted-text)] font-mono">{skill.level}%</span>
                          </div>
                          <div className="w-full h-1 bg-[var(--border)] rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={isInView ? { width: `${skill.level}%` } : {}}
                              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                              className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-400"
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono text-violet-400 group-hover:translate-x-1.5 transition-transform duration-300 pt-2 border-t border-[var(--border)]">
                      <span>VIEW FULL RESUME & WORKS</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </TiltCard>
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 md:mt-24">
          <StatCounter value={3} title="AGENCIES LIVE ON PRODUCTION" suffix="+" />
          <StatCounter value={2} title="PRODUCTION APPS ACTIVE" suffix="+" />
          <StatCounter value={2} title="NATIONAL HACKATHONS" suffix="" />
          <StatCounter value={4} title="COMBINED ROLES & INTERNSHIPS" suffix="+" />
        </div>
      </div>
    </section>
  );
}
