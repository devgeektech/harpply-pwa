"use client";

import { useProfileStore } from "@/store/profileStore";
import {
  Avatar,
  AvatarFallback,
  Button,
  Card,
  CardContent,
  Input,
  Progress,
} from "@repo/ui";
import { Pencil } from "lucide-react";
import Image from "next/image";

export default function ReviewProfilePage() {
  const { name, age, location, church, bio } = useProfileStore();

  return (
    <div className="bg-[url('/images/bg_blue.jpg')] bg-no-repeat bg-cover bg-center min-h-screen flex  sm:items-center items-start justify-center px-4 py-[50px] sm:py-4">
      <Card className="md:d-block md:bg-[url('/images/bg_auth_center.png')] py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
        <CardContent className="flex flex-col md:gap-6 gap-3 sm:p-10 px-3">
                    {/* Progress */}
          <div className="space-y-2 mb-6">
            <p className="text-xs text-white/60">FINAL STEP</p>
            <Progress value={100} className="h-1" />
            <p className="text-sm font-light text-white italic">
              Review your spiritual journey profile
            </p>
          </div>

          {/* Title */}
          <h2 className="text-center font-serif text-[24px] font-normal text-white mb-2">
            Review Your Profile
          </h2>

          {/* Profile Card */}
          <Card className="bg-white text-black rounded-xl">
            <CardContent className="p-6 text-center space-y-4">
              <div className="relative w-[160px] h-[160px] mx-auto">
                <Avatar className="w-[130px] h-[130px] mx-auto bg-[#FEFDFB] border-dashed border-2 border-[#252C3680]">
                  <div className="flex flex-col items-center justify-center w-full p-4">
                    <Image
                      width={44}
                      height={44}
                      src="/images/accountCircle.png"
                      alt="accountCircle.png"
                    />
                    <AvatarFallback className="bg-transparent text-[#252C36] text-base">
                      Upload photo
                    </AvatarFallback>
                  </div>
                </Avatar>
                <Button
                  className=" cursor-pointer group rounded-full w-[35px] h-[35px] bg-[#e3e3e3] absolute right-[10px]
                    top-[10px] z-[1] border-[1.08px] border-solid border-[#1A181880]"
                >
                  <Input
                    type="file"
                    className="absolute w-full h-full opacity-0 cursor-pointer"
                  />
                  <Pencil className="text-black group-hover:text-white transition-colors" />
                </Button>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-normal font-serif text-[#1A1A1A] text-[24px]">
                  {name}
                </h3>
                <p className="text-base font-normal text-[#C39936]">
                  {age} • {location}
                </p>

                <p className="text-base text-[#1A1A1ACC] mt-1">⛪ {church}</p>
              </div>

              {/* Bio */}
              <div className="text-sm text-gray-600 border-t pt-4 relative">
                <p className="text-[#C8A851] text-sm capitalize text-left mb-3">
                  BIO SNIPPET
                </p>
                <p className="text-[#1A1A1A] text-base italic font-light text-left">
                  {bio}
                </p>

                <Pencil
                  size={14}
                  className="absolute right-0 top-4 text-yellow-600 cursor-pointer"
                />
              </div>
            </CardContent>
          </Card>

          {/* Info Sections */}
          <div className="mt-2 space-y-3">
            <div className="pt-2 text-sm text-white">Faith & Lifestyle</div>
            <InfoRow label="Church Involvement" value="Member" />
            <InfoRow label="Years in Faith" value="5 years" />
            <InfoRow label="Church Attendance Frequency" value="Weekly" />
            <InfoRow label="My Faith Values" value="Kindness" />
            <InfoRow label="Partner Values" value="Forgiveness" />

            <div className="pt-2 text-sm text-white">Lifestyle Habits</div>

            <InfoRow label="Smoking" value="Never" />
            <InfoRow label="Alcohol" value="Socially" />
            <InfoRow label="Dietary Preferences" value="No specific diet" />
          </div>

          {/* Secure box */}
          <div className="mt-6 bg-[#0F172A] p-4 rounded-lg flex gap-3 items-start text-sm">
            <Image src="/images/secure.png" alt="secure" width={40} height={40} />

            <div>
              <p className="font-medium text-white text-sm">Secure Account</p>
              <p className="text-xs text-white">
                Your data is encrypted and kept private.
              </p>
            </div>
          </div>

          {/* Button */}
          <Button className="cursor-pointer w-full text-base h-[52px] mt-[12px] rounded-[12px] md:rounded-[8px] bg-gradient-to-r from-[#c58b00] via-[#f5d76e] to-[#c58b00] text-[#913C01] font-semibold hover:opacity-90 transition disabled:opacity-60">
            Complete Setup
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

/* Row component */

function InfoRow({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <div className="flex h-[56px] justify-between items-center bg-white text-black rounded-lg px-4 py-3 text-sm">
      <span>{label}</span>
      <span className="text-[#C39936] font-medium">{value}</span>
    </div>
  );
}
