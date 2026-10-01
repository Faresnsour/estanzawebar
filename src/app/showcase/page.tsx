import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import FinalCTA from "@/components/FinalCTA";
import { projects } from "@/data/projects";
import { buildWhatsAppUrl } from "@/components/lib/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "أعمالنا — أنظمة حجز لمراكز السيارات",
  "شاهد واجهات الحجز لمراكز العناية بالسيارات، وتعرّف على الخدمات التي تقدمها وجرّب طلب موعد بنفسك.",
  "/showcase",
);

export default function ShowcasePage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-[#F8FAF9] pt-20 text-[#05221C]">
        <section className="mx-auto max-w-6xl px-4 pb-10 pt-12 sm:px-6 sm:pt-16 lg:px-8">
          <p className="mb-3 text-sm font-bold text-[#006f60]">أعمالنا</p>
          <h1 className="max-w-2xl text-3xl font-extrabold leading-snug sm:text-5xl">أنظمة حجز، كل واحد على طريقة مركزه.</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">شوف الواجهة والخدمات وخطوات الحجز. افتح أي نظام لتعرف كيف تبدأ تجربة العميل وكيف تصل تفاصيله للفريق.</p>
          <p className="mt-3 text-sm leading-7 text-slate-600">هذه النماذج ترسل طلب موعد عبر واتساب؛ تأكيد التوفر يتم من المركز.</p>
        </section>
        <section aria-label="أنظمة مراكز السيارات" className="mx-auto grid max-w-6xl gap-6 px-4 pb-12 sm:px-6 md:grid-cols-2 lg:gap-7 lg:px-8">
          {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
        </section>
        <section className="mx-auto max-w-6xl px-4 pb-4 sm:px-6 lg:px-8">
          <details className="rounded-2xl border border-slate-200 bg-white">
            <summary className="cursor-pointer px-5 py-5 text-base font-bold sm:px-6">نماذج لقطاعات أخرى</summary>
            <div className="border-t border-slate-200 px-5 py-6 sm:px-6">
              <p className="text-sm font-semibold text-[#006f60]">نموذج تجريبي · عيادات ومراكز تجميل</p>
              <h2 className="mt-2 text-xl font-bold">واجهة لطلب موعد مع العيادة.</h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600">تصور لعرض الخدمات وتجميع بيانات طلب الموعد. هذا نموذج للاستعراض، وليس دراسة حالة لعميل منفّذ.</p>
              <a href={buildWhatsAppUrl("مرحبًا، بدي أشوف نموذج الحجز للعيادات وأعرف التفاصيل.")} target="_blank" rel="noopener noreferrer" data-cta="whatsapp" data-source="showcase-clinics" className="mt-4 inline-flex items-center gap-2 py-2 text-sm font-bold text-[#006f60]">اطلب معاينة النموذج<ArrowUpLeft className="h-4 w-4" aria-hidden="true" /></a>
            </div>
          </details>
          <Link href="/" className="mt-6 inline-block py-2 text-sm text-slate-600 hover:text-[#006f60]">العودة إلى Estanza</Link>
        </section>
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
