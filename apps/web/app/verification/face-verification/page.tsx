"use client";

import { Card, CardContent } from "@repo/ui";
import { ArrowLeft, Camera, Lock } from "lucide-react";
import Link from "next/link";

export default function FaceVerificationPage() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[620px] sm:px-4 py-6">
        <Card className="pt-0 w-full bg-transparent bg-[#110728] border-0 md:border md:border-[#C8A851]/18 rounded-2xl shadow-2xl">
          {/* HEADER */}
          <div className="p-4 sm:p-6 !pb-3 flex items-center">
            <Link href="/verification/document-upload">
              <ArrowLeft className="text-white cursor-pointer" />
            </Link>
          </div>

          {/* CONTENT */}
          <div className="px-4 sm:px-6 pb-6">
            <CardContent className="p-0 space-y-6">
              <div className="text-center space-y-3">
                <h2 className="text-white text-[20px] md:text-[24px] font-semibold">
                  Confirm Your Identity
                </h2>
                <p className="text-white/80 text-sm">
                  Position your face within the frame and look directly at the
                  camera.
                </p>
                <p className="text-white/60 text-xs">
                  Make sure you are in a well-lit environment.
                </p>
              </div>
              {/* Camera Box */}
              <div>
                <div className="w-full rounded-lg flex flex-col items-center justify-center py-10">
                  {/* Face Frame */}
                  <div className="w-[180px] h-[180px] border-2 border-dashed border-[#ECE2C6]/50 rounded-[100px] flex items-center justify-center">
                    <span className="flex justify-between items-center bg-[#F2EEE5] rounded-full w-[50px] h-[50px]">
                      <Camera className="text-[#C39936] mx-auto" size={20} />
                    </span>
                  </div>
                </div>
              </div>

              {/* Capture Button */}
              <button className="w-full h-[48px] rounded-[10px] bg-[linear-gradient(90deg,#964400_0%,#F3D35D_40%,#F3D35D_60%,#8C4202_100%)] text-[#913C01] font-semibold hover:opacity-90 transition cursor-pointer">
                Capture
              </button>

              {/* Secure Footer */}
              <div className="flex items-center justify-center gap-2 pt-2 text-[#C39936]">
                <Lock size={14} className="" />
                <span className="text-sm tracking-wide">
                  SECURE BIOMETRIC VERIFICATION
                </span>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
}
