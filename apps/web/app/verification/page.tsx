"use client";

import Image from "next/image";
import { Button, Card, CardContent } from "@repo/ui";
import { ArrowLeft, Check, Lock } from "lucide-react";
import Link from "next/link";
import VerifyIcon from "@/icons/verifyicon";

type FeatureItem = {
  title: string;
  description: string;
};

export default function VerificationPage() {
  // 🔹 Props / Dynamic Data
  const features: FeatureItem[] = [
    {
      title: "Identity confirmation",
      description: "Ensure your profile is authentic",
    },
    {
      title: "Increased visibility",
      description: "Stand out in searches and community feeds",
    },
    {
      title: "Trust badge on profile",
      description: "Signal credibility to the entire community",
    },
  ];

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[620px] sm:px-4 py-6">
        <Card className="pt-0 w-full bg-transparent md:bg-[url('/images/bg_auth_center.png')] bg-cover bg-center backdrop-blur-xl gap-3 border-0 md:border md:border-[#C8A851]/18 rounded-2xl shadow-2xl">
          {/* Header */}
          <div className="p-4 sm:p-6 !pb-3 flex items-center justify-between gap-3">
            <Link href="/setting">
              <ArrowLeft className="text-white cursor-pointer" />
            </Link>
          </div>

          {/* Image */}
          <div className="px-4 sm:px-6">
            <div className="overflow-hidden relative">
              <Image
                src="/images/verify.webp"
                alt="Verification"
                width={600}
                height={300}
                className="w-full h-auto object-cover"
              />
              <span className="absolute bottom-[15px] left-[15px]">
                <VerifyIcon />
              </span>
            </div>
          </div>

          {/* Content */}
          <CardContent className="p-4 sm:p-6 pt-4 space-y-5">
            {/* Title */}
            <div>
              <h2 className="text-white text-[18px] md:text-[24px] font-medium">
                Become Faith-Verified
              </h2>

              <p className="text-white/80 text-sm mt-2">
                Verification helps maintain a safe and trusted Christian
                community. Join thousands of verified members in building a
                secure space.
              </p>
            </div>

            {/* 🔹 Dynamic Feature List */}
            <div className="space-y-4">
              {features.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  {/* Icon */}
                  <div className="min-w-[28px] h-[28px] flex items-center justify-center rounded-full bg-white text-[#C39936]">
                    <Check size={16} />
                  </div>

                  {/* Text */}
                  <div>
                    <p className="text-white text-sm font-medium">
                      {item.title}
                    </p>
                    <p className="text-white/70 text-xs">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 🔹 Button */}
            <Button
              type="submit"
              className="cursor-pointer w-full text-base h-[52px] rounded-[12px] md:rounded-[8px] bg-[linear-gradient(90deg,#964400_0%,#F3D35D_25%,#F3D35D_50%,#8C4202_100%)] text-[#913C01] font-semibold hover:opacity-90 transition disabled:opacity-60"
            >
              Start Verification
            </Button>

            {/* 🔹 Learn More */}
            <p className="text-center font-bold">
              <Link
                href="#"
                className="text-center text-[#913C01] text-base cursor-pointer"
              >
                Learn More
              </Link>
            </p>

            {/* 🔹 Security Text */}
            <div className="flex items-center justify-center gap-2 text-xs text-[#C39936]">
              <Lock size={14} />
              <span className="leading-[1.2]">
                YOUR DATA IS SECURE AND ENCRYPTED
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
