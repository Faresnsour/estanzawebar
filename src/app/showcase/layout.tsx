import type { ReactNode } from "react";
import BookingHeader from "@/components/booking-site/booking-header";
import BookingFooter from "@/components/booking-site/booking-footer";
import BusinessContact from "@/components/booking-site/business-contact";
import { getServerTranslator } from "@/i18n/server";
import { localDateId } from "@/lib/booking";
import s from "@/components/booking-site/booking-site.module.css";

export default async function ShowcaseLayout({ children }: { children: ReactNode }) {
  const t = await getServerTranslator();
  return <div className={s.site}>
    <a href="#main-content" className="skip-to-content">{t("autoSpa.skip_to_content")}</a>
    <BookingHeader />
    <main id="main-content">{children}<BusinessContact /></main>
    <BookingFooter year={localDateId().slice(0, 4)} />
  </div>;
}
