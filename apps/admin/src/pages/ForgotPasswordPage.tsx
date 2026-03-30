import { useState } from "react";
import { Button, Card, CardContent, Input, Label } from "@repo/ui";
import { AlertCircle } from "lucide-react";
import { adminForgotPassword } from "../lib/api";
import { isValidEmail } from "../lib/validation";
import { CARD_CLASS, INPUT_CLASS, PRIMARY_BTN_CLASS } from "../constants/ui";

export function ForgotPasswordPage({
  initialEmail,
  onBackToLogin,
  onSuccess,
}: {
  initialEmail: string;
  onBackToLogin: () => void;
  onSuccess: (email: string) => void;
}) {
  const [email, setEmail] = useState(initialEmail);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleGenerate = async () => {
    setApiError("");
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
      onSuccess(trimmed);
    } catch (e) {
      setApiError(e instanceof Error ? e.message : "Failed to process forgot password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={CARD_CLASS}>
      <CardContent className="p-8 text-white">
        <h1 className="text-[24px] font-serif font-normal text-white mb-2 w-full text-left">
          Forgot password
        </h1>
        <p className="text-base text-gray-300 mb-6">
          Enter your email and we’ll send a link to set a new password (same as
          when you signed up).
        </p>

        {apiError && (
          <div className="w-full flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm mb-4">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{apiError}</span>
          </div>
        )}

        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-gray-300">Email</Label>
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
            {loading ? "Sending..." : "Send reset link"}
          </Button>

          <p className="text-center text-sm text-white w-full">
            Remember your password?{" "}
            <button
              type="button"
              onClick={onBackToLogin}
              className="cursor-pointer text-yellow-400 underline"
            >
              Sign in
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

