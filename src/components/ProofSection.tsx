"use client";
import s from "./estanza.module.css";
import { useI18n } from "@/i18n/LocaleProvider";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";
export default function ProofSection() {
  const { t: tr } = useI18n();
  return <section id="work" aria-labelledby="work-title" className={`${s.system} ${s.section} ${s.work}`}>
    <div className={s.container}>
      <div className={s.sectionHead}><div><p className={s.sectionLabel}>{tr("clean.previous_label")}</p><h2 id="work-title" className={s.sectionTitle}>{tr("clean.previous_title")}</h2></div>
        <Link href="/showcase" className={s.textLink}>{tr("clean.previous_all")}<ArrowLeft className="directional-icon" aria-hidden="true" /></Link>
      </div>
      <p className={s.helper}>{tr("clean.previous_body")}</p>
      <div className={s.projects}>{projects.slice(0, 2).map((project) => <ProjectCard key={project.id} project={project} compact />)}</div>
    </div>
  </section>;
}
