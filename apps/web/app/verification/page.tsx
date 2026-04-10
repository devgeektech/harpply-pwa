"use client";

import Link from "next/link";
import { Card, CardContent } from "@repo/ui";
import { ArrowLeft } from "lucide-react";

export default function VerificationPage() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[620px] sm:px-4 py-6">
        <Card className="pt-0 w-full bg-transparent md:bg-[url('/images/bg_auth_center.png')] bg-cover bg-center backdrop-blur-xl gap-3 border border-[#C8A851]/18 rounded-2xl shadow-2xl">
          {/* Header */}
          <div className="p-4 sm:p-6 !pb-3 flex items-center justify-between gap-3">
            <Link href="/setting">
              <ArrowLeft className="text-white cursor-pointer" />
            </Link>
            <h2 className="text-white text-xl font-normal">Verification</h2>
          </div>

          {/* Description */}
          <p className="text-white p-4 sm:px-6">
            For security reasons, verification may be required in certain
            scenarios. This helps improve connection reliability and ensures
            safe access during critical situations.
          </p>

          {/* Content */}
          <CardContent className="p-4 sm:p-6 !pt-2">
            <div className="border border-[#C8A851]/18 rounded-[12px] md:rounded-[10px] p-4 bg-[linear-gradient(160deg,rgba(200,168,81,0.10)_0%,rgba(35,22,58,0.85)_45%,rgba(18,10,35,0.92)_100%)]">
              <h3 className="text-white text-base font-medium">
                Verification Required
              </h3>

              <p className="text-white/60 text-sm mt-2 leading-relaxed">
                Verification may be requested depending on your activity to
                ensure account safety and uninterrupted service access.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
