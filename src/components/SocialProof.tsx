import React from 'react';
import { Quote } from 'lucide-react';

export default function SocialProof() {
  return (
    <section className="py-12 bg-[#090A0B] border-y border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="relative bg-gradient-to-b from-[#111315] to-[#0D0E10] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl">
          <Quote className="w-8 h-8 text-[#00A884]/40 mb-3" />
          <blockquote className="text-sm sm:text-base text-zinc-200 leading-relaxed">
            &ldquo;وفر علينا حرق الوقت بالشات وتنسيق الروافع يدوي. الزبون صار يطلب الباقة ويثبت الموعد وهو مرتاح، وإشعار الحجز يوصلنا فوراً بكل التفاصيل.&rdquo;
          </blockquote>
          <div className="mt-4 flex items-center gap-3 pt-3 border-t border-white/5">
            <div className="w-9 h-9 rounded-full bg-[#00A884]/20 border border-[#00A884]/40 flex items-center justify-center text-xs font-bold text-[#00A884]">
              C
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-white">إدارة مركز العناية والتفصيل النخبوي</p>
              <p className="text-[11px] text-zinc-400">منطقة البيادر الصناعية — عمّان</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
