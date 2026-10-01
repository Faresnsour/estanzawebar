import { MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "./lib/site";

export default function FinalCTA() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-white px-4 pb-14 pt-4 sm:px-6 sm:pb-16">
      <div data-reveal className="mx-auto max-w-6xl rounded-3xl border border-[#008774]/30 bg-[#05221C] px-6 py-9 text-center text-white shadow-[0_12px_36px_rgba(5,34,28,0.1)] sm:px-10 sm:py-12">
        <h2 id="contact-title" className="mx-auto max-w-2xl text-3xl font-extrabold leading-snug sm:text-4xl">شوف كيف رح يطلع نظام مركزك.</h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-slate-200 sm:text-base">ابعت لنا اسم المركز ونوع خدماته على واتساب.</p>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" data-cta="whatsapp" data-source="final" className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#05221C] transition-[background-color,transform] duration-200 hover:bg-emerald-50 motion-safe:active:scale-[0.98] sm:w-auto sm:text-base"><MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />احصل على تصور لنظام مركزك</a>
        <p className="mt-3 text-xs leading-6 text-slate-300 sm:text-sm">محادثة بسيطة، بدون التزام بالشراء.</p>
      </div>
    </section>
  );
}
