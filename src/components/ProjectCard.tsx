"use client";
import s from "./estanza.module.css";
import { useI18n } from "@/i18n/LocaleProvider";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeft, Check } from "lucide-react";
import type { Project } from "@/data/projects";
import SocialProof from "./SocialProof";
export default function ProjectCard({ project, compact = false }: { project: Project; compact?: boolean }) {
  const { t: tr, locale } = useI18n();
  const Heading = compact ? "h3" : "h2";
  return <article className={`${s.system} ${s.project}`}>
    <Link href={project.href} target="_blank" rel="noopener noreferrer" data-cta="project" data-source={`preview-${project.id}`} aria-label={tr("site.view_value_s_booking_system", [project.name])} className={s.projectImage}>
      <Image src={locale === "en" ? project.screenshot.replace(".webp", "-en.webp") : project.screenshot} alt={tr("site.actual_screenshot_of_value_s_booking_interface", [project.name])} fill sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1296px) 50vw, 640px" />
    </Link>
    <div className={s.projectBody}>
      <div className={s.projectMeta}><Heading dir="ltr" translate="no">{project.name}</Heading><p>{tr(project.location)}</p></div>
      <p className={s.projectTitle}>{tr(project.title)}</p>
      {!compact ? <p className={s.projectDescription}>{tr(project.description)}</p> : null}
      <ul className={s.projectFeatures}>{(compact ? project.features.slice(1, 3) : project.features).map((feature) => <li key={feature}><Check aria-hidden="true" /><span>{tr(feature)}</span></li>)}</ul>
      {project.note ? <p className={s.helper}>{tr(project.note)}</p> : null}
      <SocialProof testimonial={project.testimonial} />
      <Link href={project.href} target="_blank" rel="noopener noreferrer" data-cta="project" data-source={`card-${project.id}`} className={`${s.textLink} ${s.projectLink}`}>{tr("site.view_system")}<ArrowUpLeft className="directional-icon" aria-hidden="true" /></Link>
    </div>
  </article>;
}
