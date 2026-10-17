import React from 'react';
import { Check, X } from 'lucide-react';

export const Toast = ({ message, isVisible, isError = false }) => (
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
