"use client";

import { Card, CardContent } from "@repo/ui";
import { ArrowLeft, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const blockedUsers = [
  {
    id: 1,
    name: "Alex Johnson",
    time: "Blocked Oct 12, 2025 • 10:45 AM",
    avatar: "/images/match-pro-1.png",
  },
  {
    id: 2,
    name: "Alex Johnson",
    time: "Blocked Sep 22, 2025 • 11:45 AM",
    avatar: "/images/match-pro-2.png",
  },
  {
    id: 3,
    name: "Alex Johnson",
    time: "Blocked Aug 12, 2024 • 10:42 PM",
    avatar: "/images/block_user.png",
  },
  {
    id: 4,
    name: "Alex Johnson",
    time: "Blocked Aug 08, 2024 • 09:45 PM",
    avatar: "/images/block_user.png",
  },
  {
    id: 5,
    name: "Alex Johnson",
    time: "Blocked Aug 08, 2024 • 09:45 PM",
    avatar: "/images/block_user.png",
  },
];

export default function BlockedUsersPage() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4 py-6">
      <Card className="w-full max-w-[620px] bg-transparent md:bg-[url('/images/bg_auth_center.png')] bg-cover bg-center backdrop-blur-xl border border-[#C8A851]/20 rounded-2xl shadow-2xl">
        <CardContent className="p-4 sm:p-6">
          {/* Header */}
          <div className="flex justify-between mb-4">
            <Link href="/dashboard/setting">
              <ArrowLeft className="text-white cursor-pointer" />
            </Link>
            <h2 className="text-white text-xl font-normal">Block Users</h2>
          </div>

          {/* Search */}
          <div className="flex items-center border h-[46px] border-[#C8A851]/18 bg-[linear-gradient(160deg,rgba(200,168,81,0.10)_0%,rgba(35,22,58,0.85)_45%,rgba(18,10,35,0.92)_100%)] focus-visible:border-[#C8A851]/60 focus-visible:ring-0 focus-visible:ring-transparent rounded-full px-4 py-2 mb-4">
            <Search className="text-white/60 w-4 h-4 mr-2" />
            <input
              type="text"
              placeholder="Search block users"
              className="bg-transparent outline-none text-white placeholder:text-white/60 w-full text-sm"
            />
          </div>

          {/* Section Title */}
          <p className="text-white/70 text-sm mb-3">Recently Block</p>

          {/* List */}
          <div className="space-y-4">
            {blockedUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between">
                {/* Left */}
                <div className="flex items-center gap-3">
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    width={45}
                    height={45}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <p className="text-white text-sm font-normal">
                      {user.name}
                    </p>
                    <p className="text-white/60 text-xs font-light">
                      {user.time}
                    </p>
                  </div>
                </div>

                {/* Button */}
                <button className="px-4 py-1 text-xs rounded-full bg-gradient-to-r from-[#c58b00] via-[#f5d76e] to-[#c58b00] text-[#913C01] font-medium hover:opacity-90 transition">
                  Unblock
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
