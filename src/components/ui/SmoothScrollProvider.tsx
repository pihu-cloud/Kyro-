"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential easing
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    // Update ScrollTrigger on scroll
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    // Connect GSAP ticker to Lenis raf
    const gsapTickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(gsapTickerCallback);

    // Hook ScrollTrigger's refresh to Lenis's resize
    const handleRefresh = () => {
      lenis.resize();
    };
    ScrollTrigger.addEventListener("refresh", handleRefresh);
    
    // Initial refresh
    ScrollTrigger.refresh();

    // Clean up
    return () => {
      gsap.ticker.remove(gsapTickerCallback);
      ScrollTrigger.removeEventListener("refresh", handleRefresh);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
