"use client";

import { useProfileStore } from "@/store/profileStore";
import { useIdentityStore } from "@/store/identityStore";
import { Button, Card, CardContent, Dialog, DialogContent } from "@repo/ui";
import {
  ChevronLeft,
  MapPin,
  Undo2,
  Church,
  BookOpen,
  Heart,
  Landmark,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper"; // ✅ FIXED

import "swiper/css";
import "swiper/css/pagination";

const ACCENT = "#C39936";

export default function ViewProfilePage() {
  const [open, setOpen] = useState(false);

  const { name, age, location } = useProfileStore();

  const {
    profileImages = [],
    aboutMe = "", // ✅ SAFE DEFAULT
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
      { key: "smoking", label: "Smoking", value: smoking, image: "/images/smoke.png" },
      { key: "alcohol", label: "Alcohol", value: alcohol, image: "/images/drink.png" },
      { key: "diet", label: "Diet", value: diet, image: "/images/dietplan.png" },
    ],
    [smoking, alcohol, diet]
  );

  const faithDetails = [
    { icon: "/images/icons/church.png", label: "Church Involvement", value: "Member" },
    { icon: "/images/icons/book.png", label: "Years in Faith", value: "5 years" },
    { icon: "/images/icons/church-2.png", label: "Attendance", value: "Weekly" },
    { icon: "/images/icons/kindness.png", label: "My Values", value: "Kindness" },
    { icon: "/images/icons/partner.png", label: "Partner Values", value: "Forgiveness" },
    { icon: "/images/icons/denomination.png", label: "Denomination", value: "Non-denominational" },
  ];

  return (
    <>
      <div className="bg-[url('/images/bg_blue.jpg')] bg-cover min-h-screen flex justify-center">
        <Card className="w-full max-w-[620px] bg-transparent border-0">
          <CardContent className="flex flex-col sm:p-10 px-0">

            {/* Back */}
            <Link href="/profile" className="text-white mb-4">
              <ChevronLeft />
            </Link>

            {/* Swiper */}
            <Swiper
              onSwiper={onSwiper}
              onSlideChange={onSlideChange}
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 3000 }}
              pagination={{ clickable: true }}
            >
              {profileImages.map((src, i) => (
                <SwiperSlide key={i}>
                  <img src={src} className="rounded-2xl w-full" />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Name */}
            <div className="text-white mt-4">
              <h2 className="text-xl">{name}, {age}</h2>
              <p className="flex items-center gap-1">
                <MapPin size={14} /> {location}
              </p>
            </div>

            {/* About */}
            <div className="bg-white rounded-xl p-4 mt-4">
              <p>{aboutMe}</p>
            </div>

            {/* Faith */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              {faithDetails.map((item, i) => (
                <div key={i} className="bg-white p-3 rounded-xl">
                  <img src={item.icon} className="w-6 mb-2" />
                  <p className="text-sm">{item.label}</p>
                  <p className="font-semibold">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Lifestyle */}
            <div className="bg-white rounded-xl p-4 mt-4">
              {lifestylePills.map((item) => (
                <div key={item.key} className="flex gap-2 items-center">
                  <Image src={item.image} alt="" width={16} height={16} />
                  <span>{item.label}: {item.value}</span>
                </div>
              ))}
            </div>

            {/* Map */}
            <iframe
              src="https://www.google.com/maps"
              width="100%"
              height="200"
              style={{ border: "0" }} // ✅ FIXED
            />

            {/* Buttons */}
            <div className="flex gap-2 mt-6">
              <Button className="flex-1 bg-white text-black">
                <Undo2 /> Back
              </Button>

              <Button
                onClick={() => setOpen(true)}
                className="flex-1 bg-yellow-400"
              >
                Connect
              </Button>
            </div>

          </CardContent>
        </Card>
      </div>

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="text-center p-6">
          <img src="/images/connect.png" className="mx-auto w-32" />

          <h2 className="text-xl font-semibold mt-4">
            Daily Limit Reached
          </h2>

          <p className="text-sm mt-2">
            You've reached today's limit.
          </p>

          <Button className="mt-4 w-full">
            Upgrade
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}