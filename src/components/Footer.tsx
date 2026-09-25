import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#141414] text-[#F9F6F0] pt-20 pb-12 px-6 md:px-10 lg:px-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-16 border-b border-white/10 gap-10">
          <div>
            <span className="text-[#DCA59F] text-xs tracking-[0.25em] font-semibold uppercase block mb-3">
              BOUTIQUE AUSTRALIAN SALON
            </span>
            {/* Massive wordmark */}
            <h2 className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#F9F6F0] uppercase leading-none">
              STUDIO DAISIE
            </h2>
          </div>

          {/* Quick CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button
              onClick={onOpenBooking}
              className="bg-[#DCA59F] text-[#141414] hover:bg-[#E8BFB8] rounded-full px-7 py-3.5 text-xs font-semibold tracking-widest uppercase flex items-center gap-2 transition-colors cursor-pointer"
            >
              <span>BOOK AN APPOINTMENT</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation & Details */}
        <div className="py-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 text-xs">
          {/* Main Nav */}
          <div>
            <span className="font-mono text-[#E4B5B0] text-[10px] tracking-widest uppercase block mb-4">
              PAGES
            </span>
            <ul className="space-y-3 font-semibold tracking-wider uppercase text-white/80">
              <li>
                <button onClick={() => scrollTo('#home')} className="hover:text-white transition-colors cursor-pointer">
                  HOME
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#services')} className="hover:text-white transition-colors cursor-pointer">
                  SERVICES
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#about')} className="hover:text-white transition-colors cursor-pointer">
                  ABOUT
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#looks')} className="hover:text-white transition-colors cursor-pointer">
                  LOOKS
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#contact')} className="hover:text-white transition-colors cursor-pointer">
                  CONTACT
                </button>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <span className="font-mono text-[#E4B5B0] text-[10px] tracking-widest uppercase block mb-4">
              CONNECT
            </span>
            <ul className="space-y-3 font-semibold tracking-wider uppercase text-white/80">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>INSTAGRAM</span>
                  <ArrowUpRight className="w-3 h-3 text-[#DCA59F]" />
                </a>
              </li>
              <li>
                <button onClick={onOpenBooking} className="hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1">
                  <span>BOOKING</span>
                  <ArrowUpRight className="w-3 h-3 text-[#DCA59F]" />
                </button>
              </li>
              <li>
                <a href="mailto:hello@studiodaisie.com.au" className="hover:text-white transition-colors inline-flex items-center gap-1">
                  <span>CONTACT</span>
                  <ArrowUpRight className="w-3 h-3 text-[#DCA59F]" />
                </a>
              </li>
            </ul>
          </div>

          {/* Location */}
          <div className="col-span-2 sm:col-span-1">
            <span className="font-mono text-[#E4B5B0] text-[10px] tracking-widest uppercase block mb-4">
              STUDIO LOCATION
            </span>
            <p className="text-white/70 leading-relaxed font-light mb-2">
              142 Glenmore Road<br />
              Paddington, Sydney NSW 2021<br />
              Australia
            </p>
            <p className="text-white/50 text-[11px]">
              Tue–Fri: 9am – 7pm<br />
              Saturday: 8:30am – 5pm
            </p>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/45 font-mono">
          <span>© {new Date().getFullYear()} STUDIO DAISIE. ALL RIGHTS RESERVED.</span>
          <span className="mt-2 sm:mt-0">HAIR STUDIO // AUSTRALIA</span>
        </div>
      </div>
    </footer>
  );
};
