"use client";

import { Suspense, useEffect, useState } from "react";
import { Button, Card, CardContent } from "@repo/ui";
import Link from "next/link";
import { ChevronLeft, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { verifyEmailByToken } from "@/lib/api/auth";

type Status = "idle" | "loading" | "verified" | "error";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [verifiedEmail, setVerifiedEmail] = useState<string>("");

  useEffect(() => {
    if (!token?.trim()) {
      setStatus("error");
      setErrorMessage("Missing verification link.");
      return;
    }
    setStatus("loading");
    verifyEmailByToken(token.trim())
      .then((res) => {
        setStatus("verified");
        if (res?.data?.email) setVerifiedEmail(res.data.email);
      })
      .catch((err) => {
        setStatus("error");
        setErrorMessage(err instanceof Error ? err.message : "Verification failed.");
      });
  }, [token]);

  return (
    <div className="bg-[url('/images/bg_blue.jpg')] bg-no-repeat bg-cover bg-center min-h-screen flex sm:items-center items-start justify-center px-4 py-[50px] sm:py-4">
      <Card className="md:d-block md:bg-[url('/images/bg_auth_center.png')] py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
        <CardContent className="flex items-center flex-col gap-3 sm:p-10 px-3 text-left">
          <div className="text-left text-white w-full md:hidden">
            <Link href="/auth/signup">
              <ChevronLeft />
            </Link>
          </div>

          {status === "loading" && (
            <>
              <h1 className="text-[24px] font-serif text-white font-normal text-left w-full">
                Verifying your email
              </h1>
              <p className="text-base text-gray-300 text-left w-full flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin shrink-0" />
                Please wait...
              </p>
            </>
          )}

          {status === "verified" && (
            <>
              <h1 className="text-[24px] font-serif text-white font-normal text-left w-full">
                Email verified
              </h1>
              <p className="text-base text-gray-300 text-left w-full flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                Your email has been verified. Create a password to finish signing up.
              </p>
              <div className="mt-6 w-full">
                <Link
                  href={
                    verifiedEmail
                      ? `/auth/createpassword?email=${encodeURIComponent(verifiedEmail)}`
                      : "/auth/createpassword"
                  }
                  className="block w-full"
                >
                  <Button
                    type="button"
                    className="cursor-pointer w-full text-base h-[52px] rounded-[12px] md:rounded-[8px] bg-gradient-to-r from-[#c58b00] via-[#f5d76e] to-[#c58b00] text-[#913C01] font-semibold hover:opacity-90 transition"
                  >
                    Create password
                  </Button>
                </Link>
              </div>
            </>
          )}

          {status === "error" && (
            <>
              <h1 className="text-[24px] font-serif text-white font-normal text-left w-full">
                Verification failed
              </h1>
              <p className="text-base text-gray-300 text-left w-full flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
                {errorMessage}
              </p>
              <p className="text-sm text-gray-400 text-left w-full mt-2">
                The link may be invalid or expired. Try signing up again or use the latest link from your email.
              </p>
              <div className="mt-6 flex flex-col gap-3 w-full">
                <Link href="/auth/signup" className="w-full">
                  <Button
                    type="button"
                    variant="outline"
                    className="cursor-pointer w-full text-base h-[52px] rounded-[12px] md:rounded-[8px] border-white/30 text-white hover:bg-white/10"
                  >
                    Back to sign up
                  </Button>
                </Link>
              </div>
            </>
          )}

          {status === "idle" && (
            <p className="text-white">Loading...</p>
          )}
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
