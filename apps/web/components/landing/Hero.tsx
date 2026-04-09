"use client";

import Image from "next/image";
import { FadeIn } from "./FadeIn";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";
import { AuthError, getGoogleLoginRedirectUrl } from "@/lib/api/auth";
import { getApiBaseUrl } from "@/lib/api/base-url";

type HeroProps = {
  onOpenModal: () => void;
};

/** Exact match for .splash-tagline from reference HTML */
const splashTaglineStyle: React.CSSProperties = {
  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
  fontSize: "clamp(1rem, 4vw, 1.3rem)",
  fontWeight: 400,
  letterSpacing: "0.07em",
  color: "rgba(255, 255, 255, 0.75)",
};

/** Exact match for .splash-coming-label from reference HTML */
const comingSoonLabelStyle: React.CSSProperties = {
  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
  fontSize: "clamp(3rem, 12vw, 5rem)",
  fontWeight: 600,
  fontStyle: "italic",
  lineHeight: "130%",
  textAlign: "center",
  background: "linear-gradient(135deg, #f3d88a, #e6b645, #c8952a)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  filter: "drop-shadow(0 0 32px rgba(201, 149, 42, 0.25))",
};

function GoogleIcon() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#333"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x={2} y={4} width={20} height={16} rx={2} />
      <path d="M2 7l10 7 10-7" />
    </svg>
  );
}

export function Hero({ onOpenModal }: HeroProps) {
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);
  const { email, password, setEmail, setPassword, loading, error, setError } =
    useAuthStore();

  const handleGoogleLogin = async () => {
    setError(null);
    setApiError(null);
    const url = getGoogleLoginRedirectUrl();
    if (!url) return;
    try {
      await fetch(getApiBaseUrl(), { method: "HEAD", cache: "no-store" });
    } catch {
      setApiError("API not running. From project root run: pnpm dev");
      return;
    }
    window.location.href = url;
  };

  return (
    <section
      id="pwa-splash"
      className="relative flex min-h-[100svh] min-h-[100dvh] flex-col items-center justify-between overflow-hidden px-8 pt-[max(env(safe-area-inset-top,0px),3rem)] pb-[max(env(safe-area-inset-bottom,0px),4.5rem)]"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 0%, #2a1468 0%, transparent 60%), radial-gradient(ellipse 40% 30% at 85% 15%, #1c0a50 0%, transparent 55%), #0c0520",
      }}
    >
      {/* Starfield */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 12% 18%, rgba(255,255,255,0.3) 0%, transparent 100%), radial-gradient(1px 1px at 78% 9%, rgba(255,255,255,0.2) 0%, transparent 100%), radial-gradient(1.5px 1.5px at 92% 40%, rgba(255,255,255,0.18) 0%, transparent 100%), radial-gradient(1px 1px at 28% 72%, rgba(255,255,255,0.15) 0%, transparent 100%), radial-gradient(1px 1px at 55% 88%, rgba(255,255,255,0.22) 0%, transparent 100%), radial-gradient(1px 1px at 6% 52%, rgba(255,255,255,0.12) 0%, transparent 100%)",
        }}
      />

      <div className="flex-1" />

      <FadeIn className="w-full relative z-10 flex flex-col items-center gap-[0.5rem]">
        <FadeIn className="w-full mb-1.5 flex items-center justify-center drop-shadow-[0_0_60px_rgba(201,149,42,0.25)]">
          <Image
            src="/images/logo.svg"
            alt="Harpply"
            className="h-auto w-full max-w-[min(280px,75vw)] object-contain sm:max-w-[min(360px,50vw)]"
            width={320}
            height={92}
            priority
          />
        </FadeIn>
        <p style={splashTaglineStyle}>Where Christian Singles Meet</p>
        <div className="mt-[0.3rem] flex w-full max-w-[280px] items-center gap-4">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[rgba(201,149,42,0.55)] to-transparent" />
          <span className="font-[var(--font-inter),'Inter',sans-serif] text-[0.6rem] font-medium uppercase tracking-[0.22em] text-[#c8952a]">
            Est. 2026
          </span>
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[rgba(201,149,42,0.55)] to-transparent" />
        </div>
      </FadeIn>

      <div className="flex-1" />

      <FadeIn className="relative z-10 flex flex-col items-center gap-[0.75rem]">
        <div className="relative z-10" style={comingSoonLabelStyle}>
          Coming Soon
        </div>
        <div className="inline-flex items-center gap-[0.55rem] my-4 rounded-full border border-[rgba(201,149,42,0.4)] bg-[rgba(201,149,42,0.07)] px-[1.4rem] py-[0.32rem]">
          <span
            className="h-[5px] w-[5px] rounded-full bg-[#e6b645]"
            style={{
              animation: "blink 2s ease-in-out infinite",
            }}
          />
          <span className="font-[var(--font-inter),'Inter',sans-serif] text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#e6b645]">
            2026
          </span>
        </div>
      </FadeIn>

      <div className="flex-1" />

      <FadeIn className="relative z-10 flex w-full max-w-[420px] flex-col gap-[0.85rem]">
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="font-[var(--font-inter),'Inter',sans-serif] flex w-full items-center justify-center gap-[0.75rem] rounded-full border-none bg-[rgba(255,255,255,0.97)] px-6 py-4 text-[0.95rem] font-semibold text-[#1a1a2e] no-underline shadow-[0_2px_16px_rgba(0,0,0,0.25)] transition-[transform,box-shadow] duration-[0.18s] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,0,0,0.35)]"
        >
          <GoogleIcon />
          {loading ? "Connecting..." : "Continue with Google"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/auth/signin")}
          className="font-[var(--font-inter),'Inter',sans-serif] flex w-full items-center justify-center gap-[0.75rem] rounded-full border-none bg-[rgba(255,255,255,0.91)] px-6 py-4 text-[0.95rem] font-medium text-[#1a1a2e] no-underline shadow-[0_2px_12px_rgba(0,0,0,0.2)] transition-[transform,box-shadow] duration-[0.18s] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
        >
          <EmailIcon />
          Continue with Email
        </button>

        <p className="font-[var(--font-inter),'Inter',sans-serif] text-center  text-[0.875rem] font-light leading-[140%] text-white/75 max-w-[520px] mx-auto mt-3">
          By continuing, you agree to our Terms & Conditions and Online Dating
          Safety Policy. We may send you transactional emails related to your
          account. Privacy Policy.
        </p>
      </FadeIn>

      <div
        className="absolute left-1/2 z-10 flex  flex-col items-center opacity-[0.32]"
        style={{
          animation: "bob 2.2s ease-in-out infinite",
          bottom: "1rem",
          gap: "0.35rem",
        }}
        aria-hidden
      >
        <span className="font-[var(--font-inter),'Inter',sans-serif] text-[0.58rem] uppercase tracking-[0.22em]">
          Scroll
        </span>
        <svg
          width={14}
          height={14}
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M8 3v10M4 9l4 4 4-4" />
        </svg>
      </div>
    </section>
  );
}
