import React, { useState } from 'react';
import { ArrowRight, Sparkles, X, Sun, Coffee, ShieldCheck } from 'lucide-react';
import { StudioImage } from './StudioImage';

export const AboutSalonSection: React.FC = () => {
  const [showStudioTour, setShowStudioTour] = useState(false);

  return (
    <section id="about" className="py-20 lg:py-32 px-6 md:px-10 lg:px-16 bg-[#F1ECE2] relative overflow-hidden">
      {/* Background architectural grid texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#141414_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        {/* Editorial Frame with 0D8A1991.webp (Salon interior photograph) */}
        <div className="lg:col-span-7 order-2 lg:order-1 relative">
          {/* Subtle back decorative frame */}
          <div className="absolute -inset-4 bg-[#E5DDD0] rounded-3xl -rotate-1 pointer-events-none" />

          <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(20,20,20,0.06)] border border-[#141414]/10 bg-[#EDE6DC]">
            <StudioImage
              src="/0D8A1991.webp"
              alt="Studio Daisie Salon Interior - Minimalist Arched Mirrors, Warm Brick & Caramel Leather Styling Chairs in Paddington"
              fallbackType="salon"
              className="w-full aspect-[4/3] sm:aspect-[16/11] object-cover transition-transform duration-700 hover:scale-[1.02]"
            />

            {/* In-image caption tag */}
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-[#141414]/85 text-[#F9F6F0] backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DCA59F] animate-pulse" />
              <span className="text-[10px] font-mono tracking-wider uppercase">
                STUDIO PHYSICAL SPACE // PADDINGTON
              </span>
            </div>
          </div>
        </div>

        {/* Text Editorial Content */}
        <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col items-start">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[#DCA59F] text-xs">✦</span>
            <span className="text-xs font-semibold tracking-[0.25em] text-[#141414]/70 uppercase">
              THE PHYSICAL SANCTUARY
            </span>
          </div>

          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-[-0.02em] text-[#141414] leading-[0.92] mb-6">
            ABOUT
            <span className="block text-[#141414]">STUDIO DAISIE</span>
          </h2>

          <p className="text-base sm:text-lg text-[#141414] font-serif italic mb-6 leading-relaxed">
            “A considered space for beautiful hair, thoughtful colour and effortless style.”
          </p>

          <p className="text-xs sm:text-sm text-[#141414]/75 font-light leading-relaxed mb-8">
            Housed inside a heritage Paddington terrace with sun-drenched whitewashed brick, custom arched mirrors, and tactile caramel leather seating. We designed Studio Daisie as a tranquil counterpoint to hurried salon environments—a sanctuary where hair artistry meets Australian warmth.
          </p>

          <div className="grid grid-cols-2 gap-6 w-full pt-4 pb-8 border-t border-[#141414]/10 mb-2">
            <div>
              <span className="font-display font-black text-2xl text-[#141414] block">0% AMMONIA</span>
              <span className="text-[11px] text-[#141414]/60 uppercase tracking-wider">Clean O&M Formulations</span>
            </div>
            <div>
              <span className="font-display font-black text-2xl text-[#141414] block">1-ON-1 FOCUS</span>
              <span className="text-[11px] text-[#141414]/60 uppercase tracking-wider">Dedicated Stylist Time</span>
            </div>
          </div>

          {/* CTA: DISCOVER THE STUDIO */}
          <button
            onClick={() => setShowStudioTour(true)}
            className="group flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#141414] border-b border-[#141414] pb-1 hover:text-[#DCA59F] hover:border-[#DCA59F] transition-colors cursor-pointer"
          >
            <span>DISCOVER THE STUDIO</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Studio Tour Modal */}
      {showStudioTour && (
        <div
          className="fixed inset-0 z-50 bg-[#141414]/65 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          onClick={() => setShowStudioTour(false)}
        >
          <div
            className="bg-[#F9F6F0] rounded-3xl max-w-2xl w-full p-6 sm:p-10 shadow-2xl relative border border-[#141414]/10 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowStudioTour(false)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-[#141414]/5 text-[#141414] transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-[#DCA59F] text-xs">✦</span>
              <span className="text-xs font-semibold tracking-[0.2em] text-[#141414]/70 uppercase">
                STUDIO SANCTUARY GUIDE
              </span>
            </div>

            <h3 className="font-display font-black text-4xl sm:text-5xl uppercase tracking-tight text-[#141414] mb-4">
              INSIDE STUDIO DAISIE
            </h3>

            <p className="text-sm text-[#141414]/80 leading-relaxed font-light mb-8">
              Every curve of our studio was engineered to foster calm. Natural daylight filters through floor-to-ceiling glass onto hand-rendered fluted plaster surfaces, creating an environment that respects both your senses and your hair.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-[#F1ECE2] border border-[#141414]/5">
                <Sun className="w-5 h-5 text-[#DCA59F] mb-2" />
                <h5 className="text-xs font-semibold uppercase tracking-wider text-[#141414] mb-1">
                  True Colour Light
                </h5>
                <p className="text-[11px] text-[#141414]/70 leading-relaxed">
                  Calibrated daylight so balayage tones reflect true outside the salon.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F1ECE2] border border-[#141414]/5">
                <Coffee className="w-5 h-5 text-[#DCA59F] mb-2" />
                <h5 className="text-xs font-semibold uppercase tracking-wider text-[#141414] mb-1">
                  Artisan Refreshments
                </h5>
                <p className="text-[11px] text-[#141414]/70 leading-relaxed">
                  Single-origin Sydney roast, botanical tisanes, and chilled natural wine.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F1ECE2] border border-[#141414]/5">
                <ShieldCheck className="w-5 h-5 text-[#DCA59F] mb-2" />
                <h5 className="text-xs font-semibold uppercase tracking-wider text-[#141414] mb-1">
                  Low-Tox Haircare
                </h5>
                <p className="text-[11px] text-[#141414]/70 leading-relaxed">
                  Clean O&M Australian formulas free from sulfates, parabens, and ammonia.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#141414] text-[#F9F6F0] flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase text-[#DCA59F] tracking-wider block mb-0.5">
                  VISIT OUR PADDINGTON LOCATION
                </span>
                <p className="text-xs text-white/80">Tue - Sat / 142 Glenmore Rd, Paddington</p>
              </div>
              <button
                onClick={() => setShowStudioTour(false)}
                className="bg-[#DCA59F] text-[#141414] hover:bg-[#E8BFB8] px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors"
              >
                Close Tour
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
