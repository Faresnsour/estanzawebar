"use client";
import s from "@/components/estanza.module.css";
import { useI18n } from "@/i18n/LocaleProvider";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { projects, propertyProjects } from "@/data/projects";
import p from "./showcase.module.css";
export default function ShowcasePage() {
    const { t: tr } = useI18n();
    return (<div className={`${s.system} ${p.page}`}>
        <section className={`${s.container} ${s.showcaseIntro}`}>
          <p className="mb-3 text-sm font-bold text-[#006f60]">{tr("portfolio.our_work")}</p>
          <h1 className={s.display}>{tr("portfolio.intro_title")}</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">{tr("portfolio.intro_body")}</p>
          <nav className={s.actions} aria-label={tr("portfolio.our_work")}>
            <a href="#property-projects" className={s.textLink}>{tr("portfolio.real_estate")}</a>
            <a href="#automotive-projects" className={s.textLink}>{tr("portfolio.automotive_booking_systems")}</a>
          </nav>
        </section>
        <section id="property-projects" aria-labelledby="property-projects-title" className={`${s.container} ${s.showcaseList}`}>
          <div className={p.categoryHeading}><h2 id="property-projects-title" className={s.sectionTitle}>{tr("portfolio.real_estate")}</h2><p>{tr("portfolio.property_intro")}</p></div>
          {propertyProjects.map((project) => <ProjectCard key={project.id} project={project} headingLevel="h3" />)}
        </section>
        <section id="automotive-projects" aria-labelledby="automotive-projects-title" className={`${s.container} ${s.showcaseList}`}>
          <div className={p.categoryHeading}><h2 id="automotive-projects-title" className={s.sectionTitle}>{tr("portfolio.automotive_booking_systems")}</h2><p>{tr("portfolio.these_systems_send_appointment_requests_via_whatsapp")}</p></div>
          {projects.map((project) => <ProjectCard key={project.id} project={project} headingLevel="h3" />)}
        </section>
        <section className={`${s.container} ${s.showcaseMore}`}>
          <Link href="/demo" className={s.textLink}>{tr("clean.automotive_prices")}</Link>
          <Link href="/" className="mt-6 inline-block py-2 text-sm text-slate-600 hover:text-[#006f60]">{tr("portfolio.back_to_estanza")}</Link>
        </section>
    </div>);
}
