import React from 'react';
import EstanzaLogo from './EstanzaLogo';

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200/80 bg-white py-8 mt-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
        <div className="flex items-center gap-2.5">
          <EstanzaLogo className="w-7 h-7" showBadge={true} />
          <span className="font-bold text-[#05221C]">إستانزا • Estanza</span>
        </div>
        <p className="text-xs text-slate-500">
          جميع الحقوق محفوظة © {new Date().getFullYear()} أنظمة حجز وأتمتة الأعمال المحلية.
        </p>
      </div>
    </footer>
  );
}
