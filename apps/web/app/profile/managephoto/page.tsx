"use client"

import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react"
import { Button, Card, CardContent, Progress } from "@repo/ui"
import { Trash2, Camera, ChevronLeft, Info } from "lucide-react"
import Link from "next/link"
import { Uploaderrordialog } from "@/components/common/UploadErrorDialog"
import { ERROR_MESSAGES } from "@/lib/messages/error-messages"
import {
  addProfilePhoto,
  deleteProfilePhoto,
  fetchProfilePhotos,
  type ProfilePhotosData,
} from "@/lib/api/profile"
import { useRouter } from "next/navigation"
import Image from "next/image";

const MAX_PHOTOS = 6
const PHOTO_MAX_SIZE_BYTES = 5 * 1024 * 1024 // 5MB (matches API)
const ALLOWED_PHOTO_MIMES = ["image/jpeg", "image/png", "image/webp"]

function buildPhotoSrc(s3PublicUrl: string, key: string): string {
  const safeKey = key?.toString?.().trim() ?? "";

  if (!safeKey) return "/images/placeholderprofile.png"
  if (/^https?:\/\//i.test(safeKey)) return safeKey

  const base = (s3PublicUrl ?? "").replace(/\/$/, "")
  if (!base) return "/images/placeholderprofile.png"

  return `${base}/${safeKey.replace(/^\/+/, "")}`
}

export default function ManagePhotoPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const lastSelectedFileRef = useRef<File | null>(null)

  // Note: Next.js exposes only NEXT_PUBLIC vars to client bundles.
  // This may be undefined in the browser unless your setup inlines it.
  const s3PublicUrl = process.env.NEXT_PUBLIC_AWS_S3_URL ?? ""

  const [loadingPhotos, setLoadingPhotos] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  const [photos, setPhotos] = useState<string[]>([])
  const [minPhotosRequired, setMinPhotosRequired] = useState(3)
  const [meetsMinimum, setMeetsMinimum] = useState(false)

  const [uploading, setUploading] = useState(false)
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null)

  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  const [saveError, setSaveError] = useState<string | null>(null)

  const progress = useMemo(() => {
    const pct = (photos.length / MAX_PHOTOS) * 100
    return Math.max(0, Math.min(100, pct))
  }, [photos.length])

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const result: ProfilePhotosData = await fetchProfilePhotos()
        if (cancelled) return
        setPhotos(result.photos)
        setMinPhotosRequired(result.minPhotosRequired)
        setMeetsMinimum(result.meetsMinimum)
        setLoadError(null)
      } catch (err) {
        if (cancelled) return
        const msg =
          err instanceof Error ? err.message : ERROR_MESSAGES.PHOTOS.UPLOAD_FAILED
        setLoadError(msg)
      } finally {
        if (cancelled) return
        setLoadingPhotos(false)
      }
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [])

  const openFilePicker = () => {
    if (uploading || deletingIndex !== null) return
    fileInputRef.current?.click()
  }

  const setAndOpenUploadError = (message: string) => {
    setUploadError(message)
    setUploadDialogOpen(true)
  }

  const validateBeforeUpload = (file: File): string | null => {
    if (!file) return "Photo file is required."
    if (!ALLOWED_PHOTO_MIMES.includes(file.type))
      return ERROR_MESSAGES.PHOTOS.INVALID_FILE_TYPE
    if (file.size > PHOTO_MAX_SIZE_BYTES) return ERROR_MESSAGES.PHOTOS.FILE_TOO_LARGE
    if (photos.length >= MAX_PHOTOS)
      return `You can upload up to ${MAX_PHOTOS} photos.`
    return null
  }

  const handleUploadFile = async (file: File) => {
    if (uploading) return

    setSaveError(null)
    setUploadError(null)
    setUploadDialogOpen(false)

    const validationError = validateBeforeUpload(file)
    if (validationError) {
      setAndOpenUploadError(validationError)
      return
    }

    lastSelectedFileRef.current = file
    setUploading(true)

    try {
      const result = await addProfilePhoto(file)
      const nextPhotos = result.photos
      setPhotos(nextPhotos)
      setMeetsMinimum(nextPhotos.length >= minPhotosRequired)
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : ERROR_MESSAGES.PHOTOS.UPLOAD_FAILED
      setAndOpenUploadError(msg)
    } finally {
      setUploading(false)
    }
  }

  const handleFileInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ""
    if (!file) return
    await handleUploadFile(file)
  }

  const handleRemovePhoto = async (index: number) => {
    if (deletingIndex !== null) return
    setSaveError(null)
    setUploadError(null)
    setUploadDialogOpen(false)

    setDeletingIndex(index)
    try {
      const result = await deleteProfilePhoto(index)
      setPhotos(result.photos)
      setMeetsMinimum(result.meetsMinimum)
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : ERROR_MESSAGES.PHOTOS.UPLOAD_FAILED
      setAndOpenUploadError(msg)
    } finally {
      setDeletingIndex(null)
    }
  }

  const handleSave = () => {
    setSaveError(null)
    if (!meetsMinimum || photos.length < minPhotosRequired) {
      setSaveError(ERROR_MESSAGES.PHOTOS.MIN_PHOTOS_REQUIRED)
      return
    }
    router.push("/profile/profilesuccess")
  }

  return (
    <div className="bg-[url('/images/bg_blue.jpg')] bg-no-repeat bg-cover bg-center min-h-screen flex sm:items-center items-start justify-center px-4 py-[50px] sm:py-4">
      <Card className="md:d-block md:bg-[url('/images/bg_auth_center.png')] py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
        <CardContent className="flex flex-col md:gap-6 gap-3 sm:p-6 px-3 text-white">
          <div className="flex items-center px-0 pb-2 w-full">
            <Link
              href="/profile/identity"
              className="flex items-center justify-center size-10 rounded-full text-white/90 hover:bg-white/10 transition-colors"
              aria-label="Back"
            >
              <ChevronLeft className="size-6" />
            </Link>
          </div>

          <div className="flex items-center gap-2 ">
            <h1 className="text-[24px] font-normal font-serif">Manage Photo</h1>
          </div>

          {loadError && (
            <p
              role="alert"
              className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-md px-3 py-2"
            >
              {loadError}
            </p>
          )}

          <div className="space-y-2">
            <p className="text-[16px] font-light uppercase">Upload Progress</p>
            <Progress value={progress} className="h-2" />
            <p className="text-[16px] font-light">Show your best self</p>
          </div>

          {uploadError && !uploadDialogOpen && (
            <p
              role="alert"
              className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-md px-3 py-2"
            >
              {uploadError}
            </p>
          )}

          <div className="grid grid-cols-2 gap-4">
            {[...Array(MAX_PHOTOS)].map((_, index) => {
              const photoKey = photos[index]

              return (
                <div
                  key={index}
                  className="relative sm:h-[200px] h-[150px] rounded-[8px] overflow-hidden bg-[#FBFAF9] flex items-center justify-center"
                >
                  {index < photos.length ? (
                    <>
                      <Image
                        src={buildPhotoSrc(s3PublicUrl, photoKey)}
                        alt="photo"
                        fill
                        className="object-cover"
                      />

                      <button
                        type="button"
                        onClick={() => handleRemovePhoto(index)}
                        disabled={deletingIndex === index}
                        className="cursor-pointer absolute top-2 right-2 bg-[#FBFAF9] rounded-full p-1 disabled:opacity-60"
                        aria-label="Remove photo"
                      >
                        <Trash2 size={16} className="text-black" />
                      </button>
                    </>
                  ) : index === photos.length ? (
                    <button
                      type="button"
                      onClick={openFilePicker}
                      disabled={uploading}
                      className="cursor-pointer flex flex-col items-center text-[#913C01] disabled:opacity-60"
                      aria-label="Add photo"
                    >
                      <span className="bg-[linear-gradient(90deg,#964400_0%,#F3D35D_25%,#F3D35D_50%,#8C4202_100%)] flex items-center justify-center size-10 rounded-full text-white/90 hover:bg-white/10 transition-colors">
                        <Camera size={22} className="text-[#913C01]" />
                      </span>
                      <span className="text-[16px] font-light mt-1">
                        {uploading ? "Uploading..." : "Add Photo"}
                      </span>
                    </button>
                  ) : (
                    <img
                      src="/images/placeholderprofile.png"
                      alt="photo"
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              )
            })}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFileInputChange}
          />

          <div className="bg-[#FBFAF9] rounded-[8px] text-[#1A1A1A] p-4 text-[16px]">
            <p className="font-semibold text-[#C39936] mb-1 flex items-center gap-2">
              <Info size={16} /> Photo Guidelines
            </p>

            <p className="text-[#1A1A1A] text-base font-light">
              Minimum 3 photos required. Clear faces, no sunglasses, and natural lighting work
              best for meaningful connections.
            </p>
          </div>

          <Button
            onClick={handleSave}
            disabled={loadingPhotos || uploading || deletingIndex !== null}
            className="cursor-pointer w-full h-[52px] text-[#913C01] font-semibold bg-[linear-gradient(90deg,#964400_0%,#F3D35D_25%,#F3D35D_50%,#8C4202_100%)]"
          >
            Save Photo
          </Button>

          {saveError && (
            <p
              role="alert"
              className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-md px-3 py-2"
            >
              {saveError}
            </p>
          )}

          <p className="text-[16px] font-light text-left text-[#FFFFFFCC] mb-3">
            Your privacy is our priority. Photos are secured with Harpply.
          </p>
        </CardContent>
      </Card>

      <Uploaderrordialog
        open={uploadDialogOpen}
        onOpenChange={(open) => {
          setUploadDialogOpen(open)
          if (!open) setUploadError(null)
        }}
        message={uploadError ?? undefined}
        onRetry={() => {
          const file = lastSelectedFileRef.current
          if (file) void handleUploadFile(file)
        }}
        onCancel={() => {
          setUploadDialogOpen(false)
          setUploadError(null)
        }}
      />
    </div>
  )
}