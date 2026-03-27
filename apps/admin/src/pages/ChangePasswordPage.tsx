import { useState } from "react";
import { Button, Card, CardContent, Input, Label } from "@repo/ui";
import { adminChangePassword } from "../lib/api";
import { isValidEmail } from "../lib/validation";
import { CARD_CLASS, INPUT_CLASS, PRIMARY_BTN_CLASS } from "../constants/ui";

export function ChangePasswordPage({
  initialEmail,
  initialResetToken,
  onBackToLogin,
}: {
  initialEmail: string;
  initialResetToken?: string;
  onBackToLogin: () => void;
}) {
  const [email, setEmail] = useState(initialEmail);
  const [resetToken, setResetToken] = useState(initialResetToken ?? "");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [apiError, setApiError] = useState("");

  const [emailError, setEmailError] = useState("");
  const [resetTokenError, setResetTokenError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleChange = async () => {
    setApiError("");
    setApiMessage("");
    setEmailError("");
    setResetTokenError("");
    setNewPasswordError("");
    setConfirmPasswordError("");

    const trimmedEmail = email.trim();
    if (!trimmedEmail) setEmailError("Email is required.");
    else if (!isValidEmail(trimmedEmail)) setEmailError("Please enter a valid email address.");

    if (!resetToken.trim()) setResetTokenError("Reset token is required.");

    if (!newPassword.trim() || newPassword.length < 8) {
      setNewPasswordError("New password must be at least 8 characters.");
    }
    if (newPassword !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
    }

    if (
      !trimmedEmail ||
      !isValidEmail(trimmedEmail) ||
      !resetToken.trim() ||
      !newPassword.trim() ||
      newPassword.length < 8 ||
      newPassword !== confirmPassword
    ) {
      return;
    }

    setLoading(true);
    try {
      await adminChangePassword({
        email: trimmedEmail,
        resetToken: resetToken.trim(),
        newPassword,
        confirmPassword,
      });
      setApiMessage("Password changed successfully. Please log in.");
      setNewPassword("");
      setConfirmPassword("");
    } catch (e) {
      setApiError(e instanceof Error ? e.message : "Failed to change password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={CARD_CLASS}>
      <CardContent className="p-8 text-white">
        <h1 className="text-[28px] font-serif mb-1">Admin Change Password</h1>
        <p className="text-white/70 mb-6">Use reset token to set a new password.</p>

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
            <Label className="text-white">Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError("");
                if (apiError) setApiError("");
              }}
              placeholder="admin@harpply.com"
              className={INPUT_CLASS}
            />
            {emailError && <p className="text-sm text-red-200">{emailError}</p>}
          </div>

          <div className="space-y-2">
            <Label className="text-white">Reset Token</Label>
            <Input
              value={resetToken}
              onChange={(e) => {
                setResetToken(e.target.value);
                if (resetTokenError) setResetTokenError("");
                if (apiError) setApiError("");
              }}
              placeholder="Paste reset token"
              className={INPUT_CLASS}
            />
            {resetTokenError && <p className="text-sm text-red-200">{resetTokenError}</p>}
          </div>

          <div className="space-y-2">
            <Label className="text-white">New Password</Label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                if (newPasswordError) setNewPasswordError("");
                if (apiError) setApiError("");
              }}
              placeholder="Minimum 8 characters"
              className={INPUT_CLASS}
            />
            {newPasswordError && <p className="text-sm text-red-200">{newPasswordError}</p>}
          </div>

          <div className="space-y-2">
            <Label className="text-white">Confirm Password</Label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (confirmPasswordError) setConfirmPasswordError("");
                if (apiError) setApiError("");
              }}
              placeholder="Re-enter new password"
              className={INPUT_CLASS}
            />
            {confirmPasswordError && <p className="text-sm text-red-200">{confirmPasswordError}</p>}
          </div>

          <Button className={PRIMARY_BTN_CLASS} disabled={loading} onClick={handleChange}>
            {loading ? "Updating..." : "Change Password"}
          </Button>

          <Button
            variant="outline"
            className="cursor-pointer w-full h-[50px] rounded-[10px] border border-[#C39936] text-[#F3D35D] bg-transparent hover:bg-white/10"
            onClick={onBackToLogin}
          >
            Back to Login
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

