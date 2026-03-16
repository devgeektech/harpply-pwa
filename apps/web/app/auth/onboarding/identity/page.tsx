"use client";

import { useOnboardingStore } from "@/store/onboardingStore";
import { Button, Card, CardContent, Input, Progress } from "@repo/ui";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function Identity() {

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
    <div className="bg-[url('/images/bg_blue.jpg')] bg-no-repeat bg-cover bg-center min-h-screen flex  sm:items-center items-start justify-center px-4 py-[50px] sm:py-4">
      <Card className="md:d-block md:bg-[url('/images/bg_auth_center.png')] py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
        <CardContent className="flex items-center flex-col gap-2 sm:p-10 px-3 text-left">
          <div className="text-left text-white w-full">
            <Link href="/">
              <ChevronLeft size={24} />
            </Link>
          </div>
          {/* Progress */}
          <div className="mb-6 w-full">
            <p className="text-sm text-gray-300 mb-2">Step 1 of 5</p>
            <Progress value={20} />
          </div>

          {/* Title */}
          <h1 className="text-[24px] font-light font-serif text-white mb-2 w-full">
            Tell us about you
          </h1>

          <p className="text-white mb-6 font-light w-full">
            We'd love to get to know you better to personalize your journey.
          </p>

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

          {/* Age */}
          <div className="mb-4 w-full">
            <label className="text-white font-normal text-sm">Age</label>
            <Input
              type="number"
              placeholder="How old are you?"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="mt-2 bg-white border-[#FBFAF9] h-[52px] border border-[#E7ECF2] rounded-[12px] md:rounded-[8px] text-[#3B3B3B] placeholder:text-[#3B3B3B] focus-visible:ring-0"
            />
          </div>

          {/* Gender */}
          <div className="mb-6 w-full">
            <label className="text-white font-normal text-sm">Gender</label>
            <div className="border border-[#E7ECF214] sm:bg-transparent bg-white sm:rounded-[12px] rounded-[8px] p-2 sm:p-4 w-full mt-3">
              <div className="flex gap-3">
                {["Male", "Female", "Other"].map((g) => (
                  <button
                    type="button"
                    key={g}
                    onClick={() => setGender(g)}
                    className={`flex-1 rounded-full sm:rounded-lg py-2 text-base font-medium border transition cursor-pointer ${gender === g
                      ? "bg-white text-[#C39936] border-[#C39936]"
                      : "bg-white text-black border-white/20"
                      }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <Button
            onClick={handleSubmit}
            disabled={!name || !age || !gender || loading}
            className="cursor-pointer w-full text-base h-[52px] rounded-[12px] md:rounded-[8px] bg-[linear-gradient(90deg,#964400_0%,#F3D35D_25%,#F3D35D_50%,#8C4202_100%)] text-[#913C01] font-semibold hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Continue"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
