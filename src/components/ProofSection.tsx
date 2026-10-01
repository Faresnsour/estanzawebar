import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function ProofSection() {
  return (
    <section id="work" aria-labelledby="work-title" className="border-t border-slate-200/70 py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="mb-3 text-sm font-bold text-[#006f60]">من أعمالنا</p>
            <h2 id="work-title" className="text-3xl font-extrabold leading-snug text-[#05221C] sm:text-4xl">افتح النظام، وجرّب بنفسك.</h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">هذه واجهات من الأنظمة الموجودة. كل مركز له خدماته وهويته وطريقة الحجز المناسبة له.</p>
          </div>
          <Link href="/showcase" className="inline-flex shrink-0 items-center gap-2 py-2 text-sm font-bold text-[#006f60]">شاهد كل الأعمال<ArrowLeft className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:gap-7">{projects.slice(0, 2).map((project) => <ProjectCard key={project.id} project={project} compact />)}</div>
        <p className="mt-4 text-sm leading-relaxed text-slate-600">النماذج تجهّز طلب موعد عبر واتساب. يؤكد المركز التوفر قبل تثبيت الحجز.</p>
      </div>
    </section>
  );
}
