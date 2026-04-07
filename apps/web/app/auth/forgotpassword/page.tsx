"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Label, Button, Card, CardContent } from "@repo/ui";
import Link from "next/link";
import { ChevronLeft, AlertCircle } from "lucide-react";
import { useForgotPasswordStore } from "store/useForgotPasswordStore";
import { isValidEmail } from "@/lib/validation/regex";
import { ERROR_MESSAGES } from "@/lib/messages";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const {
    email,
    setEmail,
    sendResetLink,
    loading,
    error,
    successMessage,
    clearMessage,
  } = useForgotPasswordStore();

  const [emailError, setEmailError] = useState<string | null>(null);

  const handleSendResetLink = async () => {
    setEmailError(null);

    const trimmed = email?.trim() ?? "";
    if (!trimmed) {
      setEmailError(ERROR_MESSAGES.VALIDATION.EMAIL_REQUIRED);
      return;
    }

    if (!isValidEmail(trimmed)) {
      setEmailError(ERROR_MESSAGES.VALIDATION.EMAIL_INVALID);
      return;
    }

    const success = await sendResetLink();
    if (success) {
      router.push(
        `/auth/forgot-password-verify?email=${encodeURIComponent(trimmed)}`
      );
    }
  };

  return (
    <div className="bg-[url('/images/bg_blue.jpg')] bg-no-repeat bg-cover bg-center min-h-screen flex  sm:items-center items-start justify-center px-4 py-[50px] sm:py-4">
      <Card className="md:d-block md:bg-[url('/images/bg_auth_center.png')] py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
        <CardContent className="flex items-center flex-col gap-6 sm:p-10 px-3 text-left">
          <div className="text-left text-white w-full md:hidden ">
            <Link href="/auth/signin">
              <ChevronLeft />
            </Link>
          </div>
          <h1 className="text-[24px] font-serif font-normal text-white mb-2 w-full text-left">
            Forgot password
          </h1>

          <p className="text-base text-gray-300 mb-6">
            Enter your email and we’ll send a link to set a new password
            (same as when you signed up).
          </p>

          {error && (
            <div className="w-full flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-4 w-full">
            <div className="space-y-2">
              <Label className="text-gray-300">Email</Label>
              <Input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => {
                  clearMessage();
                  setEmail(e.target.value);
                  setEmailError(null);
                }}
                className="bg-[linear-gradient(160deg,rgba(200,168,81,0.10)_0%,rgba(35,22,58,0.85)_45%,rgba(18,10,35,0.92)_100%)] border border-[#C8A851]/40  h-[52px] rounded-[12px] md:rounded-[8px] text-[#ffffff] placeholder:text-white/40 focus-visible:border-[#C8A851]/60 focus-visible:ring-0 focus-visible:ring-transparent"
              />
              {emailError && (
                <p className="text-sm text-red-400">{emailError}</p>
              )}
            </div>

            <Button
              disabled={!email?.trim() || loading || !isValidEmail(email.trim())}
              onClick={handleSendResetLink}
              className="cursor-pointer w-full text-base h-[52px] mt-[12px] rounded-[12px] md:rounded-[8px] bg-gradient-to-r from-[#c58b00] via-[#f5d76e] to-[#c58b00] text-[#913C01] font-semibold hover:opacity-90 transition disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send reset link"}
            </Button>
          </div>

          <p className="text-center text-sm text-white w-full">
            Remember your password?{" "}
            <Link href="/auth/signin" className="text-yellow-400 underline">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
