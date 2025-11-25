'use client';

import ScrollSection from './ScrollSection';
import HorizontalScroll from './HorizontalScroll';
import { getHomepageContent } from '@/lib/content';

export default function SolutionSection() {
  const content = getHomepageContent().solution_section;
  
  if (!content) {
    return null; // Component not used in current homepage
  }

  return (
    <ScrollSection className="py-20 md:py-28 lg:py-32 px-4 md:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-12 md:mb-16 text-center leading-tight">
          {content.header}
        </h2>
        <div className="py-8 md:py-12">
          <HorizontalScroll className="horizontal-scroll-container">
            {content.value_propositions.map((prop, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-96 lg:w-[28rem] bg-white text-black p-6 md:p-8 border-2 border-black hover:border-masters-green transition-all duration-300 hover:shadow-xl"
              >
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 text-black">
                  {prop.title}
                </h3>
                <p className="text-base md:text-lg text-black/70 leading-relaxed">
                  {prop.content}
                </p>
              </div>
            ))}
          </HorizontalScroll>
        </div>
      </div>
    </ScrollSection>
  );
}

