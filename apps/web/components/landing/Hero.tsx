"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "./FadeIn";
type HeroProps = {
  onOpenModal: () => void;
};

export function Hero({ onOpenModal }: HeroProps) {
  return (
    <section className="harpply-hero harpply-section" id="home">
      <div className="harpply-hero-bg-cross" />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        <FadeIn className="harpply-hero-logo-wrap">
          <Image
            src="/images/logo.svg"
            alt="Harpply"
            className="harpply-hero-logo-img"
            width={320}
            height={92}
            priority
          />
        </FadeIn>

        <FadeIn>
          <p className="harpply-hero-tagline-main">
            Where Christian Singles Meet
          </p>
        </FadeIn>

        <FadeIn>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.2rem",
              maxWidth: 320,
              margin: "1.8rem auto",
            }}
          >
            <span
              style={{
                flex: 1,
                height: 1,
                background:
                  "linear-gradient(90deg, transparent, rgba(201,149,42,0.6), transparent)",
              }}
            />
            <span
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--gold)",
                fontWeight: 500,
              }}
            >
              Est. 2024
            </span>
            <span
              style={{
                flex: 1,
                height: 1,
                background:
                  "linear-gradient(90deg, transparent, rgba(201,149,42,0.6), transparent)",
              }}
            />
          </div>
        </FadeIn>

        <FadeIn>
          <p className="harpply-hero-tagline">
            Meaningful connections rooted in shared faith, biblical values, and
            a sincere commitment to God-honouring relationships.
          </p>
        </FadeIn>

        <div className="harpply-hero-actions">
          <FadeIn>
            <button
              type="button"
              className="harpply-btn-hero"
              onClick={onOpenModal}
            >
              Create Your Profile
            </button>
          </FadeIn>
          <FadeIn>
            <Link className="harpply-btn-hero-outline" href="#how">
              Learn How It Works
            </Link>
          </FadeIn>
        </div>

        <div className="harpply-hero-stats">
          <FadeIn delayIndex={1}>
            <div style={{ textAlign: "center" }}>
              <div className="harpply-stat-val">50,000+</div>
              <div className="harpply-stat-lbl">Members</div>
            </div>
          </FadeIn>
          <FadeIn delayIndex={2}>
            <div style={{ textAlign: "center" }}>
              <div className="harpply-stat-val">12,000+</div>
              <div className="harpply-stat-lbl">Connections</div>
            </div>
          </FadeIn>
          <FadeIn delayIndex={3}>
            <div style={{ textAlign: "center" }}>
              <div className="harpply-stat-val">2,000+</div>
              <div className="harpply-stat-lbl">Marriages</div>
            </div>
          </FadeIn>
          <FadeIn delayIndex={4}>
            <div style={{ textAlign: "center" }}>
              <div className="harpply-stat-val">140+</div>
              <div className="harpply-stat-lbl">Countries</div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
