import Link from "next/link";
import { SOCIAL_LINKS } from "@/components/lib/social-links";
import { getServerTranslator } from "@/i18n/server";
import BookingBrand from "./booking-brand";
import s from "./booking-site.module.css";

export default async function BookingFooter({ year }: { year: string }) {
  const t = await getServerTranslator();
  return <footer className={s.footer}><div className={s.container}>
      <div className={s.footerMain}><BookingBrand label={t("navigation.estanza_home")} /><a href="mailto:hello@estanza.dev" dir="ltr">hello@estanza.dev</a><div className={s.socialLinks}>{SOCIAL_LINKS.filter(item => item.name !== "Email").map(item => <a key={item.name} href={item.href} aria-label={t(item.name)} target="_blank" rel="noopener noreferrer">{item.icon}</a>)}</div><nav aria-label={t("footer.useful_links")}><Link href="/privacy">{t("footer.privacy")}</Link><Link href="/terms">{t("terms.terms_of_service")}</Link></nav></div>
      <div id="work" className={s.previous}><div><span>{t("bookingSite.previous")}</span><p>{t("bookingSite.previous_note")}</p></div><Link href="/showcase">{t("portfolio.our_work")}</Link><Link href="/cleaning/demo">{t("bookingSite.cleaning")}</Link><small dir="ltr">© {year} Estanza</small></div>
    </div></footer>;
}
