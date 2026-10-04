"use client";
import s from "@/components/estanza.module.css";
import { useI18n } from "@/i18n/LocaleProvider";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import FinalCTA from "@/components/FinalCTA";
import { projects } from "@/data/projects";
export default function ShowcasePage() {
    const { t: tr } = useI18n();
    return (<>
      <Navbar />
      <main id="main-content" className={`${s.system} ${s.page}`}>
        <section className={`${s.container} ${s.showcaseIntro}`}>
          <p className="mb-3 text-sm font-bold text-[#006f60]">{tr("clean.previous_label")}</p>
          <h1 className={s.display}>{tr("clean.previous_title")}</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">{tr("clean.previous_body")}</p>
          <p className="mt-3 text-sm leading-7 text-slate-600">{tr("portfolio.these_systems_send_appointment_requests_via_whatsapp")}</p>
        </section>
        <section aria-label={tr("portfolio.automotive_booking_systems")} className={`${s.container} ${s.showcaseList}`}>
          {projects.map((project) => <ProjectCard key={project.id} project={project}/>)}
        </section>
        <section className={`${s.container} ${s.showcaseMore}`}>
          <Link href="/demo" className={s.textLink}>{tr("clean.automotive_prices")}</Link>
          <Link href="/" className="mt-6 inline-block py-2 text-sm text-slate-600 hover:text-[#006f60]">{tr("portfolio.back_to_estanza")}</Link>
        </section>
        <FinalCTA />
      </main>
      <Footer />
    </>);
}
