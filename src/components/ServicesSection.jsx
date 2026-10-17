import React from 'react';
import { Star, Clock } from 'lucide-react';
import { SectionTitle } from './SectionTitle';

export const ServicesSection = ({
  activeTemplate,
  d,
  t,
  categories,
  activeCategory,
  setActiveCategory,
  filteredServices,
  expandedServiceId,
  setExpandedServiceId
}) => {
  return (
    <section>
      {activeTemplate === '1' ? (
        <>
          <SectionTitle title={d.priceList} icon={Star} t={t} activeTemplate={activeTemplate} />
          <div className="flex items-center justify-center gap-3 sm:gap-6 border-b border-[#E7DFD5]/60 pb-3 mb-6 overflow-x-auto scrollbar-hide">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative py-1.5 px-3 text-xs sm:text-sm tracking-[0.16em] uppercase transition-all duration-300 shrink-0 ${
                  activeCategory === category 
                    ? 'text-[#2B231F] font-semibold' 
                    : 'text-[#8C827A] opacity-60 hover:opacity-100'
                }`}
                style={{ fontFamily: 'Didot, "Bodoni MT", "Cormorant Garamond", Georgia, serif' }}
              >
                {category}
                {activeCategory === category && (
                  <span className="absolute -bottom-3 left-0 right-0 h-[1.5px] bg-[#C5A059]" />
                )}
              </button>
            ))}
          </div>
          <div className="space-y-6">
            {filteredServices.map(service => (
              <div 
                key={service.id} 
                className="group relative p-6 sm:p-8 rounded-2xl border border-[#E7DFD5] dark:border-[#38332E] bg-[#FAF8F5] dark:bg-[#1C1917]/90 transition-all duration-500 shadow-[0_4px_24px_-8px_rgba(44,36,32,0.06)] hover:shadow-[0_12px_36px_-10px_rgba(180,140,80,0.15)] hover:border-[#C5A059]/60"
              >
                <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-6 pb-3 border-b border-[#E7DFD5]/70 dark:border-[#38332E]/70">
                  <h3 
                    className="text-xl sm:text-2xl font-normal tracking-wide text-[#2B231F] dark:text-[#F5EFE6]"
                    style={{ fontFamily: 'Didot, "Bodoni MT", "Cormorant Garamond", Georgia, serif' }}
                  >
                    {service.name}
                  </h3>
                  <div className="flex items-baseline gap-1.5 self-start sm:self-auto shrink-0">
                    <span 
                      className="text-lg sm:text-xl font-light tracking-wider text-[#9E7A3E] dark:text-[#D4AF37]"
                      style={{ fontFamily: 'Didot, "Bodoni MT", "Cormorant Garamond", Georgia, serif' }}
                    >
                      {service.price.toLocaleString('ru-RU')}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.2em] font-sans text-[#8A7E72] dark:text-[#A89C8F]">
                      AMD
                    </span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 mt-3.5 mb-2.5 px-3 py-1 rounded-full bg-[#F0EAE1]/80 dark:bg-white/5 text-[11px] tracking-wider uppercase text-[#7D7063] dark:text-[#C7BCB0]">
                  <Clock size={13} className="text-[#9E7A3E]" />
                  <span>{service.duration}</span>
                </div>

                <p className="text-sm sm:text-base leading-relaxed text-[#5C5248] dark:text-[#D1C7BD] font-light">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between mb-4 border-b border-[#1E1C1A]/15 pb-2">
            <h2 className="text-xs uppercase tracking-[0.25em] font-mono text-[#1E1C1A] font-semibold">
              {d.priceList}
            </h2>
          </div>

          <div className="flex border-b border-[#1E1C1A]/10 pb-3 mb-5 gap-2 overflow-x-auto scrollbar-hide">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`text-xs uppercase tracking-[0.18em] font-mono whitespace-nowrap py-1.5 px-3 transition-all ${
                  activeCategory === category 
                    ? 'bg-[#1E1C1A] text-[#FAF8F5]' 
                    : 'text-[#6B635B] hover:text-[#1E1C1A] bg-transparent'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filteredServices.map(service => {
              const isExpanded = expandedServiceId === service.id;
              return (
                <div 
                  key={service.id}
                  className="bg-[#FCFAF7] border border-[#E5DFD5] transition-all duration-300"
                >
                  <div 
                    onClick={() => setExpandedServiceId(isExpanded ? null : service.id)}
                    className="p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF6F0] transition-colors"
                  >
                    <div className="flex-1 pr-2">
                      <h3 className="text-sm sm:text-base font-light tracking-wide text-[#1E1C1A] uppercase mb-1">
                        {service.name}
                      </h3>
                      <span className="text-[11px] font-mono uppercase tracking-widest text-[#6B635B]">
                        {service.duration}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-sm sm:text-base font-mono font-medium text-[#1E1C1A] whitespace-nowrap">
                        {service.price.toLocaleString('ru-RU')} AMD
                      </span>
                      <span className={`text-xs font-mono text-[#6B635B] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                        ↓
                      </span>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-5 pb-5 pt-2 border-t border-[#E5DFD5]">
                      <p className="text-sm text-[#4A443E] leading-relaxed font-light">
                        {service.description}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
};
