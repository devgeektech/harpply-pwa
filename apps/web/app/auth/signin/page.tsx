"use client";

import { Button, Card, CardContent, Input, Label } from "@repo/ui";
import Link from "next/link";
import { useAuthStore } from "store/useAuthStoreLogin";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { AuthError } from "@/lib/api/auth";

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { email, password, setEmail, setPassword, login, loading, error, setError } = useAuthStore();

  const handleLogin = async () => {
    setError(null);
    try {
      const redirectTo = await login();
      router.push(redirectTo);
    } catch (err) {
      if (err instanceof AuthError && err.code === "COMPLETE_SIGNUP") {
        router.push(
          `/auth/createpassword?email=${encodeURIComponent(email.trim() || "")}`
        );
        return;
      }
      setError(err instanceof Error ? err.message : "Sign in failed.");
    }
  };

  return (
    <div className="bg-[url('/images/bg_blue.jpg')] bg-no-repeat bg-cover bg-center min-h-screen flex items-center justify-center px-4">
      <Card className="md:d-block md:bg-[url('/images/bg_auth_center.png')] py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
        <CardContent className="flex items-center flex-col sm:p-10 px-3 text-left">
          <div className="w-full space-y-6">
            <h2 className="w-full text-[24px] font-light text-white font-serif tracking-wider mb-[32px] md:mb-0">
              Sign In
            </h2>
            <form className="space-y-5 md:my-[50px] w-full" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
              {error && (
                <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-md px-3 py-2">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label className="text-gray-300">Email</Label>
                <Input
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white border-white/10 h-[52px] border border-[#E7ECF2] rounded-[12px] md:rounded-[8px] text-[#3B3B3B] placeholder:text-[#3B3B3B] focus-visible:ring-0"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Password</Label>
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

              <div className="text-right text-sm">
                <Link
                  href="/auth/forgotpassword"
                  className="text-yellow-400 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="cursor-pointer w-full text-base h-[52px] mt-[12px] rounded-[12px] md:rounded-[8px] bg-gradient-to-r from-[#c58b00] via-[#f5d76e] to-[#c58b00] text-[#913C01] font-semibold hover:opacity-90 transition disabled:opacity-60"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  "Sign In" 
                )}
              </Button>
            </form>
            <p className="bottom_text text-center text-sm text-gray-300">
              Don’t have an account?
              <Link
                href="/auth/signup"
                className="text-yellow-400 ml-1 hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
