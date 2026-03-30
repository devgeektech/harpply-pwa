"use client";

import Image from "next/image";
import { Card, CardContent, Button } from "@repo/ui";
import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getApiBaseUrl } from "@/lib/api/base-url";
import { getGoogleLoginRedirectUrl } from "@/lib/api/auth";

function googleBannerMessage(reasonRaw: string | null): string {
  const reason = (reasonRaw ?? "").trim();
  if (!reason) return "Google sign-in failed. Please try again.";
  if (reason === "EMAIL_LOGIN_ONLY") {
    return "This email is registered with email/password. Please sign in using email and password.";
  }
  if (reason === "SOCIAL_LOGIN_ONLY") {
    return "This email is registered with Google. Please sign in using Google.";
  }
  const cancelledReasons = new Set([
    "access_denied",
    "user_denied",
    "user_cancelled",
    "user_cancelled_by_user",
    "cancelled",
    "cancelled_by_user",
    "popup_closed",
    "popup_closed_by_user",
    "request_canceled",
    "consent_denied",
    "oauth_canceled",
    "google_denied",
    "google_cancelled",
    "google_cancelled_by_user",
  ]);
  if (cancelledReasons.has(reason)) return "Google sign-in was cancelled.";
  return `Google sign-in failed (${reason}). Please try again.`;
}

function SignupEmailInner() {
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const googleError = searchParams.get("error") === "google_signin_failed";
  const googleFailReason = searchParams.get("reason");
  const [googleBanner, setGoogleBanner] = useState<string | null>(null);

  const computedGoogleBanner = useMemo(() => {
    if (!googleError) return null;
    return googleBannerMessage(googleFailReason);
  }, [googleError, googleFailReason]);

  useEffect(() => {
    if (!computedGoogleBanner) return;
    setGoogleBanner(computedGoogleBanner);

    // Consume the query params so a refresh clears the banner.
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", "/auth/signupemail");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [computedGoogleBanner]);

  const handleGoogleLogin = async () => {
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
    <div className="bg-[url('/images/bg_blue.jpg')] bg-no-repeat bg-cover bg-center min-h-screen flex items-center justify-center px-4">
      <Card className=" md:d-block md:bg-[url('/images/bg_auth_center.png')] bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
        <CardContent className="flex items-center flex-col sm:p-10 px-3 space-y-8 text-center">
          {/* Logo */}
          <div className="space-y-3">
            <div className="flex justify-center mb-[1rem]">
              <Image
                src="/images/logo.svg"
                alt="Harpply Logo"
                width={226}
                height={74}
              />
            </div>

            <p className="text-base font-normal text-white">
              Where Christian Singles Meet
            </p>
          </div>

          {/* Buttons */}
          <div className="w-full space-y-4 mt-[] mb-[67px] md:my-[67px]">
            {(apiError || googleBanner) && (
              <p className="text-sm text-amber-200 bg-amber-500/20 rounded-lg px-3 py-2">
                {apiError ?? googleBanner}
              </p>
            )}
            <Button
              onClick={handleGoogleLogin}
              className="cursor-pointer relative w-full bg-white text-[#1A1A1A] hover:bg-gray-200 rounded-full h-[56px] text-base font-normal"
            >
              <Image
                src="/images/googleLogo.png"
                alt="Google"
                width={30}
                height={30}
                className="mr-2 absolute left-[22px] top-[14px]"
              />
              Continue with Google
            </Button>

            <Button
              onClick={() => router.push("/auth/signin")}
              variant="secondary"
              className="cursor-pointer relative w-full rounded-full h-[56px] text-[#1A1A1A] text-base font-normal bg-white/90 hover:bg-white"
            >
              <Image
                src="/images/envlope.png"
                alt="Email"
                width={30}
                height={30}
                className="mr-2 absolute left-[22px] top-[14px]"
              />
              Continue with Email
            </Button>
          </div>

          {/* Terms */}
          <p className="md:text-base text-sm text-white/60 leading-relaxed">
            By tapping Create Account or Sign In, you agree to our Terms. Learn
            how we process your data in our{" "}
            <Link
              href="/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline cursor-pointer"
            >
              Privacy Policy
            </Link>
            {" "}and{" "}
            <Link
              href="/terms-and-conditions"
              target="_blank"
              rel="noopener noreferrer"
              className="underline cursor-pointer"
            >
              Terms and Conditions
            </Link>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default function SignupEmail() {
  return (
    <Suspense fallback={null}>
      <SignupEmailInner />
    </Suspense>
  );
}
