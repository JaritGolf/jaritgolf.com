'use client';

import { useEffect, useRef } from 'react';

export default function ScrollDamping() {
  const targetScroll = useRef(0);
  const currentScroll = useRef(0);
  const rafId = useRef<number>();

  useEffect(() => {
    // Initialize current scroll position
    currentScroll.current = window.scrollY;
    targetScroll.current = window.scrollY;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      // Add the scroll delta to target position
      targetScroll.current += e.deltaY * 0.65; // 0.65 damping factor

      // Clamp target to valid scroll range
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      targetScroll.current = Math.max(0, Math.min(maxScroll, targetScroll.current));
    };

    // Smooth animation loop
    const animate = () => {
      // Lerp (linear interpolation) for smooth scrolling
      const ease = 0.1; // Lower = smoother but slower, higher = faster but less smooth
      currentScroll.current += (targetScroll.current - currentScroll.current) * ease;

      // Apply the smoothed scroll position
      window.scrollTo(0, currentScroll.current);

      rafId.current = requestAnimationFrame(animate);
    };

    // Add wheel event listener with passive: false to allow preventDefault
    window.addEventListener('wheel', handleWheel, { passive: false });
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return null;
}

