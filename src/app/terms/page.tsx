import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";

export const metadata = pageMetadata("شروط الخدمة", "شروط الخدمة لخدمات Estanza وأنظمة الحجز.", "/terms");

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#F8FAF9] text-slate-700 px-6 py-16 font-sans">
      <div className="max-w-3xl mx-auto space-y-8">
        <Link
          href="/"
          className="text-xs text-[#006f60] hover:underline inline-flex items-center gap-1 mb-4"
        >
          ← العودة للرئيسية
        </Link>
        <h1 className="text-3xl font-bold text-[#05221C] tracking-tight">شروط الخدمة والاستخدام</h1>
        <p className="text-sm text-slate-600">آخر تحديث: سبتمبر 2026</p>

        <section className="space-y-4 text-sm text-slate-700 leading-relaxed border-t border-slate-200 pt-6">
          <h2 className="text-lg font-semibold text-[#05221C]">1. قبول الشروط</h2>
          <p>
            باستخدامك لمنصة ومحرك <strong>إستانزا (Estanza)</strong>، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت تستخدم المنصة نيابة عن مركز أو مشغل تجاري، فإنك تقر بامتلاك الصلاحية للتعاقد.
          </p>

          <h2 className="text-lg font-semibold text-[#05221C]">2. نطاق وطبيعة الخدمة</h2>
          <p>
            توفر إستانزا بنية برمجية مخصصة لأتمتة الاستفسارات، وتوجيه مسارات الحجز عبر واتساب، وتنظيم المواعيد لمراكز تجهيز وتعديل المركبات. لا تتدخل المنصة في التسعير الفعلي أو الفحص الفني داخل المشغل.
          </p>

          <h2 className="text-lg font-semibold text-[#05221C]">3. الاستخدام المشروع والأمان</h2>
          <p>
            يلتزم العميل والمشترك بعدم إساءة استخدام المنصة لإرسال رسائل غير مرغوب فيها (SPAM) أو محاولة اختراق الواجهات البرمجية أو تعطيل استقرار المحرك.
          </p>

          <h2 className="text-lg font-semibold text-[#05221C]">4. الاستقرار والتحديثات المستمرة</h2>
          <p>
            تُحدد الاستضافة والدعم والتحديثات والتعديلات ضمن اتفاق تجهيز النظام. يُراجع المركز التوفر قبل تأكيد الموعد، ما لم يتضمن الاتفاق ربطًا آخر للجدولة.
          </p>

          <h2 className="text-lg font-semibold text-[#05221C]">5. التعديل والإنهاء</h2>
          <p>
            يحق لإستانزا تحديث هذه الشروط لتعزيز أمان الخدمة أو التوافق مع الأنظمة التقنية المستحدثة، ويتم إشعار العملاء بأي تغييرات جوهرية.
          </p>
        </section>
      </div>
    </main>
  );
}
