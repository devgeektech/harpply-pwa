"use client";

import Image from "next/image";
import { Button, Card, CardContent, Progress } from "@repo/ui";
import { Send, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AUTH_STORAGE_KEYS } from "@/lib/constants";
import { saveLocation } from "@/lib/api/auth";
import { useState } from "react";
import { useOnboardingStore } from "@/store/onboardingStore";
import { reverseGeocodeCityState } from "@/lib/utils";

export default function Location() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const setLatitude = useOnboardingStore((s) => s.setLatitude);
  const setLongitude = useOnboardingStore((s) => s.setLongitude);
  const setLocation = useOnboardingStore((s) => s.setLocation);
  const setLocationEnabled = useOnboardingStore((s) => s.setLocationEnabled);

  const goNext = () => {
    router.push("/auth/onboarding/bio");
  };

  const handleEnableLocation = async () => {
    if (submitting) return;
    const token =
      typeof window !== "undefined"
        ? window.localStorage.getItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN)
        : null;
    if (!token) {
      goNext();
      return;
    }

    setSubmitting(true);
    try {
      const getPosition = () =>
        new Promise<GeolocationPosition>((resolve, reject) => {
          if (!navigator.geolocation) {
            reject(new Error("Geolocation not supported."));
            return;
          }
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: false,
            timeout: 10000,
          });
        });

      let latitude = 0;
      let longitude = 0;
      try {
        const pos = await getPosition();
        latitude = pos.coords.latitude;
        longitude = pos.coords.longitude;
      } catch {
        latitude = 0;
        longitude = 0;
      }

      const cityState = await reverseGeocodeCityState(latitude, longitude);

      setLatitude(latitude);
      setLongitude(longitude);
      setLocation(cityState);
      setLocationEnabled(true);

      await saveLocation(
        {
          latitude,
          longitude,
          location: cityState,
          locationEnabled: true,
        },
        token
      );
      goNext();
    } catch {
      goNext();
    } finally {
      setSubmitting(false);
    }
  };

  const handleSkip = () => {
    setLocationEnabled(false);
    goNext();
  };

  return (
    <div className="bg-[url('/images/bg_blue.jpg')] bg-no-repeat bg-cover bg-center min-h-screen flex  sm:items-center items-start justify-center px-4 py-[50px] sm:py-4">
      <Card className="md:d-block md:bg-[url('/images/bg_auth_center.png')] py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
        <CardContent className="flex items-center flex-col gap-2 sm:p-10 px-3 text-center">
          <div className="text-left text-white w-full">
            <Link href="/auth/onboarding/identity">
              <ChevronLeft size={24} />
            </Link>
          </div>
          {/* Progress */}
          <div className="mb-6 w-full text-left">
            <p className="text-sm text-gray-300 mb-2 text-left">Step 2 of 5</p>
            <Progress value={40} />
          </div>

          <div className="container-fluid">
            <div className="pulse-wrapper">
              <div className="pulse pulse1"></div>
              <div className="pulse pulse2"></div>
              <div className="pulse pulse3"></div>

              <div className="center-dot">
                <Image
                  width={45}
                  height={45}
                  src="/images/locationMap.png"
                  alt="locationMap.png"
                />
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-[24px] font-light font-serif text-white mb-2 w-full">
            Enable Location
          </h1>

          <p className="text-white mb-6 font-light w-full">
            We use your approximate location to suggest meaningful connections
            within your community.
          </p>

          {/* Continue Button */}
          <Button
            onClick={handleEnableLocation}
            disabled={submitting}
            className="cursor-pointer w-full text-base h-[52px] rounded-[12px] md:rounded-[8px] bg-[linear-gradient(90deg,#964400_0%,#F3D35D_25%,#F3D35D_50%,#8C4202_100%)] text-[#913C01] font-semibold hover:opacity-90 transition disabled:opacity-60"
          >
            <Send /> {submitting ? "Enabling..." : "Enable Location"}
          </Button>
          <Button
            type="button"
            onClick={handleSkip}
            className="cursor-pointer text-base bg-transparent hover:bg-transparent text-white font-semibold hover:opacity-90 transition disabled:opacity-60"
          >
            Skip for Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
