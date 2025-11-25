'use client';

import { useEffect, useRef, useState } from 'react';

interface ScrollSectionProps {
  children: React.ReactNode;
  className?: string;
  parallax?: boolean;
  fadeIn?: boolean;
}

export default function ScrollSection({ 
  children, 
  className = '', 
  parallax = false,
  fadeIn = true 
}: ScrollSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!parallax) return;

    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrolled = window.scrollY;
        const rate = scrolled * 0.3;
        sectionRef.current.style.transform = `translateY(${rate}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [parallax]);

  return (
    <div
      ref={sectionRef}
      className={`${className} ${
        fadeIn && !isVisible ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
      } transition-all duration-1000 ease-out`}
    >
      {children}
    </div>
  );
}

