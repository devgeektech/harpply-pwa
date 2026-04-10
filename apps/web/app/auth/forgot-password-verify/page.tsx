"use client";

import { Suspense } from "react";
import { Button, Card, CardContent } from "@repo/ui";
import Link from "next/link";
import { ChevronLeft, Mail } from "lucide-react";
import { useSearchParams } from "next/navigation";

function ForgotPasswordVerifyContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";

  return (
    <Card className="md:d-block md:bg-[url('/images/bg_auth_center.png')] py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
      <CardContent className="flex items-center flex-col gap-6 sm:p-10 px-3 text-left">
        <div className="text-left text-white w-full md:hidden">
          <Link href="/auth/forgotpassword">
            <ChevronLeft />
          </Link>
        </div>

        <div className="w-full flex justify-center">
          <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center">
            <Mail className="w-7 h-7 text-green-400" />
          </div>
        </div>

        <h1 className="text-[24px] font-serif font-normal text-white text-center w-full">
          Check your email
        </h1>

        <p className="text-base text-gray-300 text-center w-full">
          If an account exists with{" "}
          {email ? (
            <span className="text-white font-medium">{email}</span>
          ) : (
            "this email"
          )}
          , we sent a link to set a new password. Click the link in the
          email to continue.
        </p>

        <p className="text-sm text-gray-400 text-center w-full">
          The link expires in 1 hour. If you don&apos;t see the email, check
          your spam folder or try again.
        </p>

        {/* <div className="flex flex-col gap-3 w-full mt-2">
            <Link href="/auth/signin" className="w-full">
              <Button
                type="button"
                className="cursor-pointer w-full text-base h-[52px] rounded-[12px] md:rounded-[8px] bg-gradient-to-r from-[#c58b00] via-[#f5d76e] to-[#c58b00] text-[#913C01] font-semibold hover:opacity-90 transition"
              >
                Back to sign in
              </Button>
            </Link>
            <Link href="/auth/forgotpassword" className="w-full">
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer w-full text-base h-[52px] rounded-[12px] md:rounded-[8px] border-white/30 text-white hover:bg-white/10"
              >
                Use a different email
              </Button>
            </Link>
          </div> */}
      </CardContent>
    </Card>
  );
}

export default function ForgotPasswordVerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-[url('/images/bg_blue.jpg')] bg-no-repeat bg-cover bg-center min-h-screen flex sm:items-center items-start justify-center px-4 py-[50px] sm:py-4">
          <Card className="md:d-block md:bg-[url('/images/bg_auth_center.png')] py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
            <CardContent className="flex items-center flex-col gap-3 sm:p-10 px-3 text-left">
              <p className="text-white">Loading...</p>
            </CardContent>
          </Card>
        </div>
      }
    >
      <ForgotPasswordVerifyContent />
    </Suspense>
  );
}
