'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) return;
      const words = gsap.utils.toArray<HTMLElement>(".hero-word");
      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=290%",
          scrub: 1,
          pin: true,
        },
      });

      timeline
        .from(words, {
          yPercent: 120,
          opacity: 0,
          stagger: 1,
          duration: 2,
        })
        .to(
          ".hero-copy",
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
          },
          "-=0.3",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.playbackRate = 0.75;
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-20 text-center md:px-12 lg:px-20"
      style={{backgroundImage: 'url(/images/webbg.png)', backgroundRepeat: 'repeat', backgroundSize: 'auto', backgroundPosition: 'top left'}}
    >
      {/* Section Label */}
      <div className="absolute top-4 right-4 z-50 bg-purple-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg">
        S2-Hero
      </div>

      <div className="relative z-10 flex max-w-5xl flex-col items-center gap-8">
        <p className="text-xs uppercase tracking-[0.6em] text-white/70">
          The Speed Machine
        </p>
        <h1
          className="flex flex-col gap-3 text-balance"
          aria-label="Make more putts"
        >
          <span
            className="hero-word knewave-regular hero-embossed text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] xl:text-[16rem] 2xl:text-[20rem] leading-[0.8] tracking-[10px] text-white"
          >
            MAKE
          </span>
          <span
            className="hero-word knewave-regular hero-embossed text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] xl:text-[16rem] 2xl:text-[20rem] leading-[0.8] tracking-[10px] text-white"
          >
            MORE
          </span>
          <span
            className="hero-word knewave-regular hero-embossed text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] xl:text-[16rem] 2xl:text-[20rem] leading-[0.8] tracking-[10px] text-white"
          >
            PUTTS
          </span>
        </h1>
        <p className="hero-copy max-w-3xl translate-y-6 text-2xl md:text-3xl lg:text-4xl text-white font-light tracking-wide opacity-0">
          Tour-Level Distance Control Starts Here
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            href="/product"
            className="group px-12 py-5 text-lg font-medium bg-masters-green text-white hover:bg-black hover:text-white transition-all duration-700 shadow-[0_8px_30px_rgba(0,103,71,0.4)] hover:shadow-[0_8px_40px_rgba(0,103,71,0.6)] transform hover:scale-105"
            style={{ borderRadius: '2px' }}
          >
            <span className="inline-block transform group-hover:translate-x-1 transition-transform duration-700">
              Start Your Journey
            </span>
          </Link>
          <button className="group px-12 py-5 text-lg font-medium bg-black/5 text-black border border-black/30 hover:bg-black hover:text-white transition-all duration-700 hover:border-black transform hover:scale-105"
                  style={{ borderRadius: '2px' }}>
            <span className="inline-block transform group-hover:translate-x-1 transition-transform duration-700">
              Watch Demo
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

