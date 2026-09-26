import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function GuaranteeSection() {
  return (
    <section id="guarantee" className="w-full py-8 lg:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Guarantee Box: Full-width container */}
        <div className="bg-white rounded-2xl border border-emerald-900/10 p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-5 text-right shadow-[0_4px_24px_-4px_rgba(5,34,28,0.06)] relative overflow-hidden">
          
          {/* Subtle ambient accent decoration */}
          <div className="absolute top-0 left-0 w-28 h-28 bg-[#008774]/5 rounded-full blur-xl pointer-events-none" />

          {/* Icon in soft tint container */}
          <div className="w-13 h-13 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-[#008774] flex items-center justify-center shrink-0 shadow-2xs">
            <ShieldCheck className="w-7 h-7" />
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#008774] bg-emerald-50 px-3 py-1 rounded-full mb-2.5 border border-emerald-200/60">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>ضمان انعدام المخاطرة التشغيلية</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-[#05221C] mb-2 tracking-tight">
              لا تدفع النصف المتبقي إلا بعد التجربة الحية على هاتفك:
            </h3>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              المخاطرة علينا بالكامل: نبدأ العمل بدفعة 50% فقط للبدء والبرمجة، والـ 50% المتبقية لا تدفع قرشاً منها إلا بعد تشغيل النظام كاملاً، وتجربة حجز موعد فحص حقيقي لسيارة بنفسك، والتأكد من وصول بيانات العميل وتفاصيل مركبته إلى واتساب مشغلك فوراً.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
