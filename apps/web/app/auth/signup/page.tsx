"use client";

import { useState } from "react";
import { useAuthStore } from "store/useAuthStore";
import { Button, Card, CardContent, Input, Label } from "@repo/ui";
import { Eye, EyeOff, Loader2 } from "lucide-react";
export default function SignupPage() {
  const {
    email,
    password,
    confirmPassword,
    setEmail,
    setPassword,
    setConfirmPassword,
    reset,
    loading,
    setLoading,
    error,
    setError,
  } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);

    // 🔎 Validation
    if (!email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log({ email, password });

      reset();
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[url('/images/bg_blue.jpg')] bg-no-repeat bg-cover bg-center min-h-screen flex items-center justify-center px-4">
      <Card className=" md:d-block md:bg-[url('/images/bg_auth_center.png')] py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
        <CardContent className="flex items-center flex-col sm:p-10 px-3 text-left">
          <h1 className="w-full text-[24px] font-light text-white font-serif tracking-wider mb-[32px] md:mb-0">
            Create your account
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 md:my-[50px] w-full"
          >
            {/* Email */}
            <div className="space-y-2">
              <Label className="text-gray-300 text-sm font-normal">Email</Label>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border-white/10 h-[52px] border border-[#E7ECF2] rounded-[12px] md:rounded-[8px] text-[#3B3B3B] placeholder:text-[#3B3B3B] focus-visible:ring-0"
              />
            </div>

            {/* Password */}
            <div className="space-y-2 relative">
              <Label className="text-gray-300 text-sm font-normal">
                Password
              </Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white h-[52px] rounded-[12px] rounded-[8px] border-white/10 text-[#3B3B3B] placeholder:text-[#3B3B3B] pr-10  focus-visible:ring-0"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2 relative">
              <Label className="text-gray-300 text-sm font-normal">
                Confirm password
              </Label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-white h-[52px] rounded-[12px] rounded-[8px] border-white/10 text-[#3B3B3B] placeholder:text-[#3B3B3B] pr-10 focus-visible:ring-0"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* 🔴 Error Message */}
            {error && (
              <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-md px-3 py-2">
                {error}
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="cursor-pointer w-full text-base h-[52px] mt-[12px] rounded-[12px] md:rounded-[8px] bg-gradient-to-r from-[#c58b00] via-[#f5d76e] to-[#c58b00] text-[#913C01] font-semibold hover:opacity-90 transition disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating...
                </span>
              ) : (
                "Sign up"
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-white bottom_text max-md:mt-[20px]">
            Already have an account?{" "}
            <a
              href="/auth/signin"
              className="text-yellow-400 hover:underline-none underline"
            >
              Sign In
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
