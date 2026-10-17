import React from 'react';
import { Star } from 'lucide-react';
import { SectionTitle } from './SectionTitle';

export const ReviewsSection = ({
  activeTemplate,
  d,
  t
}) => {
  return (
    <section>
      <SectionTitle title={d.leaveReview} icon={Star} t={t} activeTemplate={activeTemplate} />
      <div className={`${activeTemplate === '2' ? 'rounded-none border-[#E5DFD5]' : 'rounded-3xl ' + t.cardBorder} p-2 border flex gap-2 transition-colors duration-300 ${t.cardBg} ${t.cardShadow}`}>
        <a href="#" target="_blank" rel="noopener noreferrer" className={`flex-1 py-3.5 ${activeTemplate === '2' ? 'rounded-none font-mono text-xs uppercase tracking-widest' : 'rounded-2xl'} flex flex-col items-center justify-center gap-1.5 transition-all duration-300 active:scale-95 hover:bg-black/5 dark:hover:bg-white/5`}>
           <span className={`font-bold text-sm ${t.cardTextMain} ${activeTemplate === '2' ? 'font-mono uppercase text-xs tracking-wider' : ''}`}>Google</span>
           <span className={`text-[10px] font-medium opacity-60 ${activeTemplate === '2' ? 'font-mono uppercase' : ''} ${t.cardTextSub}`}>{d.maps}</span>
        </a>
        <div className={`w-px bg-current opacity-10 my-2 ${t.cardBorder}`} />
        <a href="#" target="_blank" rel="noopener noreferrer" className={`flex-1 py-3.5 ${activeTemplate === '2' ? 'rounded-none font-mono text-xs uppercase tracking-widest' : 'rounded-2xl'} flex flex-col items-center justify-center gap-1.5 transition-all duration-300 active:scale-95 hover:bg-black/5 dark:hover:bg-white/5`}>
           <span className={`font-bold text-sm ${t.cardTextMain} ${activeTemplate === '2' ? 'font-mono uppercase text-xs tracking-wider' : ''}`}>Yandex</span>
           <span className={`text-[10px] font-medium opacity-60 ${activeTemplate === '2' ? 'font-mono uppercase' : ''} ${t.cardTextSub}`}>{d.maps}</span>
        </a>
      </div>
    </section>
  );
};
