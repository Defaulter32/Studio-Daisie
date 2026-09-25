/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { AboutSalonSection } from './components/AboutSalonSection';
import { CommunitySection } from './components/CommunitySection';
import { GlassCondensationSection } from './components/GlassCondensationSection';
import { SignatureLooksGallery } from './components/SignatureLooksGallery';
import { LifestyleDetailSection } from './components/LifestyleDetailSection';
import { FinalCTASection } from './components/FinalCTASection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { initImageStore } from './utils/imageStore';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingService, setBookingService] = useState<string | undefined>(undefined);

  useEffect(() => {
    initImageStore();
  }, []);


  const handleOpenBooking = (serviceName?: string) => {
    setBookingService(serviceName);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setBookingService(undefined);
  };

  return (
    <div className="min-h-screen bg-[#F9F6F0] text-[#141414] selection:bg-[#E4B5B0] selection:text-[#141414] font-sans antialiased overflow-x-hidden">
      {/* 1. Header with clean navigation & booking CTA */}
      <Header onOpenBooking={() => handleOpenBooking()} />

      <main>
        {/* 2. Fashion-Editorial Hero with mouse-reactive parallax & IMG_6406.webp */}
        <HeroSection onOpenBooking={() => handleOpenBooking()} />

        {/* 3. Services: CUT (IMG_2845.webp), COLOUR (Screenshot+2026-06-29+202215.webp), STYLE (Screenshot+2026-06-29+202905.webp) */}
        <ServicesSection onSelectServiceToBook={(name) => handleOpenBooking(name)} />

        {/* 4. Salon Interior & Sanctuary: 0D8A1991.webp */}
        <AboutSalonSection />

        {/* 5. Community & Candid Culture: Screenshot+2026-06-29+200827.webp */}
        <CommunitySection />

        {/* 6. Real Physical Wet Glass Condensation Section: IMG_4238.webp */}
        <GlassCondensationSection />

        {/* 7. Signature Looks Editorial Gallery */}
        <SignatureLooksGallery />

        {/* 8. Lifestyle / Framed Studio Detail: IMG_5974+(1).webp */}
        <LifestyleDetailSection />

        {/* 9. Final Minimal Booking CTA */}
        <FinalCTASection onOpenBooking={() => handleOpenBooking()} />
      </main>

      {/* 10. Deep Charcoal Editorial Footer */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* 11. Interactive Booking Flow Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        preselectedService={bookingService}
      />
    </div>
  );
}
