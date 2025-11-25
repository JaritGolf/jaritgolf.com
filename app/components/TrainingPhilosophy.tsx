'use client';

import ScrollSection from './ScrollSection';
import { getHomepageContent } from '@/lib/content';

export default function TrainingPhilosophy() {
  const content = getHomepageContent().training_philosophy_section;

  return (
    <ScrollSection className="py-20 md:py-28 lg:py-32 px-4 md:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-12 md:mb-16 text-center leading-tight">
          {content.header}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {content.philosophies.map((philosophy, index) => (
            <div
              key={index}
              className="bg-white border-2 border-black p-6 md:p-8 hover:border-masters-green transition-all duration-300 group hover:shadow-xl"
            >
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-black mb-3 md:mb-4 group-hover:text-masters-green transition-colors">
                {philosophy.title}
              </h3>
              <p className="text-base md:text-lg text-black/70 leading-relaxed">
                {philosophy.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </ScrollSection>
  );
}

