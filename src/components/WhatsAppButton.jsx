import React from 'react';
import { InteractiveHoverButton } from './ui/interactive-hover-button';

export default function WhatsAppButton() {
  const whatsappUrl = 'https://wa.me/8801960481983?text=' + encodeURIComponent('Hello Heaven Furniture Mart, I would like to inquire about your bespoke furniture.');

  const handleClick = () => {
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <aside aria-label="Direct WhatsApp Contact" className="fixed bottom-6 right-6 z-40">
      <InteractiveHoverButton
        onClick={handleClick}
        variant="white"
        className="bg-white text-[#173332] border-black/10 shadow-[0_8px_25px_-5px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_30px_-5px_rgba(37,211,102,0.35)] py-2.5 px-6 text-xs sm:text-sm font-medium"
      >
        <div className="inline-flex items-center gap-2">
          <img
            src="/whatsapp-icon.png"
            alt="WhatsApp"
            className="w-4 h-4 object-contain"
          />
          <span>WhatsApp Us</span>
        </div>
      </InteractiveHoverButton>
    </aside>
  );
}
