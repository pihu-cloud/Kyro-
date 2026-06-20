"use client";

import React, { useRef, useState, MouseEvent } from "react";
import { motion, useSpring, useTransform, useReducedMotion } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function TiltCard({ children, className = "" }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Mouse positions inside element
  const x = useSpring(0, { stiffness: 300, damping: 30 });
  const y = useSpring(0, { stiffness: 300, damping: 30 });

  // Map mouse positions to 3D rotation angles
  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);

  // Specular light glow coordinates
  const glowX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current || prefersReducedMotion) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Normalised position: ranges from -0.5 to 0.5
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;

    x.set(relativeX);
    y.set(relativeY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
      }}
      className={`relative transition-all duration-200 ease-out ${className}`}
    >
      <div 
        style={{ transform: "translateZ(10px)", transformStyle: "preserve-3d" }}
        className="w-full h-full"
      >
        {children}
      </div>

      {/* Gloss reflection overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-[inherit] z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) =>
              `radial-gradient(circle 250px at ${gx} ${gy}, rgba(255, 255, 255, 0.08), transparent 80%)`
          ),
        }}
      />
    </motion.div>
  );
}
