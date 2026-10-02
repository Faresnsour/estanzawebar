"use client";
import s from "@/components/estanza.module.css";
import { useI18n } from "@/i18n/LocaleProvider";
import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import FinalCTA from "@/components/FinalCTA";
import { projects } from "@/data/projects";
import { buildWhatsAppUrl } from "@/components/lib/site";
export default function ShowcasePage() {
    const { t: tr } = useI18n();
    return (<>
      <Navbar />
      <main id="main-content" className={`${s.system} ${s.page}`}>
        <section className={`${s.container} ${s.showcaseIntro}`}>
          <p className="mb-3 text-sm font-bold text-[#006f60]">{tr("portfolio.our_work")}</p>
          <h1 className={s.display}>{tr("portfolio.different_centres_booking_that_fits")}</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">{tr("portfolio.explore_the_interfaces_services_and_booking_steps")}</p>
          <p className="mt-3 text-sm leading-7 text-slate-600">{tr("portfolio.these_systems_send_appointment_requests_via_whatsapp")}</p>
        </section>
        <section aria-label={tr("portfolio.automotive_booking_systems")} className={`${s.container} ${s.showcaseList}`}>
          {projects.map((project) => <ProjectCard key={project.id} project={project}/>)}
        </section>
        <section className={`${s.container} ${s.showcaseMore}`}>
          <details >
            <summary className="cursor-pointer px-5 py-5 text-base font-bold sm:px-6">{tr("portfolio.demos_for_other_industries")}</summary>
            <div className="border-t border-slate-200 px-5 py-6 sm:px-6">
              <p className="text-sm font-semibold text-[#006f60]">{tr("portfolio.concept_demo_clinics_beauty_centres")}</p>
              <h2 className="mt-2 text-xl font-bold">{tr("portfolio.an_appointment_request_page_for_clinics")}</h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600">{tr("portfolio.a_concept_for_displaying_services_and_collecting")}</p>
              <a href={buildWhatsAppUrl(tr("portfolio.hi_i_d_like_to_see_the"))} target="_blank" rel="noopener noreferrer" data-cta="whatsapp" data-source="showcase-clinics" className="mt-4 inline-flex items-center gap-2 py-2 text-sm font-bold text-[#006f60]">{tr("portfolio.request_a_preview")}<ArrowUpLeft className="directional-icon h-4 w-4" aria-hidden="true"/></a>
            </div>
          </details>
          <Link href="/" className="mt-6 inline-block py-2 text-sm text-slate-600 hover:text-[#006f60]">{tr("portfolio.back_to_estanza")}</Link>
        </section>
        <FinalCTA />
      </main>
      <Footer />
    </>);
}
