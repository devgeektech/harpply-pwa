"use client";

import AttributeCard from "@/components/common/attribute-card";
import { myFaithValues } from "@/data/myFaithValues";
import { useAttributesStore } from "@/store/useAttributesStore";
import { Button, Card, CardContent, Progress } from "@repo/ui";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { AUTH_STORAGE_KEYS } from "@/lib/constants";
import { saveMyFaithValues } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AttributesPage() {
  const selected = useAttributesStore((s) => s.selected);
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const handleContinue = async () => {
    if (submitting || selected.length !== 3) return;
    const token =
      typeof window !== "undefined"
        ? window.localStorage.getItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN)
        : null;
    if (!token) {
      router.push("/auth/onboarding/partner-attributes");
      return;
    }
    setSubmitting(true);
    try {
      await saveMyFaithValues(selected, token);
    } catch {
      // soft‑fail, still move forward
    } finally {
      setSubmitting(false);
      router.push("/auth/onboarding/partner-attributes");
    }
  };

  return (
    <div className="bg-[url('/images/bg_blue.jpg')] bg-no-repeat bg-cover bg-center min-h-screen flex  sm:items-center items-start justify-center px-4 py-[50px] sm:py-4">
      <Card className="md:d-block md:bg-[url('/images/bg_auth_center.png')] py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
        <CardContent className="flex items-start flex-col gap-3 sm:p-10 px-3">
          <div className="text-left text-white w-full ">
            <Link href="/auth/onboarding/faith">
              <ChevronLeft size={24} />
            </Link>
          </div>
          {/* Progress */}
          <div className="mb-6 w-full">
            <p className="text-xs text-gray-300 mb-2 text-left">Step 5 of 7</p>

            <Progress value={80} className="h-2" />
          </div>

          {/* Title */}
          <h2 className="text-[24px] font-serif text-white font-normal leading-snug text-left">
            Choose 3 biblical attributes that reflect your walk with Christ
          </h2>

          <p className="text-sm text-white mt-0 mb-6 text-left w-full">
            Select the qualities most important to you.
          </p>

          {/* Cards */}
          <div className="grid grid-cols-2 gap-4 w-full">
            {myFaithValues.map((item) => (
              <AttributeCard
                key={item.value}
                value={item.value}
                title={item.title}
                desc={item.desc}
              />
            ))}
          </div>

          {/* Button */}
          <Button
            disabled={selected.length !== 3 || submitting}
            onClick={handleContinue}
            className="cursor-pointer mt-6 w-full h-[52px] text-base text-[#913C01] font-semibold bg-[linear-gradient(90deg,#964400_0%,#F3D35D_25%,#F3D35D_50%,#8C4202_100%)] hover:opacity-90 disabled:opacity-60"
          >
            {submitting ? "Saving..." : "Continue"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
