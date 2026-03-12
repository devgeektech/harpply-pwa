"use client";

import { ToggleOption } from "@/components/common/toggle-option";
import { useOnboardingStore } from "@/store/onboardingFaithStore";

import {
  Button,
  Card,
  CardContent,
  Input,
  Progress,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
export default function FaithLifestylePage() {
  const {
    setField,
    churchRole,
    yearsInFaith,
    attendance,
    smoking,
    alcohol,
    diet,
  } = useOnboardingStore();

  return (
    <div className="bg-[url('/images/bg_blue.jpg')] bg-no-repeat bg-cover bg-center min-h-screen flex  sm:items-center items-start justify-center px-4 py-[50px] sm:py-4">
      <Card className="md:d-block md:bg-[url('/images/bg_auth_center.png')] py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
        <CardContent className="flex items-center flex-col gap-6 sm:p-10 px-3 text-center">
          <div className="text-left text-white w-full ">
            <Link href={"/"}>
              {" "}
              <ChevronLeft size={24} />
            </Link>
          </div>
          {/* Progress */}
          <div className=" w-full">
            <p className="text-sm text-gray-300 mb-2 text-left">Step 4 of 5</p>
            <Progress value={80} className="h-2" />
          </div>

          {/* Title */}
          <div className="my-[40px] w-full">
            <h2 className="text-[24px] font-light font-serif text-white mb-2 w-full text-left">
              Faith & Lifestyle
            </h2>
            <p className="font-light text-sm leading-[160%] tracking-normal text-white text-left">
              Tell us more about how you live out your faith and daily
              preferences.
            </p>
          </div>

          {/* Church Involvement */}
          <div className="space-y-2 flex flex-col w-full text-left">
            <label className="text-sm text-gray-300">Church Involvement</label>

            <Select onValueChange={(v) => setField("churchRole", v)}>
              <SelectTrigger className="w-full bg-[#FBFAF9] !h-[52px] rounded-[8px] text-[#1A1A1A] text-sm">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="member">Member</SelectItem>
                <SelectItem value="regular">Regular Attender</SelectItem>
                <SelectItem value="volunteer">Volunteer</SelectItem>
                <SelectItem value="new">New to Church</SelectItem>
                <SelectItem value="exploring">Exploring Faith</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Years in Faith */}
          <div className="space-y-2 flex flex-col w-full text-left">
            <label className="text-sm text-gray-300 mb-[10px]">
              Years in Faith
            </label>

            <Input
              className="w-full bg-[#FBFAF9] !h-[52px] rounded-[8px] text-[#1A1A1A] text-sm"
              placeholder="e.g. 5 years"
              value={yearsInFaith}
              onChange={(e) => setField("yearsInFaith", e.target.value)}
            />
          </div>

          {/* Attendance */}
          <div className="space-y-2 flex flex-col w-full text-left">
            <label className="text-sm text-gray-300">
              Church Attendance Frequency
            </label>

            <div className="grid grid-cols-2 gap-3">
              {["Weekly", "Daily/Multiple", "Bi-Weekly", "Occasionally"].map(
                (item) => (
                  <ToggleOption
                    key={item}
                    value={item}
                    selected={attendance}
                    onSelect={(v) => setField("attendance", v)}
                    className="h-[52px] rounded-[8px]"
                  />
                )
              )}
            </div>
          </div>

          {/* Smoking */}
          <div className="space-y-2 flex flex-col w-full text-left">
            <h4 className="text-white text-[20px] font-normal">
              Lifestyle Basics
            </h4>
            <label className="text-sm text-gray-300">Smoking</label>

            <div className="flex gap-3">
              {["Never", "Socially", "Regularly"].map((item) => (
                <ToggleOption
                  key={item}
                  value={item}
                  selected={smoking}
                  onSelect={(v) => setField("smoking", v)}
                />
              ))}
            </div>
          </div>

          {/* Alcohol */}
          <div className="space-y-2 flex flex-col w-full text-left">
            <label className="text-sm text-gray-300">Alcohol</label>

            <div className="flex gap-3">
              {["Never", "Socially", "Regularly"].map((item) => (
                <ToggleOption
                  key={item}
                  value={item}
                  selected={alcohol}
                  onSelect={(v) => setField("alcohol", v)}
                />
              ))}
            </div>
          </div>

          {/* Diet */}
          <div className="space-y-2 flex flex-col w-full text-left">
            <label className="text-sm text-gray-300">Dietary Preferences</label>

            <Select onValueChange={(v) => setField("diet", v)}>
              <SelectTrigger className="w-full bg-[#FBFAF9] !h-[52px] rounded-[8px] text-[#1A1A1A] text-sm">
                <SelectValue placeholder="Select Dietary Preferences" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="vegetarian">Vegetarian</SelectItem>
                <SelectItem value="vegan">Vegan</SelectItem>
                <SelectItem value="keto">Keto</SelectItem>
                <SelectItem value="dairy">Dairy-Free</SelectItem>
                <SelectItem value="none">No Restrictions</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Continue */}
          <Button className="cursor-pointer w-full text-base h-[52px] rounded-[12px] md:rounded-[8px] bg-[linear-gradient(90deg,#964400_0%,#F3D35D_25%,#F3D35D_50%,#8C4202_100%)] text-[#913C01] font-semibold hover:opacity-90 transition disabled:opacity-60">
            Continue
          </Button>

          <p className="text-center text-sm font-light text-white">
            All preferences can be updated later in settings.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
