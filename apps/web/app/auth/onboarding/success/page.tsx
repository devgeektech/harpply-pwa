"use client";

import { Button, Card, CardContent } from "@repo/ui";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

export default function OnboardingSuccessPage() {
  const router = useRouter();

  return (
    <div className="bg-[url('/images/bg_blue.jpg')] bg-no-repeat bg-cover bg-center min-h-screen flex sm:items-center items-start justify-center px-4 py-[50px] sm:py-4">
      <Card className="md:d-block md:bg-[url('/images/bg_auth_center.png')] py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
        <CardContent className="flex flex-col md:gap-6 gap-3 sm:p-6 px-3 text-white">
          <div className="flex justify-center">
            <div className="w-[100px] h-[100px] rounded-full bg-[#F3EBDD] flex items-center justify-center">
              <div className="w-14 h-14 bg-[#C3993633] rounded-full flex items-center justify-center">
                <ShieldCheck className="text-[#C39936] w-8 h-8" />
              </div>
            </div>
          </div>

          <h1 className="text-white text-[24px] font-serif font-normal text-center">
            You&apos;re all set
          </h1>

          <p className="text-white text-base font-light leading-relaxed mb-1 text-center">
            Your onboarding is complete. We’ll use what you’ve shared—your faith, lifestyle, and everyday preferences—to help you connect with people who align with your values.
          </p>
          <p className="text-white/85 text-sm font-light leading-relaxed mb-4 text-center">
            Start exploring Harpply and connect whenever you're ready.
          </p>

          <Button
            type="button"
            onClick={() => router.push("/dashboard/quiz/introduction")}
            className="cursor-pointer w-full text-base h-[52px] mt-[12px] rounded-[12px] md:rounded-[8px] bg-gradient-to-r from-[#c58b00] via-[#f5d76e] to-[#c58b00] text-[#913C01] font-semibold hover:opacity-90 transition disabled:opacity-60 inline-flex items-center justify-center gap-2"
          >
            Start discovering
            <ArrowRight size={16} aria-hidden />
          </Button>

          <p className="text-white text-sm uppercase text-center tracking-wide">
            Welcome to Harpply
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
