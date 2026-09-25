import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { StudioImage } from './StudioImage';

interface HeroSectionProps {
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax positions with smooth interpolation
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
  const isTouchRef = useRef(false);

  useEffect(() => {
    // Check for touch / coarse pointer
    if (window.matchMedia('(pointer: coarse)').matches) {
      isTouchRef.current = true;
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || isTouchRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Normalize cursor coordinate from center (-1 to 1)
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setTargetPos({
        x: Math.max(-1, Math.min(1, x)),
        y: Math.max(-1, Math.min(1, y)),
      });
    };

    const handleMouseLeave = () => {
      setTargetPos({ x: 0, y: 0 });
    };

    const container = containerRef.current;
    if (container) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    // Smooth physics loop with delayed easing
    let animationFrameId: number;
    const lerpFactor = 0.055; // slow, luxurious, editorial settling

    const updatePhysics = () => {
      setCurrentPos((prev) => {
        const dx = targetPos.x - prev.x;
        const dy = targetPos.y - prev.y;
        if (Math.abs(dx) < 0.0001 && Math.abs(dy) < 0.0001) {
          return targetPos;
        }
        return {
          x: prev.x + dx * lerpFactor,
          y: prev.y + dy * lerpFactor,
        };
      });
      animationFrameId = requestAnimationFrame(updatePhysics);
    };

    animationFrameId = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (container) {
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [targetPos]);

  // Movement layer offsets based on prompt hierarchy:
  // Layer 1 (Typography): almost stationary (1 - 3px)
  const typoX = currentPos.x * 2;
  const typoY = currentPos.y * 2;

  // Layer 2 (Hero photograph): subtle movement (5 - 14px)
  const photoX = currentPos.x * 10;
  const photoY = currentPos.y * 8;

  // Layer 3 (Decorative organic flower/blob): primary reactive (35 - 55px)
  const blobX = currentPos.x * 48;
  const blobY = currentPos.y * 42;

  // Layer 4 (Small badge): 15 - 24px
  const badgeX = currentPos.x * 20;
  const badgeY = currentPos.y * 18;

  // Layer 5 (Small decorative accent): 12 - 20px
  const accentX = currentPos.x * 16;
  const accentY = currentPos.y * 14;

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-[92vh] lg:min-h-screen pt-28 lg:pt-32 pb-16 lg:pb-24 px-6 md:px-10 lg:px-16 overflow-hidden flex items-center bg-[#F9F6F0]"
    >
      {/* Decorative Organic Flower / Blob (Layer 3 - Primary reactive) */}
      <div
        className="absolute top-1/3 right-10 lg:right-1/4 w-72 h-72 md:w-96 md:h-96 rounded-full pointer-events-none transition-transform will-change-transform opacity-70"
        style={{
          transform: `translate3d(${blobX}px, ${blobY}px, 0)`,
          background: 'radial-gradient(circle, rgba(220,165,159,0.38) 0%, rgba(244,228,225,0.2) 50%, transparent 75%)',
          filter: 'blur(32px)',
        }}
      />

      {/* Decorative Organic Petal / Flower SVG Accent */}
      <div
        className="absolute bottom-16 left-8 lg:left-1/3 w-32 h-32 md:w-44 md:h-44 pointer-events-none transition-transform will-change-transform opacity-40"
        style={{
          transform: `translate3d(${accentX}px, ${accentY}px, 0) rotate(12deg)`,
        }}
      >
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-[#DCA59F]">
          <path
            d="M100 20 C120 60 160 80 180 100 C160 120 120 140 100 180 C80 140 40 120 20 100 C40 80 80 60 100 20 Z"
            fill="currentColor"
            opacity="0.25"
          />
          <circle cx="100" cy="100" r="16" fill="currentColor" opacity="0.4" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* LEFT SIDE TEXT (Layer 1 - Almost stationary typography) */}
        <div
          className="lg:col-span-6 xl:col-span-5 flex flex-col items-start will-change-transform"
          style={{
            transform: `translate3d(${typoX}px, ${typoY}px, 0)`,
          }}
        >
          {/* Small label with dusty-pink star */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-[#DCA59F] text-xs">✦</span>
            <span className="text-xs font-semibold tracking-[0.25em] text-[#141414]/70 uppercase">
              STUDIO DAISIE / HAIR STUDIO
            </span>
          </div>

          {/* Main Headline: Large condensed display typography */}
          <h1 className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] leading-[0.88] tracking-[-0.03em] uppercase text-[#141414] mb-8">
            <span className="block">YOUR</span>
            <span className="block">HAIR.</span>
            <span className="block text-[#DCA59F]">YOUR</span>
            <span className="block">IDENTITY.</span>
          </h1>

          {/* Supporting line */}
          <div className="flex items-center gap-3 text-xs md:text-sm font-semibold tracking-[0.2em] text-[#141414]/80 uppercase mb-8 border-l-2 border-[#DCA59F] pl-3 py-0.5">
            <span>CUT</span>
            <span className="text-[#DCA59F]">/</span>
            <span>COLOUR</span>
            <span className="text-[#DCA59F]">/</span>
            <span>STYLE</span>
          </div>

          <p className="text-sm md:text-base text-[#141414]/75 font-light leading-relaxed max-w-md mb-10">
            A bespoke Australian boutique salon specializing in high-fashion editorial hair, tailored dimensional balayage, and natural, effortless movement.
          </p>

          {/* Primary CTA */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenBooking}
              className="bg-[#141414] text-[#F9F6F0] hover:bg-[#2B2A28] active:scale-[0.98] transition-all duration-200 rounded-full px-8 py-4 text-xs md:text-sm font-semibold tracking-[0.16em] uppercase flex items-center gap-3 shadow-md hover:shadow-lg cursor-pointer group"
            >
              <span>BOOK YOUR LOOK</span>
              <ArrowRight className="w-4 h-4 text-[#DCA59F] transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            <a
              href="#services"
              className="text-xs font-semibold tracking-[0.18em] uppercase text-[#141414]/80 hover:text-[#141414] px-4 py-3 transition-colors flex items-center gap-1.5"
            >
              <span>EXPLORE SERVICES</span>
            </a>
          </div>
        </div>

        {/* RIGHT / DOMINANT VISUAL SIDE: Hero Photograph IMG_6406.webp */}
        <div className="lg:col-span-6 xl:col-span-7 relative flex justify-center lg:justify-end items-center">
          <div
            className="relative w-full max-w-md sm:max-w-lg lg:max-w-none will-change-transform"
            style={{
              transform: `translate3d(${photoX}px, ${photoY}px, 0)`,
            }}
          >
            {/* Background frame accent */}
            <div className="absolute -inset-3 sm:-inset-4 bg-[#EAE3D7] rounded-3xl -rotate-1 pointer-events-none" />

            {/* Primary Hero Photograph Container */}
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(20,20,20,0.08)] border border-[#141414]/5 bg-[#1E1815]">
              <StudioImage
                src="/IMG_6406.webp"
                alt="Studio Daisie Signature Brunette Blowout Waves - Rich Dimensional Hair Editorial"
                fallbackType="hero"
                className="w-full aspect-[4/5] object-cover object-center transform hover:scale-[1.02] transition-transform duration-700 ease-out"
                priority
              />

              {/* Subtle gradient scrim at base to enhance depth without obscuring hair */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#141414]/40 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between pointer-events-none">
                <div>
                  <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#E4B5B0] block">
                    EDITORIAL ARCHIVE
                  </span>
                  <p className="text-white text-xs font-light">Signature Gloss Wave · Series 01</p>
                </div>
                <span className="text-white/60 text-[11px] font-mono">01 // 08</span>
              </div>
            </div>

            {/* Rotating / Overlapping Badge (Layer 4) */}
            <div
              className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 will-change-transform z-20 cursor-pointer"
              style={{
                transform: `translate3d(${badgeX}px, ${badgeY}px, 0)`,
              }}
              onClick={onOpenBooking}
            >
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#141414] text-[#F9F6F0] p-1 flex items-center justify-center shadow-xl border-2 border-[#F9F6F0] group hover:scale-105 transition-transform">
                {/* Rotating Circular Text */}
                <svg
                  className="w-full h-full animate-spin-slow"
                  viewBox="0 0 100 100"
                >
                  <path
                    id="circlePath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                  <text className="text-[8.5px] font-semibold tracking-[0.22em] uppercase fill-[#F9F6F0]">
                    <textPath xlinkHref="#circlePath" startOffset="0%">
                      • SIGNATURE LOOKS • STUDIO DAISIE •
                    </textPath>
                  </text>
                </svg>

                {/* Badge Center */}
                <div className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-[#DCA59F] text-[#141414] flex flex-col items-center justify-center text-center shadow-inner group-hover:bg-[#E4B5B0] transition-colors">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Small subtle badge accent top right */}
            <div
              className="hidden sm:flex absolute -top-4 -right-4 bg-[#F9F6F0] border border-[#141414]/10 rounded-full py-1.5 px-4 items-center gap-2 shadow-sm will-change-transform"
              style={{
                transform: `translate3d(${accentX}px, ${accentY}px, 0)`,
              }}
            >
              <span className="w-2 h-2 rounded-full bg-[#DCA59F]" />
              <span className="text-[10px] font-semibold tracking-wider text-[#141414] uppercase">
                SYDNEY STUDIO
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
