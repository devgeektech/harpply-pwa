"use client";

import { useProfileStore, type Gender } from "@/store/profileStore";
import {
  Avatar,
  AvatarFallback,
  Button,
  Card,
  CardContent,
  Input,
  Textarea,
} from "@repo/ui";
import { ChevronLeft, MapPin, Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateBasicProfile, fetchProfile } from "@/lib/api/profile";
import { useState, useEffect } from "react";

const CARD_BG = "#1A0A26";
const GOLD_GRADIENT =
  "linear-gradient(135deg, #c58b00 0%, #e8b923 50%, #c58b00 100%)";
const INPUT_BG = "rgba(255,255,255,0.06)";
const BORDER_SUBTLE = "rgba(255,255,255,0.12)";

export default function EditProfilePage() {
  const {
    name,
    age,
    location,
    gender,
    bio,
    setName,
    setAge,
    setLocation,
    setGender,
    setBio,
    hydrateFromApi,
    loaded,
  } = useProfileStore();
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (loaded) return;
    fetchProfile()
      .then((res) => {
        if (res?.data) hydrateFromApi(res.data);
      })
      .catch(() => {});
  }, [loaded, hydrateFromApi]);

  const handleSave = async () => {
    if (saving) return;
    setSaving(true);
    try {
      await updateBasicProfile({
        fullName: name,
        age: age || undefined,
        location: location || undefined,
        gender: gender.toLowerCase(),
        bio,
      });
      toast.success("Profile updated successfully.");
      router.push("/profile/faithlifestyle");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to update profile. Please try again.";
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };
  return (
    <div className="bg-[url('/images/bg_blue.jpg')] bg-no-repeat bg-cover bg-center min-h-screen flex  sm:items-center items-start justify-center px-4 py-[50px] sm:py-4">
    <Card className="md:d-block md:bg-[url('/images/bg_auth_center.png')] py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
      <CardContent className="flex items-center flex-col gap-2 sm:p-10 px-3 w-full">
          {/* Header: back + title */}
          <div className="relative mb-6 w-full">
            <Link
              href="/profile/identity"
              className="flex items-center justify-center size-10 rounded-full text-white/90 hover:bg-white/10 transition-colors"
              aria-label="Back"
            >
              <ChevronLeft className="size-6" />
            </Link>
            <h1 className="text-[24px] font-normal font-serif text-white text-center">Edit Profile</h1>
          </div>

          {/* Profile photo + name */}
          <div className="flex flex-col items-center mb-8 w-full">
          <div className="relative w-[160px] h-[160px] mx-auto flex items-center">
                <Avatar className="w-[130px] h-[130px] mx-auto bg-[#FEFDFB]">
                  <div className="flex flex-col items-center justify-center w-full p-4">
                    <Image
                      width={44}
                      height={44}
                      src="/images/accountCircle.png"
                      alt="accountCircle.png"
                    />
                    <AvatarFallback className="bg-transparent text-[#252C36] text-base text-center">
                      Upload photo
                    </AvatarFallback>
                  </div>
                </Avatar>
                <Button
                  type="button"
                  aria-label="Edit profile photo"
                  onClick={() => router.push("/profile/managephoto")}
                  className=" cursor-pointer group rounded-full w-[35px] h-[35px] bg-[#e3e3e3] absolute right-[15px]
                    top-[20px] z-[1] border-[1.08px] border-solid border-[#1A181880]"
                >
                  <Pencil className="text-black group-hover:text-white transition-colors" />
                </Button>
              </div>
            <p className="mt-1 text-[24px] font-normal font-serif text-white">{name}</p>
            <p className="text-base font-normal text-[#C39936]">Update your basic information</p>
          </div>

          {/* Basic Information */}
          <p className="text-[24px] font-normal font-serif pb-[10px] border-b border-white text-white mb-4 w-full">
            Basic Information
          </p>
          <div className="space-y-4 w-full">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-white/80">
                Full Name
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="h-[52px] rounded-[8px]  border-white/15 bg-white text-black placeholder:text-black/40 focus-visible:ring-2 focus-visible:ring-amber-500/40"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-white/80">
                Age
              </label>
              <Input
                type="number"
                min={18}
                max={120}
                value={age || ""}
                onChange={(e) => setAge(Number(e.target.value) || 0)}
                placeholder="Age"
                className="h-[52px] rounded-[8px]  border-white/15 bg-white text-black placeholder:text-black/40 focus-visible:ring-2 focus-visible:ring-amber-500/40"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-white/80">
                Location
              </label>
              <div
                className="flex h-[52px] items-center gap-2 rounded-xl border px-3 bg-white"
              >
                <MapPin className="size-4 shrink-0 text-[#C39936]" />
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City, State"
                  className="h-[52px] rounded-[8px]  border-white/15 bg-white text-black placeholder:text-black/40 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
            </div>
          </div>

          {/* Gender */}
          <div className="mt-[16px] w-full">
            <label className="mb-2 block text-sm font-medium text-white/80">
              Gender
            </label>
            <div
              className="flex rounded-xl p-1 bg-white"
              style={{
                // backgroundColor: INPUT_BG,
                border: `1px solid ${BORDER_SUBTLE}`,
              }}
            >
            {(["Male", "Female", "Other"] as const).map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGender(g)}
                className="cursor-pointer flex-1 py-2.5 text-sm font-medium rounded-lg transition-all"
                style={
                  gender === g
                    ? {
                        // background: GOLD_GRADIENT,
                        color: "#C39936",
                        border: "1px solid #C39936",
                        boxShadow: "0 2px 8px rgba(197, 139, 0, 0.35)",
                      }
                    : { color: "rgba(0,0,0,0.9)" }
                }
              >
                {g}
              </button>
            ))}
            </div>
          </div>

          {/* About Me */}
          <div className="mt-[16px] w-full">
            <label className="mb-1.5 block text-sm font-medium text-white/80">
              About Me
            </label>
            <Textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="I'm a believer who finds peace in..."
              maxLength={300}
              rows={4}
              className="w-full rounded-xl border-0 bg-white text-black placeholder:text-black/40 focus-visible:ring-2 focus-visible:ring-amber-500/40 resize-y min-h-[100px] shadow-none"
            />
            <p className="mt-1.5 text-right text-sm text-white/80">
              {bio.length} / 300 characters
            </p>
          </div>

          {/* Next */}
          <Button
            onClick={handleSave}
            disabled={saving}
            className="cursor-pointer w-full text-base h-[52px] mt-[30px] rounded-[12px] md:rounded-[8px] bg-gradient-to-r from-[#c58b00] via-[#f5d76e] to-[#c58b00] text-[#913C01] font-semibold hover:opacity-90 transition disabled:opacity-60">
            {saving ? "Saving..." : "Save & next"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
