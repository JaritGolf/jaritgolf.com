'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';

export default function ProductShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-20 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mb-12">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black text-center leading-tight">
          Every Angle.<br />Every Detail.
        </h2>
      </div>

      {/* Horizontal Scroll Gallery */}
      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 md:px-6 lg:px-8 pb-8"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {[
          { src: '/images/main-photo.jpeg', caption: 'The Speed Machine' },
          { src: '/images/frontend.jpeg', caption: 'Intuitive Display' },
          { src: '/images/side.jpeg', caption: 'Engineered Precision' },
          { src: '/images/overhead.jpeg', caption: 'Overhead View' },
          { src: '/images/side-closeup.jpeg', caption: 'Premium Build' },
          { src: '/images/ball-holder.jpeg', caption: 'Ball Holder Detail' },
          { src: '/images/power-button.jpeg', caption: 'Power Control' },
          { src: '/images/charger-logo.jpeg', caption: 'Charging Station' },
        ].map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 snap-center w-[85vw] md:w-[70vw] lg:w-[60vw] xl:w-[50vw] group"
          >
            <div className="relative aspect-[4/3] overflow-hidden border-4 border-black hover:border-masters-green transition-all duration-300 shadow-xl hover:shadow-2xl">
              <Image
                src={item.src}
                alt={item.caption}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 85vw, (max-width: 1024px) 70vw, 60vw"
              />
            </div>
            <p className="text-lg md:text-xl font-medium text-black mt-4 text-center">
              {item.caption}
            </p>
          </div>
        ))}
      </div>

      {/* Scroll Hint */}
      <div className="text-center mt-8">
        <p className="text-black/50 text-sm uppercase tracking-wider">
          ← Scroll to explore →
        </p>
      </div>
    </section>
  );
}


