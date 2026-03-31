"use client"

import {
  Dialog,
  DialogContent,
  DialogOverlay,
} from "@repo/ui"

import { Button } from "@repo/ui"
import { ShieldAlert, RotateCcw } from "lucide-react"

interface UploadErrorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onRetry?: () => void
  onCancel?: () => void
  message?: string
}

export function Uploaderrordialog({
  open,
  onOpenChange,
  onRetry,
  onCancel,
  message,
}: UploadErrorDialogProps) {
  const dialogMessage = message ?? "Upload failed. Please try again."
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="bg-[#140034] opacity-50" />
      <DialogContent className="max-w-[620px] border-white/30 shadow-[0px_4px_4px_0px_#00000014] rounded-2xl p-8 text-center bg-gradient-to-b from-[#140034] to-[#01010D]">
        <div className="flex flex-col items-center justify-center px-4 py-8 text-black bg-white rounded-2xl">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-[#F3EBDD] flex items-center justify-center">
            <ShieldAlert className="w-6 h-6 text-[#C0892F]" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-[24px] font-normal text-center text-[#1A1A1A]">
          Upload Error
        </h3>

        {/* Description */}
        <p className="text-[16px] font-normal mt-2 mb-6 text-[#1A1A1A]">
          {dialogMessage}
        </p>

        {/* Retry Button */}
        <Button
          type="button"
          onClick={onRetry}
          className="cursor-pointer w-full text-base h-[52px] mt-[12px] rounded-[12px] md:rounded-[8px] 
          bg-gradient-to-r from-[#c58b00] via-[#f5d76e] to-[#c58b00] text-[#913C01] font-semibold hover:opacity-90 transition disabled:opacity-60"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Try Again
        </Button>

        {/* Cancel */}
        <button
          onClick={onCancel}
          className="cursor-pointer mt-4 text-sm font-medium text-gray-600 hover:text-black"
        >
          Cancel
        </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}