"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Layout, Server, Cpu, Database, Cloud, Brain } from "lucide-react";
import TiltCard from "../ui/TiltCard";

const services = [
  {
    icon: <Layout size={28} className="text-cyan-400" />,
    title: "Frontend Architecture",
    description: "Building responsive, component-driven client applications. Writing highly optimized, modern React, Next.js, and clean Tailwind CSS.",
    tech: ["Next.js", "React", "TypeScript", "TailwindCSS"],
  },
  {
    icon: <Server size={28} className="text-violet-400" />,
    title: "Backend Engineering",
    description: "Engineering robust, scalable server side systems. Constructing clean REST/GraphQL APIs, web sockets, serverless handlers, and backend logic.",
    tech: ["Node.js", "Express.js", "Socket.io", "Firebase"],
  },
  {
    icon: <Cpu size={28} className="text-fuchsia-400" />,
    title: "API Design & Security",
    description: "Building highly documented, clean, fast APIs. Integrating NextAuth credentials provider, JWT protocols, and real-time systems like Stream API.",
    tech: ["NextAuth", "JWT Auth", "OAuth2.0", "Stream API"],
  },
  {
    icon: <Database size={28} className="text-pink-400" />,
    title: "Database Optimization",
    description: "Architecting relational & non-relational database structures. Data aggregation, indexes optimizations, scaling, and ORMs bindings.",
    tech: ["MongoDB", "PostgreSQL", "Mongoose", "Prisma"],
  },
  {
    icon: <Cloud size={28} className="text-blue-400" />,
    title: "Cloud Systems & CI/CD",
    description: "Deploying production-ready applications with continuous integration. Configuring domains, SSL certifications, and cloud container bindings.",
    tech: ["Vercel", "Railway", "Render", "Docker"],
  },
  {
    icon: <Brain size={28} className="text-emerald-400" />,
    title: "Machine Learning Web Integration",
    description: "Developing Flask/Python web backends to serve Deep Learning model predictions with real-time confidence scores and custom interfaces.",
    tech: ["Python", "Flask", "TensorFlow", "OpenCV"],
  },
];

export default function Services() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  // Scattered initial state for Awwwards-style assembly
  const cardVariants = {
    hidden: (index: number) => {
      const xOffsets = [-50, 40, -60, 60, -40, 50];
      const yOffsets = [60, -50, 40, -40, 50, -60];
      const rotations = [-6, 5, -8, 8, -5, 6];
      return {
        x: xOffsets[index % xOffsets.length],
        y: yOffsets[index % yOffsets.length],
        rotate: rotations[index % rotations.length],
        opacity: 0,
        scale: 0.85
      };
    },
    visible: {
      x: 0,
      y: 0,
      rotate: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 65,
        damping: 14,
        mass: 0.8,
      },
    },
  };

  return (
    <section
      id="services"
      className="relative py-24 md:py-32 bg-[var(--background)] grid-bg overflow-hidden border-t border-[var(--border)]"
    >
      {/* Glow highlight */}
      <div className="glow-spot w-[350px] h-[350px] bg-cyan-600/10 top-10 right-10" />
      <div className="glow-spot w-[350px] h-[350px] bg-violet-600/10 bottom-10 left-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 z-10 relative">
        {/* Section Header */}
        <div className="text-center md:text-left mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <span className="text-xs font-mono tracking-widest text-violet-400 uppercase">
              CAPABILITIES & SERVICES
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--foreground)] mt-2">
              Our Core Services
            </h2>
          </div>
          <p className="text-[var(--muted-text)] max-w-md font-light text-left md:text-right">
            Full-spectrum software creation. We design, program, test, deploy, and maintain software platforms to accelerate business velocity.
          </p>
        </div>

        {/* Services Grid with Scattered Assembly and Tilt Card wrappers */}
        <motion.div
          ref={sectionRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              custom={index}
              variants={cardVariants}
              className="h-[300px]"
            >
              <TiltCard className="h-full group">
                <div className="gradient-border-card p-8 rounded-2xl flex flex-col justify-between h-full">
                  <div>
                    <div className="p-3 bg-[var(--border)] w-fit rounded-xl mb-6 group-hover:scale-110 group-hover:bg-[var(--border-hover)] transition-all duration-300">
                      {service.icon}
                    </div>
                    <h3 className="text-lg font-bold text-[var(--foreground)] mb-3 group-hover:text-[var(--primary)] transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-[var(--muted-text)] text-xs font-light leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Technologies Badges */}
                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-[var(--border)]">
                    {service.tech.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-mono px-2 py-0.5 rounded bg-[var(--border)]/50 text-[var(--muted-text)] border border-[var(--border)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

