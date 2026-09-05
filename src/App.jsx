import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import RoomsSection from './components/RoomsSection';
import EverydayLivingSection from './components/EverydayLivingSection';
import MadeToFitSection from './components/MadeToFitSection';
import ShowroomSection from './components/ShowroomSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import QuoteModal from './components/QuoteModal';
import Preloader from './components/Preloader';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  const [selectedRoom, setSelectedRoom] = useState('Living Room');

  const handleOpenQuote = (room = 'Living Room') => {
    if (typeof room === 'string' && room) {
      setSelectedRoom(room);
    }
    setIsQuoteOpen(true);
  };
  const handleCloseQuote = () => setIsQuoteOpen(false);

  const handlePreloaderComplete = () => {
    setLoading(false);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#F4F0E8] text-[#173332] flex flex-col font-sans selection:bg-[#B49A67] selection:text-white">
      {loading && <Preloader onComplete={handlePreloaderComplete} />}
      <Header onQuoteClick={handleOpenQuote} isLoaded={!loading} />
      <main className="flex-grow">
        <HeroSection onQuoteClick={handleOpenQuote} isLoaded={!loading} />
        <RoomsSection />
        <EverydayLivingSection onQuoteClick={handleOpenQuote} />
        <MadeToFitSection onQuoteClick={handleOpenQuote} />
        <ShowroomSection />
        <CTASection onQuoteClick={handleOpenQuote} />
      </main>
      <Footer onQuoteClick={handleOpenQuote} />

      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={handleCloseQuote}
        initialRoom={selectedRoom}
      />
    </div>
  );
}
