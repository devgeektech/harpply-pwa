"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ALCOHOL_OPTIONS,
  DIETARY_PREFERENCE_OPTIONS,
  SMOKING_OPTIONS,
  type AlcoholOption,
  type DietaryPreferenceValue,
  type SmokingOption,
} from "@/lib/constants";
import { fetchProfile, updateLifestyleProfile } from "@/lib/api/profile";
import { useProfileStore } from "@/store/profileStore";
import { SUCCESS_MESSAGES } from "@/lib/messages/success-messages";
import { ERROR_MESSAGES } from "@/lib/messages/error-messages";

function smokingFromApi(raw: string | null | undefined): SmokingOption {
  if (!raw?.trim()) return SMOKING_OPTIONS[0];
  const m = SMOKING_OPTIONS.find(
    (o) => o.toLowerCase() === raw.trim().toLowerCase()
  );
  return m ?? SMOKING_OPTIONS[0];
}

function alcoholFromApi(raw: string | null | undefined): AlcoholOption {
  if (!raw?.trim()) return ALCOHOL_OPTIONS[0];
  const m = ALCOHOL_OPTIONS.find(
    (o) => o.toLowerCase() === raw.trim().toLowerCase()
  );
  return m ?? ALCOHOL_OPTIONS[0];
}

function dietaryValueFromApi(raw: string | null | undefined): DietaryPreferenceValue {
  if (!raw?.trim()) return DIETARY_PREFERENCE_OPTIONS[0].value;
  const trimmed = raw.trim();
  const byValue = DIETARY_PREFERENCE_OPTIONS.find((o) => o.value === trimmed);
  if (byValue) return byValue.value;
  const byLabel = DIETARY_PREFERENCE_OPTIONS.find((o) => o.label === trimmed);
  if (byLabel) return byLabel.value;
  return DIETARY_PREFERENCE_OPTIONS[0].value;
}

