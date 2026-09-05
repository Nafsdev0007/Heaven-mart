import React, { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { InteractiveHoverButton } from './ui/interactive-hover-button';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const fitSteps = [
  {
    number: '01',
    title: 'Your room',
    description: 'Made to the right size.',
  },
  {
    number: '02',
    title: 'Your taste',
    description: 'Finished your way.',
  },
  {
    number: '03',
    title: 'Your life',
    description: 'Comfort that lasts.',
  },
];

export default function MadeToFitSection({ onQuoteClick }) {
  const sectionRef = useRef(null);
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
      '.fit-img-wrap',
      { opacity: 0, y: 35 },
      { opacity: 1, y: 0, duration: 1.2 }
    )
      .fromTo(
        imgRef.current,
        { scale: 1.15 },
        { scale: 1.0, duration: 1.5 },
        '-=1.2'
      )
      .fromTo(
        '.fit-title',
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 1.1 },
        '-=1.1'
      )
      .fromTo(
        '.fit-desc',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9 },
        '-=0.8'
      )
      .fromTo(
        '.fit-step-item',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 },
        '-=0.6'
      )
      .fromTo(
        '.fit-btn',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.5'
      );

    // Parallax on image
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
      id="bespoke"
      ref={sectionRef}
      className="bg-[#173332] text-[#F4F0E8] py-12 sm:py-16 md:py-36 w-full px-5 sm:px-10 md:px-16 lg:px-24 xl:px-32 2xl:px-40 overflow-hidden"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-20 xl:gap-28 items-center">
        <figure className="lg:col-span-6 w-full order-2 lg:order-1 m-0">
          <div className="fit-img-wrap relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-auto lg:h-[640px] xl:h-[700px] overflow-hidden bg-[#F4F0E8]/5 will-change-transform">
            <img
              ref={imgRef}
              src="/project-remontada-3.webp"
              alt="Quiet bedroom interior with tailored wood bed and storage"
              className="w-full h-full object-cover scale-[1.08] will-change-transform"
              loading="lazy"
            />
          </div>
        </figure>

        <div className="lg:col-span-6 flex flex-col space-y-5 sm:space-y-7 lg:space-y-8 order-1 lg:order-2">
          <div className="space-y-2 sm:space-y-3">
            <h2 className="fit-title font-fenix text-3xl sm:text-6xl md:text-7xl lg:text-[84px] text-[#F4F0E8] leading-[0.96] tracking-[-0.05em] will-change-transform">
              Made to fit<br />
              your room.
            </h2>
            <p className="fit-desc text-[#F4F0E8]/70 text-sm sm:text-base leading-relaxed max-w-md pt-1 will-change-transform">
              Tell us the space, the feeling and the piece you need. We’ll help with the rest.
            </p>
          </div>

          <ol className="divide-y divide-[#F4F0E8]/15 border-t border-b border-[#F4F0E8]/15 my-2 list-none p-0">
            {fitSteps.map((step) => (
              <li key={step.number} className="fit-step-item py-5 flex items-start space-x-6 will-change-transform">
                <span className="text-[#B49A67] text-[10px] tracking-wide pt-1">
                  {step.number}
                </span>
                <div className="flex flex-col space-y-0.5">
                  <span className="text-[#F4F0E8] text-base font-normal">
                    {step.title}
                  </span>
                  <span className="text-[#F4F0E8]/60 text-base">
                    {step.description}
                  </span>
                </div>
              </li>
            ))}
          </ol>

          <div className="fit-btn pt-2 will-change-transform">
            <InteractiveHoverButton
              type="button"
              onClick={onQuoteClick}
              variant="white"
            >
              Request a Quote
            </InteractiveHoverButton>
          </div>
        </div>
      </div>
    </section>
  );
}
