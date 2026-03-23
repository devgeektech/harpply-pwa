"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@repo/ui";
import Link from "next/link";
import { isValidEmail } from "@/lib/validation/regex";

function maskEmail(email: string): string {
  if (!email || !isValidEmail(email)) return "***@*****.com";
  const [local, domain] = email.split("@");
  const maskedLocal =
    !local || local.length <= 2
      ? (local?.[0] ?? "") + "***"
      : local.slice(0, 3) + "***";
  const maskedDomain = domain ? "*****." + (domain.split(".").pop() ?? "com") : "*****.com";
  return `${maskedLocal}@${maskedDomain}`;
}

export interface VerifyEmailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email?: string;
  resendHref?: string;
  createPasswordHref?: string;
}

export default function VerifyEmailDialog({
  open,
  onOpenChange,
  email = "",
  resendHref = "#",
  createPasswordHref,
}: VerifyEmailDialogProps) {
  const maskedEmail = maskEmail(email);
  const createPasswordUrl =
    createPasswordHref ??
    (email ? `/auth/createpassword?email=${encodeURIComponent(email)}` : "/auth/createpassword");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-center text-[24px] font-normal font-serif">
            Verify your email
          </DialogTitle>

          <DialogDescription className="text-center text-[18px] text-gray-500 mt-2">
            A verification link has been sent to your email. Please check your email.
            <span className="ms-2 font-medium text-black">{maskedEmail}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 mt-4">
          <Link
            href={resendHref}
            className="text-[#913C01] font-medium underline hover:opacity-90 cursor-pointer"
          >
            Resend
          </Link>

          <Link href={createPasswordUrl} className="w-full">
            <Button
              type="button"
              className="cursor-pointer w-full text-base h-[52px] rounded-[12px] md:rounded-[8px] bg-gradient-to-r from-[#c58b00] via-[#f5d76e] to-[#c58b00] text-[#913C01] font-semibold hover:opacity-90 transition"
            >
              Create password
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
