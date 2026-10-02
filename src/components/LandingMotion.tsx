"use client";
import { useEffect } from "react";
export default function LandingMotion() {
    useEffect(() => {
        const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
        if (preference.matches)
            return;
        const animations = new Set<Animation>();
        const observer = new IntersectionObserver((entries) => {
            for (const entry of entries) {
                if (!entry.isIntersecting)
                    continue;
                observer.unobserve(entry.target);
                if (preference.matches)
                    continue;
                const animation = entry.target.animate([{ opacity: 0, transform: "translateY(14px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 450, easing: "cubic-bezier(0.22, 1, 0.36, 1)" });
                animations.add(animation);
                animation.onfinish = () => animations.delete(animation);
            }
        }, { threshold: 0.12 });
        const stop = () => {
            if (preference.matches)
                animations.forEach((animation) => animation.cancel());
        };
        document.querySelectorAll(".landing-page [data-reveal]").forEach((element) => observer.observe(element));
        preference.addEventListener("change", stop);
        return () => {
            observer.disconnect();
            animations.forEach((animation) => animation.cancel());
            preference.removeEventListener("change", stop);
        };
    }, []);
    return null;
}
