import React from 'react';
import { Calendar } from 'lucide-react';

export const FloatingBookingButton = ({
  bookingModal,
  isQrOpen,
  showFab,
  openBooking,
  activeTemplate,
  d
}) => {
  return (
    <div className={`fixed bottom-6 left-0 right-0 z-[90] flex justify-center pointer-events-none transition-all duration-500 ease-out ${!bookingModal.isOpen && !isQrOpen ? 'opacity-100' : 'opacity-0'}`}>
      <div className="w-full max-w-md px-5">
        <div className={`w-full transition-all duration-500 ease-out ${showFab ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-12 opacity-0 pointer-events-none'}`}>
          <button 
            onClick={() => openBooking()} 
            className={`w-full py-4 px-6 ${
              activeTemplate === '4'
                ? 'rounded-xl bg-[#09090B] text-white border border-[#881337]/60 shadow-[0_12px_32px_-4px_rgba(136,19,55,0.4)]'
                : (activeTemplate === '3' 
                  ? 'rounded-full bg-gradient-to-r from-[#38322E] via-[#453D37] to-[#38322E] text-[#FAF8F5] border border-[#524942]/40 shadow-[0_14px_36px_-6px_rgba(56,50,46,0.35),inset_0_1px_1px_rgba(255,255,255,0.25)]' 
                  : (activeTemplate === '2' ? 'rounded-none bg-[#1E1C1A] text-[#FAF8F5]' : 'rounded-full bg-gradient-to-r from-[#2C2420] via-[#3A3029] to-[#2C2420] text-[#FAF8F5] border border-[#C5A059]/40'))
            } font-sans text-xs tracking-[0.22em] uppercase font-bold active:scale-[0.98] transition-all duration-300 flex items-center justify-between group`}
          >
            <span className="pl-2">{d.bookOnline}</span>
            <div className={`w-8 h-8 ${
              activeTemplate === '4'
                ? 'rounded-lg bg-[#881337] text-white'
                : (activeTemplate === '3'
                  ? 'rounded-full bg-white/15 text-[#FAF8F5]'
                  : (activeTemplate === '2' ? 'rounded-none bg-white/10 text-white' : 'rounded-full bg-[#C5A059] text-white'))
            } flex items-center justify-center transition-transform duration-300 group-hover:rotate-12`}>
              <Calendar size={15} strokeWidth={1.5} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
