import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'HOME', href: '#home' },
    { label: 'SERVICES', href: '#services' },
    { label: 'ABOUT', href: '#about' },
    { label: 'LOOKS', href: '#looks' },
    { label: 'CONTACT', href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F9F6F0]/90 backdrop-blur-md border-b border-[#141414]/8 py-3.5 shadow-[0_4px_24px_rgba(20,20,20,0.03)]'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* LEFT: Wordmark */}
          <a
            href="#home"
            className="group flex items-center gap-2 text-decoration-none focus-visible:outline-none"
            aria-label="Studio Daisie Home"
          >
            <span className="font-display text-2xl md:text-3xl tracking-tight text-[#141414] font-black uppercase transition-colors">
              STUDIO DAISIE
            </span>
            <span className="hidden sm:inline-block text-[#DCA59F] text-xs font-serif italic tracking-wider opacity-90 transition-transform group-hover:scale-110">
              studio
            </span>
          </a>

          {/* CENTER: Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.href)}
                className="text-xs font-semibold tracking-[0.18em] text-[#141414]/75 hover:text-[#141414] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#141414] hover:after:w-full after:transition-all after:duration-200 cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* RIGHT: Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenBooking}
              className="bg-[#141414] text-[#F9F6F0] hover:bg-[#2A2A28] active:scale-[0.98] transition-all duration-200 rounded-full px-5 md:px-6 py-2.5 text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5 shadow-sm hover:shadow cursor-pointer"
            >
              <span>BOOK NOW</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#DCA59F]" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-[#141414]/5 text-[#141414] transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-[#141414]/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className={`absolute top-0 right-0 w-4/5 max-w-sm h-full bg-[#F9F6F0] p-8 flex flex-col justify-between shadow-2xl transition-transform duration-300 ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="pt-16">
            <div className="border-b border-[#141414]/10 pb-6 mb-8">
              <span className="font-display text-3xl font-black tracking-tight text-[#141414] uppercase block">
                STUDIO DAISIE
              </span>
              <span className="text-xs text-[#141414]/60 font-serif italic mt-1 block">
                Boutique Australian Hair Studio
              </span>
            </div>

            <nav className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleLinkClick(link.href)}
                  className="text-left font-display text-2xl tracking-wider text-[#141414] hover:text-[#DCA59F] transition-colors uppercase flex items-center justify-between py-1"
                >
                  <span>{link.label}</span>
                  <span className="text-xs text-[#141414]/30 font-mono tracking-normal">0{navLinks.indexOf(link) + 1}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="pt-8 border-t border-[#141414]/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full bg-[#141414] text-[#F9F6F0] py-3.5 rounded-full text-xs font-semibold tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-[#2A2A28] transition-colors"
            >
              <span>BOOK AN APPOINTMENT</span>
              <ArrowUpRight className="w-4 h-4 text-[#DCA59F]" />
            </button>

            <p className="text-[11px] text-[#141414]/50 text-center mt-4 tracking-wider">
              142 GLENMORE RD, PADDINGTON NSW
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
