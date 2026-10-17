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

  if (activeTemplate === '3') {
    return (
      <header className="px-5 w-full max-w-md mx-auto pt-2 pb-6 flex flex-col items-center">
        <div className="relative w-full flex flex-col items-center">
          
          {/* Delicately glowing status pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-[#ECE5DC] shadow-xs backdrop-blur-md mb-4">
            <span className="w-2 h-2 rounded-full bg-[#5A6B5B] animate-pulse" />
            <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#5A6B5B]">
              {data.master.status}
            </span>
          </div>

          {/* Pebble Photo Frame */}
          <div className="relative group">
            {/* Soft glowing cashmere aura */}
            <div className="absolute -inset-3 bg-gradient-to-tr from-[#EADBCE]/70 via-[#F5EEE6]/60 to-[#DCE6DC]/60 rounded-[50px] blur-xl opacity-70 group-hover:opacity-100 transition duration-700 pointer-events-none" />
            
            {/* Pebble container with organic asymmetrical curved radius */}
            <div className="relative w-48 h-56 sm:w-56 sm:h-64 rounded-[46px_24px_46px_28px] overflow-hidden shadow-[0_18px_45px_-12px_rgba(160,140,120,0.32)] border-[5px] border-white bg-[#F5EEE6]">
              <img 
                src={data.master.avatar} 
                alt={data.master.name} 
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" 
              />
            </div>

            {/* Floating Mini Pebble: Macro detail photo badge */}
            <div className="absolute -bottom-3 -right-2 w-20 h-20 sm:w-22 sm:h-22 rounded-[24px_16px_24px_16px] overflow-hidden border-4 border-white shadow-[0_10px_25px_-5px_rgba(140,120,100,0.3)] bg-white group-hover:scale-105 transition-transform duration-500">
              <img 
                src="/photo-2.jpg" 
                alt="Detail" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>

          {/* Master info in clean Japanese spa minimalism */}
          <div className="text-center mt-6 w-full px-2">
            <p className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#7C746C] font-medium mb-1.5">
              {data.master.specialization}
            </p>
            <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-[#2E2A27] leading-tight">
              {data.master.name}
            </h1>
            <div className="flex justify-center mt-3">
              <a 
                href={data.master.mapUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/80 border border-[#ECE5DC] text-xs text-[#6B635B] hover:text-[#2E2A27] hover:border-[#D5C8B8] transition-all shadow-xs"
              >
                <MapPin size={13} className="text-[#5A6B5B] shrink-0" />
                <span className="tracking-wide">{data.master.location}</span>
              </a>
            </div>
          </div>

          {/* Пухлая тактильная кнопка записи на всю ширину */}
          <button 
            onClick={() => openBooking()} 
            className="mt-6 w-full py-4 px-6 rounded-full font-medium text-xs tracking-[0.2em] uppercase shadow-[0_14px_32px_-6px_rgba(56,50,46,0.32),inset_0_1px_1px_rgba(255,255,255,0.25)] active:scale-[0.98] transition-all duration-300 flex items-center justify-between bg-gradient-to-r from-[#38322E] via-[#453D37] to-[#38322E] text-[#FAF8F5] border border-[#524942]/40 group"
          >
            <span className="pl-3">{d.bookOnline}</span>
            <div className="w-9 h-9 rounded-full bg-white/15 text-[#FAF8F5] flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-inner">
              <Calendar size={16} />
            </div>
          </button>
        </div>
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
