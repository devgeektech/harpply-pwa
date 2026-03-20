"use client";

import { useProfileStore } from "@/store/profileStore";
import { useIdentityStore } from "@/store/identityStore";
import { Button, Card, CardContent, Dialog, DialogContent } from "@repo/ui";
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
  Undo,
  Undo2,
  Link2Off,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
// import type { Swiper as SwiperType } from "swiper";

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


interface LimitModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}


export default function ViewProfilePage() {
  const [open, setOpen] = useState(false);
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

  const faithDetails = [
    {
      icon: "/images/icons/church.png",
      label: "Church Involvement",
      value: "Member",
    },
    {
      icon: "/images/icons/book.png",
      label: "Years in Faith",
      value: "5 years",
    },
    {
      icon: "/images/icons/church-2.png",
      label: "Church Attendance Frequency",
      value: "Weekly",
    },
    {
      icon: "/images/icons/kindness.png",
      label: "My Faith Values",
      value: "Kindness",
    },
    {
      icon: "/images/icons/partner.png",
      label: "Partner Values",
      value: "Forgiveness",
    },
    {
      icon: "/images/icons/denomination.png",
      label: "Denomination",
      value: "Non-denominational",
    },
  ];

  return (
    <>
    <div className="view-profile bg-[url('/images/bg_blue.jpg')] bg-no-repeat bg-cover bg-center min-h-screen flex items-center justify-center sm:px-4 px-0">
    <Card className=" md:d-block md:bg-[url('/images/bg_auth_center.png')] pt-0 sm:py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
      <CardContent className="flex items-center flex-col sm:p-10 px-0 text-left">
      {/* Top nav - back */}
      <div className="flex items-center px-0 pt-0 pb-2 w-full">
        <Link
          href="/profile"
          className="flex items-center justify-center size-10 rounded-full text-white/90 hover:bg-white/10 transition-colors"
          aria-label="Back"
        >
          <ChevronLeft className="size-6" />
        </Link>
      </div>

      {/* Profile image swiper */} 
      <div className="pb-4 overflow-hidden w-full">
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
          slidesPerView={1.75}
        
          breakpoints={{
            300: {
              slidesPerView: 1.2,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 1.2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 1.2,
              spaceBetween: 20,
            },
            1199: {
              slidesPerView: 1.75,
              spaceBetween: 20,
            },
          }}
        //   centeredSlides
          className="profile-swiper overflow-hidden"
          style={{ paddingBottom: 28, width: "100%" }}
        >
          {profileImages.map((src, i) => (
            <SwiperSlide key={i}>
            {/* <div className=""> */}
              <img
                src={src}
                alt={`Profile ${i + 1}`}
                // fill
                className="object-cover rounded-2xl h-full w-full"
                // sizes="(max-width: 640px) 100vw, 280px"
              />
            {/* </div> */}
          </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Name, age, location - light text on dark background */}
      <div className="pb-4 w-full text-center">
      <div className="flex justify-between items-center mb-3">

          <div className="flex flex-col text-left">
            <h2 className="text-[24px] leading-[100%] font-light font-serif text-white text-left">Sarah Jensen</h2>
            <p className="text-base mt-1 leading-[100%] text-white text-left flex items-center gap-2"><MapPin className="size-4" /> New York, NY</p>
          </div>
        <div className="text-right text-[#C39936]">
            <p className="text-[1rem] font-semibold">94%</p>
            <p className="text-xs tracking-wider">COMPATIBLE</p>
        </div>
      </div>

      </div>
        <hr/>
      {/* About Me */}
      <div className="mb-5 w-full bg-white rounded-2xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-normal uppercase tracking-wider text-[#C8A851]">
            About Me
          </span>
        </div>
        <p className="text-sm leading-[160%] text-black tracking-wider font-light italic">{aboutMe}</p>
      </div>

      {/* Faith & Lifestyle card */}
      <div className="w-full">
        <h2 className="text-[20px] font-normal mb-2 text-white" >
            Faith
        </h2>

        <div className="grid md:grid-cols-3 grid-cols-2 md:gap-8 gap-4 mb-4">
          {faithDetails.map((item, index) => (
            <div key={index} className="flex flex-col items-start gap-3 bg-white rounded-2xl p-4">
              
              <img
                src={item.icon}
                alt={item.label}
                className="w-[35px] h-[35px]"
              />

              <div>
                <p className="text-sm text-gray-500">{item.label}</p>
                <p className="text-base font-semibold text-black">
                  {item.value}
                </p>
              </div>

            </div>
          ))}
        </div>

      <h2 className="text-[20px] font-normal mb-2 text-white" >
          Faith & Lifestyle
      </h2>
        <Card className="py-0 bg-[#FBFAF9] rounded-b-xl border-0 shadow-xl bg-white overflow-hidden">
          <CardContent className="sm:p-5 p-[12px] pt-6 text-left">
            <ul className="space-y-4">
              {/* Lifestyle Habits with pills */}
              <li className="flex sm:items-center items-start gap-3">
                <div className="min-w-0 flex-1">

                  <div className="flex items-start flex-col">
                    {lifestylePills.map(({ key, label, value, image }) => (
                      <span
                        key={key}
                        className="flex items-center gap-3 px-3 py-1.5 rounded-full text-base font-normal text=[#1A1A1A]"
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
        <h2 className="text-[20px] font-normal mb-2 text-white  mt-4">
          Location
      </h2>
      <div className="rounded-2xl overflow-hidden">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3431.519535683644!2d76.73540348687996!3d30.675655322941196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fec06a86ddf67%3A0x74b5e9c7ee9369ba!2sBestech%20Business%20Tower!5e0!3m2!1sen!2sin!4v1773830248006!5m2!1sen!2sin" width="100%" height="250" style={{border:"0;"}} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>

      </div>
      </div>

      {/* Edit Profile button - fixed at bottom */}
      <div className="w-full flex flex-row gap-2 pt-6">
  <Button
    className="flex-1 cursor-pointer text-base h-[52px] rounded-[12px] md:rounded-[8px] 
    bg-white text-[#1A1A1A] font-semibold hover:opacity-80 hover:bg-white/80 transition flex items-center justify-center gap-2"
  >
    <Undo2 />
    <span className="text-base font-medium text-[#1A1A1A]">Back</span>
  </Button>

  <Button onClick={() => setOpen(true)}
    className="flex-1 cursor-pointer text-base h-[52px] rounded-[12px] md:rounded-[8px] 
    bg-[linear-gradient(90deg,#964400_0%,#F3D35D_25%,#F3D35D_50%,#8C4202_100%)] 
    text-[#913C01] font-semibold hover:opacity-90 transition disabled:opacity-60 
    flex items-center justify-center gap-2"
  >
    <img src="/images/heart.png" alt="edit" />
    <span className="text-base font-medium text-[#913C01]">Connect</span>
  </Button>
</div>
    </CardContent>
      </Card>
    </div>



    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-gradient-to-b from-[#140034] to-[#01010D] border-none max-w-sm  rounded-2xl text-center p-8 shadow-[0px_4px_4px_0px_#00000014]">

        {/* Icon */}
        <div className="flex justify-center">
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center">
              <img src="/images/connect.png" alt="connect" className="w-[185px] h-[185px]" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-white text-2xl font-semibold mt-6">
          Daily Connect Limit Reached
        </h2>

        {/* Description */}
        <p className="text-white/80 mt-4 text-sm leading-relaxed">
          You've reached today's discovery limit.  
          Take this time to reflect on your connections.
        </p>

        {/* Button */}
        <Button
          className="mt-6 w-full h-[50px] rounded-xl text-base font-semibold
          bg-gradient-to-r from-[#964400] via-[#F3D35D] to-[#8C4202] text-[#6B3E00]"
        >
          Upgrade Plan
        </Button>

        {/* Bottom Text */}
        <p className="mt-4 text-[#F59E0B] text-sm cursor-pointer">
          Come Back Tomorrow
        </p>

      </DialogContent>
    </Dialog>
    </>
  );
}
