"use client"
import Image from "next/image"
import { Button, Dialog } from "@repo/ui"
import Link from "next/link"
import { ChevronLeft, SlidersHorizontal } from "lucide-react"
import { useState } from "react"
import NoProfilesModal from "@/components/no-profiles-modal"

const profiles = [
  {
    name: "Sarah",
    age: 28,
    denomination: "Catholic",
    compatibility: 98,
    awardImage: "/images/awardicon.png",
    image:
      "/images/screen_1.jpg",
    description:
      "Passionate about youth ministry and biblical hospitality. I find peace in quiet prayer and...",
  },
  {
    name: "David",
    age: 32,
    denomination: "Non-Denominational",
    compatibility: 94,
    awardImage: "/images/awardicon.png",
    image:
      "/images/screen_2.jpg",
    description:
      "Architect and community builder. I believe in stewardship of our talents for the Kingdom...",
  },
  {
    name: "Grace",
    age: 26,
    denomination: "Other",
    compatibility: 90,
    awardImage: "/images/awardicon.png",
    image:
      "/images/screen_1.jpg",
    description:
      "Devoted to family and church community. Loyalty and kindness are the pillars of my...",
  },
]


export default function DiscoverPage() {

  const [open, setOpen] = useState(true)

  return (
    <>
      <style jsx global>{`
        /* Apply only when body has 'no-scroll' class */
        body.no-scroll .no-scrollbar::-webkit-scrollbar {
          display: none;
        }

        body .no-scrollbar {
          -ms-overflow-style: none;  /* IE & Edge */
          scrollbar-width: none;     /* Firefox */
        }
          body:has(.no-scrollbar) {
            overflow: hidden;
          }
            .scroll-show {
              overflow-y: scroll;
            }
              .scrollbar-hide {
              -ms-overflow-style: none;  /* IE & Edge */
              scrollbar-width: none;     /* Firefox */
            }

            .scrollbar-hide::-webkit-scrollbar {
              display: none;             /* Chrome, Safari */
              -webkit-overflow-scrolling: touch !important;
            }
      `}</style>

      <div className="no-scrollbar overflow-auto h-screen max-w-[620px] w-full rounded-3xl border border-white/10 bg-[#0f0225]/60  border border border-white/10 backdrop-blur-xl my-6 space-y-6 no-scrollbar scroll-show">
        <div className="sticky top-0 z-10 m-0 sm:p-6 p-5 !pb-3 bg-[#0f0225] space-y-2">
          <div className="text-left text-white w-full flex items-center justify-between ">
            <Link href="/dashboard/quiz/introduction">
              <ChevronLeft size={24} />
            </Link>
            <Link href="/dashboard/quiz/filters">
              <SlidersHorizontal size={24} />
            </Link>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <span className="flex-shrink-0 px-3 py-1 rounded-full border border-[#C39936] bg-white text-base font-normal text-[#C39936] whitespace-nowrap">
              Denomination
            </span>

            <span className="px-3 py-1 rounded-full border border-white bg-white text-normal text-base text-[#1A1A1A] whitespace-nowrap">
              90% + Compatibility
            </span>

            <span className="px-3 py-1 rounded-full border border-white bg-white text-normal text-base text-[#1A1A1A] whitespace-nowrap">
              Near by
            </span>
          </div>
        </div>

        {/* Cards */}
        <div className="space-y-6 sm:p-6 p-5 !pt-0">
          {profiles.map((profile, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white overflow-hidden shadow-xl"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={profile.image}
                  alt={profile.name}
                  className="w-full max-h-[550px] object-cover"
                />

                {/* Denomination badge */}
                <span className="absolute top-3 left-3 bg-[#C39936] text-[#1A1A1A] text-[15px] px-3 py-1 rounded-full font-normal">
                  {profile.denomination}
                </span>

                {/* Compatibility */}
                <div className="absolute bottom-3 right-3 bg-[#191A17] text-[#C39936] text-sm px-3 py-2 rounded-lg">
                  Compatibility
                  <div className="font-bold text-[#C39936] text-[20px]">
                    {profile.compatibility}%
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-[20px] text-[#1A1A1A]">
                    {profile.name}, {profile.age}
                  </h3>
                  <img src={profile.awardImage} alt={profile.name} className="w-[1rem] h-[1rem]" />
                </div>
                <p className="text-base font-normal text-[#1A1A1A] line-clamp-2">
                  {profile.description}
                </p>

                <Button onClick={() => setOpen(true)} className="cursor-pointer w-full h-[56px] text-base bg-[linear-gradient(90deg,#964400_0%,#F3D35D_25%,#F3D35D_50%,#8C4202_100%)] text-[#913C01] font-medium rounded-[12px]">
                  View Compatible Profile
                </Button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* <NoProfilesModal open={open} setOpen={setOpen} /> */}

    </>
  )
}