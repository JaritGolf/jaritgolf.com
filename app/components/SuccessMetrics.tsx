'use client';

import { useEffect, useState } from 'react';
import ScrollSection from './ScrollSection';
import { getHomepageContent } from '@/lib/content';

function AnimatedCounter({ value, suffix = '' }: { value: string; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState('0');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById(`counter-${value}`);
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [value, isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
    const isDecimal = value.includes('.');
    const duration = 2000;
    const steps = 60;
    const increment = numericValue / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(
          isDecimal 
            ? current.toFixed(1) 
            : Math.floor(current).toString()
        );
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <span id={`counter-${value}`}>
      {displayValue}{suffix}
    </span>
  );
}

export default function SuccessMetrics() {
  const content = getHomepageContent().success_metrics_section;

  return (
    <ScrollSection className="py-20 md:py-28 lg:py-32 px-4 md:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-12 md:mb-16 text-center leading-tight">
          {content.header}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {content.stats.map((stat, index) => {
            const metricParts = stat.metric.match(/([\d.]+)(.*)/);
            const number = metricParts ? metricParts[1] : stat.metric;
            const suffix = metricParts ? metricParts[2] : '';
            
            return (
              <div
                key={index}
                className="bg-white text-black p-6 md:p-8 border-2 border-black hover:border-masters-green transition-all duration-300 text-center hover:shadow-xl"
              >
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-masters-green mb-3 md:mb-4">
                  <AnimatedCounter value={number} suffix={suffix} />
                </div>
                <p className="text-sm sm:text-base md:text-lg text-black/70 leading-relaxed">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </ScrollSection>
  );
}

