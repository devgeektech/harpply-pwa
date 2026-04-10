"use client";

import { cn } from "@repo/ui";
import ProfileIcon from "@/app/icons/profile";
import MessageIcon from "@/app/icons/message";
import HeartIcon from "@/app/icons/heart";
import HomeIcon from "@/app/icons/home";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Sidebar() {
  const pathname = usePathname();

  const menu = [
    { icon: HomeIcon, label: "Discover", href: "/dashboard/quiz/introduction" },
    { icon: HeartIcon, label: "Connections", href: "/connection" },
    { icon: MessageIcon, label: "Chat", href: "/chat" },
    { icon: ProfileIcon, label: "Profile", href: "/setting" },
  ];

  return (
    <aside className="hidden md:flex w-[90px] bg-[#1D0746] flex-col items-center py-6 border-r border-[#FFFFFF14]">
      {/* Menu */}
      <nav className="flex flex-col gap-6 items-center justify-center">
        {menu.map((item, i) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);          

          return (
            <Link
              key={i}
              href={item.href}
              className={cn(
                "w-10 h-10 flex items-center justify-center rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition"
              )}
            >
              <Icon
                className={
                  isActive ? "w-6 h-6 text-[#f5d76e]" : "w-6 h-6 text-white"
                }
              />
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
