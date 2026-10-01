import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeft, Check } from "lucide-react";
import type { Project } from "@/data/projects";
import SocialProof from "./SocialProof";

export default function ProjectCard({ project, compact = false }: { project: Project; compact?: boolean }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <Link href={project.href} target="_blank" rel="noopener noreferrer" data-cta="project" data-source={`preview-${project.id}`} aria-label={`شاهد نظام ${project.name}`} className="relative block aspect-[16/10] overflow-hidden border-b border-slate-200 bg-slate-100">
        <Image src={project.screenshot} alt={`لقطة فعلية لواجهة نظام ${project.name}`} fill sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1152px) 45vw, 528px" className="object-cover object-top" />
      </Link>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="pb-5">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-lg font-bold text-[#05221C]" dir="ltr">{project.name}</h3>
            <p className="text-xs text-slate-600">{project.location}</p>
          </div>
          <p className="text-base font-bold leading-relaxed text-[#05221C]">{project.title}</p>
          {!compact && <p className="mt-2 text-sm leading-7 text-slate-600">{project.description}</p>}
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-600">
            {project.features.map((feature) => <li key={feature} className="flex items-start gap-2"><Check className="mt-1 h-3.5 w-3.5 shrink-0 text-[#006f60]" aria-hidden="true" /><span>{feature}</span></li>)}
          </ul>
          {project.note && <p className="mt-4 text-xs leading-6 text-slate-600">{project.note}</p>}
          <SocialProof testimonial={project.testimonial} />
        </div>
        <Link href={project.href} target="_blank" rel="noopener noreferrer" data-cta="project" data-source={`card-${project.id}`} className="mt-auto inline-flex min-h-11 items-center justify-between gap-2 border-t border-slate-200 pt-4 text-sm font-bold text-[#006f60] transition-colors hover:text-[#05221C]">شاهد النظام<ArrowUpLeft className="h-4 w-4" aria-hidden="true" /></Link>
      </div>
    </article>
  );
}
