"use client";

import { FadeIn } from "./FadeIn";
import Link from "next/link";

type CTAProps = {
  onOpenModal: () => void;
};

export function CTA({ onOpenModal }: CTAProps) {
  return (
    <section className="harpply-section harpply-cta-sect">
      <div className="harpply-cta-inner">
        <FadeIn>
          <span className="harpply-eyebrow" style={{ display: "block", textAlign: "center" }}>
            Begin Your Journey
          </span>
        </FadeIn>
        <FadeIn>
          <h2>
            Where Christian
            <br />
            <span className="harpply-gold-text">Singles Meet</span>
          </h2>
        </FadeIn>
        <FadeIn>
          <p>
            Join over 50,000 believers who have entrusted Harpply with one of
            life&apos;s most significant decisions. Creating your profile takes
            less than five minutes.
          </p>
        </FadeIn>
        <div className="harpply-cta-actions">
          <FadeIn>
            <button
              type="button"
              className="harpply-btn-hero"
              onClick={onOpenModal}
            >
              Create a Free Profile
            </button>
          </FadeIn>
          <FadeIn>
            <Link className="harpply-btn-hero-outline" href="#how">
              Learn More
            </Link>
          </FadeIn>
        </div>
        <FadeIn>
          <p className="harpply-cta-note">
            No credit card required &nbsp;&middot;&nbsp; Free to join
            &nbsp;&middot;&nbsp; Cancel at any time
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
