"use client";

import { useEffect, useState } from "react";
import { useProfileStore } from "@/store/profileStore";
import { useIdentityStore } from "@/store/identityStore";
import { Button, Card, CardContent, cn } from "@repo/ui";
import {
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  Cross,
  Heart,
  MapPin,
  Pencil,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { fetchProfile, fetchProfilePhotos } from "@/lib/api/profile";
import {
  getEverydayLifeReviewItems,
  getEverydayQuestionLucideIcon,
} from "@/data/everydayLifeQuestions";
import { faithValueLabelForStored } from "@/data/myFaithValues";

import "swiper/css";
import "swiper/css/pagination";
import ChurchIcon from "@/icons/chruch";
import Bookfaith from "@/icons/bookfaith";
import Chruchweekly from "@/icons/chruchweekly";
import Denomination from "@/icons/denomination";
import Faithvalues from "@/icons/faithvalues";
import Partnervalues from "@/icons/partnervalues";
import Lifestyle from "@/icons/lifestyle";

const ACCENT = "#C39936";

function buildPhotoSrc(s3PublicUrl: string, key: string): string {
  const safeKey = key?.toString?.().trim() ?? "";
  if (!safeKey) return "";
  if (/^https?:\/\//i.test(safeKey)) return safeKey;
  const base = (s3PublicUrl ?? "").replace(/\/$/, "");
  if (!base) return "";
  return `${base}/${safeKey.replace(/^\/+/, "")}`;
}

function ShimmerBox({ className }: { className: string }) {
  return (
    <div className={`relative overflow-hidden bg-white/5 ${className}`}>
      <div
        className="absolute top-0 bottom-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        style={{
          width: "60%",
          left: "-60%",
          animation: "identity-shimmer 1.2s ease-in-out infinite",
        }}
      />
    </div>
  );
}

function EverydayAccordionIcon({ questionId }: { questionId: string }) {
  const Icon = getEverydayQuestionLucideIcon(questionId);
  return <Icon className="size-[18px] shrink-0" strokeWidth={2} aria-hidden />;
}

