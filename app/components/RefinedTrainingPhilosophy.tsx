'use client';

import { useEffect, useRef, useState } from 'react';
import { getHomepageContent } from '@/lib/content';

export default function RefinedTrainingPhilosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const content = getHomepageContent().training_philosophy_section;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, 
        (window.innerHeight - rect.top) / window.innerHeight
      ));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-gradient-to-b from-white via-neutral-50 to-white py-32 px-4 md:px-6 lg:px-8">
      {/* Section Label */}
      <div className="absolute top-4 right-4 z-50 bg-purple-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg">
        S2-Training
      </div>
      <div className="max-w-7xl mx-auto">
        <div 
          className="text-center mb-24 transition-all duration-1000 max-w-3xl mx-auto"
          style={{
            opacity: scrollProgress,
            transform: `translateY(${(1 - scrollProgress) * 30}px)`
          }}
        >
          <span className="text-masters-green text-sm uppercase tracking-[0.3em] font-light mb-6 block">
            Philosophy
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-soft-black leading-tight tracking-tight">
            {content.header}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {content.philosophies.map((philosophy, index) => {
            const itemProgress = Math.max(0, Math.min(1, (scrollProgress - index * 0.1) * 2));
            
            return (
              <div
                key={index}
                className="group relative"
                style={{
                  opacity: itemProgress,
                  transform: `translateY(${(1 - itemProgress) * 50}px)`,
                  transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  transitionDelay: `${index * 100}ms`
                }}
              >
                {/* Number badge */}
                <div className="mb-8">
                  <span className="text-7xl md:text-8xl font-light text-masters-green/20 group-hover:text-masters-green/40 transition-colors duration-700">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-6">
                  <div className="w-12 h-[1px] bg-masters-green transition-all duration-500 group-hover:w-20" />
                  
                  <h3 className="text-2xl md:text-3xl font-light text-soft-black leading-tight tracking-tight group-hover:text-masters-green transition-colors duration-500">
                    {philosophy.title}
                  </h3>
                  
                  <p className="text-lg text-text-secondary leading-relaxed font-light">
                    {philosophy.content}
                  </p>
                </div>

                {/* Decorative element */}
                <div 
                  className="absolute -bottom-6 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-masters-green/20 to-transparent group-hover:via-masters-green/40 transition-all duration-700"
                  style={{
                    opacity: itemProgress * 0.5
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


