import React from 'react';
import { StudioImage } from './StudioImage';
import { Heart, Sparkles } from 'lucide-react';

export const CommunitySection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 px-6 md:px-10 lg:px-16 bg-[#F9F6F0] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative bg-[#EAE3D7] rounded-3xl p-8 sm:p-12 md:p-16 lg:p-20 overflow-hidden">
          {/* Subtle background grain & soft accent glow */}
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#DCA59F]/25 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
            {/* LEFT: Editorial Heading & Human Manifesto */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[#DCA59F] text-xs">✦</span>
                <span className="text-xs font-semibold tracking-[0.22em] text-[#141414]/70 uppercase">
                  PEOPLE & CULTURE
                </span>
              </div>

              <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight text-[#141414] leading-[0.9] mb-6">
                MORE THAN
                <span className="block text-[#DCA59F]">A HAIR</span>
                <span className="block">APPOINTMENT.</span>
              </h2>

              <p className="text-base sm:text-lg text-[#141414] font-serif italic mb-6">
                “Good hair, good people, good moments.”
              </p>

              <p className="text-xs sm:text-sm text-[#141414]/75 font-light leading-relaxed max-w-lg mb-8">
                We believe the feeling you take away from our studio matters just as much as the bounce in your hair. Studio Daisie was built by friends, for people who appreciate honest conversations, sincere laughter, and leaving our chairs feeling completely, unapologetically themselves.
              </p>

              <div className="flex items-center gap-6 pt-4 border-t border-[#141414]/15">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-[#DCA59F]" />
                  <span className="text-xs font-semibold tracking-wider text-[#141414] uppercase">
                    100% Genuine Care
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#DCA59F]" />
                  <span className="text-xs font-semibold tracking-wider text-[#141414] uppercase">
                    Lived-In Confidence
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT: Asymmetric Candid Lifestyle Photo: Screenshot+2026-06-29+200827.webp */}
            <div className="lg:col-span-6 relative flex justify-center">
              {/* Asymmetric offset polaroid/magazine back layer */}
              <div className="absolute -top-3 -right-3 sm:-top-5 sm:-right-5 w-full h-full bg-[#141414] rounded-2xl sm:rounded-3xl rotate-2 opacity-90 pointer-events-none" />

              <div className="relative w-full max-w-md rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#181514] -rotate-1 transition-transform duration-500 hover:rotate-0">
                <StudioImage
                  src="/Screenshot+2026-06-29+200827.webp"
                  alt="Studio Daisie Community - Candid Friendship & Joyful Moments"
                  fallbackType="community"
                  className="w-full aspect-[4/5] object-cover"
                />

                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5 text-white">
                  <span className="text-[10px] font-mono tracking-widest text-[#E4B5B0] uppercase block">
                    CANDID FLASH // STUDIO ARCHIVE
                  </span>
                  <p className="text-xs font-serif italic text-white/90 mt-0.5">
                    Post-appointment drinks & celebration
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
