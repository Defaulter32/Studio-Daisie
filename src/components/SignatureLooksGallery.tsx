import React, { useState } from 'react';
import { StudioImage } from './StudioImage';
import { ArrowUpRight, Maximize2, X, Sparkles } from 'lucide-react';

interface GalleryItem {
  id: string;
  image: string;
  fallbackType: 'cut' | 'colour' | 'style' | 'polaroid';
  tag: 'SIGNATURE' | 'TEXTURE' | 'COLOUR' | 'STUDIO';
  title: string;
  aspect: string;
  notes: string;
}

export const SignatureLooksGallery: React.FC = () => {
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 'look-1',
      image: '/Screenshot+2026-06-29+202905.webp',
      fallbackType: 'style',
      tag: 'SIGNATURE',
      title: 'Effortless Sunlit Waves & Soft Volume',
      aspect: 'aspect-[3/4]',
      notes: 'Lived-in cascading blonde with hand-painted face-framing ribbons.',
    },
    {
      id: 'look-2',
      image: '/Screenshot+2026-06-29+202215.webp',
      fallbackType: 'colour',
      tag: 'COLOUR',
      title: 'Dimensional Seamless Blonde Balayage',
      aspect: 'aspect-[4/5]',
      notes: 'Natural root melt blend into cool beige-honey tones with healthy gloss.',
    },
    {
      id: 'look-3',
      image: '/IMG_2845.webp',
      fallbackType: 'cut',
      tag: 'TEXTURE',
      title: 'Architectural Blunt Lob & Internal Movement',
      aspect: 'aspect-[3/4]',
      notes: 'Clean baseline perimeter tailored to neckline, maintaining weight and airiness.',
    },
    {
      id: 'look-4',
      image: '/IMG_5974+(1).webp',
      fallbackType: 'polaroid',
      tag: 'STUDIO',
      title: 'Studio Daisie Wall Archive · Paddington',
      aspect: 'aspect-[4/5]',
      notes: 'Candid moments of our community celebrating personal style.',
    },
  ];

  return (
    <section id="looks" className="py-20 lg:py-32 px-6 md:px-10 lg:px-16 bg-[#F9F6F0]">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 pb-6 border-b border-[#141414]/10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#DCA59F] text-xs">✦</span>
              <span className="text-xs font-semibold tracking-[0.24em] text-[#141414]/70 uppercase">
                PORTFOLIO ARCHIVE
              </span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight text-[#141414]">
              SIGNATURE LOOKS
            </h2>
          </div>

          <div className="mt-4 md:mt-0 text-left md:text-right">
            <span className="text-xs text-[#141414]/60 font-serif italic block mb-1">
              Honest salon transformations
            </span>
            <span className="text-xs font-mono text-[#141414]/50">CURATED EDIT // 2026</span>
          </div>
        </div>

        {/* Irregular Editorial Gallery Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Card 1: Large Feature (5 cols) */}
          <div
            onClick={() => setActiveLightbox(galleryItems[0])}
            className="lg:col-span-6 group relative rounded-3xl overflow-hidden shadow-[0_12px_36px_rgba(20,20,20,0.06)] bg-[#1E1917] cursor-pointer border border-[#141414]/5"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden">
              <StudioImage
                src={galleryItems[0].image}
                alt={galleryItems[0].title}
                fallbackType={galleryItems[0].fallbackType}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />

              {/* Tag & Overlay */}
              <div className="absolute top-5 left-5 bg-[#141414]/85 text-[#F9F6F0] backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] font-mono tracking-widest uppercase border border-white/10 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DCA59F]" />
                <span>{galleryItems[0].tag}</span>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/90 via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-[#F9F6F0] uppercase tracking-tight mb-1">
                    {galleryItems[0].title}
                  </h3>
                  <p className="text-xs text-white/70 font-light max-w-sm">
                    {galleryItems[0].notes}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#DCA59F] text-[#141414] flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 & 3: Staggered Right Column (6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-6 lg:gap-8">
            <div
              onClick={() => setActiveLightbox(galleryItems[1])}
              className="group relative rounded-3xl overflow-hidden shadow-[0_12px_36px_rgba(20,20,20,0.06)] bg-[#1E1917] cursor-pointer border border-[#141414]/5"
            >
              <div className="relative aspect-[16/11] w-full overflow-hidden">
                <StudioImage
                  src={galleryItems[1].image}
                  alt={galleryItems[1].title}
                  fallbackType={galleryItems[1].fallbackType}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute top-5 left-5 bg-[#141414]/85 text-[#F9F6F0] backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] font-mono tracking-widest uppercase border border-white/10 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#DCA59F]" />
                  <span>{galleryItems[1].tag}</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/90 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                  <div>
                    <h3 className="font-display font-black text-2xl text-[#F9F6F0] uppercase tracking-tight">
                      {galleryItems[1].title}
                    </h3>
                    <p className="text-xs text-white/70 font-light">
                      {galleryItems[1].notes}
                    </p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-[#DCA59F] text-[#141414] flex items-center justify-center shrink-0">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Card 3: Texture Cut */}
              <div
                onClick={() => setActiveLightbox(galleryItems[2])}
                className="group relative rounded-3xl overflow-hidden shadow-[0_12px_36px_rgba(20,20,20,0.06)] bg-[#1E1917] cursor-pointer border border-[#141414]/5"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <StudioImage
                    src={galleryItems[2].image}
                    alt={galleryItems[2].title}
                    fallbackType={galleryItems[2].fallbackType}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute top-4 left-4 bg-[#141414]/85 text-[#F9F6F0] backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-mono tracking-widest uppercase border border-white/10">
                    <span>{galleryItems[2].tag}</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/90 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="font-display font-black text-lg text-[#F9F6F0] uppercase leading-tight">
                      {galleryItems[2].title}
                    </h4>
                  </div>
                </div>
              </div>

              {/* Card 4: Polaroid Studio */}
              <div
                onClick={() => setActiveLightbox(galleryItems[3])}
                className="group relative rounded-3xl overflow-hidden shadow-[0_12px_36px_rgba(20,20,20,0.06)] bg-[#1E1917] cursor-pointer border border-[#141414]/5"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <StudioImage
                    src={galleryItems[3].image}
                    alt={galleryItems[3].title}
                    fallbackType={galleryItems[3].fallbackType}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute top-4 left-4 bg-[#141414]/85 text-[#F9F6F0] backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-mono tracking-widest uppercase border border-white/10">
                    <span>{galleryItems[3].tag}</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/90 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="font-display font-black text-lg text-[#F9F6F0] uppercase leading-tight">
                      {galleryItems[3].title}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightbox && (
        <div
          className="fixed inset-0 z-50 bg-[#141414]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setActiveLightbox(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-[#1E1917] rounded-3xl overflow-hidden border border-white/15 p-4 sm:p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveLightbox(null)}
              className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-[#141414]/80 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[4/5] sm:aspect-[16/11] rounded-2xl overflow-hidden mb-5">
              <StudioImage
                src={activeLightbox.image}
                alt={activeLightbox.title}
                fallbackType={activeLightbox.fallbackType}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2">
              <div>
                <span className="text-[10px] font-mono text-[#DCA59F] uppercase tracking-widest block mb-1">
                  TAG // {activeLightbox.tag}
                </span>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-[#F9F6F0] uppercase">
                  {activeLightbox.title}
                </h3>
                <p className="text-xs text-white/70 font-light mt-1 max-w-lg">
                  {activeLightbox.notes}
                </p>
              </div>

              <span className="text-xs font-mono text-white/40">STUDIO DAISIE SYDNEY</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
