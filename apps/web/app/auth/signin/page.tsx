"use client";

import { Button, Card, CardContent, Input, Label } from "@repo/ui";
import Link from "next/link";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import { AuthError, getGoogleLoginRedirectUrl } from "@/lib/api/auth";
import { getApiBaseUrl } from "@/lib/api/base-url";
import { ERROR_MESSAGES } from "@/lib/messages";
import { isStrongPassword, isValidEmail } from "@/lib/validation/regex";
import { useAuthStore } from "store/useAuthStoreLogin";

function SigninForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { email, password, setEmail, setPassword, login, loading, error, setError } = useAuthStore();

  const googleError = searchParams.get("error") === "google_signin_failed";
  const googleFailReason = searchParams.get("reason");

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

  const handleLogin = async () => {
    setError(null);
    setEmailError(null);
    setPasswordError(null);
    const normalizedEmail = email.trim();
    const trimmedPassword = password.trim();
    let hasValidationError = false;

    if (!normalizedEmail) {
      setEmailError(ERROR_MESSAGES.VALIDATION.EMAIL_REQUIRED);
      hasValidationError = true;
    } else if (!isValidEmail(normalizedEmail)) {
      setEmailError(ERROR_MESSAGES.VALIDATION.EMAIL_INVALID);
      hasValidationError = true;
    }

    if (!trimmedPassword) {
      setPasswordError(ERROR_MESSAGES.VALIDATION.PASSWORD_REQUIRED);
      hasValidationError = true;
    } else if (!isStrongPassword(password)) {
      setPasswordError(ERROR_MESSAGES.VALIDATION.PASSWORD_WEAK);
      hasValidationError = true;
    }

    if (hasValidationError) return;

    try {
      const redirectTo = await login();
      router.push(redirectTo);
    } catch (err) {
      if (err instanceof AuthError && err.code === "COMPLETE_SIGNUP") {
        router.push(
          `/auth/createpassword?email=${encodeURIComponent(email.trim() || "")}`
        );
        return;
      }
      setError(err instanceof Error ? err.message : "Sign in failed.");
    }
  };

  return (
    <div className="bg-[url('/images/bg_blue.jpg')] bg-no-repeat bg-cover bg-center min-h-screen flex items-center justify-center px-4">
      <Card className="md:d-block md:bg-[url('/images/bg_auth_center.png')] py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
        <CardContent className="flex items-center flex-col sm:p-10 px-3 text-left">
          <div className="w-full space-y-6">
            <div className="text-left w-full">
              <button
                type="button"
                onClick={() => router.push("/auth/signupemail")}
                className="cursor-pointer text-white hover:opacity-90"
                aria-label="Back"
              >
                <ChevronLeft size={24} />
              </button>
            </div>
            <h2 className="w-full text-[24px] font-light text-white font-serif tracking-wider mb-[32px] md:mb-0">
              Sign In
            </h2>

            {(apiError || googleError) && (
              <p className="text-sm text-amber-200 bg-amber-500/20 rounded-lg px-3 py-2">
                {apiError ??
                  (googleError
                    ? googleFailReason
                      ? (() => {
                        const reason = googleFailReason.trim();
                        const cancelledReasons = new Set([
                          "access_denied",
                          "user_denied",
                          "user_cancelled",
                          "user_cancelled_by_user",
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
                        if (cancelledReasons.has(reason)) {
                          return "Google sign-in was cancelled.";
                        }
                        return `Google sign-in failed (${reason}). Please try again.`;
                      })()
                      : "Google sign-in failed. Please try again."
                    : null)}
              </p>
            )}
            <form className="space-y-5 md:my-[50px] w-full" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
              {error && (
                <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-md px-3 py-2">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label className="text-gray-300">Email</Label>
                <Input
                  placeholder="Email"
                  value={email}
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError(null);
                  }}
                  className="bg-white border-white/10 h-[52px] border border-[#E7ECF2] rounded-[12px] md:rounded-[8px] text-[#3B3B3B] placeholder:text-[#3B3B3B] focus-visible:ring-0"
                />
                {emailError && <p className="text-sm text-red-400">{emailError}</p>}
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Password</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (passwordError) setPasswordError(null);
                    }}
                    className="bg-white h-[52px] rounded-[12px] rounded-[8px] border-white/10 text-[#3B3B3B] placeholder:text-[#3B3B3B] pr-10  focus-visible:ring-0"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {passwordError && <p className="text-sm text-red-400">{passwordError}</p>}
              </div>

              <div className="text-right text-sm">
                <Link
                  href="/auth/forgotpassword"
                  className="text-yellow-400 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="cursor-pointer w-full text-base h-[52px] mt-[12px] rounded-[12px] md:rounded-[8px] bg-gradient-to-r from-[#c58b00] via-[#f5d76e] to-[#c58b00] text-[#913C01] font-semibold hover:opacity-90 transition disabled:opacity-60"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
            <p className="bottom_text text-center text-sm text-gray-300">
              Don’t have an account?
              <Link
                href="/auth/signup"
                className="text-yellow-400 ml-1 hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function Signin() {
  return (
    <Suspense
      fallback={
        <div className="bg-[url('/images/bg_blue.jpg')] bg-no-repeat bg-cover bg-center min-h-screen flex items-center justify-center px-4">
          <Loader2 className="h-8 w-8 animate-spin text-white/70" aria-label="Loading" />
        </div>
      }
    >
      <SigninForm />
    </Suspense>
  );
}
