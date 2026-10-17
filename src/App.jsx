import React, { useState, useEffect, useCallback } from 'react';
import { 
  Calendar, Clock, MapPin, Sparkles, Copy, Check, 
  Phone, Send, X, ChevronDown, CreditCard, 
  Info, ShieldAlert, Star, Palette, QrCode, UserPlus, 
  Smartphone, ExternalLink
} from 'lucide-react';

function Instagram({ size = 24, className = '', ...props }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function WalletIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
      <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
    </svg>
  );
}

const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyWGAIKHax3W0f9gHzsDrX2THVtI6IWmlqDozgV1j7KLhcRaNKY5AgvhJgOybQTZyBxyQ/exec'; 

const formatPhone = (val) => {
  let v = val.replace(/\D/g, '');
  if (!v) return '';
  if (v.startsWith('7')) {
    let res = '7';
    if (v.length > 1) res += ` (${v.substring(1, 4)}`;
    if (v.length > 4) res += `) ${v.substring(4, 7)}`;
    if (v.length > 7) res += `-${v.substring(7, 9)}`;
    if (v.length > 9) res += `-${v.substring(9, 11)}`;
    return res;
  }
  if (v.startsWith('374')) {
    let res = '374';
    if (v.length > 3) res += ` (${v.substring(3, 5)}`;
    if (v.length > 5) res += `) ${v.substring(5, 11)}`;
    return res;
  }
  if (v.length <= 2) return v;
  if (v.startsWith('3') || v.startsWith('4') || v.startsWith('8') || v.startsWith('9')) {
     let res = v.substring(0, 2);
     if (v.length > 2) res += ` (${v.substring(2, 5)}`;
     if (v.length > 5) res += `) ${v.substring(5, 8)}`;
     if (v.length > 8) res += `-${v.substring(8, 14)}`;
     return res;
  }
  let res = v.substring(0, 3);
  if (v.length > 3) res += ` (${v.substring(3, 6)}`;
  if (v.length > 6) res += `) ${v.substring(6, 10)}`;
  if (v.length > 10) res += `-${v.substring(10, 15)}`;
  return res;
};

