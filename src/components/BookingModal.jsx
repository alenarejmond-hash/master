import React from 'react';
import { X, Check, ChevronDown } from 'lucide-react';

export const BookingModal = ({
  bookingModal,
  setBookingModal,
  closeBooking,
  formState,
  setFormState,
  handleBookingSubmit,
  formatPhone,
  openDropdown,
  setOpenDropdown,
  availableDates,
  data,
  t,
  d,
  showToast
}) => {
  if (!bookingModal.isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 h-[100dvh]">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={closeBooking} />
      
      <div className={`relative w-full max-w-lg rounded-t-[2rem] sm:rounded-3xl shadow-2xl p-6 modal-wrapper animate-[slideUp_0.3s_ease-out] transition-colors duration-300 max-h-[90dvh] overflow-y-auto scrollbar-hide ${t.modalBg}`}>
        <div className={`w-12 h-1.5 rounded-full mx-auto mb-6 sm:hidden transition-colors duration-300 ${t.grabber}`} />
        <button onClick={closeBooking} className={`absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full active:scale-90 transition-all duration-300 ${t.iconWrapper}`}>
          <X size={18} />
        </button>

        {formState.isSuccess ? (
          <div className="py-10 flex flex-col items-center text-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors duration-300 ${t.successBg} ${t.successIcon}`}>
              <Check size={32} />
            </div>
            <h3 className={`text-2xl font-bold mb-2 transition-colors duration-300 ${t.cardTextMain}`}>{d.successTitle}</h3>
            <p className={`transition-colors duration-300 ${t.cardTextSub}`}>{d.successText}</p>
          </div>
        ) : (
          <>
            <h2 className={`text-2xl font-bold mb-6 transition-colors duration-300 ${t.cardTextMain}`}>{d.bookingTitle}</h2>
            <div className={`rounded-2xl p-4 mb-6 border transition-colors duration-300 flex flex-col gap-4 ${t.inputBg} ${t.cardBorder}`}>
              
              <div className={`relative border-b pb-4 ${t.cardBorder}`}>
                <span className={`block text-sm font-semibold mb-2 transition-colors duration-300 ${t.cardTextSub}`}>{d.service}</span>
                <div onClick={(e) => { e.stopPropagation(); setOpenDropdown(openDropdown === 'service' ? null : 'service'); }} className={`flex justify-between items-center w-full p-3.5 rounded-xl border cursor-pointer transition-all bg-white/50 backdrop-blur-sm shadow-sm ${t.inputBorder} ${openDropdown === 'service' ? 'ring-2 ' + t.inputFocusRing : ''}`}>
                  <span className={`font-bold truncate pr-2 ${t.cardTextMain}`}>{bookingModal.services?.map(s => s.name).join(' + ') || "..."}</span>
                  <ChevronDown size={18} className={`transition-transform duration-300 flex-shrink-0 ${t.cardTextSub} ${openDropdown === 'service' ? 'rotate-180' : ''}`} />
                </div>
                {openDropdown === 'service' && (
                  <div className={`absolute left-0 right-0 top-full mt-2 z-[60] max-h-60 overflow-y-auto rounded-xl border shadow-2xl animate-[slideDown_0.2s_ease-out] ${t.cardBg} ${t.cardBorder}`}>
                    {data.services.map(s => {
                      const isSelected = bookingModal.services.find(item => item.id === s.id);
                      return (
                        <div key={s.id} onClick={(e) => { 
                            e.stopPropagation();
                            setBookingModal(prev => {
                              if (isSelected) {
                                if (prev.services.length === 1) return prev;
                                return { ...prev, services: prev.services.filter(item => item.id !== s.id) };
                              } else {
                                if (prev.services.length >= 2) { showToast(d.maxServices, true); return prev; }
                                return { ...prev, services: [...prev.services, s] };
                              }
                            });
                          }}
                          className={`p-3.5 border-b last:border-b-0 cursor-pointer flex items-center justify-between transition-colors ${t.cardBorder} ${isSelected ? 'bg-black/10 dark:bg-white/10' : 'hover:bg-black/5 dark:hover:bg-white/5 active:bg-black/10'}`}
                        >
                          <div className="pr-2">
                            <div className={`font-bold ${isSelected ? t.accentText : t.cardTextMain}`}>{s.name}</div>
                            <div className={`text-xs mt-1 font-semibold opacity-70 ${t.cardTextSub}`}>{s.price.toLocaleString('ru-RU')} AMD</div>
                          </div>
                          {isSelected && <Check size={20} className={`flex-shrink-0 ${t.accentText}`} />}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

              <div className="relative">
                <span className={`block text-sm font-semibold mb-2 transition-colors duration-300 ${t.cardTextSub}`}>{d.time}</span>
                <div onClick={(e) => { e.stopPropagation(); setOpenDropdown(openDropdown === 'time' ? null : 'time'); }} className={`flex justify-between items-center w-full p-3.5 rounded-xl border cursor-pointer transition-all bg-white/50 backdrop-blur-sm shadow-sm ${t.inputBorder} ${openDropdown === 'time' ? 'ring-2 ' + t.inputFocusRing : ''}`}>
                  <span className={`font-bold truncate pr-2 ${t.cardTextMain}`}>{bookingModal.slot ? `${bookingModal.slot.displayDate}, ${bookingModal.slot.time}` : "..."}</span>
                  <ChevronDown size={18} className={`transition-transform duration-300 flex-shrink-0 ${t.cardTextSub} ${openDropdown === 'time' ? 'rotate-180' : ''}`} />
                </div>
                {openDropdown === 'time' && (
                  <div className={`absolute left-0 right-0 top-full mt-2 z-[60] max-h-60 overflow-y-auto rounded-xl border shadow-2xl animate-[slideDown_0.2s_ease-out] ${t.cardBg} ${t.cardBorder}`}>
                    {availableDates.length > 0 ? availableDates.map(day => (
                      <div key={day.id}>
                        <div className={`sticky top-0 px-4 py-2 text-xs font-black uppercase tracking-widest backdrop-blur-md bg-black/5 dark:bg-white/5 ${t.cardTextMain}`}>{day.shortDate}</div>
                        <div className="grid grid-cols-3 gap-2 p-3">
                          {day.times.map(time => (
                            <div key={`${day.fullDate}|${time}`} onClick={() => { setBookingModal(prev => ({...prev, slot: { fullDate: day.fullDate, displayDate: day.shortDate, time } })); setOpenDropdown(null); }}
                              className={`p-2.5 rounded-lg border text-center cursor-pointer active:scale-95 transition-all font-bold ${t.cardBorder} hover:bg-black/5 dark:hover:bg-white/5 ${
                                bookingModal.slot?.fullDate === day.fullDate && bookingModal.slot?.time === time ? `${t.accentBg} ${t.accentText} border-current` : t.cardTextMain
                              }`}
                            >
                              {time}
                            </div>
                          ))}
                        </div>
                      </div>
                    )) : <div className={`p-5 text-center font-medium ${t.cardTextSub}`}>{d.noSlots}</div>}
                  </div>
                )}
              </div>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className={`block text-sm font-semibold mb-1.5 ml-1 transition-colors duration-300 ${t.cardTextMain}`}>{d.yourName}</label>
                <div className={`rounded-2xl border transition-all duration-300 ${t.inputBg} ${t.inputBorder} ${t.inputFocusRing}`}>
                  <input type="text" required value={formState.name} onChange={e => setFormState(prev => ({ ...prev, name: e.target.value }))} placeholder={d.namePlaceholder} className={`w-full px-4 py-3.5 bg-transparent focus:outline-none font-medium placeholder:opacity-40 ${t.inputText}`} />
                </div>
              </div>
              <div>
                <label className={`block text-sm font-semibold mb-1.5 ml-1 transition-colors duration-300 ${t.cardTextMain}`}>{d.phoneNum}</label>
                <div className={`rounded-2xl border flex items-center transition-all duration-300 ${t.inputBg} ${t.inputBorder} ${t.inputFocusRing}`}>
                  <span className={`pl-4 pr-1 font-medium transition-colors duration-300 opacity-60 ${t.cardTextMain}`}>+</span>
                  <input type="tel" required value={formState.phone} onChange={e => { const val = formatPhone(e.target.value); setFormState(prev => ({ ...prev, phone: val, ...(prev.sameAsPhone ? {whatsapp: val} : {}) })) }} placeholder={d.phonePlaceholder} className={`w-full pr-4 py-3.5 bg-transparent focus:outline-none font-medium placeholder:opacity-40 ${t.inputText}`} />
                </div>
                <label className="flex items-center gap-2 mt-2 ml-1 cursor-pointer w-max">
                  <input type="checkbox" checked={formState.sameAsPhone} onChange={e => setFormState(prev => ({ ...prev, sameAsPhone: e.target.checked, whatsapp: e.target.checked ? prev.phone : "" }))} className="w-4 h-4 rounded border-gray-300 text-[#D4A373] focus:ring-[#D4A373] accent-current" />
                  <span className={`text-xs font-medium transition-colors duration-300 ${t.cardTextSub}`}>{d.waCheckbox}</span>
                </label>
              </div>

              {!formState.sameAsPhone && (
                <div className="animate-[slideUp_0.2s_ease-out]">
                  <label className={`block text-sm font-semibold mb-1.5 ml-1 transition-colors duration-300 ${t.cardTextMain}`}>{d.waLabel}</label>
                  <div className={`rounded-2xl border flex items-center transition-all duration-300 ${t.inputBg} ${t.inputBorder} ${t.inputFocusRing}`}>
                    <span className={`pl-4 pr-1 font-medium transition-colors duration-300 opacity-60 ${t.cardTextMain}`}>+</span>
                    <input type="tel" required={!formState.sameAsPhone} value={formState.whatsapp} onChange={e => { const val = formatPhone(e.target.value); setFormState(prev => ({ ...prev, whatsapp: val })) }} placeholder={d.waPlaceholder} className={`w-full pr-4 py-3.5 bg-transparent focus:outline-none font-medium placeholder:opacity-40 ${t.inputText}`} />
                  </div>
                </div>
              )}

              <div>
                <label className={`block text-sm font-semibold mb-1.5 ml-1 transition-colors duration-300 ${t.cardTextMain}`}>{d.commentLabel}</label>
                <div className={`rounded-2xl border transition-all duration-300 ${t.inputBg} ${t.inputBorder} ${t.inputFocusRing}`}>
                  <textarea rows="2" value={formState.comment} onChange={e => setFormState(prev => ({ ...prev, comment: e.target.value }))} placeholder={d.commentPlaceholder} className={`w-full px-4 py-3 bg-transparent focus:outline-none font-medium placeholder:opacity-40 resize-none ${t.inputText}`} />
                </div>
              </div>

              <button type="submit" disabled={formState.isSubmitting || !bookingModal.slot} className={`w-full mt-2 py-4 rounded-2xl font-bold text-lg shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:active:scale-100 ${t.btnPrimary}`}>
                {formState.isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    {d.sending}
                  </span>
                ) : d.confirmBooking}
              </button>
              <p className={`text-[10px] text-center mt-3 opacity-60 transition-colors duration-300 ${t.cardTextSub}`}>
                {d.consent}
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
