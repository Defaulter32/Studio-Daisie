import React, { useState, useEffect } from 'react';
import { X, Check, Calendar, Clock, User, Sparkles } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedService,
}) => {
  const [selectedService, setSelectedService] = useState('CUT');
  const [stylist, setStylist] = useState('Any Senior Stylist');
  const [date, setDate] = useState('2026-10-06');
  const [time, setTime] = useState('11:00 AM');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setSelectedService(preselectedService.toUpperCase());
    }
  }, [preselectedService]);

  if (!isOpen) return null;

  const serviceOptions = [
    { name: 'CUT', desc: 'Precision Sculpted Cut & Blowout', price: '$140' },
    { name: 'COLOUR', desc: 'Dimensional Balayage & Gloss', price: '$290' },
    { name: 'STYLE', desc: 'Signature Editorial Waves & Prep', price: '$95' },
    { name: 'FULL TRANSFORMATION', desc: 'Cut, Bespoke Foil Artistry & Treatment', price: '$420' },
  ];

  const timeSlots = [
    '09:30 AM',
    '11:00 AM',
    '01:15 PM',
    '03:00 PM',
    '04:45 PM',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#141414]/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
      <div
        className="bg-[#F9F6F0] rounded-3xl max-w-xl w-full p-6 sm:p-8 md:p-10 shadow-2xl relative border border-[#141414]/10 my-auto text-[#141414]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-[#141414]/5 text-[#141414] transition-colors cursor-pointer"
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          /* Confirmation View */
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-[#DCA59F]/30 text-[#141414] flex items-center justify-center mx-auto mb-5">
              <Check className="w-8 h-8 text-[#141414]" />
            </div>

            <span className="text-[#DCA59F] text-xs font-mono tracking-widest uppercase block mb-2">
              CONFIRMATION #SD-{Math.floor(100000 + Math.random() * 900000)}
            </span>

            <h3 className="font-display font-black text-4xl sm:text-5xl uppercase tracking-tight mb-4">
              WE'LL SEE YOU SOON, {name.split(' ')[0]}
            </h3>

            <p className="text-sm text-[#141414]/75 font-light leading-relaxed max-w-md mx-auto mb-8">
              Your appointment request for <strong>{selectedService}</strong> with <strong>{stylist}</strong> on <strong>{date}</strong> at <strong>{time}</strong> has been received. A calendar invitation has been sent to {email || phone}.
            </p>

            <div className="bg-[#F1ECE2] rounded-2xl p-5 mb-8 text-left border border-[#141414]/5">
              <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-[#141414]">
                <Sparkles className="w-3.5 h-3.5 text-[#DCA59F]" />
                <span>Preparation for Your Appointment</span>
              </div>
              <p className="text-xs text-[#141414]/70 leading-relaxed">
                Please arrive with dry hair in its natural state. Enjoy our single-origin pour-over bar or chilled botanical refreshments upon arrival.
              </p>
            </div>

            <button
              onClick={handleReset}
              className="bg-[#141414] text-[#F9F6F0] hover:bg-[#2A2A28] rounded-full px-8 py-3.5 text-xs font-semibold tracking-widest uppercase transition-colors"
            >
              Back to Studio Daisie
            </button>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[#DCA59F] text-xs">✦</span>
                <span className="text-xs font-semibold tracking-[0.2em] text-[#141414]/70 uppercase">
                  RESERVE YOUR APPOINTMENT
                </span>
              </div>
              <h3 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight">
                BOOK YOUR LOOK
              </h3>
            </div>

            {/* Select Service */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider block text-[#141414] mb-2.5">
                1. Select Service
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {serviceOptions.map((svc) => (
                  <button
                    key={svc.name}
                    type="button"
                    onClick={() => setSelectedService(svc.name)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedService === svc.name
                        ? 'bg-[#141414] text-[#F9F6F0] border-[#141414]'
                        : 'bg-white border-[#141414]/10 hover:border-[#141414]/30 text-[#141414]'
                    }`}
                  >
                    <div className="flex items-center justify-between font-display text-lg uppercase font-bold">
                      <span>{svc.name}</span>
                      <span className={selectedService === svc.name ? 'text-[#DCA59F]' : 'text-[#141414]/60'}>
                        {svc.price}
                      </span>
                    </div>
                    <span className="text-[11px] block mt-0.5 opacity-75 font-light leading-snug">
                      {svc.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Stylist & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider block text-[#141414] mb-2">
                  2. Stylist Preference
                </label>
                <select
                  value={stylist}
                  onChange={(e) => setStylist(e.target.value)}
                  className="w-full bg-white border border-[#141414]/15 rounded-xl px-3.5 py-2.5 text-xs text-[#141414] focus:outline-none focus:border-[#141414]"
                >
                  <option value="Any Senior Stylist">Any Senior Stylist</option>
                  <option value="Creative Director (Daisie)">Creative Director</option>
                  <option value="Master Colourist (Elena)">Master Colourist</option>
                  <option value="Precision Sculptor (Liam)">Precision Sculptor</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider block text-[#141414] mb-2">
                  3. Preferred Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-white border border-[#141414]/15 rounded-xl px-3.5 py-2.5 text-xs text-[#141414] focus:outline-none focus:border-[#141414]"
                />
              </div>
            </div>

            {/* Time Slots */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider block text-[#141414] mb-2">
                4. Select Time
              </label>
              <div className="flex flex-wrap gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTime(slot)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                      time === slot
                        ? 'bg-[#DCA59F] text-[#141414] font-semibold shadow-sm'
                        : 'bg-white border border-[#141414]/10 hover:border-[#141414]/30 text-[#141414]/80'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Guest Details */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-semibold uppercase tracking-wider block text-[#141414]">
                5. Your Details
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Full Name *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white border border-[#141414]/15 rounded-xl px-3.5 py-2.5 text-xs text-[#141414] placeholder:text-[#141414]/40 focus:outline-none focus:border-[#141414]"
                />
                <input
                  type="tel"
                  required
                  placeholder="Mobile Phone *"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white border border-[#141414]/15 rounded-xl px-3.5 py-2.5 text-xs text-[#141414] placeholder:text-[#141414]/40 focus:outline-none focus:border-[#141414]"
                />
              </div>

              <input
                type="email"
                placeholder="Email Address (for appointment confirmation)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-[#141414]/15 rounded-xl px-3.5 py-2.5 text-xs text-[#141414] placeholder:text-[#141414]/40 focus:outline-none focus:border-[#141414]"
              />

              <input
                type="text"
                placeholder="Hair history or styling goals (optional)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-white border border-[#141414]/15 rounded-xl px-3.5 py-2.5 text-xs text-[#141414] placeholder:text-[#141414]/40 focus:outline-none focus:border-[#141414]"
              />
            </div>

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#141414] text-[#F9F6F0] hover:bg-[#2A2A28] py-4 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer"
              >
                <span>CONFIRM RESERVATION</span>
                <span className="text-[#DCA59F]">✦</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
