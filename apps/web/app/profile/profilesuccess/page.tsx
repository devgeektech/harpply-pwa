"use client"

import { Button, Card, CardContent } from "@repo/ui"
import { ArrowRight, ChevronLeft, ShieldCheck } from "lucide-react"
import Link from "next/link"

export default function ProfileCompletePage() {
  return (
    <div className="bg-[url('/images/bg_blue.jpg')] bg-no-repeat bg-cover bg-center min-h-screen flex  sm:items-center items-start justify-center px-4 py-[50px] sm:py-4">
      <Card className="md:d-block md:bg-[url('/images/bg_auth_center.png')] py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
        <CardContent className="flex flex-col md:gap-6 gap-3 sm:p-6 px-3 text-white">
        {/* Icon */}
        <div className="flex justify-center">
           <div className="w-[100px] h-[100px] rounded-full bg-[#F3EBDD] flex items-center justify-center">
            <div className="w-14 h-14 bg-[#C3993633] rounded-full flex items-center justify-center">
                <ShieldCheck className="text-[#C39936] w-8 h-8" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-white text-[24px] font-serif font-normal text-center">
          Your Profile Is Complete
        </h1>

        {/* Description */}
        <p className="text-white text-base font-light leading-relaxed mb-4 text-center">
          May your journey on Harpply bring you closer to a community of faith
          and purpose. Your path is now ready.
        </p>

        {/* Button */}
        <Button
          className="cursor-pointer w-full text-base h-[52px] mt-[12px] rounded-[12px] md:rounded-[8px] 
          bg-gradient-to-r from-[#c58b00] via-[#f5d76e] to-[#c58b00] text-[#913C01] font-semibold hover:opacity-90 transition disabled:opacity-60"
        >
          Start Discovering <ArrowRight size={16} />
        </Button>

        {/* Footer text */}
        <p className="text-white text-base uppercase text-center tracking-wide">
          WELCOME TO HARPPLY
        </p>
      </CardContent>
      </Card>
    </div>
  )
}