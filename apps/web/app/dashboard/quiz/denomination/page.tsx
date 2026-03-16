"use client";

import { useOnboardingStore } from "@/store/onboardingStore";
import { Button, Card, CardContent, Input, Progress } from "@repo/ui";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function Denomination() {

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    name,
    age,
    gender,
    setName,
    setAge,
    setGender,
    submitIdentity,
  } = useOnboardingStore();

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await submitIdentity();

      router.push("/auth/onboarding/location"); // next step
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex sm:items-center items-start justify-center px-4 py-[50px] sm:py-4">
      <Card className="md:d-block md:bg-[url('/images/bg_auth_center.png')] py-0 bg-no-repeat bg-cover bg-center w-full min-w-[620px] max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
        <CardContent className="flex items-center flex-col gap-2 sm:p-10 px-3 text-left">
          <div className="text-left text-white w-full">
            <Link href="/">
              <ChevronLeft size={24} />
            </Link>
          </div>
          {/* Progress */}
          <div className="mb-6 w-full">
            <p className="text-sm text-gray-300 mb-2">Step 2 of 10</p>
            <Progress value={20} />
          </div>

          {/* Title */}
          <h1 className="text-[24px] font-light font-serif text-white mb-2 w-full">
          Choose your denomination
          </h1>

          {/* Name */}
          <div className="mb-4 w-full">
            <label className="text-white font-normal text-sm">Full Name</label>
            <Input
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 bg-white border-[#FBFAF9] h-[52px] border border-[#E7ECF2] rounded-[12px] md:rounded-[8px] text-[#3B3B3B] placeholder:text-[#3B3B3B] focus-visible:ring-0"
            />
          </div>



          {/* Continue Button */}
          <Button
            onClick={handleSubmit}
            disabled={!name || !age || !gender || loading}
            className="cursor-pointer w-full text-base h-[52px] rounded-[12px] md:rounded-[8px] bg-[linear-gradient(90deg,#964400_0%,#F3D35D_25%,#F3D35D_50%,#8C4202_100%)] text-[#913C01] font-semibold hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Continue"}
          </Button>
          <p className="text-white max-w-[300px] text-center mx-auto text-sm font-light w-full">Your answer are reflective of your current spiritual journey.</p>
        </CardContent>
      </Card>
    </div>
  );
}
