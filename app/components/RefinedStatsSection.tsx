'use client';

import { useEffect, useRef, useState } from 'react';
import { getHomepageContent } from '@/lib/content';

export default function RefinedStatsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const content = getHomepageContent().success_metrics_section;

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
    <div ref={containerRef} className="relative min-h-screen bg-gradient-to-b from-warm-white via-white to-warm-white py-32 px-4 md:px-6 lg:px-8">
      {/* Section Label */}
      <div className="absolute top-4 right-4 z-50 bg-purple-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg">
        S2-Stats
      </div>
      <div className="max-w-7xl mx-auto">
        <div 
          className="text-center mb-24 transition-all duration-1000"
          style={{
            opacity: scrollProgress,
            transform: `translateY(${(1 - scrollProgress) * 30}px)`
          }}
        >
          <span className="text-masters-green text-sm uppercase tracking-[0.3em] font-light mb-6 block">
            Proven Results
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-soft-black leading-tight tracking-tight">
            {content.header}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {content.stats.map((stat, index) => {
            const itemProgress = Math.max(0, Math.min(1, (scrollProgress - index * 0.08) * 2));
            
            return (
              <div
                key={index}
                className="text-center group"
                style={{
                  opacity: itemProgress,
                  transform: `translateY(${(1 - itemProgress) * 60}px)`,
                  transitionDelay: `${index * 100}ms`
                }}
              >
                <div className="relative">
                  {/* Decorative element */}
                  <div 
                    className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-[2px] bg-gradient-to-r from-transparent via-masters-green to-transparent transition-all duration-700 group-hover:w-24"
                    style={{
                      opacity: itemProgress
                    }}
                  />
                  
                  <div className="pt-8 pb-6">
                    <div 
                      className="text-6xl md:text-7xl lg:text-8xl font-light text-masters-green mb-6 tracking-tight"
                      style={{
                        transform: `scale(${0.7 + itemProgress * 0.3})`,
                        transition: 'transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
                      }}
                    >
                      {stat.metric}
                    </div>
                    <p className="text-lg md:text-xl text-text-secondary leading-relaxed font-light max-w-xs mx-auto">
                      {stat.description}
                    </p>
                  </div>

                  {/* Bottom border */}
                  <div 
                    className="absolute -bottom-4 left-1/2 -translate-x-1/2 h-16 w-[1px] bg-gradient-to-b from-masters-green/20 to-transparent"
                    style={{
                      opacity: itemProgress * 0.5
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


