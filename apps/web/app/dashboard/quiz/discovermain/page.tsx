"use client"

import Image from "next/image"
import { Button, Card, CardContent } from "@repo/ui"
import { Heart, Star, X, Undo2, ArrowLeft, ChevronLeft } from "lucide-react"

export default function DiscoverMain() {
  return (
<div className="bg-[url('/images/bg_blue.jpg')] bg-repeat bg-cover bg-center min-h-screen flex sm:items-center items-start justify-center px-0 pb-[25px] py-[0px] sm:py-4 sm:px-4">
      <Card className="md:d-block md:bg-[url('/images/bg_auth_center.png')] py-0 bg-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
        <CardContent className="flex items-center flex-col gap-3 sm:p-10 px-0 text-left">
        {/* Back */}
        <div className="text-left text-white w-full mb-2 flex items-center justify-between ">
            <ChevronLeft className="text-white/70 cursor-pointer" />
        </div>

      {/* Profile Image */}
      <div className="relative overflow-hidden rounded-xl w-full">
        <Image
          src="/images/screen_1.jpg"
          alt="Sarah Jensen"
          width={550}
          height={300}
          className="w-full h-[280px] object-cover rounded-xl"
        />

        <div className="absolute top-3 right-3">
          <img src="/images/tickfill.png" alt="award" className="w-[24px] h-[24px]" />
        </div>
      </div>

      {/* Content */}
      <div className="text-center mt-6 w-full">
        <div className="flex justify-between items-center mb-3">

            <Button
            size="sm"
            className="cursor-pointer text-[#913C01] bg-gradient-to-r from-[#964400] via-[#F3D35D] to-[#8C4202]"
            >
            View Profile
            </Button>
            <div className="text-right text-[#C39936]">
                <p className="text-[1rem] font-semibold">94%</p>
                <p className="text-xs tracking-wider">COMPATIBLE</p>
            </div>
        </div>

        <div className="flex justify-center items-center">

          <div>
            <h2 className="text-[24px] font-normal font-serif text-white">Sarah Jensen</h2>
            <p className="text-base text-white mt-1">28 • Los Angeles, CA</p>
          </div>
        </div>
        <div className="text-center text-white text-base font-light mt-3">
            Guided by faith, looking for a meaningful connection rooted in shared values. I love...
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex justify-between mt-8 w-full">

        <div className="flex flex-col items-center gap-2">
          <Button
            variant="secondary"
            className="cursor-pointer w-[70px] sm:w-[100px] h-[54px] rounded-full bg-white text-black"
          >
            <Undo2 />
          </Button>
          <span className="text-xs text-white/70">Undo</span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <Button
            variant="outline"
            className="cursor-pointer w-[70px] sm:w-[100px] h-[54px] rounded-full bg-transparent border-white text-red-500"
          >
            <X />
          </Button>
          <span className="text-xs text-white/70">Pass</span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <Button
            variant="outline"
            className="cursor-pointer w-[70px] sm:w-[100px] h-[54px] rounded-full bg-transparent border-white text-[#C39936]"
          >
            <img src="/images/heartgradient.svg" alt="like" className="w-[20px] h-[20px]" />
          </Button>
          <span className="text-xs text-white/70">Like</span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <Button
            variant="secondary"
            className="cursor-pointer w-[70px] sm:w-[100px] h-[54px] rounded-full bg-white text-[#C39936]"
          >
            <img src="/images/stargradient.svg" alt="super" className="w-[20px] h-[20px]" />
          </Button>
          <span className="text-xs text-white/70">Super</span>
        </div>

      </div>
      </CardContent>
      </Card>
    </div>
  )
}