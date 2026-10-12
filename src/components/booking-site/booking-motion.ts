"use client";
import { useRef, type RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useI18n } from "@/i18n/LocaleProvider";
import s from "./booking-site.module.css";

gsap.registerPlugin(useGSAP);
const allowMotion = "(prefers-reduced-motion: no-preference)";

export function useHeroMotion(scope: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add(allowMotion, () => {
      gsap.fromTo([`.${s.heroCopy}`, `.${s.heroBookingWrap}`],
        { y: 10, opacity: 0.8 }, { y: 0, opacity: 1, duration: 0.35, stagger: 0.07, clearProps: "transform,opacity" });
    }, scope);
    return () => media.revert();
  }, { scope });
}

export function useExperienceMotion(scope: RefObject<HTMLElement | null>, step: number, selection: string) {
  const { locale } = useI18n();
  const previousHeight = useRef<number | null>(null);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add(allowMotion, context => {
      // Nothing is hidden before the section comes into view.
      context.add("reveal", () => gsap.fromTo(`.${s.stepper} li`, { y: 6, opacity: 0.65 },
        { y: 0, opacity: 1, stagger: 0.06, duration: 0.25, clearProps: "transform,opacity" }));
      const observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) { context.reveal(); observer.disconnect(); }
      }, { threshold: 0.15 });
      if (scope.current) observer.observe(scope.current);
      return () => observer.disconnect();
    }, scope);
    return () => media.revert();
  }, { scope });

  useGSAP(() => {
    const viewport = scope.current?.querySelector<HTMLElement>(`.${s.stepViewport}`);
    const content = scope.current?.querySelector<HTMLElement>(`.${s.stepContent}`);
    if (!viewport || !content) return;
    const nextHeight = content.offsetHeight;
    const oldHeight = previousHeight.current;
    previousHeight.current = nextHeight;
    const media = gsap.matchMedia();
    media.add(allowMotion, () => {
      if (oldHeight === null) return;
      // A short measured height transition prevents the following sections jumping.
      // Return to natural height afterwards so validation, fonts and resizing stay fluid.
      gsap.fromTo(viewport, { height: oldHeight }, {
        height: nextHeight, duration: 0.24, ease: "power1.out", clearProps: "height",
      });
      gsap.fromTo(content, { y: 5, opacity: 0.75 }, {
        y: 0, opacity: 1, duration: 0.22, clearProps: "transform,opacity",
      });
      if (step === 3) gsap.fromTo(`.${s.successMark}`, { scale: 0.98, opacity: 0.7 },
        { scale: 1, opacity: 1, duration: 0.25, clearProps: "transform,opacity" });
    }, scope);
    const resize = new ResizeObserver(() => { previousHeight.current = content.offsetHeight; });
    resize.observe(content);
    return () => { resize.disconnect(); media.revert(); };
  }, { scope, dependencies: [step, locale], revertOnUpdate: true });

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add(allowMotion, () => {
      gsap.fromTo(`.${s.receipt}`, { opacity: 0.8 }, { opacity: 1, duration: 0.22, clearProps: "opacity" });
    }, scope);
    return () => media.revert();
  }, { scope, dependencies: [selection, step === 3, locale], revertOnUpdate: true });
}
