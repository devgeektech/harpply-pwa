"use client";

import { formatFaithValuesForDisplay } from "@/data/myFaithValues";
import { fetchProfilePhotos } from "@/lib/api/profile";
import { useFaithAttributesStore } from "@/store/faithAttributesStore";
import {
  useBioStore,
  useFaithStore,
  useOnboardingStore,
} from "@/store/onboardingStore";
import {
  Avatar,
  AvatarFallback,
  Button,
  Card,
  CardContent,
  Progress,
} from "@repo/ui";
import { ChevronLeft, MapPin, Pencil } from "lucide-react";
import Image from "next/image";
import { AUTH_STORAGE_KEYS } from "@/lib/constants";
import { completeOnboarding } from "@/lib/api/auth";
import { clearOnboardingResume } from "@/lib/onboarding-resume";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { SUCCESS_MESSAGES } from "@/lib/messages/success-messages";
const ACCENT = "#C39936";


function displayOrDash(value: string | number | undefined | null): string {
  if (value === undefined || value === null) return "—";
  const s = String(value).trim();
  return s.length > 0 ? s : "—";
}

function formatYearsInFaith(years: number): string {
  if (years < 0) return "—";
  if (years === 0) return "0 years";
  return `${years} year${years === 1 ? "" : "s"}`;
}

