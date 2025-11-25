'use client';

import ScrollSection from './ScrollSection';
import { getHomepageContent } from '@/lib/content';
import Image from 'next/image';

const featureImages = [
  '/images/frontend.jpeg',
  '/images/side-closeup.jpeg',
  '/images/overhead.jpeg',
  '/images/ball-holder.jpeg',
  '/images/power-button.jpeg',
  '/images/charger-logo.jpeg',
];

export default function FeaturesGrid() {
  const content = getHomepageContent().features_grid;

  return (
    <ScrollSection className="py-20 md:py-28 lg:py-32 px-4 md:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-12 md:mb-16 text-center leading-tight">
          {content.header}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {content.features.map((feature, index) => (
            <div
              key={index}
              className="bg-white border-2 border-black hover:border-masters-green transition-all duration-300 group hover:shadow-xl overflow-hidden"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={featureImages[index]}
                  alt={feature.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-black mb-3 group-hover:text-masters-green transition-colors">
                  {feature.title}
                </h3>
                <p className="text-base md:text-lg text-black/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScrollSection>
  );
}

