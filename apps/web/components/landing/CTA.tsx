"use client";

import Link from "next/link";
import { FadeIn } from "./FadeIn";
import { useRouter } from "next/navigation";

type CTAProps = {
  onOpenModal: () => void;
};

/** .gold-text from reference HTML */
const goldTextStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, #f3d88a 0%, #e6b645 40%, #c8952a 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

/** .eyebrow */
const eyebrowStyle: React.CSSProperties = {
  fontFamily: "var(--font-inter), 'Inter', sans-serif",
  fontSize: "0.68rem",
  fontWeight: 500,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "#e6b645",
  marginBottom: "1rem",
  display: "block",
  textAlign: "center",
};

/** .cta-inner h2 */
const ctaTitleStyle: React.CSSProperties = {
  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
  fontSize: "clamp(2rem, 5vw, 3.6rem)",
  fontWeight: 600,
  lineHeight: 1.12,
  letterSpacing: "-0.01em",
};

/** .cta-inner p */
const ctaBodyStyle: React.CSSProperties = {
  fontFamily: "var(--font-inter), 'Inter', sans-serif",
  color: "rgba(255, 255, 255, 0.75)",
  marginTop: "1.2rem",
  fontSize: "0.92rem",
  lineHeight: 1.85,
  fontWeight: 300,
};

/** .btn-cta-primary */
const btnPrimaryStyle: React.CSSProperties = {
  fontFamily: "var(--font-inter), 'Inter', sans-serif",
  fontSize: "0.8rem",
  fontWeight: 600,
  letterSpacing: "0.09em",
  textTransform: "uppercase",
  color: "#0c0520",
  padding: "0.95rem 2.4rem",
  borderRadius: "4px",
  background: "linear-gradient(135deg, #e6b645, #c8952a)",
  border: "none",
};

/** .btn-cta-outline */
const btnOutlineStyle: React.CSSProperties = {
  fontFamily: "var(--font-inter), 'Inter', sans-serif",
  fontSize: "0.8rem",
  fontWeight: 500,
  letterSpacing: "0.09em",
  textTransform: "uppercase",
  color: "rgba(255, 255, 255, 0.75)",
  padding: "0.95rem 2.4rem",
  borderRadius: "4px",
  border: "1px solid rgba(255, 255, 255, 0.22)",
  background: "rgba(255, 255, 255, 0.04)",
};

export function CTA({ onOpenModal }: CTAProps) {
  const router = useRouter();

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #321880 0%, #221060 100%)",
        padding: "6rem 2rem",
      }}
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(ellipse, rgba(201,149,42,0.09) 0%, transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-[660px] text-center">
        <FadeIn>
          <span style={eyebrowStyle}>Begin Your Journey</span>
        </FadeIn>
        <FadeIn>
          <h2 style={ctaTitleStyle}>
            Where Christian
            <br />
            <span style={goldTextStyle}>Singles Meet</span>
          </h2>
        </FadeIn>
        <FadeIn>
          <p style={ctaBodyStyle}>
            Be among the first believers to join Harpply when we launch in 2026.
            Create your profile today and take the first step toward a connection
            grounded in faith.
          </p>
        </FadeIn>
        <div
          className="flex flex-wrap justify-center max-[640px]:flex-col max-[640px]:items-center"
          style={{ marginTop: "2.5rem", gap: "1rem" }}
        >
          <FadeIn>
            <button
              type="button"
              className="cursor-pointer no-underline transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
              style={btnPrimaryStyle}
              onClick={() => router.push("/auth/signupemail")}
            >
              Create a Free Profile
            </button>
          </FadeIn>
          <FadeIn>
            <Link
              href="#how"
              className="inline-block no-underline transition-all duration-200 hover:border-white/45 hover:text-white"
              style={btnOutlineStyle}
            >
              Learn More
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
