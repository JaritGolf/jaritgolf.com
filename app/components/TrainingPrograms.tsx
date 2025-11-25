'use client';

import { useState } from 'react';
import { getProductPageContent } from '@/lib/content';

export default function TrainingPrograms() {
  const content = getProductPageContent().training_programs_section;
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="py-20 md:py-28 lg:py-32 px-4 md:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-12 md:mb-16 text-center leading-tight">
          {content.header}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {content.programs.map((program, index) => (
            <div
              key={index}
              className="bg-white border-2 border-black p-6 md:p-8 hover:border-masters-green transition-all duration-300 group hover:shadow-xl cursor-pointer"
              onClick={() => toggleExpand(index)}
            >
              <div className="flex justify-between items-start mb-3 md:mb-4">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-black group-hover:text-masters-green transition-colors flex-1">
                  {program.title}
                </h3>
                <svg
                  className={`w-6 h-6 text-black group-hover:text-masters-green transition-all duration-300 flex-shrink-0 ml-2 ${
                    expandedIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  expandedIndex === index ? 'max-h-96' : 'max-h-20'
                }`}
              >
                <p className="text-base md:text-lg text-black/70 leading-relaxed">
                  {program.description}
                </p>
                {expandedIndex === index && (
                  <div className="mt-4 pt-4 border-t-2 border-black/10">
                    <button className="w-full bg-black text-white px-6 py-3 hover:bg-masters-green transition-colors duration-300">
                      Start This Program
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

