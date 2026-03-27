import { useState } from "react";
import { Button, Card, CardContent, Input, Label } from "@repo/ui";
import { adminForgotPassword } from "../lib/api";
import { isValidEmail } from "../lib/validation";
import { CARD_CLASS, INPUT_CLASS, PRIMARY_BTN_CLASS } from "../constants/ui";

export function ForgotPasswordPage({
  initialEmail,
  onBackToLogin,
}: {
  initialEmail: string;
  onBackToLogin: () => void;
}) {
  const [email, setEmail] = useState(initialEmail);
  const [loading, setLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [apiError, setApiError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleGenerate = async () => {
    setApiError("");
    setApiMessage("");
    setEmailError("");

    const trimmed = email.trim();
    if (!trimmed) {
      setEmailError("Email is required.");
      return;
    }
    if (!isValidEmail(trimmed)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      await adminForgotPassword(trimmed);
      setApiMessage("If an admin account exists, password reset steps were issued.");
    } catch (e) {
      setApiError(e instanceof Error ? e.message : "Failed to process forgot password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={CARD_CLASS}>
      <CardContent className="p-8 text-white">
        <h1 className="text-[28px] font-serif mb-1">Admin Forgot Password</h1>
        <p className="text-white/70 mb-6">Generate a reset token for admin password change.</p>

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
            {emailError && <p className="text-sm text-red-500">{emailError}</p>}
          </div>

          <Button className={PRIMARY_BTN_CLASS} disabled={loading} onClick={handleGenerate}>
            {loading ? "Submitting..." : "Generate Reset Token"}
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

