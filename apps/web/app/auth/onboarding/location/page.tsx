"use client";

import Image from "next/image";
import { useOnboardingStore } from "@/store/onboardingStore";
import { Button, Card, CardContent, Input, Progress } from "@repo/ui";

export default function Location() {
  const { name, age, gender, setName, setAge, setGender } =
    useOnboardingStore();

  return (
    <div className="bg-[url('/images/bg_blue.jpg')] bg-no-repeat bg-cover bg-center min-h-screen flex  sm:items-center items-start justify-center px-4 py-[50px] sm:py-4">
      <Card className="md:d-block md:bg-[url('/images/bg_auth_center.png')] py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
        <CardContent className="flex items-center flex-col gap-2 sm:p-10 px-3 text-center">
          {/* Progress */}
          <div className="mb-6 w-full">
            <p className="text-sm text-gray-300 mb-2 text-left">Step 2 of 5</p>
            <Progress value={20} />
          </div>

          <div className="container-fluid">
            <div className="pulse-wrapper">
              <div className="pulse pulse1"></div>
              <div className="pulse pulse2"></div>
              <div className="pulse pulse3"></div>

              <div className="center-dot">
                <Image
                  width={45}
                  height={45}
                  src="/images/locationMap.png"
                  alt="locationMap.png"
                />
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-[24px] font-light font-serif text-white mb-2 w-full">
            Enable Location
          </h1>

          <p className="text-white mb-6 font-light w-full">
            We use your approximate location to suggest meaningful connections
            within your community.
          </p>

          {/* Continue Button */}
          <Button className="cursor-pointer w-full text-base h-[52px] rounded-[12px] md:rounded-[8px] bg-[linear-gradient(90deg,#964400_0%,#F3D35D_25%,#F3D35D_50%,#8C4202_100%)] text-[#913C01] font-semibold hover:opacity-90 transition disabled:opacity-60">
            Enable Location
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
