"use client";

import { Button, Card, CardContent, Input, Label } from "@repo/ui";
import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "store/useAuthStoreLogin";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const { email, password, setEmail, setPassword, login } = useAuthStore();

  return (
    <div className="bg-[url('/images/bg_blue.jpg')] bg-no-repeat bg-cover bg-center min-h-screen flex items-center justify-center px-4">
      <Card className="md:d-block md:bg-[url('/images/bg_auth_center.png')] py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
        <CardContent className="flex items-center flex-col sm:p-10 px-3 text-left">
          <div className="w-full space-y-6">
            <h2 className="w-full text-[24px] font-light text-white font-serif tracking-wider mb-[32px] md:mb-0">
              Sign In
            </h2>
            <form className="space-y-5 md:my-[50px] w-full">
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
                onClick={login}
                className="cursor-pointer w-full text-base h-[52px] mt-[12px] rounded-[12px] md:rounded-[8px] bg-gradient-to-r from-[#c58b00] via-[#f5d76e] to-[#c58b00] text-[#913C01] font-semibold hover:opacity-90 transition disabled:opacity-60"
              >
                Sign In
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
