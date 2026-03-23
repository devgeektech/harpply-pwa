"use client";

import Image from "next/image";
import { useBioStore } from "@/store/onboardingStore";
import {
  Button,
  Card,
  CardContent,
  Input,
  Label,
  Progress,
  Textarea,
} from "@repo/ui";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Bio() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [bioError, setBioError] = useState<string | null>(null);

  const { bio, setBio, submitBio } =
    useBioStore();

  const handleSubmit = async () => {
    try {
      setBioError(null);

      const trimmedBio = bio.trim();
      if (!trimmedBio) {
        setBioError("Please enter a valid bio");
        return;
      }

      setLoading(true);

      await submitBio();

      router.push("/auth/onboarding/faith"); // next step
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[url('/images/bg_blue.jpg')] bg-no-repeat bg-cover bg-center min-h-screen flex  sm:items-center items-start justify-center px-4 py-[50px] sm:py-4">
      <Card className="md:d-block md:bg-[url('/images/bg_auth_center.png')] py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
        <CardContent className="flex items-center flex-col gap-2 sm:p-10 px-3 text-center">
          <div className="text-left text-white w-full">
            <Link href="/auth/onboarding/location">
              {" "}
              <ChevronLeft size={24} />
            </Link>
          </div>
          {/* Progress */}
          <div className="mb-6 w-full">
            <p className="text-sm text-gray-300 mb-2 text-left">Step 3 of 5</p>
            <Progress value={60} />
          </div>

          {/* Title */}
          <h1 className="text-[24px] font-light font-serif text-white mb-2 w-full text-left">
            Share your story
          </h1>

          <p className="text-white mb-6 font-light w-full text-left">
            Describe your faith and journey in a few sentences. Your story helps
            the community connect with you more deeply.
          </p>

          <div className="grid w-full gap-2">
            <Label htmlFor="message" className="text-white font-normal text-sm">
              Short Bio
            </Label>
            <Textarea
              value={bio}
              maxLength={300}
              onChange={(e) => setBio(e.target.value)}
              id="message"
              className="bg-white resize-none h-[200px] text-sm text-[#3B3B3B] font-light 
                focus-visible:ring-0 focus-visible:ring-offset-0 focus:!border-[#F3D35D]"
              placeholder="I’m a believer who finds peace in..."
            />
            <p className="text-sm text-white font-light flex justify-end">
              {bio.length} / 300 characters
            </p>
            {bioError && <p className="text-sm text-red-400">{bioError}</p>}
          </div>
          <div className="text-sm my-[20px] italic text-[#1A1A1A99] bg-[#FBFAF9] gap-2 p-4 border border-[#F4EFDE] rounded-[12px] flex justify-left text-left">
            <label className="min-w-[25px] h-[35px] flex justify-center items-start">
              <Image
                src="/images/bulbicon.png"
                width={20}
                height={20}
                alt="bulbicon.png"
              />
            </label>
            Tip: You can mention your favorite scriptures, how you discovered
            your faith, or what your spiritual goals are for this year.
          </div>

          {/* Continue Button */}
          <Button className="cursor-pointer w-full text-base h-[52px] rounded-[12px] md:rounded-[8px] bg-[linear-gradient(90deg,#964400_0%,#F3D35D_25%,#F3D35D_50%,#8C4202_100%)] text-[#913C01] font-semibold hover:opacity-90 transition disabled:opacity-60"
            onClick={handleSubmit}
            disabled={!bio.trim() || loading}
          >
            Continue
          </Button>
          <p className="text-white text-sm font-light w-full text-center mt-[20px]">
            Don't worry, you can always update this later in your profile
            settings.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
