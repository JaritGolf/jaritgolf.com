'use client';

import { useEffect, useRef, useState } from 'react';
import { getHomepageContent } from '@/lib/content';

export default function StatsReveal() {
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
    <div ref={containerRef} className="min-h-screen bg-white py-32 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div 
          className="text-center mb-20 transition-all duration-1000"
          style={{
            opacity: scrollProgress,
            transform: `translateY(${(1 - scrollProgress) * 50}px)`
          }}
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black leading-tight">
            {content.header}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {content.stats.map((stat, index) => {
            const itemProgress = Math.max(0, Math.min(1, (scrollProgress - index * 0.1) * 2));
            
            return (
              <div
                key={index}
                className="text-center border-4 border-black p-12 hover:border-masters-green transition-all duration-500"
                style={{
                  opacity: itemProgress,
                  transform: `translateY(${(1 - itemProgress) * 100}px)`,
                  transitionDelay: `${index * 100}ms`
                }}
              >
                <div className="mb-6">
                  <div 
                    className="text-6xl md:text-7xl lg:text-8xl font-bold text-masters-green mb-4"
                    style={{
                      transform: `scale(${0.5 + itemProgress * 0.5})`,
                      transition: 'transform 1s ease-out'
                    }}
                  >
                    {stat.metric}
                  </div>
                  <p className="text-xl md:text-2xl text-black/70 leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


