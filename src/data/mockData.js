import { Phone, CreditCard } from 'lucide-react';
import { DICT } from '../constants/translations';
import { WalletIcon } from '../components/Icons';

export const getMockData = (lang) => ({
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
