"use client";

import { useRef, useState, ReactElement, cloneElement, MouseEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface MagneticProps {
  children: ReactElement;
  range?: number; // Distance at which attraction begins
  strength?: number; // How strong the pull is (higher = more pull)
}

export default function Magnetic({ children, range = 35, strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current || prefersReducedMotion) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Calculate distance from center of target element
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < range) {
      // Pull element toward cursor
      setPosition({ 
        x: distanceX * strength, 
        y: distanceY * strength 
      });
    } else {
      // Return to original position
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  if (prefersReducedMotion) {
    return children;
  }

  const { x, y } = position;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