export default function LifestylePage() {
  const hydrateFromApi = useProfileStore((s) => s.hydrateFromApi);
  const router = useRouter();
  const [smoking, setSmoking] = useState<SmokingOption>(SMOKING_OPTIONS[0]);
  const [alcohol, setAlcohol] = useState<AlcoholOption>(ALCOHOL_OPTIONS[0]);
  const [diet, setDiet] = useState<DietaryPreferenceValue>(
    DIETARY_PREFERENCE_OPTIONS[0].value
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [smokingError, setSmokingError] = useState("");
  const [alcoholError, setAlcoholError] = useState("");
  const [dietError, setDietError] = useState("");

  const applyFromProfile = useCallback((data: {
    smokingPreference: string | null;
    alcoholPreference: string | null;
    dietaryPreference: string | null;
  }) => {
    setSmoking(smokingFromApi(data.smokingPreference));
    setAlcohol(alcoholFromApi(data.alcoholPreference));
    setDiet(dietaryValueFromApi(data.dietaryPreference));
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchProfile()
      .then((res) => {
        if (cancelled || !res?.data) return;
        hydrateFromApi(res.data);
        applyFromProfile(res.data);
      })
      .catch(() => {
        toast.error(ERROR_MESSAGES.PROFILE.LIFESTYLE_LOAD_FAILED);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [hydrateFromApi, applyFromProfile]);

  const handleSave = async () => {
    if (saving) return;
    let hasError = false;
    if (!smoking?.trim()) {
      setSmokingError("Smoking preference is required.");
      hasError = true;
    } else {
      setSmokingError("");
    }
    if (!alcohol?.trim()) {
      setAlcoholError("Alcohol preference is required.");
      hasError = true;
    } else {
      setAlcoholError("");
    }
    if (!diet?.trim()) {
      setDietError("Dietary preference is required.");
      hasError = true;
    } else {
      setDietError("");
    }
    if (hasError) return;
    setSaving(true);
    try {
      await updateLifestyleProfile({
        smokingPreference: smoking,
        alcoholPreference: alcohol,
        dietaryPreference: diet,
      });
      const refreshed = await fetchProfile();
      if (refreshed?.data) hydrateFromApi(refreshed.data);
      toast.success(SUCCESS_MESSAGES.PROFILE.LIFESTYLE_UPDATED);
      router.push("/profile/identity");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to save. Please try again.";
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-[url('/images/bg_blue.jpg')] bg-no-repeat bg-cover bg-center min-h-screen flex  sm:items-center items-start justify-center px-4 py-[50px] sm:py-4">
      <Card className="md:d-block md:bg-[url('/images/bg_auth_center.png')] py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
        <CardContent className="flex flex-col md:gap-6 gap-3 sm:p-6 px-3 text-white">
          <div className="flex items-center px-0 pb-2 w-full">
            <Link
              href="/profile/everydaylife"
              className="flex items-center justify-center size-10 rounded-full text-white/90 hover:bg-white/10 transition-colors"
              aria-label="Back"
            >
              <ChevronLeft className="size-6" />
            </Link>
          </div>

          <div className="flex items-center gap-2 ">
            <h1 className="text-[24px] font-normal font-serif">Lifestyle</h1>
          </div>

          <p className="text-[20px] font-light">Lifestyle Basics</p>

          {loading ? (
            <p className="text-sm text-white/70">Loading…</p>
          ) : (
            <>
              {/* Smoking */}
              <div className="">
                <p className="mb-3 sm:text-[20px] text-[16px] font-light">Smoking</p>
                <div className="flex gap-3">
                  {SMOKING_OPTIONS.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        setSmoking(item)
                        if (smokingError) setSmokingError("")
                      }}
                      className={`cursor-pointer flex-1 sm:h-[52px] h-[36px] rounded-[8px]  text-sm font-medium transition
                ${
                  smoking === item
                    ? "bg-[linear-gradient(90deg,#964400_0%,#F3D35D_25%,#F3D35D_50%,#8C4202_100%)] border border-[#C8A851] text-[#913C01]"
                    : "bg-[linear-gradient(180deg,rgba(167,139,218,0.22)_0%,rgba(55,35,95,0.65)_100%)] border border-[#a78bda]/40"
                }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                {smokingError && <p className="mt-2 text-sm text-red-300">{smokingError}</p>}
              </div>

              {/* Alcohol */}
              <div className="">
                <p className="mb-3 sm:text-[20px] text-[16px] font-light">Alcohol</p>
                <div className="flex gap-3">
                  {ALCOHOL_OPTIONS.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        setAlcohol(item)
                        if (alcoholError) setAlcoholError("")
                      }}
                      className={`cursor-pointer flex-1 sm:h-[52px] h-[36px] rounded-[8px] text-sm font-medium transition
                ${
                  alcohol === item
                    ? "bg-[linear-gradient(90deg,#964400_0%,#F3D35D_25%,#F3D35D_50%,#8C4202_100%)] border border-[#C8A851] text-[#913C01]"
                    : "bg-[linear-gradient(180deg,rgba(167,139,218,0.22)_0%,rgba(55,35,95,0.65)_100%)] border border-[#a78bda]/40"
                }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                {alcoholError && <p className="mt-2 text-sm text-red-300">{alcoholError}</p>}
              </div>

              {/* Dietary Preferences */}
              <div className="">
                <p className="mb-3 sm:text-[20px] text-[16px] font-light">
                  Dietary Preferences
                </p>
                <Select
                  value={diet}
                  onValueChange={(v) => {
                    setDiet(v as DietaryPreferenceValue)
                    if (dietError) setDietError("")
                  }}
                >
                  <SelectTrigger className="w-full border-[#C8A851]/18 bg-[linear-gradient(160deg,rgba(200,168,81,0.10)_0%,rgba(35,22,58,0.85)_45%,rgba(18,10,35,0.92)_100%)] !h-[52px] rounded-[8px] text-white text-sm">
                    <SelectValue placeholder="Select diet" />
                  </SelectTrigger>
                  <SelectContent>
                    {DIETARY_PREFERENCE_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {dietError && <p className="mt-2 text-sm text-red-300">{dietError}</p>}
              </div>
            </>
          )}

          <Button
            type="button"
            onClick={handleSave}
            disabled={loading || saving}
            className="cursor-pointer w-full h-[52px] text-[#913C01] font-semibold bg-[linear-gradient(90deg,#964400_0%,#F3D35D_25%,#F3D35D_50%,#8C4202_100%)] disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save Changes"}
          </Button>

          <Link
            href="/dashboard/quiz/introduction"
            className="cursor-pointer w-full h-[52px] rounded-[12px] md:rounded-[8px] border border-[#913C01] text-[#913C01] font-medium flex items-center justify-center"
          >
            Cancel
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
