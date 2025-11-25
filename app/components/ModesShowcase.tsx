'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Mode {
  title: string;
  description: string;
  video: string;
  image: string;
}

const modes: Mode[] = [
  {
    title: 'Distance Mode',
    description: 'Master your lag putting with precise distance feedback. Build the touch that keeps you inside the circle.',
    video: '/videos/distance-mode.MOV',
    image: '/images/distance-mode.jpeg',
  },
  {
    title: 'Speed Mode',
    description: 'Perfect your stroke tempo and acceleration. Train the consistency that tour pros rely on.',
    video: '/videos/speed-mode.MOV',
    image: '/images/speed-mode.jpeg',
  },
  {
    title: 'Combine Mode',
    description: 'Tournament pressure simulation. Randomized challenges that prepare you for competition.',
    video: '/videos/combine-mode.MOV',
    image: '/images/combine-mode.jpeg',
  },
];

export default function ModesShowcase() {
  const [activeMode, setActiveMode] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <section className="py-20 md:py-32 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white text-center mb-16 leading-tight">
          Three Modes.<br />
          <span className="text-masters-green">One Mission.</span>
        </h2>

        {/* Mode Selector */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 justify-center">
          {modes.map((mode, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveMode(index);
                setIsVideoLoaded(false);
              }}
              className={`px-8 py-4 text-lg font-medium transition-all duration-300 ${
                activeMode === index
                  ? 'bg-masters-green text-white scale-105'
                  : 'bg-white/10 text-white border-2 border-white hover:bg-white hover:text-black'
              }`}
            >
              {mode.title}
            </button>
          ))}
        </div>

        {/* Content Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Video/Image */}
          <div className="relative aspect-video border-4 border-white overflow-hidden group">
            <video
              key={activeMode}
              autoPlay
              loop
              muted
              playsInline
              onLoadedData={() => setIsVideoLoaded(true)}
              className="w-full h-full object-cover"
            >
              <source src={modes[activeMode].video} type="video/mp4" />
            </video>
            {!isVideoLoaded && (
              <Image
                src={modes[activeMode].image}
                alt={modes[activeMode].title}
                fill
                className="object-cover"
              />
            )}
          </div>

          {/* Description */}
          <div className="space-y-6">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              {modes[activeMode].title}
            </h3>
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed">
              {modes[activeMode].description}
            </p>
            <div className="pt-4">
              <button className="px-8 py-4 bg-masters-green text-white text-lg font-medium hover:bg-white hover:text-black transition-all duration-300 hover:scale-105">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Menu Screen Preview */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-8 text-masters-green">
            Intuitive Interface
          </h3>
          <div className="relative aspect-video max-w-4xl mx-auto border-4 border-masters-green overflow-hidden shadow-2xl">
            <Image
              src="/images/menu-screen.jpeg"
              alt="Menu Interface"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

