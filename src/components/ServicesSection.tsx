import React, { useState } from 'react';
import { ArrowUpRight, Check, Clock, DollarSign, X } from 'lucide-react';
import { StudioImage } from './StudioImage';

interface ServicesSectionProps {
  onSelectServiceToBook: (serviceName: string) => void;
}

interface ServiceDetail {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  fallbackType: 'cut' | 'colour' | 'style';
  price: string;
  duration: string;
  includes: string[];
  extendedText: string;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceToBook }) => {
  const [activeModalService, setActiveModalService] = useState<ServiceDetail | null>(null);

  const services: ServiceDetail[] = [
    {
      id: 'cut',
      title: 'CUT',
      subtitle: 'Precision Tailored Cutting',
      description: 'Precision cuts designed around you.',
      image: '/IMG_2845.webp',
      fallbackType: 'cut',
      price: '$140 – $210',
      duration: '60 – 75 min',
      includes: [
        'Detailed lifestyle & texture consultation',
        'Custom scalp detox & organic wash',
        'Precision wet & dry texturizing technique',
        'Signature editorial blowout & style finishing',
      ],
      extendedText:
        'Every cut at Studio Daisie is sculpted to complement your bone structure, hair density, and daily routine. We believe hair should move effortlessly without demanding hours of styling.',
    },
    {
      id: 'colour',
      title: 'COLOUR',
      subtitle: 'Dimensional Balayage & Foil Artistry',
      description: 'Dimensional colour with natural movement.',
      image: '/Screenshot+2026-06-29+202215.webp',
      fallbackType: 'colour',
      price: '$260 – $420',
      duration: '150 – 210 min',
      includes: [
        'Bespoke tonal mapping & formulation',
        'Low-tox ammonia-free O&M hair colour',
        'Seamless face-framing highlight placement',
        'Gloss toner, bond builder & nourishing mask',
      ],
      extendedText:
        'Specializing in seamless, sun-drenched Australian blondes, rich chocolates, and glossy lived-in dimensions that grow out softly without harsh lines.',
    },
    {
      id: 'style',
      title: 'STYLE',
      subtitle: 'Editorial Blowouts & Event Styling',
      description: 'Effortless styling for every occasion.',
      image: '/Screenshot+2026-06-29+202905.webp',
      fallbackType: 'style',
      price: '$95 – $180',
      duration: '45 – 60 min',
      includes: [
        'Luxury shampoo ritual & head massage',
        'Heat protection & volume root prep',
        'Signature bouncy blowout or textured undone waves',
        'Long-wearing weightless finishing mist',
      ],
      extendedText:
        'From voluminous Hollywood red-carpet waves to relaxed, beach-swept undone texture, our styling celebrates natural shine and fluid movement.',
    },
  ];

  return (
    <section id="services" className="py-20 lg:py-32 px-6 md:px-10 lg:px-16 bg-[#F9F6F0]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 pb-6 border-b border-[#141414]/10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#DCA59F] text-xs">✦</span>
              <span className="text-xs font-semibold tracking-[0.22em] text-[#141414]/70 uppercase">
                OUR SERVICES
              </span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-[-0.02em] text-[#141414]">
              DESIGNED AROUND YOU
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#141414]/65 max-w-sm mt-4 md:mt-0 font-light leading-relaxed">
            Every appointment begins with a considered consultation to tailor precision cutting, clean color chemistry, and effortless finish.
          </p>
        </div>

        {/* 3 Major Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => setActiveModalService(service)}
              className="group relative bg-[#1E1917] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_12px_35px_rgba(20,20,20,0.06)] cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(20,20,20,0.12)] border border-[#141414]/5"
            >
              {/* Card Image */}
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <StudioImage
                  src={service.image}
                  alt={`Studio Daisie ${service.title} Service`}
                  fallbackType={service.fallbackType}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Subtle dark gradient scrim at bottom for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/90 via-[#141414]/25 to-transparent pointer-events-none" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 sm:p-7 flex flex-col justify-end">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <h3 className="font-display font-black text-4xl sm:text-5xl md:text-5xl lg:text-6xl text-[#F9F6F0] tracking-tight uppercase leading-none mb-2">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/80 font-light max-w-[220px] leading-snug">
                        {service.description}
                      </p>
                    </div>

                    {/* Small circular dusty-pink arrow button */}
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#DCA59F] text-[#141414] flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#E8BFB8] shadow-md">
                      <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Info Bar on bottom */}
              <div className="bg-[#141414] px-6 py-3 flex items-center justify-between text-[11px] text-[#F9F6F0]/70 font-mono tracking-wider">
                <span>{service.duration}</span>
                <span className="text-[#DCA59F] font-semibold">{service.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Detail Modal */}
      {activeModalService && (
        <div
          className="fixed inset-0 z-50 bg-[#141414]/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          onClick={() => setActiveModalService(null)}
        >
          <div
            className="bg-[#F9F6F0] rounded-3xl max-w-2xl w-full p-6 sm:p-8 md:p-10 shadow-2xl relative border border-[#141414]/10 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalService(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-[#141414]/5 text-[#141414] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-[#DCA59F] text-xs">✦</span>
              <span className="text-xs font-semibold tracking-[0.2em] text-[#141414]/70 uppercase">
                {activeModalService.subtitle}
              </span>
            </div>

            <h3 className="font-display font-black text-4xl sm:text-5xl uppercase tracking-tight text-[#141414] mb-4">
              {activeModalService.title}
            </h3>

            <p className="text-sm text-[#141414]/80 leading-relaxed font-light mb-6">
              {activeModalService.extendedText}
            </p>

            {/* Price & Duration */}
            <div className="flex flex-wrap gap-4 p-4 rounded-2xl bg-[#F1ECE2] border border-[#141414]/5 mb-6">
              <div className="flex items-center gap-2 text-xs font-medium text-[#141414]">
                <Clock className="w-4 h-4 text-[#DCA59F]" />
                <span>Duration: {activeModalService.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#141414]">
                <DollarSign className="w-4 h-4 text-[#DCA59F]" />
                <span>Investment: {activeModalService.price}</span>
              </div>
            </div>

            {/* Inclusions */}
            <div className="mb-8">
              <h4 className="text-xs font-semibold tracking-[0.16em] uppercase text-[#141414] mb-3">
                Service Experience Includes
              </h4>
              <ul className="space-y-2.5">
                {activeModalService.includes.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-[#141414]/75">
                    <span className="w-4 h-4 rounded-full bg-[#DCA59F]/30 text-[#141414] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-wrap items-center justify-end gap-3 pt-6 border-t border-[#141414]/10">
              <button
                onClick={() => setActiveModalService(null)}
                className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#141414]/70 hover:text-[#141414]"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const serviceName = activeModalService.title;
                  setActiveModalService(null);
                  onSelectServiceToBook(serviceName);
                }}
                className="bg-[#141414] text-[#F9F6F0] hover:bg-[#2B2A28] rounded-full px-7 py-3.5 text-xs font-semibold uppercase tracking-widest flex items-center gap-2 shadow hover:shadow-md cursor-pointer"
              >
                <span>BOOK THIS SERVICE</span>
                <ArrowUpRight className="w-4 h-4 text-[#DCA59F]" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
