import React from 'react';

export const TemplateHeader = ({ activeTemplate, switchTemplate, lang, handleLanguageChange }) => {
  return (
    <>
      {/* Шапка переключения шаблонов дизайна (1. Vogue / 2. The Row / 3. Clean Girl / 4. Fashion Glam) */}
      <div className="w-full bg-[#1E1C1A] text-[#FAF8F5] py-2 px-3 sm:px-4 flex items-center justify-between text-xs border-b border-white/10 z-[100] sticky top-0 backdrop-blur-md shadow-md">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="opacity-40 text-[9px] uppercase font-mono tracking-wider hidden sm:inline">Шаблон:</span>
          <span className="font-semibold text-[11px] text-[#C5A059] tracking-wide">
            {activeTemplate === '1' ? '1. Vogue' : (activeTemplate === '2' ? '2. The Row' : (activeTemplate === '3' ? '3. Clean Girl' : '4. Fashion Glam'))}
          </span>
        </div>
        <div className="flex items-center gap-1 bg-white/10 p-0.5 rounded-full overflow-x-auto scrollbar-hide">
          <button 
            onClick={() => switchTemplate('1')}
            className={`px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase transition-all duration-300 shrink-0 ${activeTemplate === '1' ? 'bg-[#C5A059] text-white font-bold shadow-sm' : 'text-white/70 hover:text-white'}`}
          >
            1. Vogue
          </button>
          <button 
            onClick={() => switchTemplate('2')}
            className={`px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase transition-all duration-300 shrink-0 ${activeTemplate === '2' ? 'bg-white text-[#1E1C1A] font-bold shadow-sm' : 'text-white/70 hover:text-white'}`}
          >
            2. The Row
          </button>
          <button 
            onClick={() => switchTemplate('3')}
            className={`px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase transition-all duration-300 shrink-0 ${activeTemplate === '3' ? 'bg-[#5A6B5B] text-white font-bold shadow-sm' : 'text-white/70 hover:text-white'}`}
          >
            3. Clean
          </button>
          <button 
            onClick={() => switchTemplate('4')}
            className={`px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase transition-all duration-300 shrink-0 ${activeTemplate === '4' ? 'bg-[#881337] text-white font-bold shadow-sm' : 'text-white/70 hover:text-white'}`}
          >
            4. Glam
          </button>
        </div>
      </div>

      {/* Top Bar: Minimal Language Switcher */}
      {activeTemplate === '4' ? (
        <div 
          className="w-full max-w-md mx-auto px-5 pt-3 pb-1 flex items-center justify-end relative z-30"
          style={{ paddingTop: 'calc(1rem + env(safe-area-inset-top))' }}
        >
          <div className="flex items-center gap-1 text-[11px] font-sans tracking-[0.16em] uppercase font-bold text-[#09090B]">
            <button 
              onClick={() => handleLanguageChange('hy')} 
              className={`px-2 py-0.5 transition-all duration-200 ${lang === 'hy' ? 'bg-[#09090B] text-white rounded' : 'opacity-40 hover:opacity-100'}`}
            >
              HY
            </button>
            <span className="opacity-20 text-black">/</span>
            <button 
              onClick={() => handleLanguageChange('ru')} 
              className={`px-2 py-0.5 transition-all duration-200 ${lang === 'ru' ? 'bg-[#09090B] text-white rounded' : 'opacity-40 hover:opacity-100'}`}
            >
              RU
            </button>
            <span className="opacity-20 text-black">/</span>
            <button 
              onClick={() => handleLanguageChange('en')} 
              className={`px-2 py-0.5 transition-all duration-200 ${lang === 'en' ? 'bg-[#09090B] text-white rounded' : 'opacity-40 hover:opacity-100'}`}
            >
              EN
            </button>
          </div>
        </div>
      ) : activeTemplate === '3' ? (
        <div 
          className="w-full max-w-md mx-auto px-5 pt-3 pb-1 flex items-center justify-end relative z-30"
          style={{ paddingTop: 'calc(1rem + env(safe-area-inset-top))' }}
        >
          <div className="flex items-center gap-1 p-1 rounded-full bg-white/80 border border-[#ECE5DC] shadow-xs backdrop-blur-md">
            <button 
              onClick={() => handleLanguageChange('hy')} 
              className={`px-3 py-1 rounded-full text-[11px] font-medium tracking-wider uppercase transition-all duration-200 ${lang === 'hy' ? 'bg-[#38322E] text-[#FAF8F5] shadow-xs' : 'text-[#7C746C] hover:text-[#2E2A27]'}`}
            >
              HY
            </button>
            <button 
              onClick={() => handleLanguageChange('ru')} 
              className={`px-3 py-1 rounded-full text-[11px] font-medium tracking-wider uppercase transition-all duration-200 ${lang === 'ru' ? 'bg-[#38322E] text-[#FAF8F5] shadow-xs' : 'text-[#7C746C] hover:text-[#2E2A27]'}`}
            >
              RU
            </button>
            <button 
              onClick={() => handleLanguageChange('en')} 
              className={`px-3 py-1 rounded-full text-[11px] font-medium tracking-wider uppercase transition-all duration-200 ${lang === 'en' ? 'bg-[#38322E] text-[#FAF8F5] shadow-xs' : 'text-[#7C746C] hover:text-[#2E2A27]'}`}
            >
              EN
            </button>
          </div>
        </div>
      ) : activeTemplate === '1' ? (
        <div 
          className="w-full max-w-md mx-auto px-5 pt-3 pb-1 flex items-center justify-end relative z-30"
        >
          <div className="flex items-center gap-1.5 text-[11px] tracking-wider font-sans uppercase font-medium">
            <button 
              onClick={() => handleLanguageChange('hy')} 
              className={`px-1.5 py-0.5 rounded transition-all duration-200 ${lang === 'hy' ? 'text-[#9E7A3E] font-bold border-b-2 border-[#C5A059]' : 'text-[#736A62] opacity-50 hover:opacity-100'}`}
            >
              HY
            </button>
            <span className="opacity-25 text-[#736A62]">/</span>
            <button 
              onClick={() => handleLanguageChange('ru')} 
              className={`px-1.5 py-0.5 rounded transition-all duration-200 ${lang === 'ru' ? 'text-[#9E7A3E] font-bold border-b-2 border-[#C5A059]' : 'text-[#736A62] opacity-50 hover:opacity-100'}`}
            >
              RU
            </button>
            <span className="opacity-25 text-[#736A62]">/</span>
            <button 
              onClick={() => handleLanguageChange('en')} 
              className={`px-1.5 py-0.5 rounded transition-all duration-200 ${lang === 'en' ? 'text-[#9E7A3E] font-bold border-b-2 border-[#C5A059]' : 'text-[#736A62] opacity-50 hover:opacity-100'}`}
            >
              EN
            </button>
          </div>
        </div>
      ) : (
        <div 
          className="w-full max-w-md mx-auto px-5 pt-3 pb-1 flex items-center justify-end relative z-30"
        >
          <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest uppercase font-medium text-[#1E1C1A]">
            <button 
              onClick={() => handleLanguageChange('hy')} 
              className={`transition-all duration-200 ${lang === 'hy' ? 'font-bold border-b border-[#1E1C1A]' : 'opacity-40 hover:opacity-100'}`}
            >
              HY
            </button>
            <span className="opacity-25">/</span>
            <button 
              onClick={() => handleLanguageChange('ru')} 
              className={`transition-all duration-200 ${lang === 'ru' ? 'font-bold border-b border-[#1E1C1A]' : 'opacity-40 hover:opacity-100'}`}
            >
              RU
            </button>
            <span className="opacity-25">/</span>
            <button 
              onClick={() => handleLanguageChange('en')} 
              className={`transition-all duration-200 ${lang === 'en' ? 'font-bold border-b border-[#1E1C1A]' : 'opacity-40 hover:opacity-100'}`}
            >
              EN
            </button>
          </div>
        </div>
      )}
    </>
  );
};
