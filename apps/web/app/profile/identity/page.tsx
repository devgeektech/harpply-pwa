"use client";

import { useEffect, useState } from "react";
import { useProfileStore } from "@/store/profileStore";
import { useIdentityStore } from "@/store/identityStore";
import { Button, Card, CardContent } from "@repo/ui";
import {
  ChevronLeft,
  MapPin,
  Pencil,
  Check,
  Church,
  BookOpen,
  Heart,
  Landmark,
  Popcorn,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { fetchProfile, fetchProfilePhotos } from "@/lib/api/profile";

import "swiper/css";
import "swiper/css/pagination";

const ACCENT = "#C39936";
const BULLET_INACTIVE = "#3d3a4a";
const BG_DARK = "#130F26";
const TEXT_PRIMARY = "#1F1D2B";
const TEXT_MUTED = "#6E6C7E";

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

const faithIconMap: Record<string, React.ReactNode> = {
  church: <Church className="size-8 shrink-0" style={{ color: ACCENT }} />,
  scroll: <BookOpen className="size-8 shrink-0" style={{ color: ACCENT }} />,
  attendance: <Church className="size-8 shrink-0" style={{ color: ACCENT }} />,
  hands: <Heart className="size-8 shrink-0" style={{ color: ACCENT }} />,
  heart: <Heart className="size-8 shrink-0" style={{ color: ACCENT }} />,
  denomination: <Landmark className="size-8 shrink-0" style={{ color: ACCENT }} />,
};

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
    hydrateFromApi,
    loaded,
  } = useProfileStore();
  const { profileImages, setActiveSlideIndex, setProfileImages } = useIdentityStore();
  const s3PublicUrl = process.env.NEXT_PUBLIC_AWS_S3_URL ?? "";
  const [photosLoaded, setPhotosLoaded] = useState(false);

  useEffect(() => {
    setPhotosLoaded(false);
    if (!loaded) {
      fetchProfile()
        .then((res) => {
          if (res?.data) {
            hydrateFromApi(res.data);
          }
        })
        .catch(() => {});
    }

    fetchProfilePhotos()
      .then((res) => {
        const keys = res?.photos ?? [];
        const images = keys
          .map((key) => buildPhotoSrc(s3PublicUrl, key))
          .filter(Boolean);
        setProfileImages(images);
      })
      .catch(() => {})
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

  const lifestylePills = useMemo(
    () => [
      {
        key: "smoking",
        label: smokingPreference || "N/A",
        image: "/images/smoke.png",
      },
      {
        key: "alcohol",
        label: alcoholPreference || "N/A",
        image: "/images/drink.png",
      },
      {
        key: "diet",
        label: dietaryPreference || "N/A",
        image: "/images/dietplan.png",
      },
    ],
    [smokingPreference, alcoholPreference, dietaryPreference]
  );

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

              {/* Faith & Lifestyle card shimmer */}
              <div className="w-full">
                <div className="rounded-t-3xl py-0 bg-white/5 rounded-b-xl border-0 shadow-xl overflow-hidden relative">
                  {/* Full-card shimmer behind the skeleton rows */}
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    style={{
                      width: "60%",
                      left: "-60%",
                      animation: "identity-shimmer 1.2s ease-in-out infinite",
                    }}
                  />
                  <div className="relative p-5 pt-6 text-left">
                    <ShimmerBox className="h-6 w-2/3 mb-5 rounded-md" />
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
                  href="/dashboard"
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

              {/* Faith & Lifestyle card */}
              <div className="w-full">
                <Card className="rounded-t-3xl py-0 bg-[#FBFAF9] rounded-b-xl border-0 shadow-xl bg-white overflow-hidden">
                  <CardContent className="sm:p-5 p-[12px] pt-6 text-left">
                    <h2 className="text-[20px] font-normal font-serif mb-5 text-[#1A1a1a]">
                      Faith & Lifestyle
                    </h2>

                    <ul className="space-y-4">
                      {faithLifestyle.map((item) => (
                        <li key={item.title} className="flex items-center gap-3">
                          <span className="mt-0.5 shadow-[0px_0px_4px_0px_#0000001A] rounded-[12px] bg-white min-w-[60px] min-h-[60px] flex items-center justify-center">
                            {faithIconMap[item.icon] ?? (
                              <Church className="w-full h-full object-cover text-[#C39936]" />
                            )}
                          </span>
                          <div className="min-w-0">
                            <p className="text-base font-medium text-[#1A1a1a]">{item.title}</p>
                            <p className="text-sm text-[#1A1A1A]">{item.value}</p>
                          </div>
                        </li>
                      ))}

                      {/* Lifestyle Habits with pills */}
                      <li className="flex sm:items-center items-start gap-3">
                        <span className="mt-0.5 shadow-[0px_0px_4px_0px_#0000001A] rounded-[12px] bg-white min-w-[60px] min-h-[60px] flex items-center justify-center">
                          <Popcorn className="size-5 shrink-0  text-[#C39936]" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-base font-medium mb-2 text-[#1A1a1a]">
                            Lifestyle Habits
                          </p>
                          <div className="flex flex-wrap sm:items-center items-start sm:flex-row flex-col gap-2">
                            {lifestylePills.map(({ key, label, image }) => (
                              <span
                                key={key}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-normal"
                              >
                                <Image src={image} alt={key} width={16} height={16} />
                                {label}
                              </span>
                            ))}
                          </div>
                        </div>
                      </li>
                    </ul>
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
