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
            className={`w-full py-4 px-6 ${activeTemplate === '2' ? 'rounded-none bg-[#1E1C1A] text-[#FAF8F5]' : 'rounded-full bg-gradient-to-r from-[#2C2420] via-[#3A3029] to-[#2C2420] text-[#FAF8F5] border border-[#C5A059]/40 group'} font-sans text-xs tracking-[0.25em] uppercase font-medium shadow-[0_12px_35px_-10px_rgba(44,36,32,0.4)] active:scale-[0.98] transition-all duration-300 flex items-center justify-between`}
          >
            <span className="pl-2">{d.bookOnline}</span>
            <div className={`w-8 h-8 ${activeTemplate === '2' ? 'rounded-none bg-white/10 text-white' : 'rounded-full bg-[#C5A059] text-white'} flex items-center justify-center`}>
              <Calendar size={15} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
