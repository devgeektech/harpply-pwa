"use client";

import { Dialog, DialogContent } from "@repo/ui";
import { X } from "lucide-react";

interface GlobalModalProps {
  open: boolean;
  onClose: () => void;
  type?: "deleteAccount";
}

export default function GlobalModal({
  open,
  onClose,
  type = "deleteAccount",
}: GlobalModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm p-6 rounded-2xl border-none bg-white text-center fixed">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute cursor-pointer text-[24px] right-4 top-4 text-gray-500 hover:text-black"
        >
          <X />
        </button>

        {type === "deleteAccount" && (
          <>
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="bg-red-100 p-2 rounded-full">
                <div className="bg-red-500 text-white p-3 rounded-full">
                  <img src="/images/deletewhiteicon.svg" alt="delete" width={24} height={24} />
                </div>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-[24px] text-[#121721] font-semibold">Delete Account</h2>

            {/* Description */}
            <p className="text-base text-[#1A1A1A] font-normal mt-2 mx-auto max-w-[400px] text-center">
              This action is permanent and will delete all of your account data.
            </p>

            {/* Buttons */}
            <div className="flex gap-3 mt-6 btns-container">
              <button
                onClick={onClose}
                className="cursor-pointer flex-1 border border-[#C39936] text-[#913C01] rounded-lg p-3 font-medium"
              >
                Cancel
              </button>

              <button
                className="cursor-pointer flex-1 rounded-lg p-3 font-medium text-[#913C01] 
                bg-gradient-to-r from-[#964400] via-[#F3D35D] to-[#8C4202]"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}