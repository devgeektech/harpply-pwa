"use client";

import { ToggleOption } from "@/components/common/toggle-option";
import {
  ALCOHOL_OPTIONS,
  CHURCH_ATTENDANCE_OPTIONS,
  CHURCH_INVOLVEMENT_OPTIONS,
  DIETARY_PREFERENCE_OPTIONS,
  SMOKING_OPTIONS,
} from "@/lib/constants";
import { ERROR_MESSAGES } from "@/lib/messages";
import { useFaithStore } from "@/store/onboardingStore";
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
import { useRouter } from "next/navigation";
import { ChevronLeft, Loader2 } from "lucide-react";
import { useState } from "react";

export default function FaithLifestylePage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    churchInvolvement,
    yearsInFaith,
    churchAttendance,
    smokingSelection,
    alcoholSelection,
    dietaryPreference,
    setChurchInvolvement,
    setYearsInFaith,
    setChurchAttendance,
    setSmokingSelection,
    setAlcoholSelection,
    setDietaryPreference,
    submitFaith,
  } = useFaithStore();

  const handleYearsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    setYearsInFaith(raw === "" ? 0 : Math.min(100, parseInt(raw, 10)));
  };

  const isFormComplete =
    Boolean(churchInvolvement?.trim()) &&
    yearsInFaith > 0 &&
    Boolean(churchAttendance?.trim()) &&
    Boolean(smokingSelection?.trim()) &&
    Boolean(alcoholSelection?.trim()) &&
    Boolean(dietaryPreference?.trim());

  const handleContinue = async () => {
    if (!isFormComplete) {
      setError("Please complete all fields before continuing.");
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      await submitFaith();
      router.push("/auth/onboarding/attributes");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : ERROR_MESSAGES.AUTH.SAVE_FAILED,
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[url('/images/bg_blue.jpg')] bg-no-repeat bg-cover bg-center min-h-screen flex sm:items-center items-start justify-center px-4 py-[50px] sm:py-4">
      <Card className="md:d-block md:bg-[url('/images/bg_auth_center.png')] py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
        <CardContent className="flex items-center flex-col gap-6 sm:p-10 px-3 text-center">
          <div className="text-left text-white w-full">
            <Link href="/auth/onboarding/bio">
              <ChevronLeft size={24} />
            </Link>
          </div>

          <div className="w-full">
            <p className="text-sm text-gray-300 mb-2 text-left">Step 4 of 8</p>
            <Progress value={80} className="h-2" />
          </div>

          <div className="my-4 w-full">
            <h2 className="text-[24px] font-light font-serif text-white mb-2 w-full text-left">
              Faith & Lifestyle
            </h2>
            <p className="font-light text-sm leading-[160%] tracking-normal text-white text-left">
              Tell us more about how you live out your faith and your daily
              preferences.
            </p>
          </div>

          {/* Church Involvement */}
          <div className="space-y-2 flex flex-col w-full text-left">
            <label className="text-sm text-gray-300">Church Involvement</label>
            <Select
              value={churchInvolvement || ""}
              onValueChange={setChurchInvolvement}
            >
              <SelectTrigger className="w-full border-[#C8A851]/40 bg-[linear-gradient(160deg,rgba(200,168,81,0.10)_0%,rgba(35,22,58,0.85)_45%,rgba(18,10,35,0.92)_100%)] !h-[52px] rounded-[8px] text-white text-sm focus-visible:border-[#C8A851]/60 focus-visible:ring-0 focus-visible:ring-transparent">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                {CHURCH_INVOLVEMENT_OPTIONS.map((value) => (
                  <SelectItem key={value} value={value}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Years in Faith */}
          <div className="space-y-2 flex flex-col w-full text-left">
            <label className="text-sm text-gray-300">Years in Faith</label>
            <Input
              className="w-full border-[#C8A851]/40 bg-[linear-gradient(160deg,rgba(200,168,81,0.10)_0%,rgba(35,22,58,0.85)_45%,rgba(18,10,35,0.92)_100%)] !h-[52px] rounded-[8px] text-white text-sm focus-visible:border-[#C8A851]/60 focus-visible:ring-0 focus-visible:ring-transparent"
              placeholder="e.g. 5"
              value={yearsInFaith === 0 ? "" : String(yearsInFaith)}
              onChange={handleYearsChange}
            />
          </div>

          {/* Church Attendance Frequency */}
          <div className="space-y-2 flex flex-col w-full text-left">
            <label className="text-sm text-gray-300">
              Church Attendance Frequency
            </label>
            <div className="grid grid-cols-2 gap-3">
              {CHURCH_ATTENDANCE_OPTIONS.map((item) => (
                <ToggleOption
                  key={item}
                  value={item}
                  selected={churchAttendance}
                  onSelect={setChurchAttendance}
                  className="h-[52px] rounded-[8px]"
                />
              ))}
            </div>
          </div>

          {/* Lifestyle Basics */}
          <div className="space-y-4 flex flex-col w-full text-left">
            <h4 className="text-white text-[20px] font-normal">
              Lifestyle Basics
            </h4>

            <div className="space-y-2">
              <label className="text-sm text-gray-300">Smoking</label>
              <div className="flex gap-3 flex-wrap">
                {SMOKING_OPTIONS.map((item) => (
                  <ToggleOption
                    key={item}
                    value={item}
                    selected={smokingSelection}
                    onSelect={setSmokingSelection}
                    className="h-[52px] rounded-[8px] flex-1 min-w-[90px]"
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-300">Alcohol</label>
              <div className="flex gap-3 flex-wrap">
                {ALCOHOL_OPTIONS.map((item) => (
                  <ToggleOption
                    key={item}
                    value={item}
                    selected={alcoholSelection}
                    onSelect={setAlcoholSelection}
                    className="h-[52px] rounded-[8px] flex-1 min-w-[90px]"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Dietary Preferences */}
          <div className="space-y-2 flex flex-col w-full text-left">
            <label className="text-sm text-gray-300">Dietary Preferences</label>
            <Select
              value={dietaryPreference || ""}
              onValueChange={setDietaryPreference}
            >
              <SelectTrigger className="w-full border-[#C8A851]/40 bg-[linear-gradient(160deg,rgba(200,168,81,0.10)_0%,rgba(35,22,58,0.85)_45%,rgba(18,10,35,0.92)_100%)] !h-[52px] rounded-[8px] text-white text-sm">
                <SelectValue placeholder="No specific diet" />
              </SelectTrigger>
              <SelectContent>
                {DIETARY_PREFERENCE_OPTIONS.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {error && (
            <div className="w-full text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-md px-3 py-2 text-left">
              {error}
            </div>
          )}

          <Button
            onClick={handleContinue}
            disabled={submitting || !isFormComplete}
            className="cursor-pointer w-full text-base h-[52px] rounded-[12px] md:rounded-[8px] bg-[linear-gradient(90deg,#964400_0%,#F3D35D_25%,#F3D35D_50%,#8C4202_100%)] text-[#913C01] font-semibold hover:opacity-90 transition disabled:opacity-60"
          >
            {submitting ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </span>
            ) : (
              "Continue"
            )}
          </Button>

          <p className="text-center text-sm font-light text-white">
            All preferences can be updated later in settings.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
