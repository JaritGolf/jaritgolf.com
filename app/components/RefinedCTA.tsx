'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getHomepageContent } from '@/lib/content';

export default function RefinedCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const content = getHomepageContent().cta_section;

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
    <div ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Section Label */}
      <div className="absolute top-4 right-4 z-50 bg-purple-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg">
        S2-CTA
      </div>
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/main-photo.jpeg"
          alt="The Speed Machine"
          fill
          className="object-cover"
          style={{
            transform: `scale(${1 + scrollProgress * 0.1})`,
            transition: 'transform 0.3s ease-out'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full py-32 px-4 md:px-6 lg:px-8">
        <div 
          className="max-w-4xl mx-auto text-center"
          style={{
            opacity: scrollProgress,
            transform: `translateY(${(1 - scrollProgress) * 50}px)`,
            transition: 'all 1s ease-out'
          }}
        >
          <div className="space-y-12">
            {/* Decorative line */}
            <div className="flex justify-center">
              <div 
                className="h-[2px] bg-gradient-to-r from-transparent via-masters-green to-transparent transition-all duration-1000"
                style={{
                  width: `${scrollProgress * 200}px`
                }}
              />
            </div>

            <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white leading-tight tracking-tight">
              {content.header}
            </h2>

            <p className="text-xl md:text-2xl text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
              Join thousands of golfers who have transformed their putting game with data-driven practice.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Link
                href="/product"
                className="group px-12 py-6 text-lg font-light bg-masters-green text-white hover:bg-white hover:text-soft-black transition-all duration-700 shadow-[0_10px_40px_rgba(0,103,71,0.4)] hover:shadow-[0_15px_50px_rgba(0,103,71,0.6)] transform hover:scale-105"
                style={{ borderRadius: '2px' }}
              >
                <span className="inline-block transform group-hover:translate-x-1 transition-transform duration-700">
                  {content.buttons[0]}
                </span>
              </Link>
              <button 
                className="group px-12 py-6 text-lg font-light bg-white/5 backdrop-blur-xl text-white border border-white/30 hover:bg-white hover:text-soft-black transition-all duration-700 hover:border-white transform hover:scale-105"
                style={{ borderRadius: '2px' }}
              >
                <span className="inline-block transform group-hover:translate-x-1 transition-transform duration-700">
                  {content.buttons[1]}
                </span>
              </button>
            </div>

            {/* Decorative line */}
            <div className="flex justify-center pt-8">
              <div 
                className="h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-1000"
                style={{
                  width: `${scrollProgress * 300}px`
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


