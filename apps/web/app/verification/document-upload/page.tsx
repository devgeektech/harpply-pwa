"use client";

import UploadId from "@/icons/uploadid";
import { Card, CardContent } from "@repo/ui";
import {
  ArrowLeft,
  Lock,
  Paperclip,
  ShieldCheck,
  UploadCloudIcon,
} from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

export default function DocumentUploadPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[620px] sm:px-4 py-6">
        <Card className="pt-0 w-full bg-transparent md:bg-[url('/images/bg_auth_center.png')] bg-cover bg-center backdrop-blur-xl border-0 md:border md:border-[#C8A851]/18 rounded-2xl shadow-2xl">
          {/* HEADER */}
          <div className="p-4 sm:p-6 !pb-3 flex items-center">
            <Link href="/verification/start-verification">
              <ArrowLeft className="text-white cursor-pointer" />
            </Link>
          </div>

          <div className="flex flex-col justify-center mb-5 px-4 sm:px-6 pb-6">
            <div className="w-[64px] h-[64px] mx-auto mt-2 mb-5 rounded-full bg-[#F2EEE5] flex items-center justify-center shadow-md">
              <UploadId color="#C39936" size={30} />
            </div>

            <h2 className="text-white text-center text-[20px] md:text-[24px] font-semibold">
              Upload Your Identification
            </h2>

            <p className="text-white/80 text-center text-sm mt-2 md:px-6 leading-relaxed">
              Please provide a clear photo of your document to verify your
              identity. This helps us keep Harpply secure.
            </p>
          </div>

          {/* CONTENT */}
          <div className="px-4 sm:px-6 pb-6">
            <CardContent className="p-0 space-y-6">
              {/* Upload Box (Main Area) */}
              <div className="rounded-xl border border-white/10 bg-[linear-gradient(180deg,rgba(25,16,53,0.9)_0%,rgba(15,10,35,0.95)_100%)] p-5 shadow-inner">
                {/* Upload Placeholder */}
                <div
                  onClick={handleClick}
                  className="w-full px-4 py-8 rounded-lg border border-dashed border-[#ECE2C6]/50 bg-[#0F042B] flex flex-col items-center justify-center text-white/50 text-sm transition"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={handleFileChange}
                  />

                  {fileName ? (
                    <p className="text-white text-sm">{fileName}</p>
                  ) : (
                    <>
                      <span className="min-w-[50] min-h-[50] bg-[#F5F2E8] rounded-full flex justify-center items-center mb-3">
                        <UploadCloudIcon className="text-[#C39936]" size={20} />
                      </span>

                      <h2 className="text-white text-center text-[20px] md:text-[24px] font-semibold mb-3">
                        Tap to upload
                      </h2>

                      <p className="text-white/80">Accepted documents:</p>
                      <p className="text-white/80 mb-3">
                        Government-issued ID (Passport, Driver's License)
                      </p>

                      <button
                        className="flex gap-2 items-center bg-[#F5F2E8] text-[#C39936] px-4 py-2 rounded-md text-sm font-medium  transition cursor-pointer"
                        type="button"
                      >
                        <Paperclip size={14} />
                        Select File
                      </button>
                    </>
                  )}
                </div>

                {/* Secure SSL Bar */}
                <div className="mt-5 border-t border-[#F5F1E2]/10 px-1 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white text-sm">
                    <div className="flex gap-2">
                      <span className="flex justify-center items-center bg-white rounded-md min-w-[40px] min-h-[32px]">
                        <Lock size={18} className="text-[#C39936]" />
                      </span>
                      <span>
                        SECURE SSL<br></br>ENCRYPTION
                      </span>
                    </div>
                  </div>
                  <span className="text-[#008D57] text-sm font-medium flex items-center gap-2">
                    <ShieldCheck size={18} />
                    Secure
                  </span>
                </div>
              </div>
              {/* Continue Button */}
              <button
                className="mt-5 w-full h-[48px] rounded-[10px] bg-[linear-gradient(90deg,#964400_0%,#F3D35D_40%,#F3D35D_60%,#8C4202_100%)] text-[#913C01] font-semibold hover:opacity-90 transition cursor-pointer"
                type="button"
              >
                Continue →
              </button>

              <p className="text-center text-white text-sm mt-4">
                Having trouble?{" "}
                <span className="text-[#C39936] cursor-pointer hover:underline">
                  Contact support
                </span>
              </p>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
}
