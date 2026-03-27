import { useState } from "react";
import { Button, Card, CardContent, Input, Label } from "@repo/ui";
import { isValidEmail } from "../lib/validation";
import { CARD_CLASS, INPUT_CLASS, PRIMARY_BTN_CLASS } from "../constants/ui";
import { useAdminAuthStore } from "../store/adminAuthStore";

export function LoginPage({
  onGoForgotPassword,
}: {
  onGoForgotPassword: () => void;
}) {
  const auth = useAdminAuthStore();
  const [email, setEmail] = useState(auth.email);
  const [password, setPassword] = useState("");
  const [apiError, setApiError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validate = (): boolean => {
    setEmailError("");
    setPasswordError("");
    setApiError("");

    const trimmedEmail = email.trim();
    if (!trimmedEmail) setEmailError("Email is required.");
    else if (!isValidEmail(trimmedEmail)) setEmailError("Please enter a valid email address.");

    if (!password.trim()) setPasswordError("Password is required.");

    return !(trimmedEmail === "" || !isValidEmail(trimmedEmail) || !password.trim());
  };

  const handleLogin = async () => {
    if (!validate()) return;
    auth.clearError();
    try {
      await auth.login(email.trim(), password);
    } catch (e) {
      setApiError(e instanceof Error ? e.message : "Login failed.");
    }
  };

  return (
    <Card className={CARD_CLASS}>
      <CardContent className="p-8 text-white">
        <h1 className="text-[28px] font-serif mb-1">Admin Login</h1>
        <p className="text-white/70 mb-6">Secure administration for Harpply.</p>

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
            <Label className="text-white">Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (passwordError) setPasswordError("");
                if (apiError) setApiError("");
              }}
              placeholder="Enter your password"
              className={INPUT_CLASS}
            />
            {passwordError && <p className="text-sm text-red-200">{passwordError}</p>}
          </div>

          <Button className={PRIMARY_BTN_CLASS} disabled={auth.loading} onClick={handleLogin}>
            {auth.loading ? "Signing in..." : "Sign in"}
          </Button>

          <Button
            variant="outline"
            className="cursor-pointer w-full h-[50px] rounded-[10px] border border-[#C39936] text-[#F3D35D] bg-transparent hover:bg-white/10"
            onClick={onGoForgotPassword}
          >
            Forgot Password
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

