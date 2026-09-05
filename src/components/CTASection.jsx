import React, { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { InteractiveHoverButton } from './ui/interactive-hover-button';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function CTASection({ onQuoteClick }) {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const actionRef = useRef(null);

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
      '.cta-eyebrow',
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8 }
    )
      .fromTo(
        '.cta-heading',
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 1.1 },
        '-=0.6'
      )
      .fromTo(
        '.cta-description',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9 },
        '-=0.7'
      )
      .fromTo(
        '.cta-action',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.7'
      );
  }, { scope: sectionRef });

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="bg-[#173332] py-16 sm:py-24 md:py-36 lg:py-44 w-full px-5 sm:px-10 md:px-16 lg:px-24 xl:px-32 2xl:px-40 text-[#F4F0E8] border-t border-[#F4F0E8]/10 overflow-hidden"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 xl:gap-24 items-end">
        {/* Left 8 Columns: Eyebrow + Monumental Headline */}
        <div ref={headlineRef} className="lg:col-span-8 space-y-3 sm:space-y-4">
          <span className="cta-eyebrow text-[#B49A67] text-xs sm:text-[13px] font-normal tracking-tight block will-change-transform">
            Your next piece starts with a conversation
          </span>

          <h2 className="cta-heading font-fenix text-3xl sm:text-6xl md:text-7xl lg:text-[84px] text-[#F4F0E8] leading-[0.96] tracking-[-0.05em] will-change-transform">
            Let’s make something<br />
            that belongs to your<br />
            space.
          </h2>
        </div>

        {/* Right 4 Columns: Context + Action */}
        <div ref={actionRef} className="lg:col-span-4 flex flex-col space-y-6 lg:pb-2">
          <p className="cta-description text-[#F4F0E8]/70 text-sm sm:text-base leading-relaxed will-change-transform">
            Tell us what you’re imagining. We’ll help you shape it around your room, your comfort, and your taste.
          </p>

          <div className="cta-action space-y-4 pt-1 will-change-transform">
            <InteractiveHoverButton
              type="button"
              onClick={onQuoteClick}
              variant="white"
            >
              Request a Quote
            </InteractiveHoverButton>

            <p className="text-xs text-[#F4F0E8]/50">
              Or call us directly:{' '}
              <a
                href="tel:+8801960481983"
                className="text-[#F4F0E8]/80 hover:text-[#B49A67] transition-colors underline underline-offset-4 decoration-[#F4F0E8]/20 inline-flex items-center gap-1"
              >
                <span>+880 1960-481983</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
