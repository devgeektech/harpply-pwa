"use client";

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

import "swiper/css";
import "swiper/css/pagination";

const ACCENT = "#C39936";
const BULLET_INACTIVE = "#3d3a4a";
const BG_DARK = "#130F26";
const TEXT_PRIMARY = "#1F1D2B";
const TEXT_MUTED = "#6E6C7E";

const faithIconMap: Record<string, React.ReactNode> = {
  church: <Church className="size-8 shrink-0" style={{ color: ACCENT }} />,
  scroll: <BookOpen className="size-8 shrink-0" style={{ color: ACCENT }} />,
  attendance: <Church className="size-8 shrink-0" style={{ color: ACCENT }} />,
  hands: <Heart className="size-8 shrink-0" style={{ color: ACCENT }} />,
  heart: <Heart className="size-8 shrink-0" style={{ color: ACCENT }} />,
  denomination: <Landmark className="size-8 shrink-0" style={{ color: ACCENT }} />,
};

export default function ProfileIdentityPage() {
  const { name, age, location } = useProfileStore();
  const {
    profileImages,
    aboutMe,
    faithLifestyle,
    smoking,
    alcohol,
    diet,
    setActiveSlideIndex,
  } = useIdentityStore();

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

  const lifestylePills = useMemo(
    () => [
      { key: "smoking", label: "Never", value: smoking, image: "/images/smoke.png" },
      { key: "alcohol", label: "Socially", value: alcohol, image: "/images/drink.png" },
      { key: "diet", label: "No Specific Diet", value: diet, image: "/images/dietplan.png" },
    ],
    [smoking, alcohol, diet]
  );

  return (
    <div className="bg-[url('/images/bg_blue.jpg')] bg-no-repeat bg-cover bg-center min-h-screen flex items-center justify-center px-4">
    <Card className=" md:d-block md:bg-[url('/images/bg_auth_center.png')] sm:py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
      <CardContent className="flex items-center flex-col sm:p-10 px-3 text-left">
      {/* Top nav - back */}
      <div className="flex items-center px-0 pt-4 pb-2 w-full">
        <Link
          href="/profile"
          className="flex items-center justify-center size-10 rounded-full text-white/90 hover:bg-white/10 transition-colors"
          aria-label="Back"
        >
          <ChevronLeft className="size-6" />
        </Link>
      </div>

      {/* Profile image swiper */}
      <div className="pb-4 w-full">
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
      </div>

      {/* Name, age, location - light text on dark background */}
      <div className="pb-4 w-full text-center">
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-[32px] font-serif flex items-center gap-2 font-normal tracking-tight text-white">
            {name} <Image src="/images/tick.png" alt="tick" width={26} height={26} />
          </h1>
          {/* <span
            className="size-2 rounded-full shrink-0"
            style={{ backgroundColor: ACCENT }}
            aria-hidden
          /> */}
        </div>
        <p className="text-base font-normal mt-0.5 text-[#C39936]">{age} • Male</p>
        <div className="flex items-center justify-center gap-1.5 mt-1">
          <MapPin className="size-4 shrink-0 text-[#C39936]" style={{ color: ACCENT }} />
          <span className="text-base font-normal uppercase tracking-wider text-[#C39936]">
            {location.toUpperCase()}
          </span>
        </div>
      </div>
        <hr/>
      {/* About Me */}
      <div className="pb-5 w-full">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-light uppercase tracking-wider text-[#C8A851]">
            About Me
          </span>
          <button
            type="button"
            className="p-1 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Edit about me"
          >
            <Pencil className="size-4" style={{ color: ACCENT }} />
          </button>
        </div>
        <p className="text-sm leading-[160%] text-white tracking-wider font-light italic">{aboutMe}</p>
      </div>

      {/* Faith & Lifestyle card */}
      <div className="w-full">
        <Card className="rounded-t-3xl py-0 bg-[#FBFAF9] rounded-b-xl border-0 shadow-xl bg-white overflow-hidden">
          <CardContent className="sm:p-5 p-[12px] pt-6 text-left">
            <h2
              className="text-[20px] font-normal font-serif mb-5 text-[#1A1a1a]"
            >
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
                    <p
                      className="text-base font-medium text-[#1A1a1a]"
                    >
                      {item.title}
                    </p>
                    <p className="text-sm text-[#1A1A1A]">
                      {item.value}
                    </p>
                  </div>
                </li>
              ))}

              {/* Lifestyle Habits with pills */}
              <li className="flex sm:items-center items-start gap-3">
                <span className="mt-0.5 shadow-[0px_0px_4px_0px_#0000001A] rounded-[12px] bg-white min-w-[60px] min-h-[60px] flex items-center justify-center">
                  <Popcorn className="size-5 shrink-0  text-[#C39936]" />
                </span>
                <div className="min-w-0 flex-1">
                  <p
                    className="text-base font-medium mb-2 text-[#1A1a1a]"
                  >
                    Lifestyle Habits
                  </p>
                  <div className="flex flex-wrap sm:items-center items-start sm:flex-row flex-col gap-2">
                    {lifestylePills.map(({ key, label, value, image }) => (
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
    </CardContent>
      </Card>
    </div>
  );
}
