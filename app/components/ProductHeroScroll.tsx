'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { getProductPageContent } from '@/lib/content';
import { formatPrice } from '@/lib/utils';

interface ProductHeroScrollProps {
  onAddToCart: () => void;
}

const productImages = [
  '/images/main-photo.jpeg',
  '/images/frontend.jpeg',
  '/images/side.jpeg',
  '/images/overhead.jpeg',
  '/images/side-closeup.jpeg',
];

export default function ProductHeroScroll({ onAddToCart }: ProductHeroScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const content = getProductPageContent().hero_section;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, 
        (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
      ));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeImageIndex = Math.min(
    productImages.length - 1,
    Math.floor(scrollProgress * productImages.length * 1.5)
  );

  return (
    <div 
      ref={containerRef}
      className="h-[300vh] relative"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background Images with Crossfade */}
        <div className="absolute inset-0">
          {productImages.map((src, index) => (
            <div
              key={index}
              className="absolute inset-0 transition-opacity duration-1000"
              style={{
                opacity: activeImageIndex === index ? 1 : 0,
              }}
            >
              <Image
                src={src}
                alt={`Product view ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>

        {/* Content that transforms on scroll */}
        <div className="absolute inset-0 flex items-center">
          <div 
            className="max-w-3xl ml-8 md:ml-16 lg:ml-24 xl:ml-32 text-white z-10"
            style={{
              transform: `translateY(${scrollProgress * -100}px)`,
              opacity: Math.max(0, 1 - scrollProgress * 1.5),
            }}
          >
            <div className="space-y-6">
              <div 
                className="overflow-hidden"
                style={{
                  transform: `translateX(${(1 - Math.min(1, scrollProgress * 2)) * -100}px)`,
                }}
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight drop-shadow-2xl">
                  {content.headline}
                </h1>
              </div>
              
              <div 
                className="overflow-hidden"
                style={{
                  transform: `translateX(${(1 - Math.min(1, (scrollProgress - 0.1) * 2)) * -100}px)`,
                }}
              >
                <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-masters-green drop-shadow-lg">
                  {content.price}
                </p>
              </div>

              <div 
                className="flex flex-col sm:flex-row gap-4 pt-4"
                style={{
                  transform: `translateY(${(1 - Math.min(1, (scrollProgress - 0.2) * 2)) * 50}px)`,
                  opacity: Math.min(1, (scrollProgress - 0.2) * 5),
                }}
              >
                <button
                  onClick={onAddToCart}
                  className="px-8 md:px-10 py-4 md:py-5 text-lg md:text-xl font-medium bg-masters-green text-white hover:bg-white hover:text-black transition-all duration-300 hover:scale-105 shadow-2xl"
                >
                  {content.cta_buttons[0]}
                </button>
                <button className="px-8 md:px-10 py-4 md:py-5 text-lg md:text-xl font-medium bg-white/10 backdrop-blur-md text-white border-2 border-white hover:bg-white hover:text-black transition-all duration-300 hover:scale-105">
                  {content.cta_buttons[1]}
                </button>
              </div>
            </div>
          </div>

          {/* Floating CTA that appears on scroll */}
          <div 
            className="absolute bottom-8 right-8 bg-white p-8 border-4 border-black shadow-2xl"
            style={{
              transform: `translateY(${Math.max(0, (1 - scrollProgress * 2)) * 200}px)`,
              opacity: Math.min(1, scrollProgress * 3),
            }}
          >
            <p className="text-sm uppercase tracking-wider text-black/60 mb-2">Limited Time</p>
            <p className="text-4xl font-bold text-masters-green mb-4">{formatPrice(49900)}</p>
            <button
              onClick={onAddToCart}
              className="w-full px-6 py-3 bg-black text-white hover:bg-masters-green transition-colors text-lg font-medium"
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Image Counter */}
        <div className="absolute bottom-8 left-8 z-10 text-white">
          <p className="text-sm uppercase tracking-wider mb-2">View {activeImageIndex + 1} of {productImages.length}</p>
          <div className="flex gap-2">
            {productImages.map((_, index) => (
              <div
                key={index}
                className={`h-1 transition-all duration-300 ${
                  index === activeImageIndex ? 'w-12 bg-masters-green' : 'w-8 bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


