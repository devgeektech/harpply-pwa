"use client";

import { useEffect, useState } from "react";
import { ValueTag } from "@/components/common/value-tag";
import {
  attributeValues,
  normalizeFaithValueTokenToValue,
  parseFaithValuesFromApi,
} from "@/data/myFaithValues";
import { useFaithStore } from "@/store/faithStore";
import { useProfileStore } from "@/store/profileStore";
import { Button, Card, CardContent } from "@repo/ui";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { fetchProfile, updateFaithValuesProfile } from "@/lib/api/profile";
import { SUCCESS_MESSAGES } from "@/lib/messages/success-messages";

export default function FaithValuesPage() {
  const {
    myValues,
    partnerValues,
    setMyValues,
    setPartnerValues,
    toggleMyValue,
    togglePartnerValue,
  } = useFaithStore();
  const hydrateFromApi = useProfileStore((s) => s.hydrateFromApi);
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [myValuesError, setMyValuesError] = useState("");
  const [partnerValuesError, setPartnerValuesError] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetchProfile()
      .then((res) => {
        if (cancelled || !res?.data) return;
        hydrateFromApi(res.data);
        setMyValues(
          parseFaithValuesFromApi(res.data.myFaithValues).map(
            normalizeFaithValueTokenToValue
          )
        );
        setPartnerValues(
          parseFaithValuesFromApi(res.data.partnerValues).map(
            normalizeFaithValueTokenToValue
          )
        );
      })
      .catch(() => { });
    return () => {
      cancelled = true;
    };
  }, [hydrateFromApi, setMyValues, setPartnerValues]);

  const handleNext = async () => {
    if (saving) return;
    let hasError = false;
    if (!myValues?.length) {
      setMyValuesError("Please select at least one value.");
      hasError = true;
    } else {
      setMyValuesError("");
    }
    if (!partnerValues?.length) {
      setPartnerValuesError("Please select at least one value.");
      hasError = true;
    } else {
      setPartnerValuesError("");
    }
    if (hasError) return;
    setSaving(true);
    try {
      await updateFaithValuesProfile({
        myFaithValues: myValues,
        partnerValues,
      });
      toast.success(SUCCESS_MESSAGES.PROFILE.FAITH_UPDATED);
      router.push("/profile/everydaylife");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to save faith values. Please try again.";
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-[url('/images/bg_blue.jpg')] bg-no-repeat bg-cover bg-center min-h-screen flex  sm:items-center items-start justify-center px-4 py-[50px] sm:py-4">
      <Card className="md:d-block md:bg-[url('/images/bg_auth_center.png')] py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
        <CardContent className="flex flex-col md:gap-6 gap-3 sm:p-6 px-0 text-white">
          <div className="flex items-center px-0 pb-2 w-full">
            <Link
              href="/profile/faithlifestyle"
              className="flex items-center justify-center size-10 rounded-full text-white/90 hover:bg-white/10 transition-colors"
              aria-label="Back"
            >
              <ChevronLeft className="size-6" />
            </Link>
          </div>
          {/* Header */}
          <div className="flex items-center gap-2 text-white">
            <h1 className="text-[24px] font-normal font-serif">Faith Values</h1>
          </div>

          {/* My Faith Values */}
          <div className="mb-6">
            <h2 className="text-white text-[20px] font-light mb-3">My Faith Values</h2>

            <div className="flex flex-wrap gap-3 bg-[#FBFAF914] border border-[#E7ECF214] rounded-[8px] px-[10px] py-[18px]">
              {attributeValues.map((item) => (
                <ValueTag
                  key={item.value}
                  label={item.title}
                  active={myValues.includes(item.value)}
                  onClick={() => {
                    toggleMyValue(item.value);
                    if (myValuesError) setMyValuesError("");
                  }}
                />
              ))}
            </div>
            {myValuesError && (
              <p className="mt-2 text-sm text-red-300">{myValuesError}</p>
            )}
          </div>

          {/* Partner Values */}
          <div className="mb-6">
            <h2 className="text-white text-[20px] font-light mb-3">Partner Values</h2>

            <div className="flex flex-wrap gap-3 bg-[#FBFAF914] border border-[#E7ECF214] rounded-[8px] px-[10px] py-[18px]">
              {attributeValues.map((item) => (
                <ValueTag
                  key={item.value}
                  label={item.title}
                  active={partnerValues.includes(item.value)}
                  onClick={() => {
                    togglePartnerValue(item.value);
                    if (partnerValuesError) setPartnerValuesError("");
                  }}
                />
              ))}
            </div>
            {partnerValuesError && (
              <p className="mt-2 text-sm text-red-300">{partnerValuesError}</p>
            )}
          </div>

          {/* Next Button */}
          <Button
            onClick={handleNext}
            disabled={saving}
            className="cursor-pointer w-full text-base h-[52px] rounded-[12px] md:rounded-[8px] bg-[linear-gradient(90deg,#964400_0%,#F3D35D_25%,#F3D35D_50%,#8C4202_100%)] text-[#913C01] font-semibold hover:opacity-90 transition disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save & next"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}