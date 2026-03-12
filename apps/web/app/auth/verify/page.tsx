"use client";

import { Button, Card, CardContent } from "@repo/ui";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo, useEffect } from "react";
import { useSignupStore } from "store/useSignupStore";

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

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const emailFromUrl = searchParams.get("email") ?? "";
  const { email: emailFromStore, setEmail } = useSignupStore();
  const email = emailFromStore || emailFromUrl;

  useEffect(() => {
    if (emailFromUrl) setEmail(emailFromUrl);
  }, [emailFromUrl, setEmail]);

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

          <div className="mt-6 flex flex-col items-center gap-4 w-full">
            <Link
              href="#"
              className="text-yellow-400 font-medium underline hover:opacity-90"
            >
              Resend
            </Link>

            <Link href={createPasswordUrl} className="w-full">
              <Button
                type="button"
                className="cursor-pointer w-full text-base h-[52px] rounded-[12px] md:rounded-[8px] bg-gradient-to-r from-[#c58b00] via-[#f5d76e] to-[#c58b00] text-[#913C01] font-semibold hover:opacity-90 transition"
              >
                Create password
              </Button>
            </Link>
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
