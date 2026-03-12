"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "./FadeIn";
import { useRouter } from "next/navigation";

type HeroProps = {
  onOpenModal: () => void;
};

export function Hero({ onOpenModal }: HeroProps) {
  const router = useRouter();

  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-8 pb-20 pt-36 text-center"
      id="home"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 opacity-[0.022]"
        style={{
          background:
            "linear-gradient(#c8952a 0 0) center/3px 100%, linear-gradient(#c8952a 0 0) center 28%/100% 3px",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="relative z-10 mx-auto max-w-[900px]">
        <FadeIn className="mb-1.5 flex items-center justify-center drop-shadow-[0_0_60px_rgba(201,149,42,0.25)]">
          <Image
            src="/images/logo.svg"
            alt="Harpply"
            className="h-auto w-full max-w-[min(280px,75vw)] object-contain sm:max-w-[min(360px,50vw)]"
            width={320}
            height={92}
            priority
          />
        </FadeIn>

        <FadeIn>
          <p className="font-[var(--font-cormorant),'Cormorant_Garamond',serif] mb-0 text-[clamp(1rem,2.8vw,1.5rem)] font-normal uppercase tracking-[0.18em] text-white/75">
            Where Christian Singles Meet
          </p>
        </FadeIn>

        <FadeIn>
          <div className="mx-auto flex max-w-[320px] items-center gap-5 pt-7">
            <span
              className="h-px flex-1"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(201,149,42,0.6), transparent)",
              }}
            />
            <span className="text-[0.6rem] font-medium uppercase tracking-[0.2em] text-[#c8952a]">
              Est. 2024
            </span>
            <span
              className="h-px flex-1"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(201,149,42,0.6), transparent)",
              }}
            />
          </div>
        </FadeIn>

        <FadeIn>
          <p className="mx-auto mt-8 max-w-[480px] font-[var(--font-cormorant),'Cormorant_Garamond',serif] text-[clamp(0.92rem,2vw,1.05rem)] font-light leading-[1.85] tracking-[0.01em] text-white/75">
            Meaningful connections rooted in shared faith, biblical values, and
            a sincere commitment to God-honouring relationships.
          </p>
        </FadeIn>

        <div className="mt-11 flex flex-wrap justify-center gap-4">
          <FadeIn>
            <button
              type="button"
              className="inline-block cursor-pointer rounded border-none bg-gradient-to-br from-[#e6b645] to-[#c8952a] px-9 py-3.5 text-[0.8rem] font-semibold uppercase tracking-[0.09em] text-[#0c0520] no-underline transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
              onClick={() => router.push("/auth/signupemail")}
            >
              Create Your Profile
            </button>
          </FadeIn>
          <FadeIn>
            <Link
              className="inline-block rounded border border-white/20 bg-white/5 px-9 py-3.5 text-[0.8rem] font-medium uppercase tracking-[0.09em] text-white/75 no-underline transition-all duration-200 hover:border-white/45 hover:text-white"
              href="#how"
            >
              Learn How It Works
            </Link>
          </FadeIn>
        </div>

        <div className="mx-auto mt-[4.5rem] flex max-w-[640px] flex-wrap justify-center gap-14 border-t border-white/10 pt-12">
          <FadeIn delayIndex={1}>
            <div className="text-center">
              <div className="font-[var(--font-cormorant),'Cormorant_Garamond',serif] text-4xl font-bold leading-none text-[#e6b645]">
                50,000+
              </div>
              <div className="mt-1.5 text-[0.68rem] font-medium uppercase tracking-[0.12em] text-white/45">
                Members
              </div>
            </div>
          </FadeIn>
          <FadeIn delayIndex={2}>
            <div className="text-center">
              <div className="font-[var(--font-cormorant),'Cormorant_Garamond',serif] text-4xl font-bold leading-none text-[#e6b645]">
                12,000+
              </div>
              <div className="mt-1.5 text-[0.68rem] font-medium uppercase tracking-[0.12em] text-white/45">
                Connections
              </div>
            </div>
          </FadeIn>
          <FadeIn delayIndex={3}>
            <div className="text-center">
              <div className="font-[var(--font-cormorant),'Cormorant_Garamond',serif] text-4xl font-bold leading-none text-[#e6b645]">
                2,000+
              </div>
              <div className="mt-1.5 text-[0.68rem] font-medium uppercase tracking-[0.12em] text-white/45">
                Marriages
              </div>
            </div>
          </FadeIn>
          <FadeIn delayIndex={4}>
            <div className="text-center">
              <div className="font-[var(--font-cormorant),'Cormorant_Garamond',serif] text-4xl font-bold leading-none text-[#e6b645]">
                140+
              </div>
              <div className="mt-1.5 text-[0.68rem] font-medium uppercase tracking-[0.12em] text-white/45">
                Countries
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
