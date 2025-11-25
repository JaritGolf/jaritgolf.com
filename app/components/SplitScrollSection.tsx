'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { getHomepageContent } from '@/lib/content';

export default function SplitScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const content = getHomepageContent().problem_section;
  
  if (!content) {
    return null; // Component not used in current homepage
  }

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, 
        (window.innerHeight * 0.5 - rect.top) / (rect.height - window.innerHeight * 0.5)
      ));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-black py-32 relative overflow-hidden">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          transform: `translateY(${scrollProgress * 100}px)`
        }}
      >
        <Image
          src="/images/overhead.jpeg"
          alt="Background"
          fill
          className="object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div 
          className="text-center mb-20"
          style={{
            opacity: Math.max(0, 1 - scrollProgress * 2),
            transform: `scale(${Math.max(0.8, 1 - scrollProgress * 0.3)})`
          }}
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            {content.header}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.cards.map((card, index) => {
            const itemDelay = index * 0.2;
            const itemProgress = Math.max(0, Math.min(1, (scrollProgress - itemDelay) * 2));
            
            return (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border-2 border-white/20 p-8 hover:border-masters-green transition-all duration-500"
                style={{
                  opacity: itemProgress,
                  transform: `translateX(${(1 - itemProgress) * (index % 2 === 0 ? -100 : 100)}px)`,
                }}
              >
                <div className="text-6xl font-bold text-masters-green mb-4">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {card.title}
                </h3>
                <p className="text-lg text-white/70 leading-relaxed">
                  {card.content}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


