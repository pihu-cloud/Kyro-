"use client";

import { useState, useRef, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Check, Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";
import Magnetic from "../ui/Magnetic";

export default function Contact() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  
  const validateForm = () => {
    let valid = true;
    const newErrors = { name: "", email: "", message: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name.";
      valid = false;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email.";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please enter a message.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setFormState("submitting");

    // Simulate API request
    setTimeout(() => {
      setFormState("success");
      setFormData({ name: "", email: "", message: "" });
      
      // Reset back to idle after a few seconds
      setTimeout(() => {
        setFormState("idle");
      }, 5000);
    }, 1500);
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 bg-[var(--background)] grid-bg overflow-hidden border-t border-[var(--border)]"
    >
      {/* Decorative Glow spot */}
      <div className="glow-spot w-[400px] h-[400px] bg-cyan-600/10 bottom-0 left-[10%]" />
      <div className="glow-spot w-[350px] h-[350px] bg-violet-600/10 top-0 right-[10%]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 z-10 relative">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* Info Side (Left 5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-mono tracking-widest text-violet-400 uppercase">
                GET IN TOUCH
              </span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--foreground)] mt-2">
                Let's start
                <br />
                something great.
              </h2>
            </div>
            
            <p className="text-[var(--muted-text)] font-light text-sm leading-relaxed">
              Have an upcoming product concept, complex backend stack optimization, or a redesign idea? Send us a message and we'll reply within 24 hours.
            </p>

            {/* Social Links */}
            <div className="space-y-6 pt-4 border-t border-[var(--border)]">
              <h4 className="text-xs font-mono tracking-widest text-[var(--muted-text)] uppercase">
                CONTACT DETAILS & SOCIALS
              </h4>
              
              <div className="flex flex-col gap-4">
                {/* Email */}
                <a
                  href="mailto:hello@kyro.dev"
                  className="flex items-center justify-between p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--card-hover)] hover:border-violet-500/50 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[var(--border)] rounded-lg text-violet-400 group-hover:text-[var(--foreground)] transition-colors">
                      <Mail size={18} />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-[var(--muted-text)]/70 uppercase">Email Us</div>
                      <div className="text-sm font-bold text-[var(--foreground)] group-hover:text-violet-300 transition-colors">hello@kyro.dev</div>
                    </div>
                  </div>
                  <ArrowUpRight size={16} className="text-[var(--muted-text)] group-hover:text-[var(--foreground)] transition-colors" />
                </a>

                {/* Github */}
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--card-hover)] hover:border-cyan-500/50 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[var(--border)] rounded-lg text-cyan-400 group-hover:text-[var(--foreground)] transition-colors">
                      <Github size={18} />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-[var(--muted-text)]/70 uppercase">Explore Code</div>
                      <div className="text-sm font-bold text-[var(--foreground)] group-hover:text-cyan-300 transition-colors">github.com/kyro-studio</div>
                    </div>
                  </div>
                  <ArrowUpRight size={16} className="text-[var(--muted-text)] group-hover:text-[var(--foreground)] transition-colors" />
                </a>

                {/* Linkedin */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--card-hover)] hover:border-fuchsia-500/50 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[var(--border)] rounded-lg text-fuchsia-400 group-hover:text-[var(--foreground)] transition-colors">
                      <Linkedin size={18} />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-[var(--muted-text)]/70 uppercase">Connect</div>
                      <div className="text-sm font-bold text-[var(--foreground)] group-hover:text-fuchsia-300 transition-colors">linkedin.com/company/kyro-studio</div>
                    </div>
                  </div>
                  <ArrowUpRight size={16} className="text-[var(--muted-text)] group-hover:text-[var(--foreground)] transition-colors" />
                </a>
              </div>
            </div>
          </div>

          {/* Form Side (Right 7 cols) */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 md:p-10 rounded-3xl relative">
              <AnimatePresence mode="wait">
                {formState !== "success" ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Name input */}
                    <div className="flex flex-col gap-2 relative">
                      <label htmlFor="name" className="text-xs font-bold font-mono tracking-wider text-[var(--muted-text)] uppercase">
                        Your Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Priyanshi Agarwal"
                        disabled={formState === "submitting"}
                        className={`px-4 py-3 bg-[var(--card)] rounded-xl border font-sans text-[var(--foreground)] text-sm focus:outline-none transition-all duration-300 ${
                          errors.name 
                            ? "border-red-500/50 focus:border-red-500" 
                            : "border-[var(--border)] focus:border-violet-500 focus:bg-[var(--card-hover)] focus:ring-1 focus:ring-violet-500/25"
                        }`}
                      />
                      {errors.name && (
                        <span className="text-[10px] font-mono text-red-400 mt-1">{errors.name}</span>
                      )}
                    </div>

                    {/* Email input */}
                    <div className="flex flex-col gap-2 relative">
                      <label htmlFor="email" className="text-xs font-bold font-mono tracking-wider text-[var(--muted-text)] uppercase">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="priyanshi@example.com"
                        disabled={formState === "submitting"}
                        className={`px-4 py-3 bg-[var(--card)] rounded-xl border font-sans text-[var(--foreground)] text-sm focus:outline-none transition-all duration-300 ${
                          errors.email 
                            ? "border-red-500/50 focus:border-red-500" 
                            : "border-[var(--border)] focus:border-violet-500 focus:bg-[var(--card-hover)] focus:ring-1 focus:ring-violet-500/25"
                        }`}
                      />
                      {errors.email && (
                        <span className="text-[10px] font-mono text-red-400 mt-1">{errors.email}</span>
                      )}
                    </div>

                    {/* Message input */}
                    <div className="flex flex-col gap-2 relative">
                      <label htmlFor="message" className="text-xs font-bold font-mono tracking-wider text-[var(--muted-text)] uppercase">
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Describe your project, timeline, and goals..."
                        rows={5}
                        disabled={formState === "submitting"}
                        className={`px-4 py-3 bg-[var(--card)] rounded-xl border font-sans text-[var(--foreground)] text-sm focus:outline-none transition-all duration-300 resize-none ${
                          errors.message 
                            ? "border-red-500/50 focus:border-red-500" 
                            : "border-[var(--border)] focus:border-violet-500 focus:bg-[var(--card-hover)] focus:ring-1 focus:ring-violet-500/25"
                        }`}
                      />
                      {errors.message && (
                        <span className="text-[10px] font-mono text-red-400 mt-1">{errors.message}</span>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <Magnetic>
                        <button
                          type="submit"
                          disabled={formState === "submitting"}
                          className="w-full sm:w-auto px-8 py-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold font-mono text-xs tracking-widest uppercase shadow-lg shadow-violet-500/10 hover:shadow-violet-500/20 active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                        >
                          {formState === "submitting" ? (
                            <>
                              <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                              <span>TRANSMITTING...</span>
                            </>
                          ) : (
                            <>
                              <span>SEND MESSAGE</span>
                              <Send size={14} />
                            </>
                          )}
                        </button>
                      </Magnetic>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    className="flex flex-col items-center justify-center py-16 text-center space-y-6"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 120, damping: 14 }}
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center animate-bounce">
                      <Check size={32} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-[var(--foreground)]">Transmission Successful</h3>
                      <p className="text-[var(--muted-text)] text-xs font-light max-w-sm">
                        Thank you for reaching out! Your details have bypassed core servers and landed directly in our inbox. We will reach back shortly.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
