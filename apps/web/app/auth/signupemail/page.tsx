"use client";

import Image from "next/image";
// import { Mail } from "lucide-react";
import Logo from "public/images/logo.svg";
import { Card, CardContent, Button } from "@repo/ui";
import { useAuthStore } from "store/useAuthStore";
import Link from "next/link";

export default function SignupEmail() {
  const { loading, setLoading } = useAuthStore();

  const handleGoogle = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  const handleEmail = () => {
    console.log("Email login");
  };

  return (
    <div className="bg-[url('/images/bg_blue.jpg')] bg-no-repeat bg-cover bg-center min-h-screen flex items-center justify-center px-4">
      <Card className=" md:d-block md:bg-[url('/images/bg_auth_center.png')] bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
        <CardContent className="flex items-center flex-col sm:p-10 px-3 space-y-8 text-center">
          {/* Logo */}
          <div className="space-y-3">
            <div className="flex justify-center mb-[1rem]">
              <Image
                src="/images/logo.svg"
                alt="Harpply Logo"
                width={226}
                height={74}
              />
            </div>

            <p className="text-base font-normal text-white">
              Where Christian Singles Meet
            </p>
          </div>

          {/* Buttons */}
          <div className="w-full space-y-4 mt-[] mb-[67px] md:my-[67px]">
            <Button
              onClick={handleGoogle}
              disabled={loading}
              className="cursor-pointer relative w-full bg-white text-[#1A1A1A] hover:bg-gray-200 rounded-full h-[56px] text-base font-normal"
            >
              <Image
                src="/images/googleLogo.png"
                alt="Google"
                width={30}
                height={30}
                className="mr-2 absolute left-[22px] top-[14px]"
              />
              {loading ? "Connecting..." : "Continue with Google"}
            </Button>

            <Button
              onClick={handleEmail}
              variant="secondary"
              className="cursor-pointer relative w-full rounded-full h-[56px] text-[#1A1A1A] text-base font-normal bg-white/90 hover:bg-white"
            >
              <Image
                src="/images/envlope.png"
                alt="Google"
                width={30}
                height={30}
                className="mr-2 absolute left-[22px] top-[14px]"
              />
              Continue with Email
            </Button>
          </div>

          {/* Terms */}
          <p className="md:text-base text-sm text-white/60 leading-relaxed">
            By tapping Create Account or Sign In, you agree to our Terms. Learn
            how we process your data in our{" "}
            <Link href={"/"} className="underline cursor-pointer">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href={"/"} className="underline cursor-pointer">
              Terms and Conditions
            </Link>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
