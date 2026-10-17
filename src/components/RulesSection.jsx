import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { SectionTitle } from './SectionTitle';

export const RulesSection = ({
  activeTemplate,
  d,
  t,
  data
}) => {
  return (
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
  );
};
