import { Button, Card, CardContent } from '@repo/ui'
import { ChevronLeft, Dot, Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Matchprofile = () => {
  return (
    <div className="flex sm:items-center h-[79vh] items-start justify-center sm:px-4 px-0 pb-[130px] md:py-[50px] sm:py-4 w-full">
      <Card className="md:d-block md:bg-[url('/images/bg_auth_center.png')] py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent overflow-hidden   md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
      <CardContent className="flex flex-col gap-2 sm:p-10 sm:px-6 px-0 text-left mt-[3rem] h-[80vh] sm:h-auto">
          <div className="flex items-center justify-center">
            <Image
              src="/images/unavailable.png"
              alt="connection"
              width={92}
              height={92}
              className=''
            />
          </div>
          <div className="flex flex-col gap-2 items-center justify-center sm:mt-[60px] mt-[20px]">
            <h2 className="text-white text-[24px] font-normal font-serif">
              This Profile Is Unavailable
            </h2>
            <p className="text-white text-[14px] font-light text-center sm:mb-[32px] mb-[20px] max-w-[400px]">
            This member is no longer accessible. They may have deactivated their account or changed their privacy settings.
            </p>
            <Button className="cursor-pointer w-full text-base h-[52px] mt-[12px] rounded-[12px] md:rounded-[8px] bg-gradient-to-r from-[#c58b00] via-[#f5d76e] to-[#c58b00] text-[#913C01] font-semibold hover:opacity-90 transition disabled:opacity-60">
              Return to Discovery
            </Button>
            <button className="cursor-pointer w-auto text-base h-auto mt-[12px] rounded-[12px] md:rounded-[8px]  text-[#913C01] font-semibold  transition">
              Contact Support
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Matchprofile