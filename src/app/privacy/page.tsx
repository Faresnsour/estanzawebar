import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";

export const metadata = pageMetadata("سياسة الخصوصية", "سياسة الخصوصية لخدمات Estanza وأنظمة الحجز.", "/privacy");

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#F8FAF9] text-slate-700 px-6 py-16 font-sans">
      <div className="max-w-3xl mx-auto space-y-8">
        <Link
          href="/"
          className="text-xs text-[#006f60] hover:underline inline-flex items-center gap-1 mb-4"
        >
          ← العودة للرئيسية
        </Link>
        <h1 className="text-3xl font-bold text-[#05221C] tracking-tight">سياسة الخصوصية وحماية البيانات</h1>
        <p className="text-sm text-slate-600">آخر تحديث: سبتمبر 2026</p>

        <section className="space-y-4 text-sm text-slate-700 leading-relaxed border-t border-slate-200 pt-6">
          <h2 className="text-lg font-semibold text-[#05221C]">1. نظرة عامة والالتزام</h2>
          <p>
            في <strong>إستانزا (Estanza)</strong>، ندرك الأهمية البالغة لخصوصية عملائك وبيانات مركباتهم. نستخدم معلومات الحجز لتجهيز الطلب وتوجيهه إلى المركز، وفق طريقة الربط المتفق عليها.
          </p>

          <h2 className="text-lg font-semibold text-[#05221C]">2. طبيعة البيانات المعالجة</h2>
          <p>
            تقتصر معالجة البيانات على المعلومات اللازمة لإتمام وتأكيد الحجز الفعلي:
          </p>
          <ul className="list-disc pr-6 space-y-1 text-slate-600">
            <li>الاسم ورقم هاتف العميل لتوجيه إشعارات الحجز عبر واتساب.</li>
            <li>نوع وطراز المركبة والخدمات المختارة (PPF، نانو سيراميك، عازل حراري).</li>
            <li>الموعد المحدد وسجل المتابعة التقنية.</li>
          </ul>

          <h2 className="text-lg font-semibold text-[#05221C]">3. ملكية وسرية البيانات</h2>
          <p>
            تظل جميع بيانات العملاء ملكاً حصرياً للمشغل أو المركز المشترك. لا نقوم إطلاقاً ببيع أو تأجير أو مشاركة أي أرقام أو سجلات مع أطراف ثالثة لأغراض إعلانية.
          </p>

          <h2 className="text-lg font-semibold text-[#05221C]">4. تدابير الحماية والتخزين</h2>
          <p>
            تُفتح الطلبات في واتساب برسالة تحتوي البيانات التي أدخلها العميل. إذا شمل النظام حفظًا في جدول أو تقويم، نوضح مكان حفظ البيانات وصلاحيات الوصول ضمن اتفاق المركز. يستخدم الموقع Google Analytics لقياس الزيارات والتفاعل، وتخضع الخدمات الخارجية لسياساتها الخاصة.
          </p>

          <h2 className="text-lg font-semibold text-[#05221C]">5. التواصل والاستفسارات</h2>
          <p>
            لأي استفسارات تتعلق بأمان البيانات أو لحذف السجلات، يُرجى التواصل معنا مباشرة عبر قنوات الدعم الرسمية: <a href="mailto:support@estanza.dev" className="text-[#006f60] hover:underline">support@estanza.dev</a>.
          </p>
        </section>
      </div>
    </main>
  );
}
