"use client";


import { faithValues } from "@/app/constants/faithValues";
import { ValueTag } from "@/components/common/value-tag";
import { useFaithStore } from "@/store/faithStore";
import { Button, Card, CardContent } from "@repo/ui";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function FaithValuesPage() {
  const {
    myValues,
    partnerValues,
    toggleMyValue,
    togglePartnerValue,
  } = useFaithStore();

  return (
    <div className="bg-[url('/images/bg_blue.jpg')] bg-no-repeat bg-cover bg-center min-h-screen flex  sm:items-center items-start justify-center px-4 py-[50px] sm:py-4">
      <Card className="md:d-block md:bg-[url('/images/bg_auth_center.png')] py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
        <CardContent className="flex flex-col md:gap-6 gap-3 sm:p-6 px-3 text-white">
        <div className="flex items-center px-0 pb-2 w-full">
        <Link
          href="/profile"
          className="flex items-center justify-center size-10 rounded-full text-white/90 hover:bg-white/10 transition-colors"
          aria-label="Back"
        >
          <ChevronLeft className="size-6" />
        </Link>
      </div>
        {/* Header */}
        <div className="flex items-center gap-2 text-white">
          <h1 className="text-[24px] font-normal font-serif">Faith Values</h1>
        </div>

        {/* My Faith Values */}
        <div className="mb-6">
          <h2 className="text-white text-[20px] font-light mb-3">My Faith Values</h2>

          <div className="flex flex-wrap gap-3 bg-[#FBFAF914] border border-[#E7ECF214] rounded-[8px] px-[10px] py-[18px]">
            {faithValues.map((value) => (
              <ValueTag
                key={value}
                label={value}
                active={myValues.includes(value)}
                onClick={() => toggleMyValue(value)}
              />
            ))}
          </div>
        </div>

        {/* Partner Values */}
        <div className="mb-6">
          <h2 className="text-white text-sm mb-3">Partner Values</h2>

          <div className="flex flex-wrap gap-3 bg-[#FBFAF914] border border-[#E7ECF214] rounded-[8px] px-[10px] py-[18px]">
            {faithValues.map((value) => (
              <ValueTag
                key={value}
                label={value}
                active={partnerValues.includes(value)}
                onClick={() => togglePartnerValue(value)}
              />
            ))}
          </div>
        </div>

        {/* Next Button */}
        <Button className="w-full bg-[linear-gradient(90deg,#964400_0%,#F3D35D_25%,#F3D35D_50%,#8C4202_100%)] text-[#913C01] font-semibold rounded-[10px] h-[52px]">
          Next
        </Button>
        </CardContent>
      </Card>
    </div>
  );
}