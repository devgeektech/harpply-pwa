"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AUTH_STORAGE_KEYS } from "@/lib/constants";
import { exchangeGoogleSessionCode } from "@/lib/api/auth";

function GoogleDoneInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("Signing you in...");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const error = searchParams.get("error");
    const reason = searchParams.get("reason");
    const reasonQuery = reason ? `&reason=${encodeURIComponent(reason)}` : "";
    if (error) {
      router.replace(
        `/auth/signupemail?error=google_signin_failed${reasonQuery}`
      );
      return;
    }

    const exchange = searchParams.get("exchange");
    if (!exchange) {
      router.replace(
        `/auth/signupemail?error=google_signin_failed${reasonQuery}`
      );
      return;
    }

    (async () => {
      try {
        const { accessToken, onboardingCompleted } =
          await exchangeGoogleSessionCode(exchange);
        window.localStorage.setItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN, accessToken);
        window.localStorage.setItem(
          AUTH_STORAGE_KEYS.ONBOARDING_COMPLETED,
          onboardingCompleted ? "true" : "false"
        );
        router.replace(
          onboardingCompleted ? "/dashboard" : "/auth/onboarding/identity"
        );
      } catch (e) {
        setMessage(
          e instanceof Error ? e.message : "Could not complete sign-in."
        );
        setTimeout(() => {
          router.replace(
            `/auth/signin?error=google_signin_failed${reasonQuery}`
          );
        }, 2500);
      }
    })();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/images/bg_blue.jpg')] bg-cover">
      <p className="text-white px-4 text-center">{message}</p>
    </div>
  );
}

export default function GoogleDonePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[url('/images/bg_blue.jpg')] bg-cover">
          <p className="text-white">Signing you in...</p>
        </div>
      }
    >
      <GoogleDoneInner />
    </Suspense>
  );
}
