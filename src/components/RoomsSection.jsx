import React, { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const roomCategories = [
  {
    id: '01',
    category: '01 / Living',
    description: 'Sofas, coffee tables, TV units and consoles.',
    image: '/gallery-living-room-1.webp',
    alt: 'Living room interior with handcrafted Heaven Furniture Mart wooden sofa and coffee table',
  },
  {
    id: '02',
    category: '02 / Bedroom',
    description: 'Beds, wardrobes, dressing tables and bedside tables.',
    image: '/project-remontada-3.webp',
    alt: 'Bedroom interior with bespoke wooden bed and wardrobe',
    stagger: true,
  },
  {
    id: '03',
    category: '03 / Dining',
    description: 'Tables, chairs and considered storage pieces.',
    image: '/project-remontada-4.webp',
    alt: 'Dining room interior with solid wood dining table and chairs',
  },
  {
    id: '04',
    category: '04 / Office & Study',
    description: 'Executive tables, bookshelves and workstations.',
    image: '/project-remontada-2.webp',
    alt: 'Executive study interior with wooden desk and bookshelves',
  },
];

export default function RoomsSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Header reveal
    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: headerRef.current,
        start: 'top 85%',
        once: true,
      },
      defaults: { ease: 'power3.out' },
    });

    headerTl
      .fromTo(
        '.room-header-tag',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8 }
      )
      .fromTo(
        '.room-header-title',
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 1.1 },
        '-=0.6'
      )
      .fromTo(
        '.room-header-desc',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9 },
        '-=0.7'
      );

    // Cards reveal & image parallax
    const cards = gsap.utils.toArray('.room-card');
    cards.forEach((card) => {
      const imgWrap = card.querySelector('.room-card-img-wrap');
      const img = card.querySelector('.room-card-img');
      const line = card.querySelector('.room-card-line');
      const title = card.querySelector('.room-card-title');
      const desc = card.querySelector('.room-card-desc');

      const cardTl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          once: true,
        },
        defaults: { ease: 'power3.out' },
      });

      cardTl
        .fromTo(
          imgWrap,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 1.1 }
        )
        .fromTo(
          img,
          { scale: 1.15 },
          { scale: 1.0, duration: 1.4 },
          '-=1.1'
        )
        .fromTo(
          line,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.9, ease: 'power2.out' },
          '-=0.8'
        )
        .fromTo(
          title,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.7'
        )
        .fromTo(
          desc,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.6'
        );

      // Subtle parallax while scrolling
      gsap.fromTo(
        img,
        { yPercent: -5 },
        {
          yPercent: 5,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section
      id="collections"
      ref={sectionRef}
      className="bg-[#F4F0E8] py-12 sm:py-16 md:py-36 w-full px-5 sm:px-10 md:px-16 lg:px-24 xl:px-32 2xl:px-40"
    >
      <div className="w-full">
        <div
          ref={headerRef}
          className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 sm:mb-12 md:mb-20 gap-4 sm:gap-6"
        >
          <div className="space-y-2 sm:space-y-3">
            <span className="room-header-tag text-[#B49A67] text-xs sm:text-[13px] font-normal tracking-tight block will-change-transform">
              The rooms we shape
            </span>
            <h2 className="room-header-title font-fenix text-3xl sm:text-6xl md:text-7xl lg:text-[84px] text-[#173332] leading-none tracking-[-0.05em] will-change-transform">
              Pieces for every room.
            </h2>
          </div>
          <p className="room-header-desc text-[#173332]/65 text-xs sm:text-base max-w-xs leading-relaxed will-change-transform">
            Choose a room to see the kind of pieces we make.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-14 gap-y-8 sm:gap-y-12 md:gap-y-16 lg:gap-y-24">
          {roomCategories.map((item) => (
            <article
              key={item.id}
              className={`room-card flex flex-col ${item.stagger ? 'md:mt-16 lg:mt-24' : ''}`}
            >
              <div className="room-card-img-wrap relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-auto lg:h-[580px] xl:h-[640px] overflow-hidden bg-[#173332]/5 will-change-transform">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="room-card-img w-full h-full object-cover scale-[1.08] will-change-transform"
                  loading="lazy"
                />
              </div>

              <div className="relative pt-5 pb-2 flex items-center justify-between">
                <div className="room-card-line absolute bottom-0 left-0 right-0 h-[1px] bg-[#173332]/25 origin-left will-change-transform" />
                <h3 className="room-card-title text-[#173332] text-base font-normal tracking-wide will-change-transform">
                  {item.category}
                </h3>
                <ArrowUpRight className="room-card-title w-4 h-4 text-[#173332]/70 will-change-transform" aria-hidden="true" />
              </div>

              <p className="room-card-desc pt-2.5 text-[#173332]/65 text-sm leading-relaxed will-change-transform">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
