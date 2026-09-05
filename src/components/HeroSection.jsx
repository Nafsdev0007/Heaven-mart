import React, { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CircularGallery from './CircularGallery';
import ShinyText from './ShinyText';
import { InteractiveHoverButton } from './ui/interactive-hover-button';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const showcaseItems = [
  {
    image: '/project-remontada-1.webp',
    text: 'Living Room Atelier'
  },
  {
    image: '/project-remontada-2.webp',
    text: 'Architectural Lounge'
  },
  {
    image: '/project-remontada-3.webp',
    text: 'Nature View Bedroom'
  },
  {
    image: '/project-remontada-4.webp',
    text: 'Sculptural Dining Suite'
  },
  {
    image: '/gallery-living-room-2.webp',
    text: 'Emerald Velvet Bedroom'
  },
  {
    image: '/gallery-living-room-1.webp',
    text: 'Contemporary Dining Nook'
  },
  {
    image: '/project-remontada-2.webp',
    text: 'Executive Timber Study'
  },
  {
    image: '/gallery-living-room-1.webp',
    text: 'Curated Living Space'
  }
];

export default function HeroSection({ onQuoteClick, isLoaded = true }) {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const buttonRef = useRef(null);
  const galleryRef = useRef(null);

  useGSAP(() => {
    if (!isLoaded) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set([titleRef.current, descRef.current, buttonRef.current, galleryRef.current], {
        opacity: 1,
        y: 0,
        scale: 1
      });
      return;
    }

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' }
    });

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 35 },
      { opacity: 1, y: 0, duration: 1.2, delay: 0.1 }
    )
      .fromTo(
        descRef.current,
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 1.0 },
        '-=0.85'
      )
      .fromTo(
        buttonRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.9 },
        '-=0.75'
      )
      .fromTo(
        galleryRef.current,
        { opacity: 0, y: 40, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 1.3 },
        '-=0.8'
      );

    // Subtle parallax float on scroll
    gsap.to(galleryRef.current, {
      y: 40,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
      }
    });
  }, { scope: sectionRef, dependencies: [isLoaded] });

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#F4F0E8] pt-24 sm:pt-32 md:pt-40 pb-8 sm:pb-12 md:pb-16 lg:pb-24 overflow-hidden flex flex-col items-center"
    >
      <div className="w-full px-5 sm:px-10 md:px-16 lg:px-24 xl:px-32 2xl:px-40 flex flex-col items-center text-center max-w-5xl mx-auto mb-6 sm:mb-10 md:mb-14">
        <h1
          ref={titleRef}
          className="font-fenix text-3xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] text-[#173332] leading-[1.06] tracking-[-0.04em] max-w-4xl will-change-transform"
        >
          <ShinyText
            text="Transform Your Space With Our Bespoke Furniture Collection"
            color="#173332"
            shineColor="#38807cff"
            speed={4.5}
            delay={2}
            spread={120}
            className="inline"
          />
        </h1>

        <p
          ref={descRef}
          className="mt-4 sm:mt-5 text-[#173332]/70 text-sm sm:text-lg max-w-xl font-normal leading-relaxed will-change-transform"
        >
          Furniture designed and crafted around your room, your comfort and your taste.
        </p>

        <div ref={buttonRef} className="mt-6 sm:mt-8 flex items-center justify-center will-change-transform">
          <InteractiveHoverButton
            type="button"
            onClick={onQuoteClick}
            className="text-xs sm:text-sm bg-[#173332] text-[#F4F1EA] border-[#173332] [&>div>div]:bg-white [&>div:last-child]:text-[#173332]"
          >
            Request a Quote
          </InteractiveHoverButton>
        </div>
      </div>

      <div
        ref={galleryRef}
        className="relative w-full h-[360px] sm:h-[480px] md:h-[560px] lg:h-[620px] xl:h-[660px] will-change-transform"
      >
        <CircularGallery
          items={showcaseItems}
          bend={0.6}
          textColor="#173332"
          borderRadius={0.02}
          scrollSpeed={2}
          scrollEase={0.04}
          font='500 20px "DM Sans", sans-serif'
        />
      </div>
    </section>
  );
}
