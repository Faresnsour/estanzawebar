import React from 'react';
import { MessageCircle, ArrowLeft } from 'lucide-react';
import EstanzaLogo from './EstanzaLogo';

export default function FinalCTA() {
  return (
    <section id="contact" className="w-full py-12 lg:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dark Container in Deep Forest Onyx #05221C */}
        <div className="bg-[#05221C] text-white rounded-3xl p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl border border-[#008774]/30">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#008774]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-[#008774]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            
            <div className="flex justify-center mb-5">
              <EstanzaLogo className="w-12 h-12 shadow-lg" showBadge={true} />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight leading-[1.2]">
              أوقف نزيف الحجوزات.. وثبّت مواعيد مركزك تلقائياً
            </h2>

            <p className="mt-4 text-emerald-100/80 text-base sm:text-lg leading-relaxed">
              تواصل معنا عبر واتساب الآن، ونجهّز نظام الحجز المخصص لمركزك بالكامل خلال 3 أيام.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/962790000000?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20Estanza%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%AA%D8%AC%D9%87%D9%8A%D8%B2%20%D9%86%D8%B8%D8%A7%D9%85%20%D8%A7%D9%84%D8%AD%D8%AC%D9%88%D8%B2%D8%A7%D8%AA%20%D9%84%D9%85%D8%B1%D9%83%D8%B2%D9%86%D8%A7"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#008774] hover:bg-[#00a890] active:scale-[0.98] text-white font-bold text-base px-8 py-4 rounded-xl shadow-lg shadow-emerald-950/40 hover:shadow-xl transition-all"
              >
                <MessageCircle className="w-5 h-5 text-emerald-100" />
                <span>تواصل معنا عبر واتساب</span>
                <ArrowLeft className="w-4 h-4 text-emerald-100" />
              </a>
            </div>

            <p className="mt-5 text-xs text-emerald-200/70 font-medium">
              دفع مباشر (CliQ / كاش) · دفعة 50% فقط للبدء · ضمان تشغيلي كامل
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
