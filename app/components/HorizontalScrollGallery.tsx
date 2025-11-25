'use client';

import { useEffect, useRef, useState } from 'react';

interface GalleryItem {
  src: string;
  title: string;
  subtitle: string;
}

const items: GalleryItem[] = [
  { src: '/images/card1.png', title: 'Can\'t Get Out', subtitle: 'Can\'t get to practice often or at all' },
  { src: '/images/card 2.png', title: 'Poor Feedback Loop', subtitle: 'No data means guesswork, not precision.' },
  { src: '/images/card 3.png', title: 'Limited Time', subtitle: 'Busy schedules need efficient practice solutions.' },
  { src: '/images/card 4.png', title: 'Not Enough Reps', subtitle: 'Half of the time you are chasing balls' },
  { src: '/images/card 5.png', title: 'Tech Gap', subtitle: 'Full swing has Sims and Launch Monitors. Putting has little to nothing.' },
];

export default function HorizontalScrollGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [showSecondText, setShowSecondText] = useState(false);
  const targetScrollLeft = useRef(0);
  const currentScrollLeft = useRef(0);
  const rafId = useRef<number>();
  const lastTextState = useRef<boolean>(false);
  const isPinnedRef = useRef<boolean>(false);

  useEffect(() => {
    const container = containerRef.current;
    const scroller = scrollerRef.current;
    if (!container || !scroller) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const wasPinned = isPinnedRef.current;
      const isPinned = rect.top <= 0;

      // Don't start scrolling until section is pinned at top
      if (!isPinned) {
        // Only reset if we were previously pinned (prevents unnecessary resets)
        if (wasPinned) {
          targetScrollLeft.current = 0;
          currentScrollLeft.current = 0;
          scroller.scrollLeft = 0;
          // Only update state if it's different (prevent unnecessary re-renders)
          if (lastTextState.current !== false) {
            setShowSecondText(false);
            lastTextState.current = false;
          }
          isPinnedRef.current = false;
        }
        return;
      }

      // Mark as pinned
      isPinnedRef.current = true;

      // Once pinned, calculate progress based on scroll depth
      const scrollDistance = container.clientHeight - window.innerHeight;
      
      // Add small threshold to prevent division by zero or unstable calculations
      if (scrollDistance <= 0) return;
      
      const scrollProgress = Math.max(0, Math.min(1,
        Math.abs(rect.top) / scrollDistance
      ));

      const maxScroll = scroller.scrollWidth - scroller.clientWidth;
      targetScrollLeft.current = scrollProgress * maxScroll;

      // Switch text with hysteresis to prevent flickering
      // Use 0.48 for switching to second text and 0.52 for switching back (hysteresis)
      const shouldShowSecond = lastTextState.current
        ? scrollProgress > 0.48  // Keep showing second text until below 48%
        : scrollProgress > 0.52; // Switch to second text only after 52%

      // Only update state if it actually changed (prevents unnecessary re-renders)
      if (shouldShowSecond !== lastTextState.current) {
        setShowSecondText(shouldShowSecond);
        lastTextState.current = shouldShowSecond;
      }
    };

    // Smooth animation loop
    const animate = () => {
      if (!scrollerRef.current) return;

      // Lerp (linear interpolation) for smooth scrolling
      const ease = 0.1; // Lower = smoother but slower, higher = faster but less smooth
      currentScrollLeft.current += (targetScrollLeft.current - currentScrollLeft.current) * ease;

      scrollerRef.current.scrollLeft = currentScrollLeft.current;

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-[500vh] relative"
    >
      {/* Section Label */}
      <div className="absolute top-4 right-4 z-50 bg-purple-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg">
        S2-HScroll
      </div>
      <div className="sticky top-0 h-screen overflow-hidden" style={{backgroundImage: 'url(/images/webbg.png)', backgroundRepeat: 'repeat', backgroundSize: 'auto', backgroundPosition: 'top left'}}>
        {/* Background text */}
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 h-[70vh] w-full flex items-center justify-center pointer-events-none px-4">
          {!showSecondText ? (
            <>
              {/* Mobile: 4 lines */}
              <h2 className="md:hidden text-white font-electromagnetic hero-embossed tracking-tight text-center h-full flex flex-col justify-center transition-opacity duration-500"
                  style={{ fontSize: 'clamp(2.7rem, 25.2vw, 14.4rem)', lineHeight: '1.1' }}>
                <span>Any of</span>
                <span>These</span>
                <span>Sound</span>
                <span>Familiar?</span>
              </h2>
              {/* Desktop: 2 lines */}
              <h2 className="hidden md:flex text-white font-electromagnetic hero-embossed tracking-tight text-center h-full flex-col justify-center transition-opacity duration-500"
                  style={{ fontSize: 'clamp(7.2rem, 13.5vw, 24.3rem)', lineHeight: '1.1' }}>
                <span>Any of These</span>
                <span>Sound Familiar?</span>
              </h2>
            </>
          ) : (
            <>
              {/* Mobile: 4 lines */}
              <h2 className="md:hidden text-white font-electromagnetic hero-embossed tracking-tight text-center h-full flex flex-col justify-center transition-opacity duration-500"
                  style={{ lineHeight: '1.1' }}>
                <span style={{ fontSize: 'clamp(2.25rem, 16.2vw, 14.4rem)', whiteSpace: 'nowrap' }}>It's Time To</span>
                <span style={{ fontSize: 'clamp(2.7rem, 25.2vw, 14.4rem)' }}>Find</span>
                <span style={{ fontSize: 'clamp(2.7rem, 25.2vw, 14.4rem)' }}>Your</span>
                <span style={{ fontSize: 'clamp(2.7rem, 25.2vw, 14.4rem)' }}>Feel</span>
              </h2>
              {/* Desktop: 2 lines */}
              <h2 className="hidden md:flex text-white font-electromagnetic hero-embossed tracking-tight text-center h-full flex-col justify-center transition-opacity duration-500"
                  style={{ fontSize: 'clamp(7.2rem, 13.5vw, 24.3rem)', lineHeight: '1.1' }}>
                <span>It's Time to</span>
                <span>Find Your Feel</span>
              </h2>
            </>
          )}
        </div>

        <div
          ref={scrollerRef}
          className="flex gap-12 h-full items-center overflow-x-hidden relative z-10 pr-[15vw] md:pr-[30vw] lg:pr-[40vw]"
          style={{ paddingLeft: '100vw' }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[85vw] md:w-[70vw] lg:w-[60vw] h-[70vh] relative group cursor-pointer"
            >
              <div className="relative h-full bg-white shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-all duration-700 group-hover:shadow-[0_30px_80px_rgba(0,103,71,0.3)] p-8 md:p-12 flex flex-col justify-center"
                   style={{ borderRadius: '40px' }}>
                <div className="transform transition-all duration-700">
                  <div className="w-20 h-[2px] bg-masters-green mb-10 transition-all duration-700 group-hover:w-40" />
                  <h3 className="text-7xl md:text-8xl lg:text-9xl font-magnum mb-8 tracking-tight text-black leading-tight">{item.title}</h3>
                  <p className="text-3xl md:text-4xl lg:text-5xl text-black/70 font-electromagnetic tracking-wide leading-relaxed">{item.subtitle}</p>
                </div>

                {/* Elegant frame effect */}
                <div className="absolute inset-0 border border-black/10 pointer-events-none" style={{ borderRadius: '40px' }} />
                
                {/* Green inside border */}
                <div 
                  className="absolute pointer-events-none" 
                  style={{ 
                    inset: 'clamp(12px, 3%, 20px)', 
                    border: '4px solid #006747',
                    borderRadius: '28px'
                  }} 
                />

                {/* Logo in bottom right corner */}
                <img 
                  src="/images/logo.jpg" 
                  alt="Jarit Golf Logo"
                  className="absolute pointer-events-none object-contain"
                  style={{ 
                    height: '20%',
                    bottom: 'clamp(28px, 7%, 32px)',
                    right: 'clamp(28px, 7%, 32px)'
                  }}
                />
              </div>
            </div>
          ))}
          {/* Spacer to ensure last card can scroll fully into view */}
          <div className="flex-shrink-0 w-[100vw]" aria-hidden="true"></div>
        </div>
      </div>
    </div>
  );
}

