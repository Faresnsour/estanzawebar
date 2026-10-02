"use client";
import { useI18n } from "@/i18n/LocaleProvider";
import { ShieldCheck } from "lucide-react";
export default function GuaranteeSection() {
    const { t: tr } = useI18n();
    return (<section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6">
        <ShieldCheck className="h-6 w-6 shrink-0 text-[#006f60]" aria-hidden="true"/>
        <div>
          <h2 className="text-lg font-bold text-[#05221C]">{tr("site.try_your_page_before_handover")}</h2>
          <p className="mt-2 text-sm leading-7 text-slate-600">{tr("site.review_your_services_and_prices_on_your")}</p>
        </div>
      </div>
    </section>);
}
