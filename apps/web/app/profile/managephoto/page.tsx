"use client"

import Image from "next/image"
import { useState } from "react"
import { Button, Card, CardContent, Progress } from "@repo/ui"
import { Trash2, ImageIcon, Camera, ChevronLeft, Info } from "lucide-react"
import Link from "next/link"
import { Uploaderrordialog } from "@/components/common/UploadErrorDialog"

export default function ManagePhotoPage() {
  const [open, setOpen] = useState(false)
  const [photos, setPhotos] = useState<string[]>([
    "/images/profile.jpg",
    "/images/profile.jpg",
    "/images/profile.jpg",

  ])

  const maxPhotos = 6
  const progress = (photos.length / maxPhotos) * 100

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index))
  }

  const addPhoto = () => {
    if (photos.length >= maxPhotos) return
    setPhotos((prev) => [...prev, "/images/placeholder.png"])
  }

  return (
    <>
    <div className="bg-[url('/images/bg_blue.jpg')] bg-no-repeat bg-cover bg-center min-h-screen flex  sm:items-center items-start justify-center px-4 py-[50px] sm:py-4">
      <Card className="md:d-block md:bg-[url('/images/bg_auth_center.png')] py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
        <CardContent className="flex flex-col md:gap-6 gap-3 sm:p-6 px-3 text-white">
        <div className="flex items-center px-0 pb-2 w-full">
        <Link
          href="/profile"
          className="flex items-center justify-center size-10 rounded-full text-white/90 hover:bg-white/10 transition-colors"
          aria-label="Back"
        >
          <ChevronLeft className="size-6" />
        </Link>
      </div>

        {/* Header */}
        <div className="flex items-center gap-2 ">
          <h1 className="text-[24px] font-normal font-serif">Manage Photo</h1>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <p className="text-[16px] font-light uppercase">
            Upload Progress
          </p>

          <Progress value={progress} className="h-2" />

          <p className="text-[16px] font-light">
            Show your best self
          </p>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 gap-4">

          {[...Array(maxPhotos)].map((_, index) => {
            const photo = photos[index]

            return (
              <div
                key={index}
                className="relative sm:h-[200px] h-[150px] rounded-[8px] overflow-hidden bg-[#FBFAF9] flex items-center justify-center"
              >
                {photo ? (
                  <>
                    <Image
                      src={photo}
                      alt="photo"
                      fill
                      className="object-cover"
                    />

                    <button
                      onClick={() => removePhoto(index)}
                      className="cursor-pointer absolute top-2 right-2 bg-[#FBFAF9] rounded-full p-1"
                    >
                      <Trash2 size={16} className="text-black" />
                    </button>
                  </>
                ) : index === photos.length ? (
                  <button
                    onClick={addPhoto}
                    className="cursor-pointer flex flex-col items-center text-[#913C01]"
                  >
                    <span className="bg-[linear-gradient(90deg,#964400_0%,#F3D35D_25%,#F3D35D_50%,#8C4202_100%)] flex items-center justify-center size-10 rounded-full text-white/90 hover:bg-white/10 transition-colors">
                        <Camera size={22} className="text-[#913C01]" />
                    </span>
                    <span className="text-[16px] font-light mt-1">
                      Add Photo
                    </span>
                  </button>
                ) : (
                  <Image src="/images/placeholderprofile.png" alt="photo" width={100} height={100} />
                )}
              </div>
            )
          })}
        </div>

        {/* Guidelines */}
        <div className="bg-[#FBFAF9] rounded-[8px] text-[#1A1A1A] p-4 text-[16px]">
          <p className="font-semibold text-[#C39936] mb-1 flex items-center gap-2">
          <Info size={16} /> Photo Guidelines
          </p>

          <p className="text-[#1A1A1A] text-base font-light">
            Minimum 3 photos required. Clear faces, no sunglasses,
            and natural lighting work best for meaningful connections.
          </p>
        </div>

        {/* Save Button */}
        <Button onClick={() => setOpen(true)}
          className="cursor-pointer w-full h-[52px] text-[#913C01] font-semibold
           bg-[linear-gradient(90deg,#964400_0%,#F3D35D_25%,#F3D35D_50%,#8C4202_100%)]"
        >
          Save Photo
        </Button>

        <p className="text-[16px] font-light text-left text-[#FFFFFFCC] mb-3">
          Your privacy is our priority. Photos are secured with Harpply.
        </p>

      </CardContent>
      </Card>
    </div>


    <Uploaderrordialog
        open={open}
        onOpenChange={setOpen}
        onRetry={() => {
          console.log("Retry upload")
          setOpen(false)
        }}
        onCancel={() => setOpen(false)}
      />
    </>
  )
}