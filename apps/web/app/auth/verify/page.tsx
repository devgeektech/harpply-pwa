"use client";

import { Suspense, useState, useCallback } from "react";
import { Button, Card, CardContent } from "@repo/ui";
import Link from "next/link";
import { ChevronLeft, Loader2 } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useMemo, useEffect } from "react";
import { useSignupStore } from "store/useSignupStore";
import { resendVerificationEmail } from "@/lib/api/auth";

function maskEmail(email: string): string {
  if (!email || !email.includes("@")) return "***@*****.com";
  const [local, domain] = email.split("@");
  const maskedLocal =
    !local || local.length <= 2
      ? (local?.[0] ?? "") + "***"
      : local.slice(0, 3) + "***";
  const maskedDomain = domain
    ? "*****." + (domain.split(".").pop() ?? "com")
    : "*****.com";
  return `${maskedLocal}@${maskedDomain}`;
}

const RESEND_COOLDOWN_SEC = 60;

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailFromUrl = searchParams.get("email") ?? "";
  const { email: emailFromStore, setEmail } = useSignupStore();
  const email = emailFromStore || emailFromUrl;

  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState<string | null>(null);
  const [resendError, setResendError] = useState<string | null>(null);
  const [cooldownLeft, setCooldownLeft] = useState(RESEND_COOLDOWN_SEC);

  useEffect(() => {
    if (emailFromUrl) setEmail(emailFromUrl);
  }, [emailFromUrl, setEmail]);

  useEffect(() => {
    if (cooldownLeft <= 0) return;
    const t = setInterval(() => setCooldownLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [cooldownLeft]);

  const handleResend = useCallback(async () => {
    if (!email?.trim() || resendLoading || cooldownLeft > 0) return;
    setResendError(null);
    setResendMessage(null);
    setResendLoading(true);
    try {
      const result = await resendVerificationEmail(email.trim());
      setResendMessage(result?.message ?? "Verification link sent. Please check your email.");
      setCooldownLeft(RESEND_COOLDOWN_SEC);
      if (result?.data?.requiresPassword) {
        router.push(`/auth/createpassword?email=${encodeURIComponent(email.trim())}`);
        return;
      }
    } catch (err) {
      setResendError(err instanceof Error ? err.message : "Failed to resend.");
    } finally {
      setResendLoading(false);
    }
  }, [email, resendLoading, cooldownLeft, router]);

  const maskedEmail = useMemo(() => maskEmail(email), [email]);
  const createPasswordUrl = email
    ? `/auth/createpassword?email=${encodeURIComponent(email)}`
    : "/auth/createpassword";

  return (
    <div className="bg-[url('/images/bg_blue.jpg')] bg-no-repeat bg-cover bg-center min-h-screen flex sm:items-center items-start justify-center px-4 py-[50px] sm:py-4">
      <Card className="md:d-block md:bg-[url('/images/bg_auth_center.png')] py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
        <CardContent className="flex items-center flex-col gap-3 sm:p-10 px-3 text-left">
          <div className="text-left text-white w-full md:hidden">
            <Link href="/auth/signup">
              <ChevronLeft />
            </Link>
          </div>

          <h1 className="text-[24px] font-serif text-white font-normal text-left w-full">
            Verify your email
          </h1>

          <p className="text-base text-gray-300 text-left w-full">
            A verification link has been sent to your email. Please check your
            email.
            {email && (
              <span className="ms-2 font-medium text-white">{maskedEmail}</span>
            )}
          </p>

          {resendMessage && (
            <p className="text-sm text-yellow-400 w-full">{resendMessage}</p>
          )}
          {resendError && (
            <p className="text-sm text-red-400 w-full">{resendError}</p>
          )}

          <div className="mt-6 flex flex-col items-center gap-4 w-full">
            <button
              type="button"
              onClick={handleResend}
              disabled={!email?.trim() || resendLoading || cooldownLeft > 0}
              className="text-yellow-400 font-medium underline hover:opacity-90 disabled:opacity-50 disabled:no-underline disabled:cursor-not-allowed"
            >
              {resendLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </span>
              ) : cooldownLeft > 0 ? (
                `Resend in ${cooldownLeft}s`
              ) : (
                "Resend"
              )}
            </button>
          </div>

          {/* <p className="text-center text-sm text-white mt-6 w-full">
            Already have an account?{" "}
            <a href="/auth/signin" className="text-yellow-400 underline">
              Sign In
            </a>
          </p> */}
        </CardContent>
      </Card>
    </div>
  );
}

function VerifyEmailFallback() {
  return (
    <div className="bg-[url('/images/bg_blue.jpg')] bg-no-repeat bg-cover bg-center min-h-screen flex sm:items-center items-start justify-center px-4 py-[50px] sm:py-4">
      <Card className="md:d-block md:bg-[url('/images/bg_auth_center.png')] py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
        <CardContent className="flex items-center flex-col gap-3 sm:p-10 px-3 text-left">
          <p className="text-white">Loading...</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<VerifyEmailFallback />}>
      <VerifyEmailContent />
    </Suspense>
  );
}
