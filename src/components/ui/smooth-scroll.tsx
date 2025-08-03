"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

interface SmoothScrollProps {
  children: React.ReactNode;
  className?: string;
}

export function SmoothScroll({ children, className }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Light easing
      infinite: false,
      orientation: "vertical", // Only allow vertical scrolling
      gestureOrientation: "vertical", // Only respond to vertical gestures
    });

    // Make Lenis globally available
    (window as any).lenis = lenisRef.current;

    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenisRef.current?.destroy();
      delete (window as any).lenis;
    };
  }, []);

  return (
    <div className={`overflow-x-hidden ${className || ""}`}>{children}</div>
  );
}
