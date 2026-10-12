"use client";
import { useRef, type RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);
export function useShinexMotion(scope: RefObject<HTMLElement | null>, stage: string, car: string, locale: string) {
  const previousHeight = useRef<number | null>(null);
  useGSAP(() => {
    const content = scope.current?.querySelector<HTMLElement>("[data-step-content]");
    const viewport = scope.current?.querySelector<HTMLElement>("[data-step-viewport]");
    if (!content || !viewport) return;
    const from = previousHeight.current;
    const height = content.offsetHeight;
    previousHeight.current = height;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      if (from === null) return;
      gsap.fromTo(viewport, { height: from }, { height, duration: 0.2, clearProps: "height" });
      gsap.fromTo(content, { y: 4, opacity: 0.8 }, { y: 0, opacity: 1, duration: 0.2, clearProps: "transform,opacity" });
    });
    const resize = new ResizeObserver(() => { previousHeight.current = content.offsetHeight; });
    resize.observe(content);
    return () => { resize.disconnect(); media.revert(); };
  }, { scope, dependencies: [stage, locale], revertOnUpdate: true });
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo("[data-price]", { opacity: 0.65 }, { opacity: 1, duration: 0.2, clearProps: "opacity" });
    }, scope);
    return () => media.revert();
  }, { scope, dependencies: [car], revertOnUpdate: true });
}