const DICT = {
  hy: {
    spec: "Մատնահարդար և Էսթետիկայի Վարպետ",
    city: "Էջմիածին",
    location: "Էջմիածին, Մաշտոցի փող., 48",
    status: "Ընդունումը գրանցումով",
    bookOnline: "Գրանցվել առցանց",
    availableSlots: "Ազատ պատուհաններ",
    nearestWindows: "Մոտակա ազատ պատուհանները՝",
    availableDatesInfo: "Հստակ ժամը և ծառայությունը ընտրվում են գրանցման ժամանակ:",
    priceList: "Գնացուցակ",
    paymentDetails: "Վճարման տվյալներ",
    rules: "Ընդունելության կանոններ",
    leaveReview: "Թողնել կարծիք",
    contactMe: "Կապվել ինձ հետ",
    rights: "Բոլոր իրավունքները պաշտպանված են:",
    addToContacts: "Պահպանել կոնտակտներում",
    showQr: "Ցույց տալ QR կոդը",
    installApp: "Տեղադրել հավելվածը (PWA)",
    scanQr: "Սկանավորեք արագ մուտքի համար",
    bookingTitle: "Գրանցման ձևակերպում",
    service: "Ծառայություն (մինչև 2)",
    time: "Ժամանակ",
    yourName: "Ձեր անունը",
    namePlaceholder: "Օրինակ՝ Աննա",
    phoneNum: "Հեռախոսահամար",
    phonePlaceholder: "374 (99) 123456",
    commentLabel: "Մեկնաբանություն (ընտրովի)",
    commentPlaceholder: "Ցանկություններ, հարցեր...",
    waCheckbox: "WhatsApp-ը նույն համարով է",
    waLabel: "WhatsApp Համար",
    waPlaceholder: "374 (99) 123456",
    confirmBooking: "Հաստատել գրանցումը",
    sending: "Ուղարկվում է...",
    successTitle: "Հայտը ուղարկված է!",
    successText: "Շնորհակալություն: Ես կկապվեմ ձեզ հետ շուտով հաստատման համար:",
    copied: "Պատճենված է",
    copyError: "Պատճենման սխալ",
    submitError: "Ուղարկման սխալ: Ստուգեք ինտերնետ կապը:",
    slotTakenError: "Ներողություն, այս ժամն արդեն զբաղված է: Խնդրում ենք ընտրել այլ ժամ:",
    installHint: 'Սեղմեք "Կիսվել" և ընտրեք "Ավելացնել էկրանին"',
    loadingSlots: "Համաժամացում...",
    noSlots: "Այս պահին ազատ պատուհաններ չկան կամ վարպետը արձակուրդում է 🌴 Մոտ օրերս նոր պատուհաններ կավելանան:",
    upcomingVacation: "Շուտով արձակուրդ է 🌴 Հասցրեք գրանցվել մնացած ազատ օրերին!",
    upcomingVacationDates: (start, end) => `Շուտով արձակուրդ է 🌴 (${start} - ${end}): Հասցրեք գրանցվել վերջին ազատ օրերին!`,
    maxServices: "Կարող եք ընտրել առավելագույնը 2 ծառայություն",
    s_manicure: "Մատնահարդարում",
    s_pedicure: "Պեդիկյուր",
    s_design: "Դիզայն և խնամք",
    today: "Այսօր",
    tomorrow: "Վաղը",
    pol1: "Կանխավճար 2000 AMD ժամանակը ֆիքսելու համար:",
    pol2: "Ավելի քան 15 րոպե ուշացում = գրանցման չեղարկում:",
    pol3: "Խնդրում ենք գալ առանց ուղեկցողների:",
    pol4: "Ծածկույթի երաշխիք — 5 օր:",
    maps: "Քարտեզներ",
    consent: "Սեղմելով կոճակը՝ դուք համաձայնվում եք անձնական տվյալների մշակմանը:",
    slotsOpenLater: "Նոր պատուհաններ կավելանան ավելի ուշ:"
  },
  ru: {
    spec: "Nail & Aesthetic Master",
    city: "г. Эчмиадзин",
    location: "г. Эчмиадзин, ул. Маштоца, 48",
    status: "Прием по записи",
    bookOnline: "Записаться онлайн",
    availableSlots: "Свободные окна",
    nearestWindows: "Ближайшие свободные окна есть на:",
    availableDatesInfo: "Точное время и услуга выбираются при оформлении записи.",
    priceList: "Прайс-лист",
    paymentDetails: "Реквизиты для оплаты",
    rules: "Правила приема",
    leaveReview: "Оставить отзыв",
    contactMe: "Связаться со мной",
    rights: "Все права защищены.",
    addToContacts: "Добавить в контакты",
    showQr: "Показать QR-код",
    installApp: "Установить приложение (PWA)",
    scanQr: "Сканируйте для быстрого доступа",
    bookingTitle: "Оформление записи",
    service: "Услуга (до 2-х)",
    time: "Время",
    yourName: "Ваше Имя",
    namePlaceholder: "Например, Анна",
    phoneNum: "Номер телефона",
    phonePlaceholder: "374 (99) 123456",
    commentLabel: "Комментарий (необязательно)",
    commentPlaceholder: "Особенности, пожелания...",
    waCheckbox: "WhatsApp на этом же номере",
    waLabel: "Номер WhatsApp",
    waPlaceholder: "374 (99) 123456",
    confirmBooking: "Подтвердить запись",
    sending: "Оформляем...",
    successTitle: "Заявка отправлена!",
    successText: "Спасибо! Я свяжусь с вами в ближайшее время для подтверждения записи.",
    copied: "Скопировано в буфер!",
    copyError: "Ошибка копирования",
    submitError: "Ошибка отправки. Проверьте интернет или попробуйте позже.",
    slotTakenError: "К сожалению, это время только что заняли. Пожалуйста, выберите другое.",
    installHint: 'Нажмите "Поделиться" -> "На экран Домой"',
    loadingSlots: "Синхронизация расписания...",
    noSlots: "Свободных окон пока нет или мастер в отпуске 🌴 Окошки скоро появятся.",
    upcomingVacation: "Скоро отпуск 🌴 Успейте занять последние свободные окна!",
    upcomingVacationDates: (start, end) => `Скоро отпуск 🌴 (${start} - ${end}). Успейте занять последние окна!`,
    maxServices: "Можно выбрать максимум 2 услуги",
    s_manicure: "Маникюр",
    s_pedicure: "Педикюр",
    s_design: "Дизайн & Уход",
    today: "Сегодня",
    tomorrow: "Завтра",
    pol1: "Предоплата 2000 AMD для фиксации времени.",
    pol2: "Опоздание более 15 минут = отмена записи (предоплата не возвращается).",
    pol3: "Приходите, пожалуйста, без сопровождающих.",
    pol4: "Гарантия на покрытие — 5 дней.",
    maps: "Карты",
    consent: "Нажимая кнопку, вы даете согласие на обработку персональных данных.",
    slotsOpenLater: "Окошки откроются позже."
  },
  en: {
    spec: "Nail & Aesthetic Master",
    city: "Echmiadzin",
    location: "Echmiadzin, Mashtots st., 48",
    status: "By appointment",
    bookOnline: "Book Online",
    availableSlots: "Available Slots",
    nearestWindows: "Nearest available slots:",
    availableDatesInfo: "Exact time and service are selected during booking.",
    priceList: "Price List",
    paymentDetails: "Payment Details",
    rules: "Booking Rules",
    leaveReview: "Leave a Review",
    contactMe: "Contact Me",
    rights: "All rights reserved.",
    addToContacts: "Save Contact",
    showQr: "Show QR Code",
    installApp: "Install App (PWA)",
    scanQr: "Scan for quick access",
    bookingTitle: "Book Appointment",
    service: "Service (up to 2)",
    time: "Time",
    yourName: "Your Name",
    namePlaceholder: "e.g., Anna",
    phoneNum: "Phone Number",
    phonePlaceholder: "374 (99) 123456",
    commentLabel: "Comment (optional)",
    commentPlaceholder: "Preferences, questions...",
    waCheckbox: "WhatsApp on the same number",
    waLabel: "WhatsApp Number",
    waPlaceholder: "374 (99) 123456",
    confirmBooking: "Confirm Booking",
    sending: "Sending...",
    successTitle: "Request Sent!",
    successText: "Thank you! I will contact you shortly to confirm the appointment.",
    copied: "Copied!",
    copyError: "Copy error",
    submitError: "Sending error. Check your connection or try again later.",
    slotTakenError: "Sorry, this slot was just taken. Please choose another time.",
    installHint: 'Tap "Share" and select "Add to Home Screen"',
    loadingSlots: "Syncing schedule...",
    noSlots: "No available slots at the moment or the master is on vacation 🌴 New slots will appear soon.",
    upcomingVacation: "Upcoming vacation 🌴 Book the last available slots!",
    upcomingVacationDates: (start, end) => `Upcoming vacation 🌴 (${start} - ${end}): Book the last slots!`,
    maxServices: "You can select a maximum of 2 services",
    s_manicure: "Manicure",
    s_pedicure: "Pedicure",
    s_design: "Design & Care",
    today: "Today",
    tomorrow: "Tomorrow",
    pol1: "A 2000 AMD deposit is required to secure your time.",
    pol2: "Being more than 15 minutes late = cancellation.",
    pol3: "Please come without companions.",
    pol4: "Coverage guarantee — 5 days.",
    maps: "Maps",
    consent: "By clicking the button, you consent to the processing of personal data.",
    slotsOpenLater: "Slots will open later."
  }
};

