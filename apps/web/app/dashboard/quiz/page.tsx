import { Card, CardContent } from '@repo/ui'
import { ChevronLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className="bg-[url('/images/bg_blue.jpg')] bg-no-repeat bg-cover bg-center min-h-screen flex sm:items-center items-start justify-center px-4 py-[50px] sm:py-4">
      <Card className="md:d-block md:bg-[url('/images/bg_auth_center.png')] py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
        <CardContent className="flex items-center flex-col gap-3 sm:p-10 px-3 text-left">
          <div className="text-left text-white w-full">
            <Link href={'/'}>
              <ChevronLeft />
            </Link>
          </div>
          {/* Back */}
          <Image src="/images/match.png" alt="back" width={210} height={192} />
          {/* Title */}
          <h2 className="text-[24px] font-serif text-white font-normal text-center w-full">
            Discover your Match!
          </h2>
          <p>Your traits reveal timeless patterns that shape how we lead, love, and serve. Let us guide you through this discovery.</p>

          
        </CardContent>
      </Card>
    </div>
  )
}

export default page