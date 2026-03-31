"use client";

import Image from "next/image";
import { MoreVertical, Send, Paperclip, Lock, Flag } from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Input,
} from "@repo/ui";

export default function ChatPage() {
  return (
    <div className="flex sm:items-center items-start justify-center sm:px-4 px-0 sm:pb-[130px] pb-[80px] md:py-[50px] sm:py-4 w-full">
      <Card className="md:d-block md:bg-[url('/images/bg_auth_center.png')] py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent overflow-hidden   md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
        <CardContent className="flex flex-col gap-2 px-0 text-left">
          {/* Chat Card */}
          <div className="relative rounded-2xl px-0 flex flex-col gap-4">
            {/* Header */}
            <div className="flex items-center justify-between border-b-2 pb-6 sm:px-6 sm:py-6 py-0 px-0 border-[#F1EEE31A]">
              <div className="flex items-center gap-3">
                <Image
                  src="/images/match-pro-1.png"
                  alt="user"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-white"
                />
                <div>
                  <p className="text-white text-sm font-medium">Elena Vance</p>
                  <p className="text-sm text-[#C39936]">Faith Guide</p>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-2 cursor-pointer rounded-full hover:bg-gray-100 hover:text-black group">
                    <MoreVertical className="w-5 h-5 text-white group-hover:text-black" />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-40 rounded-xl shadow-lg p-2"
                >
                  <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                    <Lock className="w-4 h-4" />
                    Block
                  </DropdownMenuItem>

                  <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                    <Flag className="w-4 h-4" />
                    Report
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Messages */}
            <div className="flex flex-col gap-6 text-sm max-h-[calc(100vh-350px)] sm:max-h-[450px] overflow-y-auto sm:px-6 px-0 custom-scrollbar">
              <span className="text-center text-xs bg-[#FAF5EB] w-auto mx-auto p-1 px-3 rounded-full text-[#C39936]">
                TODAY
              </span>

              {/* Incoming */}
              <div className="flex items-end gap-2">
                <div>
                  <Image
                    src="/images/match-pro-2.png"
                    width={35}
                    height={35}
                    className="min-w-[35px] min-h-[35px]"
                    alt="match-pro-2"
                  />
                </div>
                <div className="flex items-start gap-[5px] flex-col">
                  <div className="text-xs sm:text-base bg-[#FAF5EB] text-[#1A1A1A] px-4 py-2 rounded-tl-xl rounded-tr-xl rounded-bl-0 rounded-br-xl max-w-[100%]">
                    Hey, did you get the documents I sent over? The community
                    vision plan is in there.
                  </div>
                  <span className="text-[#767676] text-xs">09:42 AM</span>
                </div>
              </div>

              {/* Outgoing */}
              <div className="flex justify-end flex-col items-end">
                <div className="text-xs sm:text-base bg-[#C39936] text-white px-4 py-2 rounded-tl-xl rounded-tr-xl rounded-bl-xl rounded-br-0 max-w-[90%]">
                  Yes, I'm reviewing them now. Everything looks beautiful and
                  well-aligned with our mission.
                </div> 
                <span className="text-[#C39936] text-xs flex gap-1">SEEN<img src='/images/doubletick.png' alt="doubletick" /> </span>
              </div>

              <div className="flex justify-end flex-col items-end">
                <div className="text-xs sm:text-base bg-[#C39936] text-white px-4 py-2 rounded-tl-xl rounded-tr-xl rounded-bl-xl rounded-br-0 max-w-[90%]">
                  Yes, I'm reviewing them now. Everything looks beautiful and
                  well-aligned with our mission.
                </div> 
                <span className="text-[#C39936] text-xs flex gap-1">SEEN<img src='/images/doubletick.png' alt="doubletick" /> </span>
              </div>
              <div className="flex justify-end flex-col items-end">
                <div className="text-xs sm:text-base bg-[#C39936] text-white px-4 py-2 rounded-tl-xl rounded-tr-xl rounded-bl-xl rounded-br-0 max-w-[90%]">
                  Yes, I'm reviewing them now. Everything looks beautiful and
                  well-aligned with our mission.
                </div> 
                <span className="text-[#C39936] text-xs flex gap-1">SEEN<img src='/images/doubletick.png' alt="doubletick" /> </span>
              </div>

              <div className="flex justify-end flex-col items-end">
                <div className="text-xs sm:text-base bg-[#C39936] text-white px-4 py-2 rounded-tl-xl rounded-tr-xl rounded-bl-xl rounded-br-0 max-w-[90%]">
                  Yes, I'm reviewing them now. Everything looks beautiful and
                  well-aligned with our mission.
                </div> 
                <span className="text-[#C39936] text-xs flex gap-1">SEEN<img src='/images/doubletick.png' alt="doubletick" /> </span>
              </div>

              <div className="flex justify-end flex-col items-end">
                <div className="text-xs sm:text-base bg-[#C39936] text-white px-4 py-2 rounded-tl-xl rounded-tr-xl rounded-bl-xl rounded-br-0 max-w-[90%]">
                  Yes, I'm reviewing them now. Everything looks beautiful and
                  well-aligned with our mission.
                </div> 
                <span className="text-[#C39936] text-xs flex gap-1">SEEN<img src='/images/doubletick.png' alt="doubletick" /> </span>
              </div>

              {/* Incoming */}
              <div className="flex items-end gap-2">
                <div>
                  <Image
                    src="/images/match-pro-2.png"
                    width={35}
                    height={35}
                    className="min-w-[35px] min-h-[35px]"
                    alt="match-pro-2"
                  />
                </div>
                <div className="flex items-start gap-[5px] flex-col">
                  <div className="text-xs sm:text-base bg-[#FAF5EB] text-[#1A1A1A] px-4 py-2 rounded-tl-xl rounded-tr-xl rounded-bl-0 rounded-br-xl max-w-[100%]">
                    Hey, did you get the documents I sent over? The community
                    vision plan is in there.
                  </div>
                  <span className="text-[#767676] text-xs">09:42 AM</span>
                </div>
              </div>

              {/* Typing */}
              <span className="text-xs text-white/50 italic">
                John is typing...
              </span>
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 p-4 sm:static fixed bottom-[55px] left-0 right-0">
              <div className="flex-1 relative">
                <Input
                  placeholder="Type your message..."
                  className="text-[#767676] rounded-full pr-10 h-[52px] bg-white focus-visible:ring-0 focus-visible:outline-none focus-visible:border-[#c39936] focus-visible:border-1 focus-visible:border-solid"
                />
                {/* <Paperclip className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /> */}
                <button className="cursor-pointer absolute right-16 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" ><img src='/images/attachicon.svg' alt="attachicon"/> </button>
                <Button className="cursor-pointer rounded-full bg-[#C39936] hover:bg-[#C39936] w-[36px] h-[36px] absolute right-2 top-1/2 -translate-y-1/2">
                <Send className="w-4 h-4" />
              </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
