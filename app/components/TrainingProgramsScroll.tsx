'use client';

import { useEffect, useRef, useState } from 'react';
import { getProductPageContent } from '@/lib/content';

export default function TrainingProgramsScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const content = getProductPageContent().training_programs_section;

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
          className="text-center mb-20"
          style={{
            opacity: scrollProgress,
            transform: `translateY(${(1 - scrollProgress) * 50}px)`,
          }}
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black leading-tight">
            {content.header}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.programs.map((program, index) => {
            const itemDelay = index * 0.15;
            const itemProgress = Math.max(0, Math.min(1, (scrollProgress - itemDelay) * 2));
            const shouldExpand = scrollProgress > 0.5 + index * 0.1;
            
            return (
              <div
                key={index}
                className="border-4 border-black hover:border-masters-green transition-all duration-500 overflow-hidden group"
                style={{
                  opacity: itemProgress,
                  transform: `translateY(${(1 - itemProgress) * 100}px) rotateX(${(1 - itemProgress) * 15}deg)`,
                  transformStyle: 'preserve-3d',
                }}
              >
                <div className="p-8 md:p-10">
                  {/* Number Badge */}
                  <div className="inline-block px-4 py-2 bg-black text-white text-sm font-bold mb-6 group-hover:bg-masters-green transition-colors">
                    PROGRAM {index + 1}
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-bold text-black mb-6 group-hover:text-masters-green transition-colors">
                    {program.title}
                  </h3>
                  
                  <div 
                    className="transition-all duration-700 overflow-hidden"
                    style={{
                      maxHeight: shouldExpand ? '500px' : '150px',
                    }}
                  >
                    <p className="text-lg md:text-xl text-black/70 leading-relaxed mb-6">
                      {program.description}
                    </p>
                    
                    {shouldExpand && (
                      <div className="pt-6 border-t-2 border-black/10">
                        <button className="w-full px-6 py-4 bg-black text-white hover:bg-masters-green transition-all duration-300 text-lg font-medium hover:scale-105">
                          Start This Program →
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Decorative line */}
                <div 
                  className="h-2 bg-masters-green transition-all duration-700"
                  style={{
                    transform: `scaleX(${shouldExpand ? 1 : 0})`,
                    transformOrigin: 'left',
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


