"use client"

import { Search } from "lucide-react"
import { Button, Input } from "@repo/ui"
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui"
import Link from "next/link"
import Image from "next/image"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@repo/ui"

export default function Header() {
  return (
    <header className="border-b border-white/10 bg-white flex items-center justify-between px-6 py-2">
      <Link href="/" className="me-12">
        <Image src="/images/logoblack.png" className="min-w-[93px] min-h-[30px] object-contain" alt="logo" width={93} height={30} />
      </Link>
      {/* Search */}
      <div className="flex items-center gap-2 w-full relative">
        <Button className="absolute left-2 top-1/2 -translate-y-1/2 bg-transparent border-none px-2">
        <Search className="text-gray-400" size={18} />
        </Button>
        <Input
          placeholder="Search"
          className="h-[40px] text-base shadow-none focus-visible:ring-0 border border-gray-200 rounded-full ps-15"
        />
      </div>

      {/* Profile */}
      <div className="flex items-center gap-3 ms-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className=" border-none relative bg-[#F5F3ED] p-2 rounded-full h-[50px] w-[50px] cursor-pointer">
              <Image src="/images/bell-icon.svg" alt="dropdown" width={30} height={30} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="border-none h-auto relative bg-[#F5F3ED] py-[10px] px-[10px] md:rounded-[8px] rounded-full cursor-pointer whitespace-nowrap">
            <span className="hidden md:flex text-sm font-medium text-[#C39936] flex items-center gap-2 whitespace-nowrap">
              Sarah Jensen <Image src="/images/circle-down.svg" alt="dropdown" width={24} height={24} />
            </span>
            <span className="block md:hidden text-[18px] font-medium text-[#C39936] flex items-center gap-2 whitespace-nowrap">
              <Avatar>
                <AvatarFallback className="text-[18px] font-medium text-[#C39936]">SJ</AvatarFallback>
              </Avatar>
            </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
       


       
      </div>
    </header>
  )
}