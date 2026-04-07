import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button, Card, CardContent, Input, Label } from "@repo/ui";
import { adminChangePassword } from "../lib/api";
import { CARD_CLASS, INPUT_CLASS, PRIMARY_BTN_CLASS } from "../constants/ui";

export function ChangePasswordPage({
  accessToken,
  onPasswordChanged,
}: {
  accessToken: string;
  onBackToLogin: () => void;
  onPasswordChanged?: () => void;
}) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [apiError, setApiError] = useState("");

  const [currentPasswordError, setCurrentPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = async () => {
    setApiError("");
    setApiMessage("");
    setCurrentPasswordError("");
    setNewPasswordError("");
    setConfirmPasswordError("");

    if (!currentPassword.trim()) {
      setCurrentPasswordError("Current password is required.");
    }

    if (!newPassword.trim() || newPassword.length < 8) {
      setNewPasswordError("New password must be at least 8 characters.");
    }
    if (newPassword !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
    }

    if (
      !currentPassword.trim() ||
      !newPassword.trim() ||
      newPassword.length < 8 ||
      newPassword !== confirmPassword
    ) {
      return;
    }

    setLoading(true);
    try {
      await adminChangePassword(accessToken, {
        currentPassword: currentPassword.trim(),
        newPassword,
        confirmPassword,
      });
      setApiMessage("Password changed successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      onPasswordChanged?.();
    } catch (e) {
      setApiError(e instanceof Error ? e.message : "Failed to change password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={CARD_CLASS}>
      <CardContent className="p-8 text-white">
        <h1 className="text-[28px] font-serif mb-1">Change Password</h1>
        <p className="text-white/70 mb-6">Update your account password.</p>

        {apiMessage && (
          <div className="mb-4 rounded-lg border border-emerald-300/30 bg-emerald-500/15 px-3 py-2 text-sm text-emerald-100">
            {apiMessage}
          </div>
        )}
        {apiError && (
          <div className="mb-4 rounded-lg border border-red-300/30 bg-red-500/15 px-3 py-2 text-sm text-red-100">
            {apiError}
          </div>
        )}

        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-white">Current Password</Label>
            <div className="relative">
              <Input
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                  if (currentPasswordError) setCurrentPasswordError("");
                  if (apiError) setApiError("");
                }}
                placeholder="Enter current password"
                className={`${INPUT_CLASS} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1A1A1A]/70 hover:text-[#1A1A1A] cursor-pointer"
                aria-label={showCurrentPassword ? "Hide current password" : "Show current password"}
              >
                {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {currentPasswordError && (
              <p className="text-sm text-red-500">{currentPasswordError}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-white">New Password</Label>
            <div className="relative">
              <Input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  if (newPasswordError) setNewPasswordError("");
                  if (apiError) setApiError("");
                }}
                placeholder="Minimum 8 characters"
                className={`${INPUT_CLASS} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1A1A1A]/70 hover:text-[#1A1A1A] cursor-pointer"
                aria-label={showNewPassword ? "Hide new password" : "Show new password"}
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {newPasswordError && <p className="text-sm text-red-500">{newPasswordError}</p>}
          </div>

          <div className="space-y-2">
            <Label className="text-white">Confirm Password</Label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (confirmPasswordError) setConfirmPasswordError("");
                  if (apiError) setApiError("");
                }}
                placeholder="Re-enter new password"
                className={`${INPUT_CLASS} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1A1A1A]/70 hover:text-[#1A1A1A] cursor-pointer"
                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {confirmPasswordError && <p className="text-sm text-red-500">{confirmPasswordError}</p>}
          </div>

          <Button className={PRIMARY_BTN_CLASS} disabled={loading} onClick={handleChange}>
            {loading ? "Updating..." : "Change Password"}
          </Button>

        </div>
      </CardContent>
    </Card>
  );
}

