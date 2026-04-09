import React from "react";
import { Card, CardContent } from "@repo/ui";
import Link from "next/link";
import Profile from "@/icons/profile";
import { Bell, ChevronRight, LogOut, Trash } from "lucide-react";
import Password from "@/icons/password";
import Subscription from "@/icons/subscription";
import Privacy from "@/icons/privacy";
import Userlock from "@/icons/userlock";
import Support from "@/icons/support";

const Settings = () => {
  return (
    <div className="w-full max-w-[620px] py-4 bg-no-repeat bg-cover bg-center min-h-screen flex items-center justify-center px-4">
      <style>
        {`
          @keyframes identity-shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}
      </style>
      <Card className="md:d-block md:bg-[url('/images/bg_auth_center.png')] sm:py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-[#C8A851]/18  rounded-2xl md:shadow-2xl">
        <CardContent className="flex items-center flex-col sm:p-10 px-3 text-left">
          <div className="flex flex-col items-center gap-1">
            <img
              className="w-[100px] h-[100px] rounded-full mb-3"
              src="/images/match-pro-1.png"
              alt="match-pro-1.png"
            />
            <p className="text-[#C39936] text-base leading-[140%]">
              Sarah Jensen
            </p>
            <p className="text-[#C39936] text-base leading-[140%]">
              sarahjensen@gmail.com
            </p>
          </div>
          <div className="w-full overflow-hidden rounded-lg bg-[linear-gradient(160deg,rgba(200,168,81,0.10)_0%,rgba(35,22,58,0.85)_45%,rgba(18,10,35,0.92)_100%)] my-6">
            <ul>
              <Link
                href="/dashboard/setting/profile"
                className="border-b border-[#C8A851]/18 flex justify-between gap-2 text-white/80 py-3 px-4 hover:bg-[#C8A851]/10 transition-colors"
              >
                <p className="flex items-center gap-2">
                  <Profile /> Profile
                </p>
                <ChevronRight />
              </Link>
              <Link
                href="/dashboard/setting/profile"
                className="border-b border-[#C8A851]/18 flex justify-between gap-2 text-white/80 py-3 px-4 hover:bg-[#C8A851]/10 transition-colors"
              >
                <p className="flex items-center gap-2">
                  <Password /> Change Password
                </p>
                <ChevronRight />
              </Link>
              <Link
                href="/dashboard/setting/profile"
                className="border-b border-[#C8A851]/18 flex justify-between gap-2 text-white/80 py-3 px-4 hover:bg-[#C8A851]/10 transition-colors"
              >
                <p className="flex items-center gap-2">
                  <Subscription /> Billing & Subscription
                </p>
                <ChevronRight />
              </Link>
              <Link
                href="/dashboard/setting/profile"
                className="border-b border-[#C8A851]/18 flex justify-between gap-2 text-white/80 py-3 px-4 hover:bg-[#C8A851]/10 transition-colors"
              >
                <p className="flex items-center gap-2">
                  <Bell /> Notifications
                </p>
                <ChevronRight />
              </Link>
              <Link
                href="/dashboard/setting/profile"
                className="border-b border-[#C8A851]/18 flex justify-between gap-2 text-white/80 py-3 px-4 hover:bg-[#C8A851]/10 transition-colors"
              >
                <p className="flex items-center gap-2">
                  <Userlock /> Blocked Users
                </p>
                <ChevronRight />
              </Link>
              <Link
                href="/dashboard/setting/profile"
                className="border-b border-[#C8A851]/18 flex justify-between gap-2 text-white/80 py-3 px-4 hover:bg-[#C8A851]/10 transition-colors"
              >
                <p className="flex items-center gap-2">
                  <Privacy /> Privacy Policy
                </p>
                <ChevronRight />
              </Link>
              <Link
                href="/dashboard/setting/profile"
                className="border-b border-[#C8A851]/18 flex justify-between gap-2 text-white/80 py-3 px-4 hover:bg-[#C8A851]/10 transition-colors"
              >
                <p className="flex items-center gap-2">
                  <Privacy /> Terms & Conditions
                </p>
                <ChevronRight />
              </Link>
              <Link
                href="/dashboard/setting/profile"
                className="border-b border-[#C8A851]/18 flex justify-between gap-2 text-white/80 py-3 px-4 hover:bg-[#C8A851]/10 transition-colors"
              >
                <p className="flex items-center gap-2">
                  <Trash /> Delete Account
                </p>
                <ChevronRight />
              </Link>
              <Link
                href="/dashboard/setting/profile"
                className="border-b border-[#C8A851]/18 flex justify-between gap-2 text-white/80 py-3 px-4 hover:bg-[#C8A851]/10 transition-colors"
              >
                <p className="flex items-center gap-2">
                  <Support /> Contact Support
                </p>
                <ChevronRight />
              </Link>
              <Link
                href="/dashboard/setting/profile"
                className="flex justify-between gap-2 text-white/80 py-3 px-4 hover:bg-[#C8A851]/10 transition-colors"
              >
                <p className="flex items-center gap-2">
                  <LogOut /> Logout
                </p>
                <ChevronRight />
              </Link>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
