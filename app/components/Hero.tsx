'use client';

import { useEffect, useRef } from 'react';
import { getHomepageContent } from '@/lib/content';
import Link from 'next/link';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const content = getHomepageContent();

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY;
        const rate = scrolled * 0.5;
        heroRef.current.style.transform = `translateY(${rate}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      className="h-screen w-full relative overflow-hidden"
      style={{ marginTop: 0 }}
    >
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/main-video.MOV" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div 
        ref={heroRef}
        className="relative h-full w-full flex items-center justify-center"
      >
        <div className="text-center px-4 z-10 relative">
          <h1 className="font-electromagnetic text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] 2xl:text-[14rem] leading-[0.9] tracking-tighter text-white mb-6 md:mb-8 drop-shadow-2xl">
            <span className="block">MAKE</span>
            <span className="block">MORE</span>
            <span className="block">PUTTS</span>
          </h1>
          <div className="mt-8 md:mt-12 space-y-3 md:space-y-4 max-w-3xl mx-auto">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-white drop-shadow-lg leading-tight">
              {content.hero_section.headline}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
              {content.hero_section.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6 md:mt-8">
              <Link
                href="/product"
                className="px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-medium transition-all duration-300 bg-masters-green text-white hover:bg-white hover:text-black hover:scale-105 shadow-2xl"
              >
                {content.hero_section.cta_buttons[0]}
              </Link>
              <button className="px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-medium transition-all duration-300 bg-white/10 backdrop-blur-sm text-white border-2 border-white hover:bg-white hover:text-black hover:scale-105">
                {content.hero_section.cta_buttons[1]}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-white rounded-full" />
        </div>
      </div>
    </section>
  );
}

