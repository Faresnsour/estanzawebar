import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "الشروط والأحكام | إستانزا",
  description: "الشروط والأحكام المنظمة لاستخدام محرك وأنظمة إستانزا لإدارة الحجوزات والأتمتة.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-zinc-200 px-6 py-16 font-sans">
      <div className="max-w-3xl mx-auto space-y-8">
        <Link
          href="/"
          className="text-xs text-emerald-400 hover:underline inline-flex items-center gap-1 mb-4"
        >
          ← العودة للرئيسية
        </Link>
        <h1 className="text-3xl font-bold text-white tracking-tight">شروط الخدمة والاستخدام</h1>
        <p className="text-sm text-zinc-400">آخر تحديث: سبتمبر 2026</p>

        <section className="space-y-4 text-sm text-zinc-300 leading-relaxed border-t border-zinc-800/80 pt-6">
          <h2 className="text-lg font-semibold text-white">1. قبول الشروط</h2>
          <p>
            باستخدامك لمنصة ومحرك <strong>إستانزا (Estanza)</strong>، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت تستخدم المنصة نيابة عن مركز أو مشغل تجاري، فإنك تقر بامتلاك الصلاحية للتعاقد.
          </p>

          <h2 className="text-lg font-semibold text-white">2. نطاق وطبيعة الخدمة</h2>
          <p>
            توفر إستانزا بنية برمجية مخصصة لأتمتة الاستفسارات، وتوجيه مسارات الحجز عبر واتساب، وتنظيم المواعيد لمراكز تجهيز وتعديل المركبات. لا تتدخل المنصة في التسعير الفعلي أو الفحص الفني داخل المشغل.
          </p>

          <h2 className="text-lg font-semibold text-white">3. الاستخدام المشروع والأمان</h2>
          <p>
            يلتزم العميل والمشترك بعدم إساءة استخدام المنصة لإرسال رسائل غير مرغوب فيها (SPAM) أو محاولة اختراق الواجهات البرمجية أو تعطيل استقرار المحرك.
          </p>

          <h2 className="text-lg font-semibold text-white">4. الاستقرار والتحديثات المستمرة</h2>
          <p>
            نعمل على توفير نسبة تشغيل تتجاوز 99.9%، مع تطبيق التحديثات البرمجية الدورية لتحسين تدفق الحجوزات ورفع سرعة استجابة المحرك.
          </p>

          <h2 className="text-lg font-semibold text-white">5. التعديل والإنهاء</h2>
          <p>
            يحق لإستانزا تحديث هذه الشروط لتعزيز أمان الخدمة أو التوافق مع الأنظمة التقنية المستحدثة، ويتم إشعار العملاء بأي تغييرات جوهرية.
          </p>
        </section>
      </div>
    </main>
  );
}
