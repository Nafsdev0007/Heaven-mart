import React, { useRef } from 'react';
import { ArrowUp } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Footer({ onQuoteClick }) {
  const footerRef = useRef(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 85%',
        once: true,
      },
      defaults: { ease: 'power3.out' },
    });

    tl.fromTo(
      '.footer-info-item',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 }
    )
      .fromTo(
        '.footer-giant-line',
        { opacity: 0, y: 45 },
        { opacity: 1, y: 0, duration: 1.2, stagger: 0.12 },
        '-=0.6'
      )
      .fromTo(
        '.footer-legal-bar',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.7'
      );
  }, { scope: footerRef });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-[#102826] text-[#F4F0E8] pt-16 sm:pt-24 lg:pt-32 pb-8 sm:pb-12 px-5 sm:px-10 md:px-16 lg:px-24 xl:px-32 2xl:px-40 overflow-hidden font-sans border-t border-[#F4F0E8]/10"
    >
      {/* Subtle architectural monogram watermark in background */}
      <div
        className="absolute -left-10 -top-20 select-none pointer-events-none text-[#F4F0E8]/[0.025] font-fenix text-[38vw] leading-none font-bold"
        aria-hidden="true"
      >
        H
      </div>

      <div className="relative z-10 w-full flex flex-col justify-between min-h-[500px] lg:min-h-[580px]">
        {/* Top Info Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-16 sm:pb-20 lg:pb-24 items-start">
          {/* Address */}
          <div className="footer-info-item lg:col-span-4 space-y-1 text-xs sm:text-sm text-[#F4F0E8]/70 will-change-transform">
            <p className="text-[#F4F0E8] font-medium">Agrabad Access Road,</p>
            <p>Chattogram, Bangladesh</p>
          </div>

          {/* Contact */}
          <div className="footer-info-item lg:col-span-4 space-y-1 text-xs sm:text-sm text-[#F4F0E8]/70 will-change-transform">
            <p>
              Tel:{' '}
              <a
                href="tel:+8801960481983"
                className="text-[#F4F0E8] hover:text-[#B49A67] transition-colors duration-200"
              >
                +880 1960-481983
              </a>
            </p>
            <p>
              <a
                href="mailto:heavenfurnituremart@gmail.com"
                className="hover:text-white transition-colors duration-200"
              >
                heavenfurnituremart@gmail.com
              </a>
            </p>
          </div>

          {/* Socials & Links */}
          <div className="footer-info-item lg:col-span-3 flex flex-col space-y-1 text-xs sm:text-sm text-[#F4F0E8]/70 will-change-transform">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-200 w-fit"
            >
              Facebook
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-200 w-fit"
            >
              Instagram
            </a>
            <a
              href="https://wa.me/8801960481983"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-200 w-fit"
            >
              WhatsApp
            </a>
          </div>
        </div>

        {/* Giant Architectural Brand Headline */}
        <div className="w-full my-auto select-none overflow-hidden py-4 sm:py-6">
          <div className="font-fenix leading-[0.82] tracking-[-0.04em] uppercase">
            <div className="footer-giant-line text-[#F4F0E8] text-[15.5vw] sm:text-[16.5vw] md:text-[17vw] lg:text-[19.5vw] leading-[0.85] will-change-transform">
              HEAVEN
            </div>
            <div className="footer-giant-line text-[#F4F0E8]/35 text-[8.2vw] sm:text-[9.2vw] md:text-[9.8vw] lg:text-[10.5vw] xl:text-[11.5vw] tracking-[-0.065em] sm:tracking-[-0.07em] md:tracking-[-0.045em] leading-[0.85] whitespace-nowrap will-change-transform">
              FURNITURE MART
            </div>
          </div>
        </div>

        {/* Bottom Legal & Navigation Bar */}
        <div className="footer-legal-bar pt-10 sm:pt-14 mt-8 sm:mt-12 border-t border-[#F4F0E8]/10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 text-[10px] sm:text-[11px] text-[#F4F0E8]/50 will-change-transform">
          <div className="space-y-1.5 max-w-xl">
            <p>© 2026 Heaven Furniture Mart — Agrabad Access Road, Chattogram, Bangladesh</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[#F4F0E8]/40">
              <a href="#" className="hover:text-[#F4F0E8] transition-colors">Privacy Policy</a>
              <span>—</span>
              <a href="#" className="hover:text-[#F4F0E8] transition-colors">Cookie Policy</a>
              <span>—</span>
              <a href="#" className="hover:text-[#F4F0E8] transition-colors">Terms of Service</a>
            </div>
          </div>

          <div className="flex items-center gap-6 self-end md:self-auto">
            <p className="text-[#F4F0E8]/45">Chattogram, Bangladesh</p>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="w-8 h-8 sm:w-9 sm:h-9 border border-[#F4F0E8]/25 rounded-[3px] flex items-center justify-center text-[#F4F0E8]/80 hover:text-[#102826] hover:bg-[#F4F0E8] hover:border-[#F4F0E8] transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B49A67]"
            >
              <ArrowUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
