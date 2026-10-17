import React from 'react';
import { X } from 'lucide-react';

export const QrModal = ({ isQrOpen, setIsQrOpen, t, d }) => {
  if (!isQrOpen) return null;

  return (
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
  );
};
