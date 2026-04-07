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
import {
  fetchProfile,
  fetchProfilePhotos,
  updateBasicProfile,
} from "@/lib/api/profile";
import {
  fetchCityStateFromPlaceId,
  fetchGooglePlaceSuggestions,
  type PlaceSuggestion,
} from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { SUCCESS_MESSAGES } from "@/lib/messages/success-messages";

const CARD_BG = "#1A0A26";
const GOLD_GRADIENT =
  "linear-gradient(135deg, #c58b00 0%, #e8b923 50%, #c58b00 100%)";
const INPUT_BG = "rgba(255,255,255,0.06)";
const BORDER_SUBTLE = "rgba(255,255,255,0.12)";
const MIN_AGE = 18;
const MAX_AGE = 100;

function buildPhotoSrc(s3PublicUrl: string, key: string): string {
  const safeKey = key?.toString?.().trim() ?? "";
  if (!safeKey) return "/images/accountCircle.png";
  if (/^https?:\/\//i.test(safeKey)) return safeKey;
  const base = (s3PublicUrl ?? "").replace(/\/$/, "");
  if (!base) return "/images/accountCircle.png";
  return `${base}/${safeKey.replace(/^\/+/, "")}`;
}

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
  const [nameError, setNameError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [bioError, setBioError] = useState("");
  const s3PublicUrl = process.env.NEXT_PUBLIC_AWS_S3_URL ?? "";
  const [firstProfilePhotoSrc, setFirstProfilePhotoSrc] = useState<string | null>(
    null,
  );
  const [locationSuggestions, setLocationSuggestions] = useState<PlaceSuggestion[]>(
    [],
  );
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [loadingLocationSuggestions, setLoadingLocationSuggestions] =
    useState(false);
  const [locationInputDirty, setLocationInputDirty] = useState(false);
  const locationContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loaded) {
      fetchProfile()
        .then((res) => {
          if (res?.data) hydrateFromApi(res.data);
        })
        .catch(() => { });
    }

    // Edit Profile needs a single preview image; it uses the first element
    // from `/profile/photos` (if any). Otherwise keep the existing placeholder.
    fetchProfilePhotos()
      .then((res) => {
        const firstKey = res?.photos?.[0];
        setFirstProfilePhotoSrc(
          firstKey ? buildPhotoSrc(s3PublicUrl, firstKey) : null,
        );
      })
      .catch(() => {
        // Keep placeholder on error.
        setFirstProfilePhotoSrc(null);
      });
  }, [loaded, hydrateFromApi, s3PublicUrl]);

  useEffect(() => {
    if (!locationInputDirty) return;

    const q = location.trim();
    if (!q) {
      setLocationSuggestions([]);
      setShowLocationSuggestions(false);
      setLoadingLocationSuggestions(false);
      return;
    }

    let cancelled = false;
    setLoadingLocationSuggestions(true);
    const timeoutId = window.setTimeout(() => {
      fetchGooglePlaceSuggestions(q)
        .then((results) => {
          if (cancelled) return;
          setLocationSuggestions(results);
          setShowLocationSuggestions(results.length > 0);
        })
        .catch(() => {
          if (cancelled) return;
          setLocationSuggestions([]);
          setShowLocationSuggestions(false);
        })
        .finally(() => {
          if (cancelled) return;
          setLoadingLocationSuggestions(false);
        });
    }, 250);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [location, locationInputDirty]);

  useEffect(() => {
    const onMouseDown = (event: MouseEvent) => {
      if (!locationContainerRef.current) return;
      const target = event.target as Node | null;
      if (target && !locationContainerRef.current.contains(target)) {
        setShowLocationSuggestions(false);
      }
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  const handleSelectLocationSuggestion = async (suggestion: PlaceSuggestion) => {
    const cityState = await fetchCityStateFromPlaceId(suggestion.placeId);
    setLocation(cityState || suggestion.text);
    setLocationSuggestions([]);
    setShowLocationSuggestions(false);
    setLocationInputDirty(false);
  };

  const handleSave = async () => {
    if (saving) return;
    const trimmedName = (name ?? "").trim();
    const trimmedBio = (bio ?? "").trim();
    const normalizedGender = (gender ?? "").toString().trim();

    let hasError = false;
    if (!trimmedName) {
      setNameError("Full name is required.");
      hasError = true;
    } else {
      setNameError("");
    }

    if (!age || Number.isNaN(Number(age))) {
      setAgeError("Age is required.");
      hasError = true;
    } else if (age < MIN_AGE || age > MAX_AGE) {
      setAgeError(`Age must be between ${MIN_AGE} and ${MAX_AGE}.`);
      hasError = true;
    } else {
      setAgeError("");
    }

    if (!normalizedGender) {
      setGenderError("Gender is required.");
      hasError = true;
    } else {
      setGenderError("");
    }

    if (!trimmedBio) {
      setBioError("About me is required.");
      hasError = true;
    } else {
      setBioError("");
    }

    if (hasError) return;
    setSaving(true);
    try {
      await updateBasicProfile({
        fullName: trimmedName,
        age: age || undefined,
        location: location || undefined,
        gender: normalizedGender.toLowerCase(),
        bio: trimmedBio,
      });
      toast.success(SUCCESS_MESSAGES.PROFILE.PROFILE_UPDATED);
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
                {firstProfilePhotoSrc ? (
                  <Image
                    width={130}
                    height={130}
                    src={firstProfilePhotoSrc}
                    alt="profile photo"
                    className="rounded-full object-cover"
                  />
                ) : (
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
                )}
              </Avatar>
              <Button
                type="button"
                aria-label="Edit profile photo"
                  onClick={() =>
                    router.push(
                      `/profile/managephoto?returnTo=${encodeURIComponent("/profile/edit")}`,
                    )
                  }
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
                onChange={(e) => {
                  setName(e.target.value);
                  if (nameError) setNameError("");
                }}
                placeholder="Full Name"
                className="
                h-[52px] rounded-[8px] 
                border border-[#C8A851]/18
                bg-[linear-gradient(160deg,rgba(200,168,81,0.10)_0%,rgba(35,22,58,0.85)_45%,rgba(18,10,35,0.92)_100%)]
                text-white placeholder:text-white/40
                focus-visible:border-[#C8A851]/60
                focus-visible:ring-0 focus-visible:ring-transparent"
              />
              {nameError && <p className="mt-1 text-sm text-red-300">{nameError}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-white/80">
                Age
              </label>
              <Input
                type="number"
                min={MIN_AGE}
                max={MAX_AGE}
                value={age || ""}
                onChange={(e) => {
                  const raw = e.target.value;
                  if (!raw) {
                    setAge(0);
                    if (ageError) setAgeError("");
                    return;
                  }
                  const n = Number(raw);
                  if (!Number.isFinite(n)) return;
                  setAge(Math.trunc(n));
                  if (n < MIN_AGE || n > MAX_AGE) {
                    setAgeError(`Age must be between ${MIN_AGE} and ${MAX_AGE}.`);
                  } else if (ageError) {
                    setAgeError("");
                  }
                }}
                placeholder="Age"
                className="
                h-[52px] rounded-[8px] 
                border border-[#C8A851]/18
                bg-[linear-gradient(160deg,rgba(200,168,81,0.10)_0%,rgba(35,22,58,0.85)_45%,rgba(18,10,35,0.92)_100%)]
                text-white placeholder:text-white/40
                focus-visible:border-[#C8A851]/60
                focus-visible:ring-0 focus-visible:ring-transparent"
              />
              {ageError && <p className="mt-1 text-sm text-red-300">{ageError}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-white/80">
                Location
              </label>
              <div
                ref={locationContainerRef}
                className="
                relative flex h-[52px] items-center gap-2 rounded-xl border border-[#C8A851]/18 px-3 bg-[linear-gradient(160deg,rgba(200,168,81,0.10)_0%,rgba(35,22,58,0.85)_45%,rgba(18,10,35,0.92)_100%)] focus-within:border-[#C8A851]/60
                focus-within:ring-0 transition-all duration-200"
              >
                <MapPin className="size-4 shrink-0 text-[#C39936]" />
                <Input
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                    setLocationInputDirty(true);
                  }}
                  onFocus={() => {
                    if (locationSuggestions.length > 0) setShowLocationSuggestions(true);
                  }}
                  placeholder="City, State"
                  className="h-[52px] rounded-[8px]  border-none bg-transparent text-white placeholder:text-white/40 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                {showLocationSuggestions && (
                  <div className="absolute left-0 top-full z-50 mt-1 w-full max-h-56 overflow-auto rounded-lg border border-white/20 bg-white shadow-lg">
                    {locationSuggestions.map((suggestion) => (
                      <button
                        key={suggestion.placeId}
                        type="button"
                        onClick={() => void handleSelectLocationSuggestion(suggestion)}
                        className="w-full cursor-pointer px-3 py-2 text-left text-sm text-black hover:bg-[#F7F1DE]"
                      >
                        {suggestion.text}
                      </button>
                    ))}
                    {!locationSuggestions.length && !loadingLocationSuggestions && (
                      <p className="px-3 py-2 text-sm text-black/60">No locations found</p>
                    )}
                    {loadingLocationSuggestions && (
                      <p className="px-3 py-2 text-sm text-black/60">Searching...</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Gender */}
          <div className="mt-[16px] w-full">
            <label className="mb-2 block text-sm font-medium text-white/80">
              Gender
            </label>
            <div
              className="flex rounded-xl p-1 bg-[linear-gradient(160deg,rgba(200,168,81,0.10)_0%,rgba(35,22,58,0.85)_45%,rgba(18,10,35,0.92)_100%)]"
              style={{
                // backgroundColor: INPUT_BG,
                border: `1px solid ${BORDER_SUBTLE}`,
              }}
            >
              {(["Male", "Female", "Other"] as const).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => {
                    setGender(g);
                    if (genderError) setGenderError("");
                  }}
                  className="cursor-pointer flex-1 py-2.5 text-sm focus:outline-none focus-visible:outline-none focus-visible:border-[#C8A851]/60 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:border-[#C8A851]/60 font-medium rounded-lg transition-all"
                  style={
                    gender === g
                      ? {
                        // background: GOLD_GRADIENT,
                        color: "#C39936",
                        border: "1px solid #C39936",
                        boxShadow: "0 2px 8px rgba(197, 139, 0, 0.35)",
                      }
                      : { color: "#ffffff" }
                  }
                >
                  {g}
                </button>
              ))}
            </div>
            {genderError && <p className="mt-1 text-sm text-red-300">{genderError}</p>}
          </div>

          {/* About Me */}
          <div className="mt-[16px] w-full">
            <label className="mb-1.5 block text-sm font-medium text-white/80">
              About Me
            </label>
            <Textarea
              value={bio}
              onChange={(e) => {
                setBio(e.target.value);
                if (bioError) setBioError("");
              }}
              placeholder="I'm a believer who finds peace in..."
              maxLength={300}
              rows={4}
              className="w-full rounded-xl border-[#C8A851]/18 bg-[linear-gradient(160deg,rgba(200,168,81,0.10)_0%,rgba(35,22,58,0.85)_45%,rgba(18,10,35,0.92)_100%)] text-white placeholder:text-white/40 focus-visible:border-[#C8A851]/60 focus-visible:ring-0 focus-visible:ring-transparent resize-y min-h-[100px] shadow-none"
            />
            {bioError && <p className="mt-1 text-sm text-red-300">{bioError}</p>}
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
