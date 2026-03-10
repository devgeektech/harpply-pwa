"use client";

import { useRegistrationStore } from "@/store/useRegistrationStore";
import { Button, Card, CardContent } from "@repo/ui";
import { Check, ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegistrationSuccess() {
  const router = useRouter();
  const { setRegistered } = useRegistrationStore();

  const handleContinue = () => {
    setRegistered(true);
    router.push("/dashboard");
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
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center justify-center">
              <Image
                width={130}
                height={130}
                src="/images/greenCheck.png"
                alt="greenCheck"
              />
            </div>
          </div>

          {/* Title */}
          <h1 className="font-serif text-white font-medium text-[24px] leading-[140%] tracking-[0.25px] text-center">
            Registration Successful!
          </h1>

          {/* Description */}
          <p className="text-white font-light text-[16px] leading-[150%] tracking-[0px] text-center">
            Welcome to a faith-driven community where meaningful relationships
            are guided by shared values and a deep walk with Christ.
          </p>

          {/* Button */}
          <Button
            onClick={handleContinue}
            className="cursor-pointer w-full text-base h-[52px] mt-[12px] rounded-[12px] md:rounded-[8px] bg-[linear-gradient(90deg,#964400_0%,#F3D35D_25%,#F3D35D_50%,#8C4202_100%)] text-[#913C01] font-semibold hover:opacity-90 transition disabled:opacity-60"
          >
            Continue
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