const getMockData = (lang) => ({
  master: {
    name: lang === 'hy' ? "Անի Սարգսյան" : (lang === 'en' ? "Ani Sargsyan" : "Ани Саркисян"),
    specialization: DICT[lang].spec,
    city: DICT[lang].city,
    location: DICT[lang].location,
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Эчмиадзин+Маштоца+48",
    avatar: "/photo-1.jpg",
    status: DICT[lang].status
  },
  services: [
    {
      id: "s1",
      category: DICT[lang].s_manicure,
      name: lang === 'hy' ? "Ապարատային մատնահարդարում + Գել-լաք" : (lang === 'en' ? "Hardware Manicure + Gel Polish" : "Аппаратный маникюр + Гель-лак"),
      duration: lang === 'hy' ? "1.5 - 2 ժամ" : (lang === 'en' ? "1.5 - 2 hours" : "1.5 - 2 часа"),
      price: 8000,
      description: lang === 'hy' ? "Հեռացում, համակցված մատնահարդարում, եղունգի թիթեղի հարթեցում և մեկ գույնով ծածկում:" : (lang === 'en' ? "Removal, combined manicure, nail plate leveling, and solid color coating." : "Снятие, комбинированный маникюр, выравнивание ногтевой пластины и покрытие в один тон.")
    },
    {
      id: "s2",
      category: DICT[lang].s_manicure,
      name: lang === 'hy' ? "Եղունգների երկարացում" : (lang === 'en' ? "Nail Extension" : "Наращивание ногтей"),
      duration: lang === 'hy' ? "2.5 - 3 ժամ" : (lang === 'en' ? "2.5 - 3 hours" : "2.5 - 3 часа"),
      price: 13000,
      description: lang === 'hy' ? "Եղունգների մոդելավորում պոլիգելով/գելով, ապարատային մատնահարդարում, գել-լաքի ծածկույթ:" : (lang === 'en' ? "Nail modeling with polygel/gel, hardware manicure, gel polish coating." : "Моделирование ногтей полигелем/гелем, аппаратный маникюр, покрытие гель-лаком.")
    },
    {
      id: "s3",
      category: DICT[lang].s_pedicure,
      name: lang === 'hy' ? "Smart-պեդիկյուր ծածկույթով" : (lang === 'en' ? "Smart Pedicure with Coating" : "Smart-педикюр с покрытием"),
      duration: lang === 'hy' ? "1.5 ժամ" : (lang === 'en' ? "1.5 hours" : "1.5 часа"),
      price: 10000,
      description: lang === 'hy' ? "Ոտնաթաթի ամբողջական մշակում սկավառակներով, մատների մշակում և գել-լաքի ծածկույթ:" : (lang === 'en' ? "Full foot treatment with discs, toe treatment, and gel polish coating." : "Полная обработка стопы дисками, обработка пальчиков и покрытие гель-лаком.")
    },
    {
      id: "s4",
      category: DICT[lang].s_pedicure,
      name: lang === 'hy' ? "Էքսպրես պեդիկյուր" : (lang === 'en' ? "Express Pedicure" : "Экспресс-педикюр"),
      duration: lang === 'hy' ? "1 ժամ" : (lang === 'en' ? "1 hour" : "1 час"),
      price: 7000,
      description: lang === 'hy' ? "Միայն մատների մշակում (առանց ոտնաթաթի) + գել-լաքի ծածկույթ:" : (lang === 'en' ? "Toe treatment only (without foot) + gel polish coating." : "Обработка только пальчиков (без стопы) + покрытие гель-лаком.")
    },
    {
      id: "s5",
      category: DICT[lang].s_design,
      name: lang === 'hy' ? "Ֆրենչ / Լուսնային դիզայն" : (lang === 'en' ? "French / Moon Design" : "Френч / Лунный дизайн"),
      duration: lang === 'en' ? "+ 30 mins" : (lang === 'hy' ? "+ 30 րոպե" : "+ 30 минут"),
      price: 2000,
      description: lang === 'hy' ? "Դասական կամ գունավոր ֆրենչ բոլոր մատների վրա:" : (lang === 'en' ? "Classic or colored French on all fingers." : "Классический или цветной френч на все пальцы.")
    },
    {
      id: "s6",
      category: DICT[lang].s_design,
      name: lang === 'hy' ? "Ամրացում ակրիլային փոշով" : (lang === 'en' ? "Acrylic Powder Strengthening" : "Укрепление акриловой пудрой"),
      duration: lang === 'en' ? "+ 15 mins" : (lang === 'hy' ? "+ 15 րոպե" : "+ 15 минут"),
      price: 1000,
      description: lang === 'hy' ? "Լրացուցիչ ամրացում բարակ և փխրուն եղունգների համար:" : (lang === 'en' ? "Additional strengthening for thin and brittle nails." : "Дополнительное укрепление для тонких и ломких ногтей.")
    }
  ],
  payments: [
    { id: "p1", name: "IDram", number: "123 456 789", icon: WalletIcon },
    { id: "p2", name: "Telcell Wallet", number: "098 765 432", icon: Phone },
    { id: "p3", name: "ArCa / Visa", number: "4000 1234 5678 9010", icon: CreditCard }
  ],
  policies: [
    DICT[lang].pol1,
    DICT[lang].pol2,
    DICT[lang].pol3,
    DICT[lang].pol4
  ]
});

