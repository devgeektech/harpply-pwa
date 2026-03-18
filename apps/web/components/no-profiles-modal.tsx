"use client"

import { Dialog, DialogContent } from "@repo/ui"
import { Button } from "@repo/ui"
import { Star } from "lucide-react"

type Props = {
  open: boolean
  setOpen: (value: boolean) => void
}

export default function NoProfilesModal({ open, setOpen }: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="border-none bg-transparent shadow-none max-w-[620px] w-full p-0">
        <div className="rounded-2xl py-[80px] bg-gradient-to-b from-[#1b0143] to-[#070018] p-10 text-center text-white">

          <div className="mx-auto mb-6 flex  items-center justify-center rounded-full ">
            <img src="/images/starcircle.png" alt="starcircle" className="h-[130px] min-w-[130px]" />
          </div>

          <h2 className="text-[24px] font-serif font-normal mb-3">
            No More Profiles Nearby
          </h2>

          <p className="text-white text-base font-light leading-relaxed mb-8 mx-auto">
            Try adjusting your filters or check back later. Your next meaningful
            connection is worth the wait.
          </p>

          <Button className="cursor-pointer w-full h-[52px] rounded-[12px]  bg-[linear-gradient(90deg,#964400_0%,#F3D35D_25%,#F3D35D_50%,#8C4202_100%)] text-[#913C01] font-semibold">
            Adjust Filters
          </Button>

          <button
            onClick={() => setOpen(false)}
            className="cursor-pointer mt-5 text-[#913C01] text-base font-medium"
          >
            Refresh Later
          </button>

        </div>
      </DialogContent>
    </Dialog>
  )
}