export default function ProfileIdentityPage() {
  const {
    name,
    age,
    gender,
    location,
    bio,
    church,
    denomination,
    yearsInFaith,
    churchAttendance,
    myFaithValues,
    partnerValues,
    smokingPreference,
    alcoholPreference,
    dietaryPreference,
    relationshipHistory,
    haveChildren,
    wantChildren,
    openToPartnerWithChildren,
    freeTime,
    musicTaste,
    sportsPlayOrFollow,
    fitnessLifestyle,
    recharge,
    communicationStyle,
    favoriteFood,
    travelerType,
    travelStyle,
    perfectNightIn,
    showsOrMovies,
    dayToDay,
    hydrateFromApi,
    loaded,
  } = useProfileStore();
  const { profileImages, setActiveSlideIndex, setProfileImages } = useIdentityStore();
  const s3PublicUrl = process.env.NEXT_PUBLIC_AWS_S3_URL ?? "";
  const [photosLoaded, setPhotosLoaded] = useState(false);
  const [profileTab, setProfileTab] = useState<"faith" | "everyday">("faith");
  /** Which Everyday Life accordion row is open; `-1` = all collapsed. Default `0` = first open. */
  const [everydayOpenIndex, setEverydayOpenIndex] = useState(0);

  useEffect(() => {
    setPhotosLoaded(false);
    if (!loaded) {
      fetchProfile()
        .then((res) => {
          if (res?.data) {
            hydrateFromApi(res.data);
          }
        })
        .catch(() => { });
    }

    fetchProfilePhotos()
      .then((res) => {
        const keys = res?.photos ?? [];
        const images = keys
          .map((key) => buildPhotoSrc(s3PublicUrl, key))
          .filter(Boolean);
        setProfileImages(images);
      })
      .catch(() => { })
      .finally(() => setPhotosLoaded(true));
  }, [loaded, hydrateFromApi, setProfileImages, s3PublicUrl]);

  const isPageLoading = !loaded || !photosLoaded;

  const onSwiper = useCallback(
    (swiper: SwiperType) => {
      setActiveSlideIndex(swiper.activeIndex);
    },
    [setActiveSlideIndex]
  );

  const onSlideChange = useCallback(
    (swiper: SwiperType) => {
      setActiveSlideIndex(swiper.activeIndex);
    },
    [setActiveSlideIndex]
  );

  /* Previously: vertical list with large icons (faith + lifestyle). Replaced by grid + chip cards below.
  const faithLifestyle = useMemo(
    () => [
      { icon: "church" as const, title: "Church Involvement", value: church || "N/A" },
      {
        icon: "scroll" as const,
        title: "Years in Faith",
        value: yearsInFaith != null ? `${yearsInFaith} years` : "N/A",
      },
      {
        icon: "attendance" as const,
        title: "Church Attendance Frequency",
        value: churchAttendance || "N/A",
      },
      { icon: "hands" as const, title: "My Faith Values", value: myFaithValues || "N/A" },
      { icon: "heart" as const, title: "Partner Values", value: partnerValues || "N/A" },
      { icon: "denomination" as const, title: "Denomination", value: denomination || "N/A" },
    ],
    [
      church,
      yearsInFaith,
      churchAttendance,
      myFaithValues,
      partnerValues,
      denomination,
    ]
  );
  */

  const lifestyleHabitChips = useMemo(() => {
    const cap = (s: string) =>
      s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
    const smokingPhrase = (raw: string) => {
      const v = raw.trim().toLowerCase();
      if (!v || v === "n/a") return "";
      if (v === "never") return "Never smokes";
      if (v === "socially") return "Socially smokes";
      if (v === "regularly") return "Regularly smokes";
      return cap(raw);
    };
    const alcoholPhrase = (raw: string) => {
      const v = raw.trim().toLowerCase();
      if (!v || v === "n/a") return "";
      if (v === "never") return "Never drinks";
      if (v === "socially") return "Socially drinks";
      if (v === "regularly") return "Regularly drinks";
      return cap(raw);
    };
    const dietPhrase = (raw: string) => {
      const v = raw.trim();
      if (!v || v.toLowerCase() === "n/a") return "";
      return v;
    };
    return [
      {
        key: "smoking" as const,
        text: smokingPhrase(smokingPreference || ""),
        chipClass:
          "bg-[#1a3352] text-[#c5e2ff] border border-[#4a7ec0]/45 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
        image: "/images/smoke.png",
      },
      {
        key: "alcohol" as const,
        text: alcoholPhrase(alcoholPreference || ""),
        chipClass:
          "bg-[#143d34] text-[#b8f5e0] border border-[#3d9b7a]/45 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
        image: "/images/drink.png",
      },
      {
        key: "diet" as const,
        text: dietPhrase(dietaryPreference || ""),
        chipClass:
          "bg-[#362058] text-[#e4d4ff] border border-[#8b6ec4]/45 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
        image: "/images/dietplan.png",
      },
    ].filter((c) => c.text.length > 0);
  }, [smokingPreference, alcoholPreference, dietaryPreference]);

  const myFaithChipLabels = useMemo(
    () =>
      (myFaithValues ?? []).map((t) => faithValueLabelForStored(t)),
    [myFaithValues]
  );

  const partnerFaithChipLabels = useMemo(
    () =>
      (partnerValues ?? []).map((t) => faithValueLabelForStored(t)),
    [partnerValues]
  );

  const yearsInFaithLabel = useMemo(() => {
    if (yearsInFaith == null || yearsInFaith < 0) return "—";
    if (yearsInFaith === 0) return "Less than a year";
    if (yearsInFaith === 1) return "1 year";
    return `${yearsInFaith} years`;
  }, [yearsInFaith]);

  const everydayLifeItems = useMemo(
    () =>
      getEverydayLifeReviewItems({
        relationshipHistory,
        haveChildren,
        wantChildren,
        openToPartnerWithChildren,
        freeTime,
        musicTaste,
        sportsPlayOrFollow,
        fitnessLifestyle,
        recharge,
        communicationStyle,
        favoriteFood,
        travelerType,
        travelStyle,
        perfectNightIn,
        showsOrMovies,
        dayToDay,
      }),
    [
      relationshipHistory,
      haveChildren,
      wantChildren,
      openToPartnerWithChildren,
      freeTime,
      musicTaste,
      sportsPlayOrFollow,
      fitnessLifestyle,
      recharge,
      communicationStyle,
      favoriteFood,
      travelerType,
      travelStyle,
      perfectNightIn,
      showsOrMovies,
      dayToDay,
    ]
  );

  useEffect(() => {
    const n = everydayLifeItems.length;
    setEverydayOpenIndex((i) => {
      if (n === 0) return 0;
      if (i >= n) return 0;
      return i;
    });
  }, [everydayLifeItems.length]);

  const toggleEverydayAccordion = useCallback((idx: number) => {
    setEverydayOpenIndex((prev) => (prev === idx ? -1 : idx));
  }, []);

  return (
    <div className="bg-[url('/images/bg_blue.jpg')] bg-no-repeat bg-cover bg-center min-h-screen flex items-center justify-center px-4">
      <style>
        {`
          @keyframes identity-shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}
      </style>
      <Card className=" md:d-block md:bg-[url('/images/bg_auth_center.png')] sm:py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
        <CardContent className="flex items-center flex-col sm:p-10 px-3 text-left">
          {isPageLoading ? (
            <>
              {/* Top nav - back shimmer */}
              <div className="flex items-center px-0 pt-4 pb-2 w-full">
                <ShimmerBox className="size-10 rounded-full" />
              </div>

              {/* Profile image shimmer */}
              <div className="pb-4 w-full">
                <ShimmerBox className="aspect-[10/8] w-full mx-auto rounded-2xl" />
              </div>

              {/* Name, age, location shimmer */}
              <div className="pb-4 w-full text-center">
                <ShimmerBox className="h-9 w-3/4 mx-auto rounded-full" />
                <div className="mt-2">
                  <ShimmerBox className="h-5 w-1/2 mx-auto rounded-full" />
                </div>
                <div className="mt-2">
                  <ShimmerBox className="h-5 w-2/3 mx-auto rounded-full" />
                </div>
              </div>

              <hr className="w-full border-white/10" />

              {/* About Me shimmer */}
              <div className="pb-5 w-full">
                <ShimmerBox className="h-4 w-1/3 mb-4 rounded-full" />
                <ShimmerBox className="h-5 w-4/5 mb-3 rounded-md" />
                <ShimmerBox className="h-5 w-3/5 rounded-md" />
              </div>

              {/* Tab bar + card shimmer */}
              <div className="w-full space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <ShimmerBox className="h-14 rounded-t-2xl" />
                  <ShimmerBox className="h-14 rounded-t-2xl" />
                </div>
                <div className="rounded-t-3xl py-0 bg-white/5 rounded-b-xl border-0 shadow-xl overflow-hidden relative">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    style={{
                      width: "60%",
                      left: "-60%",
                      animation: "identity-shimmer 1.2s ease-in-out infinite",
                    }}
                  />
                  <div className="relative p-5 pt-6 text-left">
                    <div className="space-y-4">
                      {Array.from({ length: 6 }).map((_, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <ShimmerBox className="min-w-[60px] min-h-[60px] rounded-[12px]" />
                          <div className="min-w-0 flex-1">
                            <ShimmerBox className="h-4 w-4/5 mb-2 rounded-md" />
                            <ShimmerBox className="h-4 w-3/4 rounded-md" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Edit Profile button shimmer */}
              <div className="w-full pt-6 bg-gradient-to-t from-[#130F26] to-transparent ">
                <ShimmerBox className="w-full h-[52px] rounded-[12px] md:rounded-[8px]" />
              </div>
            </>
          ) : (
            <>
              {/* Top nav - back */}
              <div className="flex items-center px-0 pt-4 pb-2 w-full">
                <Link
                  href="/dashboard/quiz/introduction"
                  className="flex items-center justify-center size-10 rounded-full text-white/90 hover:bg-white/10 transition-colors"
                  aria-label="Back"
                >
                  <ChevronLeft className="size-6" />
                </Link>
              </div>

              {/* Profile image swiper */}
              <div className="pb-4 w-full">
                {profileImages.length > 0 ? (
                  <Swiper
                    onSwiper={onSwiper}
                    onSlideChange={onSlideChange}
                    modules={[Autoplay, Pagination]}
                    loop={true}
                    autoplay={{
                      delay: 3500,
                      disableOnInteraction: false,
                    }}
                    speed={600}
                    pagination={{
                      clickable: true,
                      bulletActiveClass: "opacity-100",
                      bulletClass: "swiper-bullet-custom",
                    }}
                    spaceBetween={10}
                    slidesPerView={1.25}
                    //   centeredSlides
                    className="profile-swiper"
                    style={{ paddingBottom: 28 }}
                  >
                    {profileImages.map((src, i) => (
                      <SwiperSlide key={i}>
                        <div className="relative aspect-square w-full h-full mx-auto">
                          <Image
                            src={src}
                            alt={`Profile ${i + 1}`}
                            fill
                            className="object-cover rounded-2xl"
                            sizes="280px"
                            unoptimized
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <ShimmerBox className="aspect-square w-full h-full mx-auto rounded-2xl" />
                )}
              </div>

              {/* Name, age, location - light text on dark background */}
              <div className="pb-4 w-full text-center">
                <div className="flex items-center justify-center gap-2">
                  <h1 className="text-[32px] font-serif flex items-center gap-2 font-normal tracking-tight text-white">
                    {name} <Image src="/images/tick.png" alt="tick" width={26} height={26} />
                  </h1>
                </div>
                <p className="text-base font-normal mt-0.5 text-[#C39936]">{age} • {gender}</p>
                <div className="flex items-center justify-center gap-1.5 mt-1">
                  <MapPin className="size-4 shrink-0 text-[#C39936]" style={{ color: ACCENT }} />
                  <span className="text-base font-normal uppercase tracking-wider text-[#C39936]">
                    {location ? location.toUpperCase() : "N/A"}
                  </span>
                </div>
              </div>

              <hr />
              {/* About Me */}
              <div className="pb-5 w-full">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-light uppercase tracking-wider text-[#C8A851]">
                    About Me
                  </span>
                </div>
                <p className="text-sm leading-[160%] text-white tracking-wider font-light italic">
                  {bio || "N/A"}
                </p>
              </div>

              {/* Profile detail tabs (below About Me) */}
              <div className="w-full" role="tablist" aria-label="Profile sections">
                <div className="grid grid-cols-2 gap-1.5 sm:gap-2 w-full">
                  <button
                    type="button"
                    role="tab"
                    id="tab-faith"
                    aria-selected={profileTab === "faith"}
                    aria-controls="panel-faith"
                    onClick={() => setProfileTab("faith")}
                    className={cn(
                      "relative flex flex-col items-stretch rounded-t-xl sm:rounded-t-2xl px-1.5 py-2.5 sm:px-3 sm:py-3 md:px-4 transition-colors",
                      "bg-white/[0.07] backdrop-blur-sm border border-white/[0.06]",
                      profileTab === "faith"
                        ? "text-[#C8A851]"
                        : "text-white/45 hover:text-white/60"
                    )}
                  >
                    <span className="flex items-center justify-center gap-1 sm:gap-2 text-[11px] sm:text-xs md:text-sm font-medium text-center leading-tight">
                      <Cross
                        className="size-3 sm:size-3.5 md:size-4 shrink-0"
                        strokeWidth={2.5}
                        aria-hidden
                      />
                      <span className="hidden min-[360px]:inline">Faith &amp; Lifestyle</span>
                      <span className="min-[360px]:hidden">Faith</span>
                    </span>
                    {profileTab === "faith" && (
                      <span
                        className="pointer-events-none absolute bottom-0 left-1/2 h-[3px] w-[72%] max-w-[140px] -translate-x-1/2 rounded-full bg-gradient-to-r from-[#964400] via-[#F3D35D] to-[#8C4202] shadow-[0_0_14px_rgba(243,211,93,0.55)]"
                        aria-hidden
                      />
                    )}
                  </button>
                  <button
                    type="button"
                    role="tab"
                    id="tab-everyday"
                    aria-selected={profileTab === "everyday"}
                    aria-controls="panel-everyday"
                    onClick={() => setProfileTab("everyday")}
                    className={cn(
                      "relative flex flex-col items-stretch rounded-t-xl sm:rounded-t-2xl px-1.5 py-2.5 sm:px-3 sm:py-3 md:px-4 transition-colors",
                      "bg-white/[0.07] backdrop-blur-sm border border-white/[0.06]",
                      profileTab === "everyday"
                        ? "text-[#C8A851]"
                        : "text-white/45 hover:text-white/60"
                    )}
                  >
                    <span className="flex items-center justify-center gap-1 sm:gap-2 text-[11px] sm:text-xs md:text-sm font-medium text-center leading-tight">
                      <Heart
                        className="size-3 sm:size-3.5 md:size-4 shrink-0"
                        strokeWidth={2}
                        fill="none"
                        aria-hidden
                      />
                      <span className="hidden min-[360px]:inline">Everyday Life</span>
                      <span className="min-[360px]:hidden">Everyday</span>
                    </span>
                    {profileTab === "everyday" && (
                      <span
                        className="pointer-events-none absolute bottom-0 left-1/2 h-[3px] w-[72%] max-w-[140px] -translate-x-1/2 rounded-full bg-gradient-to-r from-[#964400] via-[#F3D35D] to-[#8C4202] shadow-[0_0_14px_rgba(243,211,93,0.55)]"
                        aria-hidden
                      />
                    )}
                  </button>
                </div>

                <Card
                  className={cn(
                    "rounded-t-none rounded-b-2xl py-0 border-0 shadow-xl overflow-hidden -mt-px",
                    "border border-[#C8A851]/20 bg-gradient-to-b from-[#1a0f2e] via-[#150828] to-[#0f061c] shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
                  )}
                >
                  <CardContent className="text-left px-2.5 pt-3 pb-4 sm:px-4 sm:pt-4 sm:pb-5 md:px-5">
                    {profileTab === "faith" ? (
                      <div
                        id="panel-faith"
                        role="tabpanel"
                        aria-labelledby="tab-faith"
                        className="space-y-3 sm:space-y-4 md:space-y-5"
                      >
                        <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-2 sm:gap-2.5 md:gap-3">
                          {[
                            {
                              key: "involvement",
                              label: "Involvement",
                              value: church?.trim() ? church : "—",
                              icon: (
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center sm:h-9 sm:w-9 [&_svg]:max-h-[26px] [&_svg]:max-w-[26px] sm:[&_svg]:max-h-7 sm:[&_svg]:max-w-7">
                                  <ChurchIcon />
                                </span>
                              ),
                            },
                            {
                              key: "years",
                              label: "Years in faith",
                              value: yearsInFaithLabel,
                              icon: (
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center sm:h-9 sm:w-9 [&_svg]:max-h-[26px] [&_svg]:max-w-[26px] sm:[&_svg]:max-h-7 sm:[&_svg]:max-w-7">
                                  <Bookfaith />
                                </span>
                              ),
                            },
                            {
                              key: "attendance",
                              label: "Attendance",
                              value: churchAttendance?.trim() ? churchAttendance : "—",
                              icon: (
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center sm:h-9 sm:w-9 [&_svg]:max-h-[26px] [&_svg]:max-w-[26px] sm:[&_svg]:max-h-7 sm:[&_svg]:max-w-7">
                                  <Chruchweekly />
                                </span>
                              ),
                            },
                            {
                              key: "denomination",
                              label: "Denomination",
                              value: denomination?.trim() ? denomination : "—",
                              icon: (
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center sm:h-9 sm:w-9 [&_svg]:max-h-[26px] [&_svg]:max-w-[26px] sm:[&_svg]:max-h-7 sm:[&_svg]:max-w-7">
                                  <Denomination />
                                </span>
                              ),
                            },
                          ].map((cell) => (
                            <div
                              key={cell.key}
                              className="rounded-xl border border-[#C8A851]/18 bg-[linear-gradient(160deg,rgba(200,168,81,0.10)_0%,rgba(35,22,58,0.85)_45%,rgba(18,10,35,0.92)_100%)] p-2.5 sm:p-3 md:p-3.5 flex flex-col gap-1.5 sm:gap-2 min-h-0 sm:min-h-[100px] md:min-h-[108px] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                            >
                              <div className="text-[#C39936] [&_svg]:opacity-100">
                                {cell.icon}
                              </div>
                              <p className="text-[10px] leading-tight text-white/45 sm:text-[11px] md:text-xs">
                                {cell.label}
                              </p>
                              <p className="text-[13px] font-semibold text-white leading-snug sm:text-sm md:text-[15px] break-words">
                                {cell.value}
                              </p>
                            </div>
                          ))}
                        </div>

                        <div className="space-y-2.5 sm:space-y-3 md:space-y-3.5 pt-0.5">
                          <div className="rounded-xl border border-[#C8A851]/18 bg-[linear-gradient(165deg,rgba(200,168,81,0.08)_0%,rgba(40,28,62,0.75)_50%,rgba(22,14,40,0.9)_100%)] p-3 sm:p-3.5 md:p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                            <div className="mb-2 sm:mb-2.5 flex items-start gap-2 sm:gap-2.5">
                              <span className="flex h-8 w-8 shrink-0 items-center justify-center text-[#C39936] sm:h-9 sm:w-9 [&_svg]:max-h-6 [&_svg]:max-w-6 sm:[&_svg]:max-h-7 sm:[&_svg]:max-w-7">
                                <Faithvalues />
                              </span>
                              <p className="min-w-0 flex-1 pt-0.5 text-[10px] leading-snug text-[#c4b5dc]/90 sm:text-[11px] md:text-base">
                                My faith values
                              </p>
                            </div>
                            {myFaithChipLabels.length > 0 ? (
                              <div className="flex flex-wrap gap-1.5 sm:gap-2 pl-9 sm:pl-10 md:pl-11">
                                {myFaithChipLabels.map((label, i) => (
                                  <span
                                    key={`my-faith-${i}-${label}`}
                                    className="inline-flex items-center rounded-full border border-[#C8A851]/35 bg-[linear-gradient(180deg,rgba(243,211,93,0.18)_0%,rgba(120,52,8,0.35)_100%)] px-3 py-1.5 text-xs font-semibold text-[#fff5d6] shadow-sm sm:px-3.5 sm:py-2 sm:text-xs"
                                  >
                                    {label}
                                  </span> 
                                ))}
                              </div>
                            ) : (
                              <p className="pl-9 text-xs text-white/35 sm:pl-10 sm:text-sm">
                                —
                              </p>
                            )}
                          </div>

                          <div className="rounded-xl border border-[#9b7bc9]/22 bg-[linear-gradient(165deg,rgba(155,123,201,0.12)_0%,rgba(45,30,72,0.78)_55%,rgba(20,12,38,0.92)_100%)] p-3 sm:p-3.5 md:p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                            <div className="mb-2 sm:mb-2.5 flex items-start gap-2 sm:gap-2.5">
                              <span className="flex h-8 w-8 shrink-0 items-center justify-center text-[#C39936] sm:h-9 sm:w-9 [&_svg]:max-h-6 [&_svg]:max-w-6 sm:[&_svg]:max-h-7 sm:[&_svg]:max-w-7">
                                <Partnervalues />
                              </span>
                              <p className="min-w-0 flex-1 pt-0.5 text-[10px] leading-snug text-[#c4b5dc]/90 sm:text-[11px] md:text-base">
                                Partner values I seek
                              </p>
                            </div>
                            {partnerFaithChipLabels.length > 0 ? (
                              <div className="flex flex-wrap gap-1.5 sm:gap-2 pl-9 sm:pl-10 md:pl-11">
                                {partnerFaithChipLabels.map((label, i) => (
                                  <span
                                    key={`partner-faith-${i}-${label}`}
                                    className="inline-flex items-center rounded-full border border-[#a78bda]/40 bg-[linear-gradient(180deg,rgba(167,139,218,0.22)_0%,rgba(55,35,95,0.65)_100%)] px-3 py-1.5 text-xs font-semibold text-[#efe8ff] shadow-sm sm:px-3.5 sm:py-2 sm:text-xs"
                                  >
                                    {label}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <p className="pl-9 text-xs text-white/35 sm:pl-10 sm:text-sm">
                                —
                              </p>
                            )}
                          </div>

                          <div className="rounded-xl border border-[#C8A851]/16 bg-[linear-gradient(165deg,rgba(96,180,160,0.08)_0%,rgba(35,28,58,0.8)_45%,rgba(18,12,36,0.92)_100%)] p-3 sm:p-3.5 md:p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                            <div className="mb-2 sm:mb-2.5 flex items-start gap-2 sm:gap-2.5">
                              <span className="flex h-8 w-8 shrink-0 items-center justify-center text-[#C39936] sm:h-9 sm:w-9 [&_svg]:max-h-6 [&_svg]:max-w-6 sm:[&_svg]:max-h-7 sm:[&_svg]:max-w-7">
                                <Lifestyle />
                              </span>
                              <p className="min-w-0 flex-1 pt-0.5 text-[10px] leading-snug text-[#c4b5dc]/90 sm:text-[11px] md:text-base">
                                Lifestyle habits
                              </p>
                            </div>
                            {lifestyleHabitChips.length > 0 ? (
                              <div className="flex flex-wrap gap-1.5 sm:gap-2 pl-9 sm:pl-10 md:pl-11">
                                {lifestyleHabitChips.map((c) => (
                                  <span
                                    key={c.key}
                                    className={cn(
                                      "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium sm:gap-2 sm:px-3.5 sm:py-2 sm:text-xs",
                                      c.chipClass
                                    )}
                                  >
                                    <Image
                                      src={c.image}
                                      alt=""
                                      width={14}
                                      height={14}
                                      className="size-3.5 shrink-0 opacity-95 sm:size-4"
                                    />
                                    <span className="min-w-0">{c.text}</span>
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <p className="pl-9 text-xs text-white/35 sm:pl-10 sm:text-sm">
                                —
                              </p>
                            )}
                          </div>
                        </div>
                        {/* Previous Faith & Lifestyle UI: stacked rows with large icons + image-based lifestyle pills (replaced by grid + chip cards). */}
                      </div>
                    ) : (
                      <div
                        id="panel-everyday"
                        role="tabpanel"
                        aria-labelledby="tab-everyday"
                      >
                        {everydayLifeItems.length > 0 ? (
                          <div
                            className="overflow-hidden rounded-t-2xl rounded-b-xl border border-[#C8A851]/22 bg-gradient-to-b from-[#1e1438]/98 via-[#150a28]/98 to-[#0c0518]/98 shadow-[inset_0_1px_0_rgba(200,168,81,0.12)]"
                            role="presentation"
                          >
                            {everydayLifeItems.map((item, idx) => {
                              const isOpen = everydayOpenIndex === idx;
                              const panelId = `everyday-acc-panel-${idx}`;
                              const headerId = `everyday-acc-header-${idx}`;
                              return (
                                <div
                                  key={`${idx}-${item.questionId}`}
                                  className={cn(
                                    idx < everydayLifeItems.length - 1 &&
                                      "border-b border-[#C8A851]/12"
                                  )}
                                >
                                  <button
                                    type="button"
                                    id={headerId}
                                    className={cn(
                                      "flex w-full items-start gap-3 px-3 text-left transition-colors hover:bg-white/[0.04] sm:gap-3.5 sm:px-4",
                                      isOpen ? "pb-2 pt-3.5 sm:pt-4" : "py-3.5 sm:py-4"
                                    )}
                                    onClick={() => toggleEverydayAccordion(idx)}
                                    aria-expanded={isOpen}
                                    aria-controls={panelId}
                                  >
                                    <span
                                      className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#C8A851]/35 bg-[linear-gradient(145deg,rgba(200,168,81,0.16)_0%,rgba(35,22,58,0.92)_55%,rgba(18,10,38,0.96)_100%)] text-[#d4a84b] shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] sm:h-11 sm:w-11"
                                      aria-hidden
                                    >
                                      <EverydayAccordionIcon questionId={item.questionId} />
                                    </span>
                                    <span className="flex min-w-0 flex-1 items-start justify-between gap-2">
                                      <span className="min-w-0 flex-1 pr-1 text-[13px] font-normal leading-[1.45] text-[#c8bddc] sm:text-sm">
                                        {item.prompt}
                                      </span>
                                      {isOpen ? (
                                        <ChevronUp
                                          className="mt-0.5 size-[18px] shrink-0 text-[#C8A851]/90"
                                          strokeWidth={2}
                                          aria-hidden
                                        />
                                      ) : (
                                        <ChevronDown
                                          className="mt-0.5 size-[18px] shrink-0 text-[#a89bc4]/90"
                                          strokeWidth={2}
                                          aria-hidden
                                        />
                                      )}
                                    </span>
                                  </button>
                                  {isOpen && (
                                    <div
                                      id={panelId}
                                      role="region"
                                      aria-labelledby={headerId}
                                      className="flex gap-3 px-3 pb-4 pt-0 sm:gap-3.5 sm:px-4 sm:pb-5"
                                    >
                                      <span
                                        className="w-10 shrink-0 sm:w-11"
                                        aria-hidden
                                      />
                                      <p className="min-w-0 flex-1 pt-0.5 text-[15px] font-bold leading-[1.5] tracking-tight text-white sm:text-base break-words">
                                        {item.answerText}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <p className="rounded-xl border border-[#C8A851]/20 bg-gradient-to-b from-[#1e1438]/90 to-[#0f061c] px-4 py-6 text-center text-sm leading-relaxed text-[#c4b5dc]/90">
                            No everyday life answers yet. You can add them when you edit your profile.
                          </p>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Edit Profile button - fixed at bottom */}
              <div className="w-full pt-6 bg-gradient-to-t from-[#130F26] to-transparent ">
                <Button
                  className="cursor-pointer w-full text-base h-[52px] rounded-[12px] md:rounded-[8px] bg-[linear-gradient(90deg,#964400_0%,#F3D35D_25%,#F3D35D_50%,#8C4202_100%)] text-[#913C01] font-semibold hover:opacity-90 transition disabled:opacity-60"
                  asChild
                >
                  <Link href="/profile/edit">
                    <Pencil className="size-5" />
                    <span className="text-base font-medium text-[#913C01]">Edit Profile</span>
                  </Link>
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
