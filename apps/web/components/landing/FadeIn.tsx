"use client";

import { useEffect, useRef, type ReactNode } from "react";

const VISIBLE_CLASS = "harpply-fi v";
const HIDDEN_CLASS = "harpply-fi";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delayIndex?: number;
};

export function FadeIn({ children, className = "", delayIndex = 0 }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = delayIndex * 65;
            timeoutId = setTimeout(() => {
              el.classList.remove("harpply-fi");
              el.classList.add("harpply-fi", "v");
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [delayIndex]);

  return (
    <div ref={ref} className={[HIDDEN_CLASS, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
