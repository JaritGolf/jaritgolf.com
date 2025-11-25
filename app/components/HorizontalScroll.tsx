'use client';

import { useEffect, useRef } from 'react';

interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
}

export default function HorizontalScroll({ children, className = '' }: HorizontalScrollProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const container = containerRef.current;
    const content = contentRef.current;
    if (!wrapper || !container || !content) return;

    const handleScroll = () => {
      const wrapperRect = wrapper.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;
      
      // When wrapper enters viewport
      const wrapperTop = wrapperRect.top + scrollY;
      const wrapperBottom = wrapperTop + wrapperRect.height;
      const scrollStart = wrapperTop - windowHeight;
      const scrollEnd = wrapperBottom;
      
      if (scrollY >= scrollStart && scrollY <= scrollEnd) {
        const progress = Math.max(0, Math.min(1, (scrollY - scrollStart) / (scrollEnd - scrollStart)));
        const scrollableWidth = content.scrollWidth - container.clientWidth;
        container.scrollLeft = progress * scrollableWidth;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="w-full">
      <div
        ref={containerRef}
        className={`overflow-x-hidden overflow-y-visible ${className}`}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <style jsx global>{`
          .horizontal-scroll-container::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        <div ref={contentRef} className="flex flex-nowrap gap-6 md:gap-8 pb-4">
          {children}
        </div>
      </div>
    </div>
  );
}

