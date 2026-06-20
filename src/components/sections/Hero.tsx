"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Magnetic from "../ui/Magnetic";
import dynamic from "next/dynamic";

const Hero3DScene = dynamic(() => import("../ui/Hero3DScene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#030014] opacity-50" />
});


// Dynamic Code snippets to type out on motherboard panels
const AUTH_CODE_SNIPPET = [
  "import NextAuth from 'next-auth';",
  "export const authOptions = {",
  "  providers: [ CredentialsProvider({ ... }) ],",
  "  secret: process.env.NEXTAUTH_SECRET,",
  "  session: { strategy: 'jwt' },",
  "  callbacks: {",
  "    async session({ session, token }) {",
  "      session.user.id = token.sub;",
  "      return session;",
  "    }",
  "  }",
  "};"
];

const ANIMATION_CODE_SNIPPET = [
  "// Framer Motion spring presets",
  "export const itemVariants = {",
  "  hidden: { y: 24, opacity: 0 },",
  "  visible: {",
  "    y: 0,",
  "    opacity: 1,",
  "    transition: {",
  "      type: 'spring',",
  "      stiffness: 85,",
  "      damping: 16",
  "    }",
  "  }",
  "};"
];

const DB_CODE_SNIPPET = [
  "// User Database Model",
  "const db = await mongoose.connect(URI);",
  "const Schema = mongoose.Schema;",
  "const ClientSchema = new Schema({",
  "  domain: { type: String, required: true },",
  "  apiKey: { type: String, unique: true },",
  "  status: { type: String, default: 'active' }",
  "});",
  "export const Client = model('Client', ClientSchema);"
];

const SERVICE_MESH_SNIPPET = [
  "# Gateway Route Orchestrator",
  "class MeshGateway:",
  "    def __init__(self, routes):",
  "        self.routes = routes",
  "        self.healthy_nodes = []",
  "    async def forward(self, req, dest):",
  "        node = self.select_node(dest)",
  "        return await node.dispatch(req)"
];


export default function Hero() {
  const headlinePart1 = Array.from("Design that thinks.");
  const headlinePart2 = Array.from("Code that scales.");

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 3D parallax tilt springs for the headline typography
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 90, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 90, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xVal = (e.clientX - rect.left) / rect.width - 0.5;
    const yVal = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xVal);
    mouseY.set(yVal);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03, // tight stagger for individual letters
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 24, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 85,
        damping: 16,
      },
    },
  };

  const letterVariants = {
    hidden: { y: "110%", opacity: 0 },
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

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden bg-[var(--background)]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background static motherboard texture at ultra-low opacity */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.08] pointer-events-none select-none z-0"
        style={{ backgroundImage: "url('/hero-bg.png')" }}
      />

      {/* React Three Fiber 3D Scene (particles, 3D terminals, wireframe boxes, camera paths) */}
      <Hero3DScene />

      {/* Radial overlay to enhance text readability, adapting to active background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_15%,var(--background)_80%)] pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(var(--background-rgb),0.25)] to-[var(--background)] pointer-events-none z-[1]" />

      {/* Main Content Area */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="max-w-7xl mx-auto px-6 md:px-12 z-10 flex flex-col items-center text-center relative pointer-events-auto"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Top Info Badge */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-violet-500/15 text-violet-300 text-xs font-mono tracking-widest uppercase mb-8"
          >
            <Sparkles size={13} className="text-cyan-400 animate-pulse" />
            <span>Kyro Studio</span>
          </motion.div>

          {/* Centered Headline with Letter-by-Letter Reveal */}
          <h1 className="text-4xl sm:text-6xl md:text-8.5xl font-bold tracking-tight text-[var(--foreground)] max-w-5xl leading-[1.08] flex flex-col items-center select-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
            {/* Line 1 */}
            <span className="flex flex-wrap justify-center overflow-hidden py-1">
              {headlinePart1.map((char, idx) => (
                <span key={idx} className="inline-flex overflow-hidden py-1">
                  <motion.span
                    variants={letterVariants}
                    className="inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                </span>
              ))}
            </span>
            {/* Line 2 */}
            <span className="flex flex-wrap justify-center overflow-hidden py-1 text-animate-gradient">
              {headlinePart2.map((char, idx) => (
                <span key={idx} className="inline-flex overflow-hidden py-1">
                  <motion.span
                    variants={letterVariants}
                    className="inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                </span>
              ))}
            </span>
          </h1>

          {/* Subheadline & description */}
          <motion.div
            variants={itemVariants}
            className="mt-8 max-w-3xl flex flex-col items-center gap-4"
          >
            <h2 className="text-sm md:text-base font-bold font-mono tracking-widest text-[var(--secondary)] uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              Thoughtful design. Scalable code.
            </h2>
            <p className="text-[var(--muted-text)] text-base md:text-xl font-light leading-relaxed max-w-2xl drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              Crafting modern web experiences that are fast, intuitive, and built to grow.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-12 flex flex-col sm:flex-row gap-5 items-center"
          >
            <Magnetic>
              <button
                onClick={() => handleScrollTo("projects")}
                className="px-8 py-4 rounded-full bg-slate-900 text-white dark:bg-white dark:text-black font-semibold text-xs tracking-widest uppercase shadow-xl hover:bg-slate-800 dark:hover:bg-violet-100 hover:shadow-violet-500/10 transition-all duration-300 flex items-center gap-2.5 cursor-pointer"
              >
                <span>View Projects</span>
                <ArrowRight size={14} />
              </button>
            </Magnetic>

            <Magnetic>
              <button
                onClick={() => handleScrollTo("contact")}
                className="px-8 py-4 rounded-full border border-[var(--border)] dark:border-white/10 text-[var(--foreground)] dark:text-white font-semibold text-xs tracking-widest uppercase hover:bg-slate-100 dark:hover:bg-white/5 transition-all duration-300 cursor-pointer"
              >
                Contact Us
              </button>
            </Magnetic>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer flex flex-col items-center gap-2.5 z-10 select-none"
        onClick={() => handleScrollTo("about")}
      >
        <span className="text-[9px] font-mono tracking-widest text-[var(--muted-text)] uppercase">
          SCROLL TO EXPLORE
        </span>
        <div className="w-[22px] h-[36px] rounded-full border border-[var(--border)] flex justify-center p-[4px]">
          <motion.div
            animate={{
              y: [0, 14, 0],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-[5px] h-[5px] rounded-full bg-violet-400"
          />
        </div>
      </motion.div>
    </section>
  );
}


