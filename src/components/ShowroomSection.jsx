import React, { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { InteractiveHoverButton } from './ui/interactive-hover-button';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ShowroomSection() {
  const sectionRef = useRef(null);
  const textColRef = useRef(null);
  const mapWrapRef = useRef(null);

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
      '.showroom-eyebrow',
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8 }
    )
      .fromTo(
        '.showroom-title',
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 1.1 },
        '-=0.6'
      )
      .fromTo(
        '.showroom-desc',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9 },
        '-=0.7'
      )
      .fromTo(
        '.showroom-address',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.7'
      )
      .fromTo(
        '.showroom-btn',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.7'
      )
      .fromTo(
        mapWrapRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2 },
        '-=1.0'
      );
  }, { scope: sectionRef });

  return (
    <section
      id="showroom"
      ref={sectionRef}
      className="bg-[#173332] text-[#F4F0E8] py-12 sm:py-16 md:py-36 w-full px-5 sm:px-10 md:px-16 lg:px-24 xl:px-32 2xl:px-40 overflow-hidden"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-20 xl:gap-28 items-center">
        {/* Information Column */}
        <div ref={textColRef} className="lg:col-span-5 flex flex-col space-y-5 sm:space-y-7 lg:space-y-8">
          <div className="space-y-2 sm:space-y-3">
            <span className="showroom-eyebrow text-[#B49A67] text-xs sm:text-[13px] font-normal tracking-tight block will-change-transform">
              Visit our space
            </span>
            <h2 className="showroom-title font-fenix text-3xl sm:text-6xl md:text-7xl lg:text-[84px] text-[#F4F0E8] leading-[0.96] tracking-[-0.05em] will-change-transform">
              Come see it in<br />
              person.
            </h2>
          </div>

          <p className="showroom-desc text-[#F4F0E8]/70 text-sm sm:text-base leading-relaxed max-w-md will-change-transform">
            Visit our showroom in Agrabad, Chattogram. Feel the timber, test the comfort, and explore our bespoke furniture collections firsthand.
          </p>

          <address className="showroom-address text-[#F4F0E8]/85 text-xs sm:text-sm not-italic leading-relaxed will-change-transform">
            <span className="font-medium text-[#F4F0E8]">Agrabad Access Road</span>
            <br />
            <span className="text-[#F4F0E8]/60">Chattogram, Bangladesh</span>
          </address>

          <div className="showroom-btn pt-2 will-change-transform">
            <InteractiveHoverButton
              as="a"
              href="https://maps.google.com/?q=Agrabad+Access+Road,+Chattogram,+Bangladesh"
              target="_blank"
              rel="noopener noreferrer"
              variant="white"
              className="w-fit"
            >
              Get Directions
            </InteractiveHoverButton>
          </div>
        </div>

        {/* Google Maps Column */}
        <figure className="lg:col-span-7 w-full m-0">
          <div
            ref={mapWrapRef}
            className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-auto lg:h-[580px] xl:h-[640px] overflow-hidden bg-[#F4F0E8]/5 border border-[#F4F0E8]/15 will-change-transform"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.6353351581647!2d91.79051037701385!3d22.32962714182866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd999401bf62b%3A0xcd9639571c8d5c27!2sHeaven%20Furniture%20Mart!5e0!3m2!1sen!2sbd!4v1788610586987!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Heaven Furniture Mart Google Maps"
              className="w-full h-full"
            />
          </div>
        </figure>
      </div>
    </section>
  );
}
