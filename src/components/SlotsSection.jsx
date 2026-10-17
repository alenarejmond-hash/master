import React from 'react';
import { Sparkles, Calendar, Info } from 'lucide-react';
import { SectionTitle } from './SectionTitle';

export const SlotsSection = ({
  activeTemplate,
  d,
  t,
  isLoadingDates,
  flattenedSlots,
  vacationDays,
  bannerText,
  showBanner,
  openBooking
}) => {
  return (
    <section>
      {activeTemplate === '3' ? (
        <>
          <SectionTitle title={d.availableSlots} icon={Sparkles} t={t} activeTemplate={activeTemplate} />
          {isLoadingDates ? (
            <div className="w-full p-6 rounded-[26px] border border-[#ECE5DC] bg-white flex flex-col items-center gap-3 shadow-xs">
              <div className="w-8 h-8 rounded-full border-3 border-[#5A6B5B] border-t-transparent animate-spin" />
              <p className="text-xs font-medium text-[#7C746C] animate-pulse">{d.loadingSlots}</p>
            </div>
          ) : flattenedSlots.length === 0 ? (
            <div className="w-full p-8 rounded-[28px] border border-[#ECE5DC] bg-white flex flex-col items-center justify-center text-center gap-3 shadow-xs">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#EEF2ED] text-[#5A6B5B]">
                <Calendar size={22} />
              </div>
              <p className="text-sm font-medium leading-relaxed text-[#2E2A27]">
                {vacationDays.length > 0 ? `${bannerText} ${d.slotsOpenLater}` : d.noSlots}
              </p>
            </div>
          ) : (
            <>
              {showBanner && (
                <div className="mb-4 p-3.5 rounded-2xl flex items-start gap-3 border bg-[#EEF2ED] text-[#4E614F] border-[#DCE4DB]">
                  <Info size={18} className="flex-shrink-0 mt-0.5" />
                  <p className="text-xs font-medium leading-snug">{bannerText}</p>
                </div>
              )}
              {/* Горизонтальная карусель: видны дата и время, следующее окошко выглядывает сбоку */}
              <div className="flex gap-3 overflow-x-auto pb-2 w-full scrollbar-hide">
                {flattenedSlots.map(slot => (
                  <div 
                    key={slot.id}
                    onClick={() => openBooking({ fullDate: slot.fullDate, displayDate: slot.displayDate, time: slot.time })}
                    className="shrink-0 w-[140px] p-4 rounded-[24px] bg-white border border-[#ECE5DC] shadow-[0_6px_20px_-6px_rgba(180,160,140,0.18)] hover:shadow-[0_10px_28px_-6px_rgba(180,160,140,0.28)] hover:border-[#D5C8B8] transition-all cursor-pointer flex flex-col justify-center active:scale-95 group"
                  >
                    <span className="text-sm font-medium tracking-tight text-[#2E2A27] mb-0.5">
                      {slot.displayDate}
                    </span>
                    <span className="text-xs font-medium tracking-wider text-[#5A6B5B]">
                      {slot.time}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      ) : activeTemplate === '1' ? (
        <>
          <SectionTitle title={d.availableSlots} icon={Sparkles} t={t} activeTemplate={activeTemplate} />
          {isLoadingDates ? (
            <div className={`w-full p-6 rounded-2xl border flex flex-col items-center gap-4 transition-colors duration-300 ${t.cardBg} ${t.cardBorder}`}>
              <div className={`w-8 h-8 rounded-full animate-spin border-3 border-t-transparent ${t.accentText.replace('text-', 'border-')}`} style={{borderTopColor: 'transparent'}} />
              <p className={`text-xs font-medium animate-pulse ${t.cardTextSub}`}>{d.loadingSlots}</p>
            </div>
          ) : flattenedSlots.length === 0 ? (
            <div className={`w-full p-6 rounded-2xl border flex flex-col items-center justify-center text-center gap-3 transition-colors duration-300 ${t.cardBg} ${t.cardBorder} shadow-sm`}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${t.accentBg} ${t.accentText}`}>
                <Calendar size={24} />
              </div>
              <p className={`text-sm font-medium leading-relaxed ${t.cardTextMain}`}>
                {vacationDays.length > 0 ? `${bannerText} ${d.slotsOpenLater}` : d.noSlots}
              </p>
            </div>
          ) : (
            <>
              {showBanner && (
                <div className={`mb-4 p-3.5 rounded-2xl flex items-start gap-3 border transition-colors duration-300 ${t.accentBg} ${t.accentText} border-current/20`}>
                  <Info size={18} className="flex-shrink-0 mt-0.5" />
                  <p className="text-xs font-medium leading-snug">{bannerText}</p>
                </div>
              )}
              <div className="flex gap-2.5 overflow-x-auto pb-2 w-full scrollbar-hide">
                {flattenedSlots.map(slot => (
                  <div 
                    key={slot.id}
                    onClick={() => openBooking({ fullDate: slot.fullDate, displayDate: slot.displayDate, time: slot.time })}
                    className="shrink-0 w-[135px] p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E7DFD5] shadow-[0_4px_20px_-8px_rgba(44,36,32,0.06)] hover:border-[#C5A059] transition-all cursor-pointer flex flex-col justify-center active:scale-95 group"
                  >
                    <span 
                      className="text-base font-normal tracking-wide text-[#2B231F] mb-0.5"
                      style={{ fontFamily: 'Didot, "Bodoni MT", "Cormorant Garamond", Georgia, serif' }}
                    >
                      {slot.displayDate}
                    </span>
                    <span className="text-xs font-sans tracking-wider text-[#9E7A3E] font-medium">
                      {slot.time}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <div className="flex items-center justify-between mb-4 border-b border-[#1E1C1A]/15 pb-2">
            <h2 className="text-xs uppercase tracking-[0.25em] font-mono text-[#1E1C1A] font-semibold">
              {d.availableSlots}
            </h2>
          </div>

          {isLoadingDates ? (
            <div className="w-full p-6 border border-[#E5DFD5] bg-[#FCFAF7] flex flex-col items-center gap-3 rounded-none">
              <div className="w-6 h-6 border-2 border-[#1E1C1A] border-t-transparent animate-spin rounded-none" />
              <p className="text-xs font-mono uppercase tracking-widest text-[#6B635B]">{d.loadingSlots}</p>
            </div>
          ) : flattenedSlots.length === 0 ? (
            <div className="w-full p-6 border border-[#E5DFD5] bg-[#FCFAF7] text-center rounded-none">
              <p className="text-xs font-mono uppercase tracking-widest text-[#6B635B]">
                {vacationDays.length > 0 ? `${bannerText} ${d.slotsOpenLater}` : d.noSlots}
              </p>
            </div>
          ) : (
            <div className="flex gap-2.5 overflow-x-auto pb-2 w-full scrollbar-hide">
              {flattenedSlots.map(slot => (
                <div 
                  key={slot.id}
                  onClick={() => openBooking({ fullDate: slot.fullDate, displayDate: slot.displayDate, time: slot.time })}
                  className="shrink-0 w-[135px] p-3.5 bg-[#FCFAF7] border border-[#E5DFD5] hover:border-[#1E1C1A] transition-all cursor-pointer rounded-none flex flex-col justify-center active:scale-95"
                >
                  <span className="text-xs font-mono uppercase tracking-widest text-[#1E1C1A] font-semibold mb-1">
                    {slot.displayDate}
                  </span>
                  <span className="text-sm font-light font-mono text-[#6B635B] tracking-wider">
                    {slot.time}
                  </span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
};