function buildPhotoSrc(s3PublicUrl: string, key: string): string {
  const safeKey = key?.toString?.().trim() ?? "";
  if (!safeKey) return "/images/accountCircle.png";
  if (/^https?:\/\//i.test(safeKey)) return safeKey;
  const base = (s3PublicUrl ?? "").replace(/\/$/, "");
  if (!base) return "/images/accountCircle.png";
  return `${base}/${safeKey.replace(/^\/+/, "")}`;
}

export default function ReviewProfilePage() {
  const name = useOnboardingStore((s) => s.name);
  const age = useOnboardingStore((s) => s.age);
  const gender = useOnboardingStore((s) => s.gender);
  const profilePhotos = useOnboardingStore((s) => s.profilePhotos);
  const setProfilePhotos = useOnboardingStore((s) => s.setProfilePhotos);
  const location = useOnboardingStore((s) => s.location);
  const bio = useBioStore((s) => s.bio);
  const churchInvolvement = useFaithStore((s) => s.churchInvolvement);
  const yearsInFaith = useFaithStore((s) => s.yearsInFaith);
  const churchAttendance = useFaithStore((s) => s.churchAttendance);
  const smokingSelection = useFaithStore((s) => s.smokingSelection);
  const alcoholSelection = useFaithStore((s) => s.alcoholSelection);
  const dietaryPreference = useFaithStore((s) => s.dietaryPreference);
  const myFaithValues = useFaithAttributesStore((s) => s.myFaithValues);
  const partnerValues = useFaithAttributesStore((s) => s.partnerValues);

  const myFaithDisplay = formatFaithValuesForDisplay(myFaithValues);
  const partnerDisplay = formatFaithValuesForDisplay(partnerValues);
  const s3PublicUrl = process.env.NEXT_PUBLIC_AWS_S3_URL ?? "";
  const firstPhoto = profilePhotos[0] ?? "";
  const hasAtLeastOnePhoto = profilePhotos.length > 0;
  const avatarSrc = buildPhotoSrc(s3PublicUrl, firstPhoto);

  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchProfilePhotos()
      .then((res) => {
        if (cancelled) return;
        setProfilePhotos(res?.photos ?? []);
      })
      .catch(() => {
        // Keep existing hydrated value if request fails.
      });
    return () => {
      cancelled = true;
    };
  }, [setProfilePhotos]);

  const handleComplete = async () => {
    if (submitting) return;
    const token =
      typeof window !== "undefined"
        ? window.localStorage.getItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN)
        : null;
    setSubmitting(true);
    try {
      if (token) {
        await completeOnboarding(token);
        clearOnboardingResume(token);
        window.localStorage.setItem(AUTH_STORAGE_KEYS.ONBOARDING_COMPLETED, "true");
        toast.success(SUCCESS_MESSAGES.ONBOARDING.ONBOARDING_COMPLETED);
      }
      router.push("/profile/identity");
    } catch {
      setSubmitting(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[url('/images/bg_blue.jpg')] bg-no-repeat bg-cover bg-center min-h-screen flex  sm:items-center items-start justify-center px-4 py-[50px] sm:py-4">
      <Card className="md:d-block md:bg-[url('/images/bg_auth_center.png')] py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
        <CardContent className="flex flex-col md:gap-6 gap-3 sm:p-10 px-3">
          <div className="text-left text-white w-full ">
            <Link href="/auth/onboarding/partner-attributes">
              <ChevronLeft size={24} />
            </Link>
          </div>

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
                <Avatar className="w-[130px] h-[130px] mx-auto bg-[#FEFDFB] border-dashed border-2 border-[#252C3680] overflow-hidden">
                  {hasAtLeastOnePhoto ? (
                    <Image
                      src={avatarSrc}
                      alt="Profile photo"
                      width={130}
                      height={130}
                      className="w-full h-full object-cover"
                    />
                  ) : (
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
                  )}
                </Avatar>
                <Button
                  type="button"
                  onClick={() =>
                    router.push(
                      `/profile/managephoto?returnTo=${encodeURIComponent("/auth/onboarding/profile")}`
                    )
                  }
                  className=" cursor-pointer group rounded-full w-[35px] h-[35px] bg-[#e3e3e3] absolute right-[10px]
                    top-[10px] z-[1] border-[1.08px] border-solid border-[#1A181880]"
                >
                  <Pencil className="text-black group-hover:text-white transition-colors" />
                </Button>
              </div>

              <div className="flex flex-col gap-1">
                <h3 className="font-normal font-serif text-[#1A1A1A] text-[24px]">
                  {displayOrDash(name)}
                </h3>
                <p className="text-base font-normal text-[#C39936]">
                  {[displayOrDash(age), displayOrDash(gender)].filter((v) => v !== "—").join(" • ") ||
                    "—"}
                </p>

                <div className="flex items-center justify-center gap-1.5 mt-1">
                  <MapPin className="size-4 shrink-0 text-[#C39936]" style={{ color: ACCENT }} />
                  <span className="text-base font-normal tracking-wider text-[#C39936]">
                    {displayOrDash(location)}
                  </span>
                </div>
              </div>

              {/* Bio */}
              <div className="text-sm text-gray-600 border-t pt-4 relative">
                <p className="text-[#C8A851] text-sm capitalize text-left mb-3">
                  BIO SNIPPET
                </p>
                <p className="text-[#1A1A1A] text-base italic font-light text-left">
                  {displayOrDash(bio)}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Info Sections */}
          <div className="mt-2 space-y-3">
            <div className="pt-2 text-sm text-white">Faith & Lifestyle</div>
            <InfoRow label="Church Involvement" value={displayOrDash(churchInvolvement)} />
            <InfoRow label="Years in Faith" value={formatYearsInFaith(yearsInFaith)} />
            <InfoRow label="Church Attendance Frequency" value={displayOrDash(churchAttendance)} />
            <InfoRow label="My Faith Values" value={myFaithDisplay || "—"} />
            <InfoRow label="Partner Values" value={partnerDisplay || "—"} />

            <div className="pt-2 text-sm text-white">Lifestyle Habits</div>

            <InfoRow label="Smoking" value={displayOrDash(smokingSelection)} />
            <InfoRow label="Alcohol" value={displayOrDash(alcoholSelection)} />
            <InfoRow label="Dietary Preferences" value={displayOrDash(dietaryPreference)} />
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
          <Button
            onClick={handleComplete}
            disabled={submitting || !hasAtLeastOnePhoto}
            className="cursor-pointer w-full text-base h-[52px] mt-[12px] rounded-[12px] md:rounded-[8px] bg-gradient-to-r from-[#c58b00] via-[#f5d76e] to-[#c58b00] text-[#913C01] font-semibold hover:opacity-90 transition disabled:opacity-60"
          >
            {submitting ? "Completing..." : "Complete Setup"}
          </Button>
          {!hasAtLeastOnePhoto && (
            <p className="text-xs text-white/80 text-center">
              Upload at least one profile photo to continue.
            </p>
          )}
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

