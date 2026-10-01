import { WHATSAPP_URL } from "./lib/site";

const faqs = [
  { question: "هل يوجد اشتراك شهري؟", answer: "باقة الانطلاق بـ130 دينار تُدفع مرة واحدة، بدون اشتراك شهري للباقة. نوضح تفاصيل الاستضافة وأي خدمة خارجية تحتاجها قبل الاتفاق." },
  { question: "هل توجد تكاليف غير سعر التجهيز؟", answer: "السعر المعروض هو لتجهيز النظام. إذا كنت تحتاج ربطًا إضافيًا، نوضح تكلفته وطريقة احتسابه قبل البدء، حتى تعرف ما ستدفعه بالضبط." },
  { question: "هل أحتاج رقم واتساب جديد؟", answer: "يمكن توجيه طلبات الحجز إلى رقم واتساب مركزك الحالي. وإذا كنت تحتاج رسائل آلية أو ربطًا خاصًا، نراجع متطلباته معك أولًا." },
  { question: "هل يحتاج العميل تطبيقًا أو حسابًا؟", answer: "لا. يفتح رابط المركز في المتصفح، يختار الخدمة والموعد، ويدخل بياناته. وعند إرسال الطلب، يفتح واتساب برسالة جاهزة." },
  { question: "هل يثبت الموعد بمجرد إرسال الطلب؟", answer: "في النماذج المعروضة، يرسل العميل طلبًا والفريق يؤكد التوفر. إذا كان مركزك يحتاج تثبيتًا آليًا ومنع تعارض، نحدد طريقة الجدولة والربط المطلوبة قبل التنفيذ." },
  { question: "ماذا لو تغيرت خدماتي أو أسعاري؟", answer: "يمكن تحديث الخدمات والأسعار لاحقًا. نتفق معك على طريقة التحديث وما تشمله التعديلات قبل التسليم." },
  { question: "عندي أكثر من رافعة أو موظف، هل يناسبني؟", answer: "نراجع عدد الموارد ومدة الخدمات وطريقة توزيع المواعيد معك. هذه الاحتياجات تدخل ضمن تخصيص باقة المحترف، ويُحدد نطاقها وسعرها قبل البدء." },
  { question: "ماذا يحدث بعد الدفعة الأولى؟", answer: "ترسل لنا شعار المركز وخدماته وأسعاره وأوقات العمل. نجهّز الصفحة، ثم ترسل ملاحظاتك وتجرب طلب حجز كاملًا قبل التسليم. التجهيز عادة خلال 72 ساعة بعد استلام البيانات المطلوبة." },
  { question: "هل يوجد دعم بعد التسليم؟", answer: "يبقى التواصل معنا عبر واتساب. نوضح مدة الدعم وما يشمله، وطريقة طلب التعديلات، ضمن اتفاق التجهيز." },
  { question: "هل يعمل جيدًا على الهاتف؟", answer: "نعم، تجربة الحجز مصممة للهاتف وتعمل أيضًا على التابلت والكمبيوتر. يمكنك تجربة النماذج الآن على جهازك." },
];

export default function FAQSection() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="border-t border-slate-200/70 py-12 sm:py-16">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1.8fr] lg:gap-16 lg:px-8">
        <div>
          <p className="mb-3 text-sm font-bold text-[#006f60]">قبل ما تتواصل</p>
          <h2 id="faq-title" className="text-3xl font-extrabold text-[#05221C]">أسئلة أصحاب المراكز.</h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600">إذا عندك سؤال عن طريقة عمل مركزك، احكي لنا عنه.</p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" data-cta="whatsapp" data-source="faq" className="mt-5 inline-block py-2 font-bold text-[#006f60] underline underline-offset-4">اسألنا على واتساب</a>
        </div>
        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {faqs.map((faq) => (
            <details key={faq.question} className="faq-item group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-base font-bold text-[#05221C]">
                {faq.question}<span aria-hidden="true" className="flex h-6 w-6 shrink-0 items-center justify-center text-xl font-normal text-[#006f60] group-open:rotate-45">+</span>
              </summary>
              <p className="max-w-2xl pb-5 text-sm leading-7 text-slate-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
