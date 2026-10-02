"use client";
import { useI18n } from "@/i18n/LocaleProvider";
type Testimonial = {
    quote: string;
    name: string;
    role: string;
};
export default function SocialProof({ testimonial }: {
    testimonial?: Testimonial;
}) {
    const { t: tr } = useI18n();
    if (!testimonial)
        return null;
    return (<figure className="mt-5 border-s-2 border-[#008774] ps-4">
      <blockquote className="text-sm leading-7 text-slate-700">{tr(testimonial.quote)}</blockquote>
      <figcaption className="mt-2 text-xs text-slate-600">{tr(testimonial.name)} · {tr(testimonial.role)}</figcaption>
    </figure>);
}
