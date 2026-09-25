import React from 'react';
import { StudioImage } from './StudioImage';

export const LifestyleDetailSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 px-6 md:px-10 lg:px-16 bg-[#F1ECE2] border-t border-[#141414]/10">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-14">
        {/* Subtle smaller framed lifestyle polaroid */}
        <div className="w-48 sm:w-56 md:w-64 shrink-0">
          <div className="p-3 sm:p-4 bg-white rounded-2xl shadow-[0_10px_30px_rgba(20,20,20,0.06)] border border-[#141414]/10 -rotate-2 hover:rotate-0 transition-transform duration-300">
            <div className="rounded-xl overflow-hidden aspect-[3/4] bg-[#EFE9DF]">
              <StudioImage
                src="/IMG_5974+(1).webp"
                alt="Studio Daisie Wall Archive - Personal Heritage & Founder Story"
                fallbackType="polaroid"
                className="w-full h-full object-cover grayscale contrast-105"
              />
            </div>
            <div className="pt-3 pb-1 text-center">
              <span className="text-[10px] tracking-[0.2em] font-mono text-[#141414]/50 uppercase">
                EST. 2021 // SYDNEY
              </span>
            </div>
          </div>
        </div>

        {/* Narrative storytelling block */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[#DCA59F] text-xs">✦</span>
            <span className="text-xs font-semibold tracking-[0.22em] text-[#141414]/70 uppercase">
              STUDIO JOURNAL & ETHOS
            </span>
          </div>

          <h3 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-[#141414] mb-4">
            CRAFTED WITH INTENTION
          </h3>

          <p className="text-xs sm:text-sm text-[#141414]/80 font-light leading-relaxed mb-4">
            Studio Daisie began with a solitary chair, an arched mirror, and a simple conviction: that hair appointments should feel like taking a deep, restorative breath.
          </p>

          <p className="text-xs sm:text-sm text-[#141414]/80 font-light leading-relaxed">
            Every product on our shelves is chosen for clean ingredient safety and cruelty-free Australian provenance. No synthetic masking fragrances, no hurried turnaround—just thoughtful craftsmanship tailored to how you live.
          </p>
        </div>
      </div>
    </section>
  );
};