const THEMES_V1 = {
  appBg: "bg-[#FAF7F2]", appTextMain: "text-[#2B231F]", appTextSub: "text-[#6E6359]", headerBg: "bg-transparent",
  avatarBorder: "border-[#EADBCE]", glow: "bg-[#C5A059]/10", cardBg: "bg-[#FFFFFF]", cardBorder: "border-[#EADBCE]/80",
  cardTextMain: "text-[#2B231F]", cardTextSub: "text-[#6E6359]", btnPrimary: "bg-[#2C2420] text-[#FAF8F5] shadow-[#2C2420]/20",
  accentText: "text-[#9E7A3E]", accentBg: "bg-[#C5A059]/10", badgeBg: "bg-[#F0EAE1]", badgeText: "text-[#2B231F]",
  statusBadgeBg: "bg-[#C5A059]/15", statusBadgeText: "text-[#9E7A3E]", tabActive: "bg-[#2C2420] text-[#FAF8F5]",
  tabInactive: "bg-[#FFFFFF] text-[#6E6359] border-[#EADBCE]/80", btnSecondary: "bg-[#FAF7F2] text-[#2B231F] hover:bg-[#F0EAE1]",
  iconWrapper: "bg-[#F0EAE1] text-[#9E7A3E]", policyBg: "bg-[#FFFFFF]", bullet: "bg-[#C5A059]", footerBg: "bg-[#FAF7F2]",
  footerBorder: "border-[#EADBCE]/80", modalBg: "bg-[#FAF7F2]", grabber: "bg-[#EADBCE]", inputBg: "bg-[#FFFFFF] focus-within:bg-[#FAF7F2]",
  inputBorder: "border-[#EADBCE] focus-within:border-[#C5A059]", inputFocusRing: "focus-within:ring-[#C5A059]/30",
  inputText: "text-[#2B231F]", successIcon: "text-[#C5A059]", successBg: "bg-[#C5A059]/15", statusDotBg: "bg-emerald-500",
  cardShadow: "shadow-[0_4px_24px_-8px_rgba(44,36,32,0.06)]", pillBg: "bg-black/5", skeletonBg: "bg-black/5",
};

