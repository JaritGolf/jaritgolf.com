'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { getProductPageContent } from '@/lib/content';

const detailImages = [
  '/images/ball-holder.jpeg',
  '/images/power-button.jpeg',
  '/images/charger-logo.jpeg',
  '/images/menu-screen.jpeg',
];

export default function ProductDetailsScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSpec, setActiveSpec] = useState(0);
  const content = getProductPageContent().product_details_section;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, 
        (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
      ));
      
      const specIndex = Math.min(
        content.specs.length - 1,
        Math.floor(progress * content.specs.length * 1.2)
      );
      setActiveSpec(specIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [content.specs.length]);

  return (
    <div 
      ref={containerRef}
      className="h-[400vh] relative"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-black">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          {/* Left: Specs */}
          <div className="relative bg-white flex items-center justify-center p-8 lg:p-16 order-2 lg:order-1">
            <div className="space-y-8 max-w-xl">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-12">
                {content.header}
              </h2>
              
              {content.specs.map((spec, index) => (
                <div
                  key={index}
                  className={`transition-all duration-700 border-l-4 pl-6 ${
                    activeSpec === index
                      ? 'border-masters-green opacity-100 translate-x-0'
                      : 'border-black/20 opacity-40 translate-x-4'
                  }`}
                >
                  <h3 className={`text-2xl md:text-3xl font-bold mb-3 transition-colors ${
                    activeSpec === index ? 'text-masters-green' : 'text-black'
                  }`}>
                    {spec.title}
                  </h3>
                  <p className="text-lg md:text-xl text-black/70 leading-relaxed">
                    {spec.description}
                  </p>
                </div>
              ))}

              {/* Progress */}
              <div className="flex gap-2 pt-8">
                {content.specs.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 transition-all duration-300 ${
                      index === activeSpec ? 'w-16 bg-masters-green' : 'w-8 bg-black/20'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Images */}
          <div className="relative bg-black overflow-hidden order-1 lg:order-2">
            {detailImages.map((src, index) => (
              <div
                key={index}
                className="absolute inset-0 transition-all duration-1000"
                style={{
                  opacity: activeSpec === index ? 1 : 0,
                  transform: activeSpec === index ? 'scale(1)' : 'scale(1.1)',
                }}
              >
                <Image
                  src={src}
                  alt={`Detail ${index + 1}`}
                  fill
                  className="object-cover"
                />
                <div 
                  className="absolute inset-0 bg-gradient-to-l from-transparent to-black/30"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


