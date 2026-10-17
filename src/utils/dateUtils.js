import { DICT } from '../constants/translations';

export const parseSheetDate = (dateStr, lang) => {
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

export const detectPhoneLanguage = () => {
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
