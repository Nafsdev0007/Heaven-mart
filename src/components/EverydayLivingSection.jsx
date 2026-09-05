import React, { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { InteractiveHoverButton } from './ui/interactive-hover-button';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function EverydayLivingSection({ onQuoteClick }) {
  const sectionRef = useRef(null);
  const textColRef = useRef(null);
  const imgWrapRef = useRef(null);
  const imgRef = useRef(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        once: true,
      },
      defaults: { ease: 'power3.out' },
    });

    tl.fromTo(
      '.living-eyebrow',
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8 }
    )
      .fromTo(
        '.living-title',
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 1.1 },
        '-=0.6'
      )
      .fromTo(
        '.living-desc',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9 },
        '-=0.7'
      )
      .fromTo(
        '.living-btn',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.7'
      )
      .fromTo(
        imgWrapRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2 },
        '-=1.0'
      )
      .fromTo(
        imgRef.current,
        { scale: 1.15 },
        { scale: 1.0, duration: 1.5 },
        '-=1.2'
      );

    // Image scroll parallax
    gsap.fromTo(
      imgRef.current,
      { yPercent: -6 },
      {
        yPercent: 6,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      id="approach"
      ref={sectionRef}
      className="bg-[#F4F0E8] py-12 sm:py-16 md:py-36 w-full px-5 sm:px-10 md:px-16 lg:px-24 xl:px-32 2xl:px-40 overflow-hidden"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-20 xl:gap-28 items-center">
        <div ref={textColRef} className="lg:col-span-5 flex flex-col space-y-5 sm:space-y-7 lg:space-y-8">
          <div className="space-y-2 sm:space-y-3">
            <span className="living-eyebrow text-[#B49A67] text-xs sm:text-[13px] font-normal tracking-tight block will-change-transform">
              A better fit for everyday living
            </span>
            <h2 className="living-title font-fenix text-3xl sm:text-6xl md:text-7xl lg:text-[84px] text-[#173332] leading-[0.96] tracking-[-0.05em] will-change-transform">
              Furniture<br />
              should fit<br />
              the life<br />
              around it.
            </h2>
          </div>

          <p className="living-desc text-[#173332]/70 text-sm sm:text-base leading-relaxed max-w-md will-change-transform">
            From a family living room to a new dining space, every piece starts with how you live.
          </p>

          <div className="living-btn pt-2 will-change-transform">
            <InteractiveHoverButton
              type="button"
              onClick={onQuoteClick}
              variant="green"
            >
              Request a Quote
            </InteractiveHoverButton>
          </div>
        </div>

        <figure className="lg:col-span-7 w-full m-0">
          <div
            ref={imgWrapRef}
            className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-auto lg:h-[640px] xl:h-[700px] overflow-hidden bg-[#173332]/5 will-change-transform"
          >
            <img
              ref={imgRef}
              src="/gallery-living-room-3.webp"
              alt="Tailored Heaven Furniture Mart bedroom furniture in a warm, naturally lit interior"
              className="w-full h-full object-cover will-change-transform"
              loading="lazy"
            />
          </div>
        </figure>
      </div>
    </section>
  );
}
