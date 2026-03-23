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
  const [selected, setSelected] = useState<string>("Catholic")

  return (
    <div className="flex sm:items-center items-start justify-center sm:px-4 px-0 pb-[50px] md:py-[50px] sm:py-4 w-full">
      <Card className="md:d-block md:bg-[url('/images/bg_auth_center.png')] py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
        <CardContent className="flex items-center flex-col gap-2 sm:p-10 sm:px-3 px-0 text-left">
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


                  {/* Options */}
        <div className="space-y-4 w-full">
          {options.map((item) => {
            const active = selected === item

            return (
              <button
                key={item}
                onClick={() => setSelected(item)}
                className={`cursor-pointer relative w-full text-base font-normal flex items-center justify-between px-4 py-4 rounded-xl transition border
                ${
                  active
                    ? "border-[#C8A851] border-[2px] bg-white text-black"
                    : "border-white/10 border-[2px] bg-white/90 text-black"
                }`}
              >
                <input type="radio" name="denomination" id={item} className="absolute opacity-0" />
                <span className="text-[#3B3B3B]">{item}</span>

                <div
                  className={`flex items-center justify-center w-5 h-5 rounded-full border
                  ${
                    active
                      ? "bg-[linear-gradient(90deg,#964400_0%,#F3D35D_25%,#F3D35D_50%,#8C4202_100%)] border-[#C8A851]"
                      : "border-gray-400"
                  }`}
                >
                  {active && <Check className="w-3 h-3 text-[#913C01]" />}
                </div>
              </button>
            )
          })}
        </div>

          {/* Continue Button */}
          <Button
            onClick={handleSubmit}
            className="cursor-pointer mt-[1rem] w-full text-base h-[52px] rounded-[12px] md:rounded-[8px] bg-[linear-gradient(90deg,#964400_0%,#F3D35D_25%,#F3D35D_50%,#8C4202_100%)] text-[#913C01] font-semibold hover:opacity-90 transition"
          >
            {loading ? "Submitting..." : "Continue"}
          </Button>
          <p className="text-white max-w-[300px] text-center mx-auto text-sm font-light w-full">Your answer are reflective of your current spiritual journey.</p>
        </CardContent>
      </Card>
    </div>
  );
}
