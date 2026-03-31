"use client";

import { useState } from "react";
import { useOnboardingStore } from "@/store/onboardingStore";
import { Button, Card, CardContent, Input, Progress } from "@repo/ui";
import Link from "next/link";
import { ChevronLeft, Check } from "lucide-react";
import { useRouter } from "next/navigation";




const options = [
  "Catholic",
  "Baptist",
  "Methodist",
  "Pentecostal",
  "Evangelical",
  "Non-Denominational",
  "Seventh-day Adventist",
  "Reformed",
  "Anglican",
  "Other",
]

export default function Review() {

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
  const [selected, setSelected] = useState<string>("Catholic")

  return (
    <div className="min-h-screen pb-[50px] sm:pb-0 w-full bg-gradient-to-b from-[#140034] to-[#01010D] flex items-center justify-center px-4">

      <Card className="md:d-block md:bg-[url('/images/bg_auth_center.png')] py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
        <CardContent className="flex flex-col gap-2 sm:p-10 sm:px-6 px-0 text-left">

          {/* Back */}
          <div className="mb-2">
            <ChevronLeft className="text-white/70 cursor-pointer" />
          </div>

          {/* Image */}
          <div className="rounded-xl overflow-hidden mb-4 relative">
            <img
              src="/images/finalstep.jpg"
              alt="review"
              className="w-full h-[185px] object-cover rounded-[12px]"
            />
             <span className="text-xs bg-[#C8A851] text-white px-3 py-1 rounded absolute bottom-[17px] left-[21px] z-10">
            FINAL STEP
          </span>
          </div>

          {/* Final Step */}
         

          {/* Description */}
          <p className="text-sm text-white mt-3 mb-6">
            Please review your responses below. These traits help us find the most compatible matches based on your personality.
          </p>
          <div className="my-2">
            <img src="/images/jesusicon.svg" alt="review" className=" w-[30px] h-[30px]" />
          </div>
          {/* Denomination */}
          <div className="bg-white rounded-[12px] px-4 py-3 mb-5 flex justify-between items-center">
            <div>
              <p className="text-sm text-[#1A1A1A]">Your Denomination</p>
              <p className="text-base font-medium text-[#1A1A1A]">Catholic</p>
            </div>

            <span className="text-yellow-500"><img src="/images/tickstyle.png" alt="review" className="" /></span>
          </div>

          {/* Traits */}
          <div className="mb-12">
            <h4 className="text-[#C39936] text-base font-normal mb-3 flex items-center gap-2">
              <img src="/images/hearticon.svg" alt="hearticon" className=" w-[20px] h-[20px]" /> Desired Partner Traits
            </h4>

            <div className="bg-white rounded-lg p-4 text-sm text-gray-700 space-y-2">
              <p className="font-medium text-base text-[#1A1A1A] mb-2">Top Priorities</p>

              <ul className="space-y-4">
                <li className="flex items-center gap-2 text-[1rem] text-[#1A1A1A]"><img src="/images/tickcircle.svg" alt="tickcircle" className=" w-[16px] h-[16px]" /> Stand boldly and confront it</li>
                <li className="flex items-center gap-2 text-[1rem] text-[#1A1A1A]"><img src="/images/tickcircle.svg" alt="tickcircle" className=" w-[16px] h-[16px]" /> Spiritual Leadership</li>
                <li className="flex items-center gap-2 text-[1rem] text-[#1A1A1A]"><img src="/images/tickcircle.svg" alt="tickcircle" className=" w-[16px] h-[16px]" /> Loyalty</li>
                <li className="flex items-center gap-2 text-[1rem] text-[#1A1A1A]"><img src="/images/tickcircle.svg" alt="tickcircle" className=" w-[16px] h-[16px]" /> Wisdom</li>
                <li className="flex items-center gap-2 text-[1rem] text-[#1A1A1A]"><img src="/images/tickcircle.svg" alt="tickcircle" className=" w-[16px] h-[16px]" /> Servant Heart</li>
              </ul>
            </div>
          </div>

          {/* Submit */}
          <Button className="w-full h-[52px] text-base rounded-[12px] md:rounded-[8px] bg-[linear-gradient(90deg,#964400_0%,#F3D35D_25%,#F3D35D_50%,#8C4202_100%)] text-[#913C01] font-medium hover:opacity-90">
            Submit
          </Button>

          {/* Edit */}
          <button className="text-center text-base font-medium text-[#913C01] mt-3 cursor-pointer">
            Edit Answers
          </button>

        </CardContent>
      </Card>

    </div>
  );
}
