"use client";

import { useEffect, useRef, type ReactNode } from "react";

const HIDDEN_CLASSES =
  "opacity-0 translate-y-[18px] transition-[opacity,transform] duration-[0.6s] ease-out";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delayIndex?: number;
};

export function FadeIn({
  children,
  className = "",
  delayIndex = 0,
}: FadeInProps) {
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
              el.classList.remove("opacity-0", "translate-y-[18px]");
              el.classList.add("opacity-100", "translate-y-0");
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
    <div
      ref={ref}
      className={`${HIDDEN_CLASSES} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
