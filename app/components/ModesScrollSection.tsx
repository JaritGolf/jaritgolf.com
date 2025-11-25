'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface Mode {
  title: string;
  description: string;
  features: string[];
  video: string;
  image: string;
}

const modes: Mode[] = [
  {
    title: 'Distance Mode',
    description: 'Master your lag putting with precise distance feedback. Build the touch that keeps you inside the circle.',
    features: ['3-50 foot range', 'Instant feedback', 'Progressive training'],
    video: '/videos/distance-mode.MOV',
    image: '/images/distance-mode.jpeg',
  },
  {
    title: 'Speed Mode',
    description: 'Perfect your stroke tempo and acceleration. Train the consistency that tour pros rely on.',
    features: ['Tempo analysis', 'Acceleration tracking', 'Consistency metrics'],
    video: '/videos/speed-mode.MOV',
    image: '/images/speed-mode.jpeg',
  },
  {
    title: 'Combine Mode',
    description: 'Tournament pressure simulation. Randomized challenges that prepare you for competition.',
    features: ['Pressure scenarios', 'Random challenges', 'Performance tracking'],
    video: '/videos/combine-mode.MOV',
    image: '/images/combine-mode.jpeg',
  },
];

export default function ModesScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const scrollProgress = Math.max(0, Math.min(1, 
        (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
      ));
      
      setProgress(scrollProgress);
      
      // Determine active mode based on scroll progress
      const modeIndex = Math.min(2, Math.floor(scrollProgress * 3));
      setActiveIndex(modeIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="h-[400vh] relative"
    >
      {/* Section Label */}
      <div className="absolute top-4 right-4 z-50 bg-purple-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg">
        S2-Modes
      </div>
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          {/* Left Side - Video/Image */}
          <div className="relative bg-black overflow-hidden">
            {modes.map((mode, index) => (
              <div
                key={index}
                className="absolute inset-0 transition-opacity duration-1000"
                style={{
                  opacity: activeIndex === index ? 1 : 0,
                  pointerEvents: activeIndex === index ? 'auto' : 'none',
                }}
              >
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src={mode.video} type="video/mp4" />
                </video>
              </div>
            ))}
            
            {/* Refined Progress Indicators */}
            <div className="absolute bottom-12 left-12 right-12 z-10">
              <div className="flex gap-6">
                {modes.map((_, index) => (
                  <div
                    key={index}
                    className="flex-1 h-[2px] bg-white/10 overflow-hidden backdrop-blur-sm"
                    style={{ borderRadius: '1px' }}
                  >
                    <div
                      className="h-full bg-gradient-to-r from-masters-green to-emerald-400 transition-all duration-700 shadow-[0_0_10px_rgba(0,103,71,0.5)]"
                      style={{
                        width: activeIndex === index 
                          ? `${((progress * 3) % 1) * 100}%`
                          : activeIndex > index ? '100%' : '0%'
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="relative bg-gradient-to-br from-white via-neutral-50 to-white flex items-center justify-center p-12 lg:p-20">
            {modes.map((mode, index) => (
              <div
                key={index}
                className="absolute inset-0 p-12 lg:p-20 flex flex-col justify-center transition-all duration-1000"
                style={{
                  opacity: activeIndex === index ? 1 : 0,
                  transform: activeIndex === index ? 'translateY(0)' : 'translateY(50px)',
                  pointerEvents: activeIndex === index ? 'auto' : 'none',
                }}
              >
                <div className="space-y-8 max-w-2xl">
                  <div className="space-y-3">
                    <span className="text-masters-green text-sm uppercase tracking-[0.3em] font-light">
                      Training Mode {index + 1}
                    </span>
                    <div className="w-16 h-[2px] bg-gradient-to-r from-masters-green to-transparent" />
                  </div>
                  
                  <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-soft-black leading-[1.1] tracking-tight">
                    {mode.title}
                  </h2>
                  
                  <p className="text-xl md:text-2xl text-text-secondary leading-relaxed font-light max-w-xl">
                    {mode.description}
                  </p>
                  
                  <div className="space-y-4 pt-6">
                    {mode.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-start gap-4 group">
                        <div className="w-1.5 h-1.5 bg-masters-green mt-2.5 transition-all duration-300 group-hover:w-8" 
                             style={{ borderRadius: '1px' }} />
                        <span className="text-lg md:text-xl text-soft-black/70 font-light">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-10">
                    <button className="group px-10 py-4 bg-soft-black text-white text-lg font-light hover:bg-masters-green transition-all duration-700 hover:scale-105 shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgba(0,103,71,0.3)]"
                            style={{ borderRadius: '2px' }}>
                      <span className="inline-block transform group-hover:translate-x-1 transition-transform duration-700">
                        Explore {mode.title}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Refined scroll hint */}
            <div className="absolute bottom-12 right-12 text-black/20 text-xs uppercase tracking-[0.3em] font-light">
              Continue
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

