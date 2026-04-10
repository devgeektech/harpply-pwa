"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { Button, Input } from "@repo/ui";
import { AUTH_STORAGE_KEYS, changePasswordAuth } from "@/lib/api/auth";
import { toast } from "sonner";
import { SUCCESS_MESSAGES } from "@/lib/messages/success-messages";
import { ERROR_MESSAGES } from "@/lib/messages/error-messages";
import { useRouter } from "next/navigation";
import { isStrongPassword } from "@/lib/validation/regex";

export default function ChangePasswordPage() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPasswordError, setCurrentPasswordError] = useState<string | null>(
    null
  );
  const [newPasswordError, setNewPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(
    null
  );

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const onSubmit = async () => {
    if (loading) return;
    setCurrentPasswordError(null);
    setNewPasswordError(null);
    setConfirmPasswordError(null);

    const trimmedCurrentPassword = currentPassword.trim();
    const trimmedNewPassword = newPassword.trim();
    const trimmedConfirmPassword = confirmPassword.trim();
    let hasValidationError = false;

    if (!trimmedCurrentPassword) {
      setCurrentPasswordError(ERROR_MESSAGES.VALIDATION.PASSWORD_REQUIRED);
      hasValidationError = true;
    } else if (!isStrongPassword(currentPassword)) {
      setCurrentPasswordError(ERROR_MESSAGES.VALIDATION.PASSWORD_WEAK);
      hasValidationError = true;
    }

    if (!trimmedNewPassword) {
      setNewPasswordError(ERROR_MESSAGES.VALIDATION.PASSWORD_REQUIRED);
      hasValidationError = true;
    } else if (!isStrongPassword(newPassword)) {
      setNewPasswordError(ERROR_MESSAGES.VALIDATION.PASSWORD_WEAK);
      hasValidationError = true;
    }

    if (!trimmedConfirmPassword) {
      setConfirmPasswordError(ERROR_MESSAGES.VALIDATION.PASSWORD_REQUIRED);
      hasValidationError = true;
    } else if (!isStrongPassword(confirmPassword)) {
      setConfirmPasswordError(ERROR_MESSAGES.VALIDATION.PASSWORD_WEAK);
      hasValidationError = true;
    } else if (newPassword !== confirmPassword) {
      setConfirmPasswordError(ERROR_MESSAGES.AUTH.PASSWORD_MISMATCH);
      hasValidationError = true;
    }

    if (hasValidationError) return;

    const token =
      typeof window !== "undefined"
        ? window.localStorage.getItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN)
        : null;
    if (!token) {
      toast.error(ERROR_MESSAGES.AUTH.TOKEN_MISSING);
      router.replace("/auth/signin");
      return;
    }

    try {
      setLoading(true);
      await changePasswordAuth(
        currentPassword,
        newPassword,
        confirmPassword,
        token
      );
      toast.success(SUCCESS_MESSAGES.AUTH.PASSWORD_RESET_SUCCESS);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      router.push("/setting");
    } catch (e) {
      toast.error(
        e instanceof Error ? e.message : ERROR_MESSAGES.AUTH.SAVE_FAILED
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4 py-6">
      <div className="mx-auto w-full max-w-[420px] rounded-2xl border border-[#C8A851]/20 bg-[linear-gradient(180deg,#1A0D3D_0%,#0F0626_100%)] p-5 sm:p-6">
        <Link
          href="/setting"
          className="inline-flex items-center text-white/90 hover:text-white transition-colors"
        >
          <ChevronLeft size={18} />
        </Link>

        <h1 className="mt-4 text-white font-serif text-[28px] font-normal">
          Change Password
        </h1>

        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-white/80 text-sm">
              Current password
            </label>
            <div className="relative">
              <Input
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                  if (currentPasswordError) setCurrentPasswordError(null);
                }}
                placeholder="Enter new password"
                className="h-[44px] pr-10 bg-white text-[#1A1A1A]"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                onClick={() => setShowCurrent((v) => !v)}
                aria-label={showCurrent ? "Hide password" : "Show password"}
              >
                {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {currentPasswordError ? (
              <p className="mt-1 text-sm text-red-400">{currentPasswordError}</p>
            ) : null}
          </div>

          <div>
            <label className="mb-2 block text-white/80 text-sm">
              New Password
            </label>
            <div className="relative">
              <Input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  if (newPasswordError) setNewPasswordError(null);
                }}
                placeholder="Enter new password"
                className="h-[44px] pr-10 bg-white text-[#1A1A1A]"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                onClick={() => setShowNew((v) => !v)}
                aria-label={showNew ? "Hide password" : "Show password"}
              >
                {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {newPasswordError ? (
              <p className="mt-1 text-sm text-red-400">{newPasswordError}</p>
            ) : null}
          </div>

          <div>
            <label className="mb-2 block text-white/80 text-sm">
              Confirm new password
            </label>
            <div className="relative">
              <Input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (confirmPasswordError) setConfirmPasswordError(null);
                }}
                placeholder="Confirm new password"
                className="h-[44px] pr-10 bg-white text-[#1A1A1A]"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                onClick={() => setShowConfirm((v) => !v)}
                aria-label={showConfirm ? "Hide password" : "Show password"}
              >
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {confirmPasswordError ? (
              <p className="mt-1 text-sm text-red-400">{confirmPasswordError}</p>
            ) : null}
          </div>
        </div>

        <Button
          type="button"
          onClick={onSubmit}
          disabled={loading}
          className="mt-5 w-full h-[44px] text-[#913C01] font-semibold bg-[linear-gradient(90deg,#964400_0%,#F3D35D_25%,#F3D35D_50%,#8C4202_100%)] hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Updating..." : "Update Password"}
        </Button>
      </div>
    </div>
  );
}
