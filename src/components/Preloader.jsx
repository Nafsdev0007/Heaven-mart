import React, { useState, useEffect, useRef } from 'react';
import Counter from './Counter';

const CRITICAL_ASSETS = [
  '/logo-black.webp',
  '/project-remontada-1.webp',
  '/project-remontada-2.webp',
  '/project-remontada-3.webp',
  '/project-remontada-4.webp',
  '/gallery-living-room-1.webp',
  '/gallery-living-room-2.webp',
  '/gallery-living-room-3.webp',
  '/workshop-craftsmanship.webp',
  '/showroom-facade.webp'
];

export default function Preloader({ onComplete }) {
  const [displayCount, setDisplayCount] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    let active = true;
    let assetsLoaded = false;
    let loadedCount = 0;
    const totalAssets = CRITICAL_ASSETS.length + 1;

    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount >= totalAssets) {
        assetsLoaded = true;
      }
    };

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(checkAllLoaded).catch(checkAllLoaded);
    } else {
      checkAllLoaded();
    }

    CRITICAL_ASSETS.forEach((src) => {
      const img = new Image();
      img.onload = checkAllLoaded;
      img.onerror = checkAllLoaded;
      img.src = src;
    });

    const startTime = performance.now();
    const minDuration = 2800;

    let frameId;
    const update = (now) => {
      if (!active) return;
      const elapsed = now - startTime;
      const timeRatio = Math.min(elapsed / minDuration, 1);
      const easedTime = 1 - Math.pow(1 - timeRatio, 2.5);

      let targetVal = Math.floor(easedTime * 100);

      if (!assetsLoaded && targetVal > 85) {
        targetVal = 85;
      }

      setDisplayCount(targetVal);

      if (timeRatio >= 1 && assetsLoaded) {
        setDisplayCount(100);
        setTimeout(() => {
          if (!active) return;
          setIsFading(true);
          setTimeout(() => {
            if (active && onComplete) onComplete();
          }, 600);
        }, 300);
      } else {
        frameId = requestAnimationFrame(update);
      }
    };

    frameId = requestAnimationFrame(update);

    return () => {
      active = false;
      cancelAnimationFrame(frameId);
    };
  }, [onComplete]);

  return (
    <div
      role="progressbar"
      aria-label="Loading assets"
      aria-valuenow={displayCount}
      aria-valuemin={0}
      aria-valuemax={100}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#173332] text-[#F4F0E8] transition-all duration-700 ease-in-out pointer-events-auto ${isFading ? 'opacity-0 -translate-y-full pointer-events-none' : 'opacity-100 translate-y-0'
        }`}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-baseline justify-center">
          <Counter
            value={displayCount}
            places={[100, 10, 1]}
            fontSize={96}
            gap={4}
            borderRadius={0}
            horizontalPadding={4}
            textColor="#F4F0E8"
            fontWeight={400}
            gradientHeight={20}
            gradientFrom="#173332"
            gradientTo="transparent"
            counterStyle={{
              fontFamily: '"DM Sans", sans-serif'
            }}
          />
          <span className="text-3xl sm:text-4xl font-light text-[#B49A67] ml-2 select-none">
            %
          </span>
        </div>
      </div>
    </div>
  );
}
