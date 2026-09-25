import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface FinalCTASectionProps {
  onOpenBooking: () => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({ onOpenBooking }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [targetOffset, setTargetOffset] = useState({ x: 0, y: 0 });
  const [currentOffset, setCurrentOffset] = useState({ x: 0, y: 0 });
  const isTouchRef = useRef(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      isTouchRef.current = true;
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || isTouchRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setTargetOffset({
        x: Math.max(-1, Math.min(1, x)),
        y: Math.max(-1, Math.min(1, y)),
      });
    };

    const container = containerRef.current;
    if (container) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    let rafId: number;
    const updatePhysics = () => {
      setCurrentOffset((prev) => ({
        x: prev.x + (targetOffset.x - prev.x) * 0.06,
        y: prev.y + (targetOffset.y - prev.y) * 0.06,
      }));
      rafId = requestAnimationFrame(updatePhysics);
    };

    rafId = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [targetOffset]);

  // Subtle mouse-reactive parallax for the decorative shape (~25-45px)
  const flowerX = currentOffset.x * 40;
  const flowerY = currentOffset.y * 35;

  return (
    <section
      id="contact"
      ref={containerRef}
      className="py-28 lg:py-40 px-6 md:px-10 lg:px-16 bg-[#F9F6F0] relative overflow-hidden flex items-center justify-center text-center"
    >
      {/* Decorative Blush Organic Flower Shape (Parallax Reactive) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-96 sm:h-96 pointer-events-none transition-transform will-change-transform opacity-30"
        style={{
          transform: `translate3d(calc(-50% + ${flowerX}px), calc(-50% + ${flowerY}px), 0)`,
        }}
      >
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-[#DCA59F]">
          <path
            d="M 100,20 C 130,50 170,70 180,100 C 170,130 130,150 100,180 C 70,150 30,130 20,100 C 30,70 70,50 100,20 Z"
            fill="currentColor"
          />
          <circle cx="100" cy="100" r="30" fill="#F9F6F0" opacity="0.6" />
        </svg>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-[#DCA59F] text-xs">✦</span>
          <span className="text-xs font-semibold tracking-[0.24em] text-[#141414]/70 uppercase">
            YOUR TRANSFORMATION AWAITS
          </span>
        </div>

        {/* Large minimal headline */}
        <h2 className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-[-0.03em] text-[#141414] leading-[0.88] mb-6">
          YOUR NEXT<br />
          <span className="text-[#DCA59F]">LOOK STARTS</span><br />
          HERE.
        </h2>

        {/* Supporting line */}
        <p className="text-sm sm:text-base text-[#141414]/70 font-light max-w-md mb-10">
          Ready for your next Studio Daisie appointment?
        </p>

        {/* CTA Button: Black rounded button with warm ivory text */}
        <button
          onClick={onOpenBooking}
          className="bg-[#141414] text-[#F9F6F0] hover:bg-[#2B2A28] active:scale-[0.98] transition-all duration-200 rounded-full px-10 py-4 sm:py-5 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase flex items-center gap-3 shadow-lg hover:shadow-xl cursor-pointer group"
        >
          <span>BOOK AN APPOINTMENT</span>
          <ArrowRight className="w-4 h-4 text-[#DCA59F] transition-transform duration-200 group-hover:translate-x-1.5" />
        </button>

        <span className="text-[11px] text-[#141414]/50 tracking-widest uppercase mt-8 font-mono">
          Paddington, Sydney · Tuesday to Saturday
        </span>
      </div>
    </section>
  );
};
