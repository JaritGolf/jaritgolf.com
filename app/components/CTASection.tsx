'use client';

import ScrollSection from './ScrollSection';
import { getHomepageContent } from '@/lib/content';
import Link from 'next/link';

export default function CTASection() {
  const content = getHomepageContent().cta_section;

  return (
    <ScrollSection className="py-20 md:py-28 lg:py-32 px-4 md:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-8 md:mb-12 leading-tight">
          {content.header}
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
          {content.buttons.map((button, index) => (
            <Link
              key={index}
              href={index === 0 ? '/product' : '#'}
              className={`px-8 md:px-10 py-4 md:py-5 text-base md:text-lg lg:text-xl font-medium transition-all duration-300 ${
                index === 0
                  ? 'bg-black text-white hover:bg-masters-green hover:scale-105'
                  : 'bg-white text-black border-2 border-black hover:bg-black hover:text-white hover:scale-105'
              }`}
            >
              {button}
            </Link>
          ))}
        </div>
      </div>
    </ScrollSection>
  );
}