const THEMES_V2 = {
  appBg: "bg-[#F5F2EB]", appTextMain: "text-[#1E1C1A]", appTextSub: "text-[#6B635B]", headerBg: "bg-transparent",
  avatarBorder: "border-[#E2DDD3]", glow: "bg-[#E2DDD3]/40", cardBg: "bg-[#FCFAF7]", cardBorder: "border-[#E5DFD5]",
  cardTextMain: "text-[#1E1C1A]", cardTextSub: "text-[#6B635B]", btnPrimary: "bg-[#1E1C1A] text-[#FAF8F5] shadow-[#1E1C1A]/15",
  accentText: "text-[#1E1C1A]", accentBg: "bg-[#EAE4D9]", badgeBg: "bg-[#EAE4D9]", badgeText: "text-[#1E1C1A]",
  statusBadgeBg: "bg-[#EAE4D9]", statusBadgeText: "text-[#1E1C1A]", tabActive: "bg-[#1E1C1A] text-[#FAF8F5]",
  tabInactive: "bg-[#FCFAF7] text-[#6B635B] border-[#E5DFD5]", btnSecondary: "bg-[#F5F2EB] text-[#1E1C1A] hover:bg-[#EAE4D9]",
  iconWrapper: "bg-[#EAE4D9] text-[#1E1C1A]", policyBg: "bg-[#FCFAF7]", bullet: "bg-[#1E1C1A]", footerBg: "bg-[#F5F2EB]",
  footerBorder: "border-[#E5DFD5]", modalBg: "bg-[#F5F2EB]", grabber: "bg-[#D8D0C5]", inputBg: "bg-[#FCFAF7] focus-within:bg-[#F5F2EB]",
  inputBorder: "border-[#E5DFD5] focus-within:border-[#1E1C1A]", inputFocusRing: "focus-within:ring-[#1E1C1A]/20",
  inputText: "text-[#1E1C1A]", successIcon: "text-emerald-700", successBg: "bg-emerald-50", statusDotBg: "bg-emerald-600",
  cardShadow: "shadow-[0_2px_15px_-4px_rgba(30,28,26,0.05)]", pillBg: "bg-[#EAE4D9]", skeletonBg: "bg-black/5",
};

const THEMES = {
  obsidian: THEMES_V1,
  carbon: THEMES_V2
};

const THEME_OPTIONS = [
  { id: 'obsidian', color: '#FAF7F2', border: '#C5A059' },
  { id: 'carbon', color: '#F5F2EB', border: '#1E1C1A' }
];

