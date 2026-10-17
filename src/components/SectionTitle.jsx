import React from 'react';

export const SectionTitle = ({ title, icon: Icon, t, activeTemplate }) => {
  if (activeTemplate === '3') {
    return (
      <div className="flex items-center gap-2.5 mb-4 px-1">
        {Icon && (
          <div className="w-7 h-7 rounded-full bg-[#EEF2ED] text-[#5A6B5B] flex items-center justify-center shrink-0">
            <Icon size={14} />
          </div>
        )}
        <h2 className="text-xl sm:text-2xl font-normal tracking-tight text-[#2E2A27]">
          {title}
        </h2>
      </div>
    );
  }

  if (activeTemplate === '2') {
    return (
      <div className="flex items-center justify-between mb-4 border-b border-[#1E1C1A]/15 pb-2">
        <h2 className="text-xs uppercase tracking-[0.25em] font-mono text-[#1E1C1A] font-semibold">
          {title}
        </h2>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 mb-4 px-1">
      {Icon && <Icon size={18} className={t.accentText || t.appTextMain} />}
      <h2 
        className={`text-2xl font-normal tracking-wide transition-colors duration-300 ${t.appTextMain}`}
        style={{ fontFamily: 'Didot, "Bodoni MT", "Cormorant Garamond", Georgia, serif' }}
      >
        {title}
      </h2>
    </div>
  );
};
