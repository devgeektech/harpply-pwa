import { Button, Card, CardContent } from '@repo/ui'
import { Dot, Search } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const Memberblock = () => {
  return (
    <div className="flex sm:items-center items-start justify-center sm:px-4 px-0 pb-[50px] md:py-[70px] sm:py-4 w-full">
      <Card className="md:d-block md:bg-[url('/images/bg_auth_center.png')] py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent overflow-hidden md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
        <CardContent className="flex flex-col gap-2 sm:p-10 sm:px-6 px-0 text-left h-[80vh] sm:h-auto">
            <h1 className='text-white w-full text-center text-[1.5rem] pb-[2rem] mb-[2rem] border-b-2 border-[#FAF7EF14]'>Block Member</h1>
          <div className="flex items-center justify-center">
            <Image
              src="/images/blockicon.png"
              alt="blockicon"
              width={62}
              height={62}
            />
          </div>
          <div className="flex flex-col gap-2 items-center justify-center sm:mt-[30px] mt-[20px]">
            <h2 className="text-white text-[24px] font-normal font-serif">
            Block This Member?
            </h2>
            <p className="text-white text-[14px] font-light text-center sm:mb-[32px] mb-[20px] max-w-[480px]">
            You will no longer see or communicate with this member. This action helps maintain a secure environment.
            </p>
            <Button className="cursor-pointer w-full text-base h-[52px] mt-[12px] rounded-[12px] md:rounded-[8px] bg-gradient-to-r from-[#c58b00] via-[#f5d76e] to-[#c58b00] text-[#913C01] font-semibold hover:opacity-90 transition disabled:opacity-60">
            Confirm Block
            </Button>
            <Button className="cursor-pointer w-full text-base hover:bg-gradient-to-r from-[#c58b00] via-[#f5d76e] to-[#c58b00] border-1  border-solid border-[#913C01] h-[52px] mt-[12px] rounded-[12px] md:rounded-[8px] bg-transparent text-[#913C01] font-semibold hover:opacity-90 transition disabled:opacity-60">
            Cancel
            </Button>
            <p className='w-full text-center text-sm font-light text-white mt-[20px]'>Harpply Privacy & Safety</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Memberblock