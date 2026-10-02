"use client";
import { useI18n } from "@/i18n/LocaleProvider";
export default function LanguageSwitcher({ className = "" }: {
    className?: string;
}) {
    const { locale, t, setLocale } = useI18n();
    const next = locale === "ar" ? "en" : "ar";
    return <button type="button" data-language-switcher lang={next} dir={next === "ar" ? "rtl" : "ltr"} aria-label={t(next === "en" ? "navigation.switch_to_english" : "navigation.switch_to_arabic")} onClick={() => setLocale(next)} className={`language-switcher ${className}`}>{t(next === "en" ? "navigation.english_label" : "navigation.arabic_label")}</button>;
}