const Toast = ({ message, isVisible, isError = false }) => (
  <div 
    className={`fixed left-1/2 -translate-x-1/2 z-[200] px-5 py-3.5 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex items-center gap-3 transition-all duration-400 ease-out border-2 bg-zinc-900 text-white border-zinc-700 ${
      isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-12 scale-90 pointer-events-none'
    }`}
    style={{ top: 'calc(1.5rem + env(safe-area-inset-top))' }}
  >
    <div className={`rounded-full p-1 text-black flex-shrink-0 flex items-center justify-center ${isError ? 'bg-red-500' : 'bg-emerald-500'}`}>
      {isError ? <X size={14} strokeWidth={4} className="text-white" /> : <Check size={14} strokeWidth={4} />}
    </div>
    <span className="text-sm font-bold whitespace-nowrap tracking-wide max-w-[250px] overflow-hidden text-ellipsis">{message}</span>
  </div>
);

const SectionTitle = ({ title, icon: Icon, t, activeTemplate }) => {
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

const parseSheetDate = (dateStr, lang) => {
  const [d, m, y] = dateStr.split('.');
  const dateObj = new Date(y, m - 1, d);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  let label = "";
  if (dateObj.getTime() === today.getTime()) label = DICT[lang].today;
  else if (dateObj.getTime() === tomorrow.getTime()) label = DICT[lang].tomorrow;

  const monthsRu = ["Янв", "Фев", "Мар", "Апр", "Мая", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];
  const monthsHy = ["Հնվ", "Փտվ", "Մար", "Ապր", "Մայ", "Հնս", "Հլս", "Օգս", "Սեպ", "Հոկ", "Նոյ", "Դեկ"];
  const monthsEn = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const shortDate = `${parseInt(d)} ${lang === 'ru' ? monthsRu[dateObj.getMonth()] : (lang === 'en' ? monthsEn[dateObj.getMonth()] : monthsHy[dateObj.getMonth()])}`;

  return { shortDate, label, fullDate: dateStr };
};

const detectPhoneLanguage = () => {
  if (typeof window === 'undefined') return 'ru';
  const saved = localStorage.getItem('app-lang');
  if (saved && ['hy', 'ru', 'en'].includes(saved)) {
    return saved;
  }
  const userLangs = (typeof navigator !== 'undefined' && (navigator.languages || [navigator.language])) || [];
  for (const l of userLangs) {
    if (!l) continue;
    const code = l.toLowerCase();
    if (code.startsWith('hy')) return 'hy';
    if (code.startsWith('ru') || code.startsWith('be') || code.startsWith('uk')) return 'ru';
    if (code.startsWith('en')) return 'en';
  }
  return 'ru';
};

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
      if (v === '1' || v === '2') return v;
      const saved = localStorage.getItem('app-beauty-template');
      if (saved === '1' || saved === '2') return saved;
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
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  const [theme, setTheme] = useState(() => {
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

  const t = activeTemplate === '2' ? THEMES_V2 : THEMES_V1;

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

      {/* Шапка переключения шаблонов дизайна (Концепт 1 / Концепт 2) */}
      <div className="w-full bg-[#1E1C1A] text-[#FAF8F5] py-2.5 px-4 flex items-center justify-between text-xs border-b border-white/10 z-[100] sticky top-0 backdrop-blur-md shadow-md">
        <div className="flex items-center gap-2">
          <span className="opacity-50 text-[10px] uppercase font-mono tracking-wider">Шаблон:</span>
          <span className="font-semibold text-[11px] text-[#C5A059] tracking-wide">
            {activeTemplate === '1' ? '1. Vogue Cover' : '2. The Row'}
          </span>
        </div>
        <div className="flex items-center gap-1 bg-white/10 p-0.5 rounded-full">
          <button 
            onClick={() => switchTemplate('1')}
            className={`px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase transition-all duration-300 ${activeTemplate === '1' ? 'bg-[#C5A059] text-white font-bold shadow-sm' : 'text-white/70 hover:text-white'}`}
          >
            1. Vogue
          </button>
          <button 
            onClick={() => switchTemplate('2')}
            className={`px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase transition-all duration-300 ${activeTemplate === '2' ? 'bg-white text-[#1E1C1A] font-bold shadow-sm' : 'text-white/70 hover:text-white'}`}
          >
            2. The Row
          </button>
        </div>
      </div>

      {/* Top Bar: Minimal Language Switcher */}
      {activeTemplate === '1' ? (
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

      {/* Header: Vogue Editorial Cover vs Architectural Diptych */}
      {activeTemplate === '1' ? (
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
            onClick={openBooking} 
            className="mt-5 w-full py-4 px-6 rounded-full font-sans text-xs tracking-[0.25em] uppercase font-medium shadow-[0_12px_35px_-10px_rgba(197,160,89,0.35)] active:scale-[0.98] transition-all duration-300 flex items-center justify-between bg-gradient-to-r from-[#2C2420] via-[#3A3029] to-[#2C2420] text-[#FAF8F5] border border-[#C5A059]/40 group"
          >
            <span className="pl-2">{d.bookOnline}</span>
            <div className="w-8 h-8 rounded-full bg-[#C5A059] text-white flex items-center justify-center transition-transform duration-300 group-hover:rotate-12">
              <Calendar size={15} />
            </div>
          </button>
        </header>
      ) : (
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
            onClick={openBooking} 
            className="mt-5 w-full py-4 px-6 bg-[#1E1C1A] hover:bg-[#2F2B27] text-[#FAF8F5] text-xs uppercase tracking-[0.25em] font-medium transition-all duration-300 flex items-center justify-between group active:scale-[0.99]"
          >
            <span>{d.bookOnline}</span>
            <span className="font-mono text-sm tracking-normal transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </header>
      )}

      <main className="px-5 mt-6 w-full max-w-md mx-auto space-y-10 flex-1 relative z-10">
        
        {/* Свободные окна */}
        <section>
          {activeTemplate === '1' ? (
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

        {/* Услуги */}
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

        <section>
          <SectionTitle title={d.paymentDetails} icon={CreditCard} t={t} activeTemplate={activeTemplate} />
          <div className={`${activeTemplate === '2' ? 'rounded-none border-[#E5DFD5]' : 'rounded-3xl ' + t.cardBorder} p-2 border flex flex-col gap-1 transition-colors duration-300 ${t.cardBg} ${t.cardShadow}`}>
            {data.payments.map(payment => (
              <div 
                key={payment.id} 
                onClick={() => copyToClipboard(payment.number, payment.id)}
                className={`flex items-center justify-between p-3 ${activeTemplate === '2' ? 'rounded-none' : 'rounded-2xl'} cursor-pointer transition-all duration-300 active:scale-95 hover:bg-black/5 dark:hover:bg-white/5`}
              >
                <div className="flex items-center gap-3 pointer-events-none">
                  <div className={`w-10 h-10 ${activeTemplate === '2' ? 'rounded-none' : 'rounded-full'} flex items-center justify-center transition-colors duration-300 ${t.iconWrapper}`}>
                    <payment.icon size={20} />
                  </div>
                  <div>
                    <p className={`text-xs font-medium transition-colors duration-300 ${activeTemplate === '2' ? 'font-mono uppercase text-[10px] tracking-wider text-[#6B635B]' : t.cardTextSub}`}>{payment.name}</p>
                    <p className={`text-sm font-bold font-mono tracking-wide mt-0.5 transition-colors duration-300 ${t.cardTextMain}`}>{payment.number}</p>
                  </div>
                </div>
                <button className={`w-10 h-10 ${activeTemplate === '2' ? 'rounded-none' : 'rounded-full'} flex items-center justify-center transition-all duration-300 pointer-events-none ${t.cardTextSub}`}>
                  {copiedPaymentId === payment.id ? (
                    <Check size={18} className={`${t.successIcon} scale-110 transition-transform`} />
                  ) : (
                    <Copy size={18} className="transition-transform" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle title={d.rules} icon={ShieldAlert} t={t} activeTemplate={activeTemplate} />
          <div className={`${activeTemplate === '2' ? 'rounded-none border-[#E5DFD5]' : 'rounded-3xl ' + t.cardBorder} p-5 border transition-colors duration-300 ${t.policyBg}`}>
            <ul className="space-y-3">
              {data.policies.map((policy, idx) => (
                <li key={idx} className="flex gap-3 text-sm leading-snug">
                  <span className={`w-1.5 h-1.5 ${activeTemplate === '2' ? 'rounded-none' : 'rounded-full'} mt-1.5 flex-shrink-0 transition-colors duration-300 ${t.bullet}`} />
                  <span className={`transition-colors duration-300 ${activeTemplate === '2' ? 'font-mono text-xs tracking-wide text-[#3D3731]' : t.cardTextMain}`}>{policy}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

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

      </main>

      <footer className={`mt-12 pt-10 pb-36 px-5 flex flex-col items-center w-full transition-colors duration-300 relative z-10 ${t.footerBg}`}>
        <div className="w-full max-w-xs space-y-3 mb-8">
          <button onClick={() => setIsQrOpen(true)} className={`w-full py-3.5 ${activeTemplate === '2' ? 'rounded-none font-mono text-xs uppercase tracking-widest' : 'rounded-2xl font-sans text-xs uppercase tracking-wider font-medium'} flex items-center justify-center gap-3 transition-all duration-300 active:scale-95 ${t.btnSecondary}`}>
            <QrCode size={18} />
            {d.showQr}
          </button>
          <button onClick={handleDownloadVCard} className={`w-full py-3.5 ${activeTemplate === '2' ? 'rounded-none font-mono text-xs uppercase tracking-widest' : 'rounded-2xl font-sans text-xs uppercase tracking-wider font-medium'} flex items-center justify-center gap-3 transition-all duration-300 active:scale-95 ${t.btnSecondary}`}>
            <UserPlus size={18} />
            {d.addToContacts}
          </button>
          <button onClick={handleInstallPWA} className={`w-full py-3.5 ${activeTemplate === '2' ? 'rounded-none font-mono text-xs uppercase tracking-widest' : 'rounded-2xl font-sans text-xs uppercase tracking-wider font-medium'} flex items-center justify-center gap-3 transition-all duration-300 active:scale-95 ${t.btnSecondary} border-2 ${t.inputBorder.replace('focus-within:', '')}`}>
            <Smartphone size={18} />
            {d.installApp}
          </button>
        </div>

        <h3 
          className={`${activeTemplate === '2' ? 'text-xs uppercase tracking-[0.25em] font-mono text-[#1E1C1A] font-semibold' : 'text-2xl font-normal tracking-wide'} mb-6 transition-colors duration-300 ${t.appTextMain}`}
          style={activeTemplate === '1' ? { fontFamily: 'Didot, "Bodoni MT", "Cormorant Garamond", Georgia, serif' } : {}}
        >
          {d.contactMe}
        </h3>
        
        <div className="flex justify-center gap-4 mb-8">
          <a href="#" className={`w-12 h-12 ${activeTemplate === '2' ? 'rounded-none' : 'rounded-full'} flex items-center justify-center active:scale-90 transition-all duration-300 shadow-sm ${t.iconWrapper}`}>
            <Instagram size={22} />
          </a>
          <a href="#" className={`w-12 h-12 ${activeTemplate === '2' ? 'rounded-none' : 'rounded-full'} flex items-center justify-center active:scale-90 transition-all duration-300 shadow-sm ${t.iconWrapper}`}>
            <Send size={22} className="-ml-1" />
          </a>
          <a href="#" className={`w-12 h-12 ${activeTemplate === '2' ? 'rounded-none' : 'rounded-full'} flex items-center justify-center active:scale-90 transition-all duration-300 shadow-sm ${t.iconWrapper}`}>
            <Phone size={22} />
          </a>
        </div>
        
        <p className={`text-xs font-medium transition-colors duration-300 ${t.appTextSub}`}>© {new Date().getFullYear()} {data.master.name}. {d.rights}</p>
        
        <a 
          href="https://appseapro.com/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={`text-[10px] mt-8 font-medium opacity-30 hover:opacity-100 transition-opacity duration-300 ${t.appTextMain}`}
        >
          Design by Elena Sotnikova
        </a>
      </footer>

      <div className={`fixed bottom-6 left-0 right-0 z-[90] flex justify-center pointer-events-none transition-all duration-500 ease-out ${!bookingModal.isOpen && !isQrOpen ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-full max-w-md px-5">
          <div className={`w-full transition-all duration-500 ease-out ${showFab ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-12 opacity-0 pointer-events-none'}`}>
            <button 
              onClick={openBooking} 
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

      {isQrOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setIsQrOpen(false)} />
          <div className={`relative w-full max-w-sm rounded-3xl shadow-2xl p-8 flex flex-col items-center animate-[slideUp_0.3s_ease-out] transition-colors duration-300 ${t.modalBg}`}>
            <button onClick={() => setIsQrOpen(false)} className={`absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full active:scale-90 transition-all duration-300 ${t.iconWrapper}`}>
              <X size={18} />
            </button>
            <h3 className={`text-xl font-bold mb-6 text-center transition-colors duration-300 ${t.cardTextMain}`}>{d.scanQr}</h3>
            <div className="bg-white p-4 rounded-2xl shadow-inner w-64 h-64 flex items-center justify-center mb-2">
              <img src="/qr.png" alt="QR Code" className="w-full h-full object-contain" onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<span class="text-gray-400 text-sm text-center">QR.png not found</span>'; }}/>
            </div>
          </div>
        </div>
      )}

      {}
      {bookingModal.isOpen && (
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
      )}

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
