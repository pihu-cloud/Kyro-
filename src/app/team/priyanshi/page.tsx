"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ArrowLeft, Github, Mail, MapPin, Calendar, Award, BookOpen, Briefcase, 
  Terminal, ExternalLink, Download, FileText, Sparkles
} from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";

export default function PriyanshiProfile() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 85,
        damping: 15,
      },
    },
  };

  const skillGroups = [
    {
      title: "Core Stack",
      skills: ["MongoDB", "Express.js", "React.js", "Node.js (MERN)"],
      color: "from-cyan-500 to-blue-500",
    },
    {
      title: "Frontend Architecture",
      skills: ["HTML5 / CSS3", "Responsive Design", "React Hooks", "REST API Integration"],
      color: "from-violet-500 to-fuchsia-500",
    },
    {
      title: "Backend & Database",
      skills: ["RESTful APIs", "JWT Auth", "Socket.io", "Firebase", "Mongoose ODM"],
      color: "from-purple-500 to-indigo-500",
    },
    {
      title: "Languages & Tools",
      skills: ["JavaScript (ES6+)", "C++", "Java", "Python", "SQL", "Git & GitHub", "Postman", "VS Code"],
      color: "from-emerald-500 to-teal-500",
    },
  ];

  const experience = [
    {
      role: "MERN Stack Developer Intern",
      company: "Zeetron Networks Pvt. Ltd.",
      period: "Jun 2025 – Jul 2025",
      bullets: [
        "Built and deployed full-stack MERN applications, integrating real-time features with Socket.io and Firebase.",
        "Collaborated on production-level projects following agile workflows and structured code review practices.",
      ],
    },
    {
      role: "MERN Stack Developer Intern",
      company: "College Dekho Pvt. Ltd.",
      period: "Jul 2024 – Aug 2024",
      bullets: [
        "Developed the responsive Shapel website and contributed to MERN stack projects in a professional environment.",
      ],
    },
  ];

  const hackathons = [
    {
      title: "Smart India Hackathon 2024",
      level: "National Winner / Finalist",
      date: "Feb 2024",
      desc: "Built a Disaster Management System — full-stack, real-time, delivered within a high-pressure 36-hr sprint.",
    },
    {
      title: "Hack This Fall 2024",
      level: "Open Innovation Competitor",
      date: "Nov 2024",
      desc: "Built a live news portal integrating real-time API feeds; competed nationally.",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]/90 pt-28 pb-20 grid-bg relative">
      {/* Background glow elements */}
      <div className="glow-spot w-[400px] h-[400px] bg-violet-600/10 top-[-10%] left-[-10%]" />
      <div className="glow-spot w-[400px] h-[400px] bg-cyan-600/10 bottom-[10%] right-[-10%]" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Floating Back to Home button */}
        <div className="mb-12">
          <Link href="/">
            <span className="inline-flex items-center gap-2 text-xs font-mono text-[var(--muted-text)] hover:text-[var(--foreground)] transition-colors duration-200 group cursor-pointer">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span>BACK TO STUDIO</span>
            </span>
          </Link>
        </div>

        {/* Profile Intro Header */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-12 gap-8 items-start mb-16"
        >
          {/* Left Column (Main Info) */}
          <div className="md:col-span-8 space-y-6">
            <motion.div variants={itemVariants} className="space-y-2">
              <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase flex items-center gap-2">
                <Sparkles size={12} />
                <span>MERN STACK DEVELOPER</span>
              </span>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[var(--foreground)]">
                Priyanshi Agarwal
              </h1>
              <p className="text-lg md:text-xl text-[var(--muted-text)] font-light">
                Crafting robust web architectures and seamless, component-driven client applications.
              </p>
            </motion.div>

            {/* Links and location */}
            <motion.div 
              variants={itemVariants} 
              className="flex flex-wrap gap-4 text-xs font-mono text-[var(--muted-text)]"
            >
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[var(--card)] border border-[var(--border)]">
                <MapPin size={12} className="text-cyan-400" />
                <span>Jodhpur, Rajasthan</span>
              </div>
              <a 
                href="mailto:priyanshiagarwal233@gmail.com"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[var(--card)] border border-[var(--border)] hover:border-violet-500/50 hover:text-[var(--foreground)] transition-all"
              >
                <Mail size={12} className="text-violet-400" />
                <span>priyanshiagarwal233@gmail.com</span>
              </a>
              <a 
                href="https://github.com/pihu-cloud"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[var(--card)] border border-[var(--border)] hover:border-fuchsia-500/50 hover:text-[var(--foreground)] transition-all"
              >
                <Github size={12} className="text-fuchsia-400" />
                <span>github.com/pihu-cloud</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column (CTAs) */}
          <motion.div 
            variants={itemVariants} 
            className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-4 md:items-end justify-end h-full"
          >
            <Magnetic>
              <a
                href="mailto:priyanshiagarwal233@gmail.com"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold font-mono text-xs tracking-widest uppercase transition-all duration-300 shadow-lg shadow-violet-500/10 flex items-center justify-center gap-2"
              >
                <Mail size={14} />
                <span>HIRE PRIYANSHI</span>
              </a>
            </Magnetic>
            <Magnetic>
              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-[var(--border)] hover:border-[var(--border-hover)] text-[var(--foreground)] font-bold font-mono text-xs tracking-widest uppercase hover:bg-[var(--card-hover)] transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Download size={14} />
                <span>DOWNLOAD RESUME</span>
              </button>
            </Magnetic>
          </motion.div>
        </motion.div>

        {/* Professional Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-panel p-8 rounded-3xl mb-12 border border-[var(--border)]"
        >
          <h2 className="text-sm font-bold font-mono tracking-widest text-violet-400 uppercase mb-4 flex items-center gap-2">
            <FileText size={16} />
            <span>PROFESSIONAL SUMMARY</span>
          </h2>
          <p className="text-[var(--foreground)] text-sm md:text-base font-light leading-relaxed">
            MERN Stack Developer with 2 production internships, a deployed real-time application, and 2 national hackathon appearances. Competent in building full-stack web architectures using MongoDB, Express.js, React, and Node.js. Experienced in REST API design, JWT authentication, real-time features, and responsive UI development. Eager to contribute to a fast-paced team and deliver scalable, production-ready solutions.
          </p>
        </motion.div>

        {/* Skills grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {skillGroups.map((group, idx) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.05 }}
              className="glass-panel p-6 rounded-2xl border border-[var(--border)] flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xs font-bold font-mono tracking-widest text-[var(--muted-text)] uppercase mb-4">
                  {group.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span 
                      key={skill}
                      className="text-xs font-mono px-3 py-1 rounded-lg bg-[var(--border)]/50 border border-[var(--border)] text-[var(--foreground)] hover:border-violet-500/40 transition-all duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Work Experience */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-6 mb-12"
        >
          <h2 className="text-sm font-bold font-mono tracking-widest text-violet-400 uppercase flex items-center gap-2 pl-2">
            <Briefcase size={16} />
            <span>WORK EXPERIENCE</span>
          </h2>

          <div className="relative pl-6 border-l border-[var(--border)] space-y-8 ml-2">
            {experience.map((job) => (
              <div key={job.company} className="relative group">
                {/* timeline node */}
                <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[var(--background)] border border-[var(--border)] flex items-center justify-center group-hover:border-violet-500 transition-colors">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--muted-text)] group-hover:bg-violet-400 transition-colors" />
                </div>

                <div className="glass-panel p-6 rounded-2xl border border-[var(--border)] group-hover:border-[var(--border-hover)] transition-all">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-[var(--foreground)] group-hover:text-violet-300 transition-colors">
                        {job.role}
                      </h3>
                      <p className="text-cyan-400 text-xs font-mono tracking-wider mt-0.5">
                        {job.company}
                      </p>
                    </div>
                    <span className="text-xs font-mono text-[var(--muted-text)] flex items-center gap-1 bg-[var(--border)]/50 px-2.5 py-1 rounded">
                      <Calendar size={12} />
                      <span>{job.period}</span>
                    </span>
                  </div>

                  <ul className="space-y-2 text-xs text-gray-400 font-light leading-relaxed list-disc pl-4">
                    {job.bullets.map((bullet, index) => (
                      <li key={index}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Hackathons & Certification */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Hackathons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-sm font-bold font-mono tracking-widest text-violet-400 uppercase flex items-center gap-2 pl-2">
              <Award size={16} />
              <span>HACKATHONS</span>
            </h2>

            <div className="space-y-4">
              {hackathons.map((hack) => (
                <div key={hack.title} className="glass-panel p-6 rounded-2xl border border-[var(--border)]">
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <h3 className="text-sm font-bold text-[var(--foreground)]">{hack.title}</h3>
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded uppercase font-bold shrink-0">
                      {hack.date}
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-[var(--muted-text)] mb-2">{hack.level}</p>
                  <p className="text-xs text-[var(--muted-text)] font-light leading-relaxed">{hack.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Education & Certs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-6"
          >
            <h2 className="text-sm font-bold font-mono tracking-widest text-violet-400 uppercase flex items-center gap-2 pl-2">
              <BookOpen size={16} />
              <span>EDUCATION & CERTIFICATIONS</span>
            </h2>

            <div className="space-y-4">
              {/* College */}
              <div className="glass-panel p-6 rounded-2xl border border-[var(--border)]">
                <div className="flex justify-between items-start gap-4 mb-2">
                  <h3 className="text-sm font-bold text-[var(--foreground)]">B.Tech – AI & Data Science</h3>
                  <span className="text-[9px] text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded font-bold shrink-0">
                    CGPA: 8.0/10
                  </span>
                </div>
                <p className="text-xs text-cyan-400 font-mono">Poornima Institute of Engineering & Technology</p>
                <p className="text-[11px] text-[var(--muted-text)] font-mono mt-1">2023 – 2027 (ongoing)</p>
              </div>

              {/* NPTEL Elite */}
              <div className="glass-panel p-6 rounded-2xl border border-[var(--border)]">
                <div className="flex justify-between items-start gap-4 mb-2">
                  <h3 className="text-sm font-bold text-[var(--foreground)]">NPTEL Elite Certification</h3>
                  <span className="text-[9px] text-violet-400 bg-violet-400/10 px-2 py-0.5 rounded font-bold shrink-0">
                    Score: 62%
                  </span>
                </div>
                <p className="text-xs text-[var(--muted-text)]">Entrepreneurship & IP Strategy (IIT Kharagpur)</p>
                <p className="text-[11px] text-[var(--muted-text)] font-mono mt-1">Jul – Sep 2025 | 8-week proctored</p>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
