'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { getHomepageContent } from '@/lib/content';

const featureImages = [
  '/images/frontend.jpeg',
  '/images/side-closeup.jpeg',
  '/images/overhead.jpeg',
  '/images/ball-holder.jpeg',
  '/images/power-button.jpeg',
  '/images/charger-logo.jpeg',
];

export default function RefinedFeaturesGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const content = getHomepageContent().features_grid;

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
    <div ref={containerRef} className="relative min-h-screen bg-white py-32 px-4 md:px-6 lg:px-8">
      {/* Section Label */}
      <div className="absolute top-4 right-4 z-50 bg-purple-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg">
        S2-Features
      </div>
      <div className="max-w-7xl mx-auto">
        <div 
          className="text-center mb-20 transition-all duration-1000 max-w-4xl mx-auto"
          style={{
            opacity: scrollProgress,
            transform: `translateY(${(1 - scrollProgress) * 30}px)`
          }}
        >
          <span className="text-masters-green text-sm uppercase tracking-[0.3em] font-light mb-6 block">
            Features
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-soft-black leading-tight tracking-tight">
            {content.header}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {content.features.map((feature, index) => {
            const itemProgress = Math.max(0, Math.min(1, (scrollProgress - index * 0.05) * 2));
            
            return (
              <div
                key={index}
                className="group"
                style={{
                  opacity: itemProgress,
                  transform: `translateY(${(1 - itemProgress) * 40}px)`,
                  transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  transitionDelay: `${index * 80}ms`
                }}
              >
                <div className="relative overflow-hidden mb-6" style={{ borderRadius: '4px' }}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={featureImages[index]}
                      alt={feature.title}
                      fill
                      className="object-cover transition-all duration-1000 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>
                  
                  {/* Subtle border */}
                  <div className="absolute inset-0 border border-black/5 group-hover:border-masters-green/30 transition-colors duration-700 pointer-events-none" 
                       style={{ borderRadius: '4px' }} />
                </div>

                <div className="px-2">
                  <div className="w-8 h-[1px] bg-masters-green mb-4 transition-all duration-500 group-hover:w-16" />
                  <h3 className="text-xl md:text-2xl font-light text-soft-black mb-3 tracking-tight group-hover:text-masters-green transition-colors duration-500">
                    {feature.title}
                  </h3>
                  <p className="text-base md:text-lg text-text-secondary leading-relaxed font-light">
                    {feature.description}
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


