"use client";

import { Button, Card, CardContent, Input } from "@repo/ui";
import Link from "next/link";
import { useRef, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useOtpStore } from "store/useOtpStore";

export default function OTPVerification() {
  const { otp, setOtpDigit } = useOtpStore();
  const inputs = useRef<Array<HTMLInputElement | null>>([]);
  const [timer, setTimer] = useState(60);

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;

    setOtpDigit(index, value);

    if (value && inputs.current[index + 1]) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && inputs.current[index - 1]) {
      inputs.current[index - 1]?.focus();
    }
  };

  const verifyOtp = () => {
    const code = otp.join("");
    console.log("OTP:", code);
  };

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
          <div className="flex flex-col gap-[10px]">
            <h1 className="text-2xl font-serif font-medium text-white sm:text-center w-full">
              OTP Verification
            </h1>

            <p className="text-base font-light text-white mt-2 sm:text-center w-full">
              A verification code has been sent to your email
              (abcd****@g****.com). Please enter the code below to reset your
              password.
            </p>
          </div>

          <p className="text-white text-base">{`0:${timer}`}</p>

          {/* OTP INPUT */}
          <div className="flex justify-center sm:gap-3 gap-2">
            {otp.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => {
                  inputs.current[index] = el;
                }}
                value={digit}
                maxLength={1}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleBackspace(index, e)}
                className="h-12 w-12 text-center md:!text-[24px] font-semibold bg-white"
              />
            ))}
          </div>

          <p className="text-sm text-gray-400">
            I didn't receive any code{" "}
            <span className="text-[#913C01] cursor-pointer">RESEND</span>
          </p>

          <Button
            onClick={verifyOtp}
            className="cursor-pointer w-full text-base h-[52px] mt-[12px] rounded-[12px] md:rounded-[8px] bg-[linear-gradient(90deg,#964400_0%,#F3D35D_25%,#F3D35D_50%,#8C4202_100%)] text-[#913C01] font-semibold hover:opacity-90 transition disabled:opacity-60"
          >
            Verify
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
