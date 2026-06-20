"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<"default" | "hover" | "view" | "drag">("default");
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const prefersReducedMotion = useReducedMotion();

  // Spring settings for smooth lag effect
  const springConfig = { damping: 30, stiffness: 250, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Custom cursor only for desktop/pointer devices
    if (typeof window === "undefined" || window.matchMedia("(max-width: 1024px)").matches) {
      return;
    }

    if (prefersReducedMotion) {
      return;
    }

    // Hide default cursor
    document.body.classList.add("custom-cursor-active");

    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 16);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Add event listeners
    window.addEventListener("mousemove", moveMouse);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Dynamic hover targets listener
    const addHoverListeners = () => {
      const hoverables = document.querySelectorAll(
        'a, button, [role="button"], input, select, textarea, [data-hover-cursor]'
      );
      
      const viewables = document.querySelectorAll('[data-cursor-view]');
      const dragables = document.querySelectorAll('[data-cursor-drag]');

      hoverables.forEach((el) => {
        el.addEventListener("mouseenter", () => setCursorType("hover"));
        el.addEventListener("mouseleave", () => setCursorType("default"));
      });

      viewables.forEach((el) => {
        el.addEventListener("mouseenter", () => setCursorType("view"));
        el.addEventListener("mouseleave", () => setCursorType("default"));
      });

      dragables.forEach((el) => {
        el.addEventListener("mouseenter", () => setCursorType("drag"));
        el.addEventListener("mouseleave", () => setCursorType("default"));
      });
    };

    // Initial attachment
    addHoverListeners();

    // Use MutationObserver to dynamically attach to new elements (if any load later)
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", moveMouse);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      observer.disconnect();
    };
  }, [mouseX, mouseY, isVisible, prefersReducedMotion]);

  if (prefersReducedMotion || typeof window !== "undefined" && window.matchMedia("(max-width: 1024px)").matches) {
    return null;
  }

  const variants = {
    default: {
      width: 32,
      height: 32,
      backgroundColor: "rgba(139, 92, 246, 0.05)",
      borderColor: "rgba(139, 92, 246, 0.4)",
    },
    hover: {
      width: 50,
      height: 50,
      backgroundColor: "rgba(6, 182, 212, 0.1)",
      borderColor: "rgba(6, 182, 212, 0.8)",
    },
    view: {
      width: 70,
      height: 70,
      backgroundColor: "rgba(217, 70, 239, 0.15)",
      borderColor: "rgba(217, 70, 239, 0.8)",
    },
    drag: {
      width: 70,
      height: 70,
      backgroundColor: "rgba(6, 182, 212, 0.15)",
      borderColor: "rgba(6, 182, 212, 0.8)",
    }
  };

  return (
    <>
      {isVisible && (
        <motion.div
          className="fixed top-0 left-0 rounded-full border border-solid pointer-events-none z-[9999] flex items-center justify-center text-[10px] font-bold tracking-widest text-white uppercase mix-blend-screen"
          style={{
            x: cursorX,
            y: cursorY,
          }}
          animate={cursorType}
          variants={variants}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
        >
          {cursorType === "view" && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-pink-400 font-medium"
            >
              View
            </motion.span>
          )}
          {cursorType === "drag" && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-cyan-400 font-medium"
            >
              Drag
            </motion.span>
          )}
        </motion.div>
      )}
    </>
  );
}
