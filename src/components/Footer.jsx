import React from 'react';
import { QrCode, UserPlus, Smartphone, Send, Phone } from 'lucide-react';
import { Instagram } from './Icons';

export const Footer = ({
  activeTemplate,
  d,
  t,
  data,
  setIsQrOpen,
  handleDownloadVCard,
  handleInstallPWA
}) => {
  return (
    <footer className={`mt-12 pt-10 pb-36 px-5 flex flex-col items-center w-full transition-colors duration-300 relative z-10 ${t.footerBg} ${activeTemplate === '3' ? 'rounded-t-[3rem]' : ''}`}>
      <div className="w-full max-w-xs space-y-3 mb-8">
        <button onClick={() => setIsQrOpen(true)} className={`w-full py-4 ${activeTemplate === '3' ? 'rounded-full font-medium text-xs tracking-wider uppercase' : (activeTemplate === '2' ? 'rounded-none font-mono text-xs uppercase tracking-widest' : 'rounded-2xl font-sans text-xs uppercase tracking-wider font-medium')} flex items-center justify-center gap-3 transition-all duration-300 active:scale-95 ${t.btnSecondary}`}>
          <QrCode size={18} />
          {d.showQr}
        </button>
        <button onClick={handleDownloadVCard} className={`w-full py-4 ${activeTemplate === '3' ? 'rounded-full font-medium text-xs tracking-wider uppercase' : (activeTemplate === '2' ? 'rounded-none font-mono text-xs uppercase tracking-widest' : 'rounded-2xl font-sans text-xs uppercase tracking-wider font-medium')} flex items-center justify-center gap-3 transition-all duration-300 active:scale-95 ${t.btnSecondary}`}>
          <UserPlus size={18} />
          {d.addToContacts}
        </button>
        <button onClick={handleInstallPWA} className={`w-full py-4 ${activeTemplate === '3' ? 'rounded-full font-medium text-xs tracking-wider uppercase' : (activeTemplate === '2' ? 'rounded-none font-mono text-xs uppercase tracking-widest' : 'rounded-2xl font-sans text-xs uppercase tracking-wider font-medium')} flex items-center justify-center gap-3 transition-all duration-300 active:scale-95 ${t.btnSecondary} border-2 ${t.inputBorder.replace('focus-within:', '')}`}>
          <Smartphone size={18} />
          {d.installApp}
        </button>
      </div>

      <h3 
        className={`${activeTemplate === '2' ? 'text-xs uppercase tracking-[0.25em] font-mono text-[#1E1C1A] font-semibold' : (activeTemplate === '3' ? 'text-xl sm:text-2xl font-normal tracking-tight' : 'text-2xl font-normal tracking-wide')} mb-6 transition-colors duration-300 ${t.appTextMain}`}
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
  );
};
