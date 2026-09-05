import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Check } from 'lucide-react';
import { gsap } from 'gsap';
import { InteractiveHoverButton } from './ui/interactive-hover-button';

export default function QuoteModal({ isOpen, onClose, initialRoom = 'Living Room' }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    roomType: initialRoom || 'Living Room',
    notes: '',
  });

  const firstInputRef = useRef(null);
  const overlayRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    setFormData(prev => ({
      ...prev,
      roomType: initialRoom || prev.roomType || 'Living Room'
    }));

    if (overlayRef.current && cardRef.current) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.95, y: 15 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'power3.out' }
      );
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleReset();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    if (overlayRef.current && cardRef.current) {
      gsap.to(cardRef.current, {
        opacity: 0,
        scale: 0.95,
        y: 10,
        duration: 0.25,
        ease: 'power2.in',
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          setSubmitted(false);
          onClose();
        },
      });
    } else {
      setSubmitted(false);
      onClose();
    }
  };

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="fixed inset-0" 
        onClick={handleReset} 
        aria-hidden="true" 
      />

      <div
        ref={cardRef}
        className="relative z-10 w-full max-w-lg bg-[#173332] border border-[#F4F0E8]/15 rounded-[4px] shadow-2xl p-7 sm:p-9 text-[#F4F0E8] will-change-transform"
      >
        <button
          type="button"
          onClick={handleReset}
          className="absolute top-5 right-5 p-1.5 text-[#F4F0E8]/60 hover:text-[#F4F0E8] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B49A67]"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        {submitted ? (
          <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full border border-[#B49A67] flex items-center justify-center text-[#B49A67]">
              <Check className="w-6 h-6" aria-hidden="true" />
            </div>
            <h3 id="modal-title" className="font-fenix text-3xl text-[#F4F0E8]">
              Thank you
            </h3>
            <p className="text-sm text-[#F4F0E8]/75 max-w-xs leading-relaxed">
              We have received your quote request. We will contact you shortly.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-4 px-6 py-2.5 bg-[#F4F0E8] text-[#173332] rounded-[3px] text-[13px] font-normal hover:bg-[#B49A67] hover:text-white transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="flex flex-col space-y-6">
            <div>
              <span className="text-[#B49A67] text-[13px] font-normal tracking-tight block">
                Bespoke request
              </span>
              <h3 id="modal-title" className="font-fenix text-3xl text-[#F4F0E8] mt-1">
                Request a quote
              </h3>
              <p className="text-xs text-[#F4F0E8]/65 mt-1">
                Tell us about your room, dimensions, or the pieces you need.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <div>
                <label htmlFor="quote-name" className="block text-xs text-[#F4F0E8]/80 mb-1">
                  Your name *
                </label>
                <input
                  id="quote-name"
                  ref={firstInputRef}
                  type="text"
                  required
                  placeholder="e.g. Nafis Rahman"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#102826] border border-[#F4F0E8]/20 rounded-[3px] px-3.5 py-2.5 text-sm text-[#F4F0E8] placeholder-[#F4F0E8]/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B49A67]"
                />
              </div>

              <div>
                <label htmlFor="quote-phone" className="block text-xs text-[#F4F0E8]/80 mb-1">
                  Phone number *
                </label>
                <input
                  id="quote-phone"
                  type="tel"
                  required
                  placeholder="+880 1XXXXXXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#102826] border border-[#F4F0E8]/20 rounded-[3px] px-3.5 py-2.5 text-sm text-[#F4F0E8] placeholder-[#F4F0E8]/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B49A67]"
                />
              </div>

              <div>
                <label htmlFor="quote-room" className="block text-xs text-[#F4F0E8]/80 mb-1">
                  Room category
                </label>
                <select
                  id="quote-room"
                  value={formData.roomType}
                  onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                  className="w-full bg-[#102826] border border-[#F4F0E8]/20 rounded-[3px] px-3.5 py-2.5 text-sm text-[#F4F0E8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B49A67]"
                >
                  <option value="Living Room" className="bg-[#102826]">Living Room</option>
                  <option value="Bedroom" className="bg-[#102826]">Bedroom</option>
                  <option value="Dining Room" className="bg-[#102826]">Dining Room</option>
                  <option value="Office & Study" className="bg-[#102826]">Office & Study</option>
                  <option value="Complete Home" className="bg-[#102826]">Complete Home</option>
                </select>
              </div>

              <div>
                <label htmlFor="quote-notes" className="block text-xs text-[#F4F0E8]/80 mb-1">
                  Details or dimensions
                </label>
                <textarea
                  id="quote-notes"
                  rows="3"
                  placeholder="Describe your room, preferences or required furniture..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-[#102826] border border-[#F4F0E8]/20 rounded-[3px] px-3.5 py-2.5 text-sm text-[#F4F0E8] placeholder-[#F4F0E8]/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B49A67] resize-none"
                />
              </div>

              <div className="pt-2">
                <InteractiveHoverButton
                  type="submit"
                  variant="white"
                  className="w-full text-[13px]"
                >
                  Submit request
                </InteractiveHoverButton>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
