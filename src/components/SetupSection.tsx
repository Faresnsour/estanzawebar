"use client";
import { source } from "@/i18n/messages";
import { useI18n } from "@/i18n/LocaleProvider";
import { SETUP_HOURS } from "./lib/site";
const steps = [
    { title: source("site.start_with_your_services"), text: source("site.send_your_logo_services_prices_and_opening") },
    { title: source("site.build_and_review_together"), text: source("site.setup_typically_takes_value_hours_after_receiving", [SETUP_HOURS]) },
    { title: source("site.get_your_link_and_share_it"), text: source("site.we_test_a_complete_booking_request_and") },
];
export default function SetupSection() {
    const { t: tr } = useI18n();
    return (<section aria-labelledby="setup-title" className="border-t border-slate-200/70 py-14 sm:py-16">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <p className="mb-3 text-sm font-bold text-[#006f60]">{tr("site.from_first_conversation_to_handover")}</p>
          <h2 id="setup-title" className="max-w-md text-3xl font-extrabold leading-snug text-[#05221C] sm:text-4xl">{tr("site.your_centre_your_way_of_booking")}</h2>
          <p className="mt-4 max-w-md text-base leading-7 text-slate-600">{tr("site.mobile_washing_tinting_ceramic_coating_or_detailing")}</p>
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">{tr("site.need_to_avoid_bay_conflicts_or_connect")}</p>
        </div>
        <ol className="divide-y divide-slate-200 border-y border-slate-200">
          {steps.map((step, index) => <li key={step.title} className="flex gap-4 py-6"><span className="pt-1 text-sm font-bold tabular-nums text-[#006f60]" aria-hidden="true">0{tr(index + 1)}</span><div><h3 className="text-lg font-bold text-[#05221C]">{tr(step.title)}</h3><p className="mt-2 text-sm leading-7 text-slate-600">{tr(step.text)}</p></div></li>)}
        </ol>
      </div>
    </section>);
}
