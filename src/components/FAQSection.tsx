const faqs = [
  { question: "هل يوجد اشتراك شهري؟", answer: "باقة الانطلاق تُدفع مرة واحدة، بدون اشتراك شهري. نوضح الاستضافة وأي تكلفة إضافية قبل الاتفاق." },
  { question: "هل أحتاج رقم واتساب جديد؟", answer: "يمكن توجيه طلبات الحجز إلى رقم واتساب مركزك الحالي." },
  { question: "هل يحتاج العميل تطبيقًا أو حسابًا؟", answer: "لا. يفتح رابط المركز في المتصفح، ويجهّز طلبه على واتساب." },
  { question: "هل يثبت الموعد بمجرد إرسال الطلب؟", answer: "العميل يرسل طلبًا، والفريق يؤكد التوفر. الجدولة الآلية ومنع التعارض تُحدد قبل التنفيذ." },
  { question: "ماذا لو تغيرت خدماتي أو أسعاري؟", answer: "يمكن تحديثها لاحقًا. نتفق على طريقة التحديث والتعديلات قبل التسليم." },
  { question: "هل يوجد دعم بعد التسليم؟", answer: "يبقى التواصل عبر واتساب. مدة الدعم وما يشمله ضمن اتفاق التجهيز." },
];

export default function FAQSection() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="border-t border-slate-200/70 bg-white py-14 sm:py-16">
      <div className="mx-auto grid max-w-6xl gap-7 px-4 sm:px-6 lg:grid-cols-[1fr_1.8fr] lg:gap-16 lg:px-8">
        <div data-reveal>
          <p className="mb-3 text-sm font-bold text-[#006f60]">قبل ما تتواصل</p>
          <h2 id="faq-title" className="text-3xl font-extrabold leading-snug text-[#05221C]">أسئلة أصحاب المراكز.</h2>
        </div>
        <div data-reveal className="divide-y divide-slate-200 border-y border-slate-200">
          {faqs.map((faq) => (
            <details key={faq.question} className="faq-item group">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-base font-bold text-[#05221C] transition-colors hover:text-[#006f60]">
                {faq.question}<span aria-hidden="true" className="flex h-6 w-6 shrink-0 items-center justify-center text-xl font-normal text-[#006f60] transition-transform duration-200 group-open:rotate-45">+</span>
              </summary>
              <p className="max-w-2xl pb-5 text-sm leading-7 text-slate-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
