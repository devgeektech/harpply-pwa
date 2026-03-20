"use client";
import GlobalModal from '@/components/common/common-modal'
import { useModalStore } from '@/store/modalStore'
import { Button, Card, CardContent } from '@repo/ui'
import { ChevronLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const ConfirmationPage = () => {

  const [open, setOpen] = useState(false);
  return (
    <>
    <div className="sm:px-4 md:py-[50px] sm:py-4 py-0 min-h-screen">
      <Card className="md:d-block md:bg-[url('/images/bg_auth_center.png')] py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
        <CardContent className="flex items-center flex-col gap-3 sm:p-10 md:px-12 px-0 text-left">
          <div className='bg-white rounded-2xl p-2 flex items-center flex-col gap-3 px-8 py-10 pt-4'>
            <div className='flex items-center justify-center w-full pb-12'>
              <span className='bg-[#F3EBD7] w-[100px] h-[10px] rounded-full flex items-center justify-center'></span>
            </div>
          {/* <div className="text-left text-white w-full">
            <Link href={'/'}>
              <ChevronLeft />
            </Link>
          </div> */}
          {/* Back */}
          <Image src="/images/starcircleyellow.png" alt="back" width={100} height={100} />
          {/* Title */}
          <h2 className="text-[32px] font-serif text-[#1A1A1A] font-light text-center w-full">
            Send a Super Like?
          </h2>
          <p className='text-center text-[#1A1A1ACC] text-base font-normal'>This action expresses strong interest and places your profile at the top of their list.</p>

          <Button
          onClick={() => setOpen(true)}
                type="submit"
                className="cursor-pointer w-full text-base h-[52px] mt-[20px] rounded-[12px] md:rounded-[8px] bg-gradient-to-r from-[#c58b00] via-[#f5d76e] to-[#c58b00] text-[#913C01] font-semibold hover:opacity-90 transition disabled:opacity-60"
              >Confirm
              </Button>
              <button className=' text-[#913C01] border border-[#913C01] h-[52px] rounded-[12px] md:rounded-[8px] text-base font-medium cursor-pointer w-full text-center mt-2'>Cancel</button>
              </div>
        </CardContent>

      </Card>

      <GlobalModal open={open}
        onClose={() => setOpen(false)}
        title="Delete Account"
        description="This action is permanent and will delete all of your account data."
        type="deleteAccount" />

    </div>

    
    </>
  )
}

export default ConfirmationPage