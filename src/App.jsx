import React, { useState, useEffect, useCallback } from 'react';
import { GOOGLE_APPS_SCRIPT_URL } from './config/api';
import { formatPhone } from './utils/formatPhone';
import { parseSheetDate, detectPhoneLanguage } from './utils/dateUtils';
import { DICT } from './constants/translations';
import { THEMES_V1, THEMES_V2, THEMES_V3, THEMES } from './constants/themes';
import { getMockData } from './data/mockData';

import { Toast } from './components/Toast';
import { TemplateHeader } from './components/TemplateHeader';
import { Header } from './components/Header';
import { SlotsSection } from './components/SlotsSection';
import { ServicesSection } from './components/ServicesSection';
import { PaymentsSection } from './components/PaymentsSection';
import { RulesSection } from './components/RulesSection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { FloatingBookingButton } from './components/FloatingBookingButton';
import { QrModal } from './components/QrModal';
import { BookingModal } from './components/BookingModal';

export default function App() {
  const [lang, setLang] = useState(detectPhoneLanguage); 
  const d = DICT[lang]; 
  const data = getMockData(lang); 

  const handleLanguageChange = (newLang) => {
    setLang(newLang);
    localStorage.setItem('app-lang', newLang);
  };

  const [activeTemplate, setActiveTemplate] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const v = params.get('v');
      if (v === '1' || v === '2' || v === '3') return v;
      const saved = localStorage.getItem('app-beauty-template');
      if (saved === '1' || saved === '2' || saved === '3') return saved;
    }
    return '1';
  });

  const switchTemplate = (tpl) => {
    setActiveTemplate(tpl);
    if (typeof window !== 'undefined') {
      localStorage.setItem('app-beauty-template', tpl);
      const url = new URL(window.location);
      url.searchParams.set('v', tpl);
      window.history.replaceState({}, '', url);
    }
  };

  const [expandedServiceId, setExpandedServiceId] = useState(null);

  const [rawDates, setRawDates] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [isLoadingDates, setIsLoadingDates] = useState(true);
  const [isFetched, setIsFetched] = useState(false);
  const [showFab, setShowFab] = useState(false);

  const [activeCategory, setActiveCategory] = useState(data.services[0].category);
  const [toast, setToast] = useState({ visible: false, message: "", isError: false });
  const [copiedPaymentId, setCopiedPaymentId] = useState(null);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  const [theme] = useState(() => {
    let saved = localStorage.getItem('app-theme');
    if (!THEMES[saved]) saved = 'obsidian';
    return saved;
  });

  const [bookingModal, setBookingModal] = useState({
    isOpen: false,
    services: [], 
    slot: null,
  });

  const [formState, setFormState] = useState({
    name: "", phone: "", whatsapp: "", sameAsPhone: true, comment: "", isSubmitting: false, isSuccess: false
  });

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  useEffect(() => {
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  const t = activeTemplate === '3' ? THEMES_V3 : (activeTemplate === '2' ? THEMES_V2 : THEMES_V1);

  useEffect(() => {
    const bgTopColor = t.appBg.replace('bg-[', '').replace(']', '');
    const bgBottomColor = t.footerBg.replace('bg-[', '').replace(']', '');
    
    document.documentElement.style.backgroundColor = bgTopColor;
    document.body.style.backgroundColor = bgBottomColor;
  }, [t.appBg, t.footerBg]);

  useEffect(() => {
    const handleScroll = () => setShowFab(window.scrollY > 150);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isFetched) return;
    const fetchSlots = async () => {
      setIsLoadingDates(true);
      try {
        const res = await fetch(GOOGLE_APPS_SCRIPT_URL);
        const fetchedData = await res.json();
        if (Array.isArray(fetchedData) && fetchedData.length > 0) setRawDates(fetchedData);
        else setRawDates([]);
      } catch (error) {
        console.error("Ошибка загрузки:", error);
        setRawDates([]);
      } finally {
        setIsLoadingDates(false);
        setIsFetched(true);
      }
    };
    fetchSlots();
  }, [isFetched]); 

  useEffect(() => {
    if (rawDates.length > 0) {
      const parsedDates = rawDates
        .filter(dayObj => dayObj.times && dayObj.times[0] !== 'отпуск')
        .map((dayObj, i) => {
          const parsed = parseSheetDate(dayObj.date, lang);
          return { id: dayObj.id || i, fullDate: parsed.fullDate, shortDate: parsed.shortDate, label: parsed.label, times: dayObj.times };
        });
      setAvailableDates(parsedDates);
    } else {
      setAvailableDates([]);
    }
  }, [rawDates, lang]);

  const flattenedSlots = availableDates.flatMap(day => 
    (day.times || []).map((time, tIdx) => ({
      id: `${day.id}-${tIdx}`,
      fullDate: day.fullDate,
      displayDate: day.shortDate,
      time: time
    }))
  );

  useEffect(() => {
    const close = () => setOpenDropdown(null);
    if (openDropdown) document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [openDropdown]);

  const showToast = useCallback((message, isError = false) => {
    setToast({ visible: true, message, isError });
    setTimeout(() => setToast({ visible: false, message: "", isError: false }), 4000);
  }, []);

  const copyToClipboard = async (text, id = null) => {
    const cleanText = text.replace(/\s/g, ''); 
    const onSuccess = () => {
      showToast(d.copied);
      if (id) {
        setCopiedPaymentId(id);
        setTimeout(() => setCopiedPaymentId(current => current === id ? null : current), 2000);
      }
    };
    try {
      await navigator.clipboard.writeText(cleanText);
      onSuccess();
    } catch (err) {
      const textArea = document.createElement("textarea");
      textArea.value = cleanText;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        onSuccess();
      } catch (err) {
        showToast(d.copyError, true);
      }
      document.body.removeChild(textArea);
    }
  };

  const handleInstallPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') setDeferredPrompt(null);
    } else {
      showToast(d.installHint);
    }
  };

  const handleDownloadVCard = () => {
    const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${data.master.name}\nTEL;TYPE=CELL:+37400000000\nTITLE:${d.spec}\nURL:${window.location.href}\nEND:VCARD`;
    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Contact_${data.master.name}.vcf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const openBooking = (customSlot = null) => {
    const defaultService = data.services[0];
    let defaultSlot = (customSlot && customSlot.fullDate) ? customSlot : null;
    if (!defaultSlot && availableDates.length > 0) {
      defaultSlot = { fullDate: availableDates[0].fullDate, displayDate: availableDates[0].shortDate, time: availableDates[0].times[0] };
    }
    setBookingModal({ isOpen: true, services: [defaultService], slot: defaultSlot });
    setFormState({ name: "", phone: "", whatsapp: "", sameAsPhone: true, comment: "", isSubmitting: false, isSuccess: false });
    
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
  };

  const closeBooking = () => {
    setBookingModal({ isOpen: false, services: [], slot: null });
    setOpenDropdown(null);
    
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setFormState(prev => ({ ...prev, isSubmitting: true }));
    
    const cleanPhone = `+${formState.phone.replace(/\D/g, '')}`;
    const cleanWa = formState.sameAsPhone ? cleanPhone : (formState.whatsapp ? `+${formState.whatsapp.replace(/\D/g, '')}` : '');
    const combinedServices = bookingModal.services.map(s => s.name).join(' + ');
    
    const payload = {
      name: formState.name,
      phone: cleanPhone, 
      whatsapp: cleanWa,
      comment: formState.comment,
      service: combinedServices,
      slot: `${bookingModal.slot?.fullDate} ${bookingModal.slot?.time}`,
      timestamp: new Date().toISOString()
    };

    if (GOOGLE_APPS_SCRIPT_URL) {
      try {
        const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
          method: 'POST',
          redirect: 'follow',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8', 
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();

        if (responseData.status === 'success') {
          setFormState(prev => ({ ...prev, isSubmitting: false, isSuccess: true }));
          
          if (bookingModal.slot) {
             setAvailableDates(prevDates => {
                const newDates = [...prevDates];
                const dateObj = newDates.find(day => day.fullDate === bookingModal.slot.fullDate);
                if (dateObj) {
                   dateObj.times = dateObj.times.filter(t => t !== bookingModal.slot.time);
                }
                return newDates.filter(day => day.times.length > 0);
             });
          }
          
          setTimeout(closeBooking, 3000);
        } else if (responseData.status === 'error' && responseData.message === 'SLOT_TAKEN') {
          throw new Error(d.slotTakenError);
        } else {
          throw new Error(responseData.message || 'Server error');
        }
      } catch (err) {
        console.error("Ошибка отправки:", err);
        setFormState(prev => ({ ...prev, isSubmitting: false }));
        if (err.message === d.slotTakenError) {
           showToast(err.message, true);
        } else {
           showToast(d.submitError || "Ошибка отправки", true);
        }
      }
    }
  };

  const vacationDays = rawDates.filter(d => d.times && d.times[0] === 'отпуск');
  let showBanner = false;
  let bannerText = d.upcomingVacation;

  if (vacationDays.length > 0) {
    showBanner = true;
    const firstDay = parseSheetDate(vacationDays[0].date, lang).shortDate;
    const lastDay = parseSheetDate(vacationDays[vacationDays.length - 1].date, lang).shortDate;
    bannerText = d.upcomingVacationDates(firstDay, lastDay);
  } else if (availableDates.length > 0 && availableDates.length <= 5) {
    showBanner = true;
    bannerText = d.upcomingVacation;
  }

  const categories = [...new Set(data.services.map(s => s.category))];
  const filteredServices = data.services.filter(s => s.category === activeCategory);

  return (
    <div className={`app-wrapper font-sans selection:bg-rose-200 antialiased flex flex-col relative transition-colors duration-300 min-h-[100dvh] w-full overflow-x-hidden ${t.appBg} ${t.appTextMain}`}>
      <Toast message={toast.message} isVisible={toast.visible} isError={toast.isError} />

      <TemplateHeader 
        activeTemplate={activeTemplate}
        switchTemplate={switchTemplate}
        lang={lang}
        handleLanguageChange={handleLanguageChange}
      />

      <Header 
        activeTemplate={activeTemplate}
        data={data}
        d={d}
        openBooking={openBooking}
      />

      <main className="px-5 mt-6 w-full max-w-md mx-auto space-y-10 flex-1 relative z-10">
        <SlotsSection 
          activeTemplate={activeTemplate}
          d={d}
          t={t}
          isLoadingDates={isLoadingDates}
          flattenedSlots={flattenedSlots}
          vacationDays={vacationDays}
          bannerText={bannerText}
          showBanner={showBanner}
          openBooking={openBooking}
        />

        <ServicesSection 
          activeTemplate={activeTemplate}
          d={d}
          t={t}
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          filteredServices={filteredServices}
          expandedServiceId={expandedServiceId}
          setExpandedServiceId={setExpandedServiceId}
        />

        <PaymentsSection 
          activeTemplate={activeTemplate}
          d={d}
          t={t}
          data={data}
          copiedPaymentId={copiedPaymentId}
          copyToClipboard={copyToClipboard}
        />

        <RulesSection 
          activeTemplate={activeTemplate}
          d={d}
          t={t}
          data={data}
        />

        <ReviewsSection 
          activeTemplate={activeTemplate}
          d={d}
          t={t}
        />
      </main>

      <Footer 
        activeTemplate={activeTemplate}
        d={d}
        t={t}
        data={data}
        setIsQrOpen={setIsQrOpen}
        handleDownloadVCard={handleDownloadVCard}
        handleInstallPWA={handleInstallPWA}
      />

      <FloatingBookingButton 
        bookingModal={bookingModal}
        isQrOpen={isQrOpen}
        showFab={showFab}
        openBooking={openBooking}
        activeTemplate={activeTemplate}
        d={d}
      />

      <QrModal 
        isQrOpen={isQrOpen}
        setIsQrOpen={setIsQrOpen}
        t={t}
        d={d}
      />

      <BookingModal 
        bookingModal={bookingModal}
        setBookingModal={setBookingModal}
        closeBooking={closeBooking}
        formState={formState}
        setFormState={setFormState}
        handleBookingSubmit={handleBookingSubmit}
        formatPhone={formatPhone}
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
        availableDates={availableDates}
        data={data}
        t={t}
        d={d}
        showToast={showToast}
      />

      <style dangerouslySetInnerHTML={{__html: `
        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          -webkit-tap-highlight-color: transparent;
          transition: background-color 0.3s ease;
          overscroll-behavior: none !important;
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes slideUp { from { transform: translateY(10%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes slideDown { from { transform: translateY(-10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}} />
    </div>
  );
}
