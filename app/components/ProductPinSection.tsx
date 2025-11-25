'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const images = [
  { src: '/images/s2productpinslide1.webp', label: '', subtitle: '' },
  { src: '/images/side.jpeg', label: 'Distance Control Made Easy', subtitle: 'Practice at Home or in the Office Whenever You Want.' },
  { src: '/images/frontend.jpeg', label: 'Designed for Convenience', subtitle: 'Pick Up the Putter and Hit Putts Within Ten Seconds' },
  { src: '/images/side-closeup.jpeg', label: 'Get Incredible Feedback', subtitle: 'Know What You Are Doing and Build Confidence with Data' },
  { src: '/images/ball-holder.jpeg', label: 'Putt With Confidence on the Course', subtitle: 'The Work You Put in on the Speed Machine Travels Seamlessly to the Course' },
];

export default function ProductPinSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const scrollProgress = Math.max(0, Math.min(1,
        (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
      ));

      // First image: 150vh, remaining 4 images: 110vh each, plus 150vh hold at end
      // Total: 150 + 110*4 + 150 = 740vh
      const totalVh = 740;
      const vh = scrollProgress * totalVh;

      let imageIndex = 0;
      if (vh < 150) {
        imageIndex = 0;
      } else if (vh < 260) {
        imageIndex = 1;
      } else if (vh < 370) {
        imageIndex = 2;
      } else if (vh < 480) {
        imageIndex = 3;
      } else {
        imageIndex = 4;
      }

      setActiveIndex(imageIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-[740vh] relative"
    >
      {/* Section Label */}
      <div className="absolute top-4 right-4 z-50 bg-purple-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg">
        S2-ProductPin
      </div>
      <div className="sticky top-0 h-screen flex items-center justify-center bg-white overflow-hidden">
        {/* Images that crossfade */}
        <div className="absolute inset-0">
          {images.map((image, index) => (
            <div
              key={index}
              className="absolute inset-0 transition-all duration-[1500ms]"
              style={{
                opacity: activeIndex === index ? 1 : 0,
                transform: activeIndex === index ? 'scale(1)' : 'scale(1.05)',
              }}
            >
              <Image
                src={image.src}
                alt={image.label}
                fill
                className={index === 0 ? "object-contain" : "object-cover"}
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* Content - Hidden on first slide */}
        {activeIndex !== 0 && (
          <div className="relative z-10 max-w-3xl ml-12 md:ml-24 lg:ml-32 text-white">
            <div className="space-y-12">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="transition-all duration-[1000ms] ease-out"
                  style={{
                    opacity: activeIndex === index ? 1 : 0,
                    transform: activeIndex === index ? 'translateX(0)' : 'translateX(150px)',
                    pointerEvents: activeIndex === index ? 'auto' : 'none',
                  }}
                >
                  {activeIndex === index && (
                    <div className="bg-white/75 backdrop-blur-sm p-8 rounded-2xl">
                      <div className="w-20 h-[2px] bg-gradient-to-r from-masters-green to-transparent mb-8" />
                      <h3 className="text-6xl md:text-7xl lg:text-8xl xl:text-[6.75rem] font-light leading-tight tracking-tight text-black">
                        {image.label}
                      </h3>
                      {image.subtitle && (
                        <p className="text-xl md:text-3xl lg:text-4xl text-masters-green font-light mt-6 leading-relaxed">
                          {image.subtitle}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Refined Progress indicator */}
            <div className="mt-16 flex gap-4">
              {images.map((_, index) => (
                <div
                  key={index}
                  className="transition-all duration-700"
                  style={{
                    width: index === activeIndex ? '64px' : '32px',
                    height: '2px',
                    background: index === activeIndex
                      ? 'linear-gradient(to right, #006747, #00a870)'
                      : 'rgba(255,255,255,0.2)',
                    borderRadius: '1px',
                    boxShadow: index === activeIndex ? '0 0 10px rgba(0,103,71,0.5)' : 'none'
                  }}
                />
              ))}
            </div>

            {/* Counter */}
            <div className="mt-8">
              <p className="text-white/40 text-sm uppercase tracking-[0.3em] font-light">
                {String(activeIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

