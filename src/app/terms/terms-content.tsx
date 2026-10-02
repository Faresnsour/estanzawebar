"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import s from "@/components/estanza.module.css";
import { useI18n } from "@/i18n/LocaleProvider";
import Link from "next/link";
export default function TermsPage() {
    const { t: tr } = useI18n();
    return (<><Navbar /><main id="main-content" className={`${s.system} ${s.legal}`}>
      <div className={`${s.legalContent} space-y-8`}>
        <Link href="/" className="text-xs text-[#006f60] hover:underline inline-flex items-center gap-1 mb-4">{tr("demo.back_to_home")}</Link>
        <h1 className="text-3xl font-bold text-[#05221C] tracking-tight">{tr("terms.terms_of_service_use")}</h1>
        <p className="text-sm text-slate-600">{tr("privacy.last_updated_september_2026")}</p>

        <section className="space-y-4 text-sm text-slate-700 leading-relaxed border-t border-slate-200 pt-6">
          <h2 className="text-lg font-semibold text-[#05221C]">{tr("terms.1_accepting_these_terms")}</h2>
          <p>{tr("terms.by_using")}{" "}<strong>{tr("privacy.estanza")}</strong>{tr("terms.you_agree_to_these_terms_and_conditions")}</p>

          <h2 className="text-lg font-semibold text-[#05221C]">{tr("terms.2_scope_of_service")}</h2>
          <p>{tr("terms.estanza_provides_customised_software_for_handling_enquiries")}</p>

          <h2 className="text-lg font-semibold text-[#05221C]">{tr("terms.3_acceptable_use_and_security")}</h2>
          <p>{tr("terms.customers_and_participating_centres_must_not_use")}</p>

          <h2 className="text-lg font-semibold text-[#05221C]">{tr("terms.4_hosting_support_and_updates")}</h2>
          <p>{tr("terms.hosting_support_updates_and_changes_are_defined")}</p>

          <h2 className="text-lg font-semibold text-[#05221C]">{tr("terms.5_changes_and_termination")}</h2>
          <p>{tr("terms.estanza_may_update_these_terms_to_improve")}</p>
        </section>
      </div>
    </main><Footer /></>);
}
