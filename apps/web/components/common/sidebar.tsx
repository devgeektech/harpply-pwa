"use client"

import { Home, HeartHandshake, MessageCircle, User } from "lucide-react"
import { cn } from "@repo/ui"

export default function Sidebar() {
  const menu = [
    { icon: Home, label: "Home" },
    { icon: HeartHandshake, label: "Matches" },
    { icon: MessageCircle, label: "Messages" },
    { icon: User, label: "Profile" },
  ]

  return (
    <aside className="hidden md:block w-[90px] bg-[#1D0746] flex flex-col justify-center items-center py-6 border-r border-[#FFFFFF14]">

      {/* Menu */}
      <nav className="flex flex-col gap-6 items-center justify-center">
        {menu.map((item, i) => {
          const Icon = item.icon
          return (
            <button
              key={i}
              className={cn(
                "w-10 h-10 flex items-center justify-center rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition"
              )}
            >
              <Icon size={20} />
            </button>
          )
        })}
      </nav>
    </aside>
  )
}