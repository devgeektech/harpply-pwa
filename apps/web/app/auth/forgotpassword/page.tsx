"use client";

import { Input, Label, Button, Card, CardContent } from "@repo/ui";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useForgotPasswordStore } from "store/useForgotPasswordStore";

export default function ForgotPasswordPage() {
  const { email, setEmail, sendResetLink, loading } = useForgotPasswordStore();

  return (
    <div className="bg-[url('/images/bg_blue.jpg')] bg-no-repeat bg-cover bg-center min-h-screen flex  sm:items-center items-start justify-center px-4 py-[50px] sm:py-4">
      <Card className="md:d-block md:bg-[url('/images/bg_auth_center.png')] py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
        <CardContent className="flex items-center flex-col gap-6 sm:p-10 px-3 text-left">
          <div className="text-left text-white w-full md:hidden ">
            <Link href={"/"}>
              {" "}
              <ChevronLeft />
            </Link>
          </div>
          <h1 className="text-[24px] font-serif font-normal text-white mb-2 w-full text-left">
            Forgot password
          </h1>

          <p className="text-base text-gray-300 mb-6">
            Enter your email address below and we’ll send you instructions on
            how to reset your password.
          </p>

          <div className="space-y-4 w-full">
            <div className="space-y-2">
              <Label className="text-gray-300">Email</Label>

              <Input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border-white/10 h-[52px] border border-[#E7ECF2] rounded-[12px] md:rounded-[8px] text-[#3B3B3B] placeholder:text-[#3B3B3B] focus-visible:ring-0"
              />
            </div>

            <Button
              disabled={!email || loading}
              onClick={sendResetLink}
              className="cursor-pointer w-full text-base h-[52px] mt-[12px] rounded-[12px] md:rounded-[8px] bg-gradient-to-r from-[#c58b00] via-[#f5d76e] to-[#c58b00] text-[#913C01] font-semibold hover:opacity-90 transition disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
