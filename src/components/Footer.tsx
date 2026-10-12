"use client";
import s from "./estanza.module.css";
import { useI18n } from "@/i18n/LocaleProvider";
import Link from "next/link";
import EstanzaLogo from "./EstanzaLogo";
import { SOCIAL_LINKS } from "./lib/social-links";
export { SOCIAL_LINKS } from "./lib/social-links";
export default function Footer() {
  const { t: tr } = useI18n();
  return <footer className={`${s.system} ${s.footer}`}>
    <div className={s.container}>
      <div className={s.footerGrid}>
        <div><Link href="/" className={s.footerBrand}><EstanzaLogo className="h-10 w-10" /><span dir="ltr" translate="no">Estanza</span></Link><p>{tr("clean.footer_description")}</p></div>
        <div><h2>{tr("footer.contact_us")}</h2><a href="mailto:hello@estanza.dev" className={s.email} dir="ltr">hello@estanza.dev</a><div className={s.socials}>{SOCIAL_LINKS.map((item) => <a key={item.name} href={item.href} target="_blank" rel="noopener noreferrer" aria-label={tr(item.name)}>{item.icon}</a>)}</div></div>
        <nav aria-label={tr("footer.useful_links")} className={s.footerLinks}><Link href="/showcase">{tr("clean.previous_label")}</Link><Link href="/cleaning/demo" data-cta="demo" data-source="footer">{tr("clean.demo_cta")}</Link><Link href="/privacy">{tr("footer.privacy")}</Link><Link href="/terms">{tr("terms.terms_of_service")}</Link></nav>
      </div>
      <div className={s.footerBottom}><p>© {new Date().getFullYear()} <span translate="no">Estanza</span></p><p>{tr("centre.amman_jordan")}</p></div>
    </div>
  </footer>;
}
