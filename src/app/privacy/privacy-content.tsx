"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import s from "@/components/estanza.module.css";
import { useI18n } from "@/i18n/LocaleProvider";
import Link from "next/link";
export default function PrivacyPage() {
    const { t: tr } = useI18n();
    return (<><Navbar /><main id="main-content" className={`${s.system} ${s.legal}`}>
      <div className={`${s.legalContent} space-y-8`}>
        <Link href="/" className="text-xs text-[#006f60] hover:underline inline-flex items-center gap-1 mb-4">{tr("demo.back_to_home")}</Link>
        <h1 className="text-3xl font-bold text-[#05221C] tracking-tight">{tr("privacy.privacy_data_protection")}</h1>
        <p className="text-sm text-slate-600">{tr("privacy.last_updated_september_2026")}</p>

        <section className="space-y-4 text-sm text-slate-700 leading-relaxed border-t border-slate-200 pt-6">
          <h2 className="text-lg font-semibold text-[#05221C]">{tr("privacy.1_overview")}</h2>
          <p>{tr("privacy.at")}{" "}<strong>{tr("privacy.estanza")}</strong>{tr("privacy.we_respect_the_privacy_of_your_customers")}</p>

          <h2 className="text-lg font-semibold text-[#05221C]">{tr("privacy.2_information_we_process")}</h2>
          <p>{tr("privacy.we_process_only_the_information_needed_to")}</p>
          <ul className="list-disc ps-6 space-y-1 text-slate-600">
            <li>{tr("privacy.customer_name_and_phone_number_for_booking")}</li>
            <li>{tr("privacy.vehicle_make_and_model_and_selected_services")}</li>
            <li>{tr("privacy.requested_appointment_and_technical_activity_records")}</li>
          </ul>

          <h2 className="text-lg font-semibold text-[#05221C]">{tr("privacy.3_data_ownership_and_confidentiality")}</h2>
          <p>{tr("privacy.customer_data_remains_the_property_of_the")}</p>

          <h2 className="text-lg font-semibold text-[#05221C]">{tr("privacy.4_protection_and_storage")}</h2>
          <p>{tr("privacy.requests_open_in_whatsapp_with_the_information")}</p>

          <h2 className="text-lg font-semibold text-[#05221C]">{tr("privacy.5_contact_us")}</h2>
          <p>{tr("privacy.for_questions_about_data_security_or_requests")}{" "}<a href="mailto:support@estanza.dev" className="text-[#006f60] hover:underline">support@estanza.dev</a>.
          </p>
        </section>
      </div>
    </main><Footer /></>);
}
