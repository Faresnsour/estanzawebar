import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { propertyProjects } from "@/data/projects";
import { getServerTranslator } from "@/i18n/server";
import { pageMetadata } from "@/lib/metadata";
import s from "@/components/estanza.module.css";
import p from "../showcase.module.css";

type Props = { params: Promise<{ project: string }> };

export async function generateMetadata({ params }: Props) {
  const { project: id } = await params;
  const project = propertyProjects.find(item => item.id === id);
  if (!project) notFound();
  const metadata = await pageMetadata(project.name, project.description, project.href);
  const images = [{ url: project.screenshot, width: 1440, height: 1000, alt: project.name }];
  return { ...metadata, openGraph: { ...metadata.openGraph, images }, twitter: { ...metadata.twitter, images } };
}

export default async function ProjectPage({ params }: Props) {
  const { project: id } = await params;
  const project = propertyProjects.find(item => item.id === id);
  if (!project) notFound();
  const t = await getServerTranslator();
  return <article className={`${s.system} ${p.page}`}>
    <header className={`${s.container} ${p.projectIntro}`}>
      <Link href="/showcase#property-projects" className={s.textLink}>{t("portfolio.back_to_work")}</Link>
      <p className={p.category}>{t(project.location)}</p>
      <h1 className={s.display}><bdi dir="ltr" translate="no">{project.name}</bdi></h1>
      <p className={p.lead}>{t(project.title)}</p>
      <p className={p.description}>{t(project.description)}</p>
      <ul className={p.features}>{project.features.map(feature => <li key={feature}>{t(feature)}</li>)}</ul>
      <p className={p.notice}>{t("portfolio.preview_notice")}</p>
    </header>
    <section className={`${s.container} ${p.gallery}`} aria-labelledby="project-views-title">
      <h2 id="project-views-title" className={s.sectionTitle}>{t("portfolio.project_views")}</h2>
      {project.gallery.map((view, index) => <figure key={view.src} className={view.width < view.height ? p.mobileFigure : p.figure}>
        <Image src={view.src} alt={`${project.name} — ${t(view.caption)}`} width={view.width} height={view.height} sizes={view.width < view.height ? "(max-width: 480px) calc(100vw - 40px), 390px" : "(max-width: 767px) calc(100vw - 40px), (max-width: 1296px) calc(100vw - 96px), 1200px"} loading={index === 0 ? "eager" : "lazy"} />
        <figcaption><span>{t(view.caption)}</span><a href={view.src} target="_blank" rel="noopener noreferrer" aria-label={`${t("portfolio.full_image")} — ${t(view.caption)}`}>{t("portfolio.full_image")}</a></figcaption>
      </figure>)}
      <Link href="/showcase#property-projects" className={s.textLink}>{t("portfolio.back_to_work")}</Link>
    </section>
  </article>;
}
