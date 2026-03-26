"use client";

import { Dialog, DialogContent } from "@repo/ui";
import { X } from "lucide-react";

interface GlobalModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  confirmLoading?: boolean;
  type?: "deleteAccount" | "logout";
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

export default function GlobalModal({
  open,
  onClose,
  onConfirm,
  confirmLoading = false,
  type = "deleteAccount",
  title,
  description,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
}: GlobalModalProps) {
  const isLogout = type === "logout";
  const resolvedTitle =
    title ?? (isLogout ? "Log Out" : "Delete Account");
  const resolvedDescription =
    description ??
    (isLogout
      ? "Are you sure want to logout."
      : "This action is permanent and will delete all of your account data.");
  const resolvedConfirmLabel =
    confirmLabel ?? (isLogout ? "Yes" : "Delete");

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

        {(type === "deleteAccount" || type === "logout") && (
          <>
            {/* Icon */}
            <div className="flex justify-center mb-4">
              {isLogout ? (
                <div className="bg-red-100 p-2 rounded-full">
                  <div className="bg-red-500 text-white p-3 rounded-full">
                    <img
                      src="/images/logoutwhiteicon.svg"
                      alt="logout"
                      width={24}
                      height={24}
                    />
                  </div>
                </div>
              ) : (
                <div className="bg-red-100 p-2 rounded-full">
                  <div className="bg-red-500 text-white p-3 rounded-full">
                    <img
                      src="/images/deletewhiteicon.svg"
                      alt="delete"
                      width={24}
                      height={24}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Title */}
            <h2 className="text-[24px] text-[#121721] font-semibold">
              {resolvedTitle}
            </h2>

            {/* Description */}
            <p className="text-base text-[#1A1A1A] font-normal mt-2 mx-auto max-w-[400px] text-center">
              {resolvedDescription}
            </p>

            {/* Buttons */}
            <div className="flex gap-3 mt-6 btns-container">
              <button
                onClick={onClose}
                className="cursor-pointer flex-1 border border-[#C39936] text-[#913C01] rounded-lg p-3 font-medium"
              >
                {cancelLabel}
              </button>

              <button
                onClick={onConfirm}
                disabled={!onConfirm || confirmLoading}
                className="cursor-pointer flex-1 rounded-lg p-3 font-medium text-[#913C01] 
                bg-gradient-to-r from-[#964400] via-[#F3D35D] to-[#8C4202] disabled:opacity-60"
              >
                {confirmLoading
                  ? isLogout
                    ? "Logging out..."
                    : "Deleting..."
                  : resolvedConfirmLabel}
              </button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}