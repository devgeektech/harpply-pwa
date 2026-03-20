"use client"

import Link from "next/link"
import React from "react"
import { usePathname } from "next/navigation"
import HomeIcon from "@/app/icons/home"
import HeartIcon from "@/app/icons/heart"
import MessageIcon from "@/app/icons/message"
import ProfileIcon from "@/app/icons/profile"
import { cn } from "@repo/ui"

const FooterResponsive = () => {
  const pathname = usePathname()

  const menu = [
    { icon: HomeIcon, label: "Home", href: "/dashboard" },
    { icon: HeartIcon, label: "Matches", href: "/dashboard/quiz/introduction" },
    { icon: MessageIcon, label: "Messages", href: "/dashboard/messages" },
    { icon: ProfileIcon, label: "Profile", href: "/dashboard/profile" },
  ]

  return (
    <nav className="flex flex-row md:gap-6 gap-3 md:hidden bg-[#000000] justify-between px-6 items-center fixed z-50 bottom-0 left-0 right-0 py-3">
      {menu.map((item, i) => {
        const Icon = item.icon
        const isActive = pathname === item.href

        return (
          <Link key={i} href={item.href}>
            <button
              className={cn(
                "w-10 h-10 flex flex-col items-center justify-center rounded-lg transition",
                isActive ? "text-[#f5d76e]" : "text-[#c58b00]"
              )}
            >
              <Icon className={isActive ? "w-6 h-6 text-[#f5d76e]" : "w-6 h-6 text-white"} />
              <span
                className={cn(
                  "text-sm font-light text-center",
                  isActive ? "text-[#f5d76e]" : "text-white"
                )}
              >
                {item.label}
              </span>
            </button>
          </Link>
        )
      })}
    </nav>
  )
}

export default FooterResponsive