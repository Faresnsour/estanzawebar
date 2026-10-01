import { ArrowUpLeft, MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "./lib/site";

export default function FinalCTA() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-7 rounded-3xl bg-[#05221C] px-6 py-9 text-white sm:px-10 sm:py-12 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <h2 id="contact-title" className="text-3xl font-extrabold leading-snug sm:text-4xl">شوف كيف رح يطلع نظام مركزك.</h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-200">ابعت لنا اسم المركز ونوع خدماته على واتساب. نحكي عن طريقة الحجز عندك، ونوضح لك الخيار المناسب.</p>
        </div>
        <div className="lg:justify-self-end">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" data-cta="whatsapp" data-source="final" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 text-base font-bold text-[#05221C] transition-colors hover:bg-emerald-50 sm:w-auto"><MessageCircle className="h-5 w-5" aria-hidden="true" />احصل على تصور لنظام مركزك<ArrowUpLeft className="h-4 w-4" aria-hidden="true" /></a>
          <p className="mt-3 text-center text-sm text-slate-300">محادثة بسيطة، بدون التزام بالشراء.</p>
        </div>
      </div>
    </section>
  );
}
