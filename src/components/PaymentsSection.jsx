import React from 'react';
import { CreditCard, Check, Copy } from 'lucide-react';
import { SectionTitle } from './SectionTitle';

export const PaymentsSection = ({
  activeTemplate,
  d,
  t,
  data,
  copiedPaymentId,
  copyToClipboard
}) => {
  return (
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
  );
};
