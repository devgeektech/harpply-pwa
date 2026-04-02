"use client"

import { cn } from "@repo/ui"
import ProfileIcon from "@/app/icons/profile"
import MessageIcon from "@/app/icons/message"
import HeartIcon from "@/app/icons/heart"
import HomeIcon from "@/app/icons/home"
import { usePathname } from "next/navigation"

export default function Sidebar() {
  const pathname = usePathname();

  const menu = [
    { icon: HomeIcon, label: "Discover", href: "/dashboard/quiz/introduction" },
    { icon: HeartIcon, label: "Connections", href: "/connection" },
    { icon: MessageIcon, label: "Chat", href: "/chat" },
    { icon: ProfileIcon, label: "Profile", href: "/profile" },
  ]

  return (
    <aside className="hidden md:block w-[90px] bg-[#1D0746] flex flex-col justify-center items-center py-6 border-r border-[#FFFFFF14]">

      {/* Menu */}
      <nav className="flex flex-col gap-6 items-center justify-center">
        {menu.map((item, i) => {
          const Icon = item.icon
          const isActive = pathname === item.href


          return (
            <button
              key={i}
              className={cn(
                "w-10 h-10 flex items-center justify-center rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition"
              )}
            >
              <Icon className={isActive ? "w-6 h-6 text-[#f5d76e]" : "w-6 h-6 text-white"} />
            </button>
          )
        })}
      </nav>
    </aside>
  )
}