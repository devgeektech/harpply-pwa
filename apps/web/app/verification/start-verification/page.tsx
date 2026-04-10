"use client";

import ConfirmSelfie from "@/icons/confirmselfie";
import PrivacySecurity from "@/icons/privacysecurity";
import ReviewProcess from "@/icons/reviewprocess";
import UploadId from "@/icons/uploadid";
import { Card, CardContent } from "@repo/ui";
import {
  ArrowLeft,
  ShieldCheck,
  ArrowRight,
  ArrowRightIcon,
} from "lucide-react";
import Link from "next/link";

export default function StartVerification() {
  const verificationSteps = [
    {
      title: "Upload ID",
      description: "Government-issued document (Passport or License)",
      icon: UploadId,
    },
    {
      title: "Confirm selfie",
      description: "Live facial recognition for authenticity",
      icon: ConfirmSelfie,
    },
    {
      title: "Review process",
      description: "Estimated 2–5 minutes for approval",
      icon: ReviewProcess,
    },
  ];

  return (
    <>
      <style jsx global>{`
        .verticle-line::before {
          content: "";
          position: absolute;
          width: 1px;
          height: 100%;
          background: #fff;
          top: 64%;
          z-index: -1;
        }

        /* hide line for LAST STEP */
        .space-y-7 > div:last-child .verticle-line::before {
          display: none;
        }
      `}</style>
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[620px] sm:px-4 py-6">
          <Card className="pt-0 w-full bg-transparent md:bg-[url('/images/bg_auth_center.png')] bg-cover bg-center backdrop-blur-xl border-0 md:border md:border-[#C8A851]/18 rounded-2xl shadow-2xl">
            <div className="p-4 sm:p-6 !pb-3 flex items-center">
              <Link href="/setting">
                <ArrowLeft className="text-white cursor-pointer" />
              </Link>
            </div>

            <div className="px-4 sm:px-6 pb-6">
              <div className="flex justify-center mt-2 mb-5">
                <div className="w-[64px] h-[64px] rounded-full bg-[#F2EEE5] flex items-center justify-center shadow-md">
                  <ShieldCheck className="text-[#C39936]" size={30} />
                </div>
              </div>

              <CardContent className="p-0 space-y-6">
                <div className="text-center">
                  <h2 className="text-white text-[20px] md:text-[24px] font-semibold">
                    Secure Identity Check
                  </h2>

                  <p className="text-white/80 text-sm mt-2 md:px-6 leading-relaxed">
                    To ensure the safety of our community, please complete a
                    quick identity verification.
                  </p>
                </div>

                <div className="space-y-7 md:px-5">
                  {verificationSteps.map((step, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 relative"
                    >
                      <div className="min-w-[40px] w-[40px] h-[40px] flex items-center justify-center rounded-full bg-[#EEE7D4] verticle-line">
                        <step.icon color="#C39936" size={18} />
                      </div>

                      <div className="flex-1">
                        <p className="text-white text-base font-medium">
                          {step.title}
                        </p>
                        <p className="text-white/80 text-sm">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl border-[#C8A851]/18 bg-[linear-gradient(180deg,rgba(167,139,218,0.22)_0%,rgba(55,35,95,0.65)_100%)] p-4 flex justify-center">
                  <div className="flex items-start gap-3 sm:max-w-[300px]">
                    <span className="pt-1">
                      <PrivacySecurity />
                    </span>
                    <div className="flex-1">
                      <h6 className="text-white">Privacy & Security</h6>
                      <p className="text-white/80 text-xs leading-relaxed">
                        Your data is encrypted and securely processed. We never
                        share your personal documents.
                      </p>
                      <Link
                        href="#"
                        className="inline-flex items-center gap-1 text-[#C39936] text-xs mt-2 hover:underline"
                      >
                        LEARN MORE
                        <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>

                <button className="cursor-pointer w-full text-base h-[52px] rounded-[12px] md:rounded-[8px] bg-[linear-gradient(90deg,#964400_0%,#F3D35D_25%,#F3D35D_50%,#8C4202_100%)] text-[#913C01] font-semibold hover:opacity-90 transition flex items-center justify-center gap-2">
                  Begin Secure Verification
                  <ArrowRightIcon size={18} />
                </button>

                <div className="pt-2">
                  <p className="text-center text-[14px] text-white leading-[1.4] px-4">
                    By continuing, you agree to our Verification Terms and
                    Privacy Policy.
                  </p>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
