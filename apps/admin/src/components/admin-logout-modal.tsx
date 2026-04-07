import { Dialog, DialogContent } from "@repo/ui";
import { X } from "lucide-react";

export function AdminLogoutModal({
  open,
  onClose,
  onConfirm,
  confirmLoading = false,
  title = "Log Out",
  description = "Are you sure want to logout?",
  confirmLabel = "Yes",
  cancelLabel = "No",
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  confirmLoading?: boolean;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
}) {
  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen && !confirmLoading) onClose();
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="max-w-sm p-6 rounded-2xl border-none bg-white text-center"
      >
        <button
          type="button"
          onClick={() => {
            if (!confirmLoading) onClose();
          }}
          className="absolute cursor-pointer text-[24px] right-4 top-4 text-gray-500 hover:text-black"
          aria-label="Close"
        >
          <X />
        </button>

        <div className="flex justify-center mb-4">
          <div className="bg-red-100 p-2 rounded-full">
            <div className="bg-red-500 text-white p-3 rounded-full flex items-center justify-center">
              <img
                src="/images/logoutwhiteicon.svg"
                alt=""
                width={24}
                height={24}
              />
            </div>
          </div>
        </div>

        <h2 className="text-[24px] text-[#121721] font-semibold">{title}</h2>
        <p className="text-base text-[#1A1A1A] font-normal mt-2 mx-auto max-w-[400px] text-center">
          {description}
        </p>

        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={() => {
              if (!confirmLoading) onClose();
            }}
            className="cursor-pointer flex-1 border border-[#C39936] text-[#913C01] rounded-lg p-3 font-medium"
          >
            {cancelLabel}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={confirmLoading}
            className="cursor-pointer flex-1 rounded-lg p-3 font-medium text-[#913C01] bg-gradient-to-r from-[#964400] via-[#F3D35D] to-[#8C4202] disabled:opacity-60"
          >
            {confirmLoading ? "Logging out..." : confirmLabel}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
