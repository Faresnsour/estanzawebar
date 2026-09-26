import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "سياسة الخصوصية | إستانزا",
  description: "سياسة حماية البيانات وخصوصية عملاء استوديوهات ومراكز العناية بالمركبات في إستانزا.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-zinc-200 px-6 py-16 font-sans">
      <div className="max-w-3xl mx-auto space-y-8">
        <Link
          href="/"
          className="text-xs text-emerald-400 hover:underline inline-flex items-center gap-1 mb-4"
        >
          ← العودة للرئيسية
        </Link>
        <h1 className="text-3xl font-bold text-white tracking-tight">سياسة الخصوصية وحماية البيانات</h1>
        <p className="text-sm text-zinc-400">آخر تحديث: سبتمبر 2026</p>

        <section className="space-y-4 text-sm text-zinc-300 leading-relaxed border-t border-zinc-800/80 pt-6">
          <h2 className="text-lg font-semibold text-white">1. نظرة عامة والالتزام</h2>
          <p>
            في <strong>إستانزا (Estanza)</strong>، ندرك الأهمية البالغة لخصوصية عملائك وبيانات مركباتهم. صُممت بنيتنا التحتية وفق أعلى معايير الأمان والتشفير لضمان حماية بيانات الحجوزات والاتصالات الرقمية.
          </p>

          <h2 className="text-lg font-semibold text-white">2. طبيعة البيانات المعالجة</h2>
          <p>
            تقتصر معالجة البيانات على المعلومات اللازمة لإتمام وتأكيد الحجز الفعلي:
          </p>
          <ul className="list-disc pr-6 space-y-1 text-zinc-400">
            <li>الاسم ورقم هاتف العميل لتوجيه إشعارات الحجز عبر واتساب.</li>
            <li>نوع وطراز المركبة والخدمات المختارة (PPF، نانو سيراميك، عازل حراري).</li>
            <li>الموعد المحدد وسجل المتابعة التقنية.</li>
          </ul>

          <h2 className="text-lg font-semibold text-white">3. ملكية وسرية البيانات</h2>
          <p>
            تظل جميع بيانات العملاء ملكاً حصرياً للمشغل أو المركز المشترك. لا نقوم إطلاقاً ببيع أو تأجير أو مشاركة أي أرقام أو سجلات مع أطراف ثالثة لأغراض إعلانية.
          </p>

          <h2 className="text-lg font-semibold text-white">4. تدابير الحماية والتخزين</h2>
          <p>
            تعتمد المنصة على تشفير متقدم لكافة الاتصالات (SSL/TLS)، مع التوافق التام مع بروتوكولات الأمان السحابية الحديثة لضمان عزل البيانات وحمايتها من الوصول غير المصرح به.
          </p>

          <h2 className="text-lg font-semibold text-white">5. التواصل والاستفسارات</h2>
          <p>
            لأي استفسارات تتعلق بأمان البيانات أو لحذف السجلات، يُرجى التواصل معنا مباشرة عبر قنوات الدعم الرسمية: <a href="mailto:support@estanza.dev" className="text-emerald-400 hover:underline">support@estanza.dev</a>.
          </p>
        </section>
      </div>
    </main>
  );
}
