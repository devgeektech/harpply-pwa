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
    <aside className="h-screen w-[70px] bg-[#1A0636] flex flex-col items-center py-6 border-r border-white/10">
      {/* Logo */}
      <div className="mb-10">
        <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold">
          H
        </div>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-6">
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