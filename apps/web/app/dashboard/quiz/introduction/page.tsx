"use client";

import { Button, Card, CardContent } from '@repo/ui'
import { ChevronLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const page = () => {
  const router = useRouter();
  
  return (
    <div className="sm:px-4 md:py-[50px] sm:py-4 py-0 min-h-screen">
      <Card className="md:d-block md:bg-[url('/images/bg_auth_center.png')] py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
        <CardContent className="flex items-center flex-col gap-3 sm:p-10 md:px-12 px-0 text-left">
          {/* Back */}
          <Image src="/images/match.png" alt="back" width={210} height={192} />
          {/* Title */}
          <h2 className="text-[32px] font-serif text-white font-light text-center w-full">
            Discover your Match!
          </h2>
          <p className='text-center text-white text-base font-light'>Your traits reveal timeless patterns that shape how we lead, love, and serve. Let us guide you through this discovery.</p>

          <Button
            type="submit"
           onClick={() => router.push("/dashboard/quiz/biblical-preferences")}
            className="cursor-pointer w-full text-base h-[52px] mt-[20px] rounded-[12px] md:rounded-[8px] bg-gradient-to-r from-[#c58b00] via-[#f5d76e] to-[#c58b00] text-[#913C01] font-semibold hover:opacity-90 transition disabled:opacity-60"
          >
            Begin Assessment
          </Button>
          <button className='text-white text-base font-medium cursor-pointer w-full text-center mt-4'>Skip for Now</button>
        </CardContent>
      </Card>
    </div>
  )
}

export default page