import React from 'react';
import { MapPin, Calendar } from 'lucide-react';

export const Header = ({ activeTemplate, data, d, openBooking }) => {
  if (activeTemplate === '1') {
    return (
      <header className="px-5 w-full max-w-md mx-auto pt-2 pb-6 flex flex-col items-center">
        <div className="w-full relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_-15px_rgba(44,36,32,0.25)] group border border-[#E7DFD5]/70">
          <img 
            src={data.master.avatar} 
            alt={data.master.name} 
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
          <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full backdrop-blur-md bg-black/40 border border-white/15 text-[10px] tracking-[0.2em] uppercase text-white/95 font-sans">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{data.master.status}</span>
          </div>
          <div className="absolute bottom-6 left-6 right-6 text-left text-white z-10">
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.28em] font-sans text-[#EADBCE] font-light mb-1.5">
              {data.master.specialization}
            </p>
            <h1 
              className="text-4xl sm:text-5xl font-normal tracking-wide text-[#FAF8F5] leading-[1.05]"
              style={{ fontFamily: 'Didot, "Bodoni MT", "Cormorant Garamond", Georgia, serif' }}
            >
              {data.master.name}
            </h1>
            <a 
              href={data.master.mapUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-1.5 mt-2.5 text-xs text-[#EADBCE] hover:text-white transition-colors group/loc"
            >
              <MapPin size={13} className="text-[#C5A059] shrink-0" />
              <span className="tracking-wide underline underline-offset-4 decoration-[#C5A059]/70 group-hover/loc:decoration-white">{data.master.location}</span>
            </a>
          </div>
        </div>

        <button 
          onClick={() => openBooking()} 
          className="mt-5 w-full py-4 px-6 rounded-full font-sans text-xs tracking-[0.25em] uppercase font-medium shadow-[0_12px_35px_-10px_rgba(197,160,89,0.35)] active:scale-[0.98] transition-all duration-300 flex items-center justify-between bg-gradient-to-r from-[#2C2420] via-[#3A3029] to-[#2C2420] text-[#FAF8F5] border border-[#C5A059]/40 group"
        >
          <span className="pl-2">{d.bookOnline}</span>
          <div className="w-8 h-8 rounded-full bg-[#C5A059] text-white flex items-center justify-center transition-transform duration-300 group-hover:rotate-12">
            <Calendar size={15} />
          </div>
        </button>
      </header>
    );
  }

  return (
    <header className="px-5 w-full max-w-md mx-auto pt-3 pb-8">
      <div className="flex items-start justify-between gap-3 w-full">
        <div className="w-[58%] aspect-[3/4.2] relative overflow-hidden bg-[#EAE4D9] border border-[#E5DFD5] shadow-xs group">
          <img 
            src={data.master.avatar} 
            alt={data.master.name} 
            className="w-full h-full object-cover object-top filter grayscale-[25%] contrast-[1.05] transition-transform duration-700 group-hover:scale-105" 
          />
        </div>

        <div className="w-[39%] aspect-[3/4] relative overflow-hidden bg-[#EAE4D9] border border-[#E5DFD5] shadow-xs mt-10 group">
          <img 
            src="/photo-2.jpg" 
            alt="Detail" 
            className="w-full h-full object-cover filter contrast-[1.05] transition-transform duration-700 group-hover:scale-105" 
          />
        </div>
      </div>

      <div className="mt-7 text-left w-full border-b border-[#1E1C1A]/15 pb-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] tracking-[0.25em] uppercase font-mono text-[#6B635B]">
            {data.master.specialization}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase text-[#1E1C1A]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            {data.master.status}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-light tracking-[0.06em] uppercase text-[#1E1C1A] leading-tight">
          {data.master.name}
        </h1>
        <a 
          href={data.master.mapUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center gap-1.5 mt-3 text-xs font-mono text-[#6B635B] hover:text-[#1E1C1A] transition-colors group/loc"
        >
          <MapPin size={12} className="shrink-0 text-[#1E1C1A]" />
          <span className="underline underline-offset-2 decoration-[#1E1C1A]/40 group-hover/loc:decoration-[#1E1C1A]">{data.master.location}</span>
        </a>
      </div>

      <button 
        onClick={() => openBooking()} 
        className="mt-5 w-full py-4 px-6 bg-[#1E1C1A] hover:bg-[#2F2B27] text-[#FAF8F5] text-xs uppercase tracking-[0.25em] font-medium transition-all duration-300 flex items-center justify-between group active:scale-[0.99]"
      >
        <span>{d.bookOnline}</span>
        <span className="font-mono text-sm tracking-normal transition-transform duration-300 group-hover:translate-x-1">→</span>
      </button>
    </header>
  );
};
