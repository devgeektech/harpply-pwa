"use client";

import { FadeIn } from "./FadeIn";
import Link from "next/link";

type CTAProps = {
  onOpenModal: () => void;
};

const goldGradientText =
  "bg-gradient-to-br from-[#f3d88a] via-[#e6b645] to-[#c8952a] bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]";

export function CTA({ onOpenModal }: CTAProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#321880] to-[#221060] px-8 py-24">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(ellipse, rgba(201,149,42,0.09) 0%, transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-[660px] text-center">
        <FadeIn>
          <span className="block text-center text-[0.68rem] font-medium uppercase tracking-[0.22em] text-[#e6b645]">
            Begin Your Journey
          </span>
        </FadeIn>
        <FadeIn>
          <h2 className="font-[var(--font-cormorant),'Cormorant_Garamond',serif] text-[clamp(2rem,5vw,3.6rem)] font-semibold leading-[1.12] tracking-[-0.01em]">
            Where Christian
            <br />
            <span className={goldGradientText}>Singles Meet</span>
          </h2>
        </FadeIn>
        <FadeIn>
          <p className="mt-5 text-[0.92rem] font-light leading-[1.85] text-white/75">
            Join over 50,000 believers who have entrusted Harpply with one of
            life&apos;s most significant decisions. Creating your profile takes
            less than five minutes.
          </p>
        </FadeIn>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <FadeIn>
            <button
              type="button"
              className="inline-block cursor-pointer rounded border-none bg-gradient-to-br from-[#e6b645] to-[#c8952a] px-9 py-3.5 text-[0.8rem] font-semibold uppercase tracking-[0.09em] text-[#0c0520] no-underline transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
              onClick={onOpenModal}
            >
              Create a Free Profile
            </button>
          </FadeIn>
          <FadeIn>
            <Link
              className="inline-block rounded border border-white/20 bg-white/5 px-9 py-3.5 text-[0.8rem] font-medium uppercase tracking-[0.09em] text-white/75 no-underline transition-all duration-200 hover:border-white/45 hover:text-white"
              href="#how"
            >
              Learn More
            </Link>
          </FadeIn>
        </div>
        <FadeIn>
          <p className="mt-6 text-[0.72rem] tracking-[0.03em] text-white/45">
            No credit card required &nbsp;&middot;&nbsp; Free to join
            &nbsp;&middot;&nbsp; Cancel at any time
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
