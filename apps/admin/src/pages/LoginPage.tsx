import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
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
  const [showPassword, setShowPassword] = useState(false);

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
            {emailError && <p className="text-sm text-red-500">{emailError}</p>}
          </div>

          <div className="space-y-2">
            <Label className="text-white">Password</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passwordError) setPasswordError("");
                  if (apiError) setApiError("");
                }}
                placeholder="Enter your password"
                className={`${INPUT_CLASS} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1A1A1A]/70 hover:text-[#1A1A1A] cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onGoForgotPassword}
              className="cursor-pointer text-sm font-medium text-[#F3D35D] hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <Button className={PRIMARY_BTN_CLASS} disabled={auth.loading} onClick={handleLogin}>
            {auth.loading ? "Signing in..." : "Sign in"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